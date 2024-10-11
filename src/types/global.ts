declare global {
  type BooleanHandlers = {
    toggle: (value?: boolean) => void;
    on: () => void;
    off: () => void;
  };
  type ApiResponse<T> = {
    data: T | null;
    message: string;
    statusCode: number;
  };
}
