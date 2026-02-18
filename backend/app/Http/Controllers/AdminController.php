<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function stats()
    {
        $totalRdv = Appointment::count();
        $pendingRdv = Appointment::where('status', 'pending')->count();
        $todayRdv = Appointment::whereDate('date', now())->count();
        $unreadMessages = ContactMessage::where('is_read', false)->count();
        $totalPatients = Appointment::distinct('phone')->count('phone');
        $totalUsers = \App\Models\User::count();

        return response()->json([
            'total_rdv' => $totalRdv,
            'pending_rdv' => $pendingRdv,
            'today_rdv' => $todayRdv,
            'unread_messages' => $unreadMessages,
            'total_patients' => $totalPatients,
            'total_users' => $totalUsers,
        ]);
    }

    public function users()
    {
        $users = \App\Models\User::orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    public function patients()
    {
        $patients = Appointment::select('name', 'phone', 'email')
            ->distinct()
            ->take(50) 
            ->get();

        return response()->json($patients);
    }
}
