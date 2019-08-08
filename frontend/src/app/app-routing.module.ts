import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.module";

const routes: Routes = [
  // {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
