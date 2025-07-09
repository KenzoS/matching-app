"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { stylists, suggestedHairstyles, SuggestedHairstyle } from '@/lib/data'; // suggestedHairstylesをインポート

// 診断ロジックの定義
const getDiagnosisResult = (answers: { [key: number]: string }) => {
  const userProfile = {
    fashionStyle: answers[1],
    hairConcern: answers[2],
    timeCommitment: answers[3],
    faceShape: answers[4],
    hairQuality: answers[5],
  };

  const matchedHairstyles: SuggestedHairstyle[] = [];
  const recommendedStylistIds: number[] = [];

  // 各提案スタイルがユーザーのプロファイルにどれだけ適合するかをスコアリング
  suggestedHairstyles.forEach(style => {
    let score = 0;
    let explanationParts: string[] = [];

    // ファッションスタイル
    if (style.suitableFor.fashionStyle?.includes(userProfile.fashionStyle)) {
      score += 2;
      explanationParts.push(`あなたの${userProfile.fashionStyle === 'casual' ? 'カジュアル' : userProfile.fashionStyle === 'elegant' ? 'エレガント' : userProfile.fashionStyle === 'mode' ? 'モード' : 'フェミニン'}なファッションスタイルにマッチします。`);
    }

    // 顔の形
    if (style.suitableFor.faceShape?.includes(userProfile.faceShape)) {
      score += 3; // 顔の形は重要度高め
      switch (userProfile.faceShape) {
        case 'oval': explanationParts.push('卵型のお顔立ちなので、どんなスタイルも似合いやすいですが、特にバランスの取れたスタイルがおすすめです。'); break;
        case 'round': explanationParts.push('丸顔さんには、縦のラインを強調したり、顔周りに動きを出すことで、すっきりとした印象になります。'); break;
        case 'long': explanationParts.push('面長さんには、横のボリュームを出したり、前髪でバランスを取ることで、顔の長さをカバーし、小顔効果が期待できます。'); break;
        case 'square': explanationParts.push('ベース型・エラ張りさんには、顔周りの髪でエラをカバーしたり、トップにボリュームを出すことで、柔らかい印象になります。'); break;
        case 'heart': explanationParts.push('逆三角形・ハート型さんには、顎周りにボリュームを持たせることで、全体のバランスが整います。'); break;
      }
    }

    // 髪質
    if (style.suitableFor.hairQuality?.includes(userProfile.hairQuality)) {
      score += 2;
      switch (userProfile.hairQuality) {
        case 'straight_flat': explanationParts.push('直毛でペタッとしやすい髪質でも、動きを出しやすいスタイルです。'); break;
        case 'wavy_frizz': explanationParts.push('くせ毛で広がりやすい髪質を活かしたり、扱いやすくするのに適しています。'); break;
        case 'thick_voluminous': explanationParts.push('硬くて量が多い髪質でも、軽さやまとまりを出しやすいスタイルです。'); break;
        case 'fine_soft': explanationParts.push('細くて柔らかい髪質でも、ボリュームアップやふんわり感を出しやすいスタイルです。'); break;
      }
    }

    // ヘアケア時間
    if (style.suitableFor.timeCommitment?.includes(userProfile.timeCommitment)) {
      score += 1;
      explanationParts.push(`あなたの${userProfile.timeCommitment === 'short_time' ? 'ヘアケアに時間をかけたくない' : userProfile.timeCommitment === 'medium_time' ? '少しなら時間をかけられる' : '時間をかけてもOKな'}ライフスタイルにフィットします。`);
    }

    // スコアが一定以上であれば候補に追加
    if (score > 0) { // 最低1つは適合
      matchedHairstyles.push({ ...style, score: score, description: explanationParts.join(' ') || style.description }); // スコアを追加
    }
  });

  // スコアの高い順にソートし、上位3つを提案
  matchedHairstyles.sort((a, b) => (b as any).score - (a as any).score); // スコアでソート

  const top3Hairstyles = matchedHairstyles.slice(0, 3);

  // 提案されたスタイルに合う美容師を抽出
  top3Hairstyles.forEach(style => {
    // スタイル名やテイスト、専門技術から美容師を推薦
    const stylistsForStyle = stylists.filter(s => 
      s.style.includes(style.name.includes('ショート') ? 'ショート' : style.name.includes('ミディアム') ? 'ミディアム' : style.name.includes('ロング') ? 'ロング' : 'メンズ') ||
      s.taste === style.suitableFor.fashionStyle?.[0] || // 簡易的にファッションスタイルとテイストを紐付け
      style.suitableFor.hairQuality?.some(hq => {
        if (hq === 'wavy_frizz' && (s.specialties.includes('髪質改善') || s.specialties.includes('縮毛矯正'))) return true;
        if (hq === 'straight_flat' && s.specialties.includes('パーマ')) return true;
        if (hq === 'fine_soft' && s.specialties.includes('パーマ')) return true;
        return false;
      })
    ).map(s => s.id);
    recommendedStylistIds.push(...stylistsForStyle);
  });

  // 重複を排除してユニークな美容師IDリストを作成
  const uniqueRecommendedStylistIds = [...new Set(recommendedStylistIds)];
  const recommendedStylists = stylists.filter(s => uniqueRecommendedStylistIds.includes(s.id));

  return { suggestedHairstyles: top3Hairstyles, recommendedStylists };
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

  const { suggestedHairstyles, recommendedStylists } = diagnosisResult;
  const topRecommendation = suggestedHairstyles[0];
  const otherSuggestions = suggestedHairstyles.slice(1);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        <span className="block text-pink-600">あなた史上最高のヘアスタイルはこれ！</span>
      </h1>

      {/* 最もおすすめのヘアスタイル */}
      {topRecommendation ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12 flex flex-col md:flex-row items-center gap-8 border-4 border-pink-400 relative">
          <span className="absolute top-0 left-0 bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-br-lg">あなたへのおすすめ！</span>
          <div className="w-full md:w-1/2 relative aspect-square rounded-lg overflow-hidden shadow-md">
            <Image 
              src={topRecommendation.imageUrl} 
              alt={topRecommendation.name} 
              layout="fill" 
              objectFit="cover" 
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{topRecommendation.name}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{topRecommendation.description}</p>
            <p className="text-sm text-gray-500 mt-4">※これは診断結果に基づく提案イメージです。</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500 mb-12">
          <p>申し訳ありません、あなたに合うヘアスタイルは見つかりませんでした。</p>
        </div>
      )}

      {/* その他の提案 */}
      {otherSuggestions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">その他の提案</h2>
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
            {otherSuggestions.map((style) => (
              <div key={style.id} className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md mb-4">
                  <Image 
                    src={style.imageUrl} 
                    alt={style.name} 
                    layout="fill" 
                    objectFit="cover" 
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{style.name}</h3>
                <p className="text-md text-gray-700 leading-relaxed line-clamp-3">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

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