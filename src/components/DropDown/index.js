import {Dropdown} from "antd";
import styled from "styled-components"
const ButtonStyled = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  position: relative;
  cursor: pointer;
`
const DropdownToggleBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -1px;
  right: -3px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: #d68102;
  color: #fff;
  font-size: 0.8rem;
`
const DropDownIcon = styled.i`
  font-size: 2.5rem;
  color: #111;
  padding-top: 10px;
`
export default function DropDown({menu, icon, badge, customToggle}) {
    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <ButtonStyled onClick={e => e.preventDefault()}>
                {
                    icon ? <DropDownIcon className={icon}/> : ''
                }
                {
                    badge ? <DropdownToggleBadge>{badge}</DropdownToggleBadge> : ''
                }
                {
                    customToggle ? customToggle() : ''
                }
            </ButtonStyled>
        </Dropdown>
    )
}