import { Plane } from 'lucide-react';

export interface BoardingPassProps {
    pass: {
        name: string;
        pnr: string;
        seat: string;
        seq: string;
    };
}

export default function BoardingPassCard({ pass }: BoardingPassProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-[#0088cc] px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 -rotate-45" />
                    <span className="font-bold text-lg tracking-wide">Qoomlee</span>
                </div>
                <span className="font-medium text-sm">Boarding Pass</span>
            </div>

            <div className="p-6 md:p-8">
                {/* Passenger Info & Gate */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Passenger</p>
                        <h2 className="text-2xl font-bold text-slate-800">{pass.name}</h2>
                        <p className="text-sm text-slate-500 mt-1">ADT • PNR: {pass.pnr}</p>
                    </div>
                    <div className="flex space-x-6 text-center">
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Terminal</p>
                            <p className="text-xl font-bold text-slate-800">1</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium">Gate</p>
                            <p className="text-xl font-bold text-slate-800">40</p>
                        </div>
                    </div>
                </div>

                {/* Flight Route */}
                <div className="bg-slate-50 rounded-xl p-6 flex justify-between items-center mb-6">
                    <div className="text-center w-[35%]">
                        <p className="text-xs text-slate-500 font-medium leading-tight h-8 truncate px-1" title="Suvarnabhumi Airport, Bangkok">
                            Suvarnabhumi Airport,...
                        </p>
                        <p className="text-4xl font-bold text-[#0088cc] my-1">BKK</p>
                        <p className="text-xs text-slate-500 font-medium">19 Feb 2026</p>
                    </div>

                    <div className="flex flex-col items-center flex-1 px-2">
                        <div className="flex items-center w-full justify-center text-slate-300 mb-1">
                            <div className="h-[1px] border-t border-dashed border-slate-300 flex-1"></div>
                            <Plane className="w-5 h-5 text-[#0088cc] mx-2" />
                            <div className="h-[1px] border-t border-dashed border-slate-300 flex-1"></div>
                        </div>
                        <span className="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
                            QL123
                        </span>
                    </div>

                    <div className="text-center w-[35%]">
                        <p className="text-xs text-slate-500 font-medium leading-tight h-8 truncate px-1" title="Changi International Airport, Singapore">
                            Changi International...
                        </p>
                        <p className="text-4xl font-bold text-[#0088cc] my-1">SIN</p>
                        <p className="text-xs text-slate-500 font-medium">20 Feb 2026</p>
                    </div>
                </div>

                {/* Seat Details */}
                <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4">
                    <div className="bg-slate-50 rounded-lg p-3 text-center flex flex-col justify-center">
                        <p className="text-xs text-slate-500 font-medium mb-1">Seat</p>
                        <p className="text-xl font-bold text-slate-800">{pass.seat}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center flex flex-col justify-center">
                        <p className="text-xs text-slate-500 font-medium mb-1">Zone</p>
                        <p className="text-xl font-bold text-slate-800">1</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center flex flex-col justify-center">
                        <p className="text-xs text-slate-500 font-medium mb-1">Seq</p>
                        <p className="text-xl font-bold text-slate-800">{pass.seq}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center flex flex-col justify-center">
                        <p className="text-xs text-slate-500 font-medium mb-1">Boarding</p>
                        <p className="text-xl font-bold text-[#0088cc]">21:14</p>
                    </div>
                </div>

                {/* Time Details */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-8">
                    <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 font-medium mb-1">Departure</p>
                        <div className="flex items-baseline mb-1">
                            <p className="text-2xl font-bold text-slate-800 mr-1">14:54</p>
                            <p className="text-sm font-semibold text-slate-500">UTC</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500">Thu • 19 Feb 2026</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 font-medium mb-1">Arrival</p>
                        <div className="flex items-baseline mb-1">
                            <p className="text-2xl font-bold text-slate-800 mr-1">17:54</p>
                            <p className="text-sm font-semibold text-slate-500">UTC</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500">Fri • 20 Feb 2026</p>
                    </div>
                </div>

                <div className="border-t border-dashed border-slate-300 w-full mb-8"></div>

                {/* Barcode Mock */}
                <div className="flex flex-col items-center justify-center">
                    <div className="border border-slate-200 rounded-lg p-4 w-full flex justify-center mb-3">
                        {/* CSS Barcode lines */}
                        <div className="h-16 flex gap-[2px] w-full max-w-[280px]">
                            {Array.from({ length: 50 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-black h-full"
                                    style={{ width: `${Math.random() * 4 + 1}px` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 font-medium mb-6">Scan at security and boarding gate</p>

                    {/* Apple Wallet Button Mock */}
                    <button className="bg-black text-white w-full py-4 rounded-xl flex items-center justify-center font-semibold text-lg hover:bg-zinc-800 transition-colors">
                        <div className="w-8 h-5 bg-gradient-to-br from-orange-400 via-pink-500 to-blue-500 rounded-md mr-3 relative overflow-hidden flex flex-col">
                            <div className="h-1 bg-white/30"></div>
                            <div className="h-1 bg-black/20 mt-1"></div>
                        </div>
                        Add to Apple Wallet
                    </button>
                </div>
            </div>
        </div>
    );
}
