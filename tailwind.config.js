/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        brand: {
          green: '#0AAE67',
          'green-dark': '#088D54',
          'green-light': '#E8F8F0',
          'green-subtle': '#F2FBF6',
          teal: '#118379',
          'teal-dark': '#0E6860',
          'teal-light': '#E6F6F5',
          'teal-subtle': '#F0FAF9',
          navy: '#1D2731',
          'navy-dark': '#141C24',
          'navy-light': '#2D3A47',
          'navy-subtle': '#475569',
          blue: '#2563EB',
          'blue-light': '#EFF6FF',
          purple: '#7C3AED',
          'purple-light': '#F5F3FF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8FAFC',
          muted: '#F1F5F9',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(29, 39, 49, 0.05), 0 1px 2px -1px rgba(29, 39, 49, 0.05)',
        'card': '0 4px 20px -2px rgba(29, 39, 49, 0.06), 0 2px 6px -2px rgba(29, 39, 49, 0.04)',
        'hover': '0 12px 32px -4px rgba(29, 39, 49, 0.1), 0 4px 12px -2px rgba(29, 39, 49, 0.06)',
        'green-glow': '0 0 24px -4px rgba(10, 174, 103, 0.25)',
      },
      borderRadius: {
        'card': '16px',
        'button': '10px',
      }
    },
  },
  plugins: [],
}
