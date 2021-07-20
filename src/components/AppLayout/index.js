import {Breadcrumb, Layout} from "antd";
import {useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Head from "next/head";
import TopNav from "./TopNav";

const {Content, Footer} = Layout;


const LayoutStyled = styled(Layout)`
  min-height: 100vh;
`

const ContentStyled = styled(Content)`
  margin: 10px 16px;
  padding: 24px;
  //background: #fff;
`
const BreadCrumbStyled = styled(Breadcrumb)`
  margin: 16px 0;
  font-family: Roboto,sans-serif;
  font-weight: 600;
  font-size: 18px;
`
const ChildrenWrapper = styled.div`
  background: #fff;
  min-height: 420px;
  padding: 24px;
`
const BREAK_POINT = 992;
export default function AppLayout({children}) {
    const [windowWidth, setWindowWidth] = useState(0)
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const handleResize = e => {
        setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])
    return (
        <>
            <Head>
                <title>Spores</title>
                <link rel="icon" href="/images/logo-mark.png"/>
            </Head>
            <LayoutStyled>
                <SideBar collapsed={windowWidth < BREAK_POINT} setBreadcrumbs={setBreadcrumbs}/>
                <Layout>
                    <TopNav/>
                    <ContentStyled>
                        <BreadCrumbStyled>
                            {breadcrumbs && breadcrumbs.map(item => {
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
        </>
    )
}