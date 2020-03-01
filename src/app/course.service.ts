import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from './classes/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseUrl = "http://localhost:3000/courses"

  constructor(private httpClient : HttpClient) { }

  getAllCourses() {
    return this.httpClient.get<Course[]>(this.courseUrl)
  }

  getCourse(id : number) {
    return this.httpClient.get<Course>(`${this.courseUrl}/${id}`)
  }

  addNewCourse(newCourse : Course) {
    return this.httpClient.post(this.courseUrl, newCourse)
  }

  editCourse(course) {
    return this.httpClient.put(this.courseUrl, course)
  }

  removeCourse(course) {
    return this.httpClient.delete(this.courseUrl, course)
  }
}
