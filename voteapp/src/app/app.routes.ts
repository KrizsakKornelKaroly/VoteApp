import { Routes } from '@angular/router';
import { PollsListComponent } from './components/polls-list/polls-list.component';
import { PollsCreateComponent } from './components/polls-create/polls-create.component';
import { PollsDetailComponent } from './components/polls-detail/polls-detail.component';
import { PollsStatsComponent } from './components/polls-stats/polls-stats.component';

export const routes: Routes = [
   
    {
        path: 'polls',
        component: PollsListComponent
    },
    {
        path: 'polls/new',
        component: PollsCreateComponent
    },
    {
        path: 'polls/:id',
        component: PollsDetailComponent
    },
    {
        path: 'polls/:id/stats',
        component: PollsStatsComponent
    },
    {
        path: '',
        redirectTo: '/polls',
        pathMatch: 'full'
    },

];
