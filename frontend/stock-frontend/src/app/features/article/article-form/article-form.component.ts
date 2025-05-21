import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html'
})
export class ArticleFormComponent implements OnInit {
  articles: Article[] = [];
  form: FormGroup;
  editing = false;
  selectedId?: number;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      reference: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.loading = true;
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des articles';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    const article: Article = this.form.value;
    if (this.editing && this.selectedId) {
      this.articleService.update(this.selectedId, article).subscribe({
        next: () => {
          this.fetchArticles();
          this.cancel();
        },
        error: () => this.error = "Erreur lors de la modification"
      });
    } else {
      this.articleService.create(article).subscribe({
        next: () => {
          this.fetchArticles();
          this.form.reset({ price: 0, stock: 0 });
        },
        error: () => this.error = "Erreur lors de l'ajout"
      });
    }
  }

  edit(article: Article): void {
    this.editing = true;
    this.selectedId = article.id;
    this.form.patchValue({
      name: article.name,
      reference: article.reference,
      price: article.price,
      stock: article.stock
    });
  }

  delete(id?: number): void {
    if (!id) return;
    if (confirm('Supprimer cet article ?')) {
      this.articleService.delete(id).subscribe({
        next: () => this.fetchArticles(),
        error: () => this.error = "Erreur lors de la suppression"
      });
    }
  }

  cancel(): void {
    this.editing = false;
    this.selectedId = undefined;
    this.form.reset({ price: 0, stock: 0 });
  }
}