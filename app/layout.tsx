import SubLayout from '@/layout/SubLayout'
import React, { ReactNode } from "react";
import '@/components/assets/css/directionRTL.css'
import RootStyleRegistry from './registry';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html>
            <body>
                <RootStyleRegistry>
                    <SubLayout>
                    {children}
                    </SubLayout>
               </RootStyleRegistry>
               
            </body>
        </html>
    );
}
