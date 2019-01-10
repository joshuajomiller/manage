import {User} from "../auth/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getUserDetails(email?: string) {
    return this.http.get('api/user/' + (email ? email : ''));
  }
}
