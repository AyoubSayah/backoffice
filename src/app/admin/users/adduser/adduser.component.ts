import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { iif } from 'rxjs';
import { UserService } from 'src/app/apis/user.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AdduserComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  preview: any;
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmermdp: new FormControl('', [Validators.required]),
    isAdmin: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  isformvalid() {
    if (
      this.form.valid &&
      this.form.value.password == this.form.value.confirmermdp
    ) {
      return false;
    } else {
      return true;
    }
  }

  envoyer() {
    this.userService.ajouteruser(this.form.value).subscribe(
      (res: any) => {
        console.log(res);

        this.dialogRef.close(res.status);
      },
      (err) => {
        if (err.status == 430) {
          this.dialog.open(NotificationComponent, {
            panelClass: 'custom-modalbox',
            backdropClass: 'custom-backdrop',
            data: {
              class: 'error',
              text: 'password must be greater than 8 characters',
            },
          });
        } else if (err.status == 400) this.dialogRef.close('error');
        else {
          this.dialog.open(NotificationComponent, {
            panelClass: 'custom-modalbox',
            backdropClass: 'custom-backdrop',
            data: { class: 'error', text: 'Internal server Eror' },
          });
        }
        console.log(err);
      }
    );
  }
}
