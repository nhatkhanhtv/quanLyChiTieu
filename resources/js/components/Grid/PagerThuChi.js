import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TablePagination from '@material-ui/core/TablePagination';


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

// PagerThuChi.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
//   state: PropTypes.shape({
//     from:PropTypes.string.isRequired,
//     current_page:PropTypes.number.isRequired,
//     to:PropTypes.string.isRequired,
//     total:PropTypes.string.isRequired,
//     per_page:PropTypes.number.isRequired,    
//     last_page:PropTypes.string.isRequired,    
//     next_page_url:PropTypes.string.isRequired,
//     first_page_url:PropTypes.string.isRequired,
//     last_page_url:PropTypes.string.isRequired,
//     prev_page_url:PropTypes.string.isRequired,
           
//   }),
// //   getApi:PropTypes.func.isRequired,
// //   search:PropTypes.string.isRequired
// };



export default function PagerThuChi(props) {
    const classes = useStyles2();
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { 
        count, 
        page, 
        rowsPerPage, 
        state,
        search, 
        getApi, 
        rowsPerPageOptions,
        SelectProps,
        rows,
        onChangePage,
        onChangeRowsPerPage
    } = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    function TablePaginationActions(props) {
        const theme = useTheme();
        const classes = useStyles1(theme);
        
        //console.log(classes);
        
    
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
  
    return (
            <Fragment>
              <TablePagination
                            rowsPerPageOptions={ rowsPerPageOptions}
                            colSpan={3}
                            count={count}
                            rowsPerPage={state.per_page?state.per_page:0}
                            page={state.current_page}
                            SelectProps={SelectProps}
                            onChangePage = {onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}

                            ActionsComponent={TablePaginationActions}
                        />
            </Fragment>
    );
  }