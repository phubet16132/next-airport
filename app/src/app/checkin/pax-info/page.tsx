'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import PaxInfoSkeleton from '@/components/skeletons/PaxInfoSkeleton';
import { fetchPassengers, Passenger } from '@/lib/mockApi';

export default function PaxInfoPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [passengers, setPassengers] = useState<Passenger[]>([]);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            const data = await fetchPassengers();
            if (isMounted) {
                try {
                    const stored = sessionStorage.getItem('selectedPaxIds');
                    if (stored) {
                        const selectedIds = JSON.parse(stored);
                        if (selectedIds && selectedIds.length > 0) {
                            setPassengers(data.filter(p => selectedIds.includes(p.id)));
                            setIsLoading(false);
                            return;
                        }
                    }
                } catch (e) {
                    console.error('Error parsing session storage', e);
                }
                setPassengers(data);
                setIsLoading(false);
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Flow Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 py-3 md:px-8">
                    <div className="flex items-center">
                        <button onClick={() => router.push('/checkin/select-pax')} className="mr-4 text-slate-600 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm md:text-base leading-tight">Check-in</span>
                            <span className="text-slate-500 text-xs md:text-sm">Passenger Details</span>
                        </div>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-slate-500">
                        Step 3 of 5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 flex">
                    <div className="h-full bg-sky-500 w-[60%]"></div>
                    <div className="h-full bg-sky-100 w-[40%]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 pb-32">
                {isLoading ? (
                    <PaxInfoSkeleton />
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                        <h1 className="text-2xl font-bold text-slate-800 mb-1">Passenger Details</h1>
                        <p className="text-slate-600 mb-8">Enter required information for each passenger</p>

                        <div className="space-y-6">

                            {passengers.map((pax, index) => (
                                <div key={pax.id} className="border border-slate-200 rounded-lg p-5">
                                    <h3 className="font-bold text-lg text-slate-800 mb-4">{index + 1}. {pax.name}</h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                Nationality
                                            </label>
                                            <select className="w-full border border-slate-300 rounded-md p-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium" defaultValue={index === 0 ? "TH" : "US"}>
                                                <option value="TH">TH</option>
                                                <option value="US">US</option>
                                                <option value="UK">UK</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                                Phone Number
                                            </label>
                                            <div className="flex gap-3">
                                                <div className="w-1/3 max-w-[120px]">
                                                    <select className="w-full border border-slate-300 rounded-md p-3 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-medium h-[50px]" defaultValue={index === 0 ? "+66" : "+1"}>
                                                        <option value="+66">🇹🇭 +66</option>
                                                        <option value="+1">🇺🇸 +1</option>
                                                    </select>
                                                    <p className="text-xs text-slate-500 mt-1 pl-1">{index === 0 ? 'Thailand' : 'United States'}</p>
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="tel"
                                                        defaultValue={index === 0 ? "811234567" : "5551234567"}
                                                        onChange={(e) => {
                                                            e.target.value = e.target.value.replace(/\D/g, '');
                                                        }}
                                                        className="w-full border border-slate-300 rounded-md p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white font-medium h-[50px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </main>

            {/* Sticky Footer */}
            <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-40 w-full">
                <div className="max-w-3xl mx-auto flex gap-4">
                    <button
                        className="flex-1 py-3 px-6 rounded-md font-bold text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors"
                        onClick={() => router.back()}
                    >
                        Back
                    </button>
                    <button
                        className="flex-1 py-3 px-6 rounded-md font-bold text-white bg-sky-600 hover:bg-sky-700 transition-colors disabled:bg-sky-300 disabled:cursor-not-allowed"
                        onClick={() => router.push('/checkin/dangerous-goods')}
                        disabled={isLoading}
                    >
                        Continue
                    </button>
                </div>
            </footer>
        </div>
    );
}
