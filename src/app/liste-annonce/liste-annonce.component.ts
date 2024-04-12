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



  constructor(private annonceService: AnnonceService) { }
  
  



  

  ngOnInit(): void {
    this.loadAnnonces();
  }

  loadAnnonces() {
    this.annonceService.recupererAnnonces().subscribe((annonces: AnnonceCovoiturage[]) => {
      this.annonces = annonces;
      this.filterAnnonces();
    });
  }

  filterAnnonces() {
    const filteredAnnonces = this.annonces.filter(annonce => {
      const lowerCaseDepart = annonce.depart.toLowerCase();
      const lowerCaseDestination = annonce.destination.toLowerCase();
      
      return (
        (!this.searchTerm1 || lowerCaseDepart.includes(this.searchTerm1.toLowerCase())) &&
        (!this.searchTerm2 || lowerCaseDestination.includes(this.searchTerm2.toLowerCase())) 
      );
    });

    this.showTable = filteredAnnonces.length > 0;
    this.loading = false;
  }

  


  onSearch(): void {
    if (this.searchTerm1 && this.searchTerm2 && this.searchDate) { // Check if searchDate is also provided
      this.annonceService.filtrerAnnonces(this.searchTerm1, this.searchTerm2, this.searchDate) // Include searchDate in the call
        .subscribe(annoncesFiltrees => {
          this.annonces = annoncesFiltrees;
          this.showTable = this.annonces.length > 0;
        });
    }
  }
}