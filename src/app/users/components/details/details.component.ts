import { Subscription } from 'rxjs';
import { User } from './../../../models/User.model';
import { UserserviceService } from './../../service/userservice.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: any;
  user: User = {} as User;
  subscription: Subscription;
  subscriptionSnap: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserserviceService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
    }
    this.subscriptionSnap = this.route.params.subscribe((params: Params) => {
      this.id = params[`id`];
    });
    this.getUserById(this.id);
  }

  getUserById(id: string): void {
    this.subscription = this.userService.getById(id).subscribe((res) => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionSnap.unsubscribe();
  }
}
