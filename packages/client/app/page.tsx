'use client';

import Link from "next/link";
import { useGetAllFormsQuery } from "./api-client/generated";

export default function HomePage() {
  const { data, isLoading, error } = useGetAllFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Upload error</div>;

  return (
    <main className="max-w-4xl mx-auto p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <Link 
          href="/forms/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create New Form
        </Link>
      </div>
      
      <div className="grid gap-6">
        {data?.forms.map((form) => (
          <div key={form.id} className="p-6 border rounded-xl shadow-sm bg-white flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{form.title}</h2>
              <p className="text-gray-500 mt-1">{form.description}</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href={`/forms/${form.id}/fill`} 
                className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
              >
                View Form
              </Link>
              <Link 
                href={`/forms/${form.id}/responses`} 
                className="text-sm border px-3 py-1 rounded hover:bg-gray-50"
              >
                Responses
              </Link>
            </div>
          </div>
        ))}
      </div>

      {data?.forms.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-400">The list is empty. Time to create something!</p>
        </div>
      )}
    </main>
  );
}
