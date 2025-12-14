<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Enums\PropertyStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProperties = Property::with('reviews')
            ->where('status', 'Active')
            ->where('approval_status', PropertyStatus::APPROVED)
            ->latest()
            ->limit(6)
            ->get()
            ->map(function ($property) {
                // Calculate average rating and total reviews
                $reviews = $property->reviews;
                $totalReviews = $reviews->count();
                $averageRating = $totalReviews > 0 ? round($reviews->avg('rating'), 1) : 0;

                if ($property->image) {
                    $property->image = Storage::url($property->image);
                }

                // Add rating and reviews_count to property object
                $property->rating = $averageRating;
                $property->reviews_count = $totalReviews;

                return $property;
            });

        return Inertia::render('Home', [
            'featuredProperties' => $featuredProperties,
        ]);
    }
}
