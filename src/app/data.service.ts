import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
    return this._http.get("/api/users")
      .map(result => this.result = result.json().data);
  }

  addUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('/api/users', JSON.stringify(newUser), {headers: headers})
        .map(result => this.result = result.json());
  }

  deleteUser(id){
    return this._http.delete('/api/users/'+id)
        .map(res => res.json());
  }

  updateUser(user){
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.put('/api/users/'+user._id, JSON.stringify(user), {headers: headers})
          .map(res => res.json());
  }

}