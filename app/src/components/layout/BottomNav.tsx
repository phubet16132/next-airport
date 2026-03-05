'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Plane, CheckCircle, Briefcase, Navigation } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex items-center justify-around py-2 px-1 z-50 pb-safe">
            <Link href="/" className={`flex flex-col items-center space-y-1 ${pathname === '/' ? 'text-sky-500' : 'text-slate-500'}`}>
                <Home className="w-6 h-6" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/flights" className={`flex flex-col items-center space-y-1 ${pathname.startsWith('/flights') ? 'text-sky-500' : 'text-slate-500'}`}>
                <Plane className="w-6 h-6 transform -rotate-45" />
                <span className="text-[10px] font-medium">Flights</span>
            </Link>
            <Link href="/checkin" className={`flex flex-col items-center space-y-1 ${pathname.startsWith('/checkin') ? 'text-sky-500' : 'text-slate-500'}`}>
                <CheckCircle className="w-6 h-6" />
                <span className="text-[10px] font-medium">Check-in</span>
            </Link>
            <Link href="/manage" className={`flex flex-col items-center space-y-1 ${pathname.startsWith('/manage') ? 'text-sky-500' : 'text-slate-500'}`}>
                <Briefcase className="w-6 h-6" />
                <span className="text-[10px] font-medium">Manage Booking</span>
            </Link>
            <Link href="/contact" className={`flex flex-col items-center space-y-1 ${pathname.startsWith('/contact') ? 'text-sky-500' : 'text-slate-500'}`}>
                <Navigation className="w-6 h-6 transform rotate-45" />
                <span className="text-[10px] font-medium">Contact</span>
            </Link>
        </nav>
    );
}
