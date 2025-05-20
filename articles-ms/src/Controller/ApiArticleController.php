<?php

namespace App\Controller;

use App\Entity\Article;
use App\Repository\ArticleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/articles')]
class ApiArticleController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function index(ArticleRepository $repo): JsonResponse
    {
        return $this->json($repo->findAll(), 200, [], ['groups' => 'article:read']);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(Article $article): JsonResponse
    {
        return $this->json($article, 200, [], ['groups' => 'article:read']);
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $article = new Article();
        $article->setName($data['name']);
        $article->setReference($data['reference']);
        $article->setPrice($data['price']);
        $article->setStock($data['stock']);
        $em->persist($article);
        $em->flush();

        return $this->json($article, 201, [], ['groups' => 'article:read']);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(Request $request, Article $article, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $article->setName($data['name']);
        $article->setReference($data['reference']);
        $article->setPrice($data['price']);
        $article->setStock($data['stock']);
        $em->flush();

        return $this->json($article, 200, [], ['groups' => 'article:read']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(Article $article, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($article);
        $em->flush();

        return new JsonResponse(null, 204);
    }
}
