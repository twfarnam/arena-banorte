import React from 'react'
import styled from 'styled-components'
import triviaData, { TriviaQuestion, TriviaSet } from '../trivia_data'
import isEqual from 'lodash/isEqual'
import { collection, addDoc, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// @ts-ignore
import questionMarks from '../assets/question-marks.png?webp'
import Button from './button'
import StarryBox from './starry_box'


const TriviaBase = styled.div`
  min-height: 60vh;
  background: rgba(0, 0, 0, 0.87);
  border: 5px solid #5F5290;
  border-radius: 20px;
  padding: 25% 20px 0;
  margin: 30px;
  position: relative;
  text-align: center;
`

const LeftIcon = styled.img`
  width: 40%;
  position: absolute;
  top: -11%;
  right: -10%;
`

const RightIcon = styled(LeftIcon)`
  right: initial;
  left: -10%;
  transform: scaleY(-1);
`

const ExitButton = styled.div`
  margin: 200px 0 20px;
  font-size: 1.8rem;
  text-decoration: underline;
  cursor: pointer;
`

const Score = styled.div`
  font-size: 2.2em;
`

const Question = styled.div`
  font-size: 1.8rem;
  position: relative;
  padding: 40px 10px 20px;
  background: radial-gradient(
    26.21% 132.15% at 51.49% -11.88%,
    #1B0EB2 0%,
    #090014 100%
  );
  border: 1px solid;
  border-image: linear-gradient(
    353.04deg,
    #000E2B -5.58%,
    #050D2E 11.33%,
    #150B37 31.87%,
    #2F0947 56.02%,
    #54055C 81.39%,
    #820178 107.96%,
    #900080 115.21%
  );
  border-image-slice: 1;

  &::before {
    content: '?';
    display: block;
    position: absolute;
    top: -15px;
    left: calc(50% - 30px);
    padding: 5px 30px;
    background: radial-gradient(
      26.21% 132.15% at 51.49% -11.88%,
      #1B0EB2 0%,
      #090014 100%
    );
  }
`

const Response = styled.div`
  font-size: 1.5rem;
  padding: 20px;
  margin: 10px;
  background: radial-gradient(
    113.96% 451.27% at 113.3% 126.34%,
    #8400CA 0%,
    #3677FF 100%
  );
  cursor: pointer;
`

interface TriviaProps {
  onReturn: () => void
}

export default function Trivia({ onReturn }: TriviaProps): React.ReactElement  {
  const triviaSetIndex = 0
  const questionSet = triviaData[triviaSetIndex]
  const [question, setQuestion] = React.useState<number>()
  const [answers, setAnswers] = React.useState<number[]>([])
  const [startedAt, setStartedAt] = React.useState<number>()
  const [endedAt, setEndedAt] = React.useState<number>()

  function onClickStart() {
    setQuestion(0)
    setStartedAt(Date.now())
  }

  function onClickResponse(index: number) {
    return async () => {
      const allAnswers = [...answers, index]
      setAnswers(allAnswers)
      if (typeof question != 'undefined' && question < 1) {
        setQuestion(question + 1)
      } else {
        setEndedAt(Date.now())
        try {
          await addDoc(collection(getFirestore(), 'triviaScores'), {
            score: calculateScore(questionSet, allAnswers, Date.now() - startedAt!),
            uid: getAuth().currentUser?.uid,
          })
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }

  if (endedAt) {
    const points = calculateScore(questionSet, answers, endedAt - startedAt!).toLocaleString()
    return (
      <TriviaBase>
        <LeftIcon src={questionMarks} />
        <RightIcon src={questionMarks} />
        <StarryBox
          top="Obtuviste:"
          left={<Score>{points} puntos</Score>}
          right="Mientras más juegues, más posibilidades tienes"
        />
        <ExitButton onClick={onReturn}>Salir</ExitButton>
      </TriviaBase>
    )
  } else if (typeof question == 'undefined') {
    return (
      <TriviaBase>
        <LeftIcon src={questionMarks} />
        <RightIcon src={questionMarks} />
        <StarryBox
          top={`Trivia no. ${triviaSetIndex + 1}`}
          left="Mientras más preguntas acertadas contestes, generas más puntos"
          right="Contesta lo más rápido posible, esto también te genera más puntos"
        />
        <Button onClick={onClickStart}>
          Comenzar a jugar
        </Button>
      </TriviaBase>
    )
  } else {
    return (
      <TriviaBase>
        <LeftIcon src={questionMarks} />
        <RightIcon src={questionMarks} />
        <Question>{ questionSet.questions[question].prompt }</Question>
        { questionSet.questions[question].responses.map((r, i) =>
            <Response key={r} onClick={onClickResponse(i)} >{r}</Response>
          )
        }
      </TriviaBase>
    )
  }
}

// Sistema de puntajes para trivias:
// 1 a 10 segundos: 1000 
// 11 a 20 segundos: 900
// 21 a 30 segundos: 800
// 31 a 60 segundos: 700
// 61 en adelante: 500 
const fiveYears = 5 * 365 * 24 * 60 * 60 * 1000
const scoringMatrix = [
  [10999, 1000],
  [20999, 900],
  [30999, 800],
  [60999, 700],
  [fiveYears, 500],
]
function calculateScore(questionSet: TriviaSet, answers: number[], duration: number) {
  const correct = isEqual(
    questionSet.questions.map((q: TriviaQuestion) => q.answer),
    answers,
  )
  if (!correct) return 0
  const rewardIndex = scoringMatrix.findIndex(([millisecond]) => duration <= millisecond)
  return scoringMatrix[rewardIndex][1]
}
