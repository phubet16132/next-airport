'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import BoardingPassCard from '@/components/boarding-pass/BoardingPassCard';
import BoardingPassSkeleton from '@/components/boarding-pass/BoardingPassSkeleton';

export default function BoardingPassPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // Simulate an API call to fetch boarding passes
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const passes = [
        {
            name: 'ALEX HUUM',
            pnr: 'ABC123',
            seat: '12A',
            seq: '023'
        },
        {
            name: 'Somsee Kuum',
            pnr: 'ABC123',
            seat: '12B',
            seq: '024'
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

            {/* Flow Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="flex items-center justify-between px-4 py-3 md:px-8">
                    <div className="flex items-center">
                        <button onClick={() => router.push('/checkin/dangerous-goods')} className="mr-4 text-slate-600 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-sm md:text-base leading-tight">Check-in</span>
                            <span className="text-slate-500 text-xs md:text-sm">Boarding Pass</span>
                        </div>
                    </div>
                    <div className="text-xs md:text-sm font-medium text-slate-500">
                        Step 5 of 5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 flex">
                    <div className="h-full bg-sky-500 w-[100%]"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 space-y-8 pb-32">

                {isLoading ? (
                    <>
                        <BoardingPassSkeleton />
                        <BoardingPassSkeleton />
                    </>
                ) : (
                    passes.map((pass, index) => (
                        <BoardingPassCard key={index} pass={pass} />
                    ))
                )}

            </main>

            {/* Sticky Footer */}
            <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-40 w-full">
                <div className="max-w-3xl mx-auto flex">
                    <button
                        className="flex-1 py-3 px-6 rounded-md font-bold text-white bg-[#0088cc] hover:bg-[#0077b3] transition-colors shadow-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
                        onClick={() => router.push('/checkin')}
                        disabled={isLoading}
                    >
                        Done
                    </button>
                </div>
            </footer>
        </div>
    );
}
