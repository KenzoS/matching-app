export interface Stylist {
  id: number;
  name: string;
  salon: string;
  area: string;
  style: string;
  price: number;
  imageUrl: string;
  bio: string;
  email?: string;
  password?: string;
}

export let stylists: Stylist[] = [
  {
    id: 1,
    name: '佐藤 由美',
    salon: 'Hair Salon Tokyo',
    area: '東京',
    style: 'ショート',
    price: 9500,
    imageUrl: '/images/stylist1.jpg', // パスを修正
    bio: 'ショートカットとボブが得意です。お客様一人ひとりの骨格に合わせたカットを提案します。',
  },
  {
    id: 2,
    name: '鈴木 健太',
    salon: 'Chic Osaka',
    area: '大阪',
    style: 'メンズ',
    price: 8000,
    imageUrl: '/images/stylist2.jpg', // パスを修正
    bio: 'メンズカットのスペシャリスト。ビジネスからカジュアルまで、再現性の高いスタイルを。',
  },
  {
    id: 3,
    name: '高橋 愛',
    salon: 'Fukuoka Beauty',
    area: '福岡',
    style: 'ロング',
    price: 12000,
    imageUrl: '/images/stylist3.jpg', // パスを修正
    bio: 'ロングヘアの透明感カラーが得意です。髪質改善トリートメントも人気です。',
  },
  {
    id: 4,
    name: '田中 誠',
    salon: 'Modern Style Sapporo',
    area: '札幌',
    style: 'ミディアム',
    price: 8500,
    imageUrl: '/images/stylist4.jpg', // パスを修正
    bio: 'ナチュラルなミディアムスタイルで、女性らしさを引き出します。',
  },
  {
    id: 5,
    name: '伊藤 さくら',
    salon: 'Nagoya Hair Design',
    area: '名古屋',
    style: 'ロング',
    price: 11000,
    imageUrl: '/images/stylist5.jpg', // パスを修正
    bio: 'フェミニンなロングスタイルと、ダメージレスな施術を心がけています。',
  },
];

export const addStylist = (newStylist: Omit<Stylist, 'id' | 'imageUrl'>) => {
  const newId = stylists.length > 0 ? Math.max(...stylists.map(s => s.id)) + 1 : 1;
  const stylistWithId: Stylist = {
    ...newStylist,
    id: newId,
    imageUrl: '/images/default-stylist.jpg', // 仮の画像パスを修正
  };
  stylists.push(stylistWithId);
  console.log('New stylist added (non-persistent):', stylistWithId);
};
