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
  specialties: string[];
  salonImages: string[];
  salonAtmosphere: 'calm_atmosphere' | 'lively_atmosphere' | 'private_atmosphere' | 'casual_atmosphere';
  communicationStyle: 'pro_suggestion' | 'detailed_consultation' | 'enjoy_chat' | 'quiet_service';
  address: string;
  latitude: number;
  longitude: number;
  thirdPartyEvaluationScore?: number; // 第三者評価スコア
  thirdPartyEvaluationComments?: string[]; // 第三者評価コメント
  gender: 'male' | 'female';
}

export interface SuggestedHairstyle {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  suitableFor: {
    faceShape?: string[];
    hairQuality?: string[];
    fashionStyle?: string[];
    timeCommitment?: string[];
  };
  score?: number;
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
    taste: 'casual',
    specialties: ['似合わせカット', '髪質改善', 'トリートメント'],
    salonImages: ['/images/salon1-1.jpg', '/images/salon1-2.jpg'],
    salonAtmosphere: 'calm_atmosphere',
    communicationStyle: 'detailed_consultation',
    address: '東京都渋谷区神宮前6-35-3',
    latitude: 35.6678,
    longitude: 139.7045,
    thirdPartyEvaluationScore: 4.5,
    thirdPartyEvaluationComments: ["カットの再現性が高い", "トレンドを取り入れた提案力がある"],
    gender: 'female',
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
    taste: 'casual',
    specialties: ['メンズカット', 'パーマ'],
    salonImages: ['/images/salon2-1.jpg', '/images/salon2-2.jpg'],
    salonAtmosphere: 'lively_atmosphere',
    communicationStyle: 'enjoy_chat',
    address: '大阪府大阪市北区梅田1-1-3',
    latitude: 34.7018,
    longitude: 135.4950,
    thirdPartyEvaluationScore: 4.0,
    thirdPartyEvaluationComments: ["メンズスタイルのバリエーションが豊富", "パーマ技術に定評がある"],
    gender: 'male',
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
    taste: 'feminine',
    specialties: ['髪質改善', '透明感カラー', 'ブリーチ毛対応', 'トリートメント'],
    salonImages: ['/images/salon3-1.jpg', '/images/salon3-2.jpg'],
    salonAtmosphere: 'private_atmosphere',
    communicationStyle: 'pro_suggestion',
    address: '福岡県福岡市中央区天神2-11-1',
    latitude: 33.5913,
    longitude: 130.3988,
    thirdPartyEvaluationScore: 4.8,
    thirdPartyEvaluationComments: ["カラーの知識が豊富で、透明感のある仕上がりが素晴らしい", "髪質改善の経験が豊富"],
    gender: 'female',
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
    taste: 'elegant',
    specialties: ['似合わせカット', 'ダメージケア', 'パーマ'],
    salonImages: ['/images/salon4-1.jpg', '/images/salon4-2.jpg'],
    salonAtmosphere: 'calm_atmosphere',
    communicationStyle: 'quiet_service',
    address: '北海道札幌市中央区南1条西3丁目',
    latitude: 43.0597,
    longitude: 141.3539,
    thirdPartyEvaluationScore: 4.2,
    thirdPartyEvaluationComments: ["ナチュラルなスタイルが得意で、顧客の魅力を引き出す", "丁寧なカウンセリング"],
    gender: 'male',
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
    taste: 'feminine',
    specialties: ['髪質改善', '縮毛矯正', 'トリートメント'],
    salonImages: ['/images/salon5-1.jpg', '/images/salon5-2.jpg'],
    salonAtmosphere: 'private_atmosphere',
    communicationStyle: 'detailed_consultation',
    address: '愛知県名古屋市中区栄3-5-1',
    latitude: 35.1680,
    longitude: 136.9065,
    thirdPartyEvaluationScore: 4.6,
    thirdPartyEvaluationComments: ["フェミニンなスタイルに定評あり", "ダメージレス施術へのこだわりが感じられる"],
    gender: 'female',
  },
];

export const suggestedHairstyles: SuggestedHairstyle[] = [
  {
    id: 'natural_bob',
    name: 'リラックスカジュアルボブ',
    imageUrl: '/images/suggested-style-natural-bob.jpg',
    description: '自然体で親しみやすい印象を与える、手入れが楽なボブスタイルです。',
    suitableFor: {
      fashionStyle: ['casual'],
      faceShape: ['oval', 'round'],
      hairQuality: ['straight_flat', 'fine_soft'],
      timeCommitment: ['short_time', 'medium_time'],
    },
  },
  {
    id: 'elegant_long',
    name: 'エレガントウェーブロング',
    imageUrl: '/images/suggested-style-elegant-long.jpg',
    description: '上品で洗練された印象を与える、ツヤ感のあるロングウェーブスタイルです。',
    suitableFor: {
      fashionStyle: ['elegant', 'feminine'],
      faceShape: ['oval', 'long'],
      hairQuality: ['wavy_frizz', 'thick_voluminous'],
      timeCommitment: ['medium_time', 'long_time'],
    },
  },
  {
    id: 'mode_short',
    name: 'エッジィモードショート',
    imageUrl: '/images/suggested-style-mode-short.jpg',
    description: '個性的でエッジの効いた、トレンド感のあるショートスタイルです。',
    suitableFor: {
      fashionStyle: ['mode'],
      faceShape: ['oval', 'heart'],
      hairQuality: ['straight_flat', 'thick_voluminous'],
      timeCommitment: ['medium_time', 'long_time'],
    },
  },
  {
    id: 'feminine_medium',
    name: 'ふんわりフェミニンミディアム',
    imageUrl: '/images/suggested-style-feminine-medium.jpg',
    description: '柔らかく可愛らしい印象を与える、ふんわりとしたミディアムスタイルです。',
    suitableFor: {
      fashionStyle: ['feminine', 'elegant'],
      faceShape: ['oval', 'round', 'heart'],
      hairQuality: ['fine_soft', 'wavy_frizz'],
      timeCommitment: ['medium_time', 'long_time'],
    },
  },
  {
    id: 'layered_long',
    name: '軽やかレイヤーロング',
    imageUrl: '/images/suggested-style-layered-long.jpg',
    description: '動きと軽さを出した、どんな顔型にも合わせやすい万能なロングスタイルです。',
    suitableFor: {
      faceShape: ['oval', 'round', 'long', 'square', 'heart'],
      hairQuality: ['thick_voluminous', 'wavy_frizz'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'mens_perm',
    name: 'メンズパーマスタイル',
    imageUrl: '/images/suggested-style-mens-perm.jpg',
    description: '無造作な動きと立体感で、こなれた印象を与えるメンズパーマスタイルです。',
    suitableFor: {
      fashionStyle: ['casual', 'mode'],
      hairQuality: ['straight_flat', 'fine_soft'],
      timeCommitment: ['short_time', 'medium_time'],
    },
  },
];

export const addStylist = (newStylist: Omit<Stylist, 'id' | 'imageUrl' | 'salonImages'>) => {
  const newId = stylists.length > 0 ? Math.max(...stylists.map(s => s.id)) + 1 : 1;
  const stylistWithId: Stylist = {
    ...newStylist,
    id: newId,
    imageUrl: '/images/default-stylist.jpg',
    salonImages: [],
  };
  stylists.push(stylistWithId);
  console.log('New stylist added (non-persistent):', stylistWithId);
};