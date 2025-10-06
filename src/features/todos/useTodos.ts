import { useQuery } from '@tanstack/react-query'

type Todo = { id: number; title: string }

async function fetchTodos(signal?: AbortSignal): Promise<Todo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', { signal })
  if (!res.ok) throw new Error('Failed to fetch todos')
  const data = (await res.json()) as Array<{ id: number; title: string }>
  return data
}

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: ({ signal }) => fetchTodos(signal),
    staleTime: 60 * 1000,
  })
}


