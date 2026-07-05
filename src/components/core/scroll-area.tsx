'use client';

import React, { forwardRef, useRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  thumbClassName?: string;
  trackClassName?: string;
  hideScrollbar?: boolean;
  fadeScrollbar?: boolean;
  children: React.ReactNode;
  scrollbarClassName?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      children,
      className,
      orientation = 'vertical',
      scrollbarClassName,
      thumbClassName,
      trackClassName,
      hideScrollbar = false,
      fadeScrollbar = true,
      ...props
    },
    ref,
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);

    useEffect(() => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;

      const updateScrollInfo = () => {
        setScrollTop(scrollElement.scrollTop);
        setScrollLeft(scrollElement.scrollLeft);
        setScrollHeight(scrollElement.scrollHeight);
        setScrollWidth(scrollElement.scrollWidth);
        setClientHeight(scrollElement.clientHeight);
        setClientWidth(scrollElement.clientWidth);
      };

      const handleScroll = () => {
        updateScrollInfo();
        setIsScrolling(true);

        // Hide scrollbar after scrolling stops
        if (fadeScrollbar) {
          setTimeout(() => setIsScrolling(false), 1000);
        }
      };

      const resizeObserver = new ResizeObserver(updateScrollInfo);

      scrollElement.addEventListener('scroll', handleScroll);
      resizeObserver.observe(scrollElement);

      // Initial update
      updateScrollInfo();

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }, [fadeScrollbar]);

    const verticalThumbHeight =
      clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 0;
    const verticalThumbTop =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * clientHeight : 0;

    const horizontalThumbWidth =
      clientWidth > 0 ? (clientWidth / scrollWidth) * clientWidth : 0;
    const horizontalThumbLeft =
      scrollWidth > 0 ? (scrollLeft / scrollWidth) * clientWidth : 0;

    const showVerticalScrollbar =
      orientation !== 'horizontal' && scrollHeight > clientHeight;
    const showHorizontalScrollbar =
      orientation !== 'vertical' && scrollWidth > clientWidth;

    return (
      <div className={cn('relative overflow-hidden', className)} {...props}>
        {/* Scroll Content */}
        <div
          ref={(node) => {
            // @ts-ignore
            scrollRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              // @ts-ignore
              ref.current = node;
            }
          }}
          className={cn(
            'h-full w-full overflow-auto',
            // Hide native scrollbars
            'scrollbar-none',
            '[&::-webkit-scrollbar]:hidden',
            '[-ms-overflow-style:none]',
            '[scrollbar-width:none]',
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {children}
        </div>

        {/* Custom Scrollbars */}
        {!hideScrollbar && (
          <>
            {/* Vertical Scrollbar */}
            {showVerticalScrollbar && (
              <div
                className={cn(
                  'absolute right-0 top-0 z-10 h-full w-2 transition-opacity duration-300',
                  fadeScrollbar && !isScrolling ? 'opacity-0' : 'opacity-100',
                  trackClassName,
                )}
              >
                <div
                  className={cn(
                    'absolute right-0 w-2 rounded-sm bg-gunmetal/30 transition-all duration-200 hover:bg-gunmetal/50',
                    scrollbarClassName,
                  )}
                  style={{
                    height: `${Math.max(verticalThumbHeight, 20)}px`,
                    top: `${verticalThumbTop}px`,
                  }}
                >
                  <div
                    className={cn(
                      'h-full w-full rounded-sm bg-ash/40 transition-colors duration-200 hover:bg-ash/60',
                      thumbClassName,
                    )}
                  />
                </div>
              </div>
            )}

            {/* Horizontal Scrollbar */}
            {showHorizontalScrollbar && (
              <div
                className={cn(
                  'absolute bottom-0 left-0 z-10 h-2 w-full transition-opacity duration-300',
                  fadeScrollbar && !isScrolling ? 'opacity-0' : 'opacity-100',
                  trackClassName,
                )}
              >
                <div
                  className={cn(
                    'absolute bottom-0 h-2 rounded-sm bg-gunmetal/30 transition-all duration-200 hover:bg-gunmetal/50',
                    scrollbarClassName,
                  )}
                  style={{
                    width: `${Math.max(horizontalThumbWidth, 20)}px`,
                    left: `${horizontalThumbLeft}px`,
                  }}
                >
                  <div
                    className={cn(
                      'h-full w-full rounded-sm bg-ash/40 transition-colors duration-200 hover:bg-ash/60',
                      thumbClassName,
                    )}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
