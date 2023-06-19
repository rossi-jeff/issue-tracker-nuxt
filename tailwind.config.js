import { createThemes } from 'tw-colors'
import { palettes } from './utils/palettes'

module.exports = {
	content: ['./pages/**/*.{html,ts,vue}', './components/**/*.{html,ts,vue}'],
	plugins: [createThemes(palettes)],
}
