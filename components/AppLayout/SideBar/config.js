import {DashboardOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";

export const menuItems = [
    {
        title: "Dashboard",
        href: "/",
        icon: "bx bx-category-alt",
        subMenus: [],
    },
    {
        title: "NFT Items",
        href: "/nft-items",
        icon: "bx bx-package",
        subMenus: [
            {
                title: "List Items",
                href: "/nft-items",
                icon: "bx bx-list-ul",
                subMenus: [],
            },

            {
                title: "Create Item",
                href: "/nft-items/create",
                icon: "bx bx-add-to-queue",
                subMenus: [],
            }
        ]
    },
]