import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  titleSwahili: string;
  description: string;
  descriptionSwahili: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Life-Giving Holiness',
    titleSwahili: 'Utakatifu Unaojenga Maisha',
    description: 'Pursuing spiritual wholeness and sanctification in all aspects of our lives',
    descriptionSwahili: 'Kutafuta ukamilifu wa kiroho na utakatifu katika maisha yote',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/fmc-value-1-holiness-3n7YMG7TQKmTnPimWRxMjo.webp',
  },
  {
    id: 2,
    title: 'Love-Driven Justice',
    titleSwahili: 'Haki Inayoendeshwa na Upendo',
    description: 'Serving our neighbors and building bridges across communities through compassionate action',
    descriptionSwahili: 'Kumtumikia jirani yetu na kujenga miundo ya upendo katika jamii',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/fmc-value-2-justice-XGNb2czDFGorseXdchAbb8.webp',
  },
  {
    id: 3,
    title: 'Christ-Compelled Multiplication',
    titleSwahili: 'Kuzidisha Inayoendeshwa na Kristo',
    description: 'Multiplying disciples and leaders to serve their communities and participate in God\'s redemptive work',
    descriptionSwahili: 'Kuzidisha wanafunzi na viongozi ili kumtumikia jamii yao',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/fmc-value-3-multiplication-3xc9zdNL3MAtAFd5pxcLfy.webp',
  },
  {
    id: 4,
    title: 'Cross-Cultural Collaboration',
    titleSwahili: 'Ushirikiano wa Kitamaduni',
    description: 'Honoring diverse traditions while maintaining theological integrity and working together across cultures',
    descriptionSwahili: 'Kuheshimu mila tofauti na kufanya kazi pamoja katika utamaduni',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/fmc-value-4-collaboration-GKM64gBNGLDfZAbGW75PJb.webp',
  },
  {
    id: 5,
    title: 'God-Given Revelation',
    titleSwahili: 'Ufunuo Unaotoka kwa Mungu',
    description: 'Embracing the wisdom and guidance that comes from God\'s Word and Spirit',
    descriptionSwahili: 'Kukamatia hekima na mwongozo unaotoka kwa Neno la Mungu',
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/fmc-value-5-revelation-jVSdHt4nSHdeZqzDWojmWy.webp',
  },
];

export function FMCValuesSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSwahili, setIsSwahili] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* Slide Container */}
      <div className="relative w-full aspect-video">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-center drop-shadow-lg">
            {isSwahili ? slide.titleSwahili : slide.title}
          </h2>
          <p className="text-lg lg:text-xl text-center max-w-2xl drop-shadow-md">
            {isSwahili ? slide.descriptionSwahili : slide.description}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <button
          onClick={prevSlide}
          className="bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center pr-4">
        <button
          onClick={nextSlide}
          className="bg-white/80 hover:bg-white text-black p-2 rounded-full transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setIsSwahili(false)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            !isSwahili
              ? 'bg-primary text-white'
              : 'bg-white/30 text-white hover:bg-white/50'
          }`}
        >
          English
        </button>
        <button
          onClick={() => setIsSwahili(true)}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            isSwahili
              ? 'bg-primary text-white'
              : 'bg-white/30 text-white hover:bg-white/50'
          }`}
        >
          Kiswahili
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 right-6 text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}
