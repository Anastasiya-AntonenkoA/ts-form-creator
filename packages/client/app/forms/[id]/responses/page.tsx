'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetFormResponsesQuery } from '@/api-client/generated';
import styles from './responses.module.css';

export default function FormResponsesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

    const { data, isLoading, error } = useGetFormResponsesQuery({ id }, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div className={styles.statusMessage}>Loading responses...</div>;
  if (error || !data?.form) return <div className={`${styles.statusMessage} text-red-500`}>Error loading responses</div>;

  const { form } = data;

  return (
    <main className={styles.container}>
        <header className={styles.header}>
            <div>
            <h1 className={styles.title}>{form.title}</h1>
            <p className={styles.subtitle}>
                Total responses: {form.responses?.length || 0}
            </p>
            </div>
            <button 
            onClick={() => router.back()}
            className={styles.backButton}
            >
            Back
            </button>
        </header>

      {form.responses && form.responses.length > 0 ? (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>
                  Date Submitted
                </th>
                {form.questions.map((q) => (
                  <th key={q.id} className={`${styles.th} ${styles.thQuestion}`}>
                    {q.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {form.responses.map((resp) => (
                <tr key={resp.id}>
                  <td className={`${styles.td} ${styles.dateTd}`}>
                    {new Date(resp.submittedAt).toLocaleString()}
                  </td>
                  {form.questions.map((q) => {
                    const answer = resp.answers?.find((a) => a.questionId === q.id);
                    
                    return (
                      <td key={q.id} className={styles.td}>
                        {answer?.value && answer.value.length > 0 ? (
                          <div className={styles.badgeContainer}>
                            {answer.value.map((v, idx) => (
                              <span 
                                key={idx} 
                                className={styles.badge}
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className={styles.noAnswer}>No answer</span>
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
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>Empty</div>
          <p className={styles.subtitle}>No one has submitted this form yet.</p>
        </div>
      )}
    </main>
  );
}