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
    if (this.searchTerm1 && this.searchTerm2 ) { // Check if searchDate is also provided
      this.annonceService.filtrerAnnonces(this.searchTerm1, this.searchTerm2) // Include searchDate in the call
        .subscribe(annoncesFiltrees => {
          this.annonces = annoncesFiltrees;
          this.showTable = this.annonces.length > 0;
        });
    }
  }
}