import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss'],
})
export class AdduserComponent implements OnInit {
  constructor(private dialogRef: MatDialog) {}
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
    // this.apis.ajouteradmin(this.form.value).subscribe((res: any) => {
    //   if (res.status == 'success') {
    //     Swal.fire('Admin ajouté', '', 'success').then(() => {
    //       this.dialogRef.closeAll();
    //     });
    //   } else {
    //     Swal.fire('Admin exist', '', 'error').then(() => {});
    //   }
    // });
  }
}
