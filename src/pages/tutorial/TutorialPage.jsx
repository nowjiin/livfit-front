import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BackButton from '@components/tutorial/BackButton';

import header from "@images/tutorial/header.png";
import lunge from "@images/tutorial/lunge.png";
import pushup from "@images/tutorial/pushup.png";
import squat from "@images/tutorial/squat.png";

const TutorialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  font-size: 12px;
  padding-bottom: 90px;
`;

const TutorialHeader = styled.div`
  width: 100%;
  height: 9vh;
  position: relative;
  background-image: url(${header});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 20px;
  width: 100%;
`;

const ExerciseCard = styled.div`
  width: 90%;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  align-items: center;

  & .cardImage {
    width:100%;
  }
`;


export default function TutorialPage() {

    const exercises = [
        { image: squat, name: 'squat', path: '/tutorial/squat' },
        { image: lunge, name: 'lunge', path: '/tutorial/lunge' },
        { image: pushup, name: 'pushup', path: '/tutorial/pushup' }
    ];

    return (
      <TutorialContainer>
        <TutorialHeader>
          <BackButton/>
        </TutorialHeader>
        <ExerciseList>
            {exercises.map((exercise, index) => (
                <ExerciseCard key={index}>
                    <Link to={exercise.path}>
                        <img className='cardImage' src={exercise.image} alt={exercise.name} />
                    </Link>
                </ExerciseCard>
            ))}
        </ExerciseList>
      </TutorialContainer>
    );
}
