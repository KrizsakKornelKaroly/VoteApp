import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-polls-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './polls-detail.component.html',
  styleUrl: './polls-detail.component.scss'
})
export class PollsDetailComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ){}

  ngOnInit(){
    this.getPollDetail();
  }
  pollOptions: any[] = [];
  newOptionName: string = '';

  getPollDetail() {
    const pollId = this.router.url.split('/').pop()!;
    this.apiService.getPollOptions(pollId).subscribe(pollData => {
      const any: any = pollData;
      if (any) {
        this.pollOptions = any;
      }
    });
  }

  newOption(){
    this.apiService.newPollOption(Number(this.router.url.split('/').pop()!), this.newOptionName).subscribe(response => {
      this.newOptionName = '';
      this.getPollDetail();
    });
  }

  deleteOption(id: string){
    this.apiService.deletePollOption(id).subscribe(response => {
      this.getPollDetail();
    });
  }

  voteOption(id: number){
    this.apiService.newVote(id).subscribe(response => {
      this.getPollDetail();
      alert('Köszönjük a szavazatát!');
    });
  }

  showResults(){
    this.router.navigate(['/polls', this.router.url.split('/').pop()!, 'stats']);
  }
}

export interface PollOption {
  id: number;
  poll_id: number;
  name: string;
}
