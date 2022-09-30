import { Component, OnInit, OnDestroy } from '@angular/core';
import { from, merge, mergeMap, Subscription } from 'rxjs';
import { DataBE } from 'src/app/models/DataBE.model';
import { User } from 'src/app/models/User.model';
import { UserserviceService } from '../../service/userservice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  listOfUsers: User[] = [];
  subscription: Subscription;
  checkedItems: boolean[] = [];
  page: number;
  valueOfselectAll: boolean;

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  ///////////////////to get all users from http/////////
  getUsers(): void {
    this.subscription = this.userService.getAll().subscribe((res) => {
      let resultBE: DataBE<User> = res;
      this.listOfUsers = resultBE.data;
      this.checkedItems = Array.from(
        new Array(resultBE.data.length).keys(),
        (item) => false
      );
    });
  }

  ///////////////////////for select all//////////////
  onSelectAll(value: boolean): void {
    var SelectAll = document.querySelectorAll(`label`);

    if (value) {
      SelectAll.forEach((e) => {
        e.textContent = 'Selected';
      });
    } else {
      SelectAll.forEach((e) => {
        e.textContent = 'Select';
      });
    }
    this.valueOfselectAll = value;
    this.checkedItems = Array.from(
      new Array(this.listOfUsers.length).keys(),
      (item) => value
    );
  }
  ////////////////for select one user//////////////////
  onSelect(value: boolean, index: number): void {
    var SelectAll = document.querySelectorAll(`label`);

    if (value) {
      SelectAll[index + 1].textContent = 'Checked';
    } else {
      SelectAll[index + 1].textContent = 'Check';
    }
    this.checkedItems[index] = value;
  }

  ///////////////////////button for delete all by Selectors
  onClickSelectedAll(): void {
    var checkedItemsId: string[] = [];
    this.checkedItems.forEach((value, index) => {
      if (value) {
        checkedItemsId.push(this.listOfUsers[index].id);
      }
    });
    var obsIds = from(checkedItemsId);
    obsIds
      .pipe(
        mergeMap((value) => {
          return this.userService.delete(value);
        })
      )
      .subscribe((res) => {
        console.log(`user with id  was deleted by selected all`);
      });
    this.checkedItems = Array.from(
      new Array(this.listOfUsers.length).keys(),
      (item) => false
    );
  }

  ///////////////buttom for delete by ID/////////////
  onDeleteClick(id: string): void {
    this.userService.delete(id).subscribe((res) => {
      console.log(`User #${id} Deleted`);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
