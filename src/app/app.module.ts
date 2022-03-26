import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LockComponent } from './components/lock/lock.component';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { DownloadService } from './services/download.service';
import { ListingComponent } from './components/listing/listing.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SliderComponent } from './components/slider/slider.component';
import { HttpRequestInterceptor } from './network/http-request-interceptor';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceService } from './services/workspace.service';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { PropertyComponent } from './components/property/property.component';
import { ActionComponent } from './components/action/action.component';
import { ActionDetailComponent } from './components/action-detail/action-detail.component';
import { ModalComponent } from './components/modal/modal.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { MultimediaFormComponent } from './forms/multimedia-form/multimedia-form.component';
import { ActionFormComponent } from './forms/action-form/action-form.component';
import { ListingFormComponent } from './forms/listing-form/listing-form.component';
import { SpaceFormComponent } from './forms/space-form/space-form.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { ActionViewComponent } from './views/action-view/action-view.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PasswordChangeFormComponent } from './forms/password-change-form/password-change-form.component';
import { ListingWizardComponent } from './forms/listing-wizard/listing-wizard.component';
import { ToolsComponent } from './components/tools/tools.component';
import { SalesBulletinComponent } from './reports/sales-bulletin/sales-bulletin.component';
import { LeaseBulletinComponent } from './reports/lease-bulletin/lease-bulletin.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';





// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LockComponent,
    ListingComponent,
    TopBarComponent,
    SliderComponent,
    ListingDetailComponent,
    HomeComponent,
    TreeNodeComponent,
    PropertyComponent,
    ActionComponent,
    ActionDetailComponent,
    ModalComponent,
    EllipsisPipe,
    MultimediaFormComponent,
    ActionFormComponent,
    ListingFormComponent,
    SpaceFormComponent,
    PropertyDetailComponent,
    ActionViewComponent,
    UserAccountComponent,
    UserProfileComponent,
    PasswordChangeFormComponent,
    ListingWizardComponent,
    ToolsComponent,
    SalesBulletinComponent,
    LeaseBulletinComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  providers: [    
    AuthenticationService,
    DataService,
    DownloadService,
    WorkspaceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
