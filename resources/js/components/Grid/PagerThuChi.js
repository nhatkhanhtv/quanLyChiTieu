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

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 500,
  },
}));



export function PagerThuChi(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage, state, search } = props;

  const handleFirstPageButtonClick = event => {
    if(state.prev_page_url != null){
        if(search!="") {
            onChangePage(state.first_page_url+'?searchQuery='+search+'&per_page='+state.per_page.toString());
        } else {
            onChangePage(state.first_page_url+'?per_page='+state.per_page.toString());
        }
        
      }
  };

  const handleBackButtonClick = event => {
    if(state.prev_page_url != null){
        onChangePage(state.prev_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
  };

  const handleNextButtonClick = event => {
      alert(state.next_page_url);
    if(state.next_page_url != null){
        onChangePage(state.next_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
  };

  const handleLastPageButtonClick = event => {
    if(state.next_page_url != null){
        onChangePage(state.last_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
  };

  

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page 1"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
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
  state: PropTypes.shape({
    from:PropTypes.string.isRequired,
    current_page:PropTypes.number.isRequired,
    to:PropTypes.string.isRequired,
    total:PropTypes.string.isRequired,
    per_page:PropTypes.number.isRequired,    
    last_page:PropTypes.string.isRequired,    
    next_page_url:PropTypes.string.isRequired,
    first_page_url:PropTypes.string.isRequired,
    last_page_url:PropTypes.string.isRequired,
    prev_page_url:PropTypes.string.isRequired,
           
  }),
//   getApi:PropTypes.func.isRequired,
//   search:PropTypes.string.isRequired
};



// export default function PagerThuChi(props) {
//     const classes = useStyles2();
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
//     const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//     };
  
//     const handleChangeRowsPerPage = event => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       setPage(0);
//     };
  
//     return (
//             <Fragment>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//                 colSpan={3}
//                 count={rows.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: { 'aria-label': 'rows per page' },
//                   native: true,
//                 }}
//                 onChangePage={handleChangePage}
//                 onChangeRowsPerPage={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </Fragment>
//     );
//   }