import SubLayout from '@/layout/SubLayout'
import React, { ReactNode } from "react";
import  '@/components/assets/css/directionRTL.css'
interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html>
            <body>
                <SubLayout>
                    {children}
                </SubLayout>
            </body>
        </html>
    );
}
