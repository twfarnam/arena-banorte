import styled from 'styled-components'

const ExitButtonBase = styled.div`
  margin: 200px 0 20px;
  font-size: 1.8rem;
  text-decoration: underline;
  cursor: pointer;
`

interface ExitButtonProps {
  onReturn: () => void
}

export default function ExitButton({ onReturn }: ExitButtonProps) {
  return <ExitButtonBase onClick={onReturn}>Salir</ExitButtonBase>
}
