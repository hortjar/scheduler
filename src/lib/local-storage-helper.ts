export const localStorageHelper = {
  prefix: "scheduler.",

  hasKey(key: string): boolean {
    return localStorage.getItem(this.prefix + key) != null;
  },
  getItem(key: string): string | null {
    return localStorage.getItem(this.prefix + key);
  },
  setItem(key: string, value: string) {
    localStorage.setItem(this.prefix + key, value);
  },
};
