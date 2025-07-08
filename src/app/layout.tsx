import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Interフォントをインポート
import "./globals.css";
import AuthButtons from "@/components/AuthButtons"; // AuthButtonsをインポート
import Link from "next/link"; // Linkをインポート

const inter = Inter({ subsets: ["latin"] }); // Interフォントを初期化

export const metadata: Metadata = {
  title: "FindYourStylist", // タイトルを修正
  description: "あなたにぴったりの美容師を見つけよう", // 説明を修正
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> {/* 言語を日本語に設定 */}
      <body className={inter.className}> {/* Interフォントを適用 */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold text-gray-800">
                FindYourStylist
              </a>
            </Link>
            <AuthButtons /> {/* AuthButtonsコンポーネントを配置 */}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}