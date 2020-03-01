import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../course.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from '../classes/Course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  displayedColumns = [ "name", "description", "duration", "fees", "edit" ]
  dataSource : any

  @ViewChild(MatSort, { static : true })
  sort : MatSort

  @ViewChild(MatPaginator, { static : true })
  paginator : MatPaginator

  constructor(private courseService : CourseService, private router : Router) { 
    this.loadTable()
  }

  loadTable() {
    this.courseService.getAllCourses().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCourse(course : Course) {
    this.courseService.removeCourse(course).toPromise().then(error => {
      this.loadTable()
    })
  }

  editCourse(course : Course) {
    this.router.navigate(["/course", course.id])
  }
}
