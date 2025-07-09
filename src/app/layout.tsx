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
    <html lang="ja" className="min-h-full flex flex-col"> {/* htmlにflexboxを適用 */}
      <body className={`${inter.className} flex-grow flex flex-col`}> {/* bodyにもflexboxを適用し、flex-growでコンテンツ領域を確保 */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" legacyBehavior>
              <a className="text-2xl font-bold text-gray-800">
                FindYourStylist
              </a>
            </Link>
            <AuthButtons />
          </nav>
        </header>
        <main className="flex-grow"> {/* mainタグを追加し、flex-growでコンテンツ領域を確保 */}
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 mt-auto"> {/* mt-autoでフッターを最下部に固定 */}
          <div className="container mx-auto px-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} FindYourStylist. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/privacy-policy" legacyBehavior>
                <a className="hover:underline">プライバシーポリシー</a>
              </Link>
              <Link href="/terms-of-service" legacyBehavior>
                <a className="hover:underline">利用規約</a>
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}