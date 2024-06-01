import { Injectable } from '@angular/core';
import { RecordInterface } from './record-interface';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private records: RecordInterface[] = [
    { artist: 'Mac Miller', albumName: 'Circles', coverArt: 'https://coverartarchive.org/release/d60d0d06-7200-4e4d-aefd-5deb9e5674a2/25201679979-250.jpg' },
    { artist: 'Bob Marley', albumName: 'Exodus', coverArt: 'https://coverartarchive.org/release/41ec6d32-57ca-4e67-803a-2260f957888e/4411204473-250.jpg' },
    { artist: 'Pink Floyd', albumName: 'Dark side of the moon', coverArt: 'https://coverartarchive.org/release/b84ee12a-09ef-421b-82de-0441a926375b/1611507818.jpg-250' },
    { artist: 'Nas', albumName: 'Ilmatic', coverArt: 'https://coverartarchive.org/release/9651aac2-4296-381f-a595-f11e3242c997/2546251818.jpg-250' },
    { artist: 'Molcat Doma', albumName: '?', coverArt: 'https://coverartarchive.org/release/9a89ac67-29d4-489e-959b-c5c265c09599/21972112143.jpg-250' },
    { artist: 'Radiohead', albumName: 'Rainbows', coverArt: 'https://coverartarchive.org/release/219e7d7c-806c-44b3-9972-cdb3614b3411/1931675364.jpg-250' },
    { artist: 'Sampha', albumName: 'Lahai', coverArt: 'https://coverartarchive.org/release/b4424c5e-90ca-413d-b881-38fb9682873a/37069118373.jpg-250' },
    { artist: 'Kaytranada', albumName: '99.9%', coverArt: 'https://coverartarchive.org/release/424a6c98-eebe-46ac-9b04-e9844b0d8e7a/13085013575.jpg-250' },
  ];
  getRecords(): RecordInterface[] {
    return this.records;
  }

  addRecord(record: RecordInterface): void {
    this.records.push(record);
  }
  constructor() { }
}
