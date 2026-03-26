import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, lang?: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation & Common
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.giving': 'Giving',
    'nav.centerOfStudies': 'Center of Studies',
    'nav.contact': 'Contact',
    'nav.visitUs': 'Visit Us',
    'nav.joinUsSunday': 'Join Us Sunday',
    'nav.learnMore': 'Learn More',
    'nav.welcome': 'Welcome',
    'nav.language': 'Language',
    
    // Hero Section
    'hero.welcome': 'Welcome to Our Community',
    'hero.tagline': 'A House of Prayer for The Nations',
    'hero.description': 'Rivercrest Free Methodist Church is a faith-centered community dedicated to living out the gospel in our cultural contexts, fostering unity while honoring the distinct gifts of every community we serve.',
    'hero.joinUsSunday': 'Join Us Sunday',
    'hero.learnMore': 'Learn More',
    
    // Clarion Call Section
    'clarion.title': 'The Clarion Call: Arise and Build',
    'clarion.intro': 'The world is in flux. As immigrant and refugee communities navigate a wilderness of unprecedented challenges and closed doors, the Spirit of God is moving with a distinct urgency. Now, more than ever, the Church cannot remain seated. The Church must arise!',
    'clarion.covenant': 'A Covenant of Empowerment',
    'clarion.covenantText': 'Guided by the Great Commission and a commitment to the "least of these," Rivercrest Free Methodist Church, in steadfast partnership with the FMC Central Region Conference and the FMC USA Pastoral Formation Center of Studies, is stepping into the gap. We are not merely providing aid; we are raising up a harvest from within.',
    'clarion.dedication': 'We are dedicated to the equipping of leaders from our Swahili-speaking communities—both here in our local neighborhoods and across the globe. We believe that the most effective, culturally resonant, and biblically sound way to minister to the brokenhearted and the seeker is through the hands and voices of their own brothers and sisters.',
    'clarion.backyards': 'From Our Backyards to the Ends of the Earth',
    'clarion.missionText': 'This mission is wide-reaching and multi-generational, designed to touch the lives of:',
    'clarion.menWomen': 'Men and women seeking a spiritual home.',
    'clarion.elders': 'The elders who carry our history.',
    'clarion.youth': 'The youth who represent our future.',
    'clarion.vision': 'Our vision is bold: to equip thousands for the planting of new churches and to ignite vital mission fields right here in our own backyards. We are not acting on human whim, but on the firm calling and divine commission of the Lord.',
    'clarion.scripture': '"Arise, shine, for your light has come, and the glory of the Lord rises upon you." — Isaiah 60:1',
    'clarion.harvest': 'The fields are white for harvest. Together, we move. Together, we act. Together, we fulfill the work the Lord has set before us.',
    
    // Giving Page
    'giving.title': 'Giving',
    'giving.subtitle': 'Support Our Mission',
    'giving.description': 'Your generous gifts enable us to serve our community and fulfill our mission to equip leaders for the Swahili-speaking world.',
    'giving.howItHelps': 'How Your Giving Helps',
    'giving.fundCommunity': 'Fund community outreach programs',
    'giving.enableSpiritual': 'Enable spiritual growth initiatives',
    'giving.partnerFMC': 'Partner with FMC Central Region Conference and Swahili Center of Studies Initiative',
    'giving.contactInfo': 'Contact Information',
    'giving.givingMethods': 'Ways to Give',
    'giving.onlineGiving': 'Online Giving',
    'giving.checkPayable': 'Check (Payable to Rivercrest FMC)',
    'giving.bankTransfer': 'Bank Transfer',
    'giving.questions': 'Questions about giving?',
    'giving.contactUs': 'Contact us for more information',
    
    // Contact Form
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.success': 'Message sent successfully! We will be in touch soon.',
    'contact.error': 'Failed to send message. Please try again.',
    'contact.required': 'This field is required',
    'contact.invalidEmail': 'Please enter a valid email address',
    
    // Prayer Requests
    'prayer.title': 'Prayer Requests',
    'prayer.subtitle': 'Submit a prayer request for our community to lift up in prayer',
    'prayer.yourName': 'Your Name',
    'prayer.yourEmail': 'Your Email',
    'prayer.category': 'Prayer Category',
    'prayer.churchPlanting': 'Church Planting',
    'prayer.leadership': 'Leadership Development',
    'prayer.refugee': 'Refugee & Immigrant Support',
    'prayer.community': 'Community Outreach',
    'prayer.spiritual': 'Spiritual Growth',
    'prayer.healing': 'Healing & Comfort',
    'prayer.family': 'Family & Relationships',
    'prayer.other': 'Other',
    'prayer.prayerRequest': 'Prayer Request',
    'prayer.isPublic': 'Make this prayer request public',
    'prayer.submit': 'Submit Prayer Request',
    'prayer.submitting': 'Submitting...',
    'prayer.successMessage': 'Thank you for your prayer request! Our community will be praying with you.',
    'prayer.errorMessage': 'Failed to submit prayer request. Please try again.',
    
    // Footer
    'footer.address': '123 Main Street, Your City, State 12345',
    'footer.phone': 'Phone: (123) 456-7890',
    'footer.email': 'Email: contact@rivercrestfmc.org',
    'footer.copyright': '© 2026 Rivercrest Free Methodist Church. All rights reserved.',
    'footer.tagline': 'A House of Prayer for The Nations',
    
    // Center of Studies
    'centerOfStudies.title': 'Center of Studies',
    'centerOfStudies.subtitle': 'Swahili Initiative Leadership Development',
    'centerOfStudies.description': 'Equipping leaders for the Swahili-speaking world through biblical education and cultural engagement.',
    
    // Dashboard (existing)
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
    // Navigation & Common
    'nav.home': 'Nyumbani',
    'nav.services': 'Huduma',
    'nav.giving': 'Kutoa',
    'nav.centerOfStudies': 'Kituo cha Masomo',
    'nav.contact': 'Wasiliana',
    'nav.visitUs': 'Tembelea Sisi',
    'nav.joinUsSunday': 'Jiunga Nasi Jumapili',
    'nav.learnMore': 'Jifunze Zaidi',
    'nav.welcome': 'Karibu',
    'nav.language': 'Lugha',
    
    // Hero Section
    'hero.welcome': 'Karibu kwa Jamii Yetu',
    'hero.tagline': 'Nyumba ya Sala kwa Mataifa',
    'hero.description': 'Rivercrest Free Methodist Church ni jamii yenye imani inayojitolea kuishi Injili katika muktadha wa utamaduni wetu, ikijenga umoja wakati wa kuheshimu zawadi za kipekee za kila jamii tunayohudumiia.',
    'hero.joinUsSunday': 'Jiunga Nasi Jumapili',
    'hero.learnMore': 'Jifunze Zaidi',
    
    // Clarion Call Section
    'clarion.title': 'Wito wa Kuzama: Simama na Jenga',
    'clarion.intro': 'Dunia iko katika mabadiliko. Jamii za wahamiaji na wakimbizi zinayonavigeti nyikani ya changamoto zisizopata mfano na milango iliyofungwa, Roho wa Mungu inatenda kazi na haraka ya kipekee. Sasa zaidi kuliko hapo awali, Kanisa halilazimi kubaki kimya. Kanisa lazima simame!',
    'clarion.covenant': 'Agano la Kuwezesha',
    'clarion.covenantText': 'Inaongozwa na Agano Kubwa na kujitolea kwa "walio duni zaidi," Rivercrest Free Methodist Church, kwa ushirikiano thabiti na FMC Central Region Conference na FMC USA Pastoral Formation Center of Studies, inaingilia pengo. Hatuwezi tu kutoa msaada; tunaandaa mavuno kutoka ndani.',
    'clarion.dedication': 'Tumejitolea kuwawezesha viongozi kutoka jamii zetu za Kiswahili—hapa katika vitongoji vyetu vya ndani na kote ulimwenguni. Tunaninini kwamba njia yenye ufanisi zaidi, yenye sauti ya kitamaduni, na yenye msingi wa Biblia ya kuhudumiia wasiojali na mtafutaji ni kupitia mikono na sauti ya ndugu na dada zao wenyewe.',
    'clarion.backyards': 'Kutoka Vitongoji Vyetu hadi Miisho ya Dunia',
    'clarion.missionText': 'Harakati hii ina upana na inaendelea kwa kizazi, iliyoundwa kuathiri maisha ya:',
    'clarion.menWomen': 'Wanaume na wanawake wanayotafuta nyumba ya roho.',
    'clarion.elders': 'Wazee wanayobeba historia yetu.',
    'clarion.youth': 'Vijana wanaowakilisha sisi ya baadaye.',
    'clarion.vision': 'Macho yetu ni makali: kuwezesha maelfu kwa ajili ya kupanda kanisa jipya na kumweka moto katika maeneo ya harakati muhimu hapa katika vitongoji vyetu venyewe. Hatufanyi kazi kwa hamu ya binadamu, lakini kwa wito thabiti na agizo la kimungu la Mungu.',
    'clarion.scripture': '"Simama, angaza, kwa sababu nuru yako imekuja, na utukufu wa Mungu umeinuka juu yako." — Isaya 60:1',
    'clarion.harvest': 'Mashambani yanakamatia mavuno. Pamoja, tunaenda. Pamoja, tunafanya. Pamoja, tunatimiza kazi ambayo Mungu ameweka mbele yetu.',
    
    // Giving Page
    'giving.title': 'Kutoa',
    'giving.subtitle': 'Kusaidia Harakati Yetu',
    'giving.description': 'Zawadi zako za karama zinaturuhusu kuhudumiia jamii yetu na kutimiza harakati yetu ya kuwezesha viongozi kwa dunia ya Kiswahili.',
    'giving.howItHelps': 'Jinsi Zawadi Zako Zinasaidia',
    'giving.fundCommunity': 'Pesa za programu za huduma ya jamii',
    'giving.enableSpiritual': 'Kuwezesha mipango ya ukuaji wa roho',
    'giving.partnerFMC': 'Kujitokeleza na FMC Central Region Conference na Swahili Center of Studies Initiative',
    'giving.contactInfo': 'Taarifa za Mawasiliano',
    'giving.givingMethods': 'Njia za Kutoa',
    'giving.onlineGiving': 'Kutoa Mtandaoni',
    'giving.checkPayable': 'Hundi (Inayolipwa kwa Rivercrest FMC)',
    'giving.bankTransfer': 'Uhamishaji wa Benki',
    'giving.questions': 'Maswali kuhusu kutoa?',
    'giving.contactUs': 'Wasiliana nasi kwa taarifa zaidi',
    
    // Contact Form
    'contact.title': 'Wasiliana Nasi',
    'contact.name': 'Jina',
    'contact.email': 'Barua Pepe',
    'contact.message': 'Ujumbe',
    'contact.send': 'Tuma Ujumbe',
    'contact.sending': 'Inatuma...',
    'contact.success': 'Ujumbe ulitumwa kwa mafanikio! Tutakupigia simu haraka.',
    'contact.error': 'Kutuma ujumbe kulifeli. Tafadhali jaribu tena.',
    'contact.required': 'Sehemu hii inahitajika',
    'contact.invalidEmail': 'Tafadhali ingiza anwani ya barua pepe halali',
    
    // Prayer Requests
    'prayer.title': 'Ombi za Sala',
    'prayer.subtitle': 'Wasilisha ombi la sala kwa jamii yetu kuomba kwa ajili yako',
    'prayer.yourName': 'Jina Lako',
    'prayer.yourEmail': 'Barua Pepe Yako',
    'prayer.category': 'Kategoria ya Sala',
    'prayer.churchPlanting': 'Kupanda Kanisa',
    'prayer.leadership': 'Ukuaji wa Uongozaji',
    'prayer.refugee': 'Msaada wa Wahamiaji na Wakimbizi',
    'prayer.community': 'Huduma ya Jamii',
    'prayer.spiritual': 'Ukuaji wa Roho',
    'prayer.healing': 'Uponyaji na Faraja',
    'prayer.family': 'Familia na Mahusiano',
    'prayer.other': 'Nyingine',
    'prayer.prayerRequest': 'Ombi la Sala',
    'prayer.isPublic': 'Fanya ombi hili la sala kuwa la umma',
    'prayer.submit': 'Wasilisha Ombi la Sala',
    'prayer.submitting': 'Inawasilisha...',
    'prayer.successMessage': 'Asante kwa ombi lako la sala! Jamii yetu itakuomba pamoja nawe.',
    'prayer.errorMessage': 'Kuwasilisha ombi la sala kulifeli. Tafadhali jaribu tena.',
    
    // Footer
    'footer.address': 'Barabara 123, Jiji Lako, Jimbo 12345',
    'footer.phone': 'Simu: (123) 456-7890',
    'footer.email': 'Barua Pepe: contact@rivercrestfmc.org',
    'footer.copyright': '© 2026 Rivercrest Free Methodist Church. Haki zote zimehifadhiwa.',
    'footer.tagline': 'Nyumba ya Sala kwa Mataifa',
    
    // Center of Studies
    'centerOfStudies.title': 'Kituo cha Masomo',
    'centerOfStudies.subtitle': 'Ukuaji wa Uongozaji wa Kiswahili',
    'centerOfStudies.description': 'Kuwawezesha viongozi kwa dunia ya Kiswahili kupitia elimu ya Biblia na ushirikiano wa kitamaduni.',
    
    // Dashboard (existing)
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
