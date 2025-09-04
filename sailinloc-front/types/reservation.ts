interface Client {
  idUser: number;
  titre: string;
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  codePays: string;
}

interface Bateau {
  idbateau: number;
  port: string;
  nom: string;
  capaciteMax: number;
  passagersInclus: string;
  supplementParPassager: string;
  politiqueAnnulation: string;
}

interface OptionPayante {
  value: string;
  detail: string;
}

interface ReservationData {
  DateDeReservation: string[];
  username: string;
  email: string;
  telephone: string | null;
  optionsPayantes: OptionPayante[];
  idbateau: number;
  nomdubateau: string;
  port: string;
  tarifs: number;
  capaciteMax: number;
  plage: string[];
  idUser: number;
  prenom: string;
  selectedFormule: string;
  typeBateau: string;
}

interface Reservation {
  dateDebut: string;
  dateFin: string;
  nbPassagers: number;
  supplementPassagers: number;
  extras: string;
  supplementExtras: number;
  prixBateau: number;
  total: number;
  plage: number;
  data: ReservationData;
  heure: string;
}

export interface ReservationPayload {
  client: Client;
  bateau: Bateau;
  reservation: Reservation;
}
