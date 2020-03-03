import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Student } from './classes/Student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedin : boolean
  empUrl = "http://localhost:3000/students"
  private student : Student

  constructor(private httpClient: HttpClient) { }

  private getStudent(email: string, password: string) {
    let params = new HttpParams().set('email', email).set('password', password)
    return this.httpClient.get<Student>(this.empUrl, {params})
  }

  login(email: string, password: string) {
    return new Observable<boolean | Student>((observer) => {

      this.getStudent(email, password).subscribe(data => {
        this.student = data
        if (this.student === undefined) {
          this.isLoggedin = false
          observer.next(false)
        } else {
          this.isLoggedin = true
          observer.next(this.student)
        }
      })
      
      return { unsubscribe() {} }
    })
  }

  getLoggedInStudent() {
    return this.student
  }

  logout() {
    this.isLoggedin = false
  }

  isLoggedIn() {
    return this.isLoggedin;
  }
}
