import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Pinned to the bottom of the panel — for the main call-to-action buttons. */
  footer?: ReactNode;
  /** Hide the menu from this breakpoint up (must match where the desktop nav appears). */
  hideFrom?: 'md' | 'lg';
  /** Panel colours; defaults follow the site theme tokens. */
  panelClassName?: string;
}

/**
 * Slide-in navigation drawer for small screens.
 * Render it outside any element with a transform or backdrop-filter (e.g. motion.nav),
 * otherwise `position: fixed` is scoped to that element instead of the viewport.
 */
export default function MobileMenu({
  open,
  onClose,
  title,
  children,
  footer,
  hideFrom = 'md',
  panelClassName = 'bg-card text-foreground border-border',
}: MobileMenuProps) {
  // Lock page scroll and close on Escape while the menu is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const hidden = hideFrom === 'lg' ? 'lg:hidden' : 'md:hidden';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={clsx('fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm', hidden)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={clsx(
              'fixed top-0 right-0 bottom-0 z-[70] w-[82%] max-w-sm border-l shadow-2xl flex flex-col',
              hidden,
              panelClassName
            )}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-current/10">
              <span className="font-semibold">{title}</span>
              <button
                autoFocus
                onClick={onClose}
                className="p-2 rounded-full hover:bg-current/10 transition-colors cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-4">{children}</div>
            {footer && <div className="p-4 border-t border-current/10 space-y-2">{footer}</div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Close the menu first, then scroll once the page is unlocked and the panel has animated out. */
export function scrollAfterClose(close: () => void, id: string) {
  close();
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
}
