<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Product extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'reference', 'price', 'weight', 'stock', 'sold_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */



    public function category(){
        return $this->belongsTo(Category::class);
    }

}
