import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private liveNotice: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }
  // d must be an object. Call with an empty object i.e: {} if there are no values to be prefilled.
  LoadNotice(m: string): void{
    this.liveNotice.next({ message: m});
    setTimeout(() => this.liveNotice.next(null), 4000);
  }

  unloadNotice(): void{
    this.liveNotice.next(null);
  }

  GetLiveNotice$(): Observable<any>{
      return this.liveNotice;
  }
}
