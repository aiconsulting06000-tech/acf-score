import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9333EA',
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        accent: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
        },
        brand: {
          violet: '#9333EA',
          magenta: '#EC4899',
          dark: '#1E1B4B',
        },
        alert: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
}
export default config
