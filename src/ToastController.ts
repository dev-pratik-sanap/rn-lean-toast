export type ToastType = 'success' | 'error' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  backgroundColor?: string;
  textColor?: string;
  position?: ToastPosition; // 👈 Added position option
}

export interface ToastData extends ToastOptions {
  id: string;
}

type Listener = (toast: ToastData | null) => void;

class ToastManager {
  private listener: Listener | null = null;
  private queue: ToastData[] = [];
  private isDisplaying = false;
  private timer: NodeJS.Timeout | null = null;

  subscribe(listener: Listener) {
    this.listener = listener;
    return () => {
      this.listener = null;
    };
  }

  show(options: ToastOptions) {
    const id = Math.random().toString(36).substring(2, 9);

    this.queue.push({ ...options, id });

    if (!this.isDisplaying) {
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.queue.length === 0) {
      this.isDisplaying = false;
      return;
    }

    this.isDisplaying = true;
    const currentToast = this.queue[0];
    if (!currentToast) {
      this.isDisplaying = false;
      return;
    }
    const duration = currentToast.duration || 3000;

    if (this.listener) {
      this.listener(currentToast);
    }

    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.hide();
    }, duration);
  }

  success(message: string, options?: Omit<ToastOptions, 'message' | 'type'>) {
    this.show({ message, type: 'success', ...options });
  }

  error(message: string, options?: Omit<ToastOptions, 'message' | 'type'>) {
    this.show({ message, type: 'error', ...options });
  }

  info(message: string, options?: Omit<ToastOptions, 'message' | 'type'>) {
    this.show({ message, type: 'info', ...options });
  }

  hide() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    if (this.listener) this.listener(null);
  }

  next() {
    this.queue.shift();
    this.processQueue();
  }
}

export const Toast = new ToastManager();
