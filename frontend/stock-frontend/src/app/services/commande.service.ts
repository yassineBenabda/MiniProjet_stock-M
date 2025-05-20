import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commande } from '../models/models/commande';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private baseUrl = environment.apiCommandes;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.baseUrl);
  }

  get(id: number): Observable<Commande> {
    return this.http.get<Commande>(`${this.baseUrl}/${id}`);
  }

  create(commande: Commande): Observable<Commande> {
    return this.http.post<Commande>(this.baseUrl, commande);
  }

  update(id: number, commande: Commande): Observable<Commande> {
    return this.http.put<Commande>(`${this.baseUrl}/${id}`, commande);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
