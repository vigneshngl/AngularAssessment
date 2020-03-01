import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {

  courseForm : FormGroup
  maxCourseDuration = Array(12).fill(0).map((x, i) => i + 1)

  constructor() { }

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      name : new FormControl("", [Validators.required]),
      description : new FormControl (""),
      duration : new FormControl("", [Validators.required]),
      fees : new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+$')])
    })
  }

  addCourse() {

  }
}
