import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent } from './components/home/home.component';
import { PropertyComponent } from './components/property/property.component';
import { LockComponent } from './components/lock/lock.component';
import { ListingComponent } from './components/listing/listing.component';
import { ModalComponent } from './components/modal/modal.component';
import { ActionComponent } from './components/action/action.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ToolsComponent } from './components/tools/tools.component';
import { LeaseBulletinComponent } from './reports/lease-bulletin/lease-bulletin.component';
import { SalesBulletinComponent } from './reports/sales-bulletin/sales-bulletin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'  
  },
  {
    path: 'gate',
    component: LockComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'modal',
    component: ModalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listings',
    component: ListingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: ListingDetailComponent,
      }
    ]
  },
  {
    path: 'actions',
    component: ActionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'actions/:id',
    component: ActionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'properties',
    component: PropertyComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: PropertyDetailComponent
      }
    ]
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-profile',
        component: UserProfileComponent,
      },
      {
        path: '',
        redirectTo: 'user-profile',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'tools',
    component: ToolsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'sales-bulletin',
        pathMatch: 'full',
      },
      {
        path: 'sales-bulletin',
        component: SalesBulletinComponent,
        pathMatch: 'full',
      },
      {
        path: 'lease-bulletin',
        component: LeaseBulletinComponent,
        pathMatch: 'full',
      },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
