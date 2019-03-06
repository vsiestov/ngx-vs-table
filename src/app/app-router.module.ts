import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NestedComponent } from './components/nested/nested.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { RecursiveComponent } from './components/recursive/recursive.component';
import { FiltersComponent } from './components/filters/filters.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'nested-properties-and-custom-cells',
    component: NestedComponent
  },
  {
    path: 'expandable',
    component: ExpandableComponent
  },
  {
    path: 'recursive',
    component: RecursiveComponent
  },
  {
    path: 'filters',
    component: FiltersComponent
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
