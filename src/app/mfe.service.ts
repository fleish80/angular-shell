import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { buildRoutes } from './mfe-dynamic.routes';

@Injectable({
  providedIn: 'root',
})
export class MfeService {

  constructor(private router: Router) {}
  
  init() {
    return new Promise<void>((resolve, reject) => {
      const routes = buildRoutes(); //creates routes dynmacally
      this.router.resetConfig(routes);
      resolve();
    });
  }
}
