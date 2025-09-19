import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnauthRouteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // For now, always allow access to home page
    // In a real application, this would check authentication status
    return true;
  }
}
