import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';

const routes = {
  createAccount: 'user/',
  login: 'user/login/v2',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http);
  }

  createAccount(payload: any): Observable<any> {
    return this.sendPost(this.baseUrl(`${routes.createAccount}`), payload);
  }

  login(payload: any): Observable<any> {
    return this.sendPost(this.baseUrl(`${routes.login}`), payload);
  }

}
