import * as React from "react";
import { Suspense } from "react";
import { Metadata } from "next";

// کامپوننت‌ها
import { UpcomingMatchesCarousel } from "./upComingMatchScrollList/List";
import MatchListLayout from "@/layout/match/list/layout";
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
const testMatches = [
  {
    match_id: 101,
    sport_field_id: 2,
    host_team_id: 10,
    guest_team_id: 21,

    match_time: '20:30:00',
    match_date: '2026-08-12T20:30:00.000Z',

    contract_uploaded: false,
    match_result: null,
    match_winner_team_id: null,

    match_province_id: 1,
    match_city_id: 6,

    match_type: 'casual',
    match_location_address: 'تبریز، خیابان صنعت',

    match_location_lat: null,
    match_location_lng: null,

    description: 'بازی دوستانه',
    total_requests: 0,

    host_points: 0,
    guest_points: 0,

    status: 'active',
    seen: false,
    banned: false,

    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',

    viewer_count: 0,

    host_team: {
      team_id: 10,
      team_name: 'جوان تهران',
      logo: {
        image_url: '/images/teams/javan.png'
      }
    },

    guest_team: {
      team_id: 21,
      team_name: 'پرسپولیس ایران',
      logo: {
        image_url: '/images/teams/persepolis.png'
      }
    },

    city_match: {
      city_id: 6,
      city_title: 'تبریز'
    },

    province_match: {
      province_id: 1,
      province_title: 'آذربایجان شرقی'
    },

    match_sport: {
      sport_field_id: 2,
      field_title: 'فوتبال سالنی'
    }
  },

  {
    match_id: 102,
    sport_field_id: 1,
    host_team_id: 24,
    guest_team_id: 1,

    match_time: '18:00:00',
    match_date: '2026-08-14T18:00:00.000Z',

    contract_uploaded: false,
    match_result: null,
    match_winner_team_id: null,

    match_province_id: 1,
    match_city_id: 1,

    match_type: 'official',
    match_location_address: 'آذرشهر، ورزشگاه تختی',

    match_location_lat: null,
    match_location_lng: null,

    description: 'مسابقه رسمی',
    total_requests: 0,

    host_points: 0,
    guest_points: 0,

    status: 'active',
    seen: false,
    banned: false,

    createdAt: '2026-08-02T10:00:00.000Z',
    updatedAt: '2026-08-02T10:00:00.000Z',

    viewer_count: 2,

    host_team: {
      team_id: 24,
      team_name: 'گرگ های منچستر',
      logo: {
        image_url: '/images/teams/manchester-wolves.png'
      }
    },

    guest_team: {
      team_id: 1,
      team_name: 'سلاطین تهران',
      logo: {
        image_url: '/images/teams/salatin.png'
      }
    },

    city_match: {
      city_id: 1,
      city_title: 'آذرشهر'
    },

    province_match: {
      province_id: 1,
      province_title: 'آذربایجان شرقی'
    },

    match_sport: {
      sport_field_id: 1,
      field_title: 'فوتبال'
    }
  },

  {
    match_id: 103,
    sport_field_id: 2,
    host_team_id: 21,
    guest_team_id: 10,

    match_time: '21:00:00',
    match_date: '2026-08-16T21:00:00.000Z',

    contract_uploaded: false,
    match_result: null,
    match_winner_team_id: null,

    match_province_id: 7,
    match_city_id: 1,

    match_type: 'casual',
    match_location_address: 'تهران، سالن آزادی',

    match_location_lat: null,
    match_location_lng: null,

    description: 'بازی دوستانه',
    total_requests: 0,

    host_points: 0,
    guest_points: 0,

    status: 'active',
    seen: false,
    banned: false,

    createdAt: '2026-08-03T10:00:00.000Z',
    updatedAt: '2026-08-03T10:00:00.000Z',

    viewer_count: 5,

    host_team: {
      team_id: 21,
      team_name: 'پرسپولیس ایران',
      logo: null
    },

    guest_team: {
      team_id: 10,
      team_name: 'جوان تهران',
      logo: {
        image_url: '/images/teams/javan.png'
      }
    },

    city_match: {
      city_id: 1,
      city_title: 'تهران'
    },

    province_match: {
      province_id: 7,
      province_title: 'تهران'
    },

    match_sport: {
      sport_field_id: 2,
      field_title: 'فوتبال سالنی'
    }
  }
];
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Layout Client Component */}

      {<MatchListLayout >
        <Box sx={{p:1}}>
         <UpcomingMatchesCarousel matches={testMatches}/>
         </Box>
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