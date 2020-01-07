<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ThongTinThuChi;

class ThongTinThuChiController extends Controller 
{
    public function index(Request $request) 
    {
        $data = ThongTinThuChi::all();
        return $data;
    }
}

?>