import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  // Usando BehaviorSubject para emitir e armazenar o estado do menu
  private menuStatus = new BehaviorSubject<boolean>(false); // false significa fechado, true significa aberto

  // Observável para que os componentes possam escutar as mudanças
  menuStatus$ = this.menuStatus.asObservable();

  // Método para alterar o estado do menu
  toggleMenuStatus() {
    this.menuStatus.next(!this.menuStatus.value);
  }
}
