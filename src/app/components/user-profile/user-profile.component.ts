import { DataService } from 'src/app/services/data.service';
import { ModalService } from './../../services/modal.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user: any;
  workspace: any;

  constructor(
    private authService: AuthenticationService,
    private modalService: ModalService,
    private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.user = this.authService.currentUserValue;

    this.http.get('assets/config.json', { responseType: 'text'} ).subscribe(
      data => {
        const obj = JSON.parse(data);
        this.workspace = obj.workspace;
        console.log(this.workspace.name);
      }
    );

    // this.onChangePasswordClicked(); // Note: Temporary
  }

  onChangePasswordClicked(): void {
    const data = { mode: 'add' };
    this.modalService.LoadModal('password-change', data);
  }

}
