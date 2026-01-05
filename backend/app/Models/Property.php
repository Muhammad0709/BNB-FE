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
        'description',
        'amenities',
        'image',
        'user_id',
    ];

    protected $casts = [
        'amenities' => 'array',
        'price' => 'decimal:2',
    ];

    /**
     * Get the user that owns the property.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the reviews for the property.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}
