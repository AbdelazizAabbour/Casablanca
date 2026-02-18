<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $services = [
            [
                'title' => 'Kinésithérapie',
                'description' => 'La kinésithérapie est une discipline paramédicale qui utilise des techniques actives ou passives et la rééducation pour maintenir ou rétablir les capacités fonctionnelles.',
                'features' => ['Rééducation fonctionnelle', 'Renforcement musculaire', 'Drainage lymphatique', 'Massages thérapeutiques'],
                'icon' => null
            ],
            [
                'title' => 'Physiothérapie',
                'description' => 'La physiothérapie vise à traiter les incapacités physiques résultant de blessures ou de maladies par des moyens physiques (chaleur, froid, électricité, ultrasons).',
                'features' => ['Électrothérapie', 'Ultrasons', 'Thermothérapie', 'Cryothérapie'],
                'icon' => null
            ],
            [
                'title' => 'Traumatologie',
                'description' => 'Rééducation spécialisée après un accident, une fracture ou une opération chirurgicale pour retrouver une mobilité optimale.',
                'features' => ['Rééducation post-opératoire', 'Traitement des fractures', 'Entorses et luxations', 'Réathlétisation'],
                'icon' => null
            ],
            [
                'title' => 'Rhumatologie',
                'description' => 'Prise en charge des douleurs articulaires chroniques, de l\'arthrose et des rhumatismes inflammatoires pour améliorer le confort de vie.',
                'features' => ['Arthrose', 'Arthrite', 'Douleurs dorsales', 'Sciatique'],
                'icon' => null
            ],
            [
                'title' => 'Neurologie',
                'description' => 'Rééducation des patients atteints de troubles du système nerveux central ou périphérique (AVC, Parkinson, SEP).',
                'features' => ['AVC', 'Maladie de Parkinson', 'Sclérose en plaques', 'Paraplégie/Tétraplégie'],
                'icon' => null
            ],
            [
                'title' => 'Amincissement',
                'description' => 'Programmes personnalisés alliant soins manuels et technologies pour une remise en forme et un remodelage de la silhouette.',
                'features' => ['Cryolipolyse', 'Drainage lymphatique', 'Suivi nutritionnel', 'Tonification'],
                'icon' => null
            ]
        ];

        foreach ($services as $svc) {
            Service::create($svc);
        }
    }
}
