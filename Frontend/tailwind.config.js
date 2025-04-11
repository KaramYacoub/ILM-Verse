/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
            "primary": "#8A0E31",
            "secondary": "#FAC67A",
            "accent": "#FAC67A",
            "neutral": "#1f1f1f",
            "base-100": "#ffffff",
            "info": "#3ABFF8",
            "success": "#36D399",
            "warning": "#FBBD23",
            "error": "#F87272",
          },
      },
    ],
  },
};
