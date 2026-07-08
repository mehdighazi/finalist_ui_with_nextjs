"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { hostAddress } from '@/components/api/api';
import TopSectionUnified from "@/components/ui-component/utilities/profilePageTopSection";

// ----------------------------------------------------------------------

// تعریف اینترفیس برای پروپ‌های ورودی کامپوننت
interface TeamProfileTopSectionProps {
    teamInfo: any; // اگر ساختار دقیقی از دیتا داری می‌توانی جایگزین any کنی، مثل Record<string, any>
}

// ----------------------------------------------------------------------

const TeamProfileTopSection: React.FC<TeamProfileTopSectionProps> = ({ teamInfo }) => {
    const searchParams = useSearchParams(); 

    return (
        <TopSectionUnified
            type="team"
            info={teamInfo}
            id={searchParams.get('tid') || ""}  // برای جلوگیری از مقدار null، پیش‌فرض رشته خالی قرار گرفت
            hostAddress={hostAddress}
        />
    );
};

export default TeamProfileTopSection;