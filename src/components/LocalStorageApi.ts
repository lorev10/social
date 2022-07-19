import { Api } from "./api";
import { createEmptyStorage, createInMemoryApi } from "./inMemomoryApi";

export function createLocalStorageApi(localStoragekey: string) {
  const stored = localStorage.getItem(localStoragekey);
  const storage = stored ? JSON.parse(stored) : createEmptyStorage();
  const api = createInMemoryApi(storage);

  return new Proxy(
    {},
    {
      get(target, property, receve) {
        return (...parameters: any[]) => {
          const result = (api as any)[property](...parameters);
          localStorage.setItem(localStoragekey, JSON.stringify(storage));
          return result;
        };
      },
    }
  ) as Api;
}
