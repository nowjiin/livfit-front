import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import BrandGroup from "@components/store/BrandGroup";
import BackButton from "@components/store/BackButton";
import BrandLogo from "@components/store/BrandLogo";

import storeMain from '@images/store/storemain.png';

const StoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  padding-bottom: 70px;
`;

const HeroShot = styled.div`
  position: relative;
  width: 100%;
  & .mainImage {
    width: 100%;
    height: auto;
    cursor: pointer; /* 포인터 커서를 추가하여 클릭 가능성을 시각적으로 표시 */
  }
`;

const Store = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleImageClick = () => {
    navigate('/store/goalstudio-heartball-graphic-tee');
  };

  return (
    <StoreContainer>
      <HeroShot>
        <BackButton />
        <img
          className='mainImage'
          src={storeMain}
          alt="Store Main"
          onClick={handleImageClick}
        />
      </HeroShot>
      <BrandLogo selectedBrand={selectedBrand} onBrandClick={handleBrandClick} />
      <BrandGroup selectedBrand={selectedBrand} />
    </StoreContainer>
  );
};

export default Store;
