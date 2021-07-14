import {Menu} from "antd";
import Link from "next/link";

export default function SideBarItem({menuItem, setBreadcrumbs}) {
    return menuItem.subMenus.length > 0 ? (
        <Menu.SubMenu
            title={menuItem.title}
            icon={<i className={menuItem.icon}></i>}
        >
            {
                menuItem.subMenus.map(subMenu => {
                    return <Menu.Item
                        key={subMenu.href}
                        onClick={() => setBreadcrumbs([menuItem.title, subMenu.title])}
                        icon={<i className={subMenu.icon}></i>}
                    >
                        <Link href={subMenu.href}>
                            <a>{subMenu.title}</a>
                        </Link>
                    </Menu.Item>
                })
            }
        </Menu.SubMenu>
    ) : (
        <Menu.Item
            title={menuItem.title}
            onClick={() => setBreadcrumbs([menuItem.title])}
            icon={<i className={menuItem.icon}></i>}
        >
            <Link href={menuItem.href}>
                <a>{menuItem.title}</a>
            </Link>
        </Menu.Item>

    )
}