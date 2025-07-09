"use client";

import React from 'react';
import Link from 'next/link';

const MyBestStyleDiagnosisPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-pink-100 to-purple-100 p-6 text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
        <span className="block text-pink-600">AIと専門家が導く</span>
        <span className="block">あなた史上最高のヘアスタイル診断</span>
      </h1>
      <p className="text-xl text-gray-700 max-w-2xl mb-8">
        いくつかの簡単な質問に答えるだけで、あなたの個性や魅力を最大限に引き出す、まだ見ぬ最高のヘアスタイルと、それを実現する美容師に出会えます。
      </p>
      <Link href="/my-best-style-diagnosis/quiz" legacyBehavior>
        <a className="bg-pink-500 text-white font-bold rounded-full px-10 py-4 text-xl hover:bg-pink-600 transition-colors shadow-lg transform hover:scale-105">
          診断を始める
        </a>
      </Link>
      <p className="text-sm text-gray-500 mt-4">
        ※この診断は、あなたの「探す負担を極力減らす」ために設計されています。
      </p>
    </div>
  );
};

export default MyBestStyleDiagnosisPage;
