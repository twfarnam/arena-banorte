import React from 'react'
import styled from 'styled-components'
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
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

const StyledInput = styled(Input)`
  margin-right: 10px;
`

const StyledStarryBox = styled(StarryBox)`
  --top-font-size: 1.2em;
`

const TermsLink = styled.div`
  margin-bottom: 40px;
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
  const [verificationCode, setVerificationCode] = React.useState('')
  const [verificationCodeError, setVerificationCodeError] = React.useState('')
  const [name, setName] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [office, setOffice] = React.useState<string>('')
  const [officeError, setOfficeError] = React.useState<string>('')
  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult>()
  const [verificationSentTime, setVerificationSentTime] = React.useState<number>()
  const recaptchaRef = React.useRef<HTMLDivElement>(null)
  const forceUpdate = useForceUpdate()

  function onSubmitPhoneForm(event: React.FormEvent) {
    event.preventDefault()
    sendCode()
  }

  async function sendCode() {
    setIsLoading(true)
    setError('')
    setPhoneError('')
    if (recaptchaRef.current!.children.length) {
      const newElement = document.createElement('div')
      recaptchaRef.current!.replaceWith(newElement)
      // @ts-ignore
      recaptchaRef.current = newElement
    }
    const verifier = new RecaptchaVerifier(
      recaptchaRef.current!,
      { 'size': 'invisible' },
      getAuth(),
    )
    try {
      setConfirmationResult(
        await signInWithPhoneNumber(getAuth(), formatPhoneNumber(phone), verifier)
      )
      setVerificationSentTime(Date.now())
    } catch (error) {
      console.log('phone error', error)
      setPhoneError('Número inválido')
    }
    setIsLoading(false)
  }

  async function onChangeVerificationCode(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, '')
    setVerificationCode(value)
    setVerificationCodeError('')
    if (value.length != 6) return
    try {
      await confirmationResult!.confirm(value)
      setIsVerified(true)
    } catch (error: any) {
      console.log('verification code error', error)
      setVerificationCodeError('Código invalido')
    }
  }

  async function onSubmitRegistrationForm(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setEmailError('')
    setNameError('')
    let valid = true
    if (!getAuth().currentUser) {
      setVerificationCodeError('Código invalido')
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
        phone: formatPhoneNumber(phone),
        createdAt: serverTimestamp(),
      })
      await updateProfile(getAuth().currentUser!, { displayName: name })
      onSubmit()
    } catch (error: any) {
      console.log('db error', error)
      setError(error.message)
      setIsLoading(false)
      return
    }
  }

  if (!confirmationResult) {
    return (
      <RegistrationFormBase onSubmit={onSubmitPhoneForm}>
        <StyledStarryBox
          top="¡Bienvenido a Arena Banorte!"
          left="Muy pronto podrás jugar en este sitio"
          right="y ganar los premios que tenemos para ti"
        />
        { error && <Error>{error}</Error>}
        <Label>
          Introduce tu número celular para verificar tu registro y mantenerte
          al tanto de las dinámicas.
        </Label>
        <Row>
          <StyledInput
            autoFocus
            value={phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(event.target.value);
              setPhoneError('')
            }}
            inputMode="tel"
            placeholder="55-5555-5555"
            autoComplete="tel"
            $hasError={!!phoneError}
          />
          <div ref={recaptchaRef}></div>
          <Button $isLoading={isLoading}>Enviar</Button>
        </Row>
        <TermsLink onClick={onShowTerms}>Consulta Términos y Condiciones</TermsLink>
        <PrizesModal />
        { phoneError && <Error>{phoneError}</Error>}
      </RegistrationFormBase>
    )
  } else {
    const timeRemaining = 30000 - Date.now() + verificationSentTime!
    if (timeRemaining > 1) setTimeout(forceUpdate, 500)
    return (
      <RegistrationFormBase onSubmit={onSubmitRegistrationForm}>
        <h1>¡Gracias por tu registro!</h1>
        { error && <Error>{error}</Error>}
        <p>
          Para completarlo es necesario que introduzcas el código de 6 dígitos que
          te mandamos vía SMS
        </p>
        <Input
          placeholder="123456"
          disabled={isVerified}
          autoFocus={!isVerified}
          inputMode="numeric"
          value={verificationCode}
          onChange={onChangeVerificationCode}
          $hasError={!!verificationCodeError}
        />
        { verificationCodeError && <Error>{verificationCodeError}</Error>}
        { isVerified
          ? ''
          : timeRemaining >= 1000
          ? <ResendCode>Volver a enviar código en {Math.floor(timeRemaining/1000)}...</ResendCode>
          : <ResendCode onClick={sendCode}>Volver a enviar código</ResendCode>
        }
        <Label>E introduzcas tu nombre y tu correo:</Label>
        <Input 
          autoFocus={isVerified}
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
        <div ref={recaptchaRef}></div>
      </RegistrationFormBase>
    )
  }
}

function formatPhoneNumber(phone: string) {
  phone.replace(/[^+0-9]/g, '')
  if (!phone.startsWith('+')) phone = '+52' + phone
  return phone
}

