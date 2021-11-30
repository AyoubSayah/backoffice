import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AddrouteComponent } from './addroute/addroute.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditrouteComponent } from './editroute/editroute.component';

@NgModule({
  declarations: [RoutesComponent, AddrouteComponent, EditrouteComponent],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class RoutesModule {}
