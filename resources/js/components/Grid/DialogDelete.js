import 'date-fns';
import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RenderTextField from './RenderTextField';
import RenderDateField from './RenderDateField';
import RenderRadioButton from './RenderRadioButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogThuChi(props) {
    const { 
        getApi,
        urlGetData,
        urlApi,
        rowIndex,
        setRowIndex, 
        openDialog,
        setOpenDialog,
    } = props;

    const handleClose = () => {
        setOpenDialog(false);
    };    
 
    const classes = useStyles();

    const handleDelete = event => {
        sendData();        
        // clearForm();
        // setOpenFormDialog(false);
        console.log("delete" + rowIndex);
        event.preventDefault();
    }

    const sendData = () => {
        axios({
            method:"delete",
            url: urlApi+"/"+rowIndex,
        }).then(json=>{
            // let list = json.data;
            
            getApi(urlGetData);
            setOpenDialog(false);
        }).catch(error => {
            console.log(error);
        });
    }
    

    return (
        <Paper>            
            
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText>Xóa dòng này</DialogContentText>
                </DialogContent>
                <DialogActions>                    
                    <Button onClick={handleClose} color="primary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}