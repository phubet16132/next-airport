export default function PaxInfoSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 w-full animate-pulse">
            <div className="h-6 bg-slate-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-8"></div>

            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="border border-slate-200 rounded-lg p-5">
                        <div className="h-5 bg-slate-300 rounded w-1/4 mb-4"></div>
                        <div className="space-y-5">
                            <div>
                                <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                                <div className="h-[50px] bg-slate-100 rounded-md border border-slate-200 w-full"></div>
                            </div>
                            <div>
                                <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
                                <div className="flex gap-3">
                                    <div className="h-[50px] bg-slate-100 rounded-md border border-slate-200 w-1/3 max-w-[120px]"></div>
                                    <div className="flex-1 h-[50px] bg-slate-100 rounded-md border border-slate-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
