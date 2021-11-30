import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  type: string = 'success';
  ms: number = 5000;
  text: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<NotificationComponent>
  ) {}

  ngOnInit(): void {
    this.data.class ? (this.type = this.data.class) : '';
    this.data.number ? (this.ms = this.data.ms) : '';
    this.data.text ? (this.text = this.data.text) : '';
    setTimeout(() => {
      this.dialog.close();
    }, this.ms);
  }
}
