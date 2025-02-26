import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    // Si no está autenticado, redirigir al login
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};

export const publicGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Si está autenticado, redirigir a la página principal
    router.navigate(['/']);
    return false;
  }

  return true;
}; 