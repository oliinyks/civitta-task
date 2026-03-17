const store: Record<string, string> = {};

const AsyncStorage = {
  setItem: jest.fn(async (key: string, value: string) => {
    store[key] = value;
  }),
  getItem: jest.fn(async (key: string) => store[key] ?? null),
  removeItem: jest.fn(async (key: string) => {
    delete store[key];
  }),
  clear: jest.fn(async () => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
  getAllKeys: jest.fn(async () => Object.keys(store)),
  multiGet: jest.fn(async (keys: string[]) =>
    keys.map((key) => [key, store[key] ?? null] as [string, string | null]),
  ),
  multiSet: jest.fn(async (pairs: [string, string][]) => {
    pairs.forEach(([key, value]) => {
      store[key] = value;
    });
  }),
  multiRemove: jest.fn(async (keys: string[]) => {
    keys.forEach((key) => delete store[key]);
  }),
  _reset: () => {
    Object.keys(store).forEach((key) => delete store[key]);
  },
};

export default AsyncStorage;
