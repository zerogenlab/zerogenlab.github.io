import {
    defineConfig,
    presetIcons,
    transformerDirectives,
    transformerVariantGroup
} from 'unocss'
import presetWind4 from '@unocss/preset-wind4'

export default defineConfig({
    cli: {
        entry: [
            {
                patterns: [
                    "layouts/**/*.{html,js}",
                    "content/**/*.{md,html}",
                    "themes/**/layouts/**/*.{html,js}",
                    "themes/**/assets/**/*.{js,html}",
                    "./hugo.toml",
                ],
                outFile: 'themes/tella/assets/css/style.css'
            }
        ]
    },
    presets: [
        presetWind4({
            preflights: {
                reset: true,
            }
        }),
        presetIcons(),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],
})