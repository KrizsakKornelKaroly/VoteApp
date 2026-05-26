import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-polls-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './polls-create.component.html',
  styleUrl: './polls-create.component.scss'
})
export class PollsCreateComponent {

  title: string = '';

  constructor(
    private apiService: ApiService
  ){}

  createPoll() {
    this.apiService.newPoll(this.title).subscribe(response => {
        alert('Sikeres létrehozás!');
      }, error => {
        alert('A szavazás létrehozása sikertelen.');
      });
  }

}
