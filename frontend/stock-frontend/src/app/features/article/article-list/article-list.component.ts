import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../services/article.service';
import { Article } from '../../../models/models/article';


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  loading = true;
  error: string | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
