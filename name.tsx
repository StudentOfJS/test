import * as React from 'react';
import './style.css';
import { useStore } from './super_store';

export default function Name() {
  const [name] = useStore<string>('name');
  return <h2>{name}</h2>;
}
