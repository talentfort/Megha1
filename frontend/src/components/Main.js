import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaRegMoneyBillAlt } from 'react-icons/fa';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Main = () => {
    const [products, setProducts] = useState([]);
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [annualEarnings, setAnnualEarnings] = useState(0);

    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');

    useEffect(() => {
        // Fetch products for the logged-in user
        axios.get(`https://backend.megha1.org/get-all-products`)
            .then(response => {
                const fetchedProducts = response.data.data;

                // If userRole is PharmacyUser, filter products by userEmail
                const filteredProducts = (userRole === 'PharmacyUser')
                    ? fetchedProducts.filter(product => product.pharmacyMail === userEmail)
                    : fetchedProducts;

                setProducts(filteredProducts);

                // Calculate earnings
                let monthlyTotal = 0;
                let annualTotal = 0;
                filteredProducts.forEach(product => {
                    const productEarnings = product.price * product.quantity;
                    monthlyTotal += productEarnings;
                    annualTotal += productEarnings * 12; // Assuming 1 year has 12 months
                });
                setMonthlyEarnings(monthlyTotal);
                setAnnualEarnings(annualTotal);
            })
            .catch(error => {
                console.error(error);
            });
    }, [userRole, userEmail]);

    // Prepare chart data
    const chartData = products.map((product, index) => ({
        name: `Week ${index + 1}`,
        earnings: product.price * product.quantity
    }));

    return (
        <div className='px-[25px] pt-[25px] bg-[#F8F9FC] pb-[40px]'>
            <div className='flex items-center justify-between'>
                <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer hover:text-yellow-500'>Dashboard</h1>
                <span>Logged in as {userRole}</span>
            </div>
            {/* ... rest of your component code */}
            <div className='flex mt-[22px] w-full gap-[30px]'>
                <div className='basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]'>
                    <div className='bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]'>
                        <h2 className='text-green-700 text-[16px] leading-[19px] font-bold'>Earnings Overview</h2>
                        <FaEllipsisV color="gray" className='cursor-pointer' />
                    </div>
                    <div className="w-full">
                        <LineChart
                            width={1150}
                            height={500}
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#82ca9d" />
                        </LineChart>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
