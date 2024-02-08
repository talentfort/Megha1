import React, { useState, useEffect } from "react";
import pills from "../assets/pills.png";
import {
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

function DoctorStock() {
  const columns = [
    { id: "id", name: "Id" },
    { id: "Date", name: "Date" },
    { id: "Medicine Name", name: "Medicine Name" },
    { id: "Quantity", name: "Quantity" },
  ];
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [selectedPharmacyNew, setSelectedPharmacyNew] = useState("");
  const [selectedPharmacyName, setSelectedPharmacyName] = useState(""); // Track selected pharmacy name
  const [selectedPharmacyEmail, setSelectedPharmacyEmail] = useState(""); // Track selected pharmacy email
  const [selectedProduct, setSelectedProduct] = useState(""); // Track the selected product
  const [quantity, setQuantity] = useState(""); // Track the quantity input
  const [products, setProducts] = useState([]); // Store products for the selected pharmacy
  const [doctorStocks, setDoctorStocks] = useState([]); // Store products for the selected pharmacy
  const [productsNew, setProductsNew] = useState([]); // Store products for the selected pharmacy
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [showNewForm, setShowNewForm] = useState(false);
  const [showSelectedPharmacy, setShowSelectedPharmacy] = useState(false);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState("");
  console.log("Doctor Stock:", setDoctorStocks);
  const fetchstock = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get("https://backend.megha1.org/get-doctorstock");

    
      const stocks = response.data.data.filter(
        (product) => product.pharmacyMail === selectedPharmacy
      );
      setDoctorStocks(stocks);
      console.log(stocks, "userp");
      //   setLoading(false);
    } catch (error) {
      //   setLoading(false);
      console.error(error);
    }
  };

  const fetchProducts = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(
        "https://backend.megha1.org/get-all-products"
      );

      const userProducts = response.data.data.filter(
        (product) => product.pharmacyMail === selectedPharmacyNew
      );
      setProducts(userProducts);
      //   console.log(userProducts, "userp");
      //   setLoading(false);
    } catch (error) {
      //   setLoading(false);
      console.error(error);
    }
  };
  const fetchProductsNew = async () => {
    try {
      //   setLoading(true);
      const response = await axios.get(
        "https://backend.megha1.org/get-all-products"
      );

      const userProductsNew = response.data.data.filter(
        (product) => product.pharmacyMail === selectedPharmacy
      );
      setProductsNew(userProductsNew);
      //   console.log(userProductsNew, "userp");
      //   setLoading(false);
    } catch (error) {
      //   setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchstock(); // This will run when selectedPharmacy changes
  }, [selectedPharmacy]);
  useEffect(() => {
    fetchProductsNew(); // This will run when selectedPharmacy changes
  }, [selectedPharmacy]);
  useEffect(() => {
    fetchProducts(); // This will run when selectedPharmacy changes
  }, [selectedPharmacyNew]);

  const handleQuantityChange = (productName, newQuantity) => {
    const updatedProducts = products.map((product) => {
      if (product.name === productName) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleUpdateStock = async () => {
    try {
      if (!selectedProduct || !quantity) {
        console.error("Please select a product and enter a quantity.");
        return;
      }
      const updatedQuantity = parseInt(quantity); // Convert the quantity to a number
      const currentProduct = products.find(
      (product) => product._id === selectedProduct
      );
      
      if (!currentProduct) {
      console.error("Selected product not found in the product list.");
      return;
      }
      
      const newQuantity = currentProduct.quantity + updatedQuantity;
      
      const response = await fetch(
      `https://backend.megha1.org/update-quantity/${selectedProduct}`,
      {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
      }
      );

      if (response.ok) {
        const dataToSend = {
          quantity,

          pharmacyName: selectedPharmacyName, // Selected pharmacy name
          pharmacyMail: selectedPharmacyEmail, // Selected pharmacy email
          productName: selectedProductName, // Selected product name
        };

        // Send the additional information to the server (doctorstock API)
        const doctorStockResponse = await fetch(
          "https://backend.megha1.org/create-doctorstock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          }
        );

        if (doctorStockResponse.ok) {
          console.log("Doctor's stock entry created successfully");
          // You can handle any additional logic here after creating the doctor's stock entry.
        } else {
          console.error("Error creating doctor's stock entry");
        }

        alert("Product quantity updated successfully");
        fetchProductsNew();
        fetchProducts(); 
        fetchstock();
        setShowNewForm(false); // Close the new form
        document.getElementById("tablediv").style.display = "flex";
        setSuccessMessage("Product quantity updated successfully");
        // Reset the input fields or clear the success message if needed
        setSelectedProduct(""); // Clear selected product
        setQuantity(""); // Clear quantity input
      } else {
        console.error("Error updating product quantity");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://backend.megha1.org/pharmacy-users")
      .then((response) => response.json())
      .then((data) => {
        setPharmacyData(data.data);
        console.log("pharmacyData", pharmacyData);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handlePharmacySelect = (e) => {
    const selectedPharmacyName = e.target.value;
    setSelectedPharmacy(selectedPharmacyName);
    setShowNewForm(false); // Close the new form
    setShowSelectedPharmacy(false); // Close the selected pharmacy section

    document.getElementById("tablediv").style.display = "flex";
  };
  const handlePharmacySelectNew = (e) => {
    const selectedPharmacyNameNew = e.target.value;
    setSelectedPharmacyName(selectedPharmacyName);
    setSelectedPharmacyEmail(
      e.target.options[e.target.selectedIndex].getAttribute("data-email")
    );
    setSelectedPharmacyNew(selectedPharmacyNameNew);
  };

  const handleNewButtonClick = () => {
    setShowSelectedPharmacy(false); // Close the selected pharmacy section
    setShowNewForm(true);
    document.getElementById("tablediv").style.display = "none";
  };

  const handleSelectedPharmacyClick = () => {
    setShowSelectedPharmacy(!showSelectedPharmacy);
    setShowNewForm(false); // Close the new form
  };
  return (
    <div className="mt-[-30]">
      <div style={{ textAlign: "center" }}>
       <div className="flex flex-col items-center justify-center pt-1">

       <h1 className="text-3xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl text-center mt-10 font-bold">
        <img src={pills} className="w-14 h-14" />
          <span className="text-yellow-500">DOCTOR</span><span className="text-green-700"> STOCK</span>
        </h1>
       </div>

        <div className="flex justify-center items-center gap-[10px] mt-[40px]">
          <select
            className="min-w-[170px] border-[1px] border-solid py-[8px] rounded"
            onChange={handlePharmacySelect}
          >
            <option value="volvo">Select Pharmacy</option>
            {pharmacyData?.map((item, id) => (
              <option key={id} value={item.email}>
                {item.pharmacyName}
              </option>
            ))}
          </select>

          <button
            className="block bg-green-700 hover:bg-yellow-500 text-white max-w-[160px] w-full py-2 px-8 rounded"
            onClick={handleNewButtonClick}
          >
            New
          </button>
        </div>
        {showNewForm && (
          <div className="flex  items-center max-w-[300px] shadow-md mt-[40px] m-auto justify-center flex-col py-[40px] px-[20px]">
            <select
              className="min-w-[170px] border-[1px] border-solid py-[8px] rounded"
              onChange={(e) => {   handlePharmacySelectNew(e);
                setSelectedPharmacyEmail(e.target.value);
                setSelectedPharmacyName(
                  e.target.options[e.target.selectedIndex].text
                );
              }}
            >
              <option value="volvo">Select Pharmacy</option>
              {pharmacyData?.map((item, id) => (
                <option key={id} value={item.email}>
                  {item.pharmacyName}
                </option>
              ))}
            </select>
            <select
              className="min-w-[170px] border-[1px] mt-[10px] border-solid py-[8px] rounded"
              onChange={(e) => {
                setSelectedProduct(e.target.value);
                setSelectedProductName(
                  e.target.options[e.target.selectedIndex].text
                );
              }}
              value={selectedProduct}
            >
              <option value="">Select Medicine</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
            <input
              className="max-w-[170px] border-[1px] px-[10px] mt-[10px] border-solid py-[8px] rounded"
              type="text"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button
              className="block bg-green-700 hover:bg-yellow-500 mt-[10px] text-white max-w-[130px] w-full py-2 px-8 rounded"
              onClick={handleUpdateStock}
            >
              Save
            </button>
          </div>
        )}
        {selectedPharmacy && (
          <div
            id="tablediv"
            className="flex  items-center max-w-[700px] shadow-md mt-[40px] m-auto justify-center flex-col py-[40px] px-[20px]"
          >
            <h1 className="text-2xl font-bold text-green-700">
              Selected Pharmacy: {selectedPharmacy}
            </h1>
            <div className="flex mb-[20px] gap-[20px] mt-[20px] justify-between w-full flex-wrap">
              {productsNew.map((product) => (
                <div className="shadow-lg py-[20px] px-[40px] rounded">
                  <h1 className="text-xl font-bold  text-gray-700">
                    {product.name}
                  </h1>
                  <h6 className="text-md font-semibold  py-[20px] px-[40px] rounded text-gray-700">
                    Quantity : {product.quantity}
                  </h6>
                </div>
              ))}
            </div>
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
                      <TableCell className="text-xs">
                        {row.productName}
                      </TableCell>
                      <TableCell className="text-xs">{row.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorStock;




