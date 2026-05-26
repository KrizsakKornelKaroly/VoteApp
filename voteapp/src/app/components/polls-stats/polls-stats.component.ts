import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-polls-stats',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './polls-stats.component.html',
  styleUrl: './polls-stats.component.scss'
})
export class PollsStatsComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  pollStats: any[] = [];
  
  ngOnInit(){
    this.getPollStats();
  }

  getPollStats() {
    const pollId = this.router.url.split('/')[2];
    this.apiService.getPollStats(pollId).subscribe(statsData => {
      const any: any = statsData;
      if (any) {
        this.pollStats = any;
      }
    });
  }

  goBack(){
    this.router.navigate(['/polls']);
  }
}
