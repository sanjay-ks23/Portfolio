import React from 'react';
import { SECTIONS } from '@/lib/data';

interface NavProps {
    activeIndex: number;
    setIndex: (index: number) => void;
}

export const NavStrip: React.FC<NavProps> = ({ activeIndex, setIndex }) => (
    <div className="absolute -right-12 top-20 flex flex-col gap-2 z-50 hidden md:flex">
        {SECTIONS.map((sec, i) => (
            <button
                key={sec}
                onClick={() => setIndex(i)}
                className={`
                    w-10 h-32 border-2 border-l-0 border-ink font-mono text-xs font-bold uppercase tracking-widest
                    flex items-center justify-center [writing-mode:vertical-rl] transition-all duration-300
                    ${i === activeIndex
                        ? 'bg-ink text-paper translate-x-0'
                        : 'bg-paper text-ink translate-x-2 hover:translate-x-0 hover:bg-stone-200'}
                `}
                style={{ borderRadius: '0 4px 4px 0', marginTop: `${i * -10}px` }}
            >
                {sec}
            </button>
        ))}
    </div>
);

export const MobileNav: React.FC<NavProps> = ({ activeIndex, setIndex }) => (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-ink text-paper z-50 flex justify-around py-4 border-t-4 border-accent">
        {SECTIONS.map((sec, i) => (
            <button
                key={sec}
                onClick={() => setIndex(i)}
                className={`font-mono text-xs uppercase tracking-wider ${i === activeIndex ? 'text-accent font-bold' : 'text-stone-400'}`}
            >
                {sec}
            </button>
        ))}
    </div>
);
