export default function SelectPaxSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 animate-pulse w-full">
            <div className="h-6 bg-slate-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>

            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="border-2 border-slate-200 rounded-lg p-5">
                        <div className="h-5 bg-slate-300 rounded w-40 mb-3"></div>
                        <div className="flex items-center space-x-3">
                            <div className="h-5 bg-slate-200 rounded w-12"></div>
                            <div className="h-4 bg-slate-200 rounded w-16"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
