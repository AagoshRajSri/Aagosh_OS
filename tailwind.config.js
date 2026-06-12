/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple:   { DEFAULT: '#8b5cf6', dark: '#6d28d9' },
        pink:     { DEFAULT: '#ff6ec7', dark: '#e040fb' },
        teal:     '#7fffd4',
        mint:     '#00e5c8',
        bg:       '#15121b',
        surface:  '#1e1a2e',
        surface2: '#2a2440',
        ctext:    '#e8e0ff',
        dim:      '#9580c0',
        yellow:   '#ffe066',
        cred:     '#ff4466',
        cgreen:   '#39ff82',
      },
      fontFamily: { mono: ['"Space Mono"', 'monospace'] },
      borderWidth: { 3: '3px' },
      boxShadow: {
        candy:     '4px 4px 0 #6d28d9',
        'candy-lg':'4px 4px 0 #6d28d9, 0 20px 60px rgba(0,0,0,0.6)',
        'candy-pink':'4px 4px 0 #e040fb',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(#ffffff18 1px, transparent 1px)',
        'scanline-h': 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.18) 50%)',
        'scanline-v': 'linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.02),rgba(0,0,255,0.04))',
      },
      backgroundSize: { 'dot-20': '20px 20px', 'scan-h': '100% 4px', 'scan-v': '6px 100%' },
    },
  },
  plugins: [],
};
