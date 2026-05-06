import Image from "next/image";
// app/[filters]/page.tsx (یا مسیر مناسب)

type PageProps = {
  params: Promise<{
    filters?: string[];
  }>;
};

export default async function Home({ params }: PageProps) {
  // await کردن params
  const { filters } = await params;
  
  // گرفتن مقادیر v, b, c
  const [v, b, c] = filters || [];
  
  console.log("V:", v); // در ترمینال سرور نمایش داده می‌شود
  console.log("B:", b);
  console.log("C:", c);
  
  // نمایش در صفحه برای تست
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-base font-medium">
            HI - Dynamic Route Example
          </h1>
          <div className="text-sm text-gray-500">
            <p>Filters from URL: {filters?.join(', ') || 'None'}</p>
            <p>V: {v || 'Not set'}</p>
            <p>B: {b || 'Not set'}</p>
            <p>C: {c || 'Not set'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {/* بقیه کدت */}
        </div>
      </main>
    </div>
  );
}