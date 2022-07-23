import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Orderdishes = (props) => {
    console.log('orderdish props', props);

    const { dishes } = props;

    const rows = [];
    
    // if (dishes) {
        for (let i = 0; i < dishes.length; i++) {
            rows.push(
                <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {dishes[i].dish_name}
                    </TableCell>
                    <TableCell align="right">{dishes[i].quantity}</TableCell>
                    <TableCell align="right">{dishes[i].description}</TableCell>
                </TableRow>
            )
        }
    // }
    useEffect(() => {
    }, [dishes]);
    

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Item </TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default Orderdishes;