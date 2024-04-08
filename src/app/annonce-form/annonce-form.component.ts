import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../services/annonce.service';
import { AnnonceCovoiturage } from '../modele/annonce';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss']
})
export class AnnonceFormComponent implements OnInit {
  formAnnonce!: FormGroup;
  annonceId!: string;

  constructor(
    private annonceService: AnnonceService,
    private activatedRoute: ActivatedRoute,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['id']) {
      this.annonceId = String(this.activatedRoute.snapshot.params['id']);
    }
  
    if (this.annonceId) {
      this.annonceService.recupererAnnonceParId(Number(this.annonceId)).subscribe((annonce: AnnonceCovoiturage) => {
        this.initForm(annonce);
      });
    } else {
      this.initForm();
    }
  }

  initForm(annonce?: AnnonceCovoiturage): void {
    this.formAnnonce = this.formBuilder.group({
      depart: [annonce?.depart || '', Validators.required],
      destination: [annonce?.destination || '', Validators.required],
      dateDepart: [annonce?.date || '', Validators.required],
      heureDepart: [annonce?.heureDepart || '', Validators.required],
      placesDisponibles: [annonce?.placesDisponibles || '', Validators.required],
      nomConducteur: [annonce?.conducteur.nom || '', Validators.required],
      telephoneConducteur: [annonce?.conducteur.telephone || '', Validators.required],
      vehiculeConducteur: [annonce?.conducteur.vehicule || '', Validators.required]
    });
  }

  saveAnnonce(): void {
    if (this.formAnnonce.valid) {
      const annonceData: AnnonceCovoiturage = {
        id: this.annonceId ? Number(this.annonceId) : 0,
        depart: this.formAnnonce.value.depart,
        destination: this.formAnnonce.value.destination,
        date: this.formAnnonce.value.dateDepart,
        heureDepart: this.formAnnonce.value.heureDepart,
        placesDisponibles: this.formAnnonce.value.placesDisponibles,
        conducteur: {
          nom: this.formAnnonce.value.nomConducteur,
          telephone: this.formAnnonce.value.telephoneConducteur,
          vehicule: this.formAnnonce.value.vehiculeConducteur
        },
        passagers: []
      };

      if (this.annonceId) {
        this.annonceService.mettreAJourAnnonce(Number(this.annonceId), annonceData).subscribe(
          (annonce: AnnonceCovoiturage) => {
            console.log('Annonce mise à jour avec succès :', annonce);
            this.formAnnonce.reset();
          },
          (erreur) => {
            console.error('Erreur lors de la mise à jour de l\'annonce :', erreur);
          }
        );
      } else {
        this.annonceService.sauvegarderAnnonce(annonceData).subscribe(
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
}