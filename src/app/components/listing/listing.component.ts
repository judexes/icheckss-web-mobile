import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { HttpResponse } from '@angular/common/http';
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Constants } from 'src/app/helpers/constants';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  workspace: any;
  listings = [];
  activeListing: any;
  isLoading: boolean;
  listingDetailsActive: boolean;

  @ViewChild(ListingDetailComponent) detailComponent: ListingDetailComponent;

  @ViewChild('list') printContent: ElementRef;

  modalName: string = null;

  constructor(
    private workspaceService: WorkspaceService,

    private router: Router,
    private dataService: DataService,
    private modalService: ModalService ) {}

  ngOnInit(): void {

    this.workspace = this.workspaceService.getCurrentWorkspaceValue();

    this.checkWorkspace(this.workspace);

    this.dataService.dataUpdate$().subscribe(
      () => {
        this.index('listing');
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
        this.isLoading = false;
      },
      () => this.isLoading = false
    );

  }

  onRightClick(event): void {
    // alert('Clicked!');
    // event.preventDefault();
  }

  public showModal(): void {
  }

  public hideModal(): void {
    this.modalName = null;
  }

  public onContainerClicked(event: MouseEvent): void {

    if ((event.target as HTMLElement).classList.contains('scrim')) {
      this.hideModal();
    }
  }

  update(data: any): void {
    this.isLoading = true;
    this.dataService.update('listing', this.activeListing.id, data).subscribe(
      () => {
        this.dataService.registerUpdate();
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => {this.isLoading = false; }
    );
  }

  onPublishListingClicked(): void {
    const data = { is_public: 1 };
    this.update(data);
  }

  onUnPublishListingClicked(): void {
    const data = { is_public: 0 };
    this.update(data);
  }

  onOpenListingClicked(): void {
    const data = { status: 1 };
    this.update(data);
  }

  onCloseListingClicked(): void {
    const data = { status: 0 };
    this.update(data);
  }

  onMultimediaClicked(): void {
    const data = { entityType: 'listing', entityId: this.activeListing.id };
    this.modalService.LoadModal('multimedia', data);
  }

  onAddListingClicked(): void {
    const data = { mode: 'add' };
    this.modalService.LoadModal('listing-wizard', data);
  }

  onEditListingClicked(): void {
    const data = { mode: 'edit', id: this.activeListing.id };
    this.modalService.LoadModal('listing', data);
  }

  onAddActionClicked(): void {
    const data = { entityType: 'listing', entityId: this.activeListing.id };
    this.modalService.LoadModal('action', data);
  }

  onCreateClicked(): void {
    this.modalService.LoadModal('action', {});
  }

  onReloadClicked(): void {
    this.index('listing');
  }

  onRecordClicked(id: number): void {
    this.router.navigate(['/listings', id ]);
  }



  onExportPDFClicked(): void {

    const headers = [['#', 'Property', 'Owner', 'Location', 'Asking']];

    const content = [];

    let count = 1;

    this.listings.forEach(element => {
      const item = [];
      item.push(count++);
      item.push(element.label);
      item.push(element.holder);
      item.push(element.neighbourhood);
      item.push(Number(element.asking_price).toLocaleString('en-GB'));
      content.push(item);
    });

    const doc = new jsPDF({
      orientation: 'portrait'
    });

    (doc as any).autoTable({
      head: headers,
      body: content,
      theme: 'grid',
      styles: { cellPadding: 2, fontSize: 8 },
      columnStyles: { 4: { halign: 'right' } },
      didDrawCell: data => {
        console.log(data.column.index);
      }
    });

    // doc.output('dataurlnewwindow');

    doc.save('generated.pdf');

  }



  index(s: string): any {

    this.listingDetailsActive = true;
    this.isLoading = true;
    this.dataService.loadIndex(s).subscribe(
      (response: HttpResponse<any>) => {
        this.listings = response.body;
        // console.log(response.body);
      },
      (error: any) => {
        console.log(error.message);
        alert(error.statusText);
      },
      () => this.isLoading = false
    );
  }

  checkWorkspace(workspace: any): void {
    if (workspace == null){
      this.router.navigate(['home']);
    }
  }


  onActivate(elementRef): void {
    elementRef.selectedListing.subscribe(feedback => {

      this.listingDetailsActive = true;

      this.activeListing = feedback;
    });
  }


}
