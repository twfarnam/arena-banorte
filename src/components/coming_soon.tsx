import React from 'react'
import styled from 'styled-components'

const ComingSoonBase = styled.div`
  text-align: center;
  width: 80%;
  margin: 20px auto;
`

const Notification = styled.p`
  font-size: 20px;
`

export default function ComingSoon(): React.ReactElement  {
  return (
    <ComingSoonBase>
      <h1>¡Todo listo!</h1>
      <Notification>
        Muy pronto recibirás notificaciones en donde te diremos cómo y cuándo
        participar por los premios que tenemos para ti
      </Notification>
    </ComingSoonBase>
  )
}

