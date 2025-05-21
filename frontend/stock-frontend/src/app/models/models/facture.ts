export interface Facture {
  id?: number;
  commande_id: number;
  total: number;
  date: string; // ISO string, e.g. '2024-05-21 14:00:00'
}