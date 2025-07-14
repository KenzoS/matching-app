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
  distance?: number | null; // 距離プロパティを追加
  matchScore?: number; // マッチスコアプロパティを追加
  matchReasons?: string[]; // マッチ理由プロパティを追加
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

export const stylists: Stylist[] = [
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
  {
    id: 6,
    name: '山本 健太',
    salon: 'Green Terrace',
    area: '東京',
    style: 'メンズ',
    price: 10000,
    imageUrl: '/images/default-stylist.jpg',
    bio: 'メンズカットとパーマが得意です。お客様のライフスタイルに合わせた再現性の高いスタイルを提案します。',
    taste: 'elegant',
    specialties: ['メンズカット', 'パーマ', 'ヘッドスパ'],
    salonImages: [],
    salonAtmosphere: 'calm_atmosphere',
    communicationStyle: 'detailed_consultation',
    address: '東京都港区南青山5-1-1',
    latitude: 35.6655,
    longitude: 139.7123,
    thirdPartyEvaluationScore: 4.7,
    thirdPartyEvaluationComments: ["メンズカットがとても上手", "丁寧なカウンセリングで安心"],
    gender: 'male',
  },
  {
    id: 7,
    name: '中村 拓海',
    salon: 'Urban Chic',
    area: '大阪',
    style: 'メンズ',
    price: 9000,
    imageUrl: '/images/default-stylist.jpg',
    bio: 'トレンドを取り入れたメンズスタイルが得意。お客様の個性を引き出すデザインを提案します。',
    taste: 'mode',
    specialties: ['メンズカット', 'デザインカラー', 'パーマ'],
    salonImages: [],
    salonAtmosphere: 'lively_atmosphere',
    communicationStyle: 'enjoy_chat',
    address: '大阪府大阪市中央区心斎橋筋1-1-1',
    latitude: 34.6768,
    longitude: 135.5012,
    thirdPartyEvaluationScore: 4.3,
    thirdPartyEvaluationComments: ["大胆なイメチェンも安心してお任せできる", "会話が楽しくてあっという間"],
    gender: 'male',
  },
  {
    id: 8,
    name: '小林 悠',
    salon: 'Natural Flow',
    area: '福岡',
    style: 'メンズ',
    price: 8800,
    imageUrl: '/images/default-stylist.jpg',
    bio: 'ナチュラルなメンズスタイルと、髪の悩みを解決する施術が得意です。自宅での再現性も重視します。',
    taste: 'casual',
    specialties: ['髪質改善', 'メンズパーマ', 'ヘッドスパ'],
    salonImages: [],
    salonAtmosphere: 'private_atmosphere',
    communicationStyle: 'quiet_service',
    address: '福岡県福岡市博多区博多駅中央街1-1',
    latitude: 33.5903,
    longitude: 130.4207,
    thirdPartyEvaluationScore: 4.5,
    thirdPartyEvaluationComments: ["髪がサラサラになった", "自宅でのケア方法も丁寧に教えてくれる"],
    gender: 'male',
  },
  {
    id: 9,
    name: '加藤 結衣',
    salon: 'Bright Salon',
    area: '札幌',
    style: 'ロング',
    price: 11500,
    imageUrl: '/images/default-stylist.jpg',
    bio: 'ロングヘアのツヤ感とまとまりを重視したスタイルが得意です。ダメージレスな施術で、美しい髪を育みます。',
    taste: 'feminine',
    specialties: ['髪質改善', '縮毛矯正', 'デジタルパーマ'],
    salonImages: [],
    salonAtmosphere: 'calm_atmosphere',
    communicationStyle: 'pro_suggestion',
    address: '北海道札幌市中央区北2条西2丁目',
    latitude: 43.0645,
    longitude: 141.3507,
    thirdPartyEvaluationScore: 4.6,
    thirdPartyEvaluationComments: ["髪が驚くほど綺麗になった", "提案力が素晴らしい"],
    gender: 'female',
  },
  {
    id: 10,
    name: '渡辺 咲',
    salon: 'Style Lab',
    area: '名古屋',
    style: 'ボブ',
    price: 9800,
    imageUrl: '/images/default-stylist.jpg',
    bio: 'トレンドを取り入れたデザインボブと、似合わせカラーが得意です。お客様の「なりたい」を叶えます。',
    taste: 'elegant',
    specialties: ['デザインカラー', '似合わせカット', 'ハイライト'],
    salonImages: [],
    salonAtmosphere: 'lively_atmosphere',
    communicationStyle: 'detailed_consultation',
    address: '愛知県名古屋市中区錦3-1-1',
    latitude: 35.1707,
    longitude: 136.9080,
    thirdPartyEvaluationScore: 4.4,
    thirdPartyEvaluationComments: ["カラーの色味が絶妙", "いつも期待以上の仕上がり"],
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
    id: 'airy_short',
    name: 'エアリーショート',
    imageUrl: '/images/suggested-style-placeholder-1.jpg',
    description: '軽やかで動きのある、女性らしいショートスタイルです。',
    suitableFor: {
      fashionStyle: ['casual', 'feminine'],
      faceShape: ['oval', 'heart'],
      hairQuality: ['fine_soft', 'straight_flat'],
      timeCommitment: ['short_time'],
    },
  },
  {
    id: 'natural_medium',
    name: 'ナチュラルミディアム',
    imageUrl: '/images/suggested-style-placeholder-2.jpg',
    description: '自然体でどんなシーンにも馴染む、手入れしやすいミディアムスタイルです。',
    suitableFor: {
      fashionStyle: ['casual', 'elegant'],
      faceShape: ['oval', 'round', 'long'],
      hairQuality: ['straight_flat', 'wavy_frizz'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'curly_long',
    name: 'ゆるふわカールロング',
    imageUrl: '/images/suggested-style-placeholder-3.jpg',
    description: '柔らかいカールで女性らしさを引き出す、フェミニンなロングスタイルです。',
    suitableFor: {
      fashionStyle: ['feminine', 'elegant'],
      faceShape: ['oval', 'long'],
      hairQuality: ['wavy_frizz', 'fine_soft'],
      timeCommitment: ['long_time'],
    },
  },
  {
    id: 'cool_bob',
    name: 'クール系ボブ',
    imageUrl: '/images/suggested-style-placeholder-4.jpg',
    description: 'シャープなラインで知的な印象を与える、大人っぽいボブスタイルです。',
    suitableFor: {
      fashionStyle: ['mode', 'elegant'],
      faceShape: ['oval', 'square'],
      hairQuality: ['straight_flat', 'thick_voluminous'],
      timeCommitment: ['short_time', 'medium_time'],
    },
  },
  {
    id: 'volume_up_short',
    name: 'ボリュームアップショート',
    imageUrl: '/images/suggested-style-placeholder-5.jpg',
    description: 'トップにボリュームを持たせ、華やかな印象を与えるショートスタイルです。',
    suitableFor: {
      fashionStyle: ['elegant', 'feminine'],
      faceShape: ['oval', 'round'],
      hairQuality: ['fine_soft', 'flat'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'straight_long',
    name: 'ツヤ感ストレートロング',
    imageUrl: '/images/suggested-style-placeholder-6.jpg',
    description: 'ツヤとまとまりを重視した、シンプルで美しいストレートロングです。',
    suitableFor: {
      fashionStyle: ['elegant', 'casual'],
      faceShape: ['oval', 'long'],
      hairQuality: ['straight_flat', 'thick_voluminous'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'layered_medium',
    name: '動きのあるレイヤーミディアム',
    imageUrl: '/images/suggested-style-placeholder-7.jpg',
    description: '顔周りに動きを出し、小顔効果も期待できるミディアムスタイルです。',
    suitableFor: {
      fashionStyle: ['casual', 'mode'],
      faceShape: ['oval', 'square', 'heart'],
      hairQuality: ['wavy_frizz', 'thick_voluminous'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'inner_color_bob',
    name: 'インナーカラーボブ',
    imageUrl: '/images/suggested-style-placeholder-8.jpg',
    description: 'さりげないインナーカラーで個性を表現する、トレンド感のあるボブスタイルです。',
    suitableFor: {
      fashionStyle: ['mode', 'casual'],
      faceShape: ['oval', 'round'],
      hairQuality: ['straight_flat', 'fine_soft'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'perm_medium',
    name: 'パーマミディアム',
    imageUrl: '/images/suggested-style-placeholder-9.jpg',
    description: 'パーマでふんわりとした質感と動きをプラスした、手入れしやすいミディアムスタイルです。',
    suitableFor: {
      fashionStyle: ['feminine', 'casual'],
      faceShape: ['oval', 'long'],
      hairQuality: ['straight_flat', 'fine_soft'],
      timeCommitment: ['medium_time'],
    },
  },
  {
    id: 'short_bangs_long',
    name: 'ショートバングロング',
    imageUrl: '/images/suggested-style-placeholder-10.jpg',
    description: '短めの前髪で個性を出しつつ、ロングヘアの女性らしさを残したスタイルです。',
    suitableFor: {
      fashionStyle: ['mode', 'feminine'],
      faceShape: ['oval', 'heart'],
      hairQuality: ['straight_flat', 'wavy_frizz'],
      timeCommitment: ['long_time'],
    },
  },
  {
    id: 'korean_straight_dark',
    name: '韓国風 切りっぱなしストレート',
    imageUrl: '/images/suggested-style-korean-straight.jpg',
    description: 'トレンドの韓国風スタイル。シャープなラインで、クールで洗練された印象を与えます。',
    suitableFor: {
      fashionStyle: ['mode', 'elegant', 'casual'],
      faceShape: ['oval', 'long', 'square'],
      hairQuality: ['straight_flat', 'thick_voluminous'],
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