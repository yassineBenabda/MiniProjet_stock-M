import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Facture } from '../../models/models/facture';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-facture-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './facture-form.component.html'
})
export class FactureFormComponent implements OnInit {
  factureForm!: FormGroup;
  factureId?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.factureId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.factureId;

    this.factureForm = this.fb.group({
      commande_id: [null, Validators.required],
      total: [null, Validators.required],
      date: ['', Validators.required]
    });

    if (this.isEdit) {
      this.factureService.getFacture(this.factureId!).subscribe(facture => {
        this.factureForm.patchValue(facture);
      });
    }
  }

  onSubmit(): void {
    if (this.factureForm.invalid) return;

    const facture: Facture = this.factureForm.value;

    if (this.isEdit) {
      this.factureService.updateFacture(this.factureId!, facture).subscribe(() => {
        this.router.navigate(['/factures']);
      });
    } else {
      this.factureService.createFacture(facture).subscribe(() => {
        this.router.navigate(['/factures']);
      });
    }
  }
}