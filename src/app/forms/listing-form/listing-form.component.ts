import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent implements OnInit {

  title: string;
  @Input() mode: string;
  @Input() id: number;
  @Input() spaceId: number;
  workspace: any;
  isWorking: boolean;
  @Output() recordId = new EventEmitter<number>();

  listingForm = new FormGroup({
    space_id: new FormControl(null),
    status: new FormControl(null),
    label: new FormControl(''),
    market: new FormControl(''),
    category: new FormControl(''),
    neighbourhood: new FormControl(''),
    composition: new FormControl(''),
    asking_price: new FormControl(''),
    reserve_price: new FormControl(''),
    brief: new FormControl(''),
    appliances: new FormControl(''),
    amenities: new FormControl(''),
    services: new FormControl(''),
    service_charge: new FormControl(''),
    security_deposit: new FormControl(''),
    terms: new FormControl(''),
    agent: new FormControl(''),
    introducer: new FormControl(''),
    authoriser: new FormControl(''),
    additional_information: new FormControl(''),
  });


  constructor(private dataService: DataService,
              private noticeService: NoticeService) { }

  ngOnInit(): void {
    this.title = this.mode === 'add' ? 'Create Listing' : 'Edit Listing';
    if (this.mode === 'edit') { this.load(); }
  }

  enter(form: any): void {
    if (this.mode === 'add') { this.insert(form); }
    else if (this.mode === 'edit') {this.update(form); }
  }

  insert(form: any): void {
    this.isWorking = true;

    this.listingForm.patchValue({ space_id: this.spaceId, status: 1 });
    this.dataService.insert('listing', form.value).subscribe(
      (response) => {
        this.recordId.emit(response.body);
        this.dataService.registerUpdate();
        this.noticeService.LoadNotice('Listing ' + response.body + ' added successfully');
        this.isWorking = false;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {this.isWorking = false; }
    );
  }

  update(form: any): void {
    this.isWorking = true;
    this.dataService.update('listing', this.id, form.value).subscribe(
      (response) => {
        this.recordId.emit(response.body);
        this.dataService.registerUpdate();
        this.noticeService.LoadNotice('Listing updated successfully');
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
    this.dataService.loadRecord('listing', this.id).subscribe(
      (response: HttpResponse<any>) => {
        this.listingForm.patchValue(response.body);
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
