"use client";

"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation'; // usePathname をインポート

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得

  useEffect(() => {
    // localStorageからログイン状態をチェックする関数
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    checkLoginStatus(); // コンポーネントマウント時とパス変更時に実行

    // storageイベントをリッスンして、他のタブ/ウィンドウからのlocalStorage変更を検知
    window.addEventListener('storage', checkLoginStatus);

    // クリーンアップ関数: コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [pathname]); // pathname が変更されるたびに useEffect を再実行

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // ログイン状態を削除
    setIsLoggedIn(false); // 状態を更新
    alert('ログアウトしました。');
    router.push('/'); // トップページにリダイレクト
  };

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold rounded-full px-4 py-2 hover:bg-red-600 transition-colors text-sm"
        >
          ログアウト
        </button>
      ) : (
        <Link href="/login" legacyBehavior>
          <a className="bg-green-500 text-white font-bold rounded-full px-4 py-2 hover:bg-green-600 transition-colors text-sm">
            ログイン
          </a>
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;

