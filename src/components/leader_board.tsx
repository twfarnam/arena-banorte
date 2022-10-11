import React from 'react'
import styled from 'styled-components'
import ExitButton from './exit_button'
import Error from './error'

const LeaderBoardBase = styled.div`
  text-align: center;
`

const Table = styled.table`
  font-size: 1.3em;
  margin: 0 auto;

  td {
    padding: 5px 10px;
  }
`

interface LeaderBoardProps {
  onReturn: () => void
}

export default function LeaderBoard({ onReturn }: LeaderBoardProps): React.ReactElement  {
  const [data, setData] = React.useState<{name: string, score: number}[]>()
  const [error, setError] = React.useState('')
  
  React.useEffect(() => {
    // const request = fetch('http://localhost:5001/arena-banorte/us-central1/leaderBoard')
    const request = fetch('https://us-central1-arena-banorte.cloudfunctions.net/leaderBoard')
    request
      .then(r => r.json())
      .then(d => setData(d))
      .catch(error => {
        console.log(error)
        setError(error.message)
      })
  }, [])

  return (
    <LeaderBoardBase>
      <h1>Tabla de posiciones</h1>
      { error && <Error>{error}</Error> }
      { data 
        ? <Table>
          <thead>
            <tr>
              <td>Usuario</td>
              <td>Puntos</td>
            </tr>
          </thead>
          <tbody>
            { data.map(d => 
              <tr key={d.name}>
                <td>{d.name}</td>
                <td>{d.score.toLocaleString()}</td>
              </tr>)
            }
          </tbody>
        </Table>
        : <div>Cargando....</div>
      }
      <ExitButton onReturn={onReturn} />
    </LeaderBoardBase>
  )
}

