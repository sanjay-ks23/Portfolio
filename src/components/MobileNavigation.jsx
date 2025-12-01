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
        fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] md:hidden
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
        >
            <div
                className="
          flex items-center justify-center
          bg-black/70 backdrop-blur-3xl
          border border-red-700
          shadow-2xl shadow-black/50
          rounded-sm
          overflow-hidden
        "
            >
                {navItems.map((item, index) => {
                    const id = item.toLowerCase().replace(' ', '');
                    const targetPage = id === 'frontpage' ? 'front' : id;
                    const isActive = activePage === targetPage;

                    if (isActive) return null;

                    // Check if this is the last item in the *rendered* list to avoid right border
                    // But since we filter one out, it's tricky. 
                    // Simpler: Add border-r to all, and remove from last-child via CSS class?
                    // Or just use a separator element.

                    return (
                        <React.Fragment key={item}>
                            <button
                                onClick={() => onNavigate(targetPage)}
                                className="
                  px-5 py-3
                  font-mono text-[10px] font-bold uppercase tracking-widest
                  text-white/70 hover:text-red-500 hover:bg-white/5
                  transition-all duration-200
                  border-r border-white/10 last:border-r-0
                "
                            >
                                {item === 'Front Page' ? 'Home' : item}
                            </button>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNavigation;
