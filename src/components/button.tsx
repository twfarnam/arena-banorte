import styled from 'styled-components'

export default styled.button<{ $isLoading?: boolean }>`
  font-family: inherit;
  font-size: 1.2rem;
  line-height: 1;
  color: inherit;
  cursor: pointer;
  user-select: none;
  padding: 18px 20px;
  line-height: 1;
  background: linear-gradient(180deg, #5F5291 0%, #312A4E 100%);
  border: 1px solid rgba(255, 255, 255, 0.19);
  border-radius: 8px;

  ${(props) =>
    !props.$isLoading
      ? ''
      : `
        position: relative;
        pointer-events: none;
        color: transparent;
      
        & img {
          visibility: hidden;
        }

        &:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          border: 3px solid rgba(0,0,0,0.5);
          border-top-color: white;
          padding: 8px;
          border-radius: 100%;
          animation: button-loading infinite 0.6s linear;
        }

        @keyframes button-loading {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}
`
