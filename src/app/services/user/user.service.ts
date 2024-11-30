import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) {}

  user?: User | undefined | null;
  hasLogged!: boolean

  verifyOrInsertUser(social: string, id: string): void {

    this.httpClient.get<User>(`${this.apiUrl}/${id}`).subscribe({
      next: () => {},
      error: () => {
        this.insertUser(id, String(this.user?.name), String(this.user?.email), social); 
      }
    });
  }
  
  private insertUser(id: string, name: string, email: string, social: string): void {
    const newUser: Partial<User> = { id, name: name, email: email, socialLoginProvider: social};
    this.httpClient.post(`${this.apiUrl}`, newUser).subscribe(() => {
      console.log('Usuário inserido com sucesso!');
    });
  }
}