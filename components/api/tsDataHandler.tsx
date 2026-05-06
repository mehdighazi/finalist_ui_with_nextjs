// در فایل tsDataHandler.ts
export async function dataHandlerWithFetch(apiUrl: string, method: string, body?: any) {
    try {
        // برای SSR، آدرس کامل را می‌سازیم
        let fullUrl = apiUrl;
        
        // اگر در سرور هستیم و آدرس نسبی است
        if (typeof window === 'undefined' && !apiUrl.startsWith('http')) {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                           process.env.API_URL || 
                           'http://localhost:3000';
            fullUrl = `${baseUrl}${apiUrl.startsWith('/') ? apiUrl : `/${apiUrl}`}`;
        }
        
        console.log('Fetching from SSR:', fullUrl); // برای دیباگ
        
        const response = await fetch(fullUrl, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // افزودن هدرهای مورد نیاز برای احراز هویت در سرور
                ...(process.env.API_TOKEN && { 'Authorization': `Bearer ${process.env.API_TOKEN}` }),
            },
            body: body ? JSON.stringify(body) : undefined,
            // مهم برای SSR - جلوگیری از کش کردن
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('dataHandlerWithFetch error:', error);
        return { error: error, state: -1 };
    }
}