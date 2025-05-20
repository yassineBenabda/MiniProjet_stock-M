export interface Commande {
  id?: number;
  client_id: number;        // assuming it's just the ID; can be an object if needed
  date: string;            // use ISO string e.g., '2025-05-18T12:00:00Z'
  status: 'pending' | 'processing' | 'shipped';  // use your defined statuses
}
