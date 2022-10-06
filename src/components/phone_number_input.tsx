import React from 'react'
import styled from 'styled-components'
import welcome from '../assets/welcome.png'
import Button from './button'
import Error from './error'
import { savePhoneNumber } from '../api'

const PhoneNumberInputBase = styled.form`
  margin: 20px auto 10px;
  text-align: center;
  width: 80%;
`

const Welcome = styled.img`
  display: block;
  width: 50%;
  margin: 0 auto;
`

const Label = styled.label`
  display: block;
  width: 80%;
  margin: 10px auto;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Input = styled.input`
  display: block;
  width: 100%;
  font-family: inherit;
  background: #FFFFFF;
  border: 3px solid #5F5291;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-right: 10px;
`

interface PhoneNumberInputProps {
  className?: string
  onSubmit: () => void
}

export default function PhoneNumberInput({ onSubmit, className }: PhoneNumberInputProps): React.ReactElement  {
  const [phone, setPhone] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  function onChange(event) {
    setPhone(event.target.value)
  }

  async function onSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    try {
      let cleanPhone = phone.replace(/[^+0-9]/g, '')
      if (!cleanPhone.startsWith('+')) cleanPhone = '+52' + cleanPhone
      await savePhoneNumber(cleanPhone)
      onSubmit()
    } catch (error: any) {
      setIsLoading(false)
      setError(error.message || 'Ocurrió un error')
    }
  }

  return (
    <PhoneNumberInputBase className={className} onSubmit={onSubmitForm}>
      { error && <Error>{error}</Error>}
      <Welcome src={welcome} />
      <Label>
        Introduce tu número telefónico para 
        <br />
        mantenerte al tanto de la competencia y acceder a ella
      </Label>
      <Row>
        <Input value={phone} onChange={onChange} placeholder="55-5555-5555" />
        <Button $isLoading={isLoading}>Enviar</Button>
      </Row>
    </PhoneNumberInputBase>
  )
}
