'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetFormResponsesQuery } from '@/api-client/generated';

export default function FormResponsesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

    const { data, isLoading, error } = useGetFormResponsesQuery({ id }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div className="p-10 text-center">Loading responses...</div>;
  if (error || !data?.form) return <div className="p-10 text-center text-red-500">Error loading responses</div>;

  const { form } = data;

  return (
    <main className="max-w-6xl mx-auto p-6">
        <header className="mb-8 flex justify-between items-center">
            <div>
            <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
            <p className="text-gray-500 mt-1">
                Total responses: {form.responses?.length || 0}
            </p>
            </div>
            <button 
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50 transition"
            >
            ← Back
            </button>
        </header>

      {form.responses && form.responses.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm whitespace-nowrap">
                  Date Submitted
                </th>
                {form.questions.map((q) => (
                  <th key={q.id} className="p-4 font-semibold text-gray-600 text-sm min-w-[200px]">
                    {q.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {form.responses.map((resp) => (
                <tr key={resp.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(resp.submittedAt).toLocaleString()}
                  </td>
                  {form.questions.map((q) => {
                    const answer = resp.answers?.find((a) => a.questionId === q.id);
                    
                    return (
                      <td key={q.id} className="p-4 text-sm text-gray-700">
                        {answer?.value && answer.value.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {answer.value.map((v, idx) => (
                              <span 
                                key={idx} 
                                className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100 text-xs"
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-300 italic">No answer</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed rounded-xl p-20 text-center">
          <div className="text-4xl mb-4">Empty</div>
          <p className="text-gray-500">No one has submitted this form yet.</p>
        </div>
      )}
    </main>
  );
}