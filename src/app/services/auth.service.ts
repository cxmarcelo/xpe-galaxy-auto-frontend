import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = "APP_JWT_TOKEN";
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.saveToken(response.token);
          }
          return response;
        }),
      );
  }

  public respondToNewPassword(session: string, username: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/respond-to-new-password`, { session, username, newPassword })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.saveToken(response.token);
          }
          return response;
        }),
      );
  }

  public saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public getJwtToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  //TODO
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

}
