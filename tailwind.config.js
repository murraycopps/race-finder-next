const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.tsx',
        './components/**/*.tsx',
    ],
    theme: {
        extend: {
            width: {
                '7/24': '29.1666666667%',
                '18': '4.5rem',
                '128': '32rem',
                '125': '31.25rem',
                '120': '30rem',
                '115': '28.75rem',
                '110': '27.5rem',
                '105': '26.25rem',
                '100': '25rem',
            },
            maxWidth: {
                '2xs': '10rem',
                '3xs': '5rem',
            },
            height: {
                '125': '31.25rem',
                '128': '32rem',
                '192': '48rem',
                '18': '4.5rem',
            },
            zIndex: {
                '100': '100',
                '110': '110',
            },
            colors: {
                'strava': '#f65900',
                'lavender': {
                    DEFAULT: '#BD6DE9',
                    50: '#FCF9FE',
                    100: '#F5E9FC',
                    200: '#E7CAF7',
                    300: '#D9ABF2',
                    400: '#CB8CEE',
                    500: '#BD6DE9',
                    600: '#A73CE2',
                    700: '#8C1EC8',
                    800: '#691797',
                    900: '#470F66'
                },
                // 'wisteria': {
                //     DEFAULT: '#9B61BD',
                //     50: '#EBE2F3',
                //     100: '#E1D4ED',
                //     200: '#CFB7E1',
                //     300: '#BD9AD5',
                //     400: '#AC7EC9',
                //     500: '#9B61BD',
                //     600: '#8D4AB0',
                //     700: '#7B3F97',
                //     800: '#68357E',
                //     900: '#552A65'
                // },

                'faded-lavender': {  DEFAULT: '#986BB3',  50: '#EBE4F1',  100: '#E1D7EA',  200: '#CEBCDC',  300: '#BCA1CE',  400: '#AA86C1',  500: '#986BB3',  600: '#8A55A5',  700: '#77498D',  800: '#653D76',  900: '#52315E'},
                'wisteria': {  DEFAULT: '#886BB3',  50: '#E8E4F1',  100: '#DDD7EA',  200: '#C6BCDC',  300: '#B1A1CE',  400: '#9C86C1',  500: '#886BB3',  600: '#7755A5',  700: '#67498D',  800: '#583D76',  900: '#47315E'},

                'ronchi': {
                    DEFAULT: '#EEB853',
                    50: '#FFFDFA',
                    100: '#FDF5E8',
                    200: '#F9E6C2',
                    300: '#F5D79D',
                    400: '#F2C778',
                    500: '#EEB853',
                    600: '#E9A320',
                    700: '#BE8213',
                    800: '#8B5F0E',
                    900: '#583C09'
                },
                'dark': "#0C0521",
                'light-base': "#f7fafc",
                'base': {
                    DEFAULT: '#0C0521',
                    50: '#734EE4',
                    100: '#673EE2',
                    200: '#5021DB',
                    300: '#441CBC',
                    400: '#39189D',
                    500: '#2E137E',
                    600: '#230E5F',
                    700: '#170A40',
                    800: '#0C0521',
                    900: '#070314'
                },
                'faded-purple': {
                    DEFAULT: '#8072A9',
                    50: '#D0CBDF',
                    100: '#C4BED7',
                    200: '#AEA5C8',
                    300: '#978BB8',
                    400: '#8072A9',
                    500: '#685A93',
                    600: '#544877',
                    700: '#40375A',
                    800: '#2C263E',
                    900: '#181421'
                },
                'faded-base': {
                    DEFAULT: '#1E1D37',
                    50: '#7D7BB9',
                    100: '#706EB2',
                    200: '#5855A2',
                    300: '#4A4787',
                    400: '#3B396C',
                    500: '#2D2B52',
                    600: '#1E1D37',
                    700: '#19182D',
                    800: '#131223',
                    900: '#0E0D19'
                },
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
                'centered-sm': '0 0 2px var(--tw-shadow-color)',
                centered: '0 0 4px var(--tw-shadow-color)',
                'centered-lg': '0 0 16px var(--tw-shadow-color)',

            },
        }

    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') }
            )
        }),
    ],
}