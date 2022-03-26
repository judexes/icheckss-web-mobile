import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DataService } from 'src/app/services/data.service';
import { HttpResponse } from '@angular/common/http';
import { ListingDetailComponent } from '../listing-detail/listing-detail.component';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {

  workspace: any;
  actions = [];
  activeActionId: number;
  isLoading: boolean;

  @ViewChild(ListingDetailComponent) detailComponent: ListingDetailComponent;

  @ViewChild('list') printContent: ElementRef;


  constructor(
    private workspaceService: WorkspaceService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {

    this.workspace = this.workspaceService.getCurrentWorkspaceValue();

    this.checkWorkspace(this.workspace);

    this.activeActionId = this.route.snapshot.params.id;

    this.index('action');


  }

  onReloadClicked(): void {
    this.index('action');
  }

  onRecordClicked(id: number): void {
    this.router.navigate(['/actions', id ]);
    this.activeActionId = id;
  }


  onExportPDFClicked(): void {

    const headers = [['#', 'Subject', 'Details', 'User']];

    const content = [];

    let count = 1;

    this.actions.forEach(element => {
      const item = [];
      item.push(count++);
      item.push(element.subject);
      item.push(element.details);
      item.push(element.modified);
      item.push(element.remark);
      item.push(element.user);
      item.push(element.verified);
      item.push(element.verifier);
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
    this.isLoading = true;
    this.dataService.loadIndex(s).subscribe(
      (response: HttpResponse<any>) => {
        this.actions = response.body;
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

  splitUserName(s: string): string[]{
    return s.split(':');
  }


}
