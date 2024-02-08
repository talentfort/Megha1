import React, { useState, useEffect } from 'react';
import { Input, Button, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import axios from 'axios';
import Primal from '../assets/Primal.jpeg';
import Vac from '../assets/Vac.jpeg';
import Loader from "./Loader";
import inv from "../assets/inv.png";

export default function Update() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://backend.megha1.org/get-all-products');
      const userEmail = localStorage.getItem('userEmail');
      const userProducts = response.data.data.filter(product => product.pharmacyMail === userEmail);
      setProducts(userProducts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQuantityChange = (productName, newQuantity) => {
    const updatedProducts = products.map(product => {
      if (product.name === productName) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleUpdateStock = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await fetch(`https://backend.megha1.org/update-quantity/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        setSuccessMessage('Product quantity updated successfully');
      } else {
        console.error('Error updating product quantity');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="px-4 sm:px-6 md:px-8">
      {loading && <Loader/>}
        <div className='flex flex-col items-center justify-center pt-10'>
          <img src={inv} className='w-14 h-14'/>
        <h1 className='mt-10 text-green-700 text-center text-4xl font-bold sm:text-3xl md:text-4xl lg:text-5xl'><span className='text-yellow-500'>UPDATE</span><span className='text-green-700'> STOCKS</span></h1>

        </div>
      {successMessage && (
        <p className="text-green-500 text-center mt-4">{successMessage}</p>
      )} 
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <Card key={product.name}>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.name === 'MeGha1 Primal Intake' ? Primal : Vac}
           style={{height:"160px", width:"100%", objectFit:"cover",}} />
            <CardContent>
              <h2 className='text-3xl md:text-4xl'>{product.name}</h2>
              <p>{product.description}</p>
              <Input
                color="success"
                placeholder="Enter stocks"
                size="lg"
                variant="plain"
                value={product.quantity}
                onChange={e => handleQuantityChange(product.name, e.target.value)}
              />
              <Button size="md" onClick={() => handleUpdateStock(product._id, product.quantity)}>
                Update Stock
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
