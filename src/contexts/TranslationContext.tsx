import { createContext, useContext, useState, ReactNode } from 'react';

// Translation data for Hindi and English
const translations = {
  en: {
    // Header/Navigation
    home: 'Home',
    diagnose: 'Diagnose',
    shop: 'Shop',
    cart: 'Cart',
    orders: 'Orders',
    profile: 'Profile',
    notifications: 'Notifications',
    
    // Home Page
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon', 
    goodEvening: 'Good Evening',
    weather: 'Weather',
    location: 'Location',
    priceAlerts: 'Price Alerts',
    topHikes: 'Top Price Hikes Today',
    quickActions: 'Quick Actions',
    plantHealth: 'Plant Health Check',
    soilTest: 'Soil Health Test',
    cropAdvisory: 'Crop Advisory',
    marketPrices: 'Market Prices',
    
    // Shop
    searchProducts: 'Search products...',
    allProducts: 'All Products',
    fertilizers: 'Fertilizers',
    seeds: 'Seeds',
    pesticides: 'Pesticides',
    tools: 'Tools',
    addToCart: 'Add to Cart',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    continueShopping: 'Continue Shopping',
    
    // Cart
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    addProducts: 'Add some products to get started',
    subtotal: 'Subtotal',
    discount: 'Discount',
    delivery: 'Delivery',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Checkout
    checkout: 'Checkout',
    orderSummary: 'Order Summary',
    deliveryAddress: 'Delivery Address',
    paymentMethod: 'Payment Method',
    placeOrder: 'Place Order',
    processing: 'Processing...',
    
    // Order Success
    orderPlaced: 'Order Placed Successfully!',
    thankYou: 'Thank you for your order. We\'ll take care of your farming needs.',
    orderId: 'Order ID',
    estimatedDelivery: 'Estimated Delivery',
    viewMyOrders: 'View My Orders',
    
    // Soil Health
    soilHealthTool: 'Soil Health Tool',
    quickAssessment: 'Quick soil quality assessment for farmers',
    measurementGuide: 'How to Test Your Soil',
    phTesting: 'Soil pH Testing',
    phInstructions: 'Use a pH strip or digital meter. Mix 1 part soil with 1 part clean water, wait 30 minutes, then test. Ideal range: 6.0-7.5 for most crops.',
    moistureCheck: 'Soil Moisture Check',
    moistureInstructions: 'Squeeze test: Dry = crumbles apart, Medium = holds shape but crumbles when poked, Wet = water drips out when squeezed.',
    organicMatter: 'Organic Matter Assessment',
    organicInstructions: 'Check soil color: Good = dark brown/black with visible organic bits, Moderate = medium brown, Poor = light brown/sandy color.',
    enterMeasurements: 'Enter Your Soil Measurements',
    phLevel: 'Soil pH Level',
    moistureLevel: 'Soil Moisture Level',
    organicMatterLevel: 'Organic Matter Level',
    calculateSoilHealth: 'Calculate Soil Health',
    dry: 'Dry',
    medium: 'Medium',
    wet: 'Wet',
    poor: 'Poor',
    moderate: 'Moderate',
    good: 'Good',
    
    // Diagnosis
    plantDiagnosis: 'Plant Diagnosis',
    capturePlant: 'Capture Plant Image',
    takePhoto: 'Take a Photo',
    uploadGallery: 'Upload from Gallery',
    startDiagnosis: 'Start Diagnosis',
    selectImageFirst: 'Select an Image First',
    diagnosisComplete: 'Diagnosis Complete',
    saveToTreatments: 'Save to My Treatments',
    
    // Common
    back: 'Back',
    next: 'Next',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info'
  },
  
  hi: {
    // Header/Navigation
    home: 'होम',
    diagnose: 'निदान',
    shop: 'दुकान',
    cart: 'कार्ट',
    orders: 'ऑर्डर',
    profile: 'प्रोफाइल',
    notifications: 'सूचनाएं',
    
    // Home Page
    goodMorning: 'शुभ प्रभात',
    goodAfternoon: 'शुभ दोपहर',
    goodEvening: 'शुभ संध्या',
    weather: 'मौसम',
    location: 'स्थान',
    priceAlerts: 'मूल्य अलर्ट',
    topHikes: 'आज के टॉप प्राइस हाइक्स',
    quickActions: 'त्वरित कार्य',
    plantHealth: 'पौधे की स्वास्थ्य जांच',
    soilTest: 'मिट्टी स्वास्थ्य परीक्षण',
    cropAdvisory: 'फसल सलाह',
    marketPrices: 'बाजार मूल्य',
    
    // Shop
    searchProducts: 'उत्पाद खोजें...',
    allProducts: 'सभी उत्पाद',
    fertilizers: 'उर्वरक',
    seeds: 'बीज',
    pesticides: 'कीटनाशक',
    tools: 'उपकरण',
    addToCart: 'कार्ट में जोड़ें',
    inStock: 'स्टॉक में',
    outOfStock: 'स्टॉक खत्म',
    continueShopping: 'खरीदारी जारी रखें',
    
    // Cart
    yourCart: 'आपका कार्ट',
    cartEmpty: 'आपका कार्ट खाली है',
    addProducts: 'शुरुआत करने के लिए कुछ उत्पाद जोड़ें',
    subtotal: 'उप योग',
    discount: 'छूट',
    delivery: 'डिलीवरी',
    total: 'कुल',
    proceedToCheckout: 'चेकआउट पर जाएं',
    
    // Checkout
    checkout: 'चेकआउट',
    orderSummary: 'ऑर्डर सारांश',
    deliveryAddress: 'डिलीवरी पता',
    paymentMethod: 'भुगतान विधि',
    placeOrder: 'ऑर्डर करें',
    processing: 'प्रसंस्करण...',
    
    // Order Success
    orderPlaced: 'ऑर्डर सफलतापूर्वक दिया गया!',
    thankYou: 'आपके ऑर्डर के लिए धन्यवाद। हम आपकी खेती की जरूरतों का ख्याल रखेंगे।',
    orderId: 'ऑर्डर आईडी',
    estimatedDelivery: 'अनुमानित डिलीवरी',
    viewMyOrders: 'मेरे ऑर्डर देखें',
    
    // Soil Health
    soilHealthTool: 'मिट्टी स्वास्थ्य उपकरण',
    quickAssessment: 'किसानों के लिए त्वरित मिट्टी गुणवत्ता आकलन',
    measurementGuide: 'अपनी मिट्टी का परीक्षण कैसे करें',
    phTesting: 'मिट्टी pH परीक्षण',
    phInstructions: 'pH स्ट्रिप या डिजिटल मीटर का उपयोग करें। 1 हिस्सा मिट्टी को 1 हिस्सा साफ पानी के साथ मिलाएं, 30 मिनट प्रतीक्षा करें, फिर परीक्षण करें। आदर्श सीमा: अधिकांश फसलों के लिए 6.0-7.5।',
    moistureCheck: 'मिट्टी नमी जांच',
    moistureInstructions: 'निचोड़ परीक्षण: सूखा = टूट जाता है, मध्यम = आकार बनाए रखता है लेकिन दबाने पर टूटता है, गीला = निचोड़ने पर पानी निकलता है।',
    organicMatter: 'जैविक पदार्थ आकलन',
    organicInstructions: 'मिट्टी का रंग देखें: अच्छा = काला/गहरा भूरा दिखाई देने वाले जैविक टुकड़ों के साथ, मध्यम = मध्यम भूरा, खराब = हल्का भूरा/रेतीला रंग।',
    enterMeasurements: 'अपनी मिट्टी के मापदंड दर्ज करें',
    phLevel: 'मिट्टी pH स्तर',
    moistureLevel: 'मिट्टी नमी स्तर',
    organicMatterLevel: 'जैविक पदार्थ स्तर',
    calculateSoilHealth: 'मिट्टी स्वास्थ्य गणना करें',
    dry: 'सूखा',
    medium: 'मध्यम',
    wet: 'गीला',
    poor: 'खराब',
    moderate: 'मध्यम',
    good: 'अच्छा',
    
    // Diagnosis
    plantDiagnosis: 'पौधे का निदान',
    capturePlant: 'पौधे की छवि कैप्चर करें',
    takePhoto: 'फोटो लें',
    uploadGallery: 'गैलरी से अपलोड करें',
    startDiagnosis: 'निदान शुरू करें',
    selectImageFirst: 'पहले छवि चुनें',
    diagnosisComplete: 'निदान पूर्ण',
    saveToTreatments: 'मेरे उपचार में सहेजें',
    
    // Common
    back: 'वापस',
    next: 'अगला',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    warning: 'चेतावनी',
    info: 'जानकारी'
  }
};

interface TranslationContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};