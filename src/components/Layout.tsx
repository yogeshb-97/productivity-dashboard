import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans antialiased">
            <Sidebar />
            {/* Main Content - Docked next to sidebar, no overlap */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                <div className="max-w-6xl mx-auto space-y-8 pb-12">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
