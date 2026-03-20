'use client';

import Link from "next/link";
import { useGetAllFormsQuery } from "./api-client/generated";
import styles from "./page.module.css";

export default function HomePage() {
  const { data, isLoading, error } = useGetAllFormsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div className={styles.statusMessage}>Loading...</div>;
  if (error) return <div className={`${styles.statusMessage} ${styles.error}`}>Upload error</div>;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Forms</h1>
        <Link href="/forms/new" className={styles.createButton}>
          + Create New Form
        </Link>
      </div>
      
      <div className={styles.grid}>
        {data?.forms.map((form) => (
          <div key={form.id} className={styles.card}>
            <div>
              <h2 className={styles.formTitle}>{form.title}</h2>
              <p className={styles.formDescription}>{form.description}</p>
            </div>
            <div className={styles.actions}>
              <Link 
                href={`/forms/${form.id}/fill`} 
                className={styles.secondaryButton}
              >
                View Form
              </Link>
              <Link 
                href={`/forms/${form.id}/responses`} 
                className={styles.secondaryButton}
              >
                Responses
              </Link>
            </div>
          </div>
        ))}
      </div>

      {data?.forms.length === 0 && (
        <div className={styles.emptyState}>
          <p>The list is empty. Time to create something!</p>
        </div>
      )}
    </main>
  );
}
