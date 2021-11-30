import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from 'src/app/apis/user.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-ediuser',
  templateUrl: './ediuser.component.html',
  styleUrls: ['./ediuser.component.scss'],
})
export class EdiuserComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EdiuserComponent>,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  preview: any;
  form: FormGroup = new FormGroup({
    firstname: new FormControl(this.data.firstname, [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl(this.data.lastname, [
      Validators.required,
      Validators.minLength(3),
    ]),

    email: new FormControl(this.data.email, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [Validators.minLength(6)]),
    confirmermdp: new FormControl('', []),
    isAdmin: new FormControl(this.data.isAdmin, [Validators.required]),
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
    this.form.value._id = this.data._id;
    delete this.form.value.email;
    delete this.form.value.password;

    this.userService.editUsr(this.form.value).subscribe(
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
