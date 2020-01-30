import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ApiComponent } from './components/api/api.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { DemoComponent } from './components/demo/demo.component';
import { DocumentationComponent } from './components/documenation/documentation.component';

const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'api',
        component: ApiComponent
      },
      {
        path: 'responsive',
        component: ResponsiveComponent
      }
    ]
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'responsive',
    component: ResponsiveComponent
  }
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
