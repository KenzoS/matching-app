"use client";

import React from 'react';
import { stylists } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';

const StylistDetailPage = () => {
  const params = useParams();
  const stylistId = parseInt(params.id as string, 10);
  const stylist = stylists.find(s => s.id === stylistId);

  if (!stylist) {
    notFound(); // 美容師が見つからない場合は404ページを表示
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* プロフィール概要セクション */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-gray-200">
          <Image 
            src={stylist.imageUrl} 
            alt={stylist.name} 
            width={200} 
            height={200} 
            className="rounded-full object-cover w-48 h-48 border-4 border-pink-300 shadow-md"
          />

          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-bold text-gray-800">{stylist.name}</h1>
            <p className="text-xl text-gray-600 mt-2">{stylist.salon} ({stylist.area})</p>
            <p className="text-lg text-pink-500 mt-2">得意なスタイル: {stylist.style}</p>
            <p className="text-lg text-gray-700 mt-2">料金目安: ¥{stylist.price.toLocaleString()}〜</p>
            <p className="text-lg text-gray-700 mt-2">得意なテイスト: {stylist.taste}</p>
            
            {/* 専門技術を表示 */}
            <div className="mt-4">
              <h3 className="text-md font-semibold text-gray-800 mb-2">専門技術・悩み解決:</h3>
              <div className="flex flex-wrap gap-2">
                {stylist.specialties.map((s, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 自己紹介セクション */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">自己紹介</h2>
          <p className="text-gray-700 leading-relaxed">{stylist.bio}</p>
        </div>

        {/* サロンギャラリーセクションを追加 */}
        {stylist.salonImages && stylist.salonImages.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">サロンギャラリー</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stylist.salonImages.map((image, index) => (
                <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={image}
                    alt={`${stylist.salon} 内装 ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ギャラリー (施術例) セクション */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">ギャラリー (施術例)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* ダミー画像を表示 */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm"> {/* h-48 を aspect-square に変更 */}
                <Image 
                  src={`/images/sample-work${i}.jpg`}
                  alt={`施術例 ${i}`} 
                  layout="fill" 
                  objectFit="cover" 
                  className="hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white text-lg font-bold opacity-0 hover:opacity-100 transition-opacity">
                  施術例 {i}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-4">※これはダミーの施術例です。</p>
        </div>

        {/* 第三者評価セクション */}
        {stylist.thirdPartyEvaluationScore && ( // スコアが存在する場合のみ表示
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">第三者評価</h2>
            <div className="bg-pink-50 p-6 rounded-lg text-gray-700 border border-pink-200">
              <p className="text-lg font-semibold mb-2">
                総合評価: <span className="text-pink-600 text-2xl">{stylist.thirdPartyEvaluationScore}</span> / 5.0
              </p>
              {stylist.thirdPartyEvaluationComments && stylist.thirdPartyEvaluationComments.length > 0 && (
                <>
                  <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">評価コメント:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {stylist.thirdPartyEvaluationComments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                </>
              )}
              <p className="text-center text-gray-500 mt-4">※この評価は同業の専門家によるものです。</p>
            </div>
          </div>
        )}

        {/* お客様の声セクション */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">お客様の声</h2>
          <div className="bg-gray-50 p-6 rounded-lg text-gray-700 border border-gray-200">
            <p className="italic">「いつも理想通りの仕上がりにしてくれます！特にカラーのセンスが抜群です。」 - 〇〇様</p>
            <p className="italic mt-2">「髪の悩みを親身に聞いてくれて、的確なアドバイスをくれるので安心してお任せできます。」 - △△様</p>
            <p className="text-center text-gray-500 mt-4">※これはダミーのお客様の声です。</p>
          </div>
        </div>

        {/* 予約ボタン */}
        <div className="mt-12 text-center">
          <button className="bg-pink-500 text-white font-bold rounded-full px-12 py-4 text-xl hover:bg-pink-600 transition-colors shadow-lg">
            この美容師に予約する (仮)
          </button>
        </div>
      </div>
    </div>
  );
};

export default StylistDetailPage;