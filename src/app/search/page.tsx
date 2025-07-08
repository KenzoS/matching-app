"use client"; // この行を追加

import React, { useState } from 'react'; // useState をインポート
import { stylists } from '@/lib/data';
import Image from 'next/image';

const SearchPage = () => {
  // フィルター条件を記憶するための状態（state）を定義
  const [area, setArea] = useState('指定なし');
  const [style, setStyle] = useState('指定なし');
  const [price, setPrice] = useState('指定なし');

  // 選択された条件で美容師リストをフィルタリング
  const filteredStylists = stylists.filter(stylist => {
    const priceRange = price.split('〜').map(p => parseInt(p.replace(/[¥,]/g, '')))
    const minPrice = priceRange[0] || 0;
    const maxPrice = priceRange[1] || Infinity;


    return (
      (area === '指定なし' || stylist.area === area) &&
      (style === '指定なし' || stylist.style === style) &&
      (price === '指定なし' || (stylist.price >= minPrice && stylist.price <= maxPrice))
    );
  });

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        美容師を探す
      </h1>

      {/* Search Filters */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">エリア</label>
            <select 
              id="area" 
              name="area" 
              value={area} // stateをvalueに設定
              onChange={(e) => setArea(e.target.value)} // 選択時にstateを更新
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
            >
              <option>指定なし</option>
              <option>東京</option>
              <option>大阪</option>
              <option>福岡</option>
              <option>札幌</option>
              <option>名古屋</option>
            </select>
          </div>
          <div>
            <label htmlFor="style" className="block text-sm font-medium text-gray-700">得意なスタイル</label>
            <select 
              id="style" 
              name="style" 
              value={style} // stateをvalueに設定
              onChange={(e) => setStyle(e.target.value)} // 選択時にstateを更新
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
            >
              <option>指定なし</option>
              <option>ショート</option>
              <option>ミディアム</option>
              <option>ロング</option>
              <option>メンズ</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">価格帯</label>
            <select 
              id="price" 
              name="price" 
              value={price} // stateをvalueに設定
              onChange={(e) => setPrice(e.target.value)} // 選択時にstateを更新
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
            >
              <option>指定なし</option>
              <option>〜¥8000</option>
              <option>¥8001〜¥12000</option>
              <option>¥12001〜</option>
            </select>
          </div>
        </div>
        {/* 検索ボタンは現在ダミーです */}
        <div className="text-center">
          <button className="bg-pink-500 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-600 transition-colors">
            この条件で検索
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* 表示するリストをフィルタリング済みのものに変更 */}
        {filteredStylists.map((stylist) => (
          <div key={stylist.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* <Image src={stylist.imageUrl} alt={stylist.name} width={400} height={300} className="w-full h-48 object-cover" /> */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800">{stylist.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{stylist.salon} / {stylist.area}</p>
              <p className="text-gray-700 mb-4">{stylist.bio}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-pink-500">¥{stylist.price.toLocaleString()}</span>
                <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{stylist.style}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
