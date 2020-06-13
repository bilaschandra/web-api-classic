import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidemenuComponent } from './components/static/sidemenu/sidemenu.component';
import { LandingpageComponent } from './components/Pages/landingpage/landingpage.component';
import { TopmenuComponent } from './components/static/topmenu/topmenu.component';
import { SearchComponent } from './components/static/search/search.component';
import { LoginComponent } from './components/static/login/login.component';
import { ModalComponent } from './components/static/modal/modal.component';
import { SignupComponent } from './components/static/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './components/Pages/slider/slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsItemComponent } from './components/static/cards-item/cards-item.component';
import { ProductsComponent } from './components/static/cards-item/products/products.component';
import { CartComponent } from './components/static/cart/cart.component';
import { ProductdetailsComponent } from './components/static/cards-item/productdetails/productdetails.component';
import { CheckoutComponent } from './components/Pages/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { ImageviewerComponent } from './components/static/imageviewer/imageviewer.component'
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './Pipe/filter/filter.pipe';
import { RangeComponent } from './components/static/range/range.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RangePipe } from './Pipe/range/range.pipe';
import { UserprofileComponent } from './components/Pages/userprofile/userprofile.component';
import { MyordersComponent } from './components/Pages/myorders/myorders.component';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule,
} from '@angular/material';
import { MatTableModule } from '@angular/material/table'
import { CdkTableModule } from '@angular/cdk/table';
import { DashboardComponent } from './components/Pages/dashboard/dashboard.component';
import { AdminsidebarComponent } from './components/Pages/dashboard/adminsidebar/adminsidebar.component';
import { AdmincategoryComponent } from './components/Pages/dashboard/adminsidebar/admincategory/admincategory.component';
import { AdminorderComponent } from './components/Pages/dashboard/adminsidebar/adminorder/adminorder.component';
import { AdminuserComponent } from './components/Pages/dashboard/adminsidebar/adminuser/adminuser.component';
import { AdminproductComponent } from './components/Pages/dashboard/adminsidebar/adminproduct/adminproduct.component';
import { AdmintransactionComponent } from './components/Pages/dashboard/adminsidebar/admintransaction/admintransaction.component';
import { DatePipe } from '@angular/common';
import { PaymentmethodComponent } from './components/Pages/checkout/paymentmethod/paymentmethod.component';
import { FooterComponent } from './components/Pages/footer/footer.component'; 
import { SeachPipe } from './Pipe/search/seach.pipe';
import { FilteritemsPipe } from './Pipe/search/filteritems.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    LandingpageComponent,
    TopmenuComponent,
    SearchComponent,
    LoginComponent,
    ModalComponent,
    SignupComponent,
    SliderComponent,
    CardsItemComponent,
    ProductsComponent,
    CartComponent,
    ProductdetailsComponent,
    CheckoutComponent,
    FilterPipe,
    ImageviewerComponent, RangeComponent, RangePipe, UserprofileComponent, MyordersComponent, DashboardComponent, AdminsidebarComponent, AdmincategoryComponent
    , AdminorderComponent, AdminuserComponent, AdminproductComponent, PaymentmethodComponent, FooterComponent, SeachPipe, FilteritemsPipe,
    AdmintransactionComponent

  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    Ng5SliderModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
    MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatTableModule,
    


  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
