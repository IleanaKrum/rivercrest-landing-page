import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, lang?: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    'dashboard.title': 'Student Dashboard',
    'dashboard.enrollments': 'My Enrollments',
    'dashboard.progress': 'My Progress',
    'dashboard.courses': 'Available Courses',
    'dashboard.noEnrollments': 'You are not enrolled in any courses yet.',
    'dashboard.enrollNow': 'Enroll in a course to get started.',
    'course.title': 'Course',
    'course.description': 'Description',
    'course.sessions': 'Sessions',
    'course.hoursRequired': 'Hours Required',
    'course.progress': 'Progress',
    'course.sessions.completed': 'Completed',
    'course.sessions.total': 'Total',
    'course.syllabus': 'Course Syllabus',
    'course.enroll': 'Enroll',
    'course.enrolled': 'Enrolled',
    'course.viewDetails': 'View Details',
    'course.markComplete': 'Mark Complete',
    'course.session': 'Session',
    'course.duration': 'Duration',
    'course.content': 'Content',
    'submissions.title': 'My Submissions',
    'submissions.noSubmissions': 'You have no submissions yet.',
    'submissions.submit': 'Submit Assignment',
    'submissions.submitted': 'Submitted',
    'submissions.graded': 'Graded',
    'submissions.pending': 'Pending Review',
    'submissions.grade': 'Grade',
    'submissions.feedback': 'Feedback',
    'language.select': 'Select Language',
    'language.english': 'English',
    'language.swahili': 'Swahili',
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.submissions': 'Submissions',
    'nav.logout': 'Logout',
  },
  sw: {
    'dashboard.title': 'Dashibodi ya Wanafunzi',
    'dashboard.enrollments': 'Kozi Zangu',
    'dashboard.progress': 'Maendeleo Yangu',
    'dashboard.courses': 'Kozi Zinazopatikana',
    'dashboard.noEnrollments': 'Haujajisajili katika kozi yoyote bado.',
    'dashboard.enrollNow': 'Jisajili katika kozi kuanza.',
    'course.title': 'Kozi',
    'course.description': 'Maelezo',
    'course.sessions': 'Sehemu',
    'course.hoursRequired': 'Saa Zinazohitajika',
    'course.progress': 'Maendeleo',
    'course.sessions.completed': 'Imekamilika',
    'course.sessions.total': 'Jumla',
    'course.syllabus': 'Muhtasari wa Kozi',
    'course.enroll': 'Jisajili',
    'course.enrolled': 'Umesajiliwa',
    'course.viewDetails': 'Angalia Maelezo',
    'course.markComplete': 'Weka Alama Kamili',
    'course.session': 'Sehemu',
    'course.duration': 'Muda',
    'course.content': 'Maudhui',
    'submissions.title': 'Wasilisho Zangu',
    'submissions.noSubmissions': 'Huna wasilisho lolote bado.',
    'submissions.submit': 'Wasilisha Kazi',
    'submissions.submitted': 'Wasilishwa',
    'submissions.graded': 'Imekadiriwa',
    'submissions.pending': 'Inasubiri Mapitio',
    'submissions.grade': 'Daraja',
    'submissions.feedback': 'Maoni',
    'language.select': 'Chagua Lugha',
    'language.english': 'Kiingereza',
    'language.swahili': 'Kiswahili',
    'nav.dashboard': 'Dashibodi',
    'nav.courses': 'Kozi',
    'nav.submissions': 'Wasilisho',
    'nav.logout': 'Toka',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sw')) {
      setLanguageState(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string, lang?: Language): string => {
    const targetLang = lang || language;
    return translations[targetLang][key] || key;
  };

  if (!isLoaded) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
