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
  fontWeight500: { fontWeight: 500 },
  defaultColor: {
    border: `1px solid ${focusBgColor}`,
    backgroundColor: focusBgColor,
    color: defaultColor,
    ':hover': {
      color: infoColor,
      border: `1px solid ${focusBgColor}`,
    },
    ':active': {
      backgroundColor: infoColor,
      color: bgColor,
      border: `1px solid ${infoColor}`,
    },
  },
  successColor: {
    border: `1px solid ${successColor}`,
    backgroundColor: successColor,
    color: bgColor,
    ':hover': {
      backgroundColor: hoveredSuccessColor,
      border: `1px solid ${hoveredSuccessColor}`,
    },
    ':active': {
      backgroundColor: successColor,
      color: bgColor,
      border: `1px solid ${successColor}`,
    },
  },
  infoColor: {
    border: `1px solid ${infoColor}`,
    backgroundColor: infoColor,
    color: bgColor,
    ':hover': {
      backgroundColor: hoveredInfoColor,
      border: `1px solid ${hoveredInfoColor}`,
    },
    ':active': {
      backgroundColor: infoColor,
      color: bgColor,
      border: `1px solid ${infoColor}`,
    },
  },
  outlinedColor: {
    border: `1px solid ${infoColor}`,
    backgroundColor: 'transparent',
    color: infoColor,
    ':hover': {
      border: `1px solid ${infoColor}`,
      backgroundColor: infoColor,
      color: bgColor,
    },
    ':active': {
      border: `1px solid ${infoColor}`,
      backgroundColor: 'transparent',
      color: infoColor,
    },
  },
  transparentColor: {
    backgroundColor: 'transparent',
    color: defaultColor,
    ':hover': { color: infoColor },
    ':active': { color: defaultColor },
  },
  transparentWithBorderColor: {
    border: `1px solid ${defaultColor}`,
    backgroundColor: 'transparent',
    color: defaultColor,
    ':hover': {
      border: `1px solid ${focusBorderColor}`,
      backgroundColor: 'transparent',
      color: focusBorderColor,
    },
    ':active': {
      border: `1px solid ${focusBorderColor}`,
      backgroundColor: focusBorderColor,
      color: bgColor,
    },
  },
  defaultColorDisabled: {
    border: `1px solid ${disabledBtnColor}`,
    backgroundColor: disabledBtnColor,
    color: disabledColor,
    ':hover': {
      color: disabledColor,
      backgroundColor: disabledBtnColor,
      border: `1px solid ${disabledBtnColor}`,
    },
    ':active': {
      backgroundColor: disabledBtnColor,
      color: disabledColor,
      border: `1px solid ${disabledBtnColor}`,
    },
  },
  transparentColorDisabled: {
    backgroundColor: 'transparent',
    color: disabledColor,
    ':hover': {
      color: disabledColor,
      backgroundColor: 'transparent',
    },
    ':active': {
      backgroundColor: 'transparent',
      color: disabledColor,
    },
  },
  transparentWithBorderColorDisabled: {
    border: `1px solid ${disabledColor}`,
    backgroundColor: 'transparent',
    color: disabledColor,
    ':hover': {
      color: disabledColor,
      backgroundColor: 'transparent',
      border: `1px solid ${disabledColor}`,
    },
    ':active': {
      backgroundColor: 'transparent',
      color: disabledColor,
      border: `1px solid ${disabledColor}`,
    },
  },
  bordered: { borderRadius: '3px' },
});
