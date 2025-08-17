"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const featuresRef = useRef<HTMLDivElement>(null);
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const animateElements = target.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
          
          animateElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (screenshotsRef.current) observer.observe(screenshotsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [isMounted]);

  const handleDownload = () => {
    setIsDownloading(true);
    const apkUrl = 'https://expo.dev/artifacts/eas/oHd6weQKymLt3AVchnFdES.apk';
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'BudgetMate.apk';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  const featureDelayClasses = ['scroll-delay-100', 'scroll-delay-200', 'scroll-delay-300'];

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#E0F2FE] to-white relative overflow-hidden scroll-smooth">
        <nav className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 lg:p-6 backdrop-blur-md bg-white/40 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/budgetmate_logo.jpg"
                alt="BudgetMate Logo"
                width={32}
                height={32}
                className="sm:w-10 sm:h-10 rounded-xl"
              />
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-[#004AAD]">BudgetMate</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577047020803"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 text-[#004AAD] hover:text-[#00BCFF] transition-colors duration-300 hover:scale-110 transform"
                aria-label="Visit BudgetMate Facebook Page"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <button
                className="px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 bg-[#00BCFF] text-white rounded-full font-semibold text-sm sm:text-base cursor-pointer"
              >
                Download
              </button>
            </div>
          </div>
        </nav>
        <div className="flex items-center justify-center min-h-screen pt-20 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00BCFF] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#E0F2FE] to-white relative overflow-hidden scroll-smooth" suppressHydrationWarning>
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        <div 
          className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#A8D2F0]/20 rounded-full blur-3xl animate-float"
          style={{ transform: isMounted ? `translateY(${scrollY * 0.1}px)` : 'translateY(0px)' }}
        ></div>
        <div 
          className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#004AAD]/15 rounded-full blur-3xl animate-float-delayed"
          style={{ transform: isMounted ? `translateY(${scrollY * -0.1}px)` : 'translateY(0px)' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-[#BAE8E4]/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ transform: isMounted ? `translate(-50%, -50%) translateY(${scrollY * 0.05}px)` : 'translate(-50%, -50%) translateY(0px)' }}
        ></div>
        <div 
          className="absolute top-20 right-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-[#9EC6F7]/15 rounded-full blur-2xl animate-bounce-slow"
          style={{ transform: isMounted ? `translateY(${scrollY * 0.15}px)` : 'translateY(0px)' }}
        ></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 lg:p-6 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/60 border-b border-gray-200/70 shadow-lg' 
          : 'backdrop-blur-md bg-white/20 border-b border-gray-200/30'
      }`} suppressHydrationWarning>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 animate-slide-in-left">
            <Image
              src="/budgetmate_logo.jpg"
              alt="BudgetMate Logo"
              width={32}
              height={32}
              className="sm:w-10 sm:h-10 rounded-xl hover:scale-110 transition-transform duration-300"
              priority
            />
            <span className={`text-lg sm:text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#004AAD]' : 'text-[#004AAD]'
            } hover:text-[#00BCFF]`}>BudgetMate</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 animate-slide-in-right">
            <a
              href="https://www.facebook.com/profile.php?id=61577047020803"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 text-[#004AAD] hover:text-[#00BCFF] transition-all duration-300 hover:scale-110 transform rounded-full hover:bg-white/20 cursor-pointer"
              aria-label="Visit BudgetMate Facebook Page"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3 bg-[#00BCFF] text-white rounded-full font-semibold hover:bg-[#0096D6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isDownloading ? "Downloading..." : "Download"}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block px-3 sm:px-4 py-2 bg-[#A8D2F0]/30 backdrop-blur-sm rounded-full border border-[#004AAD]/20 animate-fade-in-up animation-delay-100">
                <span className="text-[#004AAD] font-medium text-sm sm:text-base">🚀 Save Money, Share The Journey</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-200">
                Smart Budget
                <span className="block bg-gradient-to-r from-[#004AAD] to-[#9EC6F7] bg-clip-text text-transparent animate-gradient-x">
                  Management
                </span>
                Made Simple
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-300">
                Track expenses, set goals, and build healthy financial habits with your community. BudgetMate makes personal finance engaging and social.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00BCFF] to-[#9EC6F7] text-white rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-2 hover:animate-wiggle cursor-pointer disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>{isDownloading ? "Downloading APK..." : "Download"}</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-8 pt-6 sm:pt-8 animate-fade-in-up animation-delay-500">
              <div className="text-center hover:scale-110 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-[#004AAD] animate-count-up">50K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-[#004AAD] animate-count-up animation-delay-100">4.8★</div>
                <div className="text-xs sm:text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center hover:scale-110 transition-transform duration-300">
                <div className="text-xl sm:text-2xl font-bold text-[#004AAD] animate-count-up animation-delay-200">25K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Community</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-left animation-delay-300 mt-8 lg:mt-0">
            <div className="relative z-10 backdrop-blur-xl bg-[#A8D2F0]/20 rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#004AAD]/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
              <Image
                src="/budgetmate_cover.png"
                alt="BudgetMate App Cover"
                width={500}
                height={350}
                className="rounded-2xl shadow-xl w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#A8D2F0]/30 to-[#9EC6F7]/30 rounded-3xl blur-xl opacity-40 transform rotate-3 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center mb-12 sm:mb-16 scroll-animate">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BudgetMate?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
            Powerful features designed to make budgeting intuitive and rewarding
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              icon: "💰",
              title: "Smart Tracking",
              description: "Automatically categorize expenses and track spending patterns with AI-powered insights."
            },
            {
              icon: "🤖",
              title: "AI-Powered Analysis",
              description: "Advanced machine learning algorithms analyze your spending habits and provide personalized recommendations for better financial decisions."
            },
            {
              icon: "📊",
              title: "Visual Reports",
              description: "Beautiful charts and analytics help you understand your financial habits at a glance."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className={`backdrop-blur-xl bg-[#BAE8E4]/20 rounded-2xl p-6 sm:p-8 border border-[#004AAD]/15 hover:bg-[#BAE8E4]/30 hover:border-[#004AAD]/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer scroll-animate ${featureDelayClasses[index]}`}
            >
              <div className="text-3xl sm:text-4xl mb-4 group-hover:animate-bounce transition-all duration-300">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#00BCFF] transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="backdrop-blur-xl bg-[#A8D2F0]/25 rounded-3xl p-8 sm:p-12 border border-[#004AAD]/20 text-center scroll-animate-scale">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 scroll-animate scroll-delay-100">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto scroll-animate scroll-delay-200 px-4">
            Join thousands of users who&apos;ve already taken control of their finances with BudgetMate.
          </p>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="group px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#00BCFF] to-[#9EC6F7] text-white rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 flex items-center justify-center space-x-3 mx-auto hover:animate-wiggle scroll-animate scroll-delay-300 cursor-pointer disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>{isDownloading ? "Downloading..." : "Download"}</span>
          </button>
        </div>
      </section>

      <footer ref={footerRef} className="relative z-10 backdrop-blur-md bg-[#A8D2F0]/15 border-t border-[#004AAD]/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 scroll-animate">
          <div className="flex flex-col items-center space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <Image
                src="/budgetmate_logo.jpg"
                alt="BudgetMate Logo"
                width={28}
                height={28}
                className="sm:w-8 sm:h-8 rounded-lg hover:scale-110 transition-transform duration-300"
              />
              <span className="text-lg sm:text-xl font-bold text-[#004AAD] hover:text-[#00BCFF] transition-colors duration-300">BudgetMate</span>
            </div>

            <div className="flex items-center justify-center">
              <a
                href="https://www.facebook.com/profile.php?id=61577047020803"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                aria-label="Visit BudgetMate Facebook Page"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs sm:text-sm font-medium text-[#1877F2] group-hover:text-[#1877F2] transition-colors duration-300">Follow us on Facebook</span>
              </a>
            </div>

            <div className="text-center border-t border-[#004AAD]/10 pt-4 sm:pt-6 w-full">
              <p className="text-gray-600 hover:text-gray-700 transition-colors duration-300 text-sm sm:text-base px-4">
                © 2025 BudgetMate. Save Money, Share The Journey.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}