import { Outlet, NavLink, useParams } from "react-router";
import { LayoutDashboard, Globe } from "lucide-react";

export default function AppLayout() {
    const { projectId } = useParams();

    return (
        <div className="min-h-[100svh] flex bg-[#F8FAFC]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="h-16 px-6 flex items-center border-b font-semibold">
                    Төсөл #{projectId}
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    <SidebarLink to="" icon={<LayoutDashboard size={18} />}>
                        Хянах самбар
                    </SidebarLink>

                    <SidebarLink to="builder" icon={<Globe size={18} />}>
                        Бүтээх
                    </SidebarLink>

                    <SidebarLink to="preview" icon={<Globe size={18} />}>
                        Урьдчилж харах
                    </SidebarLink>
                </nav>
            </aside>

            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="h-16 bg-white border-b flex items-center justify-between px-6">
                    <span className="font-semibold">landing.mn</span>
                    <button className="text-sm text-[#64748B]">Гарах</button>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

function SidebarLink({
                         to,
                         icon,
                         children,
                     }: {
    to: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <NavLink
            end={to === ""}
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
        ${
                    isActive
                        ? "bg-blue-50 text-[#2563EB] font-medium"
                        : "text-[#64748B] hover:bg-gray-100"
                }`
            }
        >
            {icon}
            {children}
        </NavLink>
    );
}
