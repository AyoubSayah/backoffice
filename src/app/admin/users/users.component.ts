import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AdduserComponent } from './adduser/adduser.component';

export interface PeriodicElement {
  Nom_admin: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Nom_admin: 'Hydrogen' },
  { Nom_admin: 'Helium' },
  { Nom_admin: 'Lithium' },
  { Nom_admin: 'Beryllium' },
  { Nom_admin: 'Boron' },
  { Nom_admin: 'Carbon' },
  { Nom_admin: 'Nitrogen' },
  { Nom_admin: 'Oxygen' },
  { Nom_admin: 'Fluorine' },
  { Nom_admin: 'Neon' },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  liste: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(public dialog: MatDialog) {}
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AdduserComponent, {});
  }
  ngOnInit(): void {}
}
