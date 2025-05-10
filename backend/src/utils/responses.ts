export const successResponse = (data: any, message = 'Success') => ({
  success: true,
  message,
  data
});

export const errorResponse = (message: string, error?: any) => ({
  success: false,
  message,
  error: error || undefined
});
