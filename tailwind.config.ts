import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },

      backgroundImage: {
        app: 'url(/bg-app.png)'
      },

      colors: {
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        },
        yellow: {
          500: '#F7DD43',
          550: '#E5CD3D'
        },
        bets: {
          500: '#129E57'
        }
      }
    },
  },
  plugins: [],
};
export default config;
