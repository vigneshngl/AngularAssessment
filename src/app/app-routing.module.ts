import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "course", component: ManageCourseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
