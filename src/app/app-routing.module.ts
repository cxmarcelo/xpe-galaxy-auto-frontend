import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './structure/main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule), },
      { path: 'cars', loadChildren: () => import('./pages/cars/cars.module').then((m) => m.CarsModule), },

      { path: '**', redirectTo: '/' },
    ]
  },
  //{ path: 'module8', loadChildren: () => import('./pages/module8/module8.module').then((m) => m.Module8Module), },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
