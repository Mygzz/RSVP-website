import React, { useState, useRef, useEffect } from "react";
import logo from "./assets/B&M-logo.png";
import backgroundImage from "./assets/homebg.jpg";
import PhotoGallery from "./assets/components/PhotoGallery";
import themeBG from "./assets/themebg.jpg";
import wazeQR from "./assets/qrChruchW.png";
import googleQR from "./assets/qrChurch.png";
import arrow from "./assets/arrow.png";
import mapReception from "./assets/qrReception.png";
import mapReceptionWaze from "./assets/qrReceptionW.png";
import facebookIcon from "./assets/facebook.png";
import instagramIcon from "./assets/instagram.png";
import tiktokIcon from "./assets/tik-tok.png";

const App = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="mobile menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActiveSection(targetId);
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "photo", label: "Photo & Video" },
    { id: "theme", label: "Theme" },
    { id: "maps", label: "Maps" },
    { id: "rsvp", label: "RSVP" },
  ];

  const closeAllMenus = () => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (itemId) => {
    setActiveSection(itemId);
    closeAllMenus();
  };

  return (
    <div className="bg-[#221024] min-h-screen">
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
          animation-fill-mode: both;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
          animation-fill-mode: both;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="bg-[#221024]/90 border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-md transition-all duration-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src={logo}
                alt="B&M Logo"
                className="h-12 w-12 md:h-16 md:w-16 rounded-full transform transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-xl"
              />
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="btn btn-circle swap swap-rotate text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 hover:bg-white/10 hover:scale-110"
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  <svg
                    className={`${
                      isUserDropdownOpen ? "hidden" : "block"
                    } fill-current transition-transform duration-300`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                  </svg>

                  <svg
                    className={`${
                      isUserDropdownOpen ? "block" : "hidden"
                    } fill-current transition-transform duration-300 rotate-90`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 512 512"
                  >
                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                  </svg>
                </button>

                <div
                  className={`absolute right-0 z-50 mt-2 w-56 origin-top-right bg-white/95 backdrop-blur-sm border border-gray-200 divide-y divide-gray-100 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 transform transition-all duration-300 ease-out ${
                    isUserDropdownOpen
                      ? "opacity-100 visible scale-100 translate-y-0"
                      : "opacity-0 invisible scale-95 -translate-y-2"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="py-1">
                    {menuItems.map((item, index) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`flex items-center px-4 py-2 text-sm hover:bg-purple-50 transition-all duration-200 transform hover:translate-x-1 ${
                          activeSection === item.id
                            ? "text-[#C587CD] font-semibold bg-purple-50 border-l-4 border-[#C587CD]"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 hover:scale-110"
                aria-label="mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="w-6 h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={mobileMenuRef}
          className={`md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? "max-h-64 opacity-100 py-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 transform hover:translate-x-2 ${
                  activeSection === item.id
                    ? "text-[#C587CD] bg-purple-50 font-semibold"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* Home Section */}
        <section
          id="home"
          className="relative h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-white animate-pulse-slow"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <div className="mb-4 md:mb-8 w-full max-w-md animate-fade-in-down">
              <p className="text-sm md:text-lg lg:text-xl text-white font-['Poppins'] drop-shadow-lg tracking-widest leading-relaxed [text-shadow:_0_0_8px_white,_0_0_16px_white]">
                With hearts entwined and families united
              </p>
            </div>

            <div className="flex flex-col items-center justify-center mb-4 md:mb-8 px-2">
              <h2 className="text-7xl sm:text-8xl md:text-9xl font-['Imperial_Script'] italic text-[#49284D] tracking-tight md:tracking-wider leading-tight [text-shadow:_0_0_15px_white,_0_0_30px_white,_0_0_45px_white] animate-fade-in-up animation-delay-300 hover:scale-105 transition-transform duration-500 cursor-default">
                Benson
              </h2>

              <h2 className="text-6xl sm:text-7xl md:text-8xl font-['Imperial_Script'] italic text-[#49284D] my-1 md:my-2 [text-shadow:_0_0_15px_white,_0_0_30px_white,_0_0_45px_white] animate-fade-in animation-delay-600 hover:rotate-12 transition-transform duration-500 cursor-default">
                &
              </h2>

              <h2 className="text-7xl sm:text-8xl md:text-9xl font-['Imperial_Script'] italic text-[#49284D] tracking-tight md:tracking-wider leading-tight [text-shadow:_0_0_15px_white,_0_0_30px_white,_0_0_45px_white] animate-fade-in-up animation-delay-900 hover:scale-105 transition-transform duration-500 cursor-default">
                Mich Rogene
              </h2>
            </div>

            <div className="mt-4 md:mt-8 w-full max-w-md animate-fade-in-up animation-delay-1200">
              <p className="text-sm md:text-lg lg:text-xl text-white font-['Poppins'] drop-shadow-lg tracking-widest leading-relaxed [text-shadow:_0_0_8px_white,_0_0_16px_white]">
                Graciously invite you to share in the joy of their wedding day
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section
          className={`bg-white py-12 md:py-20 transition-all duration-1000 ${
            visibleSections.has("home")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-8 md:mb-12 animate-fade-in">
              Wedding Schedule
            </h2>

            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center transform transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-300">
                <div className="text-center md:text-right space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-[#49284D] transition-colors duration-300 hover:text-[#C587CD]">
                    Thursday, October 30
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-['Poppins'] font-medium text-[#C587CD] animate-pulse-slow">
                    3:00 PM
                  </p>
                </div>

                <div className="hidden md:flex justify-center">
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#C587CD] to-transparent"></div>
                </div>

                <div className="md:hidden flex justify-center">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C587CD] to-transparent my-4"></div>
                </div>

                <div className="text-center md:text-left space-y-2">
                  <p className="font-['Poppins'] font-bold text-lg sm:text-xl md:text-2xl text-[#49284D] transition-colors duration-300 hover:text-[#C587CD]">
                    PARISH OF THE IMMACULATE HEART OF MARY
                  </p>
                  <div className="font-['Poppins'] text-base sm:text-lg md:text-xl text-gray-700">
                    <p>Daang Bakal Road, Brgy. Dela Paz,</p>
                    <p>Antipolo City</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center transform transition-all duration-500 hover:scale-105 animate-fade-in-up animation-delay-600">
                <div className="text-center md:text-right space-y-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-[#49284D] transition-colors duration-300 hover:text-[#C587CD]">
                    Thursday, October 30
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-['Poppins'] font-medium text-[#C587CD] animate-pulse-slow">
                    6:00 PM
                  </p>
                </div>

                <div className="hidden md:flex justify-center">
                  <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#C587CD] to-transparent"></div>
                </div>

                <div className="md:hidden flex justify-center">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C587CD] to-transparent my-4"></div>
                </div>

                <div className="text-center md:text-left space-y-2">
                  <p className="font-['Poppins'] font-bold text-lg sm:text-xl md:text-2xl text-[#49284D] transition-colors duration-300 hover:text-[#C587CD]">
                    THE CHANDELIER EVENTS PLACE
                  </p>
                  <div className="font-['Poppins'] text-base sm:text-lg md:text-xl text-gray-700">
                    <p>Sumulong Highway, Brgy. San Jose,</p>
                    <p>Antipolo City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Section */}
        <div
          className={`transition-all duration-1000 ${
            visibleSections.has("photo")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <PhotoGallery />
        </div>

        {/* Theme Section */}
        <section
          id="theme"
          className={`relative min-h-screen bg-cover bg-center bg-fixed py-12 md:py-20 transition-all duration-1000 ${
            visibleSections.has("theme")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
          style={{ backgroundImage: `url(${themeBG})` }}
        >
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-8 md:mb-12 animate-fade-in">
              Wedding Attire & Theme
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-left">
                <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#49284D] mb-6 text-center">
                  SEMI FORMAL ATTIRE
                </h3>

                <div className="space-y-6">
                  <div className="transform transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-['Playfair_Display'] font-semibold text-[#49284D] mb-3 text-2xl">
                      Principal Sponsors
                    </h4>
                    <div className="space-y-3 font-['Poppins'] text-gray-700">
                      <p className="transition-colors duration-300 hover:text-[#C587CD]">
                        <span className="font-medium text-[#49284D]">
                          Ladies:
                        </span>{" "}
                        Beige Long Gown
                      </p>
                      <p className="transition-colors duration-300 hover:text-[#C587CD]">
                        <span className="font-medium text-[#49284D]">
                          Gentlemen:
                        </span>{" "}
                        Black Suit & Pants, Plum Necktie
                      </p>
                    </div>
                  </div>

                  <div className="transform transition-all duration-300 hover:translate-x-2">
                    <h4 className="font-['Playfair_Display'] font-semibold text-[#49284D] mb-3 text-2xl">
                      Guests
                    </h4>
                    <div className="space-y-3 font-['Poppins'] text-gray-700">
                      <p className="transition-colors duration-300 hover:text-[#C587CD]">
                        <span className="font-medium text-[#49284D]">
                          Ladies:
                        </span>{" "}
                        Long Gown or Maxi Dress
                      </p>
                      <p className="transition-colors duration-300 hover:text-[#C587CD]">
                        <span className="font-medium text-[#49284D]">
                          Gentlemen:
                        </span>{" "}
                        Black Suit & Pants or Color-Themed Long Sleeves
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 animate-fade-in-right">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-bold text-[#49284D] mb-6 text-center">
                    COLOR THEME
                  </h3>

                  <p className="font-['Poppins'] text-gray-700 text-center mb-6">
                    Lilac, Lavender, Plum, Mauve with no or very minimal prints
                  </p>

                  <div className="flex justify-center space-x-6 mb-6">
                    {[
                      { name: "Lilac", color: "bg-[#C8A2C8]" },
                      { name: "Lavender", color: "bg-[#E6E6FA]" },
                      { name: "Plum", color: "bg-[#8E4585]" },
                      { name: "Mauve", color: "bg-[#E0B0FF]" },
                    ].map((item, index) => (
                      <div
                        key={item.name}
                        className="text-center animate-bounce-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div
                          className={`w-12 h-12 rounded-full mx-auto mb-2 border-2 border-gray-200 ${item.color} shadow-sm transform transition-all duration-300 hover:scale-125 hover:shadow-xl hover:rotate-12 cursor-pointer`}
                        ></div>
                        <span className="font-['Poppins'] text-sm text-gray-600 font-medium">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center space-y-3 text-sm bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
                    <p className="font-['Poppins'] text-gray-700">
                      <span className="font-semibold text-[#49284D]">
                        White
                      </span>{" "}
                      is reserved for the Bride
                    </p>
                    <p className="font-['Poppins'] text-gray-700">
                      <span className="font-semibold text-[#49284D]">Grey</span>{" "}
                      is reserved for the Groom
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#F5F4F5] to-[#F0E8F1] rounded-2xl p-6 border-l-4 border-[#C587CD] shadow-sm transform transition-all duration-500 hover:scale-105 hover:shadow-lg">
                  <p className="font-['Poppins'] text-gray-700 text-sm md:text-base text-center">
                    <span className="font-semibold text-[#49284D]">NOTE:</span>{" "}
                    We entreat our dearest guests to arrive in elegant attire,
                    avoiding bold colors, white, casual attire, maong pants and
                    informal garments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Maps Section */}
        <section
          id="maps"
          className={`py-12 md:py-20 bg-gradient-to-b from-[#E6E6FA] to-[#F0E8F1] transition-all duration-1000 ${
            visibleSections.has("maps")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] text-center mb-8 md:mb-12 animate-fade-in">
              Venue & Location
            </h2>

            <div className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="space-y-6 animate-fade-in-left">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-semibold text-[#49284D] mb-4">
                    Church Ceremony
                  </h3>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="space-y-4 font-['Poppins'] text-gray-700">
                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <svg
                          className="w-5 h-5 mr-3 text-[#C587CD] mt-1 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            Parish of the Immaculate Heart of Mary
                          </p>
                          <p className="text-sm mt-1 text-gray-600">
                            Daang Bakal Road, Brgy. Dela Paz, Antipolo City
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <svg
                          className="w-5 h-5 mr-3 text-[#C587CD] mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            Thursday, October 30, 2024
                          </p>
                          <p className="text-sm mt-1 text-gray-600">3:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <a
                        href="https://maps.google.com/?q=Parish+of+the+Immaculate+Heart+of+Mary+Antipolo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-[#49284D] text-white px-4 py-3 rounded-lg font-['Poppins'] font-medium hover:bg-[#3a1f3c] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 transform"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                        </svg>
                        Google Maps
                      </a>
                      <a
                        href="https://waze.com/ul/hwdw5j16hr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-[#33CCFF] text-white px-4 py-3 rounded-lg font-['Poppins'] font-medium hover:bg-[#29a6d9] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 transform"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-6h2v6h-2zm2-8V6h-2v4h2z" />
                        </svg>
                        Waze
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center animate-fade-in-right">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-semibold text-[#49284D] mb-6">
                    Church Location QR Codes
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                      <img
                        src={googleQR}
                        alt="Google Maps QR Code for Church"
                        className="w-40 h-40 mx-auto mb-4 rounded-lg"
                      />
                      <p className="font-['Poppins'] font-semibold text-[#49284D]">
                        Google Maps
                      </p>
                      <p className="font-['Poppins'] text-xs text-gray-600 mt-1">
                        Scan for church directions
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                      <img
                        src={wazeQR}
                        alt="Waze QR Code for Church"
                        className="w-40 h-40 mx-auto mb-4 rounded-lg"
                      />
                      <p className="font-['Poppins'] font-semibold text-[#49284D]">
                        Waze
                      </p>
                      <p className="font-['Poppins'] text-xs text-gray-600 mt-1">
                        Scan for church navigation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
                <div className="space-y-6 animate-fade-in-left">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-semibold text-[#49284D] mb-4">
                    Reception
                  </h3>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                    <div className="space-y-4 font-['Poppins'] text-gray-700">
                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <svg
                          className="w-5 h-5 mr-3 text-[#C587CD] mt-1 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            THE CHANDELIER EVENTS PLACE
                          </p>
                          <p className="text-sm mt-1 text-gray-600">
                            Sumulong Highway, Brgy. San Jose, Antipolo City
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start transform transition-all duration-300 hover:translate-x-2">
                        <svg
                          className="w-5 h-5 mr-3 text-[#C587CD] mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="font-semibold">
                            Thursday, October 30, 2024
                          </p>
                          <p className="text-sm mt-1 text-gray-600">6:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      <a
                        href="https://maps.app.goo.gl/ag3JXenftSkjFAVBA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-[#49284D] text-white px-4 py-3 rounded-lg font-['Poppins'] font-medium hover:bg-[#3a1f3c] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 transform"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                        </svg>
                        Google Maps
                      </a>
                      <a
                        href="https://waze.com/ul?q=The%20Chandelier%20Events%20Place%20Antipolo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-[#33CCFF] text-white px-4 py-3 rounded-lg font-['Poppins'] font-medium hover:bg-[#29a6d9] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 transform"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-6h2v6h-2zm2-8V6h-2v4h2z" />
                        </svg>
                        Waze
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center animate-fade-in-right">
                  <h3 className="text-xl md:text-2xl font-['Playfair_Display'] font-semibold text-[#49284D] mb-6">
                    Reception QR Codes
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                      <img
                        src={mapReception}
                        alt="Google Maps QR Code for Reception"
                        className="w-40 h-40 mx-auto mb-4 rounded-lg"
                      />
                      <p className="font-['Poppins'] font-semibold text-[#49284D]">
                        Google Maps
                      </p>
                      <p className="font-['Poppins'] text-xs text-gray-600 mt-1">
                        Scan for reception directions
                      </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2">
                      <img
                        src={mapReceptionWaze}
                        alt="Waze QR Code for Reception"
                        className="w-40 h-40 mx-auto mb-4 rounded-lg"
                      />
                      <p className="font-['Poppins'] font-semibold text-[#49284D]">
                        Waze
                      </p>
                      <p className="font-['Poppins'] text-xs text-gray-600 mt-1">
                        Scan for reception navigation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E8C2ED] bg-opacity-30 rounded-xl p-4 mt-8 border border-[#C587CD] border-opacity-30 transform transition-all duration-300 hover:scale-105">
              <p className="font-['Poppins'] text-sm text-[#49284D] text-center">
                <strong>How to use:</strong> Open your phone's camera and point
                it at the QR code, then tap the notification to open directions.
                You can also click the buttons above for direct links.
              </p>
            </div>
          </div>
        </section>

        {/* Unplugged Ceremony Section */}
        <section
          className={`py-12 md:py-16 bg-white transition-all duration-1000 ${
            visibleSections.has("maps")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] mb-4">
                Unplugged Ceremony
              </h2>
              <div className="w-20 h-1 bg-[#C587CD] mx-auto"></div>
            </div>

            <div className="space-y-8">
              <div className="text-center animate-fade-in-up animation-delay-300">
                <p className="font-['Poppins'] text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  To be truly present in each cherished moment, we kindly ask
                  that phones and cameras be set aside until we are joyfully
                  pronounced as husband and wife.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-4 my-8 animate-fade-in animation-delay-600">
                <div className="w-12 h-px bg-[#C587CD]"></div>
                <div className="w-2 h-2 bg-[#C587CD] rounded-full animate-pulse-slow"></div>
                <div className="w-12 h-px bg-[#C587CD]"></div>
              </div>

              <div className="text-center animate-fade-in-up animation-delay-900">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-['Playfair_Display'] font-semibold text-[#49284D] mb-6">
                  GIFTS
                </h3>

                <div className="rounded-xl p-6 md:p-8 max-w-2xl mx-auto transform transition-all duration-500 hover:scale-105">
                  <p className="font-['Poppins'] text-gray-700 text-lg mb-4">
                    Your presence is treasured, your prayers most dear, these
                    are the gifts we hold sincere. Should you desire to honour
                    us yet, a monetary gift would be kindly met.
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-6 mt-8">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="text-center animate-bounce-in"
                    style={{ animationDelay: `${item * 200}ms` }}
                  >
                    <div className="w-3 h-3 bg-[#C587CD] rounded-full mx-auto mb-2 opacity-60"></div>
                    <div className="w-1 h-1 bg-[#C587CD] rounded-full mx-auto opacity-40"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section
          id="rsvp"
          className={`py-12 md:py-20 bg-gradient-to-b from-[#E6E6FA] to-[#F0E8F1] transition-all duration-1000 ${
            visibleSections.has("rsvp")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-[#49284D] mb-4 animate-fade-in">
              RSVP
            </h2>
            <p className="text-lg leading-relaxed animate-fade-in-up animation-delay-300">
              <span className="font-bold text-[#49284D]">
                We have reserved __ seats for you.
              </span>{" "}
              The favor of a reply is kindly requested on or before{" "}
              <span className="font-bold text-[#49284D]">October 10, 2025</span>
              .
            </p>

            <p className="text-lg leading-relaxed font-medium text-[#49284D] bg-white/90 backdrop-blur-sm py-3 px-4 rounded-lg animate-fade-in-up animation-delay-600 transform transition-all duration-300 hover:scale-105">
              While we adore your little ones, we respectfully request an
              adults-only celebration.
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfaGsrhEFnkORUOooK5shd8Atc2ATylKKIVSNOGMZ3TYB6T3A/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-[#C587CD] text-white px-8 py-4 rounded-lg font-['Poppins'] font-medium hover:bg-[#b376bb] transition-all duration-500 shadow-md hover:shadow-2xl transform hover:-translate-y-2 hover:scale-110 mt-6 animate-fade-in-up animation-delay-900"
            >
              Click Here To RSVP
              <img
                src={arrow}
                alt="arrow"
                className="ml-2 h-5 w-5 rotate-90 transition-all duration-300 group-hover:scale-125 group-hover:translate-x-1"
              />
            </a>
          </div>
        </section>

        {/* Last Section */}
        <section
          className={`py-12 md:py-16 bg-white transition-all duration-1000 ${
            visibleSections.has("rsvp")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center px-4 animate-fade-in-left">
              <img
                src={logo}
                alt="logo"
                className="w-full max-w-md filter brightness-0 transform transition-all duration-500 hover:scale-110 hover:rotate-3"
              />
              <p className="font-['Playfair_Display'] text-xl font-semibold text-[#49284D]">
                Benson & Mich
              </p>
              <p className="font-['Playfair_Display'] text-xl font-semibold text-[#49284D]">
                10.30.2025
              </p>
            </div>

            <div className="flex flex-col items-center justify-center px-4 text-center animate-fade-in-right">
              <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#49284D] mb-4">
                HELP US CAPTURE THE LOVE AFTER
              </h3>
              <p className="font-['Poppins'] justify-center text-gray-700 leading-relaxed max-w-md mb-6">
                We are deeply grateful for your presence in our lives and on
                this special day. Your love and support mean the world to us as
                we embark on this beautiful journey together.
              </p>
              <div className="flex flex-row justify-center space-x-6 mt-2">
                <img
                  src={facebookIcon}
                  alt="facebook"
                  className="h-8 w-8 transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 cursor-pointer"
                />
                <img
                  src={instagramIcon}
                  alt="instagram"
                  className="h-8 w-8 transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 cursor-pointer"
                />
                <img
                  src={tiktokIcon}
                  alt="tiktok"
                  className="h-8 w-8 transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
