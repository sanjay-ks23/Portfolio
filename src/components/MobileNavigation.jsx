import React, { useState, useEffect } from 'react';

const MobileNavigation = ({ activePage, onNavigate }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`
        fixed top-0 left-0 w-full z-50 md:hidden bg-[#1a1a1a] pb-2
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
        >
            {/* Book Container with Left Margin */}
            <div className="ml-4 relative pt-4 pr-4">

                {/* The Spine Curve & Top Page Line */}
                <div className="absolute top-4 left-0 w-full h-full border-l-2 border-[#e5e5e5] rounded-tl-2xl pointer-events-none z-0"></div>

                {/* Page Lines (The Stack) */}
                <div className="relative z-0 pl-4">
                    {/* Line 1 (Top) */}
                    <div className="h-[2px] w-full bg-[#e5e5e5] mb-2 shadow-sm"></div>
                    {/* Line 2 */}
                    <div className="h-[2px] w-[98%] bg-[#e5e5e5] mb-2 shadow-sm"></div>
                    {/* Line 3 */}
                    <div className="h-[2px] w-[96%] bg-[#e5e5e5] shadow-sm"></div>
                </div>

                {/* Tabs (Intersecting) */}
                <div className="absolute top-0 left-6 right-0 flex justify-start items-end z-10 overflow-x-auto no-scrollbar pl-2">
                    {['Front Page', 'Projects', 'Blogs', 'Contact'].map((item, index) => {
                        const id = item.toLowerCase().replace(' ', '');
                        const targetPage = id === 'frontpage' ? 'front' : id;
                        const isActive = activePage === targetPage;

                        if (isActive) return null;

                        return (
                            <button
                                key={item}
                                onClick={() => onNavigate(targetPage)}
                                className={`
                  relative px-3 py-2 mr-[-8px]
                  font-mono text-[9px] font-black uppercase tracking-widest
                  bg-red-700 text-white hover:bg-red-800
                  border border-red-900/50 rounded-t-md rounded-br-md
                  shadow-[2px_2px_4px_rgba(0,0,0,0.4)]
                  transform transition-transform active:scale-95
                `}
                                style={{
                                    zIndex: 20 - index,
                                    marginBottom: '6px' // Push down to intersect with lines
                                }}
                            >
                                {item === 'Front Page' ? 'Home' : item}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MobileNavigation;
