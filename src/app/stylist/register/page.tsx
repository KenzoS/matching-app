"use client"; // この行を追加

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // リダイレクトのためにインポート
import { addStylist } from '@/lib/data'; // addStylist関数をインポート

const RegisterPage = () => {
  const router = useRouter();

  // フォームの各フィールドの状態を管理
  const [name, setName] = useState('');
  const [salon, setSalon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [style, setStyle] = useState('指定なし'); // 得意なスタイル
  const [area, setArea] = useState('指定なし'); // エリア
  const [price, setPrice] = useState(''); // 料金目安

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ページの再読み込みを防ぐ

    // 必須フィールドの簡単なバリデーション
    if (!name || !salon || !email || !password || !bio || style === '指定なし' || area === '指定なし' || !price) {
      alert('全ての必須項目を入力してください。');
      return;
    }

    // 新しい美容師オブジェクトを作成
    const newStylist = {
      name,
      salon,
      email,
      password,
      bio,
      style,
      area,
      price: parseInt(price, 10), // 数値に変換
    };

    // addStylist関数を呼び出してモックデータに追加
    addStylist(newStylist);

    alert('美容師の登録が完了しました！');
    router.push('/search'); // 登録後、検索ページにリダイレクト
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        美容師として登録
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* 氏名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">氏名</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* サロン名 */}
            <div>
              <label htmlFor="salon-name" className="block text-sm font-medium text-gray-700">サロン名</label>
              <input 
                type="text" 
                id="salon-name" 
                name="salon-name" 
                value={salon} 
                onChange={(e) => setSalon(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* 自己紹介 */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">自己紹介</label>
              <textarea 
                id="bio" 
                name="bio" 
                rows={4} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              ></textarea>
            </div>

            {/* 得意なスタイル */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700">得意なスタイル</label>
              <select 
                id="style" 
                name="style" 
                value={style} 
                onChange={(e) => setStyle(e.target.value)} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="ショート">ショート</option>
                <option value="ミディアム">ミディアム</option>
                <option value="ロング">ロング</option>
                <option value="メンズ">メンズ</option>
              </select>
            </div>

            {/* エリア */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">活動エリア</label>
              <select 
                id="area" 
                name="area" 
                value={area} 
                onChange={(e) => setArea(e.target.value)} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="福岡">福岡</option>
                <option value="札幌">札幌</option>
                <option value="名古屋">名古屋</option>
              </select>
            </div>

            {/* 料金目安 */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">料金目安 (半角数字)</label>
              <input 
                type="number" // 数値入力に限定
                id="price" 
                name="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* プロフィール写真のアップロードは一旦削除 */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700">プロフィール写真</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                      <span>アップロード</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">またはドラッグ＆ドロップ</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}

            <div className="text-center">
              <button type="submit" className="bg-gray-800 text-white font-bold rounded-full px-8 py-3 hover:bg-gray-900 transition-colors">
                登録する
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
