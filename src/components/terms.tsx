import React from 'react'
import ExitButton from './exit_button'
import styled from 'styled-components'

const TermsBase = styled.div`
  padding: 1rem;

  ul {
    font-size: 18px
  }

  li {
    margin-bottom: 20px;
  }
`

const Heading = styled.h1`
  text-align: center;
`

const Table = styled.table`
  display: block;
  margin-left: 40px;
  margin-bottom: 20px;

  td {
    vertical-align: top;
  }
`

const StyledExitButton = styled(ExitButton)`
  margin-top: 50px;
  text-align: center;
`

interface TermsProps {
  onReturn: () => void
}

export default function Terms({ onReturn }: TermsProps): React.ReactElement  {
  return (
    <TermsBase>
      <Heading>Términos y Condiciones</Heading>
      <ul>
        <li>Aplican restricciones.</li>
        <li>Sólo podrán participar y ganar los Brókers asistan fisicamente a la Convención SOC 2022 del 12 al 14 de octubre de 2022 en el estado de Quintana Roo.</li>
        <li>Del 12 al 14 de octubre se realizarán 9 trivias con dos preguntas cada una. Se obtendrán los siguientes puntajes de acuerdo al tiempo de respuesta:</li>
        <Table>
          <tbody>
            <tr>
              <td>De 1 a 10 segundos en responder correctamente</td>
              <td>1,000 puntos</td>
            </tr>
            <tr>
              <td>De 11 a 20 segundos en responder correctamente</td>
              <td>900 puntos</td>
            </tr>
            <tr>
              <td>De 21 a 30 segundos en responder correctamente</td>
              <td>800 puntos</td>
            </tr>
            <tr>
              <td>De 31 a 60 segundos en responder correctamente</td>
              <td>700 puntos</td>
            </tr>
            <tr>
              <td>De 1 a 10 minutos en responder correctamente</td>
              <td>500 puntos</td>
            </tr>
          </tbody>
        </Table>
        <li>Cada participante tendrá un máximo de 10 minutos para contestar cada una de las trivias, después de ese tiempo se cerrará la trivia.</li>
        <li>Independientemente de las trivias, los participantes podrán seguir aculumando puntos a través del juego “pac man” disponible en la misma web app Arena Banorte. Por cada victoria se obtendrá 50 puntos. Esta dinámica estará disponible a partir de las 00:00 horas del miércoles 12 de octubre de 2022 a las 17:00 horas del viernes 14 de octubre de 2022.</li>
        <li>Los primeros 70 participantes que concluyan el juego de destreza y las trivias con el mayor puntaje obtendrán:</li>
        <Table>
          <tbody>
            <tr>
              <td>LUGAR</td>
              <td>REGALO</td>
            </tr>
            <tr>
              <td>1º</td>
              <td>Consola PlayStation 5 de 825 GB Edición Digital Horizon Forbidden West</td>
            </tr>
            <tr>
              <td>2º</td>
              <td>Apple Watch Series 8</td>
            </tr>
            <tr>
              <td>3º y 4º</td>
              <td>Pantalla LG LED Smart TV de 50 pulgadas 4K/UHD 50UQ9050PSC con WebOS</td>
            </tr>
            <tr>
              <td>5º</td>
              <td>Consola Xbox Series S de 512 GB SSD incluye Bocina Portable Philips</td>
            </tr>
            <tr>
              <td>6º</td>
              <td>Cafetera Nespresso Essenza Mini negra</td>
            </tr>
            <tr>
              <td>7º al 21º</td>
              <td>Certificado de Regalo Amazon de $1,000.00</td>
            </tr>
            <tr>
              <td>22º al 26º</td>
              <td>Audífonos Sony Inalámbricos WH-CH510</td>
            </tr>
            <tr>
              <td>27º al 36º</td>
              <td>Minibalón Al Rihla Mundial FIFA 2022</td>
            </tr>
            <tr>
              <td>37º al 41º</td>
              <td>Maleta Adidas Banorte</td>
            </tr>
            <tr>
              <td>42º al 70º</td>
              <td>Vaso térmico rojo Banorte</td>
            </tr>
          </tbody>
        </Table>
        <li>La rifa electrónica para obtener la nueva camioneta Honda HRV Sport 2023 (4 cilindros) se realizará con base en los siguientes criterios:</li>
        <ul>
          <li>Los puntos obtenidos en la app Arena banorte, con las trivias y juego de destreza, se convertirán en posibilidades para ganar, ya que cada 1,000 (mil) puntos equivalen a 1 boleto.</li>
          <li>La participación correcta en TODAS las trivias genera que los boletos cuenten al DOBLE. (Ejemplo: Si se otuvo 9,000 puntos al contestar correctamente todas las trivias, en automático tendrán 18,000 puntos, lo equivalente a 18 boletos para la rifa).</li>
          <li>Además, si eres Oficina Líper de participación con Banorte, tus boletos contarán al TRIPLE. (Ejemplo: Si un participante de Oficina Líder obtuvo 9,000 puntos, le corresponderían 9 boletos. Si además contestó correctamente las 9 trivias, tendría 18 boletos y estos se convertirán en convertirán en 54 boletos por su condición de líder).</li>
          <li>Se determina si es Oficina Líder por: 1) producción acumulada con Banorte al 5 de septiembre de 2022, basado en el último reporte compartido por SOC. 2) Se considera al TOP 15 de oficinas con mayor colocación con Banorte, con independencia del porcentaje de participación.</li>
          <li>Dicha rifa electrónica se realizará durante la noche Banorte el viernes 14 de octubre de 2022 en el Centro de Convenciones del Hotel Hilton Tulum.</li>
        </ul>
        <li>La fecha de entrega de la nueva camioneta dependerá de la disponibilidad de Honda México. En los días posteriores al evento indicaremos la documentación e información que se deberá presentar para realizar el trámite de entrega en la agencia Honda más cerca al domicilio.</li>
        <li>Los premios que no sean entregados en físico durante la noche Banorte, dentro de la convención SOC 2022, serán enviados a domicilio para no obstaculizar su traslado de Tulum a su destino final.</li>
        <li>Los premios no son bonificables en efectivo. Limitado a un premio por ganador.</li>
        <li>Banorte no asume la responsabilidad por cancelación o modificación del evento.</li>
        <li>Vigencia de la promoción del 10 de octubre al 14 de octubre de 2022.</li>
        <li>La premiación se llevará a cabo en el momento Banorte dentro de la convención SOC 2022 el viernes 14 de octubre.</li>
        <li>La lista de ganadores se publicará en la web app Arena Banorte a partir del 15 de octubre de 2022.</li>
        <li>Ningún colaborador de Grupo Financiero Banorte u otra entidad financiera puede participar en la dinámica ni obtener ningún regalo.</li>
        <li>Banorte se reserva el derecho de acortar, prorrogar, modificar o cancelar esta promoción, sin previo aviso.</li>
        <li>Banorte no será responsable de los casos de fuerza mayor que pudieran impedir al ganador el disfrute total o parcial de su premio.</li>
        <li>Banorte se excluye de cualquier responsabilidad por daños y perjuicios de toda naturaleza que puedan deberse a la falta temporal de disponibilidad o de continuidad del funcionamiento de la Web mediante el cual se participa en la promoción, a la defraudación de la utilidad que los usuarios hubieren podido atribuir al mismo y en particular, aunque no de modo exclusivo, a los fallos en el acceso a las distintas páginas y envíos de respuestas de participación a través de Internet.</li>
        </ul>
      <StyledExitButton onReturn={onReturn} />
    </TermsBase>
  )
}

