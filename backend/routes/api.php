<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\StaysController;
use App\Http\Controllers\Api\MessagesController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\BookingHistoryController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\WishlistController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API is running'
    ]);
});

// Authentication routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);


// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Home API
    Route::get('/home', [HomeController::class, 'index']);
    
    // Stays API
    Route::get('/stays', [StaysController::class, 'index']);
    
    // Messages API
    Route::get('/messages/conversations', [MessagesController::class, 'conversations']);
    Route::post('/messages/conversations', [MessagesController::class, 'createOrGet']);
    Route::get('/messages/conversations/{conversation_id}', [MessagesController::class, 'messages']);
    Route::post('/messages/conversations/{conversation_id}/messages', [MessagesController::class, 'sendMessage']);
    
    // Booking API
    Route::get('/booking/{property_id}', [BookingController::class, 'show']);
    Route::post('/booking', [BookingController::class, 'store']);
    
    // Booking History API
    Route::get('/bookings', [BookingHistoryController::class, 'index']);
    
    // Profile API
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/password', [ProfileController::class, 'updatePassword']);
    Route::post('/profile/picture', [ProfileController::class, 'uploadPicture']);
    
    // Contact API
    Route::get('/contact', [ContactController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);
    
    // Wishlist API
    Route::get('/wishlist', [WishlistController::class, 'index']);
});

