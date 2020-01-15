<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ThongTinThuChi;

class ThongTinThuChiController extends Controller 
{
    public function index(Request $request) 
    {
        $search_term = $request->input('searchQuery');
        $rowsPerPage = $request->per_page;
        
        if ($search_term!="undefined") {
            $results = ThongTinThuChi::select('*')->where('noi_dung', 'LIKE', '%'.$search_term.'%')->orderBy('id','desc')->paginate($rowsPerPage);
        } else {
            $results = ThongTinThuChi::select('*')->orderBy('id','desc')->paginate($rowsPerPage);
        }

        return $results;
    }

    public function store(Request $request) {
        $data=$request->all();
        //$var = $data['date_birth'];
        //$data['date_birth']= date("Y-m-d", strtotime($var) );
        $model = new ThongTinThuChi();
        $data['ngay_thang_nam'] = date('Y-m-d',strtotime($data['ngay_thang_nam']));
        $data = $model->create($data);
    }

    public function update(Request $request,$id)
    {    
        $data=$request->all();
        $data['ngay_thang_nam'] = date('Y-m-d',strtotime($data['ngay_thang_nam']));
        $model=ThongTinThuChi::find($id);
        
        $model=$model->update($data);      
        

        return ThongTinThuChi::find($id);
    }

    public function destroy(Request $request, $id)
    {
        $data = $request->all();
        $model = ThongTinThuChi::find($id)->delete();

        $search_term = $request->input('searchQuery');
        $rowsPerPage = $request->per_page;
        
        if ($search_term!="undefined") {
            $results = ThongTinThuChi::select('*')->where('noi_dung', 'LIKE', '%'.$search_term.'%')->orderBy('id','desc')->paginate($rowsPerPage);
        } else {
            $results = ThongTinThuChi::select('*')->orderBy('id','desc')->paginate($rowsPerPage);
        }

        
        return $results;

    }
}

?>