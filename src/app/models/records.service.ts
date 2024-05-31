import { Injectable } from '@angular/core';
import { RecordInterface } from './record-interface';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: RecordInterface[] = [
    { artist: 'Mac Miller', albumName: 'Circles', coverArt: 'https://coverartarchive.org/release/d60d0d06-7200-4e4d-aefd-5deb9e5674a2/25201679979.jpg' },
    { artist: 'Bob Marley', albumName: 'Exodus', coverArt: 'https://coverartarchive.org/release/41ec6d32-57ca-4e67-803a-2260f957888e/4411204473.jpg' },
    { artist: 'Pink Floyd', albumName: 'Dark side of the moon', coverArt: 'https://coverartarchive.org/release-group/f5093c06-23e3-404f-aeaa-40f72885ee3a/front' },
    { artist: 'Nas', albumName: 'Ilmatic', coverArt: 'https://coverartarchive.org/release-group/28298e2c-4d70-3eed-a0f5-a3280c662b3d/front' },
    { artist: 'Molcat Doma', albumName: '?', coverArt: 'https://coverartarchive.org/release-group/91843e1b-bce3-47b1-a756-8dd9817bdabc/front' },
    { artist: 'Radiohead', albumName: 'Rainbows', coverArt: 'https://coverartarchive.org/release-group/6e335887-60ba-38f0-95af-fae7774336bf/front' },
    { artist: 'Sampha', albumName: 'Lahai', coverArt: 'https://coverartarchive.org/release-group/b745c43d-3abf-48a3-8caf-81c25d40d100/front' },
    { artist: 'Kaytranada', albumName: '99.9%', coverArt: 'https://coverartarchive.org/release-group/2f915251-f0f3-4a08-9f31-4f3cbcfcbf3b/front' },
  ];
  getRecords(): RecordInterface[] {
    return this.records;
  }

  addRecord(record: RecordInterface): void {
    this.records.push(record);
  }
  constructor() { }
}
