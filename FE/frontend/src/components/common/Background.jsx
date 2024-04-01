import styled from 'styled-components'

const Background = styled.div`
  background: url(${(props) => props.backgroundimage}) center center / cover
    fixed no-repeat;
  width: 100%;
  height: 63vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Background
