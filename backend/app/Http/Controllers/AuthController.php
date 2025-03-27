<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'nom' => 'required|string',
                'prenoms' => 'required|string',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|confirmed',
            ]);
    
            // Création de l'utilisateur
            $user = User::create([
                'name' => $validated['prenoms'],
                'lastname' => $validated['nom'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
    
            // Retourner une réponse en cas de succès
            return response()->json([
                'message' => 'Inscription réussie',
                'user' => $user
            ], 201); // 201 = Created
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Si une erreur de validation se produit (email déjà existant)
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422); // 422 = Unprocessable Entity
        }
    }

    public function login(Request $request){

        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only(['email','password']);

        if(!Auth::attempt($credentials)){
            return response()->json(['message' => "Mauvais Email ou Mot de passe"],400);
        }

        $user = User::where('email',$request->email)->first();
        Auth::login($user);

        $token = $user->createToken("API_TOKEN")->plainTextToken;
        
        return response()->json([
            'message' => 'Connecté',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function userInfo(){
        return response()->json([
            'user' => auth()->user(),
            'user' => Auth::user(),
        ]);
    }
}
