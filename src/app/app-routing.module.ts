import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnonceFormComponent } from './annonce-form/annonce-form.component';


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
