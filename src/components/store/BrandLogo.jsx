import React from 'react';
import styled from 'styled-components';

import AllLogo from '@images/store/logo/all.svg';
import LivfitLogo from '@images/store/logo/livfit.svg'; 
import NikeLogo from '@images/store/logo/nike.svg'; 
import AdidasLogo from '@images/store/logo/adidas.svg';
import GoalstudioLogo from '@images/store/logo/goalstudio.svg';
import UnderarmourLogo from '@images/store/logo/underarmour.svg';


const LogoContainer = styled.div`
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  margin-top: 10px;
  padding: 0px 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  & > div {
    flex: 0 0 auto;
    margin: 10px;
  }
`;

const LogoDiv = styled.div`
  width: 60px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 20px;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ isSelected }) => (isSelected ? '#FB8500' : '#D8E3E8')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 5px;
`;

const LogoImage = styled.img`
  width: auto;
  height: 60%;
`;

const BrandName = styled.div`
  font-size: 12px;
  text-align: center;
  color: #949494;
`;

const BrandLogo = ({ selectedBrand, onBrandClick }) => {
  const brands = [
    { logo: AllLogo, brandName: '전체', key: 'all' },
    { logo: LivfitLogo, brandName: '자체제작', key: 'livfit' },
    { logo: NikeLogo, brandName: '나이키', key: 'nike' },
    { logo: AdidasLogo, brandName: '아디다스', key: 'adidas' },
    { logo: GoalstudioLogo, brandName: '골스튜디오', key: 'goalstudio' },
    { logo: UnderarmourLogo, brandName: '언더아머', key: 'underarmour' },
  ];

  return (
    <LogoContainer>
      {brands.map(brand => (
        <LogoDiv key={brand.key}>
          <Logo onClick={() => onBrandClick(brand.key)} isSelected={selectedBrand === brand.key}>
            <LogoImage src={brand.logo} alt="Brand Logo" />
          </Logo>
          <BrandName>{brand.brandName}</BrandName>
        </LogoDiv>
      ))}
    </LogoContainer>
  );
};

export default BrandLogo;
