import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/apis/admin.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { Road } from 'src/app/types/road';
import { AddrouteComponent } from './addroute/addroute.component';
import Swal from 'sweetalert2';
import { EditrouteComponent } from './editroute/editroute.component';

export interface PeriodicElement {
  Nom_admin: string;
}
const ELEMENT_DATA: Road[] = [{}];
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  displayedColumns: string[] = ['depart', 'destination', 'actions'];
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource = new MatTableDataSource(ELEMENT_DATA);
  liste: Road[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  load = false;
  constructor(private dialog: MatDialog, private adminService: AdminService) {}
  ngOnInit() {
    this.getRoads();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddrouteComponent, {});
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 200) {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'success', text: 'Road successfully created' },
        });
        this.getRoads();
      } else if (data === 'error') {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'error', text: 'Try Later' },
        });
      }
    });
  }
  EditDialog(data: any): void {
    const dialogRef = this.dialog.open(EditrouteComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 200) {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'success', text: 'Road successfully Modified ' },
        });
        this.getRoads();
      } else if (data === 'error') {
        this.dialog.open(NotificationComponent, {
          panelClass: 'custom-modalbox',
          backdropClass: 'custom-backdrop',
          data: { class: 'error', text: 'Try Later' },
        });
      }
    });
  }
  getRoads() {
    this.adminService.getRoads().subscribe((res) => {
      this.load = true;

      this.liste = res;

      this.dataSource = new MatTableDataSource(this.liste);
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
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
        this.adminService.deleteRoad(id).subscribe((res: any) => {
          if (res.status == 200) {
            Swal.fire('deleted!', '', 'error');
            this.getRoads();
          }
        });
      }
    });
  }
}
