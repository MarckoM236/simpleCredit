import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CreditApplicationComponent } from './components/credit-application/credit-application.component';
import { CreditsComponent } from './components/credits/credits.component';
import { RefreshDirective } from './directives/refresh.directive';
import { AccessGuard } from './access.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes:Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard',component:DashboardComponent,canActivate: [AccessGuard]},
  {path:'user',component:UsersComponent,canActivate: [AccessGuard]},
  {path:'credits',component:CreditsComponent,canActivate: [AccessGuard]},
  {path:'creditsApl',component:CreditApplicationComponent,canActivate: [AccessGuard]},
  {path:'**',component:NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    CreditApplicationComponent,
    CreditsComponent,
    RefreshDirective,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
