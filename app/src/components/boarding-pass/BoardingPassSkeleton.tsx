export default function BoardingPassSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-slate-300 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 bg-slate-400 rounded-full"></div>
                    <div className="h-5 bg-slate-400 rounded w-20"></div>
                </div>
                <div className="h-4 bg-slate-400 rounded w-24"></div>
            </div>

            <div className="p-6 md:p-8">
                {/* Passenger Info & Gate Skeleton */}
                <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                        <div className="h-6 bg-slate-300 rounded w-40 mt-1"></div>
                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                    </div>
                    <div className="flex space-x-6 text-center">
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-200 rounded w-12"></div>
                            <div className="h-6 bg-slate-300 rounded w-8 mx-auto"></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-200 rounded w-10"></div>
                            <div className="h-6 bg-slate-300 rounded w-8 mx-auto"></div>
                        </div>
                    </div>
                </div>

                {/* Flight Route Skeleton */}
                <div className="bg-slate-50 rounded-xl p-6 flex justify-between items-center mb-6">
                    <div className="text-center w-[35%] space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-8 bg-slate-300 rounded w-16 mx-auto"></div>
                        <div className="h-3 bg-slate-200 rounded w-20 mx-auto"></div>
                    </div>

                    <div className="flex flex-col items-center flex-1 px-2">
                        <div className="w-full flex items-center justify-center space-x-2 mb-2">
                            <div className="h-[2px] bg-slate-200 flex-1"></div>
                            <div className="w-4 h-4 bg-slate-300 rounded-full"></div>
                            <div className="h-[2px] bg-slate-200 flex-1"></div>
                        </div>
                        <div className="h-5 bg-slate-300 rounded-full w-14"></div>
                    </div>

                    <div className="text-center w-[35%] space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                        <div className="h-8 bg-slate-300 rounded w-16 mx-auto"></div>
                        <div className="h-3 bg-slate-200 rounded w-20 mx-auto"></div>
                    </div>
                </div>

                {/* Seat Details Skeleton */}
                <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-3 text-center flex flex-col justify-center space-y-2">
                            <div className="h-3 bg-slate-200 rounded w-8 mx-auto"></div>
                            <div className="h-6 bg-slate-300 rounded w-12 mx-auto"></div>
                        </div>
                    ))}
                </div>

                {/* Time Details Skeleton */}
                <div className="grid grid-cols-2 gap-2 md:gap-4 mb-8">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-4 space-y-3">
                            <div className="h-3 bg-slate-200 rounded w-16"></div>
                            <div className="h-6 bg-slate-300 rounded w-24"></div>
                            <div className="h-3 bg-slate-200 rounded w-32"></div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-200 w-full mb-8"></div>

                {/* Barcode Mock Skeleton */}
                <div className="flex flex-col items-center justify-center">
                    <div className="border border-slate-200 rounded-lg p-4 w-full flex justify-center mb-3">
                        <div className="h-16 w-full max-w-[280px] bg-slate-200 rounded"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-48 mb-6"></div>

                    <div className="w-full h-14 bg-slate-300 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
}
