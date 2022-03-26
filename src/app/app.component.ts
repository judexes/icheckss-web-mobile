import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ModalService } from './services/modal.service';
import { NoticeService } from './services/notice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  liveModal: any = {};
  liveNotice: any = {};

  constructor(private modalService: ModalService,
              private noticeService: NoticeService){}


  ngOnInit(): void {

    // this.redirectIfDesktop();    // Temp

    this.modalService.GetLiveModal$().subscribe(
      data => {
        if (data != null) { this.LaunchModal(data); }
        else { this.CloseModal(); }
      }
    );

    this.noticeService.GetLiveNotice$().subscribe(
      data => {
        if (data != null) { this.LaunchNotice(data); }
        else { this.CloseNotice(); }
      }
    );
  }

  LaunchModal(m: any): void{
    this.liveModal = Object.assign({}, m);
  }

  CloseModal(): void{
    this.liveModal = {};
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('scrim')) {
      this.CloseModal();
    }
  }

  redirectIfDesktop(): void{

    if (!( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
      window.location.assign('https://app.inspectify.ng');
    }
  }

  LaunchNotice(m: any): void{
    this.liveNotice = Object.assign({}, m);
  }

  CloseNotice(): void{
    this.liveNotice = {};
  }

  public onNoticeActive(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('notice')) {
      this.CloseNotice();
    }
  }

}


