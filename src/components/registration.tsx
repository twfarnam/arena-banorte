import React from 'react'
import Button from './button'
import styled from 'styled-components'

interface RegistrationProps {
  onSubmit: () => void
}

export default function Registration({ onSubmit }: RegistrationProps): React.ReactElement  {

  function onSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={onSubmitForm}>
      Registration
      <Button>Completar registro</Button>
    </form>
  )
}

