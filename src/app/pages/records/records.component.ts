import { Component, OnInit } from '@angular/core';
import { RecordsService } from 'src/app/models/records.service';
import { RecordInterface } from 'src/app/models/record-interface';
import { LoaderComponent } from 'src/app/components/molecules/loader/loader.component';

@Component({
  selector: 'records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css',
  imports: [LoaderComponent],
})
export class RecordsComponent implements OnInit {
  records: RecordInterface[] = [];
  imageLoaded: boolean[] = [];

  constructor(private recordService: RecordsService) {}

  ngOnInit(): void {
    this.records = this.recordService.getRecords();
    this.imageLoaded = new Array(this.records.length).fill(false);
  }

  setImageLoaded(index: number): void {
    this.imageLoaded[index] = true;
  }
}
