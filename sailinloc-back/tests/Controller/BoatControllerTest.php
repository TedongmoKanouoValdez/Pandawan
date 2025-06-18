<?php
namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use App\Entity\Boat;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\BrowserKit\Cookie;

class BoatControllerTest extends WebTestCase
{
    public function testSomething(): void
    {
        $this->assertTrue(true);
    }
    public function testDeleteBoat(): void
    {
        $client = static::createClient();

        // Création d'un bateau en base ou récupération d'un existant
        $entityManager = $client->getContainer()->get('doctrine')->getManager();
        $boat = new Boat();
        $boat->setName('Test Boat');
        $boat->setModel('Type 1');
        $boat->setPort('Port 1');
        $boat->setPrice('1234');
        $boat->setDisponibility(true);
        $boat->setDescription('Description for Test Boat');
        $boat->setCreateAt(new \DateTimeImmutable());
        $entityManager->persist($boat);
        $entityManager->flush();

        $id = $boat->getId();

        // Envoi simple de requête DELETE sans token CSRF
        $client->request('DELETE', '/boat/' . $id);

        $this->assertResponseStatusCodeSame(204); // Ou 200 selon ta config

        // Vérifie que le bateau a bien été supprimé
        $deletedBoat = $entityManager->getRepository(Boat::class)->find($id);
        $this->assertNull($deletedBoat);

    }

}
