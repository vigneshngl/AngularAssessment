import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageCourseComponent } from './manage-course/manage-course.component';
import { SignupComponent } from './signup/signup.component';
import { CourseListComponent } from './course-list/course-list.component';
import { StudentsListComponent } from './students-list/students-list.component';


const routes: Routes = [
  { path: "signup", component: SignupComponent },
  { path: "student", component: SignupComponent },
  { path: "student/:id", component: SignupComponent},
  { path: "students", component: StudentsListComponent },
  { path: "course", component: ManageCourseComponent },
  { path: "course/:id", component: ManageCourseComponent},
  { path: "courses", component: CourseListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
