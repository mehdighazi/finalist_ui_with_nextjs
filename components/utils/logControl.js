// ذخیره نسخه اصلی console.log
const originalConsoleLog = console.log;

// تابع برای غیرفعال کردن log
export const disableLogs = () => {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
};

// تابع برای فعال کردن دوباره log
export const enableLogs = () => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleLog;
  console.error = originalConsoleLog;
};
