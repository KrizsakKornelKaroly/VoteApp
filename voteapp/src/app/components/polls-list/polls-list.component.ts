import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-polls-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './polls-list.component.html',
  styleUrl: './polls-list.component.scss'
})

export class PollsListComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  polls: Poll[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiService.getPolls().subscribe(pollsData => {
      const any: any = pollsData;

      if (any) {
        this.polls = any;
      }
    });
  }

  deletePoll(id: number) {
    this.apiService.deletePoll(id).subscribe(response => {
      alert('Sikeres törlés!');
      this.getData();
      this.polls = this.polls.filter(poll => poll.id !== id);
    }, error => {
      alert('A szavazás törlése sikertelen.');
    });
  }

  openPoll(id: number) {
    this.router.navigate(['/polls', id]);
  }

  showPollResults(id: number){
    this.router.navigate(['/polls', id, 'stats']);
  }

}

export interface Poll {
  id: number;
  title: string;
  created_at: string;
}
