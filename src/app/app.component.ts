import { Component } from '@angular/core';
import { User } from './user';
// Import the DataService
import { DataService } from './data.service';
//import { Observable } from 'rxjs';
//import { subscribe } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Define a users property to hold our user data
  users: Array<any>;
  //id: number;
  name: string;
  city: string;
  //age: int;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {

    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res);
  }

  activeUser: User;
  selectUser(user){
        this.activeUser = user;
        console.log(this.activeUser);
  }

  addUser(event){
    event.preventDefault();
    //console.log(this.id);
    console.log(this.name);
    console.log(this.city);
    var newUser = {
      //id: this.id,
      name: this.name,
      city: this.city
    }

   //
   this._dataService.addUser(newUser)
    .subscribe(user => {
      this.users.push(user);
      this.name = '';
      this.city = '';
    });
    //this.users.push(newUser);

   //return ;

    /*this._dataService.addUser(newUser)
        .subscribe(user => {
          this.users.push(user);
          this.name = '';
        });

    return ;*/
  }

  deleteUser(id) {
    var users = this.users;

    this._dataService.deleteUser(id).subscribe( data => {
      //this.users.splice(this.users.indexOf(id), 1);
      if(data.n == 1){
        for(var i = 0; i < users.length;i++){
          if(users[i]._id == id){
            users.splice(i, 1);
          }
        }
      }
    });
  }

  updateUser(user){
    var _user = {
        _id: user._id,
        name: user.name,
        city: user.city
    };
    console.log(user._id);
    console.log(user.name);
    console.log(user.city);
    
    this._dataService.updateUser(_user).
    subscribe( user =>{
      //user.id = _user._id;
      user.name = user.name;
      user.city = user.city;
    });
  }
}
