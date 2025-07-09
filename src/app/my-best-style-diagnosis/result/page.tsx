"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { stylists } from '@/lib/data';

// 診断ロジックの定義
// 実際のAIロジックはもっと複雑になりますが、ここでは簡易的なマッピングを行います。
const getDiagnosisResult = (answers: { [key: number]: string }) => {
  let suggestedStyle = {
    name: 'あなたにぴったりのスタイル',
    imageUrl: '/images/suggested-style-natural-bob.jpg', // デフォルト
    description: 'あなたの個性と魅力を引き出す、特別なヘアスタイルです。'
  };
  let recommendedStylistIds: number[] = [];
  let explanation = []; // 説明文を格納する配列

  // 質問1: ファッションスタイル
  switch (answers[1]) {
    case 'casual':
      suggestedStyle.name = 'リラックスカジュアルボブ';
      suggestedStyle.imageUrl = '/images/suggested-style-natural-bob.jpg';
      explanation.push('あなたのカジュアルなファッションスタイルに合わせ、リラックス感のあるボブがおすすめです。');
      recommendedStylistIds = stylists.filter(s => s.taste === 'ナチュラル').map(s => s.id);
      break;
    case 'elegant':
      suggestedStyle.name = 'エレガントウェーブロング';
      suggestedStyle.imageUrl = '/images/suggested-style-elegant-long.jpg';
      explanation.push('エレガントなファッションスタイルには、ツヤと動きのあるロングウェーブがあなたの魅力を引き立てます。');
      recommendedStylistIds = stylists.filter(s => s.taste === 'フェミニン').map(s => s.id);
      break;
    case 'mode':
      suggestedStyle.name = 'エッジィモードショート';
      suggestedStyle.imageUrl = '/images/suggested-style-mode-short.jpg';
      explanation.push('個性派のあなたには、シャープなラインと動きのあるモードなショートがぴったりです。');
      recommendedStylistIds = stylists.filter(s => s.taste === 'クール').map(s => s.id);
      break;
    case 'feminine':
      suggestedStyle.name = 'ふんわりフェミニンミディアム';
      suggestedStyle.imageUrl = '/images/suggested-style-feminine-medium.jpg';
      explanation.push('フェミニンなファッションスタイルには、柔らかい質感のミディアムスタイルがあなたの可愛らしさを際立たせます。');
      recommendedStylistIds = stylists.filter(s => s.taste === 'フェミニン').map(s => s.id);
      break;
  }

  // 質問4: 顔の形による補正と説明
  switch (answers[4]) {
    case 'oval':
      explanation.push('卵型のお顔立ちなので、どんなスタイルも似合いやすいですが、特にバランスの取れたスタイルがおすすめです。');
      break;
    case 'round':
      explanation.push('丸顔さんには、縦のラインを強調したり、顔周りに動きを出すことで、すっきりとした印象になります。');
      break;
    case 'long':
      explanation.push('面長さんには、横のボリュームを出したり、前髪でバランスを取ることで、顔の長さをカバーし、小顔効果が期待できます。');
      break;
    case 'square':
      explanation.push('ベース型・エラ張りさんには、顔周りの髪でエラをカバーしたり、トップにボリュームを出すことで、柔らかい印象になります。');
      break;
    case 'heart':
      explanation.push('逆三角形・ハート型さんには、顎周りにボリュームを持たせることで、全体のバランスが整います。');
      break;
  }

  // 質問5: 髪質による補正と説明
  switch (answers[5]) {
    case 'straight_flat':
      explanation.push('直毛でペタッとしやすい髪質なので、パーマやレイヤーで動きを出すと、よりスタイルが活きてきます。');
      recommendedStylistIds = recommendedStylistIds.concat(stylists.filter(s => s.specialties.includes('パーマ')).map(s => s.id));
      break;
    case 'wavy_frizz':
      explanation.push('くせ毛で広がりやすい髪質なので、髪質改善や縮毛矯正、あるいはくせを活かしたスタイルが得意な美容師がおすすめです。');
      recommendedStylistIds = recommendedStylistIds.concat(stylists.filter(s => s.specialties.includes('髪質改善') || s.specialties.includes('縮毛矯正')).map(s => s.id));
      break;
    case 'thick_voluminous':
      explanation.push('硬くて量が多い髪質なので、毛量調整や質感調整が得意な美容師を選ぶと、扱いやすくなります。');
      break;
    case 'fine_soft':
      explanation.push('細くて柔らかい髪質なので、ボリュームアップやふんわり感を出すカット、パーマが得意な美容師がおすすめです。');
      recommendedStylistIds = recommendedStylistIds.concat(stylists.filter(s => s.specialties.includes('パーマ')).map(s => s.id));
      break;
  }

  // 質問3: ヘアケアにかける時間による補正と説明
  switch (answers[3]) {
    case 'short_time':
      explanation.push('ヘアケアに時間をかけたくないあなたには、乾かすだけでまとまる、再現性の高いスタイルが最適です。');
      break;
    case 'medium_time':
      explanation.push('少しなら時間をかけられるあなたには、簡単なスタイリングで決まるスタイルがおすすめです。');
      break;
    case 'long_time':
      explanation.push('時間をかけてもOKなあなたには、トレンドを取り入れた、より凝ったスタイルも挑戦できます。');
      break;
  }

  // 重複を排除してユニークな美容師IDリストを作成
  const uniqueRecommendedStylistIds = [...new Set(recommendedStylistIds)];
  const recommendedStylists = stylists.filter(s => uniqueRecommendedStylistIds.includes(s.id));

  // 最終的な説明文を結合
  suggestedStyle.description = explanation.join(' ');

  return { suggestedStyle, recommendedStylists };
};

const ResultPage = () => {
  const searchParams = useSearchParams();
  const [diagnosisResult, setDiagnosisResult] = useState<ReturnType<typeof getDiagnosisResult> | null>(null);

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const answers = JSON.parse(answersParam);
        setDiagnosisResult(getDiagnosisResult(answers));
      } catch (error) {
        console.error('Failed to parse answers', error);
        setDiagnosisResult(null);
      }
    }
  }, [searchParams]);

  if (!diagnosisResult) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <p className="text-xl text-gray-700">診断結果を読み込み中です...</p>
        <Link href="/my-best-style-diagnosis/quiz" className="text-pink-500 hover:underline mt-4 block">診断をやり直す</Link>
      </div>
    );
  }

  const { suggestedStyle, recommendedStylists } = diagnosisResult;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        <span className="block text-pink-600">あなた史上最高のヘアスタイルはこれ！</span>
      </h1>

      {/* 提案されたヘアスタイル */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 relative aspect-square rounded-lg overflow-hidden shadow-md">
          <Image 
            src={suggestedStyle.imageUrl} 
            alt={suggestedStyle.name} 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{suggestedStyle.name}</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{suggestedStyle.description}</p> {/* 説明文を表示 */}
          <p className="text-sm text-gray-500 mt-4">※これは診断結果に基づく提案イメージです。</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        このスタイルを実現できるおすすめ美容師
      </h2>

      {/* おすすめ美容師リスト */}
      {recommendedStylists.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recommendedStylists.map((stylist) => (
            <Link key={stylist.id} href={`/stylist/${stylist.id}`} legacyBehavior>
              <a className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <Image src={stylist.imageUrl} alt={stylist.name} width={400} height={300} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800">{stylist.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{stylist.salon} / {stylist.area}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{stylist.bio}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-pink-500">¥{stylist.price.toLocaleString()}</span>
                    <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{stylist.style}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      テイスト: {stylist.taste}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {stylist.specialties.slice(0, 2).map((s, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                    {stylist.specialties.length > 2 && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        他{stylist.specialties.length - 2}件
                      </span>
                    )}
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
          <p>申し訳ありません、この条件に合う美容師は見つかりませんでした。</p>
          <Link href="/search" className="text-pink-500 hover:underline mt-4 block">全ての美容師を見る</Link>
        </div>
      )}

      <div className="text-center mt-12">
        <Link href="/my-best-style-diagnosis" legacyBehavior>
          <a className="text-gray-600 hover:underline">
            もう一度診断する
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ResultPage;