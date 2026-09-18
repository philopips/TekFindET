import { Product, ProductCategory } from '../types';

export const CATEGORIES_LIST: { name: ProductCategory; icon: string; count: number; description: string }[] = [
  { name: 'Phones', icon: 'Smartphone', count: 42, description: 'iPhones, Samsung Galaxy, Pixels & more' },
  { name: 'Laptops', icon: 'Laptop', count: 28, description: 'MacBooks, ThinkPads, Dell XPS, ROG' },
  { name: 'Audio', icon: 'Headphones', count: 35, description: 'Sony, Bose, AirPods, JBL Speakers' },
  { name: 'Smartwatches', icon: 'Watch', count: 19, description: 'Apple Watch, Galaxy Watch, Garmin' },
  { name: 'TVs', icon: 'Tv', count: 14, description: 'Samsung OLED, LG C-Series, Sony Bravia' },
  { name: 'Gaming', icon: 'Gamepad2', count: 22, description: 'PS5, Xbox Series X, Nintendo Switch' },
  { name: 'Accessories', icon: 'Cable', count: 64, description: 'Anker chargers, hubs, MagSafe, cases' },
  { name: 'Cameras', icon: 'Camera', count: 12, description: 'Sony Alpha, Canon EOS, DJI Drones' },
  { name: 'Other', icon: 'Cpu', count: 18, description: 'Monitors, Wi-Fi routers, projectors' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro Max (256GB, Natural Titanium)',
    brand: 'Apple',
    category: 'Phones',
    priceETB: 174000,
    originalPriceETB: 185000,
    shopName: 'Abyssinia Tech Hub',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 114,
    location: 'Bole Medhanialem, Edna Mall Area',
    subCity: 'Bole, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year International Apple Warranty',
    lastUpdated: '15 mins ago',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1695048065055-14c19ef58b68?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: true,
    description: 'Factory sealed iPhone 15 Pro Max with aerospace-grade titanium design, A17 Pro chip with 6-core GPU, customizable Action button, and 5x Telephoto camera. Physical SIM + eSIM global variant supported on Ethio Telecom 4G/5G.',
    keySpecs: [
      'A17 Pro Chip (3nm)',
      '6.7" Super Retina XDR 120Hz ProMotion',
      '48MP Main + 5x Telephoto Optical Zoom',
      'Natural Titanium Finish'
    ],
    specs: [
      { label: 'Storage', value: '256GB NVMe' },
      { label: 'Color', value: 'Natural Titanium' },
      { label: 'Display', value: '6.7-inch OLED 120Hz Always-On' },
      { label: 'Network', value: 'Ethio Telecom 5G & Safaricom 4G/5G Ready' },
      { label: 'Battery Health', value: '100% (Brand New Sealed)' },
      { label: 'Box Contents', value: 'iPhone, USB-C Braided Cable, Documentation' }
    ],
    inStock: true,
    stockCount: 4,
    inquiryCode: 'TK-IP15PM-801'
  },
  {
    id: 'prod-002',
    name: 'Apple MacBook Air 15" M3 Chip (16GB RAM, 512GB SSD)',
    brand: 'Apple',
    category: 'Laptops',
    priceETB: 168000,
    originalPriceETB: 178000,
    shopName: 'Addis Mac Center',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 89,
    location: 'Bole Morning Star Mall, 2nd Floor',
    subCity: 'Bole, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year Apple Limited Warranty',
    lastUpdated: '1 hour ago',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: true,
    description: 'Strikingly thin and blazing fast MacBook Air with the latest M3 processor. Effortlessly handles 4K video editing, heavy multitasking, and software engineering. Up to 18 hours battery life for long power outages.',
    keySpecs: [
      'Apple M3 chip (8-core CPU, 10-core GPU)',
      '16GB Unified Memory',
      '512GB Ultrafast SSD Storage',
      '15.3" Liquid Retina Display with True Tone'
    ],
    specs: [
      { label: 'Chipset', value: 'Apple M3 with 16-core Neural Engine' },
      { label: 'RAM', value: '16GB Unified RAM' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Color', value: 'Midnight' },
      { label: 'Battery', value: 'Up to 18 hours video playback' },
      { label: 'Charging', value: 'MagSafe 3 with 35W Dual USB-C Adapter' }
    ],
    inStock: true,
    stockCount: 3,
    inquiryCode: 'TK-MBA15M3-402'
  },
  {
    id: 'prod-003',
    name: 'Samsung Galaxy S24 Ultra 5G (512GB, Titanium Black)',
    brand: 'Samsung',
    category: 'Phones',
    priceETB: 182000,
    originalPriceETB: 195000,
    shopName: 'Ethio Gadget Oasis',
    shopVerified: true,
    shopRating: 4.8,
    shopReviewCount: 96,
    location: 'Megenagna, Zefmesh Grand Mall #312',
    subCity: 'Yeka, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '12 Months Shop & Brand Warranty',
    lastUpdated: '2 hours ago',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: false,
    description: 'Galaxy AI is here. Equipped with Snapdragon 8 Gen 3 for Galaxy, titanium shield frame, built-in S-Pen, anti-reflective Corning Gorilla Armor, and 200MP camera system.',
    keySpecs: [
      'Snapdragon 8 Gen 3 Processor',
      '200MP Quad Telephoto Camera System',
      'Built-in S-Pen Stylus',
      '5000mAh Battery with 45W Fast Charging'
    ],
    specs: [
      { label: 'RAM / Storage', value: '12GB RAM / 512GB Storage' },
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X, 2600 nits' },
      { label: 'S-Pen', value: 'Integrated Bluetooth S-Pen' },
      { label: 'Connectivity', value: 'Dual Physical SIM + eSIM' }
    ],
    inStock: true,
    stockCount: 5,
    inquiryCode: 'TK-S24U-719'
  },
  {
    id: 'prod-004',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    brand: 'Sony',
    category: 'Audio',
    priceETB: 54000,
    originalPriceETB: 59000,
    shopName: 'SoundWave Audio ET',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 72,
    location: 'Kazanchis, Supermarket Mall G-04',
    subCity: 'Kirkos, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '6 Months Replacement Warranty',
    lastUpdated: '3 hours ago',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: true,
    description: 'Industry-leading noise cancellation with two processors and 8 microphones. Magnificent sound quality engineered with the new Integrated Processor V1. 30 hours battery life with quick 3-min charge for 3 hours playback.',
    keySpecs: [
      'Industry-Leading Active Noise Cancellation',
      '30-Hour Battery Life with Quick Charge',
      'Crystal-Clear Hands-Free Calling with 4 Beamforming Mics',
      'Multipoint Connection (Switch between phone & laptop)'
    ],
    specs: [
      { label: 'Battery Life', value: 'Up to 30 hours (ANC On)' },
      { label: 'Bluetooth', value: 'v5.2 with LDAC & AAC' },
      { label: 'Color', value: 'Silver / Off-White' },
      { label: 'Weight', value: '250 grams ultra-light' }
    ],
    inStock: true,
    stockCount: 6,
    inquiryCode: 'TK-SNY-XM5-104'
  },
  {
    id: 'prod-005',
    name: 'Sony PlayStation 5 Slim (1TB SSD, Disc Edition)',
    brand: 'Sony',
    category: 'Gaming',
    priceETB: 98000,
    originalPriceETB: 106000,
    shopName: 'Addis Gaming Arena',
    shopVerified: true,
    shopRating: 4.7,
    shopReviewCount: 142,
    location: 'Merkato, Military Tera Electronics Center',
    subCity: 'Addis Ketema, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year Shop Warranty',
    lastUpdated: 'Today, 9:20 AM',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: true,
    description: 'Slimmer design PS5 with 1TB SSD storage, Ultra HD Blu-ray disc drive, DualSense wireless controller with haptic feedback, adaptive triggers, and ray tracing.',
    keySpecs: [
      '1TB Ultra-High Speed SSD Storage',
      'Includes DualSense Wireless Controller',
      '4K 120Hz & 8K Output Support',
      'Detachable Ultra HD Disc Drive'
    ],
    specs: [
      { label: 'Storage', value: '1TB Custom PCIe 4.0 NVMe SSD' },
      { label: 'Version', value: 'Disc Edition (Region Free)' },
      { label: 'Includes', value: 'PS5 Console, 1 DualSense, HDMI 2.1 Cable, AC Cord' }
    ],
    inStock: true,
    stockCount: 4,
    inquiryCode: 'TK-PS5SLIM-321'
  },
  {
    id: 'prod-006',
    name: 'Apple Watch Ultra 2 (49mm Titanium, Orange Ocean Band)',
    brand: 'Apple',
    category: 'Smartwatches',
    priceETB: 115000,
    originalPriceETB: 124000,
    shopName: 'Bole Gadget Lounge',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 53,
    location: 'Bole Road, Mega Mall Ground Floor',
    subCity: 'Bole, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year Apple Warranty',
    lastUpdated: 'Yesterday',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    trending: true,
    description: 'Rugged and capable smartwatch built for endurance athletes and outdoor adventurers. Powered by S9 SiP with double tap gesture, brightest 3000 nits display, and precision dual-frequency GPS.',
    keySpecs: [
      '49mm Aerospace-Grade Titanium Case',
      '3000 Nits Brightness (Sunlight readable)',
      'Up to 36 hours regular battery, 72h low power',
      'Water resistant to 100m'
    ],
    specs: [
      { label: 'Connectivity', value: 'GPS + Cellular (LTE)' },
      { label: 'Case Material', value: 'Natural Titanium' },
      { label: 'Sensors', value: 'ECG, Blood Oxygen, Depth Gauge, Dual Temp' }
    ],
    inStock: true,
    stockCount: 2,
    inquiryCode: 'TK-AWU2-664'
  },
  {
    id: 'prod-007',
    name: 'Dell XPS 15 9530 (Core i7 13th Gen, RTX 4060, 32GB RAM, 1TB SSD)',
    brand: 'Dell',
    category: 'Laptops',
    priceETB: 154000,
    originalPriceETB: 165000,
    shopName: 'Red Fox Digital Tech',
    shopVerified: true,
    shopRating: 4.8,
    shopReviewCount: 88,
    location: 'Piassa, Church Street Electronics Row',
    subCity: 'Arada, Addis Ababa',
    condition: 'Open Box',
    warranty: '6 Months Shop Warranty + Free Diagnostics',
    lastUpdated: '4 hours ago',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: false,
    description: 'Immaculate condition workstation laptop with CNC machined aluminum chassis, carbon fiber palm rest, vibrant 3.5K OLED touchscreen, and dedicated Nvidia RTX graphics for 3D architecture, rendering and gaming.',
    keySpecs: [
      'Intel Core i7-13700H (14 cores, up to 5.0GHz)',
      'NVIDIA GeForce RTX 4060 8GB GDDR6',
      '32GB DDR5 RAM 4800MHz',
      '15.6" 3.5K (3456x2160) OLED Touch Display'
    ],
    specs: [
      { label: 'CPU', value: 'Intel Core i7-13700H' },
      { label: 'GPU', value: 'NVIDIA RTX 4060 8GB' },
      { label: 'RAM', value: '32GB Dual-Channel DDR5' },
      { label: 'Storage', value: '1TB M.2 PCIe NVMe SSD' },
      { label: 'Battery Cycle', value: 'Only 8 cycles (Pristine)' }
    ],
    inStock: true,
    stockCount: 1,
    inquiryCode: 'TK-XPS15-512'
  },
  {
    id: 'prod-008',
    name: 'LG C3 55" 4K OLED evo Smart TV (120Hz, Dolby Vision & Atmos)',
    brand: 'LG',
    category: 'TVs',
    priceETB: 145000,
    originalPriceETB: 158000,
    shopName: 'Skyline Home Tech Addis',
    shopVerified: true,
    shopRating: 4.8,
    shopReviewCount: 45,
    location: '22 Mazoria, Lex Plaza Building',
    subCity: 'Yeka, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '2-Year Official LG Warranty',
    lastUpdated: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    trending: false,
    description: 'Self-lit OLED evo technology delivers infinite contrast, 100% color fidelity, and stunning brightness powered by the α9 AI Processor Gen6. 4 HDMI 2.1 ports for perfect next-gen console gaming.',
    keySpecs: [
      'OLED evo Panel with Brightness Booster',
      'Native 120Hz Refresh Rate with G-Sync & FreeSync',
      'α9 AI Processor Gen6 with 4K Upscaling',
      'webOS 23 with Magic Remote'
    ],
    specs: [
      { label: 'Screen Size', value: '55-inch Diagonally' },
      { label: 'Resolution', value: '4K Ultra HD (3840 x 2160)' },
      { label: 'Ports', value: '4x HDMI 2.1, 3x USB, eARC, Optical, LAN' }
    ],
    inStock: true,
    stockCount: 2,
    inquiryCode: 'TK-LGC3-55-903'
  },
  {
    id: 'prod-009',
    name: 'Sony Alpha A7 IV Full-Frame Mirrorless Camera (Body Only)',
    brand: 'Sony',
    category: 'Cameras',
    priceETB: 285000,
    originalPriceETB: 310000,
    shopName: 'Focus Lens Ethiopia',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 67,
    location: 'Mexico Square, K-Kare Building 3rd Floor',
    subCity: 'Kirkos, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year Warranty with Free Sensor Cleaning',
    lastUpdated: '5 hours ago',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    trending: true,
    description: 'The benchmark hybrid mirrorless camera for professional video creators and photographers. 33MP full-frame Exmor R sensor, 4K 60p 10-bit 4:2:2 recording, S-Cinetone, and real-time human/animal eye autofocus.',
    keySpecs: [
      '33MP Full-Frame Exmor R CMOS Sensor',
      '4K 60p 10-Bit 4:2:2 Recording',
      '759-Point Fast Hybrid AF with Real-Time Eye AF',
      '5-Axis Optical In-Body Image Stabilization'
    ],
    specs: [
      { label: 'Mount', value: 'Sony E-Mount' },
      { label: 'Shutter Count', value: '0 (Brand New Sealed)' },
      { label: 'Slots', value: 'Dual Card Slots (CFexpress Type A / SD UHS-II)' }
    ],
    inStock: true,
    stockCount: 2,
    inquiryCode: 'TK-SNYA7IV-129'
  },
  {
    id: 'prod-010',
    name: 'Anker 737 Power Bank PowerCore 24K (140W Fast Charging)',
    brand: 'Anker',
    category: 'Accessories',
    priceETB: 18500,
    originalPriceETB: 21000,
    shopName: 'Apex Tech Accessories',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 210,
    location: 'Bole Medhanialem, Berhane Adere Mall',
    subCity: 'Bole, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '18 Months Anker Official Warranty',
    lastUpdated: '30 mins ago',
    images: [
      'https://images.unsplash.com/photo-1609592424368-809cbbec6252?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    trending: true,
    description: 'Ultra-powerful two-way fast charging power bank. Equipped with Power Delivery 3.1 and bi-directional technology to quickly recharge the portable charger or get a 140W ultra-powerful charge for your MacBook, laptop or phone during Addis power cuts.',
    keySpecs: [
      '24,000mAh Massive Capacity',
      '140W Ultra-Fast Two-Way Charging',
      'Smart Digital Display showing output and recharge time',
      'Charges 3 Devices Simultaneously'
    ],
    specs: [
      { label: 'Output Ports', value: '2x USB-C (140W Max), 1x USB-A (18W Max)' },
      { label: 'Recharge Time', value: '52 minutes from 0 to 100%' },
      { label: 'Weight', value: '630g sturdy build' }
    ],
    inStock: true,
    stockCount: 14,
    inquiryCode: 'TK-ANK737-044'
  },
  {
    id: 'prod-011',
    name: 'ASUS ROG Zephyrus G16 (Intel Core Ultra 9, RTX 4070, 2.5K OLED)',
    brand: 'ASUS',
    category: 'Gaming',
    priceETB: 245000,
    originalPriceETB: 260000,
    shopName: 'Elite Gamer Ethiopia',
    shopVerified: true,
    shopRating: 4.8,
    shopReviewCount: 41,
    location: 'Bole Japan Embassy Area, Rainbow Mall',
    subCity: 'Bole, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year International Warranty',
    lastUpdated: '6 hours ago',
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    trending: false,
    description: 'The world’s best stealth gaming notebook. Premium CNC aluminum unibody with slash lighting on the lid, stunning 240Hz ROG Nebula OLED display, and top-tier Intel Core Ultra 9 AI processor.',
    keySpecs: [
      'Intel Core Ultra 9 185H with AI Boost',
      'NVIDIA GeForce RTX 4070 8GB GDDR6',
      '16" 2.5K 240Hz OLED 0.2ms Display',
      '32GB LPDDR5X RAM & 1TB PCIe 4.0 SSD'
    ],
    specs: [
      { label: 'Weight', value: '1.85 kg ultra-portable' },
      { label: 'Display', value: 'ROG Nebula OLED, 100% DCI-P3, 500 nits' },
      { label: 'Speakers', value: '6-speaker system with Dolby Atmos' }
    ],
    inStock: true,
    stockCount: 2,
    inquiryCode: 'TK-ASUS-G16-778'
  },
  {
    id: 'prod-012',
    name: 'DJI Mini 4 Pro Fly More Combo Plus (DJI RC 2 Screen Remote)',
    brand: 'DJI',
    category: 'Cameras',
    priceETB: 125000,
    originalPriceETB: 135000,
    shopName: 'SkyDrone Addis',
    shopVerified: true,
    shopRating: 4.9,
    shopReviewCount: 38,
    location: 'Megenagna, Marathon Mall 1st Floor',
    subCity: 'Yeka, Addis Ababa',
    condition: 'Brand New (Sealed)',
    warranty: '1-Year DJI Care Active Warranty',
    lastUpdated: '1 day ago',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    trending: false,
    description: 'Mini to the max. Weighing less than 249g with omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting for TikTok & Instagram Reels, and up to 45 mins flight time per Intelligent Flight Battery Plus.',
    keySpecs: [
      'Under 249g Compact Ultralight Drone',
      'Omnidirectional Active Obstacle Sensing',
      '4K/60fps HDR True Vertical Shooting',
      'Includes DJI RC 2 with Built-in FHD Screen'
    ],
    specs: [
      { label: 'Transmission', value: 'DJI O4 up to 20km range' },
      { label: 'Flight Time', value: 'Up to 45 mins per Plus Battery (3 batteries included)' },
      { label: 'Combo Items', value: 'Drone, RC 2, 3x Batteries, Two-Way Hub, Shoulder Bag, Extra Props' }
    ],
    inStock: true,
    stockCount: 3,
    inquiryCode: 'TK-DJI-M4P-632'
  }
];

export const SUB_CITIES = [
  'All Addis Ababa',
  'Bole',
  'Yeka / Megenagna',
  'Kirkos / Kazanchis',
  'Arada / Piassa',
  'Addis Ketema / Merkato'
];
