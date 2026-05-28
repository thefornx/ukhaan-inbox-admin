import { Box, Boxes, Crown, House, List, MessageCircleMore, Settings, ShoppingCart, Store, Tag, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";

export type MenuChild = {
    nameKey: string;
    href: string;
    icon: ReactNode;
};

export type MenuItem = {
    nameKey: string;
    tooltipKey: string;
    href: string;
    icon: ReactNode;
    children?: MenuChild[];
};

export const menuItems: MenuItem[] = [
    {
        nameKey: "nav.home",
        tooltipKey: "nav.homeTooltip",
        href: "/",
        icon: <House className="w-5 h-5" strokeWidth={1.5} />,
    },
    {
        nameKey: "nav.store",
        tooltipKey: "nav.storeTooltip",
        href: "/store",
        icon: <Store className="w-5 h-5" strokeWidth={1.5} />,
        children: [
            {
                nameKey: "nav.settings",
                href: "/store",
                icon: <Settings className="w-4 h-4" />,
            },
            {
                nameKey: "nav.subscription",
                href: "/store/subscription",
                icon: <Crown className="w-4 h-4" />,
            },
            {
                nameKey: "nav.branches",
                href: "/store/branches",
                icon: <Store className="w-4 h-4" />,
            },
            {
                nameKey: "nav.brands",
                href: "/store/brands",
                icon: <Tag className="w-4 h-4" />,
            },
        ],
    },
    {
        nameKey: "nav.product",
        tooltipKey: "nav.productTooltip",
        href: "/product",
        icon: <Box className="w-5 h-5" strokeWidth={1.5} />,
        children: [
            {
                nameKey: "nav.products",
                href: "/product",
                icon: <Box className="w-4 h-4" />,
            },
            {
                nameKey: "nav.categories",
                href: "/product/categories",
                icon: <List className="w-4 h-4" />,
            },
            {
                nameKey: "nav.collections",
                href: "/product/collections",
                icon: <Boxes className="w-4 h-4" />,
            },
        ],
    },
    {
        nameKey: "nav.order",
        tooltipKey: "nav.orderTooltip",
        href: "/order",
        icon: <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />,
        children: [
            {
                nameKey: "nav.orders",
                href: "/order",
                icon: <ShoppingCart className="w-4 h-4" />,
            },
            {
                nameKey: "nav.payments",
                href: "/order/payments",
                icon: <Wallet className="w-4 h-4" />,
            },
        ],
    },
    {
        nameKey: "nav.user",
        tooltipKey: "nav.userTooltip",
        href: "/user",
        icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
        children: [
            {
                nameKey: "nav.users",
                href: "/user",
                icon: <Users className="w-4 h-4" />,
            },
            {
                nameKey: "nav.chats",
                href: "/user/chats",
                icon: <MessageCircleMore className="w-4 h-4" />,
            },
        ],
    },
];
