// Modèle pour une annonce de covoiturage
export interface AnnonceCovoiturage {
    id: number; 
    depart: string; 
    destination: string; 
    date: string; 
    heureDepart: string;
    placesDisponibles: number; 
    conducteur: Conducteur;
    passagers: Passager[]; 
  }
  
  // Modèle pour les informations sur le conducteur
  export interface Conducteur {
    nom: string; 
    telephone: string; 
    vehicule: string; 
  }
  
  // Modèle pour les informations sur un passager
  export interface Passager {
    nom: string; 
    telephone: string; 
  }