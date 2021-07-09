import {Breadcrumb, Layout, Menu} from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from "@ant-design/icons";
import {useState} from "react";
import styled from "styled-components";
import SideBar from "./SideBar";

const {Header, Content, Footer} = Layout;


const LayoutStyled = styled(Layout)`
  min-height: 100vh;
`
const HeaderLayout = styled(Header)`
  padding: 0;
  background: #fff;
`
const ToggleCollapseMenuButton = styled.div`
  padding: 0 24px;
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
  width: fit-content;
`
const ContentStyled = styled(Content)`
  margin: 24px 16px;
  padding: 24px;
  //background: #fff;
`
const BreadCrumbStyled = styled(Breadcrumb)`
  margin: 16px 0;
`
const ChildrenWrapper = styled.div`
  background: #fff;
  min-height: 420px;
  padding: 24px;
`
export default function AppLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <LayoutStyled>
            <SideBar collapsed={collapsed} setBreadcrumbs={setBreadcrumbs}/>
            <Layout>
                <HeaderLayout>
                    <ToggleCollapseMenuButton onClick={toggleCollapse}>
                        {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    </ToggleCollapseMenuButton>
                </HeaderLayout>
                <ContentStyled>
                    <BreadCrumbStyled>
                        {breadcrumbs.map(item => {
                            return (

                                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>

                            )
                        })}
                    </BreadCrumbStyled>
                    <ChildrenWrapper>
                        {children}
                    </ChildrenWrapper>
                </ContentStyled>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>

        </LayoutStyled>
    )
}