import { Injectable } from '@angular/core';
import { JobList } from '../app/job-list.model';

@Injectable({
  providedIn: 'root'
})
export class JobListService {

  jobLists: JobList[] = [];

  constructor() {
    this.updateLocalStorage();
    this.getJobLists();
  }

  getJobLists() {
    if (window && window.localStorage) {
      this.jobLists = JSON.parse(window.localStorage.getItem('jobLists'));
    }

    return this.jobLists;
  }

  addNewList(listName) {
    console.log('listName', listName);
    if (listName.trim() !== '') {
      this.jobLists.push({
        title: listName,
        jobs: [],
        newJob: ''
      });

      this.updateLocalStorage();
      console.log('getAttr', this.jobLists);
      return true;
    }
    return false;
  }

  deleteList(listIndex: number) {
    if (this.jobLists[listIndex]) {
      this.jobLists.splice(listIndex, 1);

      this.updateLocalStorage();

      return true;
    }

    return false;
  }

  addNewJob(listIndex, jobName) {
    if (jobName.trim() !== '') {
      let jobList = this.jobLists[listIndex];
      jobList.jobs.push(jobName);
      jobList.newJob = '';

      this.updateLocalStorage();

      return true;
    }

    return false;
  }

  deleteJob(listIndex, jobIndex): boolean {
    if (this.jobLists[listIndex]) {
      this.jobLists[listIndex].jobs.splice(jobIndex, 1);

      this.updateLocalStorage();

      return true;
    }

    return false;
  }


  updateLocalStorage() {
    if (window && window.localStorage) {
      window.localStorage.setItem('jobLists', JSON.stringify(this.jobLists));
    }
  }
}
