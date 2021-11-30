import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/apis/admin.service';

@Component({
  selector: 'app-editroute',
  templateUrl: './editroute.component.html',
  styleUrls: ['./editroute.component.scss'],
})
export class EditrouteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditrouteComponent>,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  form: FormGroup = new FormGroup({
    depart: new FormControl(this.data.depart, [
      Validators.required,
      Validators.minLength(3),
    ]),
    destination: new FormControl(this.data.destination, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  ngOnInit(): void {}

  envoyer() {
    this.form.value._id = this.data._id;

    this.adminService.editRoad(this.form.value).subscribe(
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
