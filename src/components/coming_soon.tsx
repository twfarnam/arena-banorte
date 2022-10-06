import React from 'react'
import styled from 'styled-components'

const ComingSoonBase = styled.div`

`

interface ComingSoonProps {
  //
}

export default function ComingSoon(props: ComingSoonProps): React.ReactElement  {
  console.log('wtf')

  return (
    <ComingSoonBase>
      <h1>¡Todo listo!</h1>
      <p>
        Muy pronto recibirás notificaciones en donde te diremos cómo y cuándo
        participar por los premios que tenemos para ti
      </p>
    </ComingSoonBase>
  )
}

