'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="bg-white rounded-lg shadow-md p-1 flex border border-amber-200">
      <button
        onClick={() => setLanguage('vi')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'vi' 
            ? 'bg-amber-600 text-white' 
            : 'text-gray-600 hover:text-amber-600'
        }`}
      >
        VI
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en' 
            ? 'bg-amber-600 text-white' 
            : 'text-gray-600 hover:text-amber-600'
        }`}
      >
        EN
      </button>
    </div>
  )
} 