import {menuItems} from "./config";
import {Layout, Menu} from 'antd';
import styled from "styled-components";

const {SubMenu} = Menu;
const {Sider} = Layout;
import Link from "next/link"
import {UserAddOutlined} from "@ant-design/icons";

// const Logo = styled.div`
//   height: 60px;
//   color: #fff;
//   line-height: 60px;
//   padding-left: 10px;
//   font-size: 26px;
// `
export default function SideBar({collapsed, setBreadcrumbs}) {

    return (
        <Sider collapsible collapsed={collapsed} trigger={null}>
            {/*<Logo className="logo">SPORES </Logo>*/}
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {menuItems.map(menuItem => {
                    return menuItem.subMenus.length > 0 ? (
                        <SubMenu key={menuItem.href} title={menuItem.title} icon={menuItem.getIcon()}>
                            {
                                menuItem.subMenus.map(subMenu => {
                                    return <Menu.Item key={subMenu.title}
                                                      onClick={() => setBreadcrumbs([menuItem.title, subMenu.title])}
                                    >
                                        <Link href={subMenu.href}>
                                            <a>{subMenu.title}</a>
                                        </Link>
                                    </Menu.Item>
                                })
                            }
                        </SubMenu>
                    ) : (
                        <Menu.Item title={menuItem.title} key={menuItem.href}
                                   onClick={() => setBreadcrumbs([menuItem.title])} icon={menuItem.getIcon()}>
                            <Link href={menuItem.href}>
                                <a>{menuItem.title}</a>
                            </Link>
                        </Menu.Item>

                    )
                })}

            </Menu>
        </Sider>
    )
}