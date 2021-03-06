import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {makeStyles,useTheme} from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import { TableBody, TableHead, TableRow, TableCell, TableFooter } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
//import { PagerThuChi } from './PagerThuChi';
import DialogThuChi from './DialogThuChi';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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
    const [error,setError] = useState([]);
    const [search,setSearch]=useState("");

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

    function PagerThuChi(props) {
        const theme = useTheme();
        const classes = useStyles1(theme);
        
        //console.log(classes);
        const { count, page, rowsPerPage, onChangePage } = props;
    
        function handleFirstPageButtonClick(event) {
          //onChangePage(event, 0);
          if(state.prev_page_url != null){
            getApi(state.first_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
          }
        }
    
        function handleBackButtonClick(event) {
          //onChangePage(event, page - 1);
          if(state.prev_page_url != null){
            getApi(state.prev_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
          }
        }
    
        function handleNextButtonClick(event) {
          //onChangePage(event, state.current_page+1);
          
          if(state.next_page_url != null){
            getApi(state.next_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
          }
        }
    
        function handleLastPageButtonClick(event) {
          //onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
          if(state.next_page_url != null){
            getApi(state.last_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
          }
        }
    
        return (
          <div className={classes.root}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={state.prev_page_url === null}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={state.prev_page_url === null} aria-label="previous page">
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={state.current_page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={state.current_page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>
        );
      }
      PagerThuChi.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    };
    
      function handleChangePage(event, newPage) {
        
        setState({
              page:newPage
              
              });
        }
      function handleChangeRowsPerPage(event) {  
        getApi(url_api+'?searchQuery='+search+'per_page='+parseInt(event.target.value, 10));
        
      }
      function keyPress(e){    
          setSearch(e.target.value);
          let url = url_api+'?searchQuery='+e.target.value+'&per_page='+state.per_page.toString();
          getApi(url);
    
        }


    const renderRow = (row,index) => {
        return (
                <TableRow key={row.id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{row.noi_dung}</TableCell>
                    <TableCell>{row.so_tien}</TableCell>
                    <TableCell>{row.ngay_thang_nam}</TableCell>
                    <TableCell>{row.loai}</TableCell>
                </TableRow>
        )
    }

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map( (row,index) => renderRow(row,index))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={state.total?state.total:0}
                            rowsPerPage={state.per_page?state.per_page:0}
                            page={state.current_page}
                            SelectProps={{
                              inputProps: { 'aria-label': 'rows per page' },
                              native: true,
                            }}
                            state = {state}
                            search = {search}
                            //getApi={getApi}
                            onChangePage={getApi}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={PagerThuChi}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
            <DialogThuChi getApi={getApi} urlApi={url}/>
        </Fragment>        
    );
}

const rootEl = document.getElementById("example");
ReactDOM.render(<DanhSachThuChi/>,rootEl);