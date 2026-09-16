import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit,
  OnDestroy,
  viewChild,
  ElementRef,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from '../../components/molecules/loader/loader.component';

interface ReflectionAttachment {
  blob: { ref: { $link: string }; mimeType: string };
  name: string;
  width?: number;
  height?: number;
}

interface ReflectionRecord {
  uri: string;
  value: {
    text: string;
    createdAt: string;
    attachments?: ReflectionAttachment[];
  };
}

const PDS = 'https://pholiota.us-west.host.bsky.network';
const DID = 'did:plc:o67xeqqjchzzecfvkyq2wlfs';
const COLLECTION = 'app.reflections.reflection';
const LIMIT = 20;

@Component({
  selector: 'app-thoughts',
  imports: [DatePipe, LoaderComponent],
  templateUrl: './thoughts.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './thoughts.component.css',
})
export class ThoughtsComponent implements OnInit, AfterViewInit, OnDestroy {
  reflections: ReflectionRecord[] = [];
  loading = false;
  done = false;
  private cursor?: string;
  private observer?: IntersectionObserver;
  sentinel = viewChild<ElementRef<HTMLDivElement>>('sentinel');

  ngOnInit() {
    this.loadPage();
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) this.loadPage();
      },
      { rootMargin: '500px' },
    );
    this.observer.observe(this.sentinel()!.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  async loadPage() {
    if (this.loading || this.done) return;
    this.loading = true;
    try {
      let url = `${PDS}/xrpc/com.atproto.repo.listRecords?repo=${DID}&collection=${COLLECTION}&limit=${LIMIT}`;
      if (this.cursor) url += `&cursor=${this.cursor}`;
      const json = await (await fetch(url)).json();
      this.reflections.push(...json.records);
      this.cursor = json.cursor;
      if (!this.cursor) this.done = true;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }

  blobUrl(attachment: ReflectionAttachment): string {
    const cid = attachment.blob.ref.$link;
    return `${PDS}/xrpc/com.atproto.sync.getBlob?did=${DID}&cid=${cid}`;
  }

  ratio(a: ReflectionAttachment): string {
    return Number.isFinite(a.width) && Number.isFinite(a.height)
      ? `${a.width} / ${a.height}`
      : '';
  }

  atprotoUrl(uri: string): string {
    return `https://atproto.at/uri/${uri}`;
  }
}