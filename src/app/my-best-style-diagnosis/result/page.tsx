"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { stylists, suggestedHairstyles, SuggestedHairstyle, Stylist } from '@/lib/data';
import { calculateDistance } from '@/lib/utils';

// 診断ロジックの定義
const getDiagnosisResult = (answers: { [key: number]: string }) => {
  const userProfile = {
    fashionStyle: answers[1],
    hairConcern: answers[2],
    timeCommitment: answers[3],
    faceShape: answers[4],
    hairQuality: answers[5],
    salonAtmosphere: answers[6],
    communicationStyle: answers[7],
    stylistGenderPreference: answers[9], // 新しく追加した美容師の性別の好み
  };

  // 1. ヘアスタイル提案ロジック（既存のものを活用）
  const matchedHairstyles: SuggestedHairstyle[] = [];
  suggestedHairstyles.forEach(style => {
    let score = 0;
    let explanationParts: string[] = [];

    if (style.suitableFor.fashionStyle?.includes(userProfile.fashionStyle)) {
      score += 2;
      explanationParts.push(`あなたの${userProfile.fashionStyle === 'casual' ? 'カジュアル' : userProfile.fashionStyle === 'elegant' ? 'エレガント' : userProfile.fashionStyle === 'mode' ? 'モード' : 'フェミニン'}なファッションスタイルにマッチします。`);
    }
    if (style.suitableFor.faceShape?.includes(userProfile.faceShape)) {
      score += 3;
      switch (userProfile.faceShape) {
        case 'oval': explanationParts.push('卵型のお顔立ちなので、どんなスタイルも似合いやすいですが、特にバランスの取れたスタイルがおすすめです。'); break;
        case 'round': explanationParts.push('丸顔さんには、縦のラインを強調したり、顔周りに動きを出すことで、すっきりとした印象になります。'); break;
        case 'long': explanationParts.push('面長さんには、横のボリュームを出したり、前髪でバランスを取ることで、顔の長さをカバーし、小顔効果が期待できます。'); break;
        case 'square': explanationParts.push('ベース型・エラ張りさんには、顔周りの髪でエラをカバーしたり、トップにボリュームを出すことで、柔らかい印象になります。'); break;
        case 'heart': explanationParts.push('逆三角形・ハート型さんには、顎周りにボリュームを持たせることで、全体のバランスが整います。'); break;
      }
    }
    if (style.suitableFor.hairQuality?.includes(userProfile.hairQuality)) {
      score += 2;
      switch (userProfile.hairQuality) {
        case 'straight_flat': explanationParts.push('直毛でペタッとしやすい髪質でも、動きを出しやすいスタイルです。'); break;
        case 'wavy_frizz': explanationParts.push('くせ毛で広がりやすい髪質を活かしたり、扱いやすくするのに適しています。'); break;
        case 'thick_voluminous': explanationParts.push('硬くて量が多い髪質でも、軽さやまとまりを出しやすいスタイルです。'); break;
        case 'fine_soft': explanationParts.push('細くて柔らかい髪質でも、ボリュームアップやふんわり感を出しやすいスタイルです。'); break;
      }
    }
    if (style.suitableFor.timeCommitment?.includes(userProfile.timeCommitment)) {
      score += 1;
      explanationParts.push(`あなたの${userProfile.timeCommitment === 'short_time' ? 'ヘアケアに時間をかけたくない' : userProfile.timeCommitment === 'medium_time' ? '少しなら時間をかけられる' : '時間をかけてもOKな'}ライフスタイルにフィットします。`);
    }

    if (score > 0) {
      matchedHairstyles.push({ ...style, score: score, description: explanationParts.join(' ') || style.description });
    }
  });

  matchedHairstyles.sort((a, b) => (b as any).score - (a as any).score);
  const top3Hairstyles = matchedHairstyles.slice(0, 3);

  // 2. 美容師のマッチ度スコアリングと理由生成ロジック
  // ユーザーの現在地（仮）- 東京駅
  const userLocation = { latitude: 35.681236, longitude: 139.767125 };

  const recommendedStylists = stylists.map(stylist => {
    let matchScore = 0;
    const matchReasons: string[] = [];

    // 距離を計算してstylistオブジェクトに追加
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      stylist.latitude,
      stylist.longitude
    );

    // テイストの一致 (重要度: 高)
    if (stylist.taste === userProfile.fashionStyle) {
      matchScore += 30;
      matchReasons.push(`あなたのファッション（${stylist.taste}）と得意なテイストが一致`);
    }

    // 髪の悩みに対応できるか (重要度: 高)
    if (userProfile.hairConcern === 'damage' && stylist.specialties.includes('トリートメント')) {
      matchScore += 25;
      matchReasons.push('ダメージケアが得意です');
    }
    if (userProfile.hairConcern === 'frizz' && (stylist.specialties.includes('髪質改善') || stylist.specialties.includes('縮毛矯正'))) {
      matchScore += 25;
      matchReasons.push('うねりや広がりを抑えるのが得意です');
    }
    if (userProfile.hairConcern === 'flat' && stylist.specialties.includes('パーマ')) {
      matchScore += 25;
      matchReasons.push('ボリュームアップさせるパーマが得意です');
    }

    // サロンの雰囲気 (重要度: 中)
    if (stylist.salonAtmosphere === userProfile.salonAtmosphere) {
      matchScore += 20;
      matchReasons.push('ご希望のサロンの雰囲気と合っています');
    }

    // コミュニケーションスタイル (重要度: 中)
    if (stylist.communicationStyle === userProfile.communicationStyle) {
      matchScore += 15;
      matchReasons.push('ご希望のコミュニケーションスタイルと一致');
    }
    
    // 提案されたヘアスタイルが作れるか (重要度: 低)
    const canCreateStyle = top3Hairstyles.some(style => {
        const styleCategory = style.name.includes('ショート') ? 'ショート' : style.name.includes('ミディアム') ? 'ミディアム' : style.name.includes('ロング') ? 'ロング' : 'メンズ';
        return stylist.style.includes(styleCategory);
    });
    if (canCreateStyle) {
        matchScore += 10;
        matchReasons.push('提案されたヘアスタイルが制作可能です');
    }

    // 第三者評価スコアをマッチングロジックに組み込む (重要度: 高)
    if (stylist.thirdPartyEvaluationScore) {
      matchScore += stylist.thirdPartyEvaluationScore * 5; // 例: スコア1点につき5点加算
      matchReasons.push(`第三者評価で高評価（${stylist.thirdPartyEvaluationScore}点）`);
    }

    return { ...stylist, matchScore, matchReasons, distance }; // 距離も返す
  })
  .filter(stylist => stylist.matchScore > 0) // スコアが0以上の美容師のみを対象
  .filter(stylist => { // 美容師の性別でフィルタリング
    if (userProfile.stylistGenderPreference === 'any') {
      return true;
    }
    return stylist.gender === userProfile.stylistGenderPreference;
  })
  .sort((a, b) => b.matchScore - a.matchScore); // スコアの高い順にソート

  return { suggestedHairstyles: top3Hairstyles, recommendedStylists };
};

// スコアを円グラフで表示するコンポーネント
const ScoreCircle = ({ score }: { score: number }) => {
  const percentage = Math.min(100, Math.max(0, score));
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className="text-pink-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-pink-600">{percentage}</span>
        <span className="text-xs font-bold text-pink-600">%</span>
      </div>
    </div>
  );
};

const LineCtaSection = () => {
  const lineUrl = "https://lin.ee/37l48Nl";
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg shadow-lg p-8 my-12 text-center">
      <h2 className="text-3xl font-extrabold mb-3">診断結果をLINEに保存しませんか？</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        「友だち追加」するだけで、今回の診断結果があなたのLINEに送信されます。
        いつでも簡単に見返せるだけでなく、あなたにオススメの美容師の限定情報などもお届けします！
      </p>
      <a 
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-green-500 font-bold rounded-full px-10 py-4 text-xl hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-105"
      >
        ＞＞ LINEで診断結果を受け取る ＜＜
      </a>
    </div>
  )
}


const ResultPage = () => {
  const searchParams = useSearchParams();
  const [diagnosisResult, setDiagnosisResult] = useState<ReturnType<typeof getDiagnosisResult> | null>(null);

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (answersParam) {
      try {
        const answers = JSON.parse(answersParam);
        // data.tsから最新のstylistsデータを渡す
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
        あなたとの相性抜群！おすすめ美容師
      </h2>

      {recommendedStylists.length > 0 ? (
        <div className="space-y-8">
          {recommendedStylists.slice(0, 3).map((stylist, index) => (
            <div key={stylist.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Left side: Image and Basic Info */}
                <div className="md:w-1/3 relative">
                  <Image src={stylist.imageUrl} alt={stylist.name} width={400} height={400} className="w-full h-full object-cover" />
                   <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-2xl font-bold px-3 py-1 rounded">
                    {index + 1}位
                  </div>
                </div>
                
                {/* Middle: Details */}
                <div className="md:w-1/2 p-6 flex flex-col">
                  <h3 className="text-2xl font-bold text-gray-800">{stylist.name}</h3>
                  <p className="text-md text-gray-500 mb-3">
                    {stylist.salon} / {stylist.area}
                    {stylist.distance !== null && (
                      <span className="ml-2 font-bold text-pink-600">現在地から約{stylist.distance}km</span>
                    )}
                  </p>
                  <p className="text-gray-700 mb-4 flex-grow line-clamp-3">{stylist.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                      テイスト: {stylist.taste}
                    </span>
                     <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">{stylist.style}</span>
                  </div>
                   <div className="flex flex-wrap gap-1 mt-2">
                    {stylist.specialties.map((s, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Match Score and Reasons */}
                <div className="md:w-1/3 bg-pink-50 p-6 flex flex-col items-center justify-center border-l border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">あなたとのマッチ度</h4>
                  <ScoreCircle score={stylist.matchScore} />
                  {stylist.thirdPartyEvaluationScore && (
                    <p className="text-sm text-gray-600 mt-2">
                      第三者評価: <span className="font-bold text-pink-600">{stylist.thirdPartyEvaluationScore}</span> / 5.0
                    </p>
                  )}
                  <div className="mt-4 text-left w-full">
                    <h5 className="text-sm font-bold text-gray-600 mb-2">マッチの理由:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {stylist.matchReasons.slice(0, 3).map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                   <Link href={`/stylist/${stylist.id}`} legacyBehavior>
                    <a className="mt-4 bg-pink-500 text-white font-bold rounded-full px-6 py-2 text-center hover:bg-pink-600 transition-colors shadow-md w-full">
                      詳細を見る
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
          <p>申し訳ありません、この条件に合う美容師は見つかりませんでした。</p>
          <Link href="/search" className="text-pink-500 hover:underline mt-4 block">全ての美容師を見る</Link>
        </div>
      )}

      {/* LINE CTA Section */}
      <LineCtaSection />

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