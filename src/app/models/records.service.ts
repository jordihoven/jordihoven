import { Injectable } from '@angular/core';
import { RecordInterface } from './record-interface';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: RecordInterface[] = [
    { artist: 'Mac Miller', albumName: 'Circles', coverArt: 'https://picsum.photos/200' },
    { artist: 'Bob Marley', albumName: 'Exodus', coverArt: 'https://picsum.photos/200' },
    { artist: 'Pink Floyd', albumName: 'Dark side of the moon', coverArt: 'https://picsum.photos/200' },
    { artist: 'Nas', albumName: 'Ilmatic', coverArt: 'https://picsum.photos/200' },
    { artist: 'Molcat Doma', albumName: '?', coverArt: 'https://picsum.photos/200' },
    { artist: 'Radiohead', albumName: 'Rainbows', coverArt: 'https://picsum.photos/200' },
    { artist: 'Sampha', albumName: 'Lahai', coverArt: 'https://picsum.photos/200' },
    { artist: 'Kaytranada', albumName: '99.9%', coverArt: 'https://picsum.photos/200' },
    // Add more records here
  ];
  getRecords(): RecordInterface[] {
    return this.records;
  }

  addRecord(record: RecordInterface): void {
    this.records.push(record);
  }
  constructor() { }
}
