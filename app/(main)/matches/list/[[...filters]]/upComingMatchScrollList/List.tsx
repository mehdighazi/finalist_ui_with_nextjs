import AutoScroll from '@/components/ui-component/caruselUpcomingMatches/autoScroll';
import UpcomingMatchCard from '@/components/ui-component/caruselUpcomingMatches/matchCardContent';
import { Typography } from '@mui/material';

export const UpcomingMatchesCarousel = async () => {
  const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
  const PORT = process.env.NEXT_PUBLIC_HOST_PORT
    ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
    : '';
  const DOMAIN = `${HOST}${PORT}/api/app/`;

  // آدرس API بدون هیچ پارامتری
  const apiUrl = `${DOMAIN}match/upcoming/list`;
  console.log(apiUrl)

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // در Server Component، cache: 'no-store' به معنی عدم کش کردن است
      cache: 'no-store',
      // یا برای کش کردن با بازسازی خودکار:
      // next: { revalidate: 60 } // هر 60 ثانیه یکبار بازسازی شود
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const matches = result?.result?.data || [];

    // نمایش پیام خالی بودن لیست
    if (!matches || matches.length === 0) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <span>هیچ مسابقه‌ای یافت نشد</span>
        </div>
      );
    }

    return (
      <div>
        <AutoScroll>
          {matches.map((match: any) => (
            <div
              key={match.match_id}
              style={{
                minWidth: 260
              }}
            >
              <UpcomingMatchCard match={match} />
            </div>
          ))}
        </AutoScroll>
      </div>
    );
  } catch (error) {
    console.error('Error fetching matches:', error);
    return (
      <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <span>خطا در بارگذاری مسابقات</span>
      </div>
    );
  }
};