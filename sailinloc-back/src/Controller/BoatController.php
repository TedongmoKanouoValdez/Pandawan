<?php

namespace App\Controller;

use App\Entity\Boat;
use App\Form\BoatForm;
use App\Repository\BoatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/boat')]
final class BoatController extends AbstractController
{
    #[Route(name: 'app_boat_index', methods: ['GET'])]
    public function index(BoatRepository $boatRepository): Response
    {
        return $this->render('boat/index.html.twig', [
            'boats' => $boatRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_boat_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $boat = new Boat();
        $form = $this->createForm(BoatForm::class, $boat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($boat);
            $entityManager->flush();

            return $this->redirectToRoute('app_boat_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('boat/new.html.twig', [
            'boat' => $boat,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_boat_show', methods: ['GET'])]
    public function show(Boat $boat): Response
    {
        return $this->render('boat/show.html.twig', [
            'boat' => $boat,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_boat_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Boat $boat, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(BoatForm::class, $boat);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_boat_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('boat/edit.html.twig', [
            'boat' => $boat,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_boat_delete', methods: ['POST'])]
    public function delete(Request $request, Boat $boat, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$boat->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($boat);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_boat_index', [], Response::HTTP_SEE_OTHER);
    }
}
