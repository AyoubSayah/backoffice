import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../apis/admin.service';
import { NotificationComponent } from '../shared/notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  email: any;

  constructor(
    private router: Router,
    private admin: AdminService,
    private dialog: MatDialog
  ) {}
  hide = true;
  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  envoyer() {
    this.admin.login(this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/users']);
        }
        console.log(res);
      },
      (err) => {
        console.log(err);

        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'error', text: err.error.message },
        });
      }
    );
  }
}
