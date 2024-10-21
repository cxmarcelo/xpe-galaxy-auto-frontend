import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './structure/main/main.component';
import { jwtAuthGuard } from './auth/jwt-auth.guard';

const routes: Routes = [
  //TODO CAN ACTIVATE
  {
    path: '', component: MainComponent, canActivate: [jwtAuthGuard],
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule), },
      { path: 'cars', loadChildren: () => import('./pages/cars/cars.module').then((m) => m.CarsModule), },
      { path: 'sales', loadChildren: () => import('./pages/sales/sales.module').then((m) => m.SalesModule), },
    ]
  },
  { path: 'login', loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule), },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
