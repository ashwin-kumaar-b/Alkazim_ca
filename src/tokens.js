/**
 * Endloops Design Tokens
 * Eyedropped from supplied logo and aligned with the GCC financial brief.
 */

export const colors = {
  // Brand Anchors (Eyedropped from logo)
  green: {
    DEFAULT: '#0AAE67',
    dark: '#088D54',
    light: '#E8F8F0',
    subtle: '#F2FBF6',
  },
  teal: {
    DEFAULT: '#118379',
    dark: '#0E6860',
    light: '#E6F6F5',
    subtle: '#F0FAF9',
  },
  navy: {
    DEFAULT: '#1D2731', // Exact text hex from logo
    dark: '#141C24',
    light: '#2D3A47',
    subtle: '#475569',
    muted: '#64748B',
  },
  
  // Accents
  blue: {
    DEFAULT: '#2563EB',
    dark: '#1D4ED8',
    light: '#EFF6FF',
    subtle: '#F8FAFC',
  },
  purple: {
    DEFAULT: '#7C3AED',
    dark: '#6D28D9',
    light: '#F5F3FF',
  },
  amber: {
    DEFAULT: '#D97706',
    light: '#FEF3C7',
    border: '#FDE68A',
  },

  // Surfaces & Borders
  surface: {
    white: '#FFFFFF',
    canvas: '#F8FAFC',
    muted: '#F1F5F9',
    border: '#E2E8F0',
    borderStrong: '#CBD5E1',
  }
};

export const typography = {
  fonts: {
    display: '"Plus Jakarta Sans", Inter, -apple-system, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", SFMono-Regular, Menlo, monospace',
  },
  sizes: {
    hero: 'text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]',
    h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
    h2: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    h3: 'text-xl sm:text-2xl font-semibold',
    h4: 'text-lg sm:text-xl font-medium',
    bodyLg: 'text-lg leading-relaxed',
    body: 'text-base leading-relaxed',
    bodySm: 'text-sm leading-normal',
    caption: 'text-xs uppercase tracking-wider font-semibold',
  }
};

export const shadows = {
  subtle: '0 1px 3px 0 rgba(29, 39, 49, 0.05), 0 1px 2px -1px rgba(29, 39, 49, 0.05)',
  card: '0 4px 20px -2px rgba(29, 39, 49, 0.06), 0 2px 6px -2px rgba(29, 39, 49, 0.04)',
  hover: '0 12px 32px -4px rgba(29, 39, 49, 0.1), 0 4px 12px -2px rgba(29, 39, 49, 0.06)',
};

export const radii = {
  button: '10px',
  card: '16px',
  pill: '9999px',
};

// Motion transitions adhering to: only transform and opacity
export const transitions = {
  standard: {
    duration: 0.35,
    ease: [0.16, 1, 0.3, 1], // Custom smooth ease-out
  },
  gentle: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  },
  spring: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
  }
};
