import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';


const routes: Routes = [
  {
    path:':id/edit',
    pathMatch:'full',
    component:AnnonceFormComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component:AnnonceFormComponent
  },
  {
    path: 'liste-annonce',
    pathMatch: 'full',
    component:ListeAnnonceComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
