export default function DangerousGoodsSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden w-full animate-pulse">
            <div className="p-6 md:p-8 border-b border-slate-100">
                <div className="h-6 bg-slate-300 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
            </div>

            <div className="p-6 md:p-8">
                <div className="h-5 bg-red-200 rounded w-full mb-6"></div>
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                    <div className="h-4 bg-slate-200 rounded w-11/12"></div>
                </div>

                <div className="space-y-4 pl-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-2"></div>
                            <div className="h-4 bg-slate-200 rounded w-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
