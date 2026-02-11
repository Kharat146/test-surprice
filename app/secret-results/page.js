"use client";
import { useEffect, useState } from "react";

export default function Results() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/results")
            .then((res) => res.json())
            .then((json) => {
                if (json.error) setError(json.error);
                else setData(json);
            })
            .catch((err) => setError("Failed to fetch"));
    }, []);

    if (error) return <div className="p-10 text-red-500">Error: {error}</div>;
    if (!data) return <div className="p-10">Loading responses...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-poppins">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Quiz Responses ({data.count})</h1>
            <div className="space-y-4">
                {data.responses.map((item, i) => {
                    let ans = item;
                    // Redis list stores strings, try parsing
                    if (typeof item === 'string') {
                        try { ans = JSON.parse(item); } catch (e) { }
                    }

                    return (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-400 mb-2">{new Date(ans.timestamp).toLocaleString()}</p>
                            <div className="grid gap-2">
                                {ans.answers && Object.entries(ans.answers).map(([qid, val]) => (
                                    <div key={qid} className="flex gap-2">
                                        <span className="font-semibold text-slate-600">Q{qid}:</span>
                                        <span className="text-slate-800">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
