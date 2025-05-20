import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommandeService } from '../../../services/commande.service';
import { Commande } from '../../../models/models/commande';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './commande-form.component.html',
  styleUrl: './commande-form.component.css'
})
export class CommandeFormComponent implements OnInit {
  commandes: Commande[] = [];
  form: FormGroup;
  editing: boolean = false;
  selectedId?: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private commandeService: CommandeService
  ) {
    this.form = this.fb.group({
      client_id: ['', Validators.required],
      date: ['', Validators.required],
      status: ['pending', Validators.required]
    });
  }

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
      error: () => {
        this.error = 'Erreur lors du chargement des commandes';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const commande: Commande = this.form.value;
    if (this.editing && this.selectedId) {
      this.commandeService.update(this.selectedId, commande).subscribe({
        next: () => {
          this.fetchCommandes();
          this.cancel();
        },
        error: () => this.error = "Erreur lors de la modification"
      });
    } else {
      this.commandeService.create(commande).subscribe({
        next: () => {
          this.fetchCommandes();
          this.form.reset({ status: 'pending' });
        },
        error: () => this.error = "Erreur lors de l'ajout"
      });
    }
  }

  edit(commande: Commande): void {
    this.editing = true;
    this.selectedId = commande.id;
    this.form.patchValue({
      client_id: commande.client_id,
      date: commande.date,
      status: commande.status
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (confirm('Supprimer cette commande ?')) {
      this.commandeService.delete(id).subscribe({
        next: () => this.fetchCommandes(),
        error: () => this.error = "Erreur lors de la suppression"
      });
    }
  }

  cancel(): void {
    this.editing = false;
    this.selectedId = undefined;
    this.form.reset({ status: 'pending' });
  }
}