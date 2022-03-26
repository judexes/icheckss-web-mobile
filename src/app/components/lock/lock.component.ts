import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  user: any = {};
  loading = false;
  error = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  enter(form): void {

    this.loading = true;
    this.authService.signIn(form.value)
        .subscribe(result => {
            if (result === true) {
                const redirect = this.authService.redirectURL ? this.authService.redirectURL : '/home';
                this.router.navigate([redirect]);
            } else {
                this.error = 'Authentication failed';
                alert(this.error);
                this.loading = false;
            }
        });
  }

}
