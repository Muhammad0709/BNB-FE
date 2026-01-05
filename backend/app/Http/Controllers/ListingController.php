<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Property;
use App\Enums\PropertyStatus;

class ListingController extends Controller
{
    /**
     * Display the listing page.
     */
    public function index(Request $request)
    {
        $query = Property::where('status', 'Active')
                        ->where('approval_status', PropertyStatus::APPROVED);

        // Apply search filter
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Apply price range filter
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->get('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->get('max_price'));
        }

        // Apply property type filter
        if ($request->filled('property_type')) {
            $query->where('property_type', $request->get('property_type'));
        }

        // Apply guests filter
        if ($request->filled('guests')) {
            $query->where('guests', '>=', $request->get('guests'));
        }

        // Apply location filter
        if ($request->filled('locations')) {
            $locations = $request->get('locations');
            if (is_array($locations) && !empty($locations)) {
                $query->where(function($q) use ($locations) {
                    foreach ($locations as $location) {
                        $q->orWhere('location', 'like', "%{$location}%");
                    }
                });
            }
        }

        // Apply amenities filter
        if ($request->filled('amenities')) {
            $amenities = $request->get('amenities');
            if (is_array($amenities) && !empty($amenities)) {
                $query->where(function($q) use ($amenities) {
                    foreach ($amenities as $amenity) {
                        $q->whereRaw("JSON_CONTAINS(amenities, ?)", [json_encode($amenity)]);
                    }
                });
            }
        }

        // Apply sorting
        $sortBy = $request->get('sort_by', 'featured');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('created_at', 'desc');
        }

        $properties = $query->paginate(12)->through(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'location' => $property->location,
                'price' => $property->price,
                'guests' => $property->guests,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'property_type' => $property->property_type,
                'image' => $property->image ? Storage::url($property->image) : null,
                'amenities' => is_string($property->amenities) ? explode(',', $property->amenities) : ($property->amenities ?? []),
            ];
        });

        // Get price range for filters
        $priceRange = Property::where('status', 'Active')
                             ->where('approval_status', PropertyStatus::APPROVED)
                             ->selectRaw('MIN(price) as min_price, MAX(price) as max_price')
                             ->first();

        // Get available property types
        $propertyTypes = Property::where('status', 'Active')
                                ->where('approval_status', PropertyStatus::APPROVED)
                                ->distinct()
                                ->pluck('property_type')
                                ->filter()
                                ->values();

        // Get available locations and amenities for filter options
        $availableLocations = Property::where('status', 'Active')
                                    ->where('approval_status', PropertyStatus::APPROVED)
                                    ->distinct()
                                    ->pluck('location')
                                    ->filter()
                                    ->values();

        $availableAmenities = Property::where('status', 'Active')
                                    ->where('approval_status', PropertyStatus::APPROVED)
                                    ->whereNotNull('amenities')
                                    ->get()
                                    ->flatMap(function ($property) {
                                        $amenities = is_string($property->amenities) 
                                            ? explode(',', $property->amenities) 
                                            : ($property->amenities ?? []);
                                        return array_map('trim', $amenities);
                                    })
                                    ->unique()
                                    ->filter()
                                    ->values();

        return Inertia::render('Listing', [
            'properties' => $properties,
            'filters' => [
                'search' => $request->get('search', ''),
                'min_price' => $request->get('min_price', $priceRange->min_price ?? 0),
                'max_price' => $request->get('max_price', $priceRange->max_price ?? 1000),
                'property_type' => $request->get('property_type', ''),
                'guests' => $request->get('guests', 1),
                'checkin' => $request->get('checkin'),
                'checkout' => $request->get('checkout'),
                'locations' => $request->get('locations', []),
                'amenities' => $request->get('amenities', []),
                'sort_by' => $sortBy,
            ],
            'priceRange' => [
                'min' => $priceRange->min_price ?? 0,
                'max' => $priceRange->max_price ?? 1000,
            ],
            'propertyTypes' => $propertyTypes,
            'availableLocations' => $availableLocations,
            'availableAmenities' => $availableAmenities,
        ]);
    }
}