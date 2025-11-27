import React from 'react';

interface HeaderProps {
    title: string;
    sub?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, sub }) => {
    const [date, setDate] = React.useState('');

    React.useEffect(() => {
        setDate(new Date().toLocaleDateString());
    }, []);

    return (
        <header className="border-b-4 border-double border-ink pb-4 mb-8 text-center relative">
            <div className="hidden md:block absolute top-0 left-0 font-mono text-xs tracking-widest uppercase text-left">
                The Dev Chronicles<br />Vol. 01 / No. 42
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">{title}</h1>
            <div className="hidden md:block absolute top-0 right-0 font-mono text-xs tracking-widest uppercase text-right">
                Chennai, IN<br />{date}
            </div>
            {sub && (
                <div className="mt-2 border-t border-ink pt-2 font-serif italic text-sm md:text-base">
                    {sub}
                </div>
            )}
        </header>
    );
};
