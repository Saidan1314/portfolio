import { useCallback, useState } from 'react';

import { HeroStage } from '@/components/layout/HeroStage';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Navbar } from '@/components/layout/Navbar';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { MarqueeSection } from '@/components/sections/MarqueeSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { cn } from '@/lib/cn';

const MENU_ID = 'site-menu';

/**
 * The page. Two acts: a full-viewport opening stage with looping footage, and
 * the portfolio sheet that rises over it — about, services, projects, reel.
 */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div id="top" className="relative w-full overflow-x-clip bg-ink">
      <Navbar onOpenMenu={openMenu} menuId={MENU_ID} menuOpen={menuOpen} />

      <main>
        <HeroStage />

        {/*
          The sheet that closes the opening act. Its rounded lip, hairline and
          upward shadow are what make it read as a separate surface sliding
          over the footage rather than the next block in a column.
        */}
        <div
          className={cn(
            'relative z-10 border-t border-white/10 bg-ink font-kanit',
            'rounded-t-[40px] shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.9)]',
            'sm:rounded-t-[50px] md:rounded-t-[60px]',
          )}
        >
          <AboutSection />
          <TechStackSection />
          <ProjectsSection />
          <MarqueeSection />
          <ContactSection />
        </div>
      </main>

      <MobileMenu id={MENU_ID} open={menuOpen} onClose={closeMenu} />
    </div>
  );
}
