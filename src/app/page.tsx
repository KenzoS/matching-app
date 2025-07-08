import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            あなたにぴったりの美容師を見つけよう
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            AIがあなたの好みや髪の悩みに合わせて、最高の美容師を提案します。
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* User Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-gray-800">お客様はこちら</h3>
            <p className="mt-4 text-gray-600">
              理想のヘアスタイルを叶える美容師を探しましょう。
            </p>
            <Link href="/search" legacyBehavior>
              <a className="mt-6 inline-block bg-pink-500 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-600 transition-colors">
                美容師を探す
              </a>
            </Link>
          </div>

          {/* Stylist Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-gray-800">美容師の方はこちら</h3>
            <p className="mt-4 text-gray-600">
              あなたの技術と魅力を、新しいお客様に届けませんか？
            </p>
            <Link href="/stylist/register" legacyBehavior>
              <a className="mt-6 inline-block bg-gray-800 text-white font-bold rounded-full px-8 py-3 hover:bg-gray-900 transition-colors">
                美容師として登録
              </a>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500">
          <p>&copy; 2025 FindYourStylist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}