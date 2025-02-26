import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backend } from '../../../context/endpoints';

interface AuthResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
    expires_in: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {
    // Verificar si hay un token almacenado al iniciar
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías agregar una validación adicional del token si es necesario
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${backend}/api/auth/login`, { email, password })
      );

      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.user.id.toString());
        localStorage.setItem('name', response.data.user.name);
        localStorage.setItem('email', response.data.user.email);
        this.isAuthenticated.next(true);
        return true;
      }
      if (response.status === 401 && response.message === "Credenciales inválidas") {
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${backend}/api/auth/register`, { name: name, email: email, password: password })
      );
      if (response.success) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.isAuthenticated.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated.value;
  }
}