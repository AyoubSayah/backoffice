import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/apis/admin.service';

@Component({
  selector: 'app-addroute',
  templateUrl: './addroute.component.html',
  styleUrls: ['./addroute.component.scss'],
})
export class AddrouteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddrouteComponent>,
    private adminService: AdminService
  ) {}
  form: FormGroup = new FormGroup({
    depart: new FormControl('', [Validators.required, Validators.minLength(3)]),
    destination: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  ngOnInit(): void {}

  envoyer() {
    this.adminService.addRoad(this.form.value).subscribe(
      (res: any) => {
        console.log(res);

        this.dialogRef.close(res.status);
      },
      (err) => {
        this.dialogRef.close('error');
        console.log(err);
      }
    );
  }
}
