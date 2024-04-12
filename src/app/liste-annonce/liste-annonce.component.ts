import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';


@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.scss']
  
})
export class ListeAnnonceComponent  {
  annonces: AnnonceCovoiturage[] = [];
  searchTerm1: string = '';
  searchTerm2: string = '';
  showTable: boolean = false;
  loading: boolean = false;
  searchKeyword: string = '';
  searchDate: string = '';


  constructor(private annonceService: AnnonceService) { }
  
  onSearch(): void {
    if (this.searchTerm1 && this.searchTerm2) {
      const searchTerm1Lower = this.searchTerm1.toUpperCase();
      const searchTerm2Lower = this.searchTerm2.toUpperCase();

      this.annonceService.filtrerAnnonces(searchTerm1Lower, searchTerm2Lower)
        .subscribe(annoncesFiltrees => {
          this.annonces = annoncesFiltrees;
          this.showTable = this.annonces.length > 0;
        });
    }
  }

}