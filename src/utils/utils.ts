import { Locale } from 'date-fns';
import { enGB, it } from 'date-fns/locale';
import i18n from '../i18n';
import { OptionType, PaginationInfo, UserPreferences } from '../types';

const Utils = {
  capitalize(value: string | undefined): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  },

  locale(preferences: UserPreferences | null, country?: string): Locale {
    let language = country === 'IT' || country === 'ITALY' ? 'it' : 'en';
    if (preferences) language = preferences.lang;
    return language === 'it' ? it : enGB;
  },

  setLanguage(preferences: UserPreferences | null, country?: string): void {
    let language = country === 'IT' || country === 'ITALY' ? 'it' : 'en';
    if (preferences) language = preferences.lang;
    i18n.changeLanguage(language);
  },

  getDateFormat(preferences: UserPreferences | null, country?: string): string {
    let format = country === 'IT' || country === 'ITALY' ? 'E dd/MM/yyyy' : 'E MM/dd/yyyy';
    if (preferences) format = preferences.dateFormat;
    return format;
  },

  isTime24(preferences: UserPreferences | null, country?: string): boolean {
    let is24 = country === 'IT' || country === 'ITALY' ? true : false;
    if (preferences) is24 = preferences.time;
    return is24;
  },

  getTimeFormat(preferences: UserPreferences | null, country?: string): string {
    let format = country === 'IT' || country === 'ITALY' ? ' HH:mm' : ' hh:mm aa';
    if (preferences) format = preferences.time ? ' HH:mm' : ' hh:mm aa';
    return format;
  },

  generateUniqueId(): string {
    return Math.random().toString(36).substring(7);
  },

  validator(params: Array<string | boolean | undefined>): boolean | undefined {
    let result: boolean | undefined = undefined;

    for (const param of params) {
      if (typeof param === 'undefined') {
        result = param;
        break;
      }

      if (typeof param === 'string') {
        result = false;
        continue;
      }

      result = result && param;
    }

    return result;
  },

  getPaginationInfo(elements: any[], page: number, pageSize: number): PaginationInfo {
    const total = elements.length;
    const from = 1 + (page - 1) * pageSize;
    const to = page * pageSize < total ? page * pageSize : total;
    const canPrev = page > 1;
    const canNext = pageSize * page < total;
    return { total, pageSize, page, from, to, canPrev, canNext } as PaginationInfo;
  },

  getPaginatedData<T>(data: T[], page: number, pageSize: number): T[] {
    return data.slice((page - 1) * pageSize, page * pageSize);
  },

  getPaginationPageSizes(): OptionType[] {
    return [
      { value: '20', label: '20' },
      { value: '50', label: '50' },
      { value: '100', label: '100' },
    ] as OptionType[];
  },

  sortPreferred: (arr: string[], presetOrder: string[]): string[] => {
    const result: any[] = [];
    let i, j;
    for (i = 0; i < presetOrder.length; i++) {
      while (-1 !== (j = arr.indexOf(presetOrder[i]))) {
        result.push(arr.splice(j, 1)[0]);
      }
    }
    return result.concat(arr);
  },
};

export default Utils;
