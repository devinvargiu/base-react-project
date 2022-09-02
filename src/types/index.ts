import { NavigateFunction, Params } from 'react-router-dom';
import AppError from '../utils/error';

export declare type OptionType = {
  value: any;
  label: any;
};

export interface ErrorObject {
  message: string;
  name: string;
  code?: number;
  stack?: string;
}

export interface AppState {
  offline: boolean;
  showChangelog: boolean;
}

export interface UserPreferences {
  lang: string;
  items: string;
  dateFormat: string;
  time: boolean;
}

export interface UserLimits {}

export interface IdentityState {
  username: string | null;
  token: string | null;
  expiration: number | null;
  renewExpiration: number | null;
  preferences: UserPreferences | null;
  limits?: UserLimits;
  error: ErrorObject | AppError | null;
}

export interface Credentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export interface PaginationInfo {
  total: number;
  pageSize: number;
  page: number;
  from: number;
  to: number;
  canPrev: boolean;
  canNext: boolean;
}

export interface RouterProps {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}
