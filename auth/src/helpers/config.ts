export const env = (
  envAttr: string,
  defaultValue: string | number | null = null
) => {
  return process.env[envAttr] || defaultValue;
};

// TODO:: Create config function like [laravel] 😎
// export const config = (envAttr: string, defaultValue: string) => {
// return process.env[envAttr] || defaultValue;
// };
