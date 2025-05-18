"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "pa" | "ta" | "te"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.name": "HariBhari",
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.weather": "Weather",
    "nav.crops": "Crops",
    "nav.market": "Market",
    "nav.soil": "Soil",
    "nav.schemes": "Schemes",
    "nav.membership": "Membership",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "home.getStarted": "Get Started",
    "chatbot.welcome": "Welcome to HariBhari AI Assistant. How can I help you today?",
    "chatbot.title": "AI Farming Assistant",
    "chatbot.loading": "Thinking...",
    "chatbot.placeholder": "Ask me anything about farming...",
    "chatbot.send": "Send",
    "chatbot.suggestions": "Try asking about",
    "chatbot.suggestion1": "What is the current wheat price?",
    "chatbot.suggestion2": "Tell me about fertilizers",
    "chatbot.suggestion3": "Weather forecast",
    "footer.rights": "All rights reserved.",
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
  },
  hi: {
    "app.name": "हरिभरी",
    "nav.home": "होम",
    "nav.dashboard": "डैशबोर्ड",
    "nav.weather": "मौसम",
    "nav.crops": "फसलें",
    "nav.market": "बाज़ार",
    "nav.soil": "मिट्टी",
    "nav.schemes": "योजनाएँ",
    "nav.membership": "सदस्यता",
    "nav.profile": "प्रोफाइल",
    "nav.logout": "लॉगआउट",
    "home.getStarted": "शुरू करें",
    "chatbot.welcome": "हरिभरी AI सहायक में आपका स्वागत है। मैं आज आपकी कैसे मदद कर सकता हूं?",
    "chatbot.title": "AI कृषि सहायक",
    "chatbot.loading": "सोच रहा हूँ...",
    "chatbot.placeholder": "खेती के बारे में कुछ भी पूछें...",
    "chatbot.send": "भेजें",
    "chatbot.suggestions": "इसके बारे में पूछने का प्रयास करें",
    "chatbot.suggestion1": "गेहूं का वर्तमान मूल्य क्या है?",
    "chatbot.suggestion2": "उर्वरकों के बारे में बताएं",
    "chatbot.suggestion3": "मौसम का पूर्वानुमान",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.about": "हमारे बारे में",
    "footer.contact": "संपर्क करें",
    "footer.privacy": "गोपनीयता",
    "footer.terms": "शर्तें",
  },
  pa: {
    "app.name": "ਹਰੀਭਰੀ",
    "nav.home": "ਹੋਮ",
    "nav.dashboard": "ਡੈਸ਼ਬੋਰਡ",
    "nav.weather": "ਮੌਸਮ",
    "nav.crops": "ਫਸਲਾਂ",
    "nav.market": "ਮਾਰਕੀਟ",
    "nav.soil": "ਮਿੱਟੀ",
    "nav.schemes": "ਯੋਜਨਾਵਾਂ",
    "nav.membership": "ਮੈਂਬਰਸ਼ਿਪ",
    "nav.profile": "ਪ੍ਰੋਫਾਈਲ",
    "nav.logout": "ਲੌਗਆਊਟ",
    "home.getStarted": "ਸ਼ੁਰੂ ਕਰੋ",
    "chatbot.welcome": "ਹਰੀਭਰੀ AI ਸਹਾਇਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
    "chatbot.title": "AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ",
    "chatbot.loading": "ਸੋਚ ਰਿਹਾ ਹਾਂ...",
    "chatbot.placeholder": "ਖੇਤੀਬਾੜੀ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ...",
    "chatbot.send": "ਭੇਜੋ",
    "chatbot.suggestions": "ਇਸ ਬਾਰੇ ਪੁੱਛਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    "chatbot.suggestion1": "ਕਣਕ ਦਾ ਮੌਜੂਦਾ ਮੁੱਲ ਕੀ ਹੈ?",
    "chatbot.suggestion2": "ਖਾਦਾਂ ਬਾਰੇ ਦੱਸੋ",
    "chatbot.suggestion3": "ਮੌਸਮ ਦਾ ਪੂਰਵਾਨੁਮਾਨ",
    "footer.rights": "ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।",
    "footer.about": "ਸਾਡੇ ਬਾਰੇ",
    "footer.contact": "ਸੰਪਰਕ ਕਰੋ",
    "footer.privacy": "ਪਰਾਈਵੇਸੀ",
    "footer.terms": "ਸ਼ਰਤਾਂ",
  },
  ta: {
    "app.name": "ஹரிபாரி",
    "nav.home": "முகப்பு",
    "nav.dashboard": "டாஷ்போர்டு",
    "nav.weather": "வானிலை",
    "nav.crops": "பயிர்கள்",
    "nav.market": "சந்தை",
    "nav.soil": "மண்",
    "nav.schemes": "திட்டங்கள்",
    "nav.membership": "உறுப்பினர்",
    "nav.profile": "சுயவிவரம்",
    "nav.logout": "வெளியேறு",
    "home.getStarted": "தொடங்கவும்",
    "chatbot.welcome": "ஹரிபாரி AI உதவியாளருக்கு வரவேற்கிறோம். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    "chatbot.title": "AI விவசாய உதவியாளர்",
    "chatbot.loading": "யோசிக்கிறேன்...",
    "chatbot.placeholder": "விவசாயம் பற்றி எதையும் கேளுங்கள்...",
    "chatbot.send": "அனுப்பு",
    "chatbot.suggestions": "இதைப் பற்றி கேட்க முயற்சிக்கவும்",
    "chatbot.suggestion1": "கோதுமையின் தற்போதைய விலை என்ன?",
    "chatbot.suggestion2": "உரங்களைப் பற்றி சொல்லுங்கள்",
    "chatbot.suggestion3": "வானிலை முன்னறிவிப்பு",
    "footer.rights": "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    "footer.about": "எங்களைப் பற்றி",
    "footer.contact": "தொடர்பு",
    "footer.privacy": "தனியுரிமை",
    "footer.terms": "விதிமுறைகள்",
  },
  te: {
    "app.name": "హరిభరి",
    "nav.home": "హోమ్",
    "nav.dashboard": "డాష్‌బోర్డ్",
    "nav.weather": "వాతావరణం",
    "nav.crops": "పంటలు",
    "nav.market": "మార్కెట్",
    "nav.soil": "మట్టి",
    "nav.schemes": "పథకాలు",
    "nav.membership": "సభ్యత్వం",
    "nav.profile": "ప్రొఫైల్",
    "nav.logout": "లాగ్అవుట్",
    "home.getStarted": "ప్రారంభించండి",
    "chatbot.welcome": "హరిభరి AI సహాయకుడికి స్వాగతం. నేను మీకు ఎలా సహాయం చేయగలను?",
    "chatbot.title": "AI వ్యవసాయ సహాయకుడు",
    "chatbot.loading": "ఆలోచిస్తున్నాను...",
    "chatbot.placeholder": "వ్యవసాయం గురించి ఏదైనా అడగండి...",
    "chatbot.send": "పంపండి",
    "chatbot.suggestions": "దీని గురించి అడగడానికి ప్రయత్నించండి",
    "chatbot.suggestion1": "గోధుమ ప్రస్తుత ధర ఎంత?",
    "chatbot.suggestion2": "ఎరువుల గురించి చెప్పండి",
    "chatbot.suggestion3": "వాతావరణ సూచన",
    "footer.rights": "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    "footer.about": "మా గురించి",
    "footer.contact": "సంప్రదించండి",
    "footer.privacy": "గోప్యత",
    "footer.terms": "నిబంధనలు",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
