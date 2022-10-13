import React from 'react'
import styled from 'styled-components'
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore'
import {
  getAuth,
  updateProfile,
} from 'firebase/auth'
import officeList from '../office_list'
import Button from './button'
import Error from './error'
import PrizesModal from './prizes_modal'
import Input from './input'
import StarryBox from './starry_box'
import useForceUpdate from '../hooks/use_force_update'

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const RegistrationFormBase = styled.form`
  text-align: center;
  width: 80%;
  margin: 20px auto 10px;
`

const StyledStarryBox = styled(StarryBox)`
  --top-font-size: 1.2em;
`

const TermsLink = styled.div`
  margin: 40px 0;
  font-size: 1.2em;
  cusror: pointer;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin-bottom: 30px;
`

const Label = styled.label`
  display: block;
  width: 80%;
  margin: 10px auto;
`

const ResendCode = styled.p`
  text-decoration: underline;
  opacity: 0.5;
  cursor: pointer;
`

const SelectContainer = styled.div`
  position: relative;
`

const SelectButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  aspect-ratio: 1;
  pointer-events: none;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-20%, -50%);
    border: 10px solid transparent;
    border-left-color: currentColor;
  }
`

interface RegistrationFormProps {
  onShowTerms: () => void
  onSubmit: () => void
}

export default function RegistrationForm({ onShowTerms, onSubmit }: RegistrationFormProps): React.ReactElement  {
  const [phone, setPhone] = React.useState('')
  const [phoneError, setPhoneError] = React.useState('')
  const [name, setName] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [office, setOffice] = React.useState<string>('')
  const [officeError, setOfficeError] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  async function onSubmitRegistrationForm(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setEmailError('')
    setNameError('')
    let valid = true
    const formattedPhone = formatPhoneNumber(phone)
    if (formattedPhone.startsWith('+52') && formattedPhone.length != 13) {
      setPhoneError('Teléfono invalido')
      valid = false
    } else if (formattedPhone.length < 10) {
      setPhoneError('Teléfono invalido')
      valid = false
    }
    if (!emailRegex.test(email)) {
      setEmailError('Correo electrónico inválido')
      valid = false
    }
    if (name.length < 3) {
      setNameError('Nombre inválido')
      valid = false
    }
    if (!office) {
      setOfficeError('Seleciona tu oficina')
      valid = false
    }
    if (!valid) {
      setIsLoading(false)
      return 
    }
    try {
      await setDoc(doc(getFirestore(), 'users', getAuth().currentUser!.uid), {
        email,
        name,
        office,
        phone: formattedPhone,
        createdAt: serverTimestamp(),
      })
      onSubmit()
    } catch (error: any) {
      console.log('db error', error)
      setError(error.message)
      setIsLoading(false)
      return
    }
  }

  return (
    <RegistrationFormBase onSubmit={onSubmitRegistrationForm}>
      <h1>¡Bienvenido a Arena Banorte!</h1>
      { error && <Error>{error}</Error>}
      <Label>
        Introduce tus datos para completar tu registro y mantenerte
        al tanto de las dinámicas.
      </Label>
      <PrizesModal />
      <TermsLink onClick={onShowTerms}>Consulta Términos y Condiciones</TermsLink>
      <Input
        autoFocus
        value={phone}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhone(event.target.value);
          setPhoneError('')
        }}
        inputMode="tel"
        placeholder="Escribe aquí tu número celular" 
        autoComplete="tel"
        $hasError={!!phoneError}
      />
      { phoneError && <Error>{phoneError}</Error>}
      <Input 
        placeholder="Escribe aquí tu nombre completo" 
        autoComplete="name"
        value={name}
        onChange={event => { setName(event.target.value); setNameError('') }}
        $hasError={!!nameError}
      />
      { nameError && <Error>{nameError}</Error>}
      <Input
        placeholder="Escribe aquí tu correo electrónico"
        value={email}
        autoComplete="email"
        inputMode="email"
        onChange={event => { setEmail(event.target.value); setEmailError('') }}
        $hasError={!!emailError}
      />
      { emailError && <Error>{emailError}</Error>}
      <SelectContainer>
        <Input
          $hasError={!!officeError}
          $hasValue={!!office}
          as="select"
          value={office}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => { setOffice(event.target.value); setOfficeError('') }}>
          <option value="" disabled>Oficina a la que perteneces</option>
          { officeList.map(office => <option key={office}>{office}</option>) }
        </Input>
        <SelectButton />
      </SelectContainer>
      { officeError && <Error>{officeError}</Error>}
      <Button $isLoading={isLoading}>Completar registro</Button>
    </RegistrationFormBase>
  )
}

function formatPhoneNumber(phone: string) {
  phone = phone.replace(/[^+0-9]/g, '')
  if (!phone.startsWith('+')) phone = '+52' + phone
  return phone
}

