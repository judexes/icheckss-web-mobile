import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Output, EventEmitter } from '@angular/core';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-space-form',
  templateUrl: './space-form.component.html',
  styleUrls: ['./space-form.component.css']
})
export class SpaceFormComponent implements OnInit {

  title = '';
  @Input() id: number;
  @Input() mode: string;

  isWorking: boolean;

  @Output() recordId = new EventEmitter<number>();

  spaceForm = new FormGroup({
    label: new FormControl(''),
    address: new FormControl(''),
    coordinates: new FormControl(''),
    measurements: new FormControl(''),
    area: new FormControl(''),
    height: new FormControl(''),
    levels: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private dataService: DataService,
              private noticeService: NoticeService) { }

  ngOnInit(): void {
    console.log(this.mode);
    this.title = this.mode === 'add' ? 'Add Property' : 'Edit Property';
    if (this.mode === 'edit') { this.load(); }
  }

  enter(form: any): void {
    if (this.mode === 'add') { this.insert(form); }
    else if (this.mode === 'edit') {this.update(form); }
  }

  insert(form: any): void {

    this.isWorking = true;
    this.dataService.insert('space', form.value).subscribe(
      (response) => {
        this.recordId.emit(response.body);
        this.noticeService.LoadNotice('Property ' + response.body + ' created sucessfully');
        this.dataService.registerUpdate();
        this.isWorking = false;
      },
      (error: any) => {
        this.noticeService.LoadNotice('Property creation failed');

        console.log(error.message);
        alert(error.statusText);
      },
      () => {this.isWorking = false; }
    );
  }

  update(form: any): void {
    this.isWorking = true;
    this.dataService.update('space', this.id, form.value).subscribe(
      (response) => {
        this.dataService.registerUpdate();
        this.noticeService.LoadNotice('Updated successfully');
        this.isWorking = false;
      },
      (error: any) => {
        console.log(error.message);
        this.noticeService.LoadNotice('Update failed');
        this.isWorking = false;
      },
      () => {this.isWorking = false; }
    );
  }

  load(): void{

    this.isWorking = true;
    this.dataService.loadRecord('space', this.id).subscribe(
      (response: HttpResponse<any>) => {
        this.spaceForm.patchValue(response.body);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {
        this.isWorking = false;
      }
    );
  }


}
