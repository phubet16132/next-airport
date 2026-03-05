'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Clock, MapPin, CheckCircle, Briefcase, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { validateBooking } from '@/lib/mockApi';

export default function CheckinPage() {
    const router = useRouter();
    const [lastName, setLastName] = useState('');
    const [pnr, setPnr] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isFormValid = lastName.trim().length > 0 && pnr.trim().length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const isValid = await validateBooking(lastName, pnr);

        if (isValid) {
            router.push('/checkin/select-pax');
        } else {
            setError('No booking found for the provided details. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white py-12 md:py-20 px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Online Check-in</h1>
                <p className="text-xl md:text-2xl font-medium mb-2">Fly Smart. Fly Qoomlee.</p>
                <p className="text-sm md:text-base text-cyan-50 font-medium">Check in online and save time at the airport</p>
            </section>

            {/* Main Content Container */}
            <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* Left Column: Form & Info Cards */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">

                        {/* Retrieve Booking Card */}
                        <div className="card">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Retrieve Your Booking</h2>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start text-sm">
                                        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                                        <p>{error}</p>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder="Your last name"
                                        className={`input-field ${error ? 'border-red-300 focus:ring-red-400' : ''}`}
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                            setError(null);
                                        }}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="pnr" className="block text-sm font-semibold text-slate-700 mb-2">
                                        Booking reference (PNR)
                                    </label>
                                    <input
                                        type="text"
                                        id="pnr"
                                        placeholder="ABC123 OR 1234567890123"
                                        className={`input-field uppercase ${error ? 'border-red-300 focus:ring-red-400' : ''}`}
                                        value={pnr}
                                        onChange={(e) => {
                                            setPnr(e.target.value.toUpperCase());
                                            setError(null);
                                        }}
                                        disabled={isLoading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full flex justify-center items-center ${isFormValid && !isLoading ? "btn-primary" : "btn-disabled"}`}
                                    disabled={!isFormValid || isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        'Retrieve Booking'
                                    )}
                                </button>

                                <div className="bg-sky-50 border border-sky-100 rounded-lg p-4 mt-6">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-semibold text-sky-700">Tip:</span> Online check-in opens 24 hours before departure and closes 2 hours before departure.
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Bottom Cards: Flight Status & Baggage Rules (2 cols on desktop, stack on mobile) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Flight Status Card */}
                            <div className="card flex flex-col items-start h-full">
                                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 mb-4">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">Flight Status</h3>
                                <p className="text-slate-600 mb-6 flex-grow">
                                    Track your flight in real-time. Get updates on departure, arrival, gate changes, and delays.
                                </p>
                                <Link href="/flights/status" className="text-sky-600 font-semibold hover:text-sky-700 flex items-center">
                                    Check Status <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>

                            {/* Baggage Rules Card */}
                            <div className="card flex flex-col items-start h-full">
                                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center text-sky-600 mb-4">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-3">Baggage Rules</h3>
                                <p className="text-slate-600 mb-6 flex-grow">
                                    Economy: 1 carry-on (7kg) + checked (23kg).<br />
                                    Business: 2 carry-ons + 2 checked bags (32kg each).
                                </p>
                                <Link href="/baggage" className="text-sky-600 font-semibold hover:text-sky-700 flex items-center">
                                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>

                        </div>

                    </div>

                    {/* Right Column: Travel Tips (Sidebar on Desktop) */}
                    <div className="lg:col-span-1">
                        <div className="card h-full bg-slate-50/50 border-slate-200">
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Travel Tips</h2>
                            </div>

                            <div className="space-y-6">

                                {/* Tip 1 */}
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Arrive Early</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">Arrive 2-3 hours before international flights, 1-2 hours for domestic.</p>
                                    </div>
                                </div>

                                {/* Tip 2 */}
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Valid Documents</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">Ensure your passport is valid for 6 months beyond your travel dates.</p>
                                    </div>
                                </div>

                                {/* Tip 3 */}
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Mobile Boarding</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">Download your boarding pass to your phone for quick access.</p>
                                    </div>
                                </div>

                                {/* Tip 4 */}
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Pack Smart</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">Keep liquids in containers &le;100ml and place in a clear bag.</p>
                                    </div>
                                </div>

                                {/* Tip 5 */}
                                <div className="flex items-start space-x-4">
                                    <CheckCircle className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-slate-800 mb-1">Stay Informed</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">Check visa requirements and travel advisories for your destination.</p>
                                    </div>
                                </div>

                            </div>

                            {/* Support Banner */}
                            <div className="mt-8 bg-white border border-sky-100 rounded-lg p-5 text-center">
                                <p className="text-sm text-slate-500 mb-2">Need help? Contact our 24/7 support team</p>
                                <a href="tel:+1-800-QOOMLEE" className="text-lg font-bold text-sky-600 hover:text-sky-700 transition-colors">
                                    +1-800-QOOMLEE
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
