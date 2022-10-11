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
  overflow: scroll;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    text-align: center;
  }
`

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
`

const Table = styled.table`
  font-size: 1.3em;
  margin: 0 auto;
  margin-top: 100px;

  td {
    padding: 5px 10px;
  }
`

// connectFunctionsEmulator(getFunctions(), "localhost", 5001);
export default function Admin(): React.ReactElement | null {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasPermission, setHasPermission] = React.useState(false)
  const [body, setBody] = React.useState('')
  const [error, setError] = React.useState('')
  const [result, setResult] = React.useState('')
  const [scores, setScores] = React.useState<{}[]>()

  React.useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (!user) return
      const admin = await getDoc(doc(getFirestore(), "admins", user.uid))
      setHasPermission(admin.exists())
      try {
        const result = await httpsCallable(getFunctions(), 'leaderBoard')()
        // @ts-ignore
        setScores(result.data)
      } catch (error) {
        console.log(error)
      }
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
      const result = await httpsCallable(getFunctions(), 'broadcast')({ body })
      // @ts-ignore
      setResult(result.data.numberOfUsersMessaged)
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
      { !scores
        ? <Table as="div">Loading...</Table>
        : <Table>
            <thead>
              <tr>
                <td>User</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Score</td>
              </tr>
            </thead>
            <tbody>
              { scores.map((u: any) => 
                <tr key={u.name}>
                  <td>{u.name}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td>{u.score.toLocaleString()}</td>
                </tr>)
              }
            </tbody>
          </Table>
        }
    </AdminBase>
  )
}

