import { Injectable } from '@angular/core';
import { Student } from './classes/Student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentUrl = "http://localhost:3000/students"

  constructor(private httpClient : HttpClient) { }

  getAllStudents() {
    return this.httpClient.get<Student[]>(this.studentUrl)
  }

  getStudent(id : number) {
    return this.httpClient.get<Student>(`${this.studentUrl}/${id}`)
  }

  addNewStudent(newStudent : Student) {
    return this.httpClient.post(this.studentUrl, newStudent)
  }

  updateStudentDetail(student) {
    return this.httpClient.put(`${this.studentUrl}/${student.id}`, student)
  }

  removeStudent(student) {
    return this.httpClient.delete(`${this.studentUrl}/${student.id}`)
  }
}
