import styled from "styled-components"

const Wrapper = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  background-color: var(--main-bg);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.5s ease 0s;
  margin-bottom: 30px;

  &::before {
    content: "";
    width: 100%;
    padding-top: 100%;
    border-radius: 50%;
    background-image: linear-gradient(to top right, #349eff, #62B4FFFF);
    position: absolute;
    left: -50%;
    top: 0;
    transform: scale(0);
    transition: transform 0.8s ease 0s;
  }
  
  &:hover::before {
    transform: scale(3);
  }
  
  &.active::before {
    transform: scale(3);
  }
  
  &.active {
   color: #fff; 
  }
  
  &:hover {
    color: #fff;
  }

`
const StatusCardIcon = styled.div`
  width: 30%;
  height: 100%;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
const StatusCardInfo = styled.div`
  flex-grow: 1;
  text-align: center;
  z-index: 1;
  text-transform: capitalize;

  > h4 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: inherit;
  }

  > span {
    font-family: Roboto, sans-serif;
    font-size: 16px;
  }
`
export default function StatusCard({icon, count, title}) {
    return (
        <Wrapper>
            <StatusCardIcon>
                <i className={icon}/>
            </StatusCardIcon>
            <StatusCardInfo>
                <h4>{count}</h4>
                <span>{title}</span>
            </StatusCardInfo>
        </Wrapper>
    )
}