<?php

namespace App\DataFixtures;

use App\Entity\Boat;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class BoatFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 10; $i++) {
            $boat = new Boat();
            $boat->setName("Boat $i");
            $boat->setModel("Type " . ($i % 3 + 1));
            $boat->setPort("Port " . ($i % 3 + 1));
            $boat->setPrice((string)(mt_rand(1000, 5000) / 10)); // cast en string
            $boat->setDisponibility(($i % 2) === 0); // corrigé : setDisponibility au lieu de isDisponibility
            $boat->setDescription("This is a description for Boat $i");
            $boat->setCreateAt(new \DateTimeImmutable());

            $manager->persist($boat);
        }

        $manager->flush();
    }
}
