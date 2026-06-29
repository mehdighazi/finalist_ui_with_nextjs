
import CustomBottomNavigation from '@/components/ui-component/bottomNavigation'
import React, { ReactNode } from "react";
interface RootLayoutProps {
    children: ReactNode;
}
export default function Layout({ children }: RootLayoutProps) {
    return (
        <>
            {children}
          
            <CustomBottomNavigation />
        </>
    )
}
