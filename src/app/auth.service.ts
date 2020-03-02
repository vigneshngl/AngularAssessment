import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from './classes/Student';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedin : boolean
  empUrl = "http://localhost:3000/students"

  constructor(private httpClient: HttpClient) { }

  private getStudent(email: string, password: string) {
    let params = new HttpParams().set('email', email).set('password', password)
    return this.httpClient.get<Student>(this.empUrl, {params})
  }

  login(email: string, password: string) {
    let student : Student

    this.getStudent(email, password).subscribe(data => {
      student = data
      if (student === undefined) {
        this.isLoggedin = false
        return false
      } else {
        this.isLoggedin = true
        return student
      }
    })    
  }

  logout() {
    this.isLoggedin = false
  }

  isLoggedIn() {
    return this.isLoggedin;
  }
}
