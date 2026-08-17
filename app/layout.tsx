import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://french.tudencafe.com"),

  title: {
    default: "Từ Đến French | Cùng đi học tiếng Pháp",
    template: "%s | Từ Đến French",
  },

  description:
    "Từ Đến French – cùng bé khám phá tiếng Pháp qua những bài học nhỏ, vui và dễ nhớ. Một chuyến đi nhỏ bắt đầu từ hôm nay.",

  keywords: [
    "học tiếng Pháp",
    "tiếng Pháp cho trẻ em",
    "học tiếng Pháp cho bé",
    "tiếng Pháp lớp 1",
    "học tiếng Pháp online",
    "Từ Đến French",
  ],

  applicationName: "Từ Đến French",

  authors: [{ name: "Từ Đến" }],
  creator: "Từ Đến",
  publisher: "Từ Đến",

  alternates: {
    canonical: "https://french.tudencafe.com",
  },

  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://french.tudencafe.com",
    siteName: "Từ Đến French",
    title: "Từ Đến French | Cùng đi học tiếng Pháp",
    description:
      "Một chuyến đi nhỏ bắt đầu từ hôm nay. Cùng bé khám phá tiếng Pháp từng bước một.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Từ Đến French – Cùng đi học tiếng Pháp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Từ Đến French | Cùng đi học tiếng Pháp",
    description:
      "Cùng bé khám phá tiếng Pháp qua những bài học nhỏ, vui và dễ nhớ.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}