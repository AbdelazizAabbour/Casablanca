<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;

class DoctorsSeeder extends Seeder
{
    public function run()
    {
        $doctors = [
            [
                'name' => 'Asmaa Hannit',
                'role' => 'Fondatrice & Kinésithérapeute',
                'speciality' => 'Rééducation fonctionnelle, Thérapie manuelle',
                'bio' => 'Diplômée en kinésithérapie, Asmaa a fondé le cabinet en 2017 avec pour mission d\'offrir des soins personnalisés et de qualité.',
                'image' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop',
                'linkedin' => null
            ],
            [
                'name' => 'Dr. Sarah Bennani',
                'role' => 'Médecin Physique',
                'speciality' => 'Réadaptation, Traumatologie du sport',
                'bio' => 'Spécialiste en médecine physique et réadaptation, elle supervise les protocoles de soins pour les sportifs de haut niveau.',
                'image' => 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=600&fit=crop',
                'linkedin' => null
            ],
            [
                'name' => 'Youssef El Amrani',
                'role' => 'Kinésithérapeute',
                'speciality' => 'Neurologie, Rééducation respiratoire',
                'bio' => 'Passionné par la neurologie, Youssef accompagne les patients atteints de pathologies neurologiques vers plus d\'autonomie.',
                'image' => 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop',
                'linkedin' => null
            ]
        ];

        foreach ($doctors as $doc) {
            Doctor::create($doc);
        }
    }
}
