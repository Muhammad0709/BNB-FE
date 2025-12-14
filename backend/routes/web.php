<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Auth\LoginController as AdminLoginController;
use App\Http\Controllers\Admin\Auth\RegisterController as AdminRegisterController;
use App\Http\Controllers\Host\DashboardController as HostDashboardController;
use App\Http\Controllers\Host\PropertyController as HostPropertyController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\PropertyDetailController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\ProfileSettingsController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\BookingController;

// Public authentication routes (only accessible to guests)
Route::middleware('guest')->group(function () {
    // User authentication routes
    Route::prefix('auth')->group(function () {
        Route::get('/login', [LoginController::class, 'create'])->name('login');
        Route::post('/login', [LoginController::class, 'store']);
        
        Route::get('/register', [RegisterController::class, 'create'])->name('register');
        Route::post('/register', [RegisterController::class, 'store']);
    });
    
    // Admin login (admin can only login, not register)
    Route::get('/login', [AdminLoginController::class, 'create'])->name('admin.login');
    Route::post('/login', [AdminLoginController::class, 'store']);
    
    // Host registration (creates Host users)
    Route::get('/register', [AdminRegisterController::class, 'create'])->name('host.register');
    Route::post('/register', [AdminRegisterController::class, 'store']);
});

// Public routes (accessible to all users)
Route::get('/listing', [ListingController::class, 'index'])->name('listing');
Route::get('/detail/{id}', [PropertyDetailController::class, 'show'])->name('property.detail');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::get('/booking', [BookingController::class, 'index'])->name('booking');
Route::get('/confirmation', [ConfirmationController::class, 'index'])->name('confirmation');

// Review routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
});

// Protected routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index']);
    
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
    
    // User-specific routes
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist');
    Route::get('/profile/settings', [ProfileSettingsController::class, 'index'])->name('profile.settings');
    Route::patch('/profile/update', [ProfileSettingsController::class, 'updateProfile'])->name('profile.update');
    Route::patch('/profile/password', [ProfileSettingsController::class, 'updatePassword'])->name('profile.password');
    Route::post('/profile/picture', [ProfileSettingsController::class, 'uploadProfilePicture'])->name('profile.picture');
    
    
    // Admin routes (require admin authentication)
    Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::post('/logout', [AdminLoginController::class, 'destroy'])->name('logout');
        // Properties routes (admin can only view and edit, not create or delete)
        Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');
        Route::get('/properties/{property}', [PropertyController::class, 'show'])->name('properties.show');
        Route::get('/properties/{property}/edit', [PropertyController::class, 'edit'])->name('properties.edit');
        Route::put('/properties/{property}', [PropertyController::class, 'update'])->name('properties.update');
        Route::patch('/properties/{property}/approve', [PropertyController::class, 'approve'])->name('properties.approve');
        Route::patch('/properties/{property}/reject', [PropertyController::class, 'reject'])->name('properties.reject');
        Route::resource('users', UserController::class);
    });
});

// Host routes (require host authentication) - separate from auth group to avoid default redirect
Route::prefix('host')->name('host.')->middleware('host')->group(function () {
    Route::get('/dashboard', [HostDashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [AdminLoginController::class, 'destroy'])->name('logout');
    Route::resource('properties', HostPropertyController::class);
});
