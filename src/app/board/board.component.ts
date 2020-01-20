import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JobListService } from '../job-list.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  newList: string;
  isAddingNewList: false;
  jobLists;

  constructor(
    private jobListService: JobListService
  ) { }

  ngOnInit() {
    this.jobLists = this.jobListService.getJobLists();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNewList() {
    const result = this.jobListService.addNewList(this.newList);
    if (result) {
      this.newList = '';
      this.isAddingNewList = false;
    }
  }


  deleteList(listIndex: number) {
    this.jobListService.deleteList(listIndex);
  }

  addNewJob(listIndex, value) {
    this.jobListService.addNewJob(listIndex, value);
  }


  deleteJob(listIndex, jobIndex) {
    this.jobListService.deleteJob(listIndex, jobIndex);
  }

}
