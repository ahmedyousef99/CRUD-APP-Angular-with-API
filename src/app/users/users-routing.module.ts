import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: ``,
    pathMatch: `full`,
    redirectTo: `list-users`,
  },
  {
    path: `list-users`,
    component: ListComponent,
  },
  {
    path: `edit/:id`,
    component: EditComponent,
  },
  {
    path: `add`,
    component: EditComponent,
  },
  {
    path: `details/:id`,
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
