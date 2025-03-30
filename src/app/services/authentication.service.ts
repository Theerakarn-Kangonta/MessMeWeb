import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'https:/localhost:7045/api/';

  constructor() {}
  private http = inject(HttpClient)
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl + 'auth/login', { username, password } , { withCredentials: true });
  }
  register(registForm:any): Observable<any> {
    return this.http.post(this.apiUrl + 'auth/register', registForm,
      {headers: { 'Content-Type': 'application/json' }}
    );
  }
  logout() {
    localStorage.removeItem('authToken');
  }


  
}
