import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { HomeComponent } from './components/home/home.component';
import { NotfoundpageComponent } from './components/notfoundpage/notfoundpage.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotfoundpageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
