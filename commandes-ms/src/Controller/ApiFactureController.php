<?php

namespace App\Controller;

use App\Entity\Facture;
use App\Repository\FactureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/factures')]
class ApiFactureController extends AbstractController
{
    #[Route('', name: 'api_facture_index', methods: ['GET'])]
    public function index(FactureRepository $factureRepository): JsonResponse
    {
        $factures = $factureRepository->findAll();
        $data = [];

        foreach ($factures as $facture) {
            $data[] = [
                'id' => $facture->getId(),
                'commande_id' => $facture->getCommandeId(),
                'total' => $facture->getTotal(),
                'date' => $facture->getDate()?->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    #[Route('/{id}', name: 'api_facture_show', methods: ['GET'])]
    public function show(Facture $facture): JsonResponse
    {
        $data = [
            'id' => $facture->getId(),
            'commande_id' => $facture->getCommandeId(),
            'total' => $facture->getTotal(),
            'date' => $facture->getDate()?->format('Y-m-d H:i:s'),
        ];

        return $this->json($data);
    }

    #[Route('', name: 'api_facture_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $facture = new Facture();
        $facture->setCommandeId($data['commande_id'] ?? 0);
        $facture->setTotal($data['total'] ?? 0.0);
        if (!empty($data['date'])) {
            $facture->setDate(new \DateTime($data['date']));
        }

        $entityManager->persist($facture);
        $entityManager->flush();

        return $this->json([
            'id' => $facture->getId(),
            'commande_id' => $facture->getCommandeId(),
            'total' => $facture->getTotal(),
            'date' => $facture->getDate()?->format('Y-m-d H:i:s'),
        ], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'api_facture_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, Facture $facture, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['commande_id'])) {
            $facture->setCommandeId($data['commande_id']);
        }
        if (isset($data['total'])) {
            $facture->setTotal($data['total']);
        }
        if (!empty($data['date'])) {
            $facture->setDate(new \DateTime($data['date']));
        }

        $entityManager->flush();

        return $this->json([
            'id' => $facture->getId(),
            'commande_id' => $facture->getCommandeId(),
            'total' => $facture->getTotal(),
            'date' => $facture->getDate()?->format('Y-m-d H:i:s'),
        ]);
    }

    #[Route('/{id}', name: 'api_facture_delete', methods: ['DELETE'])]
    public function delete(Facture $facture, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($facture);
        $entityManager->flush();

        return $this->json(null, JsonResponse::HTTP_NO_CONTENT);
    }
}