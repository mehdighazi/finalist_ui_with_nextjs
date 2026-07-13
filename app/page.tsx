import Image from "next/image";
import LoginPage from '@/app/authentication/authentication/LoginPage'
// اگر واقعاً به params نیاز داری (کمتر رایج برای صفحه اصلی)
type PageProps = {
  params?: Promise<Record<string, never>>; // پارامتری وجود ندارد
};

export default function Home({ params }: PageProps) {
  // params استفاده نمی‌شود
  return (
    <LoginPage />
  );
}
