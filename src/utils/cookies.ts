import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

const cookieAuthName = process.env.REACT_APP_AUTH_COOKIE_NAME as string;
const cookiePrefName = process.env.REACT_APP_PREF_COOKIE_NAME as string;

const CookieManager = {
  setAuthCookie(form: any): void {
    const settings: CookieSetOptions = {
      path: '/',
    };

    cookies.set(cookieAuthName, form, settings);
  },

  deleteAuthCookie(): void {
    cookies.remove(cookieAuthName, { path: '/' });
  },

  getAuthCookie(): any | null {
    return cookies.get(cookieAuthName);
  },

  setPrefCookie(form: any): void {
    const settings: CookieSetOptions = {
      path: '/',
    };

    cookies.set(cookiePrefName, form, settings);
  },

  deletePrefCookie(): void {
    cookies.remove(cookiePrefName, { path: '/' });
  },

  getPrefCookie(): any | null {
    return cookies.get(cookiePrefName);
  },
};

export default CookieManager;
