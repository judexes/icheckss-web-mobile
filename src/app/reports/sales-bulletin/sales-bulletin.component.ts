import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-sales-bulletin',
  templateUrl: './sales-bulletin.component.html',
  styleUrls: ['./sales-bulletin.component.css']
})
export class SalesBulletinComponent implements OnInit {
  isLoading: boolean;
  today = new Date().toISOString().substring(0, 10);
  workspace: any;
  rows = [];
  activeListing: any;

  @ViewChild('list') printContent: ElementRef;

  modalName: string = null;
  filterTerm: string;

  constructor(
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private modalService: ModalService ) {
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd){
          const id = route.firstChild?.snapshot?.params?.id;

          if (id) {
            this.dataService.loadRecord('listing', +route.firstChild?.snapshot?.params?.id).subscribe(
              (response) => this.activeListing = response.body,
              (error: any) => {
                this.activeListing = null;
                console.log(error.message);
                this.router.navigate(['rows']);
              }
            );
          }
        }
      });
    }

  ngOnInit(): void {

    this.workspace = this.workspaceService.getCurrentWorkspaceValue();

    this.checkWorkspace(this.workspace);

    this.dataService.dataUpdate$().subscribe(
      () => this.index('listing'),
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
    event.preventDefault();
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

  onReloadClicked(): void {
    this.index('listing');
  }

  onRecordClicked(id: number): void {
    this.router.navigate(['/listings', id ]);
  }

  index(s: string): any {
    this.isLoading = true;
    this.dataService.loadIndex(s).subscribe(
      (response: HttpResponse<any>) => {
        this.rows = this.filterSales(response.body);
        console.log(response.body);
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



  filterSales(data: any[]): any[] {

    const records = [];

    data.forEach(d => {
      if (d.market === 'sale'){
        records.push(d);
      }
    });

    return records;
  }



}
