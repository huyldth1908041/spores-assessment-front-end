import styled from "styled-components";
import {Header} from "antd/lib/layout/layout";
import DropDown from "../../DropDown";
import {Menu} from "antd";
import UserToggle from "./UserToggle";
import UserMenu from "./UserMenu";
import ThemeButton from "../../ThemeButton";
import SearchBar from "../../SearchBar";

const HeaderLayout = styled(Header)`
  background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 110px;
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
            <SearchBar placeholderText="Search here..." onSearch={(query) => console.log(query)}/>
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