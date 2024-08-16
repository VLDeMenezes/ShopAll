import { UserSessionProps } from "./User.interface";
export interface AuthContextProps {
  dataUser: UserSessionProps | null;
  setDataUser: (dataUser: UserSessionProps | null) => void;
  counter: number;
  setCounter: (counter: number) => void;
  variableCounter: (type: string) => void;
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  openRegister: () => void;
  closeRegister: () => void;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}
export interface AuthProviderProps {
  children: React.ReactElement;
}
