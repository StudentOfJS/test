import * as React from 'react';
const {
  useRef,
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  useEffect,
} = React;

export default function createStoreContext<TStore>(
  initialState: TStore,
  persist?: 'sessionStorage' | 'localStorage'
) {
  function useStoreData(): {
    get: () => TStore;
    set: (value: Partial<TStore>) => void;
    subscribe: (callback: () => void) => () => void;
  } {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<TStore>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
      if (persist && window) {
        let keys = Object.keys(value);
        keys.forEach((key) => {
          let val = (value as Record<string, any>)[key];
          key && window[persist].setItem(key, JSON.stringify(val));
        });
      }
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
    }, []);

    useEffect(() => {
      if (initialState && persist) {
        Object.keys(initialState).forEach((key) => {
          let dataString = (window && window[persist].getItem(key)) ?? '';
          try {
            let value = dataString ? JSON.parse(dataString) : undefined;
            value && set({ [key]: value } as Partial<TStore>);
          } catch (_) {
            return undefined;
          }
        });
      }
    }, [initialState, persist]);

    return {
      get,
      set,
      subscribe,
    };
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStore<SelectorOutput>(
    key: string
  ): [SelectorOutput, (value: Partial<TStore>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(
      store.subscribe,
      () => store.get()[key],
      () => initialState[key]
    );

    return [state, store.set];
  }

  return {
    Provider,
    useStore,
  };
}
