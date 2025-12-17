tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#ea580c', // Deeper, more professional orange
                secondary: '#334155', // Slate 700 for balance
                accent: '#fff7ed', // Very light orange background
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'rotate-gradient': 'rotateGradient 8s ease infinite', // Slower, smoother
                'float-slow': 'float 20s ease-in-out infinite',
                'float-medium': 'float 15s ease-in-out infinite',
                'float-fast': 'float 12s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                rotateGradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                },
                float: {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '25%': { transform: 'translate(20px, -20px)' }, // Reduced movement range for subtlety
                    '50%': { transform: 'translate(-10px, 15px)' },
                    '75%': { transform: 'translate(-15px, -10px)' }
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                }
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'glow': '0 0 15px rgba(234, 88, 12, 0.3)',
            }
        }
    }
}
