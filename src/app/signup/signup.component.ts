import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../classes/Course';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../classes/Student';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passyears = Array(20).fill(2000).map((x, i) =>  i + x)
  experiences = Array(20).fill(0).map((x, i) => i + 1)
  courses : Course[] = []
  educations = [ "B.E", "B.Tech", "M.C.A", "B.C.A" ]
  signupForm : FormGroup

  constructor(private courseService : CourseService, private studentService : StudentService,
    private router : Router) { 
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data
    })
  }

  ngOnInit(): void {
    let newStudent = new Student()
    this.loadFormData(newStudent)
  }

  loadFormData(student : Student) {
    this.signupForm = new FormGroup({
      name : new FormControl(student.name, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      education : new FormControl (student.education, [Validators.required]),
      gender : new FormControl(student.gender, [Validators.required]),
      email : new FormControl(student.email, [Validators.required, Validators.email]),
      password : new FormControl(student.password, [Validators.required, Validators.minLength(6)]),
      passyear : new FormControl(student.passyear),
      experience : new FormControl(student.experience),
      course : new FormControl(student.course)
    })
  }

  signup() {
    this.studentService.addNewStudent(this.signupForm.value).subscribe(data => {
      this.router.navigate(["students"])
    })
  }
}
