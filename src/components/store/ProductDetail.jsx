import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { productData } from './ProductData';
import BackButtonB from "@components/store/BackButtonB";

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFFFFF;
  padding-bottom: 70px;
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  align-items: center;

  & .mainImage {
    width: 100%;
    height: auto;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const ProductTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #353535;
  margin-bottom: 5px;
`;

const ProductSubTitle = styled.span`
  font-size: 16px;
  color: #949494;
  margin-bottom: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ProductContent = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #353535;
  margin-bottom: 5px;
`;

const ProductPrice = styled.span`
  margin-left: 10px;
  padding: 3px 10px;
  font-size: 14px;
  color: #A0A0A0;
  background-color: #EEEEEE;
  border-radius: 10px;
`;

const MoreInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  flex-direction: column;
`;

const ExtraWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const ExtraLabel = styled.div`
  flex: 0 0 150px; 
  font-size: 14px;
  color: #949494;
  margin-bottom: 5px;
`;

const ExtraText = styled.div`
  flex: 1;
  font-size: 14px;
  color: #949494;
  margin-bottom: 5px;

  strong {
    font-weight: bold;
  }
`;

const StyledHr = styled.hr`
  width: 100%;
  border: 1px solid #E0E0E0;
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'};
`;

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.navigateTo === `/store/${id}`);

  if (!product) {
    return <p>Product not found!</p>;
  }

  const showPointsAlert = () => {
    alert("포인트가 부족합니다.");
  };

  return (
    <DetailContainer>
      <ProductImage>
        <BackButtonB />
        <img className='mainImage' src={product.img} alt={product.text1} />
      </ProductImage>
      <ProductDetails>
        <ProductTitle>{product.text1}</ProductTitle>
        <ProductSubTitle>{product.text2}</ProductSubTitle>
        <ContentWrapper>
          <ProductContent>{product.text3}</ProductContent>
          <ProductPrice>{product.text4}</ProductPrice>
        </ContentWrapper>
        <StyledHr />
        <MoreInfo>
          <ExtraWrapper>
            <ExtraLabel>사용 가능 포인트</ExtraLabel> 
            <ExtraText><strong>60,000P</strong></ExtraText>
          </ExtraWrapper>
          <StyledHr />
          <ExtraWrapper>
            <ExtraLabel>무이자 할부</ExtraLabel> 
            <ExtraText>카드사 별 할부 혜택 안내</ExtraText>
          </ExtraWrapper>
          <ExtraWrapper>
            <ExtraLabel>배송비</ExtraLabel> 
            <ExtraText>
              해당 브랜드 제품으로 500,000P 이상 구매시 무료배송 <br />
              (미만시 배송비 3000원) <br /> 제주도를 포함한 도서/산간 지역은 추가배송비 2000원
            </ExtraText>
          </ExtraWrapper>
          <ExtraWrapper>
            <ExtraLabel>배송예정</ExtraLabel> 
            <ExtraText>1일 이내 출고 (주말/공휴일 제외)</ExtraText>
          </ExtraWrapper>
        </MoreInfo>
        <ButtonWrapper>
          <Button backgroundColor="#D0D0D0">장바구니</Button>
          <Button backgroundColor="#023047" onClick={showPointsAlert}>구매하기</Button>
        </ButtonWrapper>
      </ProductDetails>
    </DetailContainer>
  );
};

export default ProductDetail;
