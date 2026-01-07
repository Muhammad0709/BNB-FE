<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    protected $fillable = [
        'title',
        'location',
        'price',
        'bedrooms',
        'bathrooms',
        'guests',
        'property_type',
        'status',
        'approval_status',
        'is_guest_favorite',
        'description',
        'amenities',
        'image',
        'user_id',
    ];

    protected $casts = [
        'amenities' => 'array',
        'price' => 'decimal:2',
        'is_guest_favorite' => 'boolean',
    ];

    /**
     * Get the user that owns the property.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function conversations()
    {
        return $this->hasMany(\App\Models\Conversation::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
