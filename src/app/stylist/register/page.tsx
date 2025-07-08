"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addStylist } from '@/lib/data';

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [salon, setSalon] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [style, setStyle] = useState('指定なし');
  const [area, setArea] = useState('指定なし');
  const [price, setPrice] = useState('');
  const [taste, setTaste] = useState('指定なし');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]); // 新しく追加

  const allSpecialties = [ // 専門技術の選択肢
    '似合わせカット', '髪質改善', 'メンズカット', 'パーマ', '透明感カラー',
    'ブリーチ毛対応', 'ダメージケア', '縮毛矯正', '白髪染め', '頭皮ケア'
  ];

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !salon || !email || !password || !bio || style === '指定なし' || area === '指定なし' || !price || taste === '指定なし' || selectedSpecialties.length === 0) {
      alert('全ての必須項目を入力してください。');
      return;
    }

    const newStylist = {
      name,
      salon,
      email,
      password,
      bio,
      style,
      area,
      price: parseInt(price, 10),
      taste,
      specialties: selectedSpecialties, // 専門技術を追加
    };

    addStylist(newStylist);

    alert('美容師の登録が完了しました！');
    router.push('/search');
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
                type="number" 
                id="price" 
                name="price" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm" 
                required 
              />
            </div>

            {/* 得意なテイスト */}
            <div>
              <label htmlFor="taste" className="block text-sm font-medium text-gray-700">得意なテイスト</label>
              <select 
                id="taste" 
                name="taste" 
                value={taste} 
                onChange={(e) => setTaste(e.target.value)} 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="ナチュラル">ナチュラル</option>
                <option value="フェミニン">フェミニン</option>
                <option value="クール">クール</option>
                <option value="カジュアル">カジュアル</option>
                <option value="モード">モード</option>
              </select>
            </div>

            {/* 専門技術・悩み解決のチェックボックスを追加 */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">専門技術・悩み解決</label>
              <div className="flex flex-wrap gap-2">
                {allSpecialties.map(specialty => (
                  <div key={specialty} className="flex items-center">
                    <input
                      id={`reg-specialty-${specialty}`}
                      type="checkbox"
                      value={specialty}
                      checked={selectedSpecialties.includes(specialty)}
                      onChange={() => handleSpecialtyChange(specialty)}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`reg-specialty-${specialty}`} className="ml-2 text-sm text-gray-900">
                      {specialty}
                    </label>
                  </div>
                ))}
              </div>
            </div>

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
