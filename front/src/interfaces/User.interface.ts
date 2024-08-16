export interface IUserRegister {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  password_confirmation?: string;
}
export type RegisterErrors = {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  password_confirmation?: string;
};

export interface IUserLogin {
  email: string;
  password: string;
}
export type LoginErrors = Partial<IUserLogin>;

export interface FromsProps {
  onCloseReg?: () => void;
  onCloseLog: () => void;
}

export interface UserSessionProps {
  login: boolean;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    orders: [];
    role: string;
  };
}
