import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {
  private menuStatus = new BehaviorSubject<boolean>(false); 
  menuStatus$ = this.menuStatus.asObservable();
  toggleMenuStatus() {
    this.menuStatus.next(!this.menuStatus.value);
  }
}
