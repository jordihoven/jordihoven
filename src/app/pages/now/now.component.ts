import { Component, inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BluerayComponent } from '../../components/molecules/blueray/blueray.component';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';
import { RatingComponent } from '../../components/molecules/rating/rating.component';
import { GoodreadsBook, LetterboxdMovie } from '../../models/data-models';
import { formatDate } from '../../utils/date';

interface NoteFile {
  name: string;
  path: string;
  sha: string;
  updatedAt: string;
  preview: string;
}

interface NowItem {
  type: 'book' | 'movie' | 'note';
  date: Date;
  data: GoodreadsBook | LetterboxdMovie | NoteFile;
}

interface ItemPosition {
  x: number;
  y: number;
  rotation: number;
  compactScale: number;
}

@Component({
  selector: 'app-now',
  imports: [BluerayComponent, LoaderComponent, RatingComponent],
  templateUrl: './now.component.html',
  styleUrl: './now.component.css',
})
export class NowComponent {
  private router = inject(Router);

  items: NowItem[] = [];
  loading = true;
  formatDate = formatDate;

  panX = 0;
  panY = 0;
  focusedIndex: number | null = null;
  focusedTileCol = 0;
  focusedTileRow = 0;
  positions: ItemPosition[] = [];

  tileW = 0;
  tileH = 0;
  cachedTiles: { col: number; row: number }[] = [];

  isDragging = false;
  hasDragged = false;
  isAnimating = false;

  private dragStartX = 0;
  private dragStartY = 0;
  private panStartX = 0;
  private panStartY = 0;
  private lastCenterCol = Infinity;
  private lastCenterRow = Infinity;

  async ngOnInit() {
    try {
      const [books, movies, notes] = await Promise.all([
        fetch('/.netlify/functions/goodreads-data').then(r => r.json()) as Promise<GoodreadsBook[]>,
        fetch('/.netlify/functions/letterboxd-data?limit=10').then(r => r.json()) as Promise<LetterboxdMovie[]>,
        fetch('/.netlify/functions/notes-data').then(r => r.json()) as Promise<NoteFile[]>,
      ]);

      const bookItems: NowItem[] = books.map(b => ({ type: 'book', date: new Date(b.dateAdded), data: b }));
      const movieItems: NowItem[] = movies.map(m => ({ type: 'movie', date: new Date(m.date), data: m }));
      const noteItems: NowItem[] = notes.map(n => ({ type: 'note', date: new Date(n.updatedAt), data: n }));

      this.items = [...bookItems, ...movieItems, ...noteItems]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 15);

      this.computePositions();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  private hash(n: number): number {
    const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  }

  private computePositions() {
    const canvasW = 2400;
    const canvasH = 1600;
    const minDist = 280;
    const padding = 160;

    this.positions = [];

    for (let i = 0; i < this.items.length; i++) {
      let bestX = canvasW / 2;
      let bestY = canvasH / 2;
      let bestMinDist = 0;

      for (let attempt = 0; attempt < 40; attempt++) {
        const x = this.hash(i * 100 + attempt * 3) * (canvasW - padding * 2) + padding;
        const y = this.hash(i * 100 + attempt * 3 + 1) * (canvasH - padding * 2) + padding;

        let closest = Infinity;
        for (const p of this.positions) {
          closest = Math.min(closest, Math.hypot(p.x - x, p.y - y));
        }

        if (closest >= minDist) {
          bestX = x;
          bestY = y;
          break;
        }
        if (closest > bestMinDist) {
          bestMinDist = closest;
          bestX = x;
          bestY = y;
        }
      }

      const rotation = this.hash(i * 7 + 3) * 18 - 9;
      const compactScale = this.hash(i * 11 + 17) * 0.1 + 0.65;
      this.positions.push({ x: bestX, y: bestY, rotation, compactScale });
    }

    this.tileW = canvasW;
    this.tileH = canvasH;

    this.panX = window.innerWidth / 2 - this.tileW / 2;
    this.panY = window.innerHeight / 2 - this.tileH / 2;
    this.updateVisibleTiles();
  }

  private updateVisibleTiles() {
    const centerWorldX = -this.panX + window.innerWidth / 2;
    const centerWorldY = -this.panY + window.innerHeight / 2;
    const currentCol = Math.floor(centerWorldX / this.tileW);
    const currentRow = Math.floor(centerWorldY / this.tileH);

    if (currentCol === this.lastCenterCol && currentRow === this.lastCenterRow) return;
    this.lastCenterCol = currentCol;
    this.lastCenterRow = currentRow;

    this.cachedTiles = [];
    for (let r = currentRow - 1; r <= currentRow + 1; r++) {
      for (let c = currentCol - 1; c <= currentCol + 1; c++) {
        this.cachedTiles.push({ col: c, row: r });
      }
    }
  }

  get canvasTransform(): string {
    return `translate(${this.panX}px, ${this.panY}px)`;
  }

  getCardScale(index: number): number {
    return this.positions[index]?.compactScale ?? 0.65;
  }

  getCardRotation(index: number): string {
    return (this.positions[index]?.rotation ?? 0) + 'deg';
  }

  isFocusedCopy(itemIndex: number, tileCol: number, tileRow: number): boolean {
    return this.focusedIndex === itemIndex
      && this.focusedTileCol === tileCol
      && this.focusedTileRow === tileRow;
  }

  tileTrack(_: number, tile: { col: number; row: number }): number {
    return tile.col * 10000 + tile.row;
  }

  // Mouse
  onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    this.startDrag(e.clientX, e.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.moveDrag(e.clientX, e.clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  // Touch
  onTouchStart(e: TouchEvent) {
    const t = e.touches[0];
    this.startDrag(t.clientX, t.clientY);
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    const t = e.touches[0];
    this.moveDrag(t.clientX, t.clientY);
  }

  onTouchEnd() {
    this.isDragging = false;
  }

  private startDrag(x: number, y: number) {
    this.isDragging = true;
    this.hasDragged = false;
    this.isAnimating = false;
    this.dragStartX = x;
    this.dragStartY = y;
    this.panStartX = this.panX;
    this.panStartY = this.panY;
  }

  private moveDrag(x: number, y: number) {
    if (!this.isDragging) return;
    const dx = x - this.dragStartX;
    const dy = y - this.dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      this.hasDragged = true;
      if (this.focusedIndex !== null) this.focusedIndex = null;
    }
    this.panX = this.panStartX + dx;
    this.panY = this.panStartY + dy;
    this.updateVisibleTiles();
  }

  // Focus
  onCardClick(e: Event, index: number, tileCol: number, tileRow: number) {
    e.stopPropagation();
    if (this.hasDragged) return;
    if (this.isFocusedCopy(index, tileCol, tileRow)) {
      this.unfocus();
      return;
    }
    this.focus(index, tileCol, tileRow);
  }

  onViewportClick() {
    if (this.hasDragged) return;
    if (this.focusedIndex !== null) this.unfocus();
  }

  private focus(index: number, tileCol: number, tileRow: number) {
    const pos = this.positions[index];
    if (!pos) return;
    this.isAnimating = true;
    this.focusedIndex = index;
    this.focusedTileCol = tileCol;
    this.focusedTileRow = tileRow;
    this.panX = window.innerWidth / 2 - (pos.x + tileCol * this.tileW);
    this.panY = window.innerHeight / 2 - (pos.y + tileRow * this.tileH);
    this.updateVisibleTiles();
  }

  private unfocus() {
    this.isAnimating = true;
    this.focusedIndex = null;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.focusedIndex !== null) this.unfocus();
  }

  // Navigation
  navigateItem(e: Event, item: NowItem) {
    e.stopPropagation();
    switch (item.type) {
      case 'book':
        window.open((item.data as GoodreadsBook).link, '_blank');
        break;
      case 'movie':
        window.open((item.data as LetterboxdMovie).url, '_blank');
        break;
      case 'note':
        const note = item.data as NoteFile;
        const slug = note.name.replace('.md', '').replace(/ /g, '-');
        this.router.navigate(['/note', slug]);
        break;
    }
  }

  asBook(data: GoodreadsBook | LetterboxdMovie | NoteFile): GoodreadsBook {
    return data as GoodreadsBook;
  }

  asMovie(data: GoodreadsBook | LetterboxdMovie | NoteFile): LetterboxdMovie {
    return data as LetterboxdMovie;
  }

  asNote(data: GoodreadsBook | LetterboxdMovie | NoteFile): NoteFile {
    return data as NoteFile;
  }

  prettify(filename: string): string {
    return filename
      .replace('.md', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
