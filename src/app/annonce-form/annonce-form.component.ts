import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnnonceService } from '../services/annonce.service';
import { Component, Inject } from '@angular/core';
import { AnnonceCovoiturage } from '../modele/annonce';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss']
})
export class AnnonceFormComponent {
  // Déclarez formAnnonce comme une instance de FormGroup
  formAnnonce!: FormGroup;
  constructor(private annonceService: AnnonceService, @Inject(FormBuilder) private formBuilder: FormBuilder) {
   
    // Initialisez le formulaire dans le constructeur en utilisant FormBuilder
    this.formAnnonce = this.formBuilder.group({
      depart: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      heureDepart: ['', Validators.required],
      placesDisponibles: [0, Validators.required],
      nomConducteur: ['', Validators.required],
      telephoneConducteur: ['', Validators.required],
      vehiculeConducteur: ['', Validators.required]
    });
  }

  creerAnnonce(): void {
    if (this.formAnnonce.valid) {
      const nouvelleAnnonce: AnnonceCovoiturage = {
        id: 0,
        depart: this.formAnnonce.value.depart,
        destination: this.formAnnonce.value.destination,
        date: this.formAnnonce.value.date,
        heureDepart: this.formAnnonce.value.heureDepart,
        placesDisponibles: this.formAnnonce.value.placesDisponibles,
        conducteur: {
          nom: this.formAnnonce.value.nomConducteur,
          telephone: this.formAnnonce.value.telephoneConducteur,
          vehicule: this.formAnnonce.value.vehiculeConducteur
        },
        passagers: []
      };

      this.annonceService.sauvegarderAnnonce(nouvelleAnnonce).subscribe(
        (annonce: AnnonceCovoiturage) => {
          console.log('Annonce créée avec succès :', annonce);
          this.formAnnonce.reset();
        },
        (erreur) => {
          console.error('Erreur lors de la création de l\'annonce :', erreur);
        }
      );
    }
  }
}