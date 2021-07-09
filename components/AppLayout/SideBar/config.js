import {DashboardOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/",
        getIcon: function () {
            return React.createElement(DashboardOutlined)
        },
        subMenus: [],
    },
    {
        title: "NFT Items",
        href: "/nft-items",
        getIcon: () => React.createElement(SmileOutlined),
        subMenus: [
            {
                title: "List Items",
                href: "/nft-items",
                subMenus: [],
            },

            {
                title: "Create Item",
                href: "/nft-items/create",
                subMenus: [],
            }
        ]
    },

]