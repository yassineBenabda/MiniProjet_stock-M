<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/clients')]
class ApiClientController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(ClientRepository $clientRepository): JsonResponse
    {
        $clients = $clientRepository->findAll();

        return $this->json($clients, 200, [], ['groups' => 'client:read']);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Client $client): JsonResponse
    {
        return $this->json($client, 200, [], ['groups' => 'client:read']);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $client = new Client();
        $client->setName($data['name'] ?? '');
        $client->setEmail($data['email'] ?? '');
        $client->setPhone($data['phone'] ?? '');
        $client->setAddress($data['address'] ?? '');

        $em->persist($client);
        $em->flush();

        return $this->json($client, 201, [], ['groups' => 'client:read']);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, Client $client, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $client->setName($data['name'] ?? $client->getName());
        $client->setEmail($data['email'] ?? $client->getEmail());
        $client->setPhone($data['phone'] ?? $client->getPhone());
        $client->setAddress($data['address'] ?? $client->getAddress());

        $em->flush();

        return $this->json($client, 200, [], ['groups' => 'client:read']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Client $client, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($client);
        $em->flush();

        return $this->json(null, 204);
    }
}