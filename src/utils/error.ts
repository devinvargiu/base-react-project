class AppError extends Error {
  public name: string;
  public code: number | undefined;

  constructor(name: string, message: string, code?: number) {
    super(message);
    this.name = name;
    this.code = code;
  }
}

export default AppError;

export const createError = (name: string, message: string, code?: number): AppError => {
  return new AppError(name, message, code);
};
