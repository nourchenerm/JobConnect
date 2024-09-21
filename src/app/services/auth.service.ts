import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface EmailCheckResponse {
  exists: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  checkEmailExists(email: string): Observable<EmailCheckResponse> {
    return this.http.get<EmailCheckResponse>(`${this.apiUrl}/email/${email}`);
  }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/sign-up`, user, {
      responseType: 'json' as 'json' // Assurez-vous que la réponse est attendue au format JSON
    });
  }
}