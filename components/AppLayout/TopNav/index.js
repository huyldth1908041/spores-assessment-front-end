import styled from "styled-components";
import {Header} from "antd/lib/layout/layout";
import DropDown from "../../DropDown";
import {Menu} from "antd";
import UserToggle from "./UserToggle";
import UserMenu from "./UserMenu";
import ThemeButton from "../../ThemeButton";

const HeaderLayout = styled(Header)`
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 110px;
`
const SearchBox = styled.div`
  position: relative;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 15px;
  overflow: hidden;
`
const SearchInput = styled.input`
  font-family: Roboto, sans-serif;
  height: 100%;
  width: 100%;
  padding: 10px 60px 10px 20px;
  font-size: 1rem;
  border-radius: 15px;
  color: #111;
  background-color: #fff;
  border: none;
  outline: none;
  &:focus {
    border: 1px solid #d68102;
  }
`
const SearchIcon = styled.i`
  font-size: 1.5rem;
  position: absolute;
  right: 20px;
  cursor: pointer;
`
const TopNavRight = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
`
const TopNavRightItem = styled.div`
  margin-left: 30px;
`

export default function TopNav() {
    const currentUser = {name: "Luu Huy", avatar: "/images/logo-mark.png"}
    return (
        <HeaderLayout>
            <SearchBox>
                <SearchInput type="text" placeholder="Search here"/>
                <SearchIcon className="bx bx-search"/>
            </SearchBox>
            <TopNavRight>
                <TopNavRightItem>
                    <DropDown
                        menu={<UserMenu/>}
                        customToggle={() => <UserToggle user={currentUser}/>}/>
                </TopNavRightItem>
                <TopNavRightItem>
                    <ThemeButton/>
                </TopNavRightItem>
            </TopNavRight>
        </HeaderLayout>
    )
}