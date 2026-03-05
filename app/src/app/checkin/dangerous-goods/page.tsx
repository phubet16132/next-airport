'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function DangerousGoodsPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Flow Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 py-3 md:px-8">
                    <div className="flex items-center">
                        <button onClick={() => router.push('/checkin/pax-info')} className="mr-4 text-slate-600 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm md:text-base leading-tight">Check-in</span>
                            <span className="text-slate-500 text-xs md:text-sm">Dangerous Goods</span>
                        </div>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-slate-500">
                        Step 4 of 5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 flex">
                    <div className="h-full bg-sky-500 w-[80%]"></div>
                    <div className="h-full bg-sky-100 w-[20%]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 pb-40">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

                    <div className="p-6 md:p-8 border-b border-slate-100">
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dangerous Goods Declaration</h1>
                        <p className="text-slate-600">A mandatory safety and legal declaration as required by Thai law (CAAT/AOT).</p>
                    </div>

                    <div className="p-6 md:p-8">
                        <p className="text-[#d93025] font-bold text-lg mb-6 leading-snug">
                            For the safety of the flight, the transport of specific hazardous items is strictly forbidden.
                        </p>

                        <p className="text-slate-700 leading-relaxed mb-6">
                            By continuing, you confirm that you and those in your booking are NOT carrying the following Dangerous Goods in your carry-on or checked baggage, which are prohibited under all circumstances:
                        </p>

                        <ul className="space-y-4 text-slate-700 list-disc pl-5">
                            <li className="pl-1">
                                Explosives (e.g., Fireworks, Flares, Ammunition, Toy Caps, Gunpowder).
                            </li>
                            <li className="pl-1">
                                Flammable Items (e.g., Flammable Gases, Gasoline, Lighter Fluid, Aerosol Paints, Strike-Anywhere Matches).
                            </li>
                            <li className="pl-1">
                                Corrosives & Poisons (e.g., Acids, Bleach, Pesticides, Toxic or Infectious Substances).
                            </li>
                            <li className="pl-1">
                                Lithium Battery-Powered Vehicles (e.g., Hoverboards, Self-Balancing Wheels, Mini-Segways are forbidden in all baggage).
                            </li>
                            <li className="pl-1">
                                Other items like Tear Gas, Pepper Spray, or Radioactive Material.
                            </li>
                        </ul>
                    </div>

                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="bg-slate-50 md:bg-white border-t border-slate-200 p-4 sticky bottom-0 z-40 w-full">
                <div className="max-w-3xl mx-auto flex flex-col items-center">
                    <p className="text-sm font-semibold text-slate-800 mb-4 text-center">
                        I understand and accept the dangerous goods policy.
                    </p>
                    <div className="flex w-full gap-4">
                        <button
                            className="flex-1 py-3 px-6 bg-white md:bg-transparent rounded-md font-bold text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
                            onClick={() => router.back()}
                        >
                            Back
                        </button>
                        <button
                            className="flex-1 py-3 px-6 rounded-md font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors"
                            onClick={() => router.push('/checkin/boarding-pass')}
                        >
                            Accept & Continue
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
