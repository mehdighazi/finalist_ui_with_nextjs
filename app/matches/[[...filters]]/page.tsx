import * as React from "react";
import { Suspense } from "react";
import { Metadata } from "next";

// کامپوننت‌ها
import MatchListLayout from "@/layout/match/layout";
import MatchesContent from "./home/MatchesContent";
import TotalIncomeCard from "@/components/ui-component/cards/Skeleton/TotalIncomeCard";
import { Box } from "@mui/system";
// types
interface HomeProps {
  params: Promise<{ filters?: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// metadata برای SEO
export const metadata: Metadata = {
  title: 'لیست مسابقات ورزشی',
  description: 'جستجو و مشاهده مسابقات ورزشی در سراسر کشور',
};

// کامپوننت اصلی صفحه - Server Component
export default async function Home({ params, searchParams }: HomeProps) {
  // Await کردن params و searchParams
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams || {};

  // گرفتن پارامترها از URL
  const filters = resolvedParams?.filters || '';
  const searchQuery = resolvedSearchParams?.q as string || '';
  const sportFieldId = resolvedSearchParams?.sport_field_id as string || '';
  const cityId = resolvedSearchParams?.city_id as string || '';
  const page = resolvedSearchParams?.page as string || '1';

  // داده‌های اولیه برای کامپوننت کلاینت
  const initialData = {
    filters,
    searchQuery,
    sportFieldId,
    cityId,
    page: parseInt(page),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Layout Client Component */}
      
      {<MatchListLayout >
        <MatchesContent
          filters={filters}
          searchQuery={searchQuery}
          sportFieldId={sportFieldId}
          cityId={cityId}
          page={parseInt(page)}
        />
      </MatchListLayout>}

      {/* محتوای اصلی - Server Component */}


    </div>
  );
}

// کامپوننت loading برای محتوا
function LoadingContent() {
  return (

    <Box sx={{ p: 2 }}>
      <TotalIncomeCard />
      <TotalIncomeCard />
      <TotalIncomeCard />
    </Box>
  );
}