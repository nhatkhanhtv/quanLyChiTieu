<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThongTinThuChiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('thong_tin_thu_chi', function (Blueprint $table) {
            $table->increments('id');
            $table->string('noi_dung');
            $table->double('so_tien',8,2)->unsigned();
            $table->date('ngay_thang_nam');
            $table->integer('loai')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('thong_tin_thu_chi');
    }
}
