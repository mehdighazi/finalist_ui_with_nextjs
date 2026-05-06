import Image from "next/image";

// اگر واقعاً به params نیاز داری (کمتر رایج برای صفحه اصلی)
type PageProps = {
  params?: Promise<Record<string, never>>; // پارامتری وجود ندارد
};

export default function Home({ params }: PageProps) {
  // params استفاده نمی‌شود
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h5 className="">
           صفحه اول
          </h5>
         
        </div>
       
      </main>
    </div>
  );
}
