import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled(Link)`
  width: 48%; 
  margin-bottom: 10px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  text-decoration: none;
`;

const ProductImage = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: url(${(props) => props.img || ''});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 0;
`;

const CardTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #353535;
  margin-bottom: 5px;
`;

const CardSubTitle = styled.span`
  font-size: 12px;
  color: #353535;
  margin-bottom: 5px;
`;

const CardContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const CardContent = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #353535;
  margin-bottom: 5px;
`;

const CardPrice = styled.span`
  margin-left: 10px;
  padding: 3px 10px;
  font-size: 10px;
  color: #A0A0A0;
  background-color: #EEEEEE;
  border-radius: 10px;
`;

const ProductCard = ({ img, text1, text2, text3, text4, navigateTo }) => {
  const productId = navigateTo.split('/').pop();
  
  return (
    <CardContainer to={`/store/${productId}`}>
      <ProductImage img={img} />
      <CardDetails>
        <CardTitle>{text1}</CardTitle>
        <CardSubTitle>{text2}</CardSubTitle>
        <CardContentWrapper>
          <CardContent>{text3}</CardContent>
          <CardPrice>{text4}</CardPrice>
        </CardContentWrapper>
      </CardDetails>
    </CardContainer>
  );
};

export default ProductCard;
