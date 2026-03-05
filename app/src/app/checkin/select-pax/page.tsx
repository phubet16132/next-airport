'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Check } from 'lucide-react';
import SelectPaxSkeleton from '@/components/skeletons/SelectPaxSkeleton';
import { fetchPassengers, Passenger } from '@/lib/mockApi';

export default function SelectPaxPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const [passengers, setPassengers] = useState<(Passenger & { selected: boolean })[]>([]);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            const data = await fetchPassengers();
            if (isMounted) {
                let selectedIds: string[] = [];
                try {
                    const stored = sessionStorage.getItem('selectedPaxIds');
                    if (stored) selectedIds = JSON.parse(stored);
                } catch (e) { }

                setPassengers(data.map((p, i) => {
                    const isInfant = p.type === 'INF';
                    let selected = false;
                    if (selectedIds.length > 0) {
                        selected = selectedIds.includes(p.id) && !isInfant;
                    } else {
                        selected = i === 0 && !isInfant;
                    }
                    return { ...p, selected };
                }));
                setIsLoading(false);
            }
        };
        load();
        return () => { isMounted = false; };
    }, []);

    const selectablePassengers = passengers.filter(p => p.type !== 'INF');
    const allSelected = selectablePassengers.length > 0 && selectablePassengers.every(p => p.selected);

    const togglePassenger = (id: string) => {
        setPassengers(passengers.map(p => {
            if (p.id === id) {
                if (p.type === 'INF') return p; // Cannot select infants online
                return { ...p, selected: !p.selected };
            }
            return p;
        }));
    };

    const toggleAll = () => {
        if (allSelected) {
            setPassengers(passengers.map(p => ({ ...p, selected: false })));
        } else {
            setPassengers(passengers.map(p => ({ ...p, selected: p.type !== 'INF' })));
        }
    };
    const selectedPax = passengers.filter(p => p.selected);
    const hasCHD = selectedPax.some(p => p.type === 'CHD');
    const hasADT = selectedPax.some(p => p.type === 'ADT');
    const chdTravelsAlone = hasCHD && !hasADT;
    const canContinue = selectedPax.length > 0 && !chdTravelsAlone && !isLoading;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Flow Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 py-3 md:px-8">
                    <div className="flex items-center">
                        <button onClick={() => router.push('/checkin')} className="mr-4 text-slate-600 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm md:text-base leading-tight">Check-in</span>
                            <span className="text-slate-500 text-xs md:text-sm">Select Passengers</span>
                        </div>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-slate-500">
                        Step 2 of 5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 flex">
                    <div className="h-full bg-sky-500 w-[40%]"></div>
                    <div className="h-full bg-sky-100 w-[60%]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 relative pb-32">
                {isLoading ? (
                    <SelectPaxSkeleton />
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <h1 className="text-2xl font-bold text-slate-800 mb-1">Select Passengers</h1>
                            <p className="text-slate-600 mb-6">Choose passengers for check-in</p>

                            <div className="space-y-4">
                                {passengers.map((pax) => (
                                    <div
                                        key={pax.id}
                                        onClick={() => pax.type !== 'INF' && togglePassenger(pax.id)}
                                        className={`relative overflow-hidden border-2 rounded-lg p-5 transition-colors ${pax.type === 'INF'
                                            ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-60'
                                            : pax.selected
                                                ? 'border-[#0088cc] bg-sky-50/10 cursor-pointer'
                                                : 'border-slate-200 hover:border-slate-300 bg-white cursor-pointer'
                                            }`}
                                    >
                                        {/* Checkmark Triangle on top right */}
                                        {pax.selected && (
                                            <div className="absolute top-0 right-0 w-0 h-0 border-l-[44px] border-l-transparent border-t-[44px] border-t-[#0088cc]">
                                                <Check className="absolute -top-[38px] right-[4px] w-[18px] h-[18px] text-white" strokeWidth={3} />
                                            </div>
                                        )}

                                        <h3 className={`font-bold text-lg mb-2 ${pax.selected ? 'text-sky-800' : 'text-slate-800'}`}>
                                            {pax.name}
                                        </h3>
                                        <div className="flex items-center space-x-3 text-sm">
                                            <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded font-medium">
                                                {pax.type}
                                            </span>
                                            <span className="text-slate-600">
                                                Seat {pax.seat}
                                            </span>
                                        </div>
                                        {pax.type === 'INF' && (
                                            <p className="text-red-500 text-xs font-medium mt-2">
                                                * Airport check-in required for infants
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Select/Clear All Button */}
                        <div className="absolute bottom-24 right-4 md:right-8 z-10">
                            <button
                                onClick={toggleAll}
                                className="flex items-center px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                                {allSelected ? (
                                    <>
                                        <X className="w-4 h-4 mr-2" /> Clear All
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4 mr-2" /> Select All
                                    </>
                                )}
                            </button>
                        </div>
                    </>
                )}

                {/* Warning message for CHD traveling alone */}
                {chdTravelsAlone && (
                    <div className="max-w-3xl mx-auto mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-800 text-sm font-medium">
                        Children cannot check in online without an adult passenger in the same booking.
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
                        disabled={!canContinue}
                        onClick={() => {
                            const selectedIds = passengers.filter(p => p.selected).map(p => p.id);
                            sessionStorage.setItem('selectedPaxIds', JSON.stringify(selectedIds));
                            router.push('/checkin/pax-info');
                        }}
                    >
                        Continue
                    </button>
                </div>
            </footer>
        </div>
    );
}
