import { Routes } from '@angular/router';
import { ArticleListComponent } from './features/article/article-list/article-list.component';
import { ArticleFormComponent } from './features/article/article-form/article-form.component';
import { ClientListComponent } from './features/client/client-list/client-list.component';
import { ClientFormComponent } from './features/client/client-form/client-form.component';
import { CommandeListComponent } from './features/commande/commande-list/commande-list.component';
import { CommandeFormComponent } from './features/commande/commande-form/commande-form.component';
import { FactureListComponent } from './features/facture-list/facture-list.component';
import { FactureFormComponent } from './features/facture-form/facture-form.component';

export const routes: Routes = [
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/add', component: ArticleFormComponent },

  { path: 'clients', component: ClientListComponent },
  { path: 'clients/add', component: ClientFormComponent },

  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/add', component: CommandeFormComponent },

  { path: 'factures', component: FactureListComponent },
  { path: 'factures/add', component: FactureFormComponent },

  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  
];

