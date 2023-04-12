<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_voters', function (Blueprint $table) {
            $table->id();
            $table->string('national_code')->unique();
            $table->string('name');
            $table->string('family');
            $table->unsignedBigInteger('voter_id_1')->default(0);
            $table->unsignedBigInteger('voter_id_2')->default(0);
            $table->unsignedBigInteger('voter_id_3')->default(0);
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedTinyInteger('voted_type')->default(0);
            $table->dateTime('voted_at')->nullable();
            $table->string('not_shareholder_national_code')->nullable();
            $table->string('not_shareholder_name')->nullable();
            $table->string('not_shareholder_family')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('tbl_users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_voters', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
