import styled from 'styled-components'

export default styled.input<{ $hasError?: boolean, $hasValue?: boolean }>`
  display: block;
  width: 100%;
  font-family: inherit;
  font-size: 1.2rem;
  line-height: 1;
  padding: 16px 18px;
  background: #FFFFFF;
  border: 3px solid #5F5291;
  box-shadow: inset 0px 4px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin: 0 auto 20px;
  text-align: center;
  appearance: none;

  &:disabled {
    opacity: 0.2;
  }

  &::placeholder {
    color: #999;
  }

  ${props => typeof props.$hasValue != 'undefined' && !props.$hasValue ? `color: #999;` : ''}
  ${props => props.$hasError ? `border-color: ${props.theme.errorColor};` : ''}
`
