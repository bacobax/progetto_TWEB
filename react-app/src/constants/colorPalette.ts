interface ColorPalette {
  PRIMARY: Color;
  SECONDARY: Color;
  TERTIARY: Color;
}

export interface Color {
  DARK: {
    CLASS_NAME: string;
  };
  LIGHT: {
    CLASS_NAME: string;
  };
}

const txtpalette: ColorPalette = {
  PRIMARY: {
    DARK: {
      CLASS_NAME: "text-primary-dark",
    },
    LIGHT: {
      CLASS_NAME: "text-primary-light",
    },
  },
  SECONDARY: {
    DARK: {
      CLASS_NAME: "text-secondary-dark",
    },
    LIGHT: {
      CLASS_NAME: "text-secondary-light",
    },
  },
  TERTIARY: {
    DARK: {
      CLASS_NAME: "text-tertiary-dark",
    },
    LIGHT: {
      CLASS_NAME: "text-tertiary-light",
    },
  },
};

const accentpalette: ColorPalette = {
  PRIMARY: {
    DARK: {
      CLASS_NAME: "accent-primary-dark",
    },
    LIGHT: {
      CLASS_NAME: "accent-primary-light",
    },
  },
  SECONDARY: {
    DARK: {
      CLASS_NAME: "accent-secondary-dark",
    },
    LIGHT: {
      CLASS_NAME: "accent-secondary-light",
    },
  },
  TERTIARY: {
    DARK: {
      CLASS_NAME: "accent-tertiary-dark",
    },
    LIGHT: {
      CLASS_NAME: "accent-tertiary-light",
    },
  },
};

const backgroundpalette: ColorPalette = {
  PRIMARY: {
    DARK: {
      CLASS_NAME: "background-primary-dark",
    },
    LIGHT: {
      CLASS_NAME: "background-primary-light",
    },
  },
  SECONDARY: {
    DARK: {
      CLASS_NAME: "background-primary-dark",
    },
    LIGHT: {
      CLASS_NAME: "background-primary-light",
    },
  },
  TERTIARY: {
    DARK: {
      CLASS_NAME: "background-primary-dark",
    },
    LIGHT: {
      CLASS_NAME: "background-primary-light",
    },
  },
};
interface Palette {
  TXT: ColorPalette;
  ACCENT: ColorPalette;
  BG: ColorPalette;
}

const PALETTE: Palette = {
  TXT: txtpalette,
  ACCENT: accentpalette,
  BG: backgroundpalette,
};

export default PALETTE;
