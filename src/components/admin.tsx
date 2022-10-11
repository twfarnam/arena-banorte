import React from 'react'
import styled from 'styled-components'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
// @ts-ignore
import background from '../assets/background.png?w=1600&webp'
import Button from './button'
import Error from './error'

const AdminBase = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-image: url("${background}");
  background-size: 100%;
`

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
`

export default function Admin(): React.ReactElement | null {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasPermission, setHasPermission] = React.useState(false)
  const [body, setBody] = React.useState('')
  const [error, setError] = React.useState('')
  const [result, setResult] = React.useState('')

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return
      const admin = await getDoc(doc(getFirestore(), "admins", user.uid))
      setHasPermission(admin.exists())
    })
  }, [])

  async function onClickSend() {
    if (!body) return
    const confirmOnce = confirm('You will send a text message to all registered users. Are you sure?')
    if (!confirmOnce) return
    const confirmTwice = confirm(`Your message will say "${body}". Are you sure?`)
    if (!confirmTwice) return
    setIsLoading(true)
    try {
      // connectFunctionsEmulator(getFunctions(), "localhost", 5001);
      const result = await httpsCallable(getFunctions(), 'broadcast')({ body })
      // @ts-ignore
      setResult(result.data.numberOfUsersMessaged)
      console.log('result', result.data.numberOfUsersMessaged)

      setBody('')
    } catch (error: any) {
      console.log(error)
      setError(error.message)
    }
    setIsLoading(false)
  }

  if (!hasPermission) return null
  return (
    <AdminBase>
      <h1>Admin</h1>
      { error && <Error>{error}</Error> }
      <Textarea
        placeholder="Broadcast SMS message"
        value={body}
        onChange={event => setBody(event.target.value)}
      />
      <Button
        $isLoading={isLoading}
        onClick={onClickSend}>
        Broadcast SMS
      </Button>
      { result && <h1>Sent {result} messages</h1> }
    </AdminBase>
  )
}

