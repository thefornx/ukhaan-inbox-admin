import { Box, House, List, Settings, ShoppingCart, Store, Tag, Users } from "lucide-react";

export const menuItems = [
    {
        name: "Home",
        href: "/",
        icon: <House className="w-5 h-5" />,
        tooltip: "Home"
    },
    {
        name: "Store",
        href: "/store",
        icon: <Store className="w-5 h-5" />,
        tooltip: "Manage store",
        children: [
            {
                name: "Settings",
                href: "/store",
                icon: <Settings className="w-4 h-4" />
            },
            {
                name: "Branches",
                href: "/store/branches",
                icon: <Store className="w-4 h-4" />
            },
            {
                name: "Brands",
                href: "/store/brands",
                icon: <Tag className="w-4 h-4" />
            }
        ]
    },
    {
        name: "Product",
        href: "/product",
        icon: <Box className="w-5 h-5" />,
        tooltip: "Manage product",
        children: [
            {
                name: "Products",
                href: "/product",
                icon: <Box className="w-4 h-4" />
            },
            {
                name: "Categories",
                href: "/product/categories",
                icon: <List className="w-4 h-4" />
            },
        ]
    },
    {
        name: "Order",
        href: "/order",
        icon: <ShoppingCart className="w-5 h-5" />,
        tooltip: "Manage order",
        children: [
            {
                name: "Orders",
                href: "/order",
                icon: <ShoppingCart className="w-4 h-4" />
            },
            {
                name: "Returns",
                href: "/order/returns",
                icon: <ShoppingCart className="w-4 h-4" />
            },
        ]
    },
    {
        name: "User",
        href: "/user",
        icon: <Users className="w-5 h-5" />,
        tooltip: "Manage user"
    }
];