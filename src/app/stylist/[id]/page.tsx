import React from 'react';
import { stylists } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface StylistDetailPageProps {
  params: { id: string };
}

const StylistDetailPage: React.FC<StylistDetailPageProps> = ({ params }) => {
  const stylistId = parseInt(params.id, 10);
  const stylist = stylists.find(s => s.id === stylistId);

  if (!stylist) {
    notFound(); // 美容師が見つからない場合は404ページを表示
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* プロフィール画像 (仮) */}
          {/* <Image 
            src={stylist.imageUrl} 
            alt={stylist.name} 
            width={200} 
            height={200} 
            className="rounded-full object-cover w-48 h-48"
          /> */}
          <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-6xl font-bold">
            {stylist.name.charAt(0)}
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{stylist.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{stylist.salon} ({stylist.area})</p>
            <p className="text-lg text-pink-500 mt-2">得意なスタイル: {stylist.style}</p>
            <p className="text-lg text-gray-700 mt-2">料金目安: ¥{stylist.price.toLocaleString()}〜</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">自己紹介</h2>
          <p className="text-gray-700 leading-relaxed">{stylist.bio}</p>
        </div>

        {/* 今後の追加要素のプレースホルダー */}
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ギャラリー (施術例)</h2>
          <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
            <p>ここに施術例の画像や動画が表示されます。</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">お客様の声</h2>
          <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
            <p>ここにお客様からのレビューが表示されます。</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-pink-500 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-600 transition-colors">
            この美容師に予約する (仮)
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistDetailPage;
