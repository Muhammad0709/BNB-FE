<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;

/**
 * @OA\Tag(
 *     name="Properties",
 *     description="API endpoints for property management"
 * )
 */
class PropertyController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/properties",
     *     summary="Get list of properties",
     *     tags={"Properties"},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Search by title or location",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filter by status",
     *         required=false,
     *         @OA\Schema(type="string", enum={"Pending", "Active", "Inactive"})
     *     ),
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/Property")),
     *             @OA\Property(property="current_page", type="integer"),
     *             @OA\Property(property="total", type="integer")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $query = Property::with('user');

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        } else {
            // Default to Active for public API
            $query->where('status', 'Active');
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $properties = $query->latest()->paginate(10);

        // Convert image paths to full URLs
        $properties->getCollection()->transform(function ($property) {
            if ($property->image) {
                $property->image = url(Storage::url($property->image));
            }
            return $property;
        });

        return response()->json($properties);
    }

    /**
     * @OA\Get(
     *     path="/api/properties/{id}",
     *     summary="Get property by ID",
     *     tags={"Properties"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the property to retrieve",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(ref="#/components/schemas/Property")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Property not found"
     *     )
     * )
     */
    public function show(Property $property)
    {
        if ($property->image) {
            $property->image = url(Storage::url($property->image));
        }

        return response()->json([
            'status' => 'success',
            'data' => $property
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/properties",
     *     summary="Create a new property",
     *     tags={"Properties"},
     *     security={{"apiAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"title", "location", "price", "bedrooms", "bathrooms", "guests", "property_type", "status"},
     *                 @OA\Property(property="title", type="string", example="Luxury Beachfront Villa"),
     *                 @OA\Property(property="location", type="string", example="Malibu, California"),
     *                 @OA\Property(property="price", type="number", format="float", example=299.00),
     *                 @OA\Property(property="bedrooms", type="integer", example=3),
     *                 @OA\Property(property="bathrooms", type="integer", example=2),
     *                 @OA\Property(property="guests", type="integer", example=6),
     *                 @OA\Property(property="property_type", type="string", enum={"apartment", "house", "villa", "studio", "condo"}, example="villa"),
     *                 @OA\Property(property="status", type="string", enum={"Pending", "Active", "Inactive"}, example="Active"),
     *                 @OA\Property(property="description", type="string", example="Beautiful beachfront villa with stunning ocean views"),
     *                 @OA\Property(property="amenities", type="array", @OA\Items(type="string"), example={"WiFi", "Pool", "Parking"}),
     *                 @OA\Property(property="image", type="string", format="binary", description="Property image file")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Property created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Property created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Property")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'bedrooms' => ['required', 'integer', 'min:0'],
            'bathrooms' => ['required', 'integer', 'min:0'],
            'guests' => ['required', 'integer', 'min:1'],
            'property_type' => ['required', 'in:apartment,house,villa,studio,condo'],
            'status' => ['required', 'in:Pending,Active,Inactive'],
            'description' => ['nullable', 'string'],
            'amenities' => ['nullable', 'array'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ]);

        $validated['user_id'] = Auth::id();
        $validated['amenities'] = $validated['amenities'] ?? [];

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('properties', 'public');
        }

        $property = Property::create($validated);

        // Convert image path to full URL
        if ($property->image) {
            $property->image = url(Storage::url($property->image));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Property created successfully',
            'data' => $property
        ], 201);
    }

    /**
     * @OA\Put(
     *     path="/api/properties/{id}",
     *     summary="Update property",
     *     tags={"Properties"},
     *     security={{"apiAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the property to update",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(property="title", type="string", example="Luxury Beachfront Villa"),
     *                 @OA\Property(property="location", type="string", example="Malibu, California"),
     *                 @OA\Property(property="price", type="number", format="float", example=299.00),
     *                 @OA\Property(property="bedrooms", type="integer", example=3),
     *                 @OA\Property(property="bathrooms", type="integer", example=2),
     *                 @OA\Property(property="guests", type="integer", example=6),
     *                 @OA\Property(property="property_type", type="string", enum={"apartment", "house", "villa", "studio", "condo"}, example="villa"),
     *                 @OA\Property(property="status", type="string", enum={"Pending", "Active", "Inactive"}, example="Active"),
     *                 @OA\Property(property="description", type="string", example="Beautiful beachfront villa with stunning ocean views"),
     *                 @OA\Property(property="amenities", type="array", @OA\Items(type="string"), example={"WiFi", "Pool", "Parking"}),
     *                 @OA\Property(property="image", type="string", format="binary", description="Property image file")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Property updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Property updated successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/Property")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Property not found"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - You can only update your own properties"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function update(Request $request, Property $property)
    {
        $user = Auth::user();
        
        // Check permissions
        if ($property->user_id != $user->id && $user->type != 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'You can only update your own properties'
            ], 403);
        }

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'location' => ['sometimes', 'required', 'string', 'max:255'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'bedrooms' => ['sometimes', 'required', 'integer', 'min:0'],
            'bathrooms' => ['sometimes', 'required', 'integer', 'min:0'],
            'guests' => ['sometimes', 'required', 'integer', 'min:1'],
            'property_type' => ['sometimes', 'required', 'in:apartment,house,villa,studio,condo'],
            'status' => ['sometimes', 'required', 'in:Pending,Active,Inactive'],
            'description' => ['nullable', 'string'],
            'amenities' => ['nullable', 'array'],
            'image' => ['nullable', 'sometimes', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
        ]);

        $validated['amenities'] = $validated['amenities'] ?? $property->amenities;

        // Handle image
        if ($request->hasFile('image')) {
            if ($property->image) {
                Storage::disk('public')->delete($property->image);
            }
            $validated['image'] = $request->file('image')->store('properties', 'public');
        } else {
            $validated['image'] = $property->image;
        }

        $property->update($validated);

        // Convert image path to full URL
        if ($property->image) {
            $property->image = url(Storage::url($property->image));
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Property updated successfully',
            'data' => $property
        ]);
    }

    /**
     * @OA\Delete(
     *     path="/api/properties/{id}",
     *     summary="Delete property",
     *     tags={"Properties"},
     *     security={{"apiAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID of the property to delete",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Property deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Property deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Property not found"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - You can only delete your own properties"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function destroy(Property $property)
    {
        $user = Auth::user();
        
        // Check permissions
        if ($property->user_id != $user->id && $user->type != 'admin') {
            return response()->json([
                'status' => 'error',
                'message' => 'You can only delete your own properties'
            ], 403);
        }

        // Delete image
        if ($property->image) {
            Storage::disk('public')->delete($property->image);
        }

        $property->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Property deleted successfully'
        ]);
    }
}

