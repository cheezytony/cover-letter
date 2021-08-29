type LocalStorageData = {
  key: string
  value: unknown
}

export const setItem = (key: string, value: unknown) => {
  const data = JSON.stringify({ key, value });
  return localStorage.setItem(key, data);
};

export const hasItem = (key: string) => !!localStorage.getItem(key);

export function getItem<S = undefined>(key: string): S | null {
  const value = localStorage.getItem(key);
  if (!value) return null;

  const data: LocalStorageData = JSON.parse(value);
  return data.value as S;
}
