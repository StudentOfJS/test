import * as React from 'react';
import './style.css';
import { useStore } from './super_store';

export default function Count() {
  const [count] = useStore<number>('count');
  return (
    <div>
      <p>{count}</p>
    </div>
  );
}
