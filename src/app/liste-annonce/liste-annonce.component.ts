import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-liste-annonce',
  templateUrl: './liste-annonce.component.html',
  styleUrl: './liste-annonce.component.scss'
})
export class ListeAnnonceComponent implements OnInit {
  annonces: AnnonceCovoiturage[] = [];
  showTable: boolean = false;

  loading: boolean = true;
  searchKeyword: string = ''; // Global search keyword
  searchTerm1: string = ''; // Search term for Départ
  searchTerm2: string = ''; // Search term for Destination
 
  searchTerm4: string = ''; // Search term for Nombre de places
  date1!: Date ;



  filteredAnnonces: AnnonceCovoiturage[] = []; // Array to store filtered results

  constructor(private annonceService: AnnonceService) { }

  ngOnInit() { // Added the missing ngOnInit method
    this.annonceService.recupererAnnonces().subscribe((data: AnnonceCovoiturage[]) => {
      
      this.filteredAnnonces = this.annonces; // Initialize filteredAnnonces with all announcements
      this.loading = false;
      console.log("Fetched announcements:", this.annonces);
    });
  }

  clear(table: Table) {
    table.clear();
  }

  onSearch() {
    this.loading = true;
    
    console.log("Search terms:", this.searchTerm1, this.searchTerm2);
    
    this.filteredAnnonces = this.annonces.filter(annonce => {
      const lowerCaseDepart = annonce.depart.toLowerCase();
      const lowerCaseDestination = annonce.destination.toLowerCase();
      
      return (
        (!this.searchTerm1 || lowerCaseDepart.includes(this.searchTerm1.toLowerCase())) &&
        (!this.searchTerm2 || lowerCaseDestination.includes(this.searchTerm2.toLowerCase())) 
        
      );
    });
    
    this.showTable = this.filteredAnnonces.length > 0;
    
    console.log("Filtered announcements:", this.filteredAnnonces);
    this.loading = false;
  }
  
  // Fonction pour comparer les dates en ignorant les heures
  compareDates(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
  
  
   
isValidDate(value: any): boolean {
  return value && value instanceof Date && !isNaN(value.getTime());
}

}