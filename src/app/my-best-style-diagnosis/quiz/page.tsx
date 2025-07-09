"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// 診断の質問データ
const questions = [
  {
    id: 1,
    question: '普段のファッションスタイルは？',
    options: [
      { text: 'シンプル・カジュアル', value: 'casual' },
      { text: 'エレガント・きれいめ', value: 'elegant' },
      { text: '個性派・モード', value: 'mode' },
      { text: 'フェミニン・可愛い系', value: 'feminine' },
    ],
  },
  {
    id: 2,
    question: '髪の悩みで最も気になることは？',
    options: [
      { text: 'パサつき・ダメージ', value: 'damage' },
      { text: '広がり・うねり', value: 'frizz' },
      { text: 'ボリュームが出ない', value: 'flat' },
      { text: '白髪・薄毛', value: 'aging' },
    ],
  },
  {
    id: 3,
    question: 'ヘアスタイルにかけられる時間は？',
    options: [
      { text: 'ほとんどかけたくない', value: 'short_time' },
      { text: '少しならかけられる', value: 'medium_time' },
      { text: '時間をかけてもOK', value: 'long_time' },
    ],
  },
  { // 新しい質問1: 顔の形
    id: 4,
    question: 'あなたの顔の形に最も近いのは？',
    options: [
      { text: '卵型', value: 'oval' },
      { text: '丸顔', value: 'round' },
      { text: '面長', value: 'long' },
      { text: 'ベース型・エラ張り', value: 'square' },
      { text: '逆三角形・ハート型', value: 'heart' },
    ],
  },
  { // 新しい質問2: 髪質
    id: 5,
    question: 'あなたの髪質に最も近いのは？',
    options: [
      { text: '直毛でペタッとしやすい', value: 'straight_flat' },
      { text: 'くせ毛で広がりやすい', value: 'wavy_frizz' },
      { text: '硬くて量が多い', value: 'thick_voluminous' },
      { text: '細くて柔らかい', value: 'fine_soft' },
    ],
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const router = useRouter();

  const handleOptionChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 全ての質問に答えたら結果ページへ遷移
      // ここで回答を元に診断ロジックを走らせ、結果を渡す
      router.push(`/my-best-style-diagnosis/result?answers=${JSON.stringify(answers)}`);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          質問 {currentQuestionIndex + 1} / {questions.length}
        </h2>
        <p className="text-xl text-gray-700 mb-8 text-center">
          {currentQuestion.question}
        </p>

        <div className="flex flex-col space-y-4">
          {currentQuestion.options.map(option => (
            <label key={option.value} className="flex items-center bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option.value}
                checked={answers[currentQuestion.id] === option.value}
                onChange={() => handleOptionChange(currentQuestion.id, option.value)}
                className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300"
              />
              <span className="ml-3 text-lg text-gray-900">{option.text}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]} // 回答が選択されていない場合はボタンを無効化
            className="bg-pink-500 text-white font-bold rounded-full px-10 py-4 text-xl hover:bg-pink-600 transition-colors shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex < questions.length - 1 ? '次へ' : '診断結果を見る'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
