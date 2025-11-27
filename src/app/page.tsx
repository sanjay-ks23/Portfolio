'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MobileNav } from '@/components/Navigation';
import { Bookmarks } from '@/components/Bookmarks';
import { CoverPage } from '@/components/pages/Cover';
import { ProjectsPage } from '@/components/pages/Projects';
import { BlogPage } from '@/components/pages/Blog';
import { ProfilePage } from '@/components/pages/Profile';
import { SECTIONS } from '@/lib/data';

// Rigid Book Flip Variants (No Spring)
const variants: import('framer-motion').Variants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: direction > 0 ? 'left center' : 'right center',
  }),
  center: {
    zIndex: 1,
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    rotateY: direction < 0 ? 90 : -90,
    opacity: 0,
    transformOrigin: direction < 0 ? 'left center' : 'right center',
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  })
};

export default function Home() {
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState(0);

  const setPage = (index: number) => {
    if (index < 0 || index >= SECTIONS.length) return;
    setDirection(index > activePage ? 1 : -1);
    setActivePage(index);
  };

  const pages = [
    <CoverPage key="cover" goToProjects={() => setPage(1)} />,
    <ProjectsPage key="projects" />,
    <BlogPage key="blog" />,
    <ProfilePage key="profile" />
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white flex items-center justify-center p-4 md:p-8">

      {/* Main Book Container with Black Margin */}
      <div className="relative w-full h-full max-w-[1600px] border-[12px] border-black bg-white shadow-2xl flex">

        {/* The Newspaper Object */}
        <div className="newspaper-container w-full h-full relative bg-white overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activePage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full bg-white backface-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {pages[activePage]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bookmarks on the Right Edge */}
        <Bookmarks activeIndex={activePage} setIndex={setPage} />

      </div>

      {/* Mobile Navigation (Keep for small screens) */}
      <MobileNav activeIndex={activePage} setIndex={setPage} />

    </div>
  );
}
