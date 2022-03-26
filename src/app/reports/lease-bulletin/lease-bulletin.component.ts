import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-lease-bulletin',
  templateUrl: './lease-bulletin.component.html',
  styleUrls: ['./lease-bulletin.component.css']
})
export class LeaseBulletinComponent implements OnInit {
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
    private router: Router,
    private dataService: DataService) {}

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
        this.rows = this.filterLease(response.body);
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

  filterLease(data: any[]): any[] {

    const records = [];

    data.forEach(d => {
      if (d.market === 'lease'){
        records.push(d);
      }
    });

    return records;
  }

}
