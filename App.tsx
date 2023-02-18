import * as React from 'react';
import Count from './count';
import CountButton from './CountButton';
import DisplayCount from './DisplayCount';
import Input from './input';
import Name from './name';
import './style.css';
import { Provider } from './super_store';

export default function App() {
  return (
    <Provider>
      <h1>Hello</h1>
      <Name />
      <Input />
      <Count />
      <DisplayCount />
      <CountButton action={'decrement'} />
      <CountButton action={'increment'} />
    </Provider>
  );
}
