import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { WorkspaceService } from '../../services/workspace.service';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit{

  @Input() showsWorkspaceLabel: boolean;
  @Input() showsUserName: boolean;
  @Input() showsPages: boolean;
  @Input() page: string;
  workspace: any;
  user: any;

  constructor(
    private authService: AuthenticationService,
    private workspaceService: WorkspaceService,
    private router: Router,
    private route: ActivatedRoute,
    private noticeService: NoticeService){}

  ngOnInit(): void {

    this.user = this.authService.currentUserValue;

    if (this.showsWorkspaceLabel){

      this.workspaceService.currentWorkspace.subscribe(
        (data) => {
          if (data == null){
            return;
          }
          this.workspace = data;
        },
        () => {}
      );

    }

  }

  exit(): void {
    this.authService.signOut();
    this.router.navigate(['/gate']);
  }

  onWorkSpaceNameClicked(): void {
    // temp ->
    const now = new Date().toString().split(' ')[4];
    this.noticeService.LoadNotice('This is a notice from the top bar at: ' + now );
    // <- temp
  }

}
