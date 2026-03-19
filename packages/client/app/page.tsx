'use client';

import { useGetAllFormsQuery } from "./api-client/generated";

export default function HomePage() {
  const { data, isLoading, error } = useGetAllFormsQuery();

  if (isLoading) return <div className="p-10">Loading...</div>;
  
  if (error) return <div className="p-10 text-red-500">Uppload error</div>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">List form</h1>
      
      <div className="grid gap-4">
        {data?.forms.map((form) => (
          <div key={form.id} className="p-4 border rounded shadow-sm">
            <h2 className="font-semibold">{form.title}</h2>
            <p className="text-gray-500">{form.description}</p>
          </div>
        ))}
      </div>

      {data?.forms.length === 0 && (
        <p className="text-gray-400">The list is empty. Time to create something!</p>
      )}
    </main>
  );
}
