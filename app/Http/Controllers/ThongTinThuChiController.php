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

    public function store(Request $request) {
        $data=$request->all();
        //$var = $data['date_birth'];
        //$data['date_birth']= date("Y-m-d", strtotime($var) );
        $model = new ThongTinThuChi();
        $data['ngay_thang_nam'] = date('Y-m-d',strtotime($data['ngay_thang_nam']));
        $data = $model->create($data);
    }
}

?>