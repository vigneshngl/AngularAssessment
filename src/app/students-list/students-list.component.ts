import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from '../student.service';
import { Student } from '../classes/Student';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  displayedColumns = [ "name", "education", "gender", "email", "passyear",  "experience", "course", "edit" ]
  dataSource : any

  @ViewChild(MatSort, { static : true })
  sort : MatSort

  @ViewChild(MatPaginator, { static : true })
  paginator : MatPaginator

  constructor(private studentService : StudentService, private router : Router) { 
    this.loadTable()
  }

  loadTable() {
    this.studentService.getAllStudents().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void {
  }

  addStudent() {
    this.router.navigate(["student"])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteStudent(student : Student) {
    this.studentService.removeStudent(student).toPromise().then(error => {
      this.loadTable()
    })
  }

  editStudent(student : Student) {
    this.router.navigate(["/student", student.id])
  }

}
