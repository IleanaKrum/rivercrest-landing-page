import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isRotating, setIsRotating] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'sw') => {
    setIsRotating(true);
    setLanguage(lang);
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 transition-all duration-300 hover:scale-105 active:scale-95"
          title={t('language.select')}
        >
          <Globe 
            className={`w-4 h-4 transition-transform duration-600 ${
              isRotating ? 'rotate-180' : ''
            }`}
          />
          <span className="hidden sm:inline transition-opacity duration-300">
            {language === 'en' ? t('language.english') : t('language.swahili')}
          </span>
          <span className="sm:hidden transition-opacity duration-300">{language.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end"
        className="animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={`transition-all duration-200 ${
            language === 'en' 
              ? 'bg-accent' 
              : 'hover:bg-accent/50'
          }`}
        >
          {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('sw')}
          className={`transition-all duration-200 ${
            language === 'sw' 
              ? 'bg-accent' 
              : 'hover:bg-accent/50'
          }`}
        >
          {t('language.swahili')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
