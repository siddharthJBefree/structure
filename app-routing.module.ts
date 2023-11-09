import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_ROUTES} from './core/constants/routes.const';
import {LayoutComponent} from './layout/layout.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: APP_ROUTES.login},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)},
  // {path: 'demo-table', loadComponent: () => import('./demo-table/demo-table.component').then((m) => m.DemoTableComponent)},
  {
    path: 'release-notes',
    component: LayoutComponent,
    children: [{path: '', loadComponent: () => import('./release-notes/release-notes.component').then((m) => m.ReleaseNotesComponent)}]
  },
  {path: 'error', loadChildren: () => import('./error/error.module').then((m) => m.ErrorModule)},
  {path: '**', redirectTo: APP_ROUTES.error404}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
