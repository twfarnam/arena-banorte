import React from 'react'
import ExitButton from './exit_button'
import styled from 'styled-components'

const TermsBase = styled.div`
  text-align: center;
  padding: 1rem;
`

interface TermsProps {
  onReturn: () => void
}

export default function Terms({ onReturn }: TermsProps): React.ReactElement  {
  return (
    <TermsBase>
      <h1>Términos y Condiciones</h1>
      <p>Blah Blah Legal Legal</p>
      <ExitButton onReturn={onReturn} />
    </TermsBase>
  )
}

