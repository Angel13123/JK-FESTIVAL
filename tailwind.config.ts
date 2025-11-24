import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        headline: ['var(--font-headline)', 'Poppins', 'sans-serif'],
        body: ['var(--font-body)', 'PT Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
            '0%': {
                opacity: '0'
            },
            '100%': {
                opacity: '1'
            }
        },
        'zoom-in-out': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'breathing': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 10px transparent' },
          '50%': { transform: 'scale(1.02)', boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
        },
        'neon-pulse': {
          '0%, 100%': {
            borderColor: 'hsl(var(--primary) / 0.4)',
            boxShadow: '0 0 5px hsl(var(--primary) / 0.2), inset 0 0 5px hsl(var(--primary) / 0.2)',
          },
          '50%': {
            borderColor: 'hsl(var(--primary) / 1)',
            boxShadow: '0 0 15px hsl(var(--primary) / 0.6), inset 0 0 10px hsl(var(--primary) / 0.4)',
          }
        },
         'ken-burns': {
          '0%': {
            transform: 'scale(1) translate(0, 0)',
            transformOrigin: 'center center'
          },
          '100%': {
            transform: 'scale(1.15) translate(-2%, 2%)',
            transformOrigin: 'center center'
          },
        },
        'noise': {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '20% 25%' },
          '50%': { backgroundPosition: '-25% 10%' },
          '60%': { backgroundPosition: '15% 5%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '25% 35%' },
          '90%': { backgroundPosition: '-10% 10%' },
        },
        'neon-flicker': {
          '0%, 19.9%, 22%, 62.9%, 64%, 64.9%, 70%, 100%': {
            textShadow: 
              '0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--secondary))',
            color: 'hsl(var(--primary-foreground))',
          },
          '20%, 21.9%, 63%, 63.9%, 65%, 69.9%': {
            textShadow: 'none',
            color: 'transparent',
          }
        },
        'digital-glitch': {
            '0%, 100%': { transform: 'translate(0, 0)', opacity: '1' },
            '5%': { transform: 'translate(-2px, 2px)', opacity: '0.8' },
            '10%': { transform: 'translate(2px, -2px)', opacity: '0.9' },
            '15%': { transform: 'translate(0, 0)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
        'zoom-in-out': 'zoom-in-out 30s ease-in-out infinite',
        'breathing': 'breathing 4s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 3s ease-in-out infinite',
        'ken-burns': 'ken-burns 30s ease-out forwards infinite alternate',
        'noise': 'noise 2s steps(8, end) infinite both',
        'neon-flicker': 'neon-flicker 4s linear infinite',
        'digital-glitch': 'digital-glitch 5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
