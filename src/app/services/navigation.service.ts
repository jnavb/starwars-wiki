import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Routes } from '../models/routing';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Navigation {
  constructor(
    private navController: NavController,
    private platform: Platform
  ) {}

  navigateForward(url: Routes, options?: NavigationOptions): Promise<boolean> {
    return this.navController.navigateForward(url, options);
  }

  navigateBack(url: Routes, options?: NavigationOptions): Promise<boolean> {
    return this.navController.navigateBack(url, options);
  }

  getBackText<T>(source: Observable<T>) {
    return source.pipe(filter(() => this.platform.is('ios')));
  }
}
