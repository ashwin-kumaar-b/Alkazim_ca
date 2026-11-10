/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // ─── Brand Colors ───────────────────────────────────────────────
      colors: {
        // Logo primary green
        green: {
          50: '#F0FBF6',
          100: '#D6F5E6',
          200: '#AEEBCD',
          DEFAULT: '#0AAE67',
          600: '#088D54',
          700: '#06723F',
        },
        // Logo accent teal
        teal: {
          50: '#F0FAF9',
          100: '#D3F1EE',
          200: '#A8E3DC',
          DEFAULT: '#118379',
          600: '#0E6860',
          700: '#0B5049',
        },
        // Logo dark navy text & surfaces (WCAG AA compliant contrast)
        navy: {
          DEFAULT: '#1D2731',
          700: '#2D3A47',
          600: '#3D4E5C',
          400: '#475569',
          300: '#64748B',
        },
        // Sparing accents
        blue: {
          DEFAULT: '#2563EB',
          light: '#EFF6FF',
        },
        purple: {
          DEFAULT: '#7C3AED',
          light: '#F5F3FF',
        },
        // Flags
        amber: {
          DEFAULT: '#D97706',
          light: '#FEF3C7',
          border: '#FDE68A',
        },

        // ─── Narrative Mood Tokens ────────────────────────────────────
        // Tension tokens: slightly grey backgrounds, tight borders
        tension: {
          bg: '#F3F4F6',
          surface: '#F9FAFB',
          border: '#E5E7EB',
          muted: '#6B7280',
        },
        // Calm tokens: white canvas, very light teal tint, relaxed borders
        calm: {
          bg: '#FFFFFF',
          teal: '#F0FAF9',
          subtle: '#F8FAFC',
          border: '#E2E8F0',
          borderStrong: '#CBD5E1',
        },
      },

      // ─── Typography ─────────────────────────────────────────────────
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      // Type scale: display, h1, h2, h3, body, small
      fontSize: {
        display: ['clamp(2.5rem, 5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        h1: ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.14', letterSpacing: '-0.02em' }],
        h2: ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.012em' }],
        h3: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.006em' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.08em' }],
      },

      // ─── Spacing: Tension (tight) vs Calm (generous) ─────────────────
      spacing: {
        // Tight tension pacing
        'tension-gap': '0.75rem',
        'tension-pad': '1rem',
        'tension-section': '3.5rem',
        // Generous calm pacing
        'calm-gap': '2rem',
        'calm-pad': '2.5rem',
        'calm-section': '7rem',
      },

      // ─── Radius: rounded-2xl for cards ──────────────────────────────
      borderRadius: {
        '2xl': '1rem', // 16px cards
        card: '1rem', // 16px alias
        button: '0.625rem', // 10px button
        pill: '9999px',
      },

      // ─── Soft Shadows & Thin Borders ────────────────────────────────
      boxShadow: {
        xs: '0 1px 2px rgba(29, 39, 49, 0.04)',
        sm: '0 1px 3px rgba(29, 39, 49, 0.05), 0 1px 2px -1px rgba(29, 39, 49, 0.04)',
        card: '0 4px 20px -2px rgba(29, 39, 49, 0.06), 0 2px 6px -2px rgba(29, 39, 49, 0.04)',
        hover: '0 12px 32px -4px rgba(29, 39, 49, 0.08), 0 4px 12px -2px rgba(29, 39, 49, 0.05)',
      },
      borderWidth: {
        DEFAULT: '1px',
        1: '1px',
      },
    },
  },
  plugins: [],
}
