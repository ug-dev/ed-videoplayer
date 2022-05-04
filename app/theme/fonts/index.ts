import { Dimensions } from 'react-native';
import { COLORS } from '../color';

const { width, height } = Dimensions.get('screen');

const FONT_STYLE = {
    thin: 'Gilroy-Thin',
    light: 'Gilroy-Light',
    medium: 'Gilroy-Medium',
    regular: 'Gilroy-Regular',
    semiBold: 'Gilroy-SemiBold',
    bold: 'Gilroy-Bold',
    heavy: 'Gilroy-Heavy',
    black: 'Gilroy-Black',
};

const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    large: 42,
    size1: 28,
    size2: 26,
    size3: 24,
    size4: 22,
    size5: 18,
    size6: 16,
    size7: 14,
    size8: 12,
    size9: 10,

    // app dimensions
    width,
    height,
};

export { FONT_STYLE, SIZES };

export default {
    largeTitle: {
        fontFamily: FONT_STYLE.black,
        fontSize: SIZES.large,
        lineHeight: SIZES.large + 4,
        color: COLORS.text,
    },
    h1: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size1,
        lineHeight: SIZES.size1 + 4,
        color: COLORS.text,
    },
    h2: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size2,
        lineHeight: SIZES.size2 + 4,
        color: COLORS.text,
    },
    h3: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size3,
        lineHeight: SIZES.size3,
        color: COLORS.text,
    },
    h4: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size4,
        lineHeight: SIZES.size4 + 4,
        color: COLORS.text,
    },
    h5: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size5,
        lineHeight: SIZES.size5 + 4,
        color: COLORS.text,
    },
    h6: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size6,
        lineHeight: SIZES.size6 + 4,
        color: COLORS.text,
    },
    h7: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size7,
        lineHeight: SIZES.size7 + 4,
        color: COLORS.text,
    },
    h8: {
        fontFamily: FONT_STYLE.bold,
        fontSize: SIZES.size8,
        lineHeight: SIZES.size8 + 4,
        color: COLORS.text,
    },
    body1: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size1,
        lineHeight: SIZES.size1 + 4,
        color: COLORS.text,
    },
    body2: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size2,
        lineHeight: SIZES.size2 + 4,
        color: COLORS.text,
    },
    body3: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size3,
        lineHeight: SIZES.size3 + 4,
        color: COLORS.text,
    },
    body4: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size4,
        lineHeight: SIZES.size4 + 4,
        color: COLORS.text,
    },
    body5: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size5,
        lineHeight: SIZES.size5 + 4,
        color: COLORS.text,
    },
    body6: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size6,
        lineHeight: SIZES.size6 + 4,
        color: COLORS.text,
    },
    body7: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size7,
        lineHeight: SIZES.size7 + 4,
        color: COLORS.text,
    },
    body8: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size8,
        lineHeight: SIZES.size8 + 4,
        color: COLORS.text,
    },
    body9: {
        fontFamily: FONT_STYLE.medium,
        fontSize: SIZES.size9,
        lineHeight: SIZES.size9 + 4,
        color: COLORS.text,
    },
    p1: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size1,
        lineHeight: SIZES.size1 + 4,
        color: COLORS.text,
    },
    p2: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size2,
        lineHeight: SIZES.size2 + 4,
        color: COLORS.text,
    },
    p3: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size3,
        lineHeight: SIZES.size3 + 4,
        color: COLORS.text,
    },
    p4: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size4,
        lineHeight: SIZES.size4 + 4,
        color: COLORS.text,
    },
    p5: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size5,
        lineHeight: SIZES.size5 + 4,
        color: COLORS.text,
    },
    p6: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size6,
        lineHeight: SIZES.size6 + 4,
        color: COLORS.text,
    },
    p7: {
        fontFamily: FONT_STYLE.light,
        fontSize: SIZES.size7,
        lineHeight: SIZES.size7 + 4,
        color: COLORS.text,
    },
};
