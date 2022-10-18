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
// @ts-ignore
import watch from '../assets/watch.jpeg?webp'
// @ts-ignore
import tv from '../assets/tv.jpeg?webp'
// @ts-ignore
import car from '../assets/car.png?webp'

const PrizesBase = styled.div`
  text-align: center;
`

const Icon = styled.div`
  margin-top: 20px;
  margin: 0 auto;
  cursor: pointer;
`

const IconCircle = styled.div`
  width: 40%;
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
  overscroll-behavior: contain;
`

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 50px;
  cursor: pointer;
`

const Car = styled.img`
  display: block;
  width: 80%;
  margin: 0 auto;
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

const Winner = styled.p`
  font-size: 0.8rem;
`

const prizes: { name: string, image: string, winners: string[] }[] = [
  {
    name: 'Consola PlayStation 5 825gb',
    image: playstation,
    winners: ['Francisco Javier Ramírez barrera, HAF IMPULSO'],
  },
  {
    name: 'Apple Watch Series 8',
    image: watch,
    winners: ['Leonardo Antelmo Ramos Ochoa, GUVEJAQ'],
  },
  {
    name: 'Pantalla LG Smart TV 50"',
    image: tv,
    winners: [
      'Edgar enrique reyna medran, HB CREDITS',
      'Javier Fernando ham cruz, PRIBSA CONSULTORES HIPOTECARIOS',
    ],
  },
  {
    name: 'Consola Xbox Series S 512gb',
    image: xbox,
    winners: [
      'Eduardo Ramírez, R P BROKER',
    ],
  },
  {
    name: 'Cafetera Nespresso Essenza Mini',
    image: espreso,
    winners: [
      'Anabella arteaga ortiz	HAF IMPULSO',
    ],
  },
  {
    name: 'Certificados Amazon $1,000',
    image: giftcard,
    winners: [
      'Jaqueline Gutiérrez venegas, GUVEJAQ',
      'Alejandro reynaldo Santa Cruz polanco de pool, ALEJANDRO SANTA CRUZ',
      'Juan Humberto Rodriguez Flores, CREDITO INTELIGENTE',
      'Oscar Gallardo Moreno, INVERFIN',
      'Iván Gutiérrez Espinosa, GUVEJAQ',
      'Sandra Elizabeth Munguia galvez, BUSQUETS',
      'Ali Gallardo, INVERFIN',
      'Carlos Alberto Pinales hernandez, CARLOS ALBERTO PINALES HERNANDEZ',
      'Antonio Guadalupe Sicairos, 1080 CONSULTORES',
      'Geovana karla Robledo vazquez, PRO MG CONSULTORES FINANCIEROS',
      'Frank De Hoyos freymann, CASA HIPOTECARIA',
      'Kevin alejandro Núñez torres, 1080 CONSULTORES',
      'Mayela Guerrero Camacho, INVERFIN',
      'Jorge Ivan Pizano Marquez, PIMAR',
      'ALBERTO MIGUEL GUZMAN, NEXUM',
    ],
  },
  {
    name: 'Audífonos Sony inalámbricos',
    image: headphones,
    winners: [
      'Manuel alejandro aleman chuc, CASA HIPOTECARIA',
      'Joaquin Alexis Candelario Madueño Ortiz, 1080 CONSULTORES',
      'Hiriam lot alquicira vazquez, HIRLOT',
      'Andrés Díaz Pizarro Graf, GRAF CONSULTORES',
      'Julio cesar castro, CAFH MEXICO',
    ],
  },
  {
    name: 'Minibalón al rihla 2022',
    image: minibalon,
    winners: [
      'Judith Ayala Villarreal, MONSO',
      'Héctor Garavito obregon, MULTISERVICIOS FINANCIEROS BAJIO',
      'Jesús Eduardo Lomelí chong, 1080 CONSULTORES',
      'Mario Moreno Lopez, SOC ESMERALDA ASESORES HIPOTECARIOS',
      'ALLEN CANTU HUERTA, HB CREDITS',
      'Edgar Esquivel, MONSO',
      'Arturo enrique rivera, SAN ROBERTO',
      'Rosalia Piña Rodriguez, R P BROKER',
      'Magdalena Abigail Chavez Contreras, ARF SERVICIOS EMPRESARIALES',
      'María de los angeles Hernandez Lopez, CAFH MEXICO',
    ],
  },
  {
    name: 'Maleta adidas banorte',
    image: maleta,
    winners: [
      'Belinda Liliana Cruz Lozano, HOMEBROKERS',
      'Yenisey Patricia Mares Alvarez, PIMAR',
      'Frank Orlando Palacios Luna, PRO MG CONSULTORES FINANCIEROS',
      'Gabriela villanueva zamora, MULTISERVICIOS FINANCIEROS BAJIO',
      'RUBÉN DARÍO DELGADO HERNANDEZ, DE LA CIMA BROKERS',
    ],
  },
  {
    name: 'Vaso térmico rojo',
    image: cup,
    winners: [
      'Cinthya García Lannoy, BUSQUETS',
      'Karina soto ruiz, INVERFIN',
      'Anahi Cemiramis Trejo Noguez, PRO MG CONSULTORES FINANCIEROS',
      'Jesica Acevedo Serrano, AS BRO´KERS',
      'Gerardo Gonzalez, SAN ROBERTO',
      'Araceli Villeda García, HOUSE GLOBAL ASESORES HIPOTECARIOS',
      'Ramón Adrian Lopez Gomez, CREDITO INTELIGENTE',
      'Marco Antonio Robledo santizo, ACREDIA',
      'Gustavo Solis Ledezma, MONSO',
      'Isabel Cristina Mendoza Garcia, HOMEBROKERS',
      'Samuel Villeda García, HOUSE GLOBAL ASESORES HIPOTECARIOS',
      'Gustavo Acevedo, AS BRO´KERS',
      'Diego Alexandro Macias Chavez, ARF SERVICIOS EMPRESARIALES',
      'Edwin Amaya García, CAFH MEXICO',
      'Edher Arturo Acuña Valle, INVERFIN',
      'Abraham Emmanuel Rojas Rosales, HB CREDITS',
      'Víctor Adrián rangel de la Rosa, SHIPCREDI',
      'Blanca Esthela Bermea Guajardo, SAN ROBERTO',
      'Weyler Andres Diaz escalante, ACM',
      'Ricardo enriquez berumen, CAFH MEXICO',
      'María Concepción Alonso avila, CAFH MEXICO',
      'Claudia Vidaurri, VIDAGO',
      'Yesika marlene Gutiérrez Rodríguez, YESIKA GUTIERREZ',
      'Kassandra Anahí Delgado Gómez, INVERFIN',
      'Cynthia Deyanira garcia herrera, HB CREDITS',
      'Hugo cesar gonzalez, CREDITO INTELIGENTE',
      'SONIA ARACELI MARTINEZ CADENA, HAF IMPULSO',
      'Vero Amaya, ACREDIA',
      'Adrian Lopez Limon, GRUPO CAFEH',
    ],
  },
]

export default function WinnersModal(): React.ReactElement  {
  const closeRef = React.useRef<HTMLDivElement>(null)
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

  function onClickShowModal() {
    setShowModal(true)
    setTimeout(() => closeRef.current?.scrollIntoView())
  }

  return (
    <PrizesBase>
      <Icon onClick={onClickShowModal}>
        <IconCircle>
          <Animation ref={iconAnimationRef} />
        </IconCircle>
        <Title>Ganadores</Title>
      </Icon>
      { showModal &&
        <Modal>
          <Close ref={closeRef} onClick={() => setShowModal(false)}>&times;</Close>
          <h1>Se ganó los siguientes premios:</h1>
          <Car src={car} />
          Camioneta Honda HRV HONDA 2023
          <br/>
          Puntos Arena Banorte + Rifa 
          <Winner>Irma del Pilar Martínez Cornejo,	GPLATINO</Winner>
          <PrizeContainer>
            { prizes.map(prizes => (
              <Prize>
                <Circle>
                  <Image src={prizes.image} />
                </Circle>
                {prizes.name}
                {prizes.winners.map(w => <Winner>{w}</Winner>)}
              </Prize>))
            }
          </PrizeContainer>
        </Modal>
      }
    </PrizesBase>
  )
}

