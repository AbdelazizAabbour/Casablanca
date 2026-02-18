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

        return response()->json([
            'total_rdv' => $totalRdv,
            'pending_rdv' => $pendingRdv,
            'today_rdv' => $todayRdv,
            'unread_messages' => $unreadMessages,
        ]);
    }

    public function patients()
    {
        // Simple distinct patients based on name/phone for now
        $patients = Appointment::select('name', 'phone', 'email')
            ->distinct()
            ->take(50) // Limit for now
            ->get();

        return response()->json($patients);
    }
}
