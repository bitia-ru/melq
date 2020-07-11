import { StyleSheet } from '@/v1/aphrodite';

export const mainFontColor = '#202028';
export const disabledColor = '#DBDBDB';
export const disabledBtnColor = '#ECECEC';
export const infoColor = '#1511DC';
export const defaultColor = '#8F8F9A';
export const mainBgColor = '#FAFAFA';
export const separatorColor = '#F0F1F2';
export const focusBgColor = '#F5F4FF';
export const focusBorderColor = '#C8C7E2';
export const bgColor = '#FFFFFF';
export const btnBgColor = '#ECECEC';
export const successColor = '#52C4A9';
export const errorColor = '#F7523E';
export const selectedItemColor = '#FFF4F2';
export const cardColors = ['#FFF4F2', '#F5F4FF', '#F0F1F2'];

export const hoveredSuccessColor = (
  `#${(parseInt(successColor.slice(1), 16) + 1183504).toString(16)}`
);

export const hoveredInfoColor = (
  `#${(parseInt(infoColor.slice(1), 16) + 2763523).toString(16)}`
);

export const themeStyles = StyleSheet.create({
  defaultFont: {
    fontFamily: 'GilroyRegular',
    fontSize: '14px',
    lineHeight: '16px',
  },
  smallFont: {
    fontFamily: 'GilroyRegular',
    fontSize: '12px',
    lineHeight: '14px',
  },
  headerFont: {
    fontFamily: 'GilroyRegular',
    fontSize: '22px',
    lineHeight: '27px',
    fontWeight: 'bold',
  },
  error: {
    fontFamily: 'GilroyRegular',
    fontSize: '14px',
    lineHeight: '16px',
    color: errorColor,
  },
  fontWeight500: { fontWeight: 500 },
  detailsFont: {
    fontFamily: 'LoraRegular',
    fontSize: '18px',
    lineHeight: '165%',
  },
  smallDetailsFont: {
    fontFamily: 'LoraRegular',
    fontSize: '16px',
    lineHeight: '145%',
  },
  defaultColor: {
    border: `1px solid ${focusBgColor}`,
    backgroundColor: focusBgColor,
    color: defaultColor,
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      color: infoColor,
      border: `1px solid ${focusBgColor}`,
      '> svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
    ':active': {
      backgroundColor: infoColor,
      color: bgColor,
      border: `1px solid ${infoColor}`,
      '> svg': {
        fill: bgColor,
        stroke: infoColor,
      },
    },
  },
  successColor: {
    border: `1px solid ${successColor}`,
    backgroundColor: successColor,
    color: bgColor,
    '> svg': {
      fill: bgColor,
      stroke: bgColor,
    },
    ':hover': {
      backgroundColor: hoveredSuccessColor,
      border: `1px solid ${hoveredSuccessColor}`,
    },
    ':active': {
      backgroundColor: successColor,
      color: bgColor,
      border: `1px solid ${successColor}`,
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
      },
    },
  },
  infoColor: {
    border: `1px solid ${infoColor}`,
    backgroundColor: infoColor,
    color: bgColor,
    '> svg': {
      fill: bgColor,
      stroke: bgColor,
    },
    ':hover': {
      backgroundColor: hoveredInfoColor,
      border: `1px solid ${hoveredInfoColor}`,
    },
    ':active': {
      backgroundColor: infoColor,
      color: bgColor,
      border: `1px solid ${infoColor}`,
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
      },
    },
  },
  outlinedColor: {
    border: `1px solid ${infoColor}`,
    backgroundColor: 'transparent',
    color: infoColor,
    '> svg': {
      fill: infoColor,
      stroke: infoColor,
    },
    ':hover': {
      border: `1px solid ${infoColor}`,
      backgroundColor: infoColor,
      color: bgColor,
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
      },
    },
    ':active': {
      border: `1px solid ${infoColor}`,
      backgroundColor: 'transparent',
      color: infoColor,
      '> svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
  },
  transparentColor: {
    backgroundColor: 'transparent',
    color: defaultColor,
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      color: infoColor,
      '> svg': {
        fill: infoColor,
        stroke: infoColor,
      },
    },
    ':active': {
      color: defaultColor,
      '> svg': {
        fill: defaultColor,
        stroke: defaultColor,
      },
    },
  },
  transparentWithBorderColor: {
    border: `1px solid ${defaultColor}`,
    backgroundColor: 'transparent',
    color: defaultColor,
    '> svg': {
      fill: defaultColor,
      stroke: defaultColor,
    },
    ':hover': {
      border: `1px solid ${focusBorderColor}`,
      backgroundColor: 'transparent',
      color: focusBorderColor,
      '> svg': {
        fill: focusBorderColor,
        stroke: focusBorderColor,
      },
    },
    ':active': {
      border: `1px solid ${focusBorderColor}`,
      backgroundColor: focusBorderColor,
      color: bgColor,
      '> svg': {
        fill: bgColor,
        stroke: bgColor,
      },
    },
  },
  defaultColorDisabled: {
    border: `1px solid ${disabledBtnColor}`,
    backgroundColor: disabledBtnColor,
    color: disabledColor,
    '> svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
    ':hover': {
      color: disabledColor,
      backgroundColor: disabledBtnColor,
      border: `1px solid ${disabledBtnColor}`,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':active': {
      backgroundColor: disabledBtnColor,
      color: disabledColor,
      border: `1px solid ${disabledBtnColor}`,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':focus': { outline: 'none' },
  },
  transparentColorDisabled: {
    backgroundColor: 'transparent',
    color: disabledColor,
    '> svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
    ':hover': {
      color: disabledColor,
      backgroundColor: 'transparent',
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':active': {
      backgroundColor: 'transparent',
      color: disabledColor,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':focus': { outline: 'none' },
  },
  transparentWithBorderColorDisabled: {
    border: `1px solid ${disabledColor}`,
    backgroundColor: 'transparent',
    color: disabledColor,
    '> svg': {
      fill: disabledColor,
      stroke: disabledColor,
    },
    ':hover': {
      color: disabledColor,
      backgroundColor: 'transparent',
      border: `1px solid ${disabledColor}`,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':active': {
      backgroundColor: 'transparent',
      color: disabledColor,
      border: `1px solid ${disabledColor}`,
      '> svg': {
        fill: disabledColor,
        stroke: disabledColor,
      },
    },
    ':focus': { outline: 'none' },
  },
  focusable: { ':focus': { outline: `1px solid ${infoColor}` } },
  focusableParent: { ':focus-within': { outline: `1px solid ${infoColor}` } },
  bordered: { borderRadius: '3px' },
  shadowed: { boxShadow: '0px 10px 20px rgba(32, 32, 40, 0.05)' },
  hoverShadowed: { ':hover': { boxShadow: '0px 10px 20px rgba(32, 32, 40, 0.05)' } },
});
