import {menuItems} from "./config";
import {Layout, Menu} from 'antd';
const {Sider} = Layout;
import styled from "styled-components";
import Logo from "./Logo";
import Link from "next/link";

const StyledSider = styled(Sider)`
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

const StyledIcon = styled.i`
  font-size: 1.7rem !important;
  margin-right: 10px;
  color: #455560;
`
const StyledMenuItem = styled(Menu.Item)`
  font-family: roboto, sans-serif;
  padding-left: 24px !important;
  font-weight: 600;
  border-radius: 15px;
  width: 90% !important;
  margin: 0 auto;
  font-size: 16px;

  &.ant-menu-item-selected {
    background-image: linear-gradient(to right, #349eff, #62b4ff);

    a, i {
      color: #fff !important;
    }

    :after {
      border-right: 0;
    }
  }
`
const StyledSubMenu = styled(Menu.SubMenu)`
  font-family: roboto, sans-serif;
  font-weight: 600;
  width: 90% !important;
  margin: 0 auto;
  border-radius: 15px;
  font-size: 16px;
  color: #111 !important;
  &.ant-menu-submenu-vertical {
    padding-right: 10px;
  }
`


export default function SideBar({collapsed, setBreadcrumbs}) {
    return (
        <StyledSider collapsible collapsed={collapsed} trigger={null} width={300}>
            <Logo collapsed={collapsed} />
            <Menu theme="light" defaultSelectedKeys={menuItems[0].title} mode="inline">
                {menuItems.map((menuItem) => {
                    return menuItem.subMenus.length > 0 ? (
                        <StyledSubMenu
                            key={menuItem.title}
                            title={menuItem.title}
                            icon={<StyledIcon className={menuItem.icon}/>}
                        >
                            {
                                menuItem.subMenus.map(subMenu => {
                                    return <StyledMenuItem
                                        key={subMenu.href}
                                        onClick={() => setBreadcrumbs([menuItem.title, subMenu.title])}
                                        icon={<StyledIcon className={subMenu.icon}/>}
                                    >
                                        <Link href={subMenu.href}>
                                            <a>{subMenu.title}</a>
                                        </Link>
                                    </StyledMenuItem>
                                })
                            }
                        </StyledSubMenu>
                    ) : (
                        <StyledMenuItem
                            key={menuItem.title}
                            title={menuItem.title}
                            onClick={() => setBreadcrumbs([menuItem.title])}
                            icon={<StyledIcon className={menuItem.icon}/>}
                        >
                            <Link href={menuItem.href}>
                                <a>{menuItem.title}</a>
                            </Link>
                        </StyledMenuItem>
                    )
                })}

            </Menu>
        </StyledSider>
    )
}