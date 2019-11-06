interface ITheme {
  colors: object
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
};

const colors = {
  skyBlue: '#069ccd',
  whiteGray: '#f7f6f3',
  dusk: 'rgb(65,77,107)',
  green: 'rgb(29,211,168)',
  greenBlue: 'rgb(36,205,151)',
  mediumGray: 'rgb(134,154,183)',
  paleGray: 'rgb(221,226,236)',
  lightBackground: 'white',
  lightBackgroundLight: '#f7f6f3',
  darkBackground: '#323739',
  darkBackgroundLight: '#393241',
  ocGray0: '#f8f9fa',
  ocGray1: '#f1f3f5',
  ocGray2: '#e9ecef',
  ocGray3: '#dee2e6',
  ocGray4: '#ced4da',
  ocGray5: '#adb5bd',
  ocGray6: '#868e96',
  ocGray7: '#495057',
  ocGray8: '#343a40',
  ocGray9: '#212529',
  ocBlue0: '#e7f5ff',
  ocBlue1: '#d0ebff',
  ocBlue2: '#a5d8ff',
  ocBlue3: '#74c0fc',
  ocBlue4: '#4dabf7',
  ocBlue5: '#339af0',
  ocBlue6: '#228be6',
  ocBlue7: '#1c7ed6',
  ocBlue8: '#1971c2',
  ocBlue9: '#1864ab',
  errorRedLight: 'rgb(235, 62, 25)',
  errorRedDark: 'rgb(198, 50, 18)',
};

const theme = {
  light: {
    background: `linear-gradient(to bottom right, ${colors.lightBackground}, ${colors.lightBackgroundLight})`,
    btnPrimary: colors.skyBlue,
    btnPrimaryFont: 'white',
    btnPrimaryLight: colors.whiteGray,
    btnPrimaryLightFont: 'black',
    fontColor: colors.ocGray8,
    sideBar: {
      background: colors.ocBlue9,
    },
    header: {
      background: 'white',
      titleColor: colors.ocGray7,
      tabFontColor: colors.ocGray6,
      activeTabFontColor: colors.ocBlue8,
      border: colors.ocGray3,
    },
    highlighted: colors.greenBlue,
    error: colors.errorRedDark,
  },
  dark: {
    background: `linear-gradient(to bottom right, ${colors.darkBackground}, ${colors.darkBackgroundLight})`,
    btnPrimary: colors.skyBlue,
    btnPrimaryFont: 'white',
    btnPrimaryLight: colors.whiteGray,
    btnPrimaryLightFont: 'black',
    fontColor: colors.ocGray0,
    highlighted: colors.greenBlue,
    error: colors.errorRedLight,
  },
};

export const createTheme = (type = ThemeType.LIGHT) => {
  switch (type) {
    case ThemeType.LIGHT:
      return theme.light;
    case ThemeType.DARK:
      return theme.dark;
  }
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
