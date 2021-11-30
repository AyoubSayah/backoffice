import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/apis/user.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { User } from 'src/app/types/user';
import { AdduserComponent } from './adduser/adduser.component';
import { MatSort, Sort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { EdiuserComponent } from './ediuser/ediuser.component';

const ELEMENT_DATA: User[] = [
  {
    firstname: '',
  },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort | undefined;
  load = false;
  liste: User[] = [];
  copyliste: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dialog: MatDialog, private Userservice: UserService) {}
  ngAfterViewInit() {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.Userservice.getusers().subscribe((res) => {
      this.load = true;

      this.liste = res;
      this.copyliste = [...this.liste];
      this.dataSource = new MatTableDataSource(this.liste);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {});
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 200) {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'success', text: 'user successfully created' },
        });
        this.getUsers();
      } else if (data === 'error') {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'error', text: 'this email is aleardy used' },
        });
      }
    });
  }
  EditDialog(data: any): void {
    const dialogRef = this.dialog.open(EdiuserComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 200) {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'success', text: 'user successfully created' },
        });
        this.getUsers();
      } else if (data === 'error') {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'error', text: 'this email is aleardy used' },
        });
      }
    });
  }
  delete(id: string) {
    Swal.fire({
      title: 'Do you really want to delete this user?',
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: `Delete`,
      showConfirmButton: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.Userservice.deleteuser(id).subscribe((res: any) => {
          if (res.status == 200) {
            Swal.fire('deleted!', '', 'error');
            this.getUsers();
          }
        });
      }
    });
  }
  changed(e: any) {
    console.log(e);

    const input = e.target.value;

    this.dataSource = new MatTableDataSource(
      this.copyliste.filter((data: any) => {
        if (
          data.firstname.includes(input) ||
          data.lastname.includes(input) ||
          data.email.includes(input)
        )
          return data;
      })
    );
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }
}
