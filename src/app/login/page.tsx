"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 簡易的な認証ロジック
    // ユーザー名: user, パスワード: password でログイン成功とする
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true'); // ログイン状態を保存
      alert('ログインしました！');
      router.push('/'); // トップページにリダイレクト
    } else {
      alert('ユーザー名またはパスワードが間違っています。');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        ログイン
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <form onSubmit={handleLogin}>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">ユーザー名</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                required
              />
            </div>
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
            <div className="text-center">
              <button type="submit" className="bg-pink-500 text-white font-bold rounded-full px-8 py-3 hover:bg-pink-600 transition-colors">
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
