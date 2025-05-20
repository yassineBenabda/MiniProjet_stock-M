import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../models/models/commande';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commande-list.component.html',
  styleUrl: './commande-list.component.css'
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  loading = false;
  error: string | null = null;

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.fetchCommandes();
  }

  fetchCommandes(): void {
    this.loading = true;
    this.commandeService.getAll().subscribe({
      next: (data) => {
        this.commandes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des commandes';
        this.loading = false;
      }
    });
  }
}