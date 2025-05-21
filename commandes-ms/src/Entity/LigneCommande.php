<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class LigneCommande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $commande_id = null;

    #[ORM\Column]
    private ?int $article_id = null;

    #[ORM\Column]
    private ?int $quantity = null;

    public function getId(): ?int { return $this->id; }
    public function getCommandeId(): ?int { return $this->commande_id; }
    public function setCommandeId(int $id): static { $this->commande_id = $id; return $this; }
    public function getArticleId(): ?int { return $this->article_id; }
    public function setArticleId(int $id): static { $this->article_id = $id; return $this; }
    public function getQuantity(): ?int { return $this->quantity; }
    public function setQuantity(int $q): static { $this->quantity = $q; return $this; }
}