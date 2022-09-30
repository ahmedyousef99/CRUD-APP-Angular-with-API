import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';

const routes: Routes = [
  {
    path: ``,
    pathMatch: `full`,
    redirectTo: `home`,
  },
  {
    path: `home`,
    component: HomeComponent,
  },
  {
    path: `users`,
    loadChildren: () =>
      import(`./users/users.module`).then((m) => m.UsersModule),
  },
  {
    path: `**`,
    pathMatch: `full`,
    component: NotfoundpageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
