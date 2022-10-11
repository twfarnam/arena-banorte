import React from 'react'
import lottie from 'lottie-web'
import styled from 'styled-components'
// @ts-ignore
import espreso from '../assets/espreso.png?webp'
// @ts-ignore
import headphones from '../assets/headphones.png?webp'
// @ts-ignore
import minibalon from '../assets/minibalon.png?webp'
// @ts-ignore
import cup from '../assets/cup.png?webp'
// @ts-ignore
import giftcard from '../assets/giftcard.png?webp'
// @ts-ignore
import maleta from '../assets/maleta.png?webp'
// @ts-ignore
import playstation from '../assets/playstation.png?webp'
// @ts-ignore
import xbox from '../assets/xbox.png?webp'

const PrizesBase = styled.div`
  text-align: center;
`

const Icon = styled.div`
  margin-top: 20px;
  margin: 0 auto;
  cursor: pointer;
`

const IconCircle = styled.div`
  width: 20%;
  margin: 0 auto;
  aspect-ratio: 1;
  background: white;
  border-radius: 50%;
  border: 3px solid #5F5290;
  padding: 10px;
`

const Animation = styled.div``

const Title = styled.div`
  margin-top: 10px;
  font-size: 1.3em;
`

const Modal = styled.div`
  position: absolute;
  inset: 0;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
  padding: 60px 10px 30px;
`

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
`

const PrizeContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const Prize = styled.div`
  width: 40%;
  margin-bottom: 40px;
  font-size: 1.3rem;
`

const Circle = styled.div`
  background: white;
  border-radius: 50%;
  aspect-ratio: 1;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 5px solid #5F5290;
  margin-bottom: 20px;
`

const Image  = styled.img`
  width: 60%;
`

interface PrizesProps {
  onReturn: () => void
}

const prizes = {
  'Certificado de regalo': giftcard,
  'Cafetera nespresso essenza mini': espreso,
  'Audífonos sony inalámbricos': headphones,
  'Minibalón al rihla mundial fifa 2022': minibalon,
  'Xbox series s': xbox,
  'Playstation 5': playstation,
  'Vaso térmico rojo': cup,
  'Maleta adidas banorte': maleta,
}

export default function Prizes({ onReturn }: PrizesProps): React.ReactElement  {
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const iconAnimationRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!iconAnimationRef.current) return
    if (iconAnimationRef.current.children.length) return
    lottie.loadAnimation({
      container: iconAnimationRef.current,
      loop: true,
      autoplay: true,
      path: 'prizes.json',
    })
  }, [iconAnimationRef.current])

  return (
    <PrizesBase>
      <Icon onClick={() => setShowModal(true)}>
        <IconCircle>
          <Animation ref={iconAnimationRef} />
        </IconCircle>
        <Title>Premios</Title>
      </Icon>
      { showModal &&
        <Modal>
          <Close onClick={() => setShowModal(false)}>&times;</Close>
          <h1>Concursa por los siguientes premios:</h1>
          <PrizeContainer>
            { Object.keys(prizes).map(text => (
              <Prize>
                <Circle>
                  <Image src={prizes[text]} />
                </Circle>
                {text}
              </Prize>))
            }
          </PrizeContainer>
        </Modal>
      }
    </PrizesBase>
  )
}

