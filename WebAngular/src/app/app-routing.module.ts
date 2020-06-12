import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './components/Pages/landingpage/landingpage.component';
import {SliderComponent} from './components/Pages/slider/slider.component';
import {ProductdetailsComponent} from './components/static/cards-item/productdetails/productdetails.component';
import { CartComponent } from './components/static/cart/cart.component';
import { CheckoutComponent } from './components/Pages/checkout/checkout.component';
import { MyordersComponent } from './components/Pages/myorders/myorders.component';
import { UserprofileComponent } from './components/Pages/userprofile/userprofile.component';
import { DashboardComponent } from './components/Pages/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: LandingpageComponent},  
  {path: 'LandingPage', component: LandingpageComponent},
  {path :'test', component:SliderComponent},
  {path:'viewdetail',component:ProductdetailsComponent},
    {path:'viewcart',component:CartComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'myorders',component:MyordersComponent},
    {path:'myprofile',component:UserprofileComponent},
    {path:'dashboard', component:DashboardComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
