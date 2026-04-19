import sys
import os

def generate_tailwind_config():
    """
    Gera o trecho de configuração do Tailwind CSS com os tokens do projeto.
    """
    config = '''
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        "primary": "#4a7c59",
        "secondary": "#6b6358",
        "tertiary": "#705c30",
        "background": "#faf6f0",
        "on-background": "#2e3230",
        "surface": "#faf6f0",
        "surface-variant": "#e4e0d8",
        "outline": "#74796e",
      },
      fontFamily: {
        "headline": ["Lora", "serif"],
        "body": ["Raleway", "sans-serif"],
      },
      animation: {
        "marquee-slow": "marquee 45s linear infinite",
        "breathing": "breathing 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        breathing: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        }
      }
    },
  },
}
'''
    return config

def generate_base_css():
    """
    Gera o CSS base com classes de utilidade customizadas.
    """
    css = '''
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-blur: 12px;
}

.antigravity-glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.05);
}

.transform-style-3d { transform-style: preserve-3d; }
.tilt-child { transform: translateZ(var(--tz, 0px)); }
.tz-10 { --tz: 10px; }
.tz-30 { --tz: 30px; }
.tz-50 { --tz: 50px; }
'''
    return css

if __name__ == "__main__":
    print("--- TAILWIND CONFIG ---")
    print(generate_tailwind_config())
    print("\n--- BASE CSS ---")
    print(generate_base_css())
    print("\n--- DEPENDENCIES ---")
    print("npm install -D tailwindcss autoprefixer postcss")
    print("Google Fonts: Lora (400, 700) & Raleway (400, 500, 700)")
