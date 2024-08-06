import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import { productData } from './ProductData';

const ProductDiv = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: #FFFFFF;
  margin-top: 5px;
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

export default function BrandGroup({ selectedBrand }) {
  const filteredProducts = selectedBrand && selectedBrand !== 'all' // Add check for 'all' to display all products
    ? productData.filter(product => product.brand === selectedBrand)
    : productData;

  return (
    <ProductDiv>
      <ProductList>
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            img={product.img}
            text1={product.text1}
            text2={product.text2}
            text3={product.text3}
            text4={product.text4}
            navigateTo={product.navigateTo}
          />
        ))}
      </ProductList>
    </ProductDiv>
  );
}
