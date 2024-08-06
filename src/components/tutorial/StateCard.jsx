import React from 'react';
import styled from 'styled-components';

const StateContainer = styled.div`
  width: 200px;
  height 70px;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin: 10px 5px 10px 0px;
`;

const Text1 = styled.div`
  font-size: 10px;
  color: #ABABAB;
  margin-bottom: 5px;
`

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #353535
`

const Text2 = styled.span`
  font-size: 10px;
  color: #ABABAB
  `

const StateCard = ({ text1, title, text2 }) => {
  return (
    <StateContainer>
        <Text1>{text1}</Text1>
        <Title>{title}</Title>
        <Text2>{text2}</Text2>
    </StateContainer>
  );
};

export default StateCard;
