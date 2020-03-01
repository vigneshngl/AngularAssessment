import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Course } from '../classes/Course';
import { CourseService } from '../course.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {

  id : number
  isAddPage : boolean = true
  courseForm : FormGroup
  course : Course
  maxCourseDuration = Array(12).fill(0).map((x, i) => i + 1)

  constructor(private courseService : CourseService, private router : Router,
    private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => { 
      this.id = params["id"]
      this.isAddPage = false

      this.courseService.getCourse(this.id).subscribe(data => {
        this.course = data
        this.loadFormData(this.course)
      })
    })

    this.course = new Course()
    this.loadFormData(this.course)
  }

  loadFormData(course : Course) {
    this.courseForm = new FormGroup({
      name : new FormControl(course.name, [Validators.required]),
      description : new FormControl (course.description),
      duration : new FormControl(course.duration, [Validators.required]),
      fees : new FormControl(course.fees, [Validators.required, Validators.pattern('^[0-9.]+$')])
    })
  }

  addCourse() {
    if (this.isAddPage) {
      let newCourse : Course = this.courseForm.value
      this.courseService.addNewCourse(newCourse).subscribe(data => {
        this.router.navigate(["courses"])
        return false
      })
    } else {
      let course : Course = this.courseForm.value
      console.log(course)
      course.id = this.course.id
      this.courseService.editCourse(course).toPromise().then((error) => {
        this.router.navigate(["courses"])
        return false
      })
    }
  }
}
