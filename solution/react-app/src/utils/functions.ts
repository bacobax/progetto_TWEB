//a function that return true if platform is macOs, false otherwise
export const isMacOs = () => {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}