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
        } else {
          loginStudent = data[0] as Student
          this.setWelcomeText(loginStudent.name)
        }
      })
    })
  }

  setWelcomeText(name : string) {
    this.welcomeText = name == '' ? '' : `Welcome, ${name} !`
  }

  logout() {
    this.authService.logout();
  }

  showWelcomeText() {
    return this.authService.isLoggedIn()
  }

  showLogin() {
    return !this.authService.isLoggedIn()
  }
}
