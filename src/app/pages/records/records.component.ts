import { Component, OnInit } from '@angular/core';
import { RecordsService } from 'src/app/models/records.service';
import { RecordInterface } from 'src/app/models/record-interface';

@Component({
  selector: 'records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
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
