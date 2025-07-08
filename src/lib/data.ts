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
  taste: string;
  specialties: string[]; // 新しく追加
}

export let stylists: Stylist[] = [
  {
    id: 1,
    name: '佐藤 由美',
    salon: 'Hair Salon Tokyo',
    area: '東京',
    style: 'ショート',
    price: 9500,
    imageUrl: '/images/stylist1.jpg',
    bio: 'ショートカットとボブが得意です。お客様一人ひとりの骨格に合わせたカットを提案します。',
    taste: 'ナチュラル',
    specialties: ['似合わせカット', '髪質改善'], // 専門技術を追加
  },
  {
    id: 2,
    name: '鈴木 健太',
    salon: 'Chic Osaka',
    area: '大阪',
    style: 'メンズ',
    price: 8000,
    imageUrl: '/images/stylist2.jpg',
    bio: 'メンズカットのスペシャリスト。ビジネスからカジュアルまで、再現性の高いスタイルを。',
    taste: 'カジュアル',
    specialties: ['メンズカット', 'パーマ'], // 専門技術を追加
  },
  {
    id: 3,
    name: '高橋 愛',
    salon: 'Fukuoka Beauty',
    area: '福岡',
    style: 'ロング',
    price: 12000,
    imageUrl: '/images/stylist3.jpg',
    bio: 'ロングヘアの透明感カラーが得意です。髪質改善トリートメントも人気です。',
    taste: 'フェミニン',
    specialties: ['髪質改善', '透明感カラー', 'ブリーチ毛対応'], // 専門技術を追加
  },
  {
    id: 4,
    name: '田中 誠',
    salon: 'Modern Style Sapporo',
    area: '札幌',
    style: 'ミディアム',
    price: 8500,
    imageUrl: '/images/stylist4.jpg',
    bio: 'ナチュラルなミディアムスタイルで、女性らしさを引き出します。',
    taste: 'ナチュラル',
    specialties: ['似合わせカット', 'ダメージケア'], // 専門技術を追加
  },
  {
    id: 5,
    name: '伊藤 さくら',
    salon: 'Nagoya Hair Design',
    area: '名古屋',
    style: 'ロング',
    price: 11000,
    imageUrl: '/images/stylist5.jpg',
    bio: 'フェミニンなロングスタイルと、ダメージレスな施術を心がけています。',
    taste: 'フェミニン',
    specialties: ['髪質改善', '縮毛矯正'], // 専門技術を追加
  },
];

export const addStylist = (newStylist: Omit<Stylist, 'id' | 'imageUrl'>) => {
  const newId = stylists.length > 0 ? Math.max(...stylists.map(s => s.id)) + 1 : 1;
  const stylistWithId: Stylist = {
    ...newStylist,
    id: newId,
    imageUrl: '/images/default-stylist.jpg',
  };
  stylists.push(stylistWithId);
  console.log('New stylist added (non-persistent):', stylistWithId);
};
