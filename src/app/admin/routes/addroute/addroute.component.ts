import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.scss'],
})
export class AddrouteComponent implements OnInit {
  constructor(private dialogRef: MatDialog) {}
  form: FormGroup = new FormGroup({
    departure: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    destination: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  ngOnInit(): void {}

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
