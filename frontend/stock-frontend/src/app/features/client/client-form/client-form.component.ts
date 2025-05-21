import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnInit {
  clients: Client[] = [];
  form: FormGroup;
  editing = false;
  selectedId?: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.loading = true;
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des clients';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const client: Client = this.form.value;
    if (this.editing && this.selectedId) {
      this.clientService.update(this.selectedId, client).subscribe({
        next: () => {
          this.fetchClients();
          this.cancel();
        },
        error: () => this.error = "Erreur lors de la modification"
      });
    } else {
      this.clientService.create(client).subscribe({
        next: () => {
          this.fetchClients();
          this.form.reset();
        },
        error: () => this.error = "Erreur lors de l'ajout"
      });
    }
  }

  edit(client: Client): void {
    this.editing = true;
    this.selectedId = client.id;
    this.form.patchValue({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (confirm('Supprimer ce client ?')) {
      this.clientService.delete(id).subscribe({
        next: () => this.fetchClients(),
        error: () => this.error = "Erreur lors de la suppression"
      });
    }
  }

  cancel(): void {
    this.editing = false;
    this.selectedId = undefined;
    this.form.reset();
  }
}