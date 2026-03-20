'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';

interface Props {
  children: ReactNode;
}

export default function StoreProvider({ children }: Props) {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}