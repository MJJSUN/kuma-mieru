import packageJson from '@/package.json';

export const customFetchOptions = {
  headers: {
    'User-Agent': `Kuma-Mieru/${packageJson.version} (https://github.com/Alice39s/kuma-mieru)`,
    Accept: 'text/html,application/json,*/*',
  },
  maxRetries: 3,
  retryDelay: 1000,
  timeout: 10000,
};

/**
 * Add UTC+0000 timezone to ISO date string if absent,
 * try resolving Uptime Kuma timezone offset...
 * @param dateStr - ISO date string
 * @returns date string with UTC+0000 timezone
 
export function ensureUTCTimezone(dateStr: string): string {
  if (!dateStr) return dateStr;
  if (dateStr.endsWith('Z') || /[+-]\d{2}:?\d{2}$/.test(dateStr)) {
    return dateStr.replace('Z', ' +0000').replace(/([+-]\d{2}):(\d{2})$/, '$1$2');
  }
  return `${dateStr} +0000`;
}
*/
export function ensureUTCTimezone(dateStr: string): string {
  if (!dateStr) return dateStr;

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // 如果不是有效时间，直接返回

  // 将时间加上8小时
  const utc8 = new Date(date.getTime() + 8 * 60 * 60 * 1000);

  // 构造字符串，格式为：YYYY-MM-DDTHH:mm:ss+0800
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = utc8.getUTCFullYear();
  const mm = pad(utc8.getUTCMonth() + 1);
  const dd = pad(utc8.getUTCDate());
  const hh = pad(utc8.getUTCHours());
  const mi = pad(utc8.getUTCMinutes());
  const ss = pad(utc8.getUTCSeconds());

  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}+0800`;
}

