import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-listing-wizard',
  templateUrl: './listing-wizard.component.html',
  styleUrls: ['./listing-wizard.component.css']
})
export class ListingWizardComponent implements OnInit {

  isLoading: boolean;

  page: number;
  spaces = [];

  showsSpaceList: boolean;

  spaceId: number;

  constructor(private dataService: DataService,
              private modalService: ModalService,
              private router: Router) {
    this.page = 1;
  }

  ngOnInit(): void {
    this.indexSpaces('space');
  }


  indexSpaces(s: string): any {
    this.isLoading = true;
    this.dataService.loadIndex(s).subscribe(
      (response: HttpResponse<any>) => {
        this.spaces = response.body;
      },
      (error: any) => {
        console.log(error.message);
      },
      () => this.isLoading = false
    );
  }

  stepBack(): void {
    this.page--;
  }

  onSpaceIdEmitted(id: number): void {
    if (id){
      this.spaceId = id;
      this.page = 4;
    }
  }

  onListingIdEmitted(id: number): void {
    if (id){
      this.router.navigate(['listings', id]);
      this.modalService.unloadModal();
    }
  }

}
