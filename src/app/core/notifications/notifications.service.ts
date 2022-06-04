import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  message = '';
  notification: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  alertStatus: BehaviorSubject<{content: string, style: string, type: number, show: boolean}> = 
    new BehaviorSubject<{content: string, style: string, type: number, show: boolean}>
      ({content: 'testing', style: 'info', type: 0, show: false});

  publishMessages(content: string, style: string, type: number): void {
    this.alertStatus.next({ content, style, type: 0, show: true });
    setTimeout(() => {
      this.dismissMessage();
    }, 10000);
  }

  dismissMessage(): void {
    this.alertStatus.next({ content: '', style: 'info', type: 0, show: false });
  }

}
