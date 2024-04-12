import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrls: ['./liste-annonce.component.scss']
})
export class ListeAnnonceComponent implements OnInit {
  annonces: AnnonceCovoiturage[] = [];
  showTable: boolean = false;
  loading: boolean = true;
  searchTerm1: string = '';
  searchTerm2: string = '';
  searchKeyword:string='';

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

  onSearch() {
    this.loading = true;
    this.filterAnnonces();
  }
}
