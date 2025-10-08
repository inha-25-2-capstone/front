import { env } from '@/lib/env';
import { useTodos } from '@/features/todos/useTodos';

export default function Home() {
  const { data, isPending, error } = useTodos();

  return (
    <div>
      <h2>Home</h2>
      <p>API: {env.VITE_API_URL ?? 'not set'}</p>
      <h3>Todos</h3>
      {isPending && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{String(error)}</p>}
      {data && (
        <ul>
          {data.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
