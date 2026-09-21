import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: '#0b1020',
        panel: '#121a2b',
        accent: '#7c9dff',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        muted: '#94a3b8'
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.15)'
      }
    }
  },
  plugins: []
};

export default config;
