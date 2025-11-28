import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function EmailComposer() {
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const containerRef = useRef(null);
    const textareaRef = useRef(null);
    const buttonRef = useRef(null);

    // Auto-generate subject line
    useEffect(() => {
        if (!message) {
            setSubject('');
            return;
        }
        const words = message.split(' ').slice(0, 5).join(' ');
        setSubject(`Portfolio Inquiry: ${words}...`);
    }, [message]);

    // Entrance Animation
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        )
            .fromTo(textareaRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4 },
                "-=0.3"
            );
    }, []);

    const handleSend = () => {
        // Button Animation
        gsap.to(buttonRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                const mailtoLink = `mailto:sanjaysaravanan2317@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
                window.location.href = mailtoLink;
            }
        });
    };

    const handleFocus = () => {
        gsap.to(containerRef.current, {
            borderColor: '#dc2626', // red-600
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.2)',
            duration: 0.3
        });
    };

    const handleBlur = () => {
        gsap.to(containerRef.current, {
            borderColor: '#3f3f46', // zinc-700
            boxShadow: 'none',
            duration: 0.3
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                ref={containerRef}
                className="bg-zinc-900 border border-zinc-700 p-6 relative overflow-hidden transition-colors"
            >
                {/* Decorative Header */}
                <div className="flex justify-between items-center mb-4 border-b border-zinc-800 pb-2">
                    <div className="flex items-center gap-2 text-red-600">
                        <Sparkles size={16} />
                        <span className="font-mono text-xs uppercase tracking-widest">New Message</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                        <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                    </div>
                </div>

                {/* Subject Preview */}
                <div className="mb-4 font-mono text-xs text-zinc-500 flex gap-2">
                    <span className="uppercase tracking-wider">Subject:</span>
                    <span className="text-zinc-300 truncate">{subject || '(Auto-generated)'}</span>
                </div>

                {/* Text Area */}
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Type your message here... I'll handle the rest."
                    className="w-full h-40 bg-transparent border-none resize-none focus:ring-0 text-zinc-300 font-serif text-lg italic placeholder:text-zinc-700 leading-relaxed"
                />

                {/* Footer / Send Action */}
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-zinc-800">
                    <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider">
                        {message.length} chars
                    </div>

                    <button
                        ref={buttonRef}
                        onClick={handleSend}
                        disabled={!message}
                        className={`
              flex items-center gap-2 px-6 py-3 
              font-mono text-xs font-bold uppercase tracking-widest
              transition-all duration-300
              ${message
                                ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20'
                                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}
            `}
                    >
                        <span>Send Transmission</span>
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
