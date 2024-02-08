// import React, { useState, useEffect } from 'react';
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// import axios from 'axios';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import profit from '../assets/profit.png';
// // ... (other imports)

// function AddPharmacy() {


 

//     const columns = [
//         { id: 'name', name: 'Pharmacy name' },
//         { id: 'mail', name: 'Mail' },
//         { id: 'items', name: 'Items' },
//         { id: 'stock', name: 'Stock availability' },
//     ];

//     const [pharmacies, setPharmacies] = useState([]);

//     useEffect(() => {
//         // Fetch products from API
//         axios.get('https://backend.megha1.org/get-all-products')
//             .then(response => {
//                 const products = response.data.data;
//                 console.log("respond:",response.data)
//                 // Organize products by pharmacy email
//                 const pharmaciesMap = new Map();

//                 products.forEach(product => {
//                     if (!pharmaciesMap.has(product.pharmacyMail)) {
//                         pharmaciesMap.set(product.pharmacyMail, {
//                             pharmacyName: product.pharmacyName,
//                             pharmacyMail: product.pharmacyMail,
//                             products: [], // Initialize products array
//                             selectedProduct: null,
//                         });
//                     }

//                     const pharmacy = pharmaciesMap.get(product.pharmacyMail);
//                     pharmacy.products.push({ name: product.name, quantity: product.quantity });
//                 });

//                 setPharmacies([...pharmaciesMap.values()]);
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     }, []);

//     return (
//         <div>
//             <div style={{ textAlign: "center" }}>
//                <div className='flex flex-col items-center justify-center pt-5'>
//                 <img className='w-12 h-12' src={profit} />
//                <h1 className='font-extrabold mt-10 text-5xl text-green-700'><span className='font-5xl text-yellow-500 '>AVAILABLE</span> <span className='text-green-700'>STOCKS</span></h1>
//                </div>

//                 <Paper className='mt-10' sx={{ width: '90%', marginLeft: '5%' }}>
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow className='bg-gray-200'>
//                                     {columns.map((column) => (
//                                         <TableCell key={column.id}>{column.name}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             </TableHead>

//                             <TableBody>
//                                 {pharmacies.map((pharmacy, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell>{pharmacy.pharmacyName}</TableCell>
//                                         <TableCell>{pharmacy.pharmacyMail}</TableCell>
//                                         <TableCell>
//                                             <FormControl sx={{ minWidth: 120 }}>
//                                                 <InputLabel>Select Product</InputLabel>
//                                                 <Select
//                                                     value={pharmacy.selectedProduct}
//                                                     onChange={(event) => {
//                                                         const newSelectedProduct = event.target.value;
//                                                         setPharmacies(prevPharmacies =>
//                                                             prevPharmacies.map(prevPharmacy =>
//                                                                 prevPharmacy.pharmacyMail === pharmacy.pharmacyMail
//                                                                     ? { ...prevPharmacy, selectedProduct: newSelectedProduct }
//                                                                     : prevPharmacy
//                                                             )
//                                                         );
//                                                     }}
//                                                 >
//                                                     {pharmacy.products.map((product) => (
//                                                         <MenuItem key={product.name} value={product.name}>
//                                                             {product.name}
//                                                         </MenuItem>
//                                                     ))}
//                                                 </Select>
//                                             </FormControl>
//                                         </TableCell>
//                                         <TableCell>
//                                             {pharmacy.products.find(product => product.name === pharmacy.selectedProduct)?.quantity || 0}
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
                  
//                 </Paper>
//             </div>
//         </div>
//     );
// }

// export default AddPharmacy;


import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import profit from '../assets/profit.png';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

function AddPharmacy() {
    const columns = [
        { id: 'name', name: 'Pharmacy name' },
        { id: 'mail', name: 'Mail' },
        { id: 'items', name: 'Items' },
        { id: 'stock', name: 'Stock availability' },
    ];

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        // Fetch products from API
        axios.get('https://backend.megha1.org/get-all-products')
            .then(response => {
                const products = response.data.data;
                // Organize products by pharmacy email
                const pharmaciesMap = new Map();

                products.forEach(product => {
                    if (!pharmaciesMap.has(product.pharmacyMail)) {
                        pharmaciesMap.set(product.pharmacyMail, {
                            pharmacyName: product.pharmacyName,
                            pharmacyMail: product.pharmacyMail,
                            products: [],
                            selectedProduct: null,
                        });
                    }

                    const pharmacy = pharmaciesMap.get(product.pharmacyMail);
                    pharmacy.products.push({ name: product.name, quantity: product.quantity });
                });

                setPharmacies([...pharmaciesMap.values()]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleExportPDF = () => {
        const doc = new jsPDF();
    
        pharmacies.forEach((pharmacy, pharmacyIndex) => {
            if (pharmacyIndex > 0) {
                doc.addPage();
            }
    
            doc.text(`Pharmacy Name: ${pharmacy.pharmacyName}`, 10, 10);
            doc.text(`Pharmacy Mail: ${pharmacy.pharmacyMail}`, 10, 20);
    
            const data = [];
    
            pharmacy.products.forEach(product => {
                data.push([product.name, product.quantity]);
            });
    
            doc.autoTable({
                head: [['Product Name', 'Quantity']],
                body: data,
                startY: 30,
            });
        });
    
        doc.save('pharmacy_stock.pdf');
    };

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <div className='flex flex-col items-center justify-center pt-5'>
                    <img className='w-12 h-12' src={profit} />
                    <h1 className='font-extrabold mt-10 text-5xl text-green-700'><span className='font-5xl text-yellow-500 '>AVAILABLE</span> <span className='text-green-700'>STOCKS</span></h1>
                </div>

                <Paper className='mt-10' sx={{ width: '90%', marginLeft: '5%' }}>
                    <TableContainer>
                        <Table id="pdfTable">
                            <TableHead>
                                <TableRow className='bg-gray-200'>
                                    {columns.map((column) => (
                                        <TableCell key={column.id}>{column.name}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pharmacies.map((pharmacy, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{pharmacy.pharmacyName}</TableCell>
                                        <TableCell>{pharmacy.pharmacyMail}</TableCell>
                                        <TableCell>
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <InputLabel>Select Product</InputLabel>
                                                <Select
                                                    value={pharmacy.selectedProduct}
                                                    onChange={(event) => {
                                                        const newSelectedProduct = event.target.value;
                                                        setPharmacies(prevPharmacies =>
                                                            prevPharmacies.map(prevPharmacy =>
                                                                prevPharmacy.pharmacyMail === pharmacy.pharmacyMail
                                                                    ? { ...prevPharmacy, selectedProduct: newSelectedProduct }
                                                                    : prevPharmacy
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {pharmacy.products.map((product) => (
                                                        <MenuItem key={product.name} value={product.name}>
                                                            {product.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </TableCell>
                                        <TableCell>
                                            {pharmacy.products.find(product => product.name === pharmacy.selectedProduct)?.quantity || 0}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
            {/* <button type="button" class="btn btn-success" onClick={handleExportPDF}>Export to PDF</button> */}

            <button
  type="button"
  class="bg-green-700 text-white hover:bg-yellow-500 py-2 px-4 rounded mt-4 ml-10 mb-5 text-center"
  onClick={handleExportPDF}
>
  Export to PDF
</button>

        </div>
    );
}

export default AddPharmacy;
