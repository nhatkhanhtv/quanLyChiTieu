import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RenderTextField from './RenderTextField';
import RenderDateField from './RenderDateField';
import Axios from 'axios';
import MaterialUIPickers from './MaterialUIPickers';
import MaskedInputTest from './MaskedInputTest';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));




export default function DialogThuChi(props) {
    const { urlApi, getApi } = props;
    //const [data,setData] = useState(null);\
    const [data,setData] = useState({
        noi_dung:"",
        so_tien:"",
        ngay_thang_nam:"",
        loai:""
    });
    const classes = useStyles();
    const handleTextChange = key => event => {
        setData({ ...data, [key]: event.target.value })
    }

    // const handleDateChange = key => event => {
    //     let date = event.target.value; 

    //     setData({ ...data, [key]: event.target.value })
    // }

    const handleSubmit = event => {
        sendData();
        console.log(data);
        event.preventDefault();
    }

    const sendData = () => {
        axios({
            method:"post",
            url: urlApi,
            data:data
        }).then(json=>{
            // let list = json.data;
            getApi();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Paper>
            <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
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
                
                {/* <RenderDateField 
                    name = 'ngay_thang_nam'
                    label = 'Ngày'
                    handleTextChange = {handleTextChange('ngay_thang_nam')}
                    value = {data.ngay_thang_nam}
                /> */}
                <RenderTextField 
                    name = 'loai'
                    label = 'Loại'
                    handleTextChange = {handleTextChange('loai')}
                    value = {data.loai}
                    />
                <MaterialUIPickers />
                {/* <MaskedInputTest /> */}

                <Button type="submit">Chấp nhận</Button>
            </form>
        </Paper>
    )
}