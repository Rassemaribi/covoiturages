import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {forkJoin} from 'rxjs';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrl: './annonces.component.scss',
  providers: [MessageService, ConfirmationService] 
})
export class AnnoncesComponent implements OnInit {
  actifDialog: boolean = false;
  annonces!: AnnonceCovoiturage[];
  annonce!: AnnonceCovoiturage;
  selectedAnnonce!: AnnonceCovoiturage[] | null;
  annonceDetails!: AnnonceCovoiturage;

  searchKeyword: string = '';


  constructor(
    private annonceService: AnnonceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }


  ngOnInit(): void {
    this.annonceService.recupererAnnonces().subscribe((data: AnnonceCovoiturage[]) => {
      this.annonces = data;
    });


  }


  deleteSelectedAnnonce() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer les actifs sélectionnés ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.selectedAnnonce) {
          const deletionObservables = this.selectedAnnonce.map(annonce => this.annonceService.supprimerAnnonce(annonce.id));
          
          if (deletionObservables.length > 0) {
            forkJoin(deletionObservables).subscribe(() => {
              // All deletions successful
              this.ngOnInit(); // Refresh actives after deletion
              this.selectedAnnonce = [];
              this.messageService.add({severity: 'success', summary: 'Succès', detail: 'Actifs Supprimés avec succès'});
            }, (error) => {
              // Handle any errors during deletion
              this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression des actifs'});
            });
          } else {
            // Handle case where no deletion observables are generated
            this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Aucun actif sélectionné à supprimer'});
          }
        } else {
          // Handle case where this.selectedAnnonce is undefined
          this.messageService.add({severity: 'warn', summary: 'Attention', detail: 'Aucun actif sélectionné à supprimer'});
        }
      }
    });
  }
  
  


  editAnnonce(annonce: AnnonceCovoiturage) {
    this.annonce = {...annonce};
    this.actifDialog = true;
  }

  deleteAnnonce(annonce: AnnonceCovoiturage) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette annonce?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const id = annonce.id; // Assuming "id" is the property that holds the unique identifier

        // Call the service method for persistent deletion
        this.annonceService.supprimerAnnonce(annonce.id).subscribe(
          () => {
            // Successful deletion
            this.annonces = this.annonces.filter((val) => val.id !== id);
            this.messageService.add({severity: 'success', summary: 'Succès', detail: 'annonce supprimé', life: 3000});
          },
          (error) => {
            // Handle deletion error
            this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression d\'un annonce', life: 3000});
          }
        );
      }
    });
  }

  getSeverity(status: string) {
    switch (status) {
      case 'EN_STOCK':
        return 'success';
      case 'ASSIGNED':
        return 'warning';
      case 'EN_REBUT':
        return 'danger';
      case 'EN_REPARATION':
        return 'info';
      default:
        return 'secondary';
    }
  }

  loadActifDetails(id: string) {
    this.annonceService.recupererAnnonceParId(id).subscribe(
      (data: AnnonceCovoiturage) => {
        this.annonceDetails = data; // Assurez-vous que les données sont correctement attribuées à actifDetails
        console.log('annonce Details:', this.annonceDetails); // Vérifiez les détails de l'annonce dans la console
        this.actifDialog = true; // Afficher le dialogue des détails de l'annonce
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de l\'annonce :', error);
      }
    );
  }

  showActifDetails(annonce: AnnonceCovoiturage) {
    this.loadActifDetails(annonce.id.toString());
  }

  hideActifDialog() {
    this.actifDialog = false;
  }

}
