import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { UserserviceService } from '../../service/userservice.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  id: string;
  isEditPage: boolean = false;
  user: User = {} as User;
  subscriptionSnap: Subscription;
  formDataTable: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private usersService: UserserviceService
  ) {
    this.initializeFormGroup();
  }
  getUserById(id: string): void {
    this.subscriptionSnap = this.usersService.getById(id).subscribe(
      (res) => {
        this.user = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  initializeFormGroup(): void {
    this.formDataTable = new FormGroup({
      firstName: new FormControl(``),
      lastName: new FormControl(``),
      email: new FormControl(``),
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.isEditPage = true;
      this.getUserById(this.id);
      // this.formDataTable.setValue({
      //   firstName: this.user.first_name,
      //   lastName: this.user.last_name,
      //   email: this.user.email,
      // });
      this.subscriptionSnap = this.route.params.subscribe((params: Params) => {
        this.id = params[`id`];
      });
    }
  }

  onClickSaveEditUser(): void {
    let newUser: User = {
      email: this.formDataTable.get('email').value,
      first_name: this.formDataTable.get('firstName').value,
      last_name: this.formDataTable.get('lastName').value,
      avatar: `none`,
      id: this.id,
    };
    this.usersService.update(newUser).subscribe(
      (res) => {
        console.log(`done`);
      },
      (error) => {
        console.log(`not done`);
      }
    );
  }
  onClickAddUser(): void {
    let newUser: User = {
      email: this.formDataTable.get('email').value,
      first_name: this.formDataTable.get('firstName').value,
      last_name: this.formDataTable.get('lastName').value,
      avatar: `none`,
      id: null,
    };
    this.usersService.add(newUser).subscribe(
      (res) => {
        console.log(`done`);
      },
      (error) => {
        console.log(`not done`);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptionSnap) {
      this.subscriptionSnap.unsubscribe();
    }
  }
}
