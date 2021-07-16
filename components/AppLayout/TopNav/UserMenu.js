import {Menu} from "antd";
import Link from "next/link"
import {userMenu} from "./TopNavMenuItem";
import styled from "styled-components";
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
export default function UserMenu() {
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

        </StyledMenu>
    )
}