declare module 'unistore/preact' {
  import { AnyComponent, ComponentConstructor } from 'preact';
  import { ActionCreator, StateMapper, Store } from 'unistore';

  export function connect<T, S, K, I>(
      mapStateToProps: string | string[] | StateMapper<T, K, Partial<I>>,
      actions?: ActionCreator<K> | object,
  ): (Child: ComponentConstructor<T & I, S> | AnyComponent<T & I, S>) => ComponentConstructor<T | (T & I), S>;
}