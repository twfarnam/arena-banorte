import React from 'react'
import styled from 'styled-components'
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  updateProfile,
  updateEmail,
} from 'firebase/auth'
// @ts-ignore
import welcome from '../assets/welcome.png?w=720&webp'
// @ts-ignore
import welcome2x from '../assets/welcome.png?w=1440&webp'
import Button from './button'
import Error from './error'
import Input from './input'
import useForceUpdate from '../hooks/use_force_update'

const RegistrationFormBase = styled.form`
  text-align: center;
  width: 80%;
  margin: 20px auto 10px;
`

const Welcome = styled.img`
  display: block;
  width: 90%;
  margin: 0 auto 20px;
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
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

interface RegistrationFormProps {
  onSubmit: () => void
}

export default function RegistrationForm({ onSubmit }: RegistrationFormProps): React.ReactElement  {
  const [phone, setPhone] = React.useState('')
  const [phoneError, setPhoneError] = React.useState('')
  const [verificationCode, setVerificationCode] = React.useState('')
  const [verificationCodeError, setVerificationCodeError] = React.useState('')
  const [name, setName] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [verifier, setVerifier] = React.useState<RecaptchaVerifier>()
  const [confirmationResult, setConfirmationResult] = React.useState<ConfirmationResult>()
  const [verificationSentTime, setVerificationSentTime] = React.useState<number>()
  const recaptchaRef = React.useRef<HTMLDivElement>(null)
  const forceUpdate = useForceUpdate()

  React.useEffect(() => {
    if (!recaptchaRef.current) return
    const auth = getAuth();
    auth.languageCode = 'es';
    setVerifier(
      new RecaptchaVerifier(
        recaptchaRef.current,
        { 'size': 'invisible' },
        auth,
      ),
    )
  }, [recaptchaRef.current])

  function onSubmitPhoneForm(event: React.FormEvent) {
    event.preventDefault()
    sendCode()
  }

  async function onClickResendCode() {
    if (!recaptchaRef.current?.children.length) {
      setVerifier(
        new RecaptchaVerifier(
          recaptchaRef.current!,
          { 'size': 'invisible' },
          getAuth(),
        ),
      )
    }
    setTimeout(() => sendCode())
  }

  async function sendCode() {
    setIsLoading(true)
    setError('')
    setPhoneError('')
    let cleanPhone = phone.replace(/[^+0-9]/g, '')
    if (!cleanPhone.startsWith('+')) cleanPhone = '+52' + cleanPhone
    try {
      if (!recaptchaRef.current?.children.length) {
        await verifier!.verify()
      }
    } catch (error: any) {
      console.log('error', error)
      setError(error.message || 'Ocurrió un error')
    }
    try {
      const auth = getAuth()
      setConfirmationResult(
        await signInWithPhoneNumber(auth, cleanPhone, verifier!)
      )
      setVerificationSentTime(Date.now())
    } catch (error) {
      console.log('phone error', error)
      setPhoneError('Número inválido')
    }
    setIsLoading(false)
  }

  async function onSubmitRegistrationForm(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError('')
    setEmailError('')
    setNameError('')
    const auth = getAuth()
    if (!auth.currentUser) {
      setVerificationCodeError('Código invalido')
      setIsLoading(false)
      return 
    }
    if (!email) {
      setEmailError('Correo electrónico inválido')
      setIsLoading(false)
      return 
    }
    try {
      await updateEmail(auth.currentUser!, email)
    } catch (error: any) {
      console.log('email error', error)
      setEmailError('Correo electrónico inválido')
      setIsLoading(false)
      return
    }
    try {
      await updateProfile(auth.currentUser!, { displayName: name })
    } catch (error: any) {
      console.log('name error', error)
      setNameError('Nombre inválido')
      setIsLoading(false)
      return
    }
    onSubmit()
  }

  function onChangePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setPhone(event.target.value)
    setPhoneError('')
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

  if (!confirmationResult) {
    return (
      <RegistrationFormBase onSubmit={onSubmitPhoneForm}>
        <Welcome srcSet={`${welcome} 1x, ${welcome2x} 2x`} />
        { error && <Error>{error}</Error>}
        <Label>
          Introduce tu número telefónico para mantenerte al tanto de la
          competencia y acceder a ella
        </Label>
        <Row>
          <Input
            autoFocus
            value={phone}
            onChange={onChangePhoneNumber}
            inputMode="tel"
            placeholder="55-5555-5555"
            autoComplete="tel"
            $hasError={!!phoneError}
          />
          <div ref={recaptchaRef}></div>
          <Button $isLoading={isLoading}>Enviar</Button>
        </Row>
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
        { timeRemaining >= 1000
          ? <ResendCode>Volver a enviar código en {Math.floor(timeRemaining/1000)}...</ResendCode>
          : <ResendCode onClick={onClickResendCode}>Volver a enviar código</ResendCode>
        }
        <Label>E introduzcas tu nombre y tu correo:</Label>
        <Input 
          autoFocus={isVerified}
          placeholder="Escribe aquí tu nombre" 
          autoComplete="name"
          value={name}
          onChange={event => setName(event.target.value)}
          $hasError={!!nameError}
        />
        { nameError && <Error>{nameError}</Error>}
        <Input
          placeholder="Escribe aquí tu correo electrónico"
          value={email}
          autoComplete="email"
          inputMode="email"
          onChange={event => setEmail(event.target.value)}
          $hasError={!!emailError}
        />
        { emailError && <Error>{emailError}</Error>}
        <Button $isLoading={isLoading}>Completar registro</Button>
        <div ref={recaptchaRef}></div>
      </RegistrationFormBase>
    )
  }
}
