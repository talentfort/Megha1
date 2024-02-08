import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch } from '@mui/material';
import Phar from "../assets/Phar.png";

function AddPharmacy() {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'email', name: 'Email' },
        { id: 'name', name: 'Name' },
        { id: 'location', name: 'Location' },
        { id: 'approve', name: 'Approve' } // New column
    ];

    const [approvedItems, setApprovedItems] = useState({});
    const [pharmacyData, setPharmacyData] = useState([]);
    useEffect(() => {
        // Fetch data from the API
        fetch('https://backend.megha1.org/pharmacy-users')
            .then(response => response.json())
            .then(data => {
                if (data.data && Array.isArray(data.data)) {
                    setPharmacyData(data.data);
                    
                    // Set approvedItems based on status
                    const initialApprovedItems = {};
                    data.data.forEach(row => {
                        initialApprovedItems[row._id] = row.status;
                    });
                    setApprovedItems(initialApprovedItems);
                } else {
                    console.error('API response does not contain the expected data:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);
    
    

    const handleToggle = async (userId) => {
        try {
          const newStatus = !approvedItems[userId];
          const response = await fetch(`https://backend.megha1.org/update-status/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          });
      
          if (response.ok) {
            setApprovedItems((prev) => ({
              ...prev,
              [userId]: newStatus,
            }));
          } else {
            console.error('Error updating status');
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
      

    return (
        <div>
            <div>
                <div className='mt-[-30]'>
                    <div style={{ textAlign: "center" }}>
                        <div className='flex flex-col items-center justify-center pt-5'>
                            <img className='w-12 h-12' src={Phar}/>
                            <h1 className='text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-center mt-10 font-bold'>
    <span className='text-yellow-500'>PHARMACY</span> <span className='text-green-700'>LIST</span>
</h1>


                        </div>
                        <Paper className='mt-10' sx={{ width: '90%', marginLeft: '5%' }}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow className='bg-gray-200'>
                                            {columns.map((column) => (
                                                <TableCell key={column.id}>{column.name}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {pharmacyData.map((row) => (
    <TableRow key={row._id}>
        <TableCell className='text-xs'>{row._id}</TableCell>
        <TableCell className='text-xs'>{row.email}</TableCell>
        <TableCell className='text-xs'>{row.pharmacyName}</TableCell>
        <TableCell className='text-xs'>{row.pharmacyLocation}</TableCell>
        <TableCell>
            <Switch
                checked={approvedItems[row._id] || false}
                onChange={() => handleToggle(row._id)}
                color='primary'
            />
        </TableCell>
    </TableRow>
))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPharmacy;


