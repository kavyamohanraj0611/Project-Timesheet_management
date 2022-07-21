import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { RoleGuard } from './role.guard';
import { ProjectComponent } from './project/project.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: TimesheetListComponent },
    { path: 'employee-list', component: EmployeeListComponent,canActivate: [RoleGuard] },
    { path: 'project-list', component: ProjectListComponent, },
    { path: 'timesheet-list', component: TimesheetListComponent },
    { path: 'my-profile', component: ProfileComponent}]
  },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'timesheet/create-timesheet', component: TimesheetComponent, canActivate: [AuthGuard] },
  { path: 'timesheet/edit-timesheet/:_id', component: TimesheetComponent, canActivate: [AuthGuard] },
  { path: 'home/project/add-project', component: ProjectComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: 'employee/edit-employee/:_id', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
