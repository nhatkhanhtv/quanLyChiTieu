import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Table from '@material-ui/core/Table';
import { TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import DialogThuChi from './DialogThuChi';

const url = "/thuChi";
export default function DanhSachThuChi(props) {
    const [data,setData] = useState([]);
    const [error,setError] = useState([]);
    // const []
    const getApi = () => {
        axios.get(url).then(json=>{
            let list = json.data;
            setData(list);

        })
    }
    useEffect(() => {
        getApi();
      },[]);

    

    const renderRow = (row) => {
        return (
                <TableRow key={row.id}>
                    {/* <TableCell>{row.id}</TableCell> */}
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
                        <TableCell>Nội dung</TableCell>
                        <TableCell>Số tiền</TableCell>
                        <TableCell>Ngày</TableCell>
                        <TableCell>Loại</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map( row => renderRow(row))}
                </TableBody>
            </Table>
            <DialogThuChi getApi={getApi} urlApi={url}/>
        </Fragment>
    );
}

const rootEl = document.getElementById("example");
ReactDOM.render(<DanhSachThuChi/>,rootEl);