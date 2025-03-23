tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#FFB366',
                accent: '#FFE5CC',
            },
            animation: {
                'rotate-gradient': 'rotateGradient 3s ease infinite',
                'float-slow': 'float 15s ease-in-out infinite',
                'float-medium': 'float 12s ease-in-out infinite',
                'float-fast': 'float 10s ease-in-out infinite',
                'typing': 'typing 3.5s ease-out forwards',
                'cursor': 'cursor 1.1s ease-in-out infinite'
            },
            keyframes: {
                rotateGradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },
                float: {
                    '0%': { transform: 'translate(0, 0) scale(1)' },
                    '25%': { transform: 'translate(100px, -80px) scale(1.03)' },
                    '50%': { transform: 'translate(-40px, 120px) scale(0.98)' },
                    '75%': { transform: 'translate(-120px, -40px) scale(1.03)' },
                    '100%': { transform: 'translate(0, 0) scale(1)' }
                },
                typing: {
                    '0%': { width: '0', opacity: '0' },
                    '10%': { opacity: '1' },
                    '100%': { width: '100%', opacity: '1' }
                },
                cursor: {
                    '0%, 100%': { borderRightColor: 'transparent' },
                    '50%': { borderRightColor: 'currentColor' }
                }
            },
            transitionDelay: {
                '1000': '1000ms',
                '2000': '2000ms',
                '3000': '3000ms',
            }
        }
    }
}
