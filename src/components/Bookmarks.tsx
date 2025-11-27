import React from 'react';
import { SECTIONS } from '@/lib/data';

interface BookmarksProps {
    activeIndex: number;
    setIndex: (index: number) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ activeIndex, setIndex }) => (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-50">
        {SECTIONS.map((sec, i) => (
            <button
                key={sec}
                onClick={() => setIndex(i)}
                className={`
                    w-12 h-32 border-2 border-l-0 border-black font-mono text-xs font-bold uppercase tracking-widest
                    flex items-center justify-center [writing-mode:vertical-rl] transition-all duration-200
                    ${i === activeIndex
                        ? 'bg-black text-white translate-x-0'
                        : 'bg-white text-black translate-x-2 hover:translate-x-0'}
                `}
                style={{
                    borderRadius: '0 4px 4px 0',
                    boxShadow: i === activeIndex ? 'none' : '-2px 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                {sec}
            </button>
        ))}
    </div>
);
