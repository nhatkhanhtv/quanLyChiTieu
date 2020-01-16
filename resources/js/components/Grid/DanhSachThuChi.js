
import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {makeStyles,useTheme} from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import { TableBody, TableHead, TableRow, TableCell, TableFooter, Button } from '@material-ui/core';
import PagerThuChi from './PagerThuChi';

import DialogThuChi from './DialogThuChi';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import DialogDelete from './DialogDelete';

import { TextField } from '@material-ui/core';

const useStyles1 = makeStyles(theme => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    table: {
      minWidth: 500,
    },
  }));
  
const useStyles2 = makeStyles({
    table: {
      minWidth: 500,
    },
  });
const url = "/thuChi";
export default function DanhSachThuChi(props) {
    const classes = useStyles2();
    const [state,setState] = useState({
        from:'',
        current_page:0,
        to:'',
        total:'',
        per_page:5,
        
        last_page:'',    
        next_page_url:'',
        first_page_url:'',
        last_page_url:'',
        prev_page_url:''        
      });
    const [data,setData] = useState([]);
    //state cho edit delete
    const [rowDataIndex,setRowDataIndex] = useState(null);
    const [rowIndex, setRowIndex] = useState("");
    const [onEdit,setOnEdit] = useState(false);
    const [error,setError] = useState([]);
    const [search,setSearch]=useState("");
    
    const [openFormDialog,setOpenFormDialog] = useState(false);
    // const [formData,setFormData] = useState({
    //   noi_dung:"",
    //   so_tien:"",
    //   ngay_thang_nam:new Date(Date.now()).toDateString(),
    //   loai:1
    // });
    const handleAddNew = () => {
      setOpenFormDialog(true);
    }

    const radioData = [
      {
          id:1,
          text:"Khoản chi"
      },
      {
          id:2,
          text:"Khoản thu"
      },
      
  ];    

    function getApi(url){
        axios.get(url).then(json=>{
          let response = json.data;
          if(response.current_page > response.last_page) {
            response.current_page = response.last_page;
          }
          setState({        
            from:response.from,
            current_page:response.current_page-1,
            to:response.to,
            total:response.total,
            per_page:parseInt(response.per_page, 10),
            
            last_page:response.last_page,    
            next_page_url:response.next_page_url,
            first_page_url:response.first_page_url,
            last_page_url:response.last_page_url,
            prev_page_url:response.prev_page_url,
          });
          setData(response.data);
        }).catch(errors=>{
          console.log(errors);
        });
      }
    useEffect(() => {
        getApi(url+'?per_page='+state.per_page.toString());
      },[]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    // const handleChangePage = (event, newPage) => {
    //     setPage({page:newPage});
    // };

    // const handleChangeRowsPerPage = event => {
    //     if(search!=="") {
    //         getApi(url+'?searchQuery='+search+'per_page='+parseInt(event.target.value, 10));    
    //     } else {
    //         getApi(url+'?per_page='+parseInt(event.target.value, 10));    
    //     }
       
    // };

    
    
      function handleChangePage(event, newPage) {
        
        setState({
              page:newPage
              
              });
        }
      function handleChangeRowsPerPage(event) {  
        getApi(url+'?searchQuery='+search+'per_page='+parseInt(event.target.value, 10));
        
      }
      function keyPress(e){    
          setSearch(e.target.value);
          let urlGet = url+'?searchQuery='+e.target.value+'&per_page='+state.per_page.toString();
          getApi(urlGet);
    
        }
    
    const handleButtonEdit = (e,row) => {
      setRowDataIndex(row);
      setOnEdit(true);
      setOpenFormDialog(true);
     // console.log(row);
    }

    //ham goi sau khi update delete
    const emptyRowIndex = () => {
      setRowIndex("");
      setRowDataIndex(null);
      setOnEdit(false);

    }

    const handleButtonDelete = (e,id) => {
      setRowIndex(id);
      setOpenDeleteDialog(true);
    }

    const renderRow = (row,index) => {
        
        let loai = radioData.find( element => element.id == row.loai);
        return (
                <TableRow key={row.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.noi_dung}</TableCell>
                    <TableCell>{row.so_tien}</TableCell>
                    <TableCell>{row.ngay_thang_nam}</TableCell>
                    <TableCell>{loai.text}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e)=>handleButtonEdit(e,row)}>
                        <EditIcon></EditIcon>
                      </IconButton>
                      
                      <IconButton  onClick={(e)=>handleButtonDelete(e,row.id)}>
                        <DeleteIcon></DeleteIcon>
                      </IconButton>
                    </TableCell>
                </TableRow>
        )
    }

    // const renderEditRow = (row,index) => {
    //   let loai = radioData.find( element => element.id == row.loai);
    //     return (
    //             <TableRow key={row.id}>
    //                 <TableCell>{index+1}</TableCell>
    //                 <TableCell>
    //                   <RenderTextField 
    //                         name = 'noi_dung'
    //                         label = 'Nội dung'
    //                         handleTextChange = {handleTextChange('noi_dung')}
    //                         value = {data.noi_dung}
    //                         />
    //                 </TableCell>
    //                 <TableCell>{row.so_tien}</TableCell>
    //                 <TableCell>{row.ngay_thang_nam}</TableCell>
    //                 <TableCell>{loai.text}</TableCell>
    //                 <TableCell>
    //                   <IconButton onClick={(e)=>handleButtonEdit(e,row)}>
    //                     <EditIcon></EditIcon>
    //                   </IconButton>
                      
    //                   <IconButton  onClick={(e)=>handleButtonDelete(e,row.id)}>
    //                     <DeleteIcon></DeleteIcon>
    //                   </IconButton>
    //                 </TableCell>
    //             </TableRow>
    //     )
    // }

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);  
    const handleOpenDeleteDialog = () => {
      setOpenDeleteDialog(true);
    };
  

    

    return (
        <Fragment>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Nội dung</TableCell>
                        <TableCell>Số tiền</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Loại</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map( (row,index) => renderRow(row,index))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <PagerThuChi 
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            state = {state}
                            getApi = {getApi}
                            rows = {data}
                            onChangePage={getApi}
                            count = {state.total?state.total:0}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <Button variant="outlined" color="primary" onClick={handleAddNew}>
                Thêm mới
            </Button>
            <TextField 
              name = 'search'
              label = 'Tra cứu'
              onChange = {(e)=>keyPress(e)}
              value = {search}
            />
            <DialogThuChi 
              onEdit = {onEdit}
              emptyRowIndex = {emptyRowIndex}
              rowDataIndex = {rowDataIndex}
              getApi={getApi} 
              urlApi={url} 
              urlGetData = {url+"?per_page="+state.per_page.toString()+"&searchQuery="+search} 
              setOpenFormDialog={setOpenFormDialog} 
              openFormDialog = {openFormDialog}
              radioData = {radioData} />
            <DialogDelete 
              getApi={getApi} 
              urlGetData = {url+"?per_page="+state.per_page.toString()+"&searchQuery="+search}
              urlApi={url} 
              rowIndex = {rowIndex} 
              setRowIndex={setRowIndex} 
              openDialog = {openDeleteDialog}
              setOpenDialog = {setOpenDeleteDialog}
            />
        </Fragment>        
    );
}

const rootEl = document.getElementById("example");
ReactDOM.render(<DanhSachThuChi/>,rootEl);