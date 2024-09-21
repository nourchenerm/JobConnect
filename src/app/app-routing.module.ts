import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LogComponent } from './log/log.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {path: '' , component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'log', component: LogComponent},
  { path: 'forget-password', component:  ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }