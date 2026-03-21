import { SessionData, StorageAdapter } from './types';

class BrowserStorageAdapter implements StorageAdapter {
  constructor(private storage: Storage = window.sessionStorage) {}

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}

class SessionManager {
  private static readonly SESSION_KEY = 'session';
  private storage: StorageAdapter;
  private isBrowser: boolean;

  constructor(storage?: StorageAdapter) {
    this.isBrowser = typeof window !== 'undefined';
    this.storage =
      storage ||
      (this.isBrowser ? new BrowserStorageAdapter() : this.createNoOpStorage());
  }

  private createNoOpStorage(): StorageAdapter {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }

  private parseSession(sessionString: string): SessionData | null {
    try {
      const parsed = JSON.parse(sessionString);

      if (!this.isValidSession(parsed)) {
        console.warn('Invalid session data structure');
        return null;
      }

      return parsed as SessionData;
    } catch (error) {
      console.error('Error parsing session:', error);
      return null;
    }
  }

  private isValidSession(data: unknown): data is SessionData {
    return (
      typeof data === 'object' &&
      data !== null &&
      'is_user_logged_in' in data &&
      'sid' in data &&
      'csrf_token' in data
    );
  }

  private serializeSession(session: SessionData): string {
    const { is_user_logged_in, sid, csrf_token } = session;
    return JSON.stringify({ is_user_logged_in, sid, csrf_token });
  }

  getSession(): SessionData | null {
    if (!this.isBrowser) return null;

    try {
      const sessionString = this.storage.getItem(SessionManager.SESSION_KEY);
      return sessionString ? this.parseSession(sessionString) : null;
    } catch (error) {
      console.error('Error retrieving session:', error);
      return null;
    }
  }

  saveSession(sessionData: SessionData): void {
    if (!this.isBrowser) return;

    try {
      const serialized = this.serializeSession(sessionData);
      this.storage.setItem(SessionManager.SESSION_KEY, serialized);
    } catch (error) {
      console.error('Error saving session:', error);

      if (
        error instanceof DOMException &&
        error.name === 'QuotaExceededError'
      ) {
        console.error('Storage quota exceeded. Clearing old session.');
        this.clearSession();
      }
    }
  }

  clearSession(): void {
    if (!this.isBrowser) return;

    try {
      this.storage.removeItem(SessionManager.SESSION_KEY);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }
}

export default SessionManager;
