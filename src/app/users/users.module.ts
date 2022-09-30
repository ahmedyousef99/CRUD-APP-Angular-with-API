import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { DetailsComponent } from './components/details/details.component';
import { ReactiveFormsModule } from '@angular/forms';

var Components = [ListComponent, EditComponent, DetailsComponent];
@NgModule({
  declarations: [Components],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
  exports: [Components],
})
export class UsersModule {}
