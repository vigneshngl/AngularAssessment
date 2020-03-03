import { Component, OnInit } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../classes/Student';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  welcomeText : string
  loginSuccess : boolean

  constructor(private authService : AuthService, private dialog : MatDialog) { }

  ngOnInit(): void {
  }

  login() {    
    let loginStudent = new Student()    
    const dialogRef = this.dialog.open(LoginDialogComponent, { width : '475px', data : { loginStudent } })

    dialogRef.afterClosed().subscribe(result => {
      this.authService.login(result.email, result.password)
      .subscribe(data => {
        if (data === false) {
          alert("Please try login again!")
          this.setWelcomeText('')
          this.loginSuccess = false
        } else {
          loginStudent = data[0] as Student
          this.setWelcomeText(loginStudent.name)
          this.loginSuccess = true
        }
      })
    })
  }

  setWelcomeText(name : string) {
    this.welcomeText = name == '' ? '' : `Welcome, ${name} !`
  }

  logout() {
    this.loginSuccess = false
    this.authService.logout();
  }

  showWelcomeText() {
    // return this.authService.isLoggedIn()
    let result = (this.loginSuccess === undefined) ? false : this.loginSuccess
    // console.log(result)
    return result
  }

  showLogin() {
    // return !this.authService.isLoggedIn()
    return (this.loginSuccess === undefined) ? true : !this.loginSuccess
  }
}
