import { Component, OnInit } from '@angular/core';
import { AnnonceCovoiturage } from '../modele/annonce';
import { AnnonceService } from '../services/annonce.service';

@Component({
  selector: 'app-adminview',
  templateUrl: './adminview.component.html',
  styleUrls: ['./adminview.component.scss'] // Correction de la propriété 'styleUrl'
})
export class AdminviewComponent implements OnInit {

  annonces: AnnonceCovoiturage[] = [];
  searchTerm1: string = '';
  searchTerm2: string = '';
  showTable: boolean = false;
  loading: boolean = false;
  searchKeyword: string = '';
  searchDate: string = '';
  date1!: Date;

  constructor(private annonceService: AnnonceService) { }

  ngOnInit(): void {
    this.loadAnnonces(); // Appel de la méthode pour charger les annonces lors de l'initialisation du composant
  }

  loadAnnonces(): void {
    this.loading = true; // Indiquer que le chargement est en cours
    this.annonceService.recupererAnnonces().subscribe(
      (annonces: AnnonceCovoiturage[]) => {
        this.annonces = annonces;
        this.loading = false; // Indiquer que le chargement est terminé
      },
      (error) => {
        console.error('Erreur lors du chargement des annonces : ', error);
        this.loading = false; // Indiquer que le chargement est terminé, même en cas d'erreur
      }
    );
  }

  supprimerAnnonce(id: number): void {
    this.loading = true; // Indiquer que la suppression est en cours
    this.annonceService.supprimerAnnonce(id).subscribe(
      () => {
        // Supprimer l'annonce de la liste des annonces
        this.annonces = this.annonces.filter(annonce => parseInt(annonce.id) !== id);
        this.loading = false; // Indiquer que la suppression est terminée
        this.ngOnInit();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'annonce : ', error);
        this.loading = false; // Indiquer que la suppression est terminée, même en cas d'erreur
      }
    );
  }
}
