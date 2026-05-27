import SideNavigation from "@/components/layout/SideNavigation";
import TopNavigation from "@/components/layout/TopNavigation";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-base-200 h-screen flex flex-col">
            <TopNavigation />
            <div className="flex-1 flex flex-row overflow-auto p-1 gap-1">
                <SideNavigation />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}