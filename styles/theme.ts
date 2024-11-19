export type ThemeColors = {
    primary: string;
    secondary: string;
    accent: AccentColorPallete;
    background: string;
    text: string;
    border: string;
    constant: ConstantColors
}

export type AccentColorPallete = {
    primary: string;
    gradient1: string;
    gradient2: string;
}

export type ConstantColors = {
    success: string;
    error: string;
    warning: string;
}

const accent: AccentColorPallete = {
    primary: '#156DBF',
    gradient1: '#4F92CF',
    gradient2: '#1D62A2',
}

const constant: ConstantColors = {
    success: '#8DB600',
    error: '#F30000',
    warning: '#FFD91E'
}

export const theme: ThemeColors = {
    primary: '#ED2024',
    secondary: '#FFAA00',
    accent,
    background: '#21282E',
    text: '#FDFFFC',
    border: '#495E71',
    constant
}