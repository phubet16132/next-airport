'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import BottomNav from './BottomNav';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    // Pages in the check-in flow beyond the initial page don't show the main header/footer
    const isFlowPage = pathname?.includes('/select-pax') ||
        pathname?.includes('/pax-info') ||
        pathname?.includes('/dangerous-goods') ||
        pathname?.includes('/boarding-pass');

    return (
        <>
            {!isFlowPage && <Header />}
            <main className={!isFlowPage ? "pb-20 md:pb-0" : ""}>
                {children}
            </main>
            {!isFlowPage && <BottomNav />}
        </>
    );
}
