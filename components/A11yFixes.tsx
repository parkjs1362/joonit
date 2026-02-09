'use client';

import { useEffect } from 'react';

function fixBottomBarImageAlt() {
  const imgs = document.querySelectorAll<HTMLImageElement>('#bottomBar > img:not([alt])');
  for (const img of imgs) {
    img.setAttribute('alt', '하단 안내 배너');
  }
}

export default function A11yFixes() {
  useEffect(() => {
    fixBottomBarImageAlt();

    const observer = new MutationObserver(() => {
      fixBottomBarImageAlt();
    });

    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['id'],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
