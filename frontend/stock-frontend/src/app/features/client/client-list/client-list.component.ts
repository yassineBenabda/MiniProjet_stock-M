import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/models/client';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  loading = false;
  error: string | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.loading = true;
    this.error = null;
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load clients';
        this.loading = false;
      }
    });
  }
}