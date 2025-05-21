import { Component, OnInit } from '@angular/core';
import { Facture } from '../../models/models/facture';
import { FactureService } from '../../services/facture.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-facture-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './facture-list.component.html'
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  loading = false;

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.fetchFactures();
  }

  fetchFactures(): void {
    this.loading = true;
    this.factureService.getFactures().subscribe({
      next: (data) => {
        this.factures = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteFacture(id: number): void {
    if (confirm('Are you sure you want to delete this facture?')) {
      this.factureService.deleteFacture(id).subscribe(() => {
        this.fetchFactures();
      });
    }
  }
}