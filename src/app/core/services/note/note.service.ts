import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

const routes = {
  note: 'note',
};

@Injectable({
  providedIn: 'root'
})

export class NoteService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  createNote(payload: any): Observable<any> {
    return this.sendPost(this.baseUrl(`${routes.note}`), payload);
  }

  updateNote(id: any, payload: any): Observable<any> {
    return this.sendPut(this.baseUrl(`${routes.note}/${id}`), payload);
  }

  getAllNotes(page: any, per_page: any): Observable<any> {
    return this.sendGet(this.baseUrl(`${routes.note}?page=${page}&per_page=${per_page}`));
  }

  getNote(id: any): Observable<any> {
    return this.sendGet(this.baseUrl(`${routes.note}/${id}`));
  }

  deleteNote(id: any): Observable<any> {
    return this.sendDelete(this.baseUrl(`${routes.note}/${id}`));
  }

}
