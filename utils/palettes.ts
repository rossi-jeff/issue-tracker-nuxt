export type PaletteType = {
	[key: string]: {
		light: string
		dark: string
		altLight: string
		altDark: string
	}
}

// fom https://www.canva.com/colors/color-palettes/
export const palettes: PaletteType = {
	'Green-Blaze': {
		light: '#B1D8B7',
		dark: '#2F5233',
		altLight: '#94C973',
		altDark: '#76B947',
	},
	'Cupcake-Delight': {
		light: '#EBE0D0',
		dark: '#A91B60',
		altLight: '#EC9EC0',
		altDark: '#FF0080',
	},
	'Facing-Forward': {
		light: '#E5DDC8',
		dark: '#004369',
		altLight: '#01949A',
		altDark: '#DB1F48',
	},
	'Mellow-Barnyard': {
		light: '#F8EFE4',
		dark: '#282120',
		altLight: '#E6C2BF',
		altDark: '#FAD02C',
	},
	'Milky-Stream': {
		light: '#FFFFFF',
		dark: '#13292A',
		altLight: '#E7DED9',
		altDark: '#988780',
	},
	/*
	'': {
		light: '',
		dark: '',
		altLight: '',
		altDark: ''
	}
	*/
}

export const PaletteNames = Object.keys(palettes)
