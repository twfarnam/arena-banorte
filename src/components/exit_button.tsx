import styled from 'styled-components'

const ExitButtonBase = styled.div`
  margin: 200px 0 20px;
  font-size: 1.8rem;
  text-decoration: underline;
  cursor: pointer;
`

interface ExitButtonProps {
  className?: string
  onReturn: () => void
}

export default function ExitButton({ className, onReturn }: ExitButtonProps) {
  return (
    <ExitButtonBase
      className={className}
      onClick={onReturn}>
      Salir
    </ExitButtonBase>
  )
}
