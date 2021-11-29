import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddrouteComponent } from './addroute/addroute.component';

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
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['depart', 'destination', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  liste: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private dialog: MatDialog) {}
  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddrouteComponent, {});
  }
  ngOnInit(): void {}
}
