import React, { useState } from 'react';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

export default function StockBtn(props) {
  const [selectedProduct, setSelectedProduct] = useState(props.productNames[0]);

  const handleProductClick = (productName) => {
    setSelectedProduct(productName === selectedProduct ? null : productName);
  };

  return (
    <Dropdown>
      <MenuButton>Stocks</MenuButton>
      <Menu>
        {props.productNames.map((productName, index) => (
          <MenuItem key={index} onClick={() => handleProductClick(productName)}>
            <p className={`text-${selectedProduct === productName ? 'green-700' : 'yellow-500'} text-lg`}>{productName}</p>
            {selectedProduct === productName && (
              <p className='text-gray-500'>Quantity: {props.productQuantities[index]}</p>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  );
}
