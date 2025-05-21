<?php

namespace App\Controller;

use App\Entity\Commande;
use App\Entity\LigneCommande;
use App\Repository\CommandeRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/commandes')]
class ApiCommandeController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(CommandeRepository $commandeRepository): JsonResponse
    {
        $commandes = $commandeRepository->findAll();
        return $this->json($commandes, 200, [], ['groups' => 'commande:read']);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Commande $commande): JsonResponse
    {
        return $this->json($commande, 200, [], ['groups' => 'commande:read']);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $commande = new Commande();
        if (isset($data['client_id'])) {
            $commande->setClientId((int) $data['client_id']);
        }
        if (isset($data['date'])) {
            $commande->setDate(new \DateTime($data['date']));
        }
        if (isset($data['status'])) {
            $commande->setStatus($data['status']);
        }

        $em->persist($commande);
        $em->flush();

        // Save order lines
        foreach ($data['lignes'] as $ligne) {
            $lc = new LigneCommande();
            $lc->setCommandeId($commande->getId());
            $lc->setArticleId($ligne['article_id']);
            $lc->setQuantity($ligne['quantity']);
            $em->persist($lc);
        }
        $em->flush();

        return $this->json($commande, 201, [], ['groups' => 'commande:read']);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, Commande $commande, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['client_id'])) {
            $commande->setClientId((int) $data['client_id']);
        }
        if (isset($data['date'])) {
            $commande->setDate(new \DateTime($data['date']));
        }
        if (isset($data['status'])) {
            $commande->setStatus($data['status']);
        }

        $em->flush();

        return $this->json($commande, 200, [], ['groups' => 'commande:read']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Commande $commande, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($commande);
        $em->flush();

        return $this->json(null, 204);
    }
}