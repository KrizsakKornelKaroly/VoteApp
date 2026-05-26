import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  getPolls() {
    return this.http.get(`${this.server}/api/polls`);
  }

  newPoll(title: string){
    return this.http.post(`${this.server}/api/polls`, { title });
  }

  deletePoll(id: number) {
    return this.http.delete(`${this.server}/api/polls/${id}`);
  }

  getPollOptions(id: string){
    return this.http.get(`${this.server}/api/polls/${id}/options`);
  }

  newPollOption(poll_id: number, name: string) {
    return this.http.post(`${this.server}/api/options`, { poll_id, name });
  }

  deletePollOption(id: string) {
    return this.http.delete(`${this.server}/api/options/${id}`);
  }

  newVote(option_id: number) {
    return this.http.post(`${this.server}/api/votes`, { option_id });
  }

  getPollStats(id: string) {
    return this.http.get(`${this.server}/api/polls/${id}/stats`);
  }

}

