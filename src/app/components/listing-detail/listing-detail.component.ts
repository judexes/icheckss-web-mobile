import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { Constants } from 'src/app/helpers/constants';

@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit {

  isLoading: boolean;
  isDownLoading: boolean;
  listing: any;
  tabIndex = 1;
  id: number;
  publicApiUrl: string = Constants.publicApiUrl;

  @Output() selectedListing = new EventEmitter<any>();


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private modalService: ModalService) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.load(this.id);
    });

    this.dataService.dataUpdate$().subscribe(
      () => {
        this.load(this.id);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
        this.isLoading = false;
      },
      () => this.isLoading = false
    );
  }

  load(listingId: number): void {
    this.isLoading = true;
    this.find('listing', listingId);
  }

  find(s: string, i: number): void {
    this.dataService.loadRecord(s, i).subscribe(
      (response: HttpResponse<any>) => {
        this.listing = response.body;
        this.selectedListing.emit(this.listing);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  setTab(index: number): void{
    this.tabIndex = index;
  }

  onActionClicked(i: number): void {
    const data = { id: i };
    this.modalService.LoadModal('action-view', data);
  }

}
