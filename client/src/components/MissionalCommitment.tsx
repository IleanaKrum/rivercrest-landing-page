import React, { useState } from 'react';
import { Globe, Users, Heart, Accessibility, BookOpen, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VideoPlayer } from '@/components/VideoPlayer';

interface Subtitle {
  id: number;
  language: string;
  languageName: string;
  subtitleUrl: string;
  isDefault: number;
}

export function MissionalCommitment() {
  const [language, setLanguage] = useState<'english' | 'swahili'>('english');

  const subtitles: Subtitle[] = [
    {
      id: 1,
      language: 'sw',
      languageName: 'Swahili',
      subtitleUrl: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/rivercrest-missional-swahili_a2288b3d.srt',
      isDefault: 1,
    },
  ];

  const pillars = [
    {
      icon: Globe,
      title: language === 'english' ? 'Multilingual Ministry' : 'Huduma za Lugha Nyingi',
      description:
        language === 'english'
          ? 'Services, materials, and communication in multiple languages'
          : 'Huduma, nyenzo, na mawasiliano katika lugha nyingi',
    },
    {
      icon: Heart,
      title: language === 'english' ? 'Cultural Respect' : 'Heshima ya Utamaduni',
      description:
        language === 'english'
          ? 'Honoring diverse traditions while maintaining theological integrity'
          : 'Kuheshimu mifumo mbalimbali wakati wa kuendelea na utekelezi wa kiroho',
    },
    {
      icon: Accessibility,
      title: language === 'english' ? 'Accessible Pathways' : 'Njia Inayoweza Kupatikana',
      description:
        language === 'english'
          ? 'Simplified processes for participation, leadership, and involvement'
          : 'Michakato iliyorahisishwa kwa ushiriki, uongozi, na ushiriki',
    },
    {
      icon: Users,
      title: language === 'english' ? 'Cross-Cultural Training' : 'Mafunzo ya Utamaduni Mbalimbali',
      description:
        language === 'english'
          ? 'Equipping leadership to serve diverse communities effectively'
          : 'Kuandaa viongozi kuhudumiakwa jamii mbalimbali kwa ufanisi',
    },
    {
      icon: BookOpen,
      title: language === 'english' ? 'Interpreter Services' : 'Huduma za Mtafsiri',
      description:
        language === 'english'
          ? 'Professional support ensuring full participation and understanding'
          : 'Msaada wa kitaalamu unaokamatia ushiriki kamili na ufahamu',
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            {language === 'english'
              ? 'Our Missional Commitment'
              : 'Kumitikia Kwa Missional'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === 'english'
              ? 'Embracing Diaspora Communities with Faithful Obedience'
              : 'Kukamatia Jamii za Diaspora kwa Utekelezi wa Kweli'}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={language === 'english' ? 'default' : 'outline'}
            onClick={() => setLanguage('english')}
            className="px-6"
          >
            English
          </Button>
          <Button
            variant={language === 'swahili' ? 'default' : 'outline'}
            onClick={() => setLanguage('swahili')}
            className="px-6"
          >
            Kiswahili
          </Button>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="aspect-video bg-black">
              <VideoPlayer
                title="Rivercrest Missional Commitment"
                videoUrl="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/rivercrest-missional-commitment-intro_aca7fde6.mp4"
                subtitles={subtitles}
                duration={180}
                videoId={999}
                moduleId={999}
              />
            </div>
          </Card>
        </div>

        {/* Vision Statement */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-l-4 border-l-red-600">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'english' ? 'Our Vision' : 'Macho Yetu'}
            </h3>
            <p className="text-lg text-foreground leading-relaxed">
              {language === 'english'
                ? 'We are wholeheartedly committed to transnational missions and communities multiplication efforts—not as something we want to "show off," but in faithful obedience as disciples of the Missional Church of Christ on earth.'
                : 'Tunajitia moyo kwa njia za kumkamatia dunia na kuzidisha jamii—sio kwa sababu ya kuonyesha, bali kwa utekelezi wa kweli kama wanafunzi wa Kanisa la Missional la Kristo duniani.'}
            </p>
          </Card>

          <Card className="p-8 border-l-4 border-l-amber-500">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {language === 'english' ? 'The Challenge & Opportunity' : 'Changamoto na Furaha'}
            </h3>
            <p className="text-base text-foreground leading-relaxed mb-4">
              <strong>
                {language === 'english' ? 'The Risk: ' : 'Hatari: '}
              </strong>
              {language === 'english'
                ? 'Alienating potential members and hindering diaspora community growth.'
                : 'Kuweza kukamatia wanachama na kuweza kukamatia ukuaji wa jamii za wahamiaji.'}
            </p>
            <p className="text-base text-foreground leading-relaxed">
              <strong>
                {language === 'english' ? 'The Opportunity: ' : 'Furaha: '}
              </strong>
              {language === 'english'
                ? 'Redesigning welcoming structures centered on the immigrant experience.'
                : 'Kubadilisha miundo ya kuwakamata kuzunguka uzoefu wa wahamiaji.'}
            </p>
          </Card>
        </div>

        {/* Key Pillars */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-foreground">
            {language === 'english' ? 'Our Five Pillars' : 'Nguzo Zetu Za Tano'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                  <h4 className="font-bold mb-3 text-foreground">{pillar.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Commitment Statement */}
        <Card className="p-8 md:p-12 bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-200 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {language === 'english' ? 'Our Foundational Commitment' : 'Kumitikia Kwa Msingi Wetu'}
          </h3>
          <p className="text-lg text-foreground leading-relaxed">
            {language === 'english'
              ? 'Strategic investment in interpreter services, cross-cultural training for existing leadership, and the creation of accessible, simplified engagement processes is not merely helpful, but a foundational requirement for effective diaspora mission. This is not about "showing off" our diversity. This is about faithful obedience to Christ\'s call to welcome the stranger, cross cultural boundaries, and include the marginalized.'
              : 'Kuwekeza kwa mkakati katika huduma za mtafsiri, mafunzo ya utamaduni kwa viongozi vya sasa, na kujenga michakato ya ushiriki inayoweza kupatikana na iliyorahisishwa si kitu kisicho na kusaidia, bali mahitaji ya msingi kwa missional yenye ufanisi ya wahamiaji. Hii sio kuhusu kuonyesha utofauti wetu. Hii ni kuhusu utekelezi wa kweli wa wito wa Kristo kuwakamata mgeni, kuvuka mipaka ya utamaduni, na kujumuisha wasiozingatiwa.'}
          </p>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {language === 'english'
              ? 'Join Our Missional Journey'
              : 'Jiunge Na Safari Yetu Ya Missional'}
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            {language === 'english'
              ? 'Whether you are part of an immigrant community seeking a spiritual home, a leader wanting to serve across cultures, or a church member ready to embrace our missional calling—we invite you to be part of this transformative work.'
              : 'Ikiwa wewe ni sehemu ya jamii ya wahamiaji inayotafuta nyumba ya kiroho, kiongozi kinachohitaji kuhudumiakwa kwa utamaduni, au mwanachama wa kanisa unaohitaji kukamatia wito wetu wa missional—tunakamatia kuwa sehemu ya kazi hii ya mabadiliko.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              {language === 'english' ? 'Get Involved' : 'Shiriki'}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              {language === 'english' ? 'Learn More' : 'Jifunze Zaidi'}
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-sm text-muted-foreground border-t border-border pt-8">
          <p>
            {language === 'english'
              ? 'Rivercrest Free Methodist Church | In Partnership with FMC Central Regional Conference'
              : 'Kanisa la Rivercrest Free Methodist | Kwa Ushirikiano na FMC Central Regional Conference'}
          </p>
        </div>
      </div>
    </section>
  );
}
