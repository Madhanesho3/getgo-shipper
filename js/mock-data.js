/* =====================================================
   MOCK-DATA.JS – GetGo Shipper
   Comprehensive realistic data with vehicle conditions,
   city coordinates, language strings, receivers
   ===================================================== */

const MOCK = {

  /* ── Current User ──────────────────────────────── */
  user: {
    id: 'USR001',
    name: 'Arjun Sharma',
    phone: '+91 98765 43210',
    email: 'arjun.sharma@gmail.com',
    avatar: null,
    walletBalance: 2450,
    totalShipments: 47,
    rating: 4.8,
    referralCode: 'ARJUN20',
    joinedDate: '2024-03-15',
    savedAddresses: [
      { id: 'addr1', label: 'Home',      icon: '🏠', address: '14, Anand Nagar, Sector 12, Noida, UP 201301',           lat: 28.5355, lng: 77.3910 },
      { id: 'addr2', label: 'Office',    icon: '🏢', address: 'Tower B, Cyber City, DLF Phase 2, Gurugram, HR 122002', lat: 28.4949, lng: 77.0884 },
      { id: 'addr3', label: "Mom's",     icon: '⭐', address: '5A, Gandhi Street, Lajpat Nagar, New Delhi 110024',      lat: 28.5677, lng: 77.2437 },
    ]
  },

  /* ── City Coordinates DB (India) ───────────────── */
  cityCoords: {
    'delhi':           { lat: 28.6139, lng: 77.2090 },
    'new delhi':       { lat: 28.6139, lng: 77.2090 },
    'noida':           { lat: 28.5355, lng: 77.3910 },
    'sector 12':       { lat: 28.5390, lng: 77.3870 },
    'sector 18':       { lat: 28.5679, lng: 77.3218 },
    'sector 62':       { lat: 28.6250, lng: 77.3697 },
    'gurugram':        { lat: 28.4595, lng: 77.0266 },
    'gurgaon':         { lat: 28.4595, lng: 77.0266 },
    'cyber city':      { lat: 28.4949, lng: 77.0884 },
    'dlf phase 2':     { lat: 28.4949, lng: 77.0884 },
    'faridabad':       { lat: 28.4089, lng: 77.3178 },
    'lajpat nagar':    { lat: 28.5677, lng: 77.2437 },
    'connaught place': { lat: 28.6326, lng: 77.2197 },
    'rajouri garden':  { lat: 28.6448, lng: 77.1268 },
    'dwarka':          { lat: 28.5921, lng: 77.0460 },
    'rohini':          { lat: 28.7390, lng: 77.1267 },
    'saket':           { lat: 28.5245, lng: 77.2066 },
    'anand nagar':     { lat: 28.5355, lng: 77.3910 },
    'mumbai':          { lat: 19.0760, lng: 72.8777 },
    'bandra':          { lat: 19.0596, lng: 72.8295 },
    'powai':           { lat: 19.1197, lng: 72.9052 },
    'thane':           { lat: 19.2183, lng: 72.9781 },
    'pune':            { lat: 18.5204, lng: 73.8567 },
    'kothrud':         { lat: 18.5074, lng: 73.8077 },
    'bangalore':       { lat: 12.9716, lng: 77.5946 },
    'bengaluru':       { lat: 12.9716, lng: 77.5946 },
    'indiranagar':     { lat: 12.9784, lng: 77.6408 },
    'whitefield':      { lat: 12.9698, lng: 77.7500 },
    'koramangala':     { lat: 12.9352, lng: 77.6245 },
    'hyderabad':       { lat: 17.3850, lng: 78.4867 },
    'hitech city':     { lat: 17.4435, lng: 78.3772 },
    'banjara hills':   { lat: 17.4126, lng: 78.4480 },
    'chennai':         { lat: 13.0827, lng: 80.2707 },
    'anna nagar':      { lat: 13.0857, lng: 80.2101 },
    'kolkata':         { lat: 22.5726, lng: 88.3639 },
    'salt lake':       { lat: 22.5952, lng: 88.4162 },
    'ahmedabad':       { lat: 23.0225, lng: 72.5714 },
    'jaipur':          { lat: 26.9124, lng: 75.7873 },
    'lucknow':         { lat: 26.8467, lng: 80.9462 },
    'chandigarh':      { lat: 30.7333, lng: 76.7794 },
    'indore':          { lat: 22.7196, lng: 75.8577 },
    'bhopal':          { lat: 23.2599, lng: 77.4126 },
    'agra':            { lat: 27.1767, lng: 78.0081 },
    'surat':           { lat: 21.1702, lng: 72.8311 },
    'kochi':           { lat:  9.9312, lng: 76.2673 },
    'coimbatore':      { lat: 11.0168, lng: 76.9558 },
    'nagpur':          { lat: 21.1458, lng: 79.0882 },
    'goa':             { lat: 15.2993, lng: 74.1240 },
    'varanasi':        { lat: 25.3176, lng: 82.9739 },
    'patna':           { lat: 25.5941, lng: 85.1376 },
    'visakhapatnam':   { lat: 17.6868, lng: 83.2185 },
  },

  getCityCoords(address) {
    if (!address) return null;
    const lower = address.toLowerCase();
    for (const [key, coords] of Object.entries(this.cityCoords)) {
      if (lower.includes(key)) return { ...coords };
    }
    return null;
  },

  /* ── Vehicles with Conditions ──────────────────── */
  vehicles: {
    parcel: [
      {
        id: 'v1', name: 'Bike', icon: '🏍️',
        capacity: '≤ 10 kg', dims: '30×30×30 cm',
        baseFare: 29, perKm: 8, eta: '5–8 min',
        suitable: 'Documents, medicines, small boxes',
        tag: 'Fastest', tagColor: '#10B981',
        available: true, nearbyCount: 4,
        img: 'assets/vehicles/bike.png'
      },
      {
        id: 'v2', name: 'Scooter', icon: '🛵',
        capacity: '≤ 15 kg', dims: '40×30×30 cm',
        baseFare: 35, perKm: 10, eta: '6–10 min',
        suitable: 'Clothes, food, gifts, parcels',
        tag: 'Popular', tagColor: '#3B82F6',
        available: true, nearbyCount: 3,
        img: 'assets/vehicles/bike.png'
      },
      {
        id: 'v3', name: 'EV Bike', icon: '⚡',
        capacity: '≤ 20 kg', dims: '50×40×30 cm',
        baseFare: 32, perKm: 9, eta: '7–12 min',
        suitable: 'Eco-friendly, same-day delivery',
        tag: 'Eco', tagColor: '#059669',
        available: true, nearbyCount: 2,
        img: 'assets/vehicles/bike.png'
      },
      {
        id: 'v3b', name: '3-Wheeler', icon: '🛺',
        capacity: '≤ 50 kg', dims: '60×50×40 cm',
        baseFare: 59, perKm: 12, eta: '10–15 min',
        suitable: 'Multiple boxes, bulkier parcels',
        tag: 'Economy', tagColor: '#7C3AED',
        available: false, nextAvailableIn: 12,
        img: 'assets/vehicles/bike.png'
      },
    ],
    load: [
      {
        id: 'v4', name: 'Tata Ace', icon: '🚐',
        capacity: '≤ 750 kg', dims: '7×4×4 ft',
        baseFare: 349, perKm: 22, eta: '15–20 min',
        suitable: 'Home goods, small furniture',
        tag: 'Compact', tagColor: '#3B82F6',
        available: true, nearbyCount: 3,
        img: 'assets/vehicles/truck.png'
      },
      {
        id: 'v5', name: 'Mini Truck', icon: '🚚',
        capacity: '≤ 1,500 kg', dims: '10×5×5 ft',
        baseFare: 499, perKm: 28, eta: '20–30 min',
        suitable: 'Appliances, furniture sets',
        tag: 'Best Value', tagColor: '#10B981',
        available: true, nearbyCount: 2,
        img: 'assets/vehicles/truck.png'
      },
      {
        id: 'v6', name: 'Pickup Truck', icon: '🛻',
        capacity: '≤ 2,000 kg', dims: '12×6×5 ft',
        baseFare: 649, perKm: 32, eta: '25–35 min',
        suitable: 'Office goods, machinery, equipment',
        tag: 'Business', tagColor: '#F59E0B',
        available: true, nearbyCount: 1,
        img: 'assets/vehicles/truck.png'
      },
      {
        id: 'v7', name: 'Medium Truck', icon: '🚛',
        capacity: '≤ 5,000 kg', dims: '17×7×6 ft',
        baseFare: 999, perKm: 42, eta: '30–45 min',
        suitable: 'Warehouse deliveries, bulk goods',
        tag: 'Heavy', tagColor: '#EF4444',
        available: false, nextAvailableIn: 20,
        img: 'assets/vehicles/truck.png'
      },
      {
        id: 'v8', name: 'Large Truck', icon: '🚛',
        capacity: '≤ 9,000 kg', dims: '22×8×7 ft',
        baseFare: 1499, perKm: 58, eta: '40–60 min',
        suitable: 'Heavy machinery, interstate loads',
        tag: 'Interstate', tagColor: '#6366F1',
        available: true, nearbyCount: 1,
        img: 'assets/vehicles/truck.png'
      },
      {
        id: 'v9', name: 'Container', icon: '🚛',
        capacity: '≤ 15,000 kg', dims: '32×8×8 ft',
        baseFare: 2499, perKm: 85, eta: '60–90 min',
        suitable: 'Bulk freight, exports, logistics ops',
        tag: 'Freight', tagColor: '#0F172A',
        available: true, nearbyCount: 1,
        img: 'assets/vehicles/truck.png'
      },
    ]
  },

  getAllVehicles() {
    return [...this.vehicles.parcel, ...this.vehicles.load];
  },

  getVehicle(id) {
    return this.getAllVehicles().find(v => v.id === id);
  },

  /* ── Drivers ───────────────────────────────────── */
  drivers: [
    { id: 'd1', name: 'Ramesh Kumar',   phone: '+91 98112 34567', vehicle: 'KA 05 AB 1234', vehicleType: 'Bike',       icon: '🏍️', rating: 4.9, trips: 1247, lat: 28.5398, lng: 77.3860 },
    { id: 'd2', name: 'Suresh Patel',   phone: '+91 97332 89012', vehicle: 'DL 07 CD 5678', vehicleType: 'Scooter',    icon: '🛵', rating: 4.7, trips: 834,  lat: 28.5410, lng: 77.3920 },
    { id: 'd3', name: 'Vijay Singh',    phone: '+91 96543 21098', vehicle: 'MH 04 EF 9012', vehicleType: 'Tata Ace',   icon: '🚐', rating: 4.8, trips: 562,  lat: 28.5430, lng: 77.3880 },
    { id: 'd4', name: 'Arun Yadav',     phone: '+91 99876 54321', vehicle: 'TN 09 GH 3456', vehicleType: 'Mini Truck', icon: '🚚', rating: 4.6, trips: 391,  lat: 28.5450, lng: 77.3900 },
    { id: 'd5', name: 'Pradeep Sharma', phone: '+91 95432 10987', vehicle: 'UP 16 IJ 7890', vehicleType: 'EV Bike',    icon: '⚡', rating: 4.9, trips: 723,  lat: 28.5360, lng: 77.3940 },
  ],

  getRandomDriver() {
    return this.drivers[Math.floor(Math.random() * this.drivers.length)];
  },

  /* ── Bookings ──────────────────────────────────── */
  bookings: [
    {
      id: 'BK2024112401', type: 'Parcel', subtype: 'Single',
      status: 'In Transit', date: '2024-11-24', time: '16:45',
      pickup: '14, Anand Nagar, Noida', drop: 'Rajouri Garden, Delhi',
      vehicle: 'Scooter', driver: 'Suresh Patel', vehicleId: 'v2',
      distance: 28.7, fare: 322, paymentMode: 'Wallet',
      rating: null, otp: '5619',
    },
    {
      id: 'BK2024112301', type: 'Parcel', subtype: 'Multi-drop',
      status: 'Completed', date: '2024-11-23', time: '14:30',
      pickup: '14, Anand Nagar, Noida', drop: 'Cyber City, Gurugram',
      vehicle: 'Bike', driver: 'Ramesh Kumar', vehicleId: 'v1',
      distance: 34.2, fare: 318, paymentMode: 'UPI',
      rating: 5, review: 'Very fast delivery!', otp: '4821',
    },
    {
      id: 'BK2024112201', type: 'Load', subtype: 'Single',
      status: 'Completed', date: '2024-11-22', time: '10:00',
      pickup: 'Gandhi Street, Lajpat Nagar', drop: '14, Anand Nagar, Noida',
      vehicle: 'Tata Ace', driver: 'Vijay Singh', vehicleId: 'v4',
      distance: 22.5, fare: 844, paymentMode: 'Cash',
      rating: 4, review: null, otp: '9372',
    },
    {
      id: 'BK2024112101', type: 'Parcel', subtype: 'Single',
      status: 'Cancelled', date: '2024-11-21', time: '09:15',
      pickup: 'Sector 18, Noida', drop: 'Connaught Place, Delhi',
      vehicle: 'Scooter', driver: null, vehicleId: 'v2',
      distance: 0, fare: 0, paymentMode: 'Wallet',
      rating: null, cancellationReason: 'No driver available',
    },
    {
      id: 'BK2024112001', type: 'Freight', subtype: 'Scheduled',
      status: 'Completed', date: '2024-11-20', time: '08:00',
      pickup: 'Delhi', drop: 'Mumbai',
      vehicle: 'Container', driver: 'Arun Yadav', vehicleId: 'v9',
      distance: 1450, fare: 124750, paymentMode: 'NEFT',
      rating: 5, review: 'Professional and on time!', otp: null,
    },
  ],

  /* ── Notifications ─────────────────────────────── */
  notifications: [
    { id: 'n1', type: 'booking', icon: '📦', title: 'Package Delivered!',   body: 'Your parcel to Cyber City has been delivered. Rate your experience.', time: '2 min ago',  read: false },
    { id: 'n2', type: 'payment', icon: '💳', title: 'Payment Received',     body: '₹318 debited via UPI for booking BK2024112301.',                       time: '5 min ago',  read: false },
    { id: 'n3', type: 'booking', icon: '🚛', title: 'Driver Assigned',      body: 'Suresh Patel is heading to your pickup location. ETA: 8 min.',         time: '1 hr ago',   read: false },
    { id: 'n4', type: 'promo',   icon: '🎉', title: 'Weekend Special!',     body: 'Get 20% off on all load deliveries this weekend. Use code WEEKEND20.', time: '3 hrs ago',  read: true  },
    { id: 'n5', type: 'booking', icon: '✅', title: 'Booking Confirmed',    body: 'Your booking BK2024112401 is confirmed. Driver arriving soon.',         time: '5 hrs ago',  read: true  },
    { id: 'n6', type: 'promo',   icon: '🎁', title: 'Refer & Earn',         body: 'Share your code ARJUN20 and earn ₹50 per successful referral.',         time: '1 day ago',  read: true  },
    { id: 'n7', type: 'system',  icon: '📍', title: 'Location Updated',     body: 'Your home address has been updated successfully.',                      time: '2 days ago', read: true  },
  ],

  /* ── Transactions ──────────────────────────────── */
  transactions: [
    { id: 't1', type: 'debit',  desc: 'Booking BK2024112401',   amount: 322,  date: '24 Nov 2024', mode: 'Wallet', balance: 2128 },
    { id: 't2', type: 'debit',  desc: 'Booking BK2024112301',   amount: 318,  date: '23 Nov 2024', mode: 'UPI',    balance: 2450 },
    { id: 't3', type: 'credit', desc: 'Wallet Top-up',          amount: 500,  date: '22 Nov 2024', mode: 'UPI',    balance: 2768 },
    { id: 't4', type: 'debit',  desc: 'Booking BK2024112201',   amount: 844,  date: '22 Nov 2024', mode: 'Cash',   balance: 2268 },
    { id: 't5', type: 'credit', desc: 'Referral Bonus – ARJUN', amount: 100,  date: '20 Nov 2024', mode: 'Bonus',  balance: 3112 },
    { id: 't6', type: 'debit',  desc: 'Booking BK2024111901',   amount: 525,  date: '19 Nov 2024', mode: 'Wallet', balance: 3012 },
    { id: 't7', type: 'credit', desc: 'Cashback on delivery',   amount: 29,   date: '18 Nov 2024', mode: 'Bonus',  balance: 3537 },
    { id: 't8', type: 'credit', desc: 'Wallet Top-up',          amount: 1000, date: '15 Nov 2024', mode: 'Card',   balance: 3508 },
  ],

  /* ── Promo Codes ───────────────────────────────── */
  promoCodes: [
    { code: 'GETGO10',   discount: 10,  type: 'percent', desc: '10% off on first 3 bookings',       min: 100 },
    { code: 'WEEKEND20', discount: 20,  type: 'percent', desc: '20% off on load deliveries',        min: 300 },
    { code: 'FLAT50',    discount: 50,  type: 'flat',    desc: '₹50 off on bookings above ₹200',   min: 200 },
    { code: 'NEWUSER',   discount: 100, type: 'flat',    desc: '₹100 off for new users',            min: 150 },
    { code: 'FREIGHT15', discount: 15,  type: 'percent', desc: '15% off on freight bookings',       min: 1000 },
  ],

  /* ── Recent Locations ──────────────────────────── */
  recentLocations: [
    { label: 'Cyber City, Gurugram',        icon: '🏢', address: 'DLF Cyber City, Phase 2, Gurugram' },
    { label: 'Connaught Place, Delhi',       icon: '📍', address: 'Connaught Place, New Delhi 110001' },
    { label: 'Indiranagar, Bangalore',       icon: '📍', address: 'Indiranagar, Bengaluru 560038' },
    { label: 'Hiranandani Gardens, Mumbai',  icon: '📍', address: 'Hiranandani Gardens, Powai, Mumbai' },
  ],

  /* ── Booking Status Steps ──────────────────────── */
  statusSteps: [
    { key: 'searching',  label: 'Searching Driver',    icon: '🔍', desc: 'Finding nearest available driver' },
    { key: 'assigned',   label: 'Driver Assigned',     icon: '✅', desc: 'Driver accepted your booking' },
    { key: 'arriving',   label: 'Driver Arriving',     icon: '🚗', desc: 'On the way to pickup location' },
    { key: 'picked',     label: 'Pickup Completed',    icon: '📦', desc: 'Package collected successfully' },
    { key: 'transit',    label: 'In Transit',          icon: '🚀', desc: 'Package en route to destination' },
    { key: 'reached',    label: 'Reached Destination', icon: '📍', desc: 'Driver at drop location' },
    { key: 'delivered',  label: 'Delivered',           icon: '🎉', desc: 'Package delivered successfully' },
  ],

  /* ── Languages ─────────────────────────────────── */
  languages: [
    { code: 'en', name: 'English',    native: 'English',    flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi',      native: 'हिन्दी',      flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil',      native: 'தமிழ்',       flag: '🇮🇳' },
    { code: 'te', name: 'Telugu',     native: 'తెలుగు',       flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada',    native: 'ಕನ್ನಡ',        flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi',    native: 'मराठी',        flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali',    native: 'বাংলা',        flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati',   native: 'ગુજરાતી',      flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam',  native: 'മലയാളം',       flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi',    native: 'ਪੰਜਾਬੀ',       flag: '🇮🇳' },
  ],

  /* ── Language Strings ──────────────────────────── */
  i18n: {
    en: {
      nav_home:'Home', nav_bookings:'Bookings', nav_alerts:'Alerts', nav_wallet:'Wallet', nav_profile:'Profile',
      greeting_morning:'Good morning,', greeting_afternoon:'Good afternoon,', greeting_evening:'Good evening,',
      book_delivery:'Book a Delivery', parcel:'Parcel Delivery', load:'Load Delivery', freight:'Freight Market',
      recent_bookings:'Recent Bookings', view_all:'View All', quick_actions:'Quick Actions',
      pickup:'Pickup Location', drop:'Drop Location', continue_btn:'Continue', back_btn:'Back',
      confirm_booking:'Confirm & Book', find_vehicle:'Find Vehicle', track_live:'Track Live',
      select_vehicle:'Select Vehicle', fare_breakdown:'Fare Breakdown', payment_method:'Payment Method',
      wallet:'Wallet', add_money:'Add Money', profile:'Profile', settings:'Settings',
      dark_mode:'Dark Mode', language:'Language', notifications:'Notifications',
      help_support:'Help & Support', logout:'Logout',
      receiver_name:'Receiver Name', receiver_phone:'Receiver Phone', add_stop:'+ Add Stop',
      otp:'OTP', delivery_otp:'Delivery OTP',
    },
    hi: {
      nav_home:'होम', nav_bookings:'बुकिंग', nav_alerts:'सूचनाएं', nav_wallet:'वॉलेट', nav_profile:'प्रोफ़ाइल',
      greeting_morning:'सुप्रभात,', greeting_afternoon:'नमस्कार,', greeting_evening:'शुभ संध्या,',
      book_delivery:'डिलीवरी बुक करें', parcel:'पार्सल डिलीवरी', load:'लोड डिलीवरी', freight:'फ्रेट मार्केट',
      recent_bookings:'हाल की बुकिंग', view_all:'सब देखें', quick_actions:'त्वरित क्रियाएं',
      pickup:'पिकअप स्थान', drop:'ड्रॉप स्थान', continue_btn:'जारी रखें', back_btn:'वापस',
      confirm_booking:'बुकिंग कन्फर्म करें', find_vehicle:'वाहन खोजें', track_live:'लाइव ट्रैक',
      select_vehicle:'वाहन चुनें', fare_breakdown:'किराया विवरण', payment_method:'भुगतान विधि',
      wallet:'वॉलेट', add_money:'पैसे जोड़ें', profile:'प्रोफ़ाइल', settings:'सेटिंग्स',
      dark_mode:'डार्क मोड', language:'भाषा', notifications:'सूचनाएं',
      help_support:'सहायता', logout:'लॉग आउट',
      receiver_name:'प्राप्तकर्ता का नाम', receiver_phone:'प्राप्तकर्ता का फोन', add_stop:'+ स्टॉप जोड़ें',
      otp:'ओटीपी', delivery_otp:'डिलीवरी ओटीपी',
    },
    ta: {
      nav_home:'முகப்பு', nav_bookings:'முன்பதிவுகள்', nav_alerts:'விழிப்பூட்டல்கள்', nav_wallet:'பணப்பை', nav_profile:'சுயவிவரம்',
      greeting_morning:'காலை வணக்கம்,', greeting_afternoon:'மதிய வணக்கம்,', greeting_evening:'மாலை வணக்கம்,',
      book_delivery:'டெலிவரி பதிவு', parcel:'பார்சல் டெலிவரி', load:'சரக்கு டெலிவரி', freight:'சரக்கு சந்தை',
      recent_bookings:'சமீபத்திய முன்பதிவுகள்', view_all:'அனைத்தும்', quick_actions:'விரைவு செயல்கள்',
      pickup:'எடுக்கும் இடம்', drop:'கொடுக்கும் இடம்', continue_btn:'தொடரவும்', back_btn:'திரும்பு',
      confirm_booking:'உறுதிப்படுத்து', find_vehicle:'வாகனம் தேடு', track_live:'நேரடி கண்காணிப்பு',
      select_vehicle:'வாகனம் தேர்வு', fare_breakdown:'கட்டண விவரம்', payment_method:'கட்டண முறை',
      wallet:'பணப்பை', add_money:'பணம் சேர்', profile:'சுயவிவரம்', settings:'அமைப்புகள்',
      dark_mode:'இருண்ட பயன்முறை', language:'மொழி', notifications:'அறிவிப்புகள்',
      help_support:'உதவி', logout:'வெளியேறு',
      receiver_name:'பெறுபவர் பெயர்', receiver_phone:'பெறுபவர் தொலைபேசி', add_stop:'+ நிறுத்தம் சேர்',
      otp:'OTP', delivery_otp:'டெலிவரி OTP',
    },
    te: {
      nav_home:'హోమ్', nav_bookings:'బుకింగ్లు', nav_alerts:'హెచ్చరికలు', nav_wallet:'వాలెట్', nav_profile:'ప్రొఫైల్',
      greeting_morning:'శుభోదయం,', greeting_afternoon:'నమస్కారం,', greeting_evening:'శుభ సాయంత్రం,',
      book_delivery:'డెలివరీ బుక్', parcel:'పార్సెల్ డెలివరీ', load:'లోడ్ డెలివరీ', freight:'సరుకు మార్కెట్',
      recent_bookings:'ఇటీవల బుకింగ్లు', view_all:'అన్నీ చూడు', quick_actions:'శీఘ్ర చర్యలు',
      pickup:'పికప్ స్థానం', drop:'డ్రాప్ స్థానం', continue_btn:'కొనసాగించు', back_btn:'వెనక్కి',
      wallet:'వాలెట్', settings:'సెట్టింగ్లు', dark_mode:'డార్క్ మోడ్', language:'భాష',
      logout:'లాగ్ అవుట్', receiver_name:'స్వీకర్త పేరు', receiver_phone:'స్వీకర్త ఫోన్',
      add_stop:'+ స్టాప్ జోడించు', otp:'OTP', delivery_otp:'డెలివరీ OTP',
    },
    kn: {
      nav_home:'ಮನೆ', nav_bookings:'ಬುಕಿಂಗ್', nav_alerts:'ಅಲರ್ಟ್', nav_wallet:'ವ್ಯಾಲೆಟ್', nav_profile:'ಪ್ರೊಫೈಲ್',
      greeting_morning:'ಶುಭೋದಯ,', greeting_afternoon:'ನಮಸ್ಕಾರ,', greeting_evening:'ಶುಭ ಸಂಜೆ,',
      book_delivery:'ಡೆಲಿವರಿ ಬುಕ್ ಮಾಡಿ', parcel:'ಪಾರ್ಸೆಲ್', load:'ಲೋಡ್', freight:'ಸರಕು',
      wallet:'ವ್ಯಾಲೆಟ್', settings:'ಸೆಟ್ಟಿಂಗ್ಸ್', dark_mode:'ಡಾರ್ಕ್ ಮೋಡ್', language:'ಭಾಷೆ',
      logout:'ಲಾಗ್ ಔಟ್', receiver_name:'ಸ್ವೀಕರ್ತನ ಹೆಸರು', receiver_phone:'ಸ್ವೀಕರ್ತನ ಫೋನ್',
    },
    mr: {
      nav_home:'मुख्यपृष्ठ', nav_bookings:'बुकिंग', nav_alerts:'सूचना', nav_wallet:'वॉलेट', nav_profile:'प्रोफाइल',
      greeting_morning:'सुप्रभात,', greeting_afternoon:'नमस्कार,', greeting_evening:'शुभ संध्याकाळ,',
      book_delivery:'डिलिव्हरी बुक करा', parcel:'पार्सल', load:'लोड', freight:'मालवाहतूक',
      wallet:'वॉलेट', settings:'सेटिंग्ज', dark_mode:'डार्क मोड', language:'भाषा', logout:'लॉगआउट',
      receiver_name:'प्राप्तकर्त्याचे नाव', receiver_phone:'प्राप्तकर्त्याचा फोन',
    },
    bn: {
      nav_home:'হোম', nav_bookings:'বুকিং', nav_alerts:'বিজ্ঞপ্তি', nav_wallet:'ওয়ালেট', nav_profile:'প্রোফাইল',
      greeting_morning:'শুভ সকাল,', greeting_afternoon:'নমস্কার,', greeting_evening:'শুভ সন্ধ্যা,',
      book_delivery:'ডেলিভারি বুক করুন', parcel:'পার্সেল', load:'লোড', freight:'পণ্যবাহী',
      wallet:'ওয়ালেট', settings:'সেটিংস', dark_mode:'ডার্ক মোড', language:'ভাষা', logout:'লগআউট',
    },
    gu: {
      nav_home:'હોમ', nav_bookings:'બુકિંગ', nav_alerts:'સૂચના', nav_wallet:'વૉલેટ', nav_profile:'પ્રોફાઇલ',
      greeting_morning:'સુ-પ્રભાત,', greeting_afternoon:'નમસ્કાર,', greeting_evening:'સુ-સંધ્યા,',
      book_delivery:'ડિલિવરી બુક કરો', parcel:'પાર્સલ', load:'ભાર', freight:'માલ',
      wallet:'વૉલેટ', settings:'સેટિંગ્સ', dark_mode:'ડાર્ક મોડ', language:'ભાષા', logout:'લૉગ આઉટ',
    },
    ml: {
      nav_home:'ഹോം', nav_bookings:'ബുക്കിംഗ്', nav_alerts:'അലർട്ടുകൾ', nav_wallet:'വാലറ്റ്', nav_profile:'പ്രൊഫൈൽ',
      greeting_morning:'സുപ്രഭാതം,', greeting_afternoon:'നമസ്കാരം,', greeting_evening:'ശുഭ സന്ധ്യ,',
      book_delivery:'ഡെലിവറി ബുക്ക്', parcel:'പാഴ്സൽ', load:'ലോഡ്', freight:'ചരക്ക്',
      wallet:'വാലറ്റ്', settings:'ക്രമീകരണം', dark_mode:'ഡാർക്ക് മോഡ്', language:'ഭാഷ', logout:'ലോഗ്ഔട്ട്',
    },
    pa: {
      nav_home:'ਹੋਮ', nav_bookings:'ਬੁਕਿੰਗ', nav_alerts:'ਸੂਚਨਾਵਾਂ', nav_wallet:'ਵਾਲਿਟ', nav_profile:'ਪ੍ਰੋਫਾਈਲ',
      greeting_morning:'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ,', greeting_afternoon:'ਨਮਸਕਾਰ,', greeting_evening:'ਸ਼ੁਭ ਸ਼ਾਮ,',
      book_delivery:'ਡਿਲਿਵਰੀ ਬੁੱਕ ਕਰੋ', parcel:'ਪਾਰਸਲ', load:'ਲੋਡ', freight:'ਮਾਲ',
      wallet:'ਵਾਲਿਟ', settings:'ਸੈਟਿੰਗਜ਼', dark_mode:'ਡਾਰਕ ਮੋਡ', language:'ਭਾਸ਼ਾ', logout:'ਲੌਗ ਆਉਟ',
    },
  },

  /* ── Helpers ───────────────────────────────────── */
  calculateFare(vehicle, distanceKm, extras = {}) {
    let fare = vehicle.baseFare + (distanceKm * vehicle.perKm);
    if (extras.loading)   fare += 99;
    if (extras.unloading) fare += 99;
    if (extras.labour)    fare += 149;
    if (extras.stops > 0) fare += (extras.stops) * 30;
    return Math.round(fare);
  },

  applyPromo(code, baseFare) {
    const promo = this.promoCodes.find(p => p.code === code.toUpperCase());
    if (!promo) return null;
    if (baseFare < promo.min) return { error: `Minimum order ₹${promo.min} required` };
    const discount = promo.type === 'percent'
      ? Math.round(baseFare * promo.discount / 100)
      : promo.discount;
    return { discount: Math.min(discount, baseFare * 0.5), promo };
  },

  estimateDistance(pickup, drop) {
    const p = this.getCityCoords(pickup);
    const d = this.getCityCoords(drop);
    if (p && d) {
      // Haversine approximation
      const R = 6371;
      const dLat = (d.lat - p.lat) * Math.PI / 180;
      const dLng = (d.lng - p.lng) * Math.PI / 180;
      const a = Math.sin(dLat/2)**2 + Math.cos(p.lat*Math.PI/180)*Math.cos(d.lat*Math.PI/180)*Math.sin(dLng/2)**2;
      return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 1.3).toFixed(1));
    }
    return parseFloat((Math.random() * 25 + 5).toFixed(1));
  },

  generateOTP() {
    return String(Math.floor(1000 + Math.random() * 9000));
  },
};
