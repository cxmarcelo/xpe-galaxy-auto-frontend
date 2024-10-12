import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSalesPageComponent } from './search-sales-page/search-sales-page.component';
import { SearchCommissionsPageComponent } from './search-commissions-page/search-commissions-page.component';

const routes: Routes = [
  { path: 'search', component: SearchSalesPageComponent },
  { path: 'commissions', component: SearchCommissionsPageComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
