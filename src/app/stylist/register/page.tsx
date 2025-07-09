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
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // エラーメッセージを管理するstate

  const allSpecialties = [
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

    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = '氏名は必須です。';
    if (!salon) newErrors.salon = 'サロン名は必須です。';
    if (!email) newErrors.email = 'メールアドレスは必須です。';
    if (!password) newErrors.password = 'パスワードは必須です。';
    if (!bio) newErrors.bio = '自己紹介は必須です。';
    if (style === '指定なし') newErrors.style = '得意なスタイルを選択してください。';
    if (area === '指定なし') newErrors.area = '活動エリアを選択してください。';
    if (!price) newErrors.price = '料金目安は必須です。';
    if (taste === '指定なし') newErrors.taste = '得意なテイストを選択してください。';
    if (selectedSpecialties.length === 0) newErrors.specialties = '専門技術を1つ以上選択してください。';

    setErrors(newErrors); // エラーをセット

    if (Object.keys(newErrors).length > 0) {
      // エラーがある場合は処理を中断
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
      specialties: selectedSpecialties,
    };

    addStylist(newStylist);

    alert('美容師の登録が完了しました！'); // 成功時はalertのまま
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
                onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }} // 入力時にエラーをクリア
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                required 
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* サロン名 */}
            <div>
              <label htmlFor="salon-name" className="block text-sm font-medium text-gray-700">サロン名</label>
              <input 
                type="text" 
                id="salon-name" 
                name="salon-name" 
                value={salon} 
                onChange={(e) => { setSalon(e.target.value); setErrors(prev => ({ ...prev, salon: undefined })); }} 
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.salon ? 'border-red-500' : ''}`}
                required 
              />
              {errors.salon && <p className="mt-1 text-sm text-red-500">{errors.salon}</p>}
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">メールアドレス</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })); }} 
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                required 
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* パスワード */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">パスワード</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })); }} 
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                required 
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* 自己紹介 */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">自己紹介</label>
              <textarea 
                id="bio" 
                name="bio" 
                rows={4} 
                value={bio} 
                onChange={(e) => { setBio(e.target.value); setErrors(prev => ({ ...prev, bio: undefined })); }} 
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.bio ? 'border-red-500' : ''}`}
                required 
              ></textarea>
              {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
            </div>

            {/* 得意なスタイル */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700">得意なスタイル</label>
              <select 
                id="style" 
                name="style" 
                value={style} 
                onChange={(e) => { setStyle(e.target.value); setErrors(prev => ({ ...prev, style: undefined })); }} 
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.style ? 'border-red-500' : ''}`}
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="ショート">ショート</option>
                <option value="ミディアム">ミディアム</option>
                <option value="ロング">ロング</option>
                <option value="メンズ">メンズ</option>
              </select>
              {errors.style && <p className="mt-1 text-sm text-red-500">{errors.style}</p>}
            </div>

            {/* エリア */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">活動エリア</label>
              <select 
                id="area" 
                name="area" 
                value={area} 
                onChange={(e) => { setArea(e.target.value); setErrors(prev => ({ ...prev, area: undefined })); }} 
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.area ? 'border-red-500' : ''}`}
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="東京">東京</option>
                <option value="大阪">大阪</option>
                <option value="福岡">福岡</option>
                <option value="札幌">札幌</option>
                <option value="名古屋">名古屋</option>
              </select>
              {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
            </div>

            {/* 料金目安 */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">料金目安 (半角数字)</label>
              <input 
                type="number" 
                id="price" 
                name="price" 
                value={price} 
                onChange={(e) => { setPrice(e.target.value); setErrors(prev => ({ ...prev, price: undefined })); }} 
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
                required 
              />
              {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            {/* 得意なテイスト */}
            <div>
              <label htmlFor="taste" className="block text-sm font-medium text-gray-700">得意なテイスト</label>
              <select 
                id="taste" 
                name="taste" 
                value={taste} 
                onChange={(e) => { setTaste(e.target.value); setErrors(prev => ({ ...prev, taste: undefined })); }} 
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${errors.taste ? 'border-red-500' : ''}`}
                required
              >
                <option value="指定なし">選択してください</option>
                <option value="ナチュラル">ナチュラル</option>
                <option value="フェミニン">フェミニン</option>
                <option value="クール">クール</option>
                <option value="カジュアル">カジュアル</option>
                <option value="モード">モード</option>
              </select>
              {errors.taste && <p className="mt-1 text-sm text-red-500">{errors.taste}</p>}
            </div>

            {/* 専門技術・悩み解決のチェックボックス */}
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
                      onChange={(e) => { handleSpecialtyChange(specialty); setErrors(prev => ({ ...prev, specialties: undefined })); }} // 入力時にエラーをクリア
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`reg-specialty-${specialty}`} className="ml-2 text-sm text-gray-900">
                      {specialty}
                    </label>
                  </div>
                ))}
              </div>
              {errors.specialties && <p className="mt-1 text-sm text-red-500">{errors.specialties}</p>}
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