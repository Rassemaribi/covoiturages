import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';
import { ListeAnnonceComponent } from './liste-annonce/liste-annonce.component';
import { HomeComponent } from './home/home.component';
import { AdminviewComponent } from './adminview/adminview.component';
import { AnnoncesComponent } from './annonces/annonces.component';


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
  {
    path: 'home',
    pathMatch: 'full',
    component:HomeComponent
  },
  {
    path: 'adminview',
    pathMatch: 'full',
    component:AdminviewComponent
  },
  {
    path: 'annonces',
    pathMatch: 'full',
    component:AnnoncesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
