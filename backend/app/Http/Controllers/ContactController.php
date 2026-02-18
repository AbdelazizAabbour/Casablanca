<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);

        $message = ContactMessage::create($request->all());

        return response()->json($message, 201);
    }

    public function index()
    {
        return response()->json(ContactMessage::orderBy('created_at', 'desc')->get());
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);
        if ($message) {
            $message->delete();
            return response()->json(['message' => 'Message deleted']);
        }
        return response()->json(['message' => 'Not found'], 404);
    }
}
