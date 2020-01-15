import 'date-fns';
import React, { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RenderTextField from './RenderTextField';
import RenderDateField from './RenderDateField';
import RenderRadioButton from './RenderRadioButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
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
        onEdit,
        emptyRowIndex,
        rowDataIndex,
        urlApi, 
        getApi, 
        radioData, 
        urlGetData, 
        openFormDialog, 
        setOpenFormDialog 
    } = props;

    const handleEnterDialog = () => {
        console.log(props);
        if(onEdit) {
            setData({...rowDataIndex});            
        }
      };
    //const [data,setData] = useState(null);\
    const [data,setData] = useState({
        noi_dung:"",
        so_tien:"",
        ngay_thang_nam:new Date(Date.now()).toDateString(),
        loai:1
    });

    const handleResetForm = () => {
        clearForm();
    };
    
    const clearForm = () => {
        let form = {noi_dung:"1",
        so_tien:"1",
        ngay_thang_nam:new Date(Date.now()).toDateString(),
        loai:1};
        setData({...form});
    }

    const handleClickOpen = () => {
        setOpenFormDialog(true);
      };
    
    const handleClose = () => {
        setOpenFormDialog(false);
        clearForm();
    };    

   
  
    // const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now()).toLocaleString());
    const handleDateChange = key => date => {
        // setSelectedDate(date);
        console.log(date);

        setData({ ...data, [key]: date.toDateString() });

    };

    const handleRadioChange = key => event => {
        
        const { value, checked } = event.target;      
        var val = parseInt(value);
        if(checked)
        {
            setData({ ...data, [key]: val });
        } 
    };
    const classes = useStyles();
    const handleTextChange = key => event => {
        setData({ ...data, [key]: event.target.value })
    }

    const handleSubmit = event => {
        if(onEdit) {
            sendUpdate();
        } else {
            sendData();        
        }
        
        clearForm();
        setOpenFormDialog(false);
        // console.log(data);
        event.preventDefault();
    }

    const sendData = () => {
        axios({
            method:"post",
            url: urlApi,
            data:data
        }).then(json=>{
            // let list = json.data;
            
            getApi(urlGetData);
            
        }).catch(error => {
            console.log(error);
        });
    }
    
    const sendUpdate = () => {
        axios({
            method:"put",
            url: urlApi+"/"+rowDataIndex.id,
            data:data
        }).then(json=>{
            // let list = json.data;
            
            getApi(urlGetData);
            emptyRowIndex();
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <Paper>
            
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
            <Dialog
                onEnter = {handleEnterDialog}
                open={openFormDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                        <RenderTextField 
                            name = 'noi_dung'
                            label = 'Nội dung'
                            handleTextChange = {handleTextChange('noi_dung')}
                            value = {data.noi_dung}
                            />
                        <RenderTextField 
                            name = 'so_tien'
                            label = 'Số tiền'
                            handleTextChange = {handleTextChange('so_tien')}
                            value = {data.so_tien}
                            />
                        
                        <RenderDateField 
                            name = 'ngay_thang_nam'
                            label = 'Ngày'
                            handleDateChange = {handleDateChange('ngay_thang_nam')}
                            // selectedDate = {selectedDate}
                            value = {data.ngay_thang_nam}
                        />

                        
                        <RenderRadioButton 
                            name = 'loai'
                            label = 'Loại'
                            value={data.loai}
                            radioData = {radioData}
                            handleRadioChange = {handleRadioChange('loai')}
                        />
                        
                        
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleResetForm} color="primary">
                        Reset
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Chấp nhận
                    </Button>
                </DialogActions>
            </Dialog>
            </form>
        </Paper>
    )
}