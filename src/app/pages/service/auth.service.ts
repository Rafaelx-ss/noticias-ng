import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor() {
    // Verificar si hay un token almacenado al iniciar
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // Aquí implementarías tu lógica real de autenticación
    // Por ahora solo simularemos un login exitoso
    localStorage.setItem('token', 'dummy-token');
    this.isAuthenticated.next(true);
    return true;
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated.value;
  }
} 