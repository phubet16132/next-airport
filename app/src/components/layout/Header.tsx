import Link from 'next/link';
import { Plane } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <div className="text-sky-500">
          <Plane className="w-8 h-8 md:w-10 md:h-10 transform -rotate-45" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-xl md:text-2xl leading-none text-brand-dark">Qoomlee</span>
          <span className="text-sky-500 text-xs md:text-sm leading-none font-medium">Airline</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-slate-600 hover:text-sky-500 font-medium transition-colors">Home</Link>
        <Link href="/flights" className="text-slate-600 hover:text-sky-500 font-medium transition-colors">Flights</Link>
        <Link href="/checkin" className="text-sky-500 font-medium border-b-2 border-sky-500 pb-1">Check-in</Link>
        <Link href="/manage" className="text-slate-600 hover:text-sky-500 font-medium transition-colors">Manage Booking</Link>
        <Link href="/contact" className="text-slate-600 hover:text-sky-500 font-medium transition-colors">Contact</Link>
      </nav>

      {/* Mobile Profile Icon */}
      <div className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border border-sky-100 text-sky-600 font-bold">
        P
      </div>
    </header>
  );
}
