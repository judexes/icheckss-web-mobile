import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private liveModal: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  // d must be an object. Call with an empty object i.e: {} if there are no values to be prefilled.
  LoadModal(m: string, d: any, r?: number): void{
    this.liveModal.next({ name: m, prefill: d, review: r });
  }

  unloadModal(): void{
    this.liveModal.next(null);
  }


  GetLiveModal$(): Observable<any>{
      return this.liveModal;
  }

}
