import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Select,
} from "@mui/material";
import axios from "axios";
import Primal from "../assets/Primal.jpeg";
import Vac from "../assets/Vac.jpeg";
import Loader from "./Loader";
import updated from "../assets/updated.png";

export default function PharmaStock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [quant, setQuant] = useState("");
  const [doctorStocks, setDoctorStocks] = useState([]); // Store products for the selected pharmacy

  const columns = [
    { id: "id", name: "Id" },
    { id: "Date", name: "Date" },
    { id: "Medicine Name", name: "Medicine Name" },
    { id: "Quantity", name: "Quantity" },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend.megha1.org/get-all-products"
      );
      const userEmail = localStorage.getItem("userEmail");
      const userProducts = response.data.data.filter(
        (product) => product.pharmacyMail === userEmail
      );
      setProducts(userProducts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const fetchstock = async () => {
    try {
      // setLoading(true);
      const response = await axios.get("https://backend.megha1.org/get-doctorstock");
      const userEmail = localStorage.getItem("userEmail");

      const stocks = response.data.data.filter(
        (product) => product.pharmacyMail === userEmail
      );
      setDoctorStocks(stocks);
      console.log(stocks, "userp");
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.error(error);
    }
  };
  const handlequnatity = (e) => {
    const qty = e.target.value;
    setQuant(qty);
  };
  useEffect(() => {
    fetchstock(); // This will run when selectedPharmacy changes
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateStock = async (productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend.megha1.org/update-quantity/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Product quantity updated successfully");
        // After successful update, you might want to refresh the product data
        fetchProducts();
      } else {
        console.error("Error updating product quantity");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {loading && <Loader />}
     <div className="flex flex-col items-center justify-center pt-10">
      <img src={updated} className="w-12 h-12" />
     <h1 className="mt-10 text-green-700 text-center text-4xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
        <span className="text-5xl text-yellow-500 ">UPDATE <span className="text-5xl text-green-700">SALES</span></span>
      </h1>
     </div>
      {successMessage && (
        <p className="text-green-500 text-center mt-4">{successMessage}</p>
      )}
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card key={product.name}>
            <CardMedia
              component="img"
              alt={product.name}
              height="120"
              image={product.name === "MeGha1 Primal Intake" ? Primal : Vac}
              style={{ height: "120px", width: "100%", objectFit: "cover" }}
            />
            <CardContent>
              <h2 className="text-xl md:text-2xl">{product.name}</h2>
              {/* <p>{product.description}</p> */}
              <Input
                color="success"
                placeholder="Enter Sale Quantity"
                size="lg"
                variant="plain"
                onChange={handlequnatity}
              />
              <Button
                size="md"
                onClick={() =>
                  handleUpdateStock(product._id, product.quantity - quant)
                }
              >
                Update
              </Button>
              <p>Available Stock: {product.quantity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-200">
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {doctorStocks.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className="text-xs">{row._id}</TableCell>
                  <TableCell className="text-xs">
                    {row.timestamp &&
                      new Date(row.timestamp).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="text-xs">{row.productName}</TableCell>
                  <TableCell className="text-xs">{row.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
