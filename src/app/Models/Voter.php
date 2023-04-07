<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Voter extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'tbl_voters';
    protected $fillable = [
        'name',
        'family',
        'national_code',
        'is_natural',
        'voter_id_1',
        'voter_id_2',
        'voter_id_3',
        'user_id',
        'voted_at',
    ];
}
