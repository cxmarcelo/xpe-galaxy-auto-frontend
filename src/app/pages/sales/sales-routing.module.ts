import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSalesPageComponent } from './search-sales-page/search-sales-page.component';

const routes: Routes = [
  { path: 'search', component: SearchSalesPageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
