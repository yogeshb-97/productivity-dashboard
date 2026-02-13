import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Archive, Settings, Activity, Inbox as InboxIcon } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: InboxIcon, label: 'Inbox', path: '/inbox' },
        { icon: CheckSquare, label: 'Projects', path: '/projects' },
        { icon: Activity, label: 'Habits', path: '/habits' },
        { icon: Archive, label: 'Archive', path: '/archive' },
    ];

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[var(--bg-panel)] border-r border-[var(--border-subtle)] flex flex-col justify-between z-50">
            <div>
                <div className="p-6 mb-2">
                    <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">P</span>
                        </div>
                        ProdSpace
                    </h1>
                </div>

                <nav className="px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${isActive
                                    ? 'bg-[var(--bg-hover)] text-white'
                                    : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)]'
                                }`
                            }
                        >
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-[var(--border-subtle)]">
                <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-hover)] transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
