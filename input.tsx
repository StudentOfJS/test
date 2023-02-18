import * as React from 'react';
import './style.css';
import { useStore } from './super_store';

export default function Name() {
  const [name, updateName] = useStore<string>('name');
  const handleChange = (e) => {
    updateName({ name: e.currentTarget.value });
  };
  return <input type="text" value={name ?? ''} onChange={handleChange} />;
}
