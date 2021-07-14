import {menuItems} from "./config";
import {Layout, Menu} from 'antd';
const {Sider} = Layout;

import SideBarItem from "./SideBarItem";

export default function SideBar({collapsed, setBreadcrumbs}) {
    return (
        <Sider collapsible collapsed={collapsed} trigger={null}>
            {/*<Logo className="logo">SPORES </Logo>*/}
            <Menu theme="dark" defaultSelectedKeys={menuItems[0].title} mode="inline">
                {menuItems.map(menuItem => {
                    return <SideBarItem menuItem={menuItem} setBreadcrumbs={setBreadcrumbs} key={menuItem.title}/>
                })}

            </Menu>
        </Sider>
    )
}