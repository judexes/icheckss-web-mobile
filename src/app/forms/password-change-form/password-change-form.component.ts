import { ModalService } from 'src/app/services/modal.service';
import { NoticeService } from './../../services/notice.service';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {
  @Input() mode: string;
  @Input() id: number;
  isWorking: boolean;
  isMatch: boolean = true;
  error = '';
  password: any;

  constructor(
    private dataService: DataService,          
    private noticeService: NoticeService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.mode === 'update';
  }

  enter(form: any): void {
    this.isMatch = true;
    if (form.value.password === form.value.newPassword) {

      this.set(form.value);
    } else {
      this.isMatch = false;
    }
  }
  
  set(data: any): void {
    this.isWorking = true;
    this.dataService.set('password-change',  data).subscribe(
      (data) => {
        this.dataService.registerUpdate();
        this.noticeService.LoadNotice('Password updated successfully');
        this.modalService.unloadModal();
        this.isWorking = false;
      },
      (error: any) => {        
        this.noticeService.LoadNotice('Password update failed');
        console.log(error.message);
        alert(error.statusText);
        this.isWorking = false;
      },
      () => { this.isWorking = false; }
    );
  }

}
