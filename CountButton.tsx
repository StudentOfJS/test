import * as React from 'react';
import { useStore } from './super_store';

export default function CountButton({
  action,
}: {
  action: 'increment' | 'decrement';
}) {
  const [count, updateCount] = useStore<number>('count');
  const handleClick = () => {
    if (action === 'decrement' && count <= 0) return updateCount({ count });
    updateCount({ count: count + (action === 'increment' ? 1 : -1) });
  };
  return <button onClick={handleClick}>{action}</button>;
}
