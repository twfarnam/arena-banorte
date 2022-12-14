import React from 'react'
import styled from 'styled-components'
import triviaData, { TriviaQuestion, TriviaSet } from '../trivia_data'
import { collection, addDoc, getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// @ts-ignore
import questionMarks from '../assets/question-marks.png?webp'
import { getOpenTriviaIndex } from './menu'
import ExitButton from './exit_button'
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

const StyledStarryBox = styled(StarryBox)`
  --top-font-size: 2.2em;
  max-width: 20rem;
`

const Score = styled.div`
  font-size: 1.6em;
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
  margin-bottom: 50px;

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
  onPoints: (points: number) => void
  onReturn: () => void
}

export default function Trivia({ onPoints, onReturn }: TriviaProps): React.ReactElement  {
  const triviaDataIndex = getOpenTriviaIndex()
  if (triviaDataIndex == -1) throw new Error()
  const triviaSet = triviaData[triviaDataIndex]
  const [questionIndex, setQuestionIndex] = React.useState<number>()
  const [answers, setAnswers] = React.useState<number[]>([])
  const [startedAt, setStartedAt] = React.useState<number>()
  const [endedAt, setEndedAt] = React.useState<number>()

  function onClickStart() {
    setQuestionIndex(0)
    setStartedAt(Date.now())
  }

  function onClickResponse(index: number) {
    return async () => {
      const allAnswers = [...answers, index]
      setAnswers(allAnswers)
      if (typeof questionIndex != 'undefined' && questionIndex < 1) {
        setQuestionIndex(questionIndex + 1)
      } else {
        setEndedAt(Date.now())
        const triviaCompleted = 'triviaCompleted' in localStorage
          ? JSON.parse(localStorage.triviaCompleted)
          : []
        triviaCompleted.push(triviaDataIndex)
        localStorage.triviaCompleted = JSON.stringify(triviaCompleted)
        try {
          const score = calculateScore(triviaSet, allAnswers, Date.now() - startedAt!)
          onPoints(score)
          await addDoc(collection(getFirestore(), 'triviaScores'), {
            score,
            triviaSet: triviaDataIndex,
            uid: getAuth().currentUser?.uid,
            createdAt: serverTimestamp(),
          })
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  }

  if (endedAt) {
    const points = calculateScore(triviaSet, answers, endedAt - startedAt!).toLocaleString()
    return (
      <TriviaBase>
        <LeftIcon src={questionMarks} />
        <RightIcon src={questionMarks} />
        <StyledStarryBox
          top="Obtuviste:"
          left={<Score>{points} puntos</Score>}
          right="Mientras m??s juegues, m??s posibilidades tienes de ganar."
        />
        <ExitButton onReturn={onReturn} />
      </TriviaBase>
    )
  } else if (typeof questionIndex == 'undefined') {
    return (
      <TriviaBase>
        <LeftIcon src={questionMarks} />
        <RightIcon src={questionMarks} />
        <StyledStarryBox
          top={`Trivia no. ${triviaDataIndex + 1}`}
          left="Con cada trivia contestada correctamente podr??s acumular hasta 1,000 puntos"
          right="Entre m??s r??pido contestes correctamente, ??mayor cantidad de puntos!"
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
        <Question>{ triviaSet.questions[questionIndex].prompt }</Question>
        { triviaSet.questions[questionIndex].responses.map((r, i) =>
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
  [10999, 500],
  [20999, 450],
  [30999, 400],
  [60999, 350],
  [fiveYears, 250],
]
function calculateScore(triviaSet: TriviaSet, answers: number[], duration: number) {
  return triviaSet.questions.reduce((score: number, question: TriviaQuestion, index: number) => {
    if (question.answer == answers[index]) {
      return (
        score +
        (scoringMatrix.find(([millisecond]) => duration <= millisecond)?.[1] || 0)
      )
    } else {
      return score
    }
  }, 0)
}
