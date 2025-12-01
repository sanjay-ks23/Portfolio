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

    const navItems = ['Front Page', 'Projects', 'Blogs', 'Contact'];

    return (
        <div
            className={`
        fixed top-0 left-0 w-full z-50 md:hidden bg-[#1a1a1a] pb-4
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
        >
            <div className="relative w-full h-[80px]">

                {/* The Spine (Left Border + Curve) */}
                <div className="absolute top-4 left-2 bottom-0 w-[20px] border-l-2 border-t-2 border-[#e5e5e5] rounded-tl-xl pointer-events-none z-0"></div>

                {/* Page Lines (Staggered) */}
                <div className="absolute top-4 left-[22px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>
                <div className="absolute top-10 left-[22px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>
                <div className="absolute top-16 left-[22px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>

                {/* Tabs (Staggered on Lines) */}
                <div className="absolute top-0 left-[24px] right-0 h-full">
                    {navItems.map((item, index) => {
                        const id = item.toLowerCase().replace(' ', '');
                        const targetPage = id === 'frontpage' ? 'front' : id;
                        const isActive = activePage === targetPage;

                        if (isActive) return null;

                        // Stagger logic: 
                        // Index 0 -> Line 1 (Top 0)
                        // Index 1 -> Line 2 (Top 6)
                        // Index 2 -> Line 3 (Top 12)
                        // We need to map available items to these slots. 
                        // Since one item is hidden (active), we have 3 slots for 3 items.

                        // Calculate visual index among *rendered* items
                        const renderedIndex = navItems.filter(i => {
                            const iId = i.toLowerCase().replace(' ', '');
                            const iTarget = iId === 'frontpage' ? 'front' : iId;
                            return iTarget !== activePage;
                        }).indexOf(item); // 0, 1, or 2

                        // Determine top position based on visual index
                        const topPos = renderedIndex * 24; // 0px, 24px, 48px (matching line spacing)
                        const leftPos = renderedIndex * 90; // Horizontal spacing

                        return (
                            <button
                                key={item}
                                onClick={() => onNavigate(targetPage)}
                                className={`
                  absolute
                  px-3 py-1
                  font-mono text-[9px] font-black uppercase tracking-widest
                  bg-red-700 text-white hover:bg-red-800
                  border border-red-900/50 rounded-t-md rounded-br-md
                  shadow-[2px_2px_4px_rgba(0,0,0,0.4)]
                  transform transition-transform active:scale-95
                `}
                                style={{
                                    top: `${topPos}px`,
                                    left: `${leftPos}px`,
                                    zIndex: 20 - renderedIndex,
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
