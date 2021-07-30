import {Menu} from "antd";
import Link from "next/link"
import {userMenu} from "./TopNavMenuItem";
import styled from "styled-components";
import useAuthApi from "../../../hooks/useAuthApi";
const IconStyled = styled.i`
  margin-right: 20px;
  font-size: 1.5rem !important;
`
const StyledLink = styled.a`
  font-size: 18px;
  font-family: Roboto, sans-serif;
`
const StyledMenu = styled(Menu)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px !important;
  display: block;
`
const LogoutButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  display: inline-block;
  font-size: 18px;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  &:hover {
    color: #0070f3;
  }
`
export default function UserMenu() {
    const {logout} = useAuthApi()
    return (
        <StyledMenu>
            {userMenu.map(item => {
                return (
                    <Menu.Item key={item.title} icon={<IconStyled className={item.icon}/>}>
                        <Link href={item.href}>
                            <StyledLink >{item.title}</StyledLink>
                        </Link>
                    </Menu.Item>
                )
            })}
            <Menu.Item key="logout" icon={<IconStyled className="bx bx-log-out-circle bx-rotate-180"/>}>
                <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
            </Menu.Item>
        </StyledMenu>
    )
}