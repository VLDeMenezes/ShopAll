//importamos interfaces
import {
  IUserLogin,
  IUserRegister,
  LoginErrors,
  RegisterErrors,
} from "@/interfaces/User.interface";

//funcion para validad imputs del registro y setear errores
export function validateRegister(
  values: IUserRegister,
  setCanSubmit: (canSubmit: boolean) => void
): RegisterErrors {
  let errors: RegisterErrors = {};
  if (!values.name) errors.name = "Debes ingresar tu nombre";
  if (!values.email) {
    errors.email = "Debes ingresar tu email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Email invalido";
  if (!values.address) errors.address = "Debes ingresar tu dirección";
  if (!values.phone) {
    errors.phone = "Debes ingresar tu Número de ceular";
  } else if (!/^\d{10}$/.test(values.phone))
    errors.phone = "Celular invalido, recuerda que son 10 digitos ";
  if (!values.password) {
    errors.password = "Debes crear una contraseña";
  } else if (values.password.length < 5)
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  if (values.password !== values.password_confirmation)
    errors.password_confirmation = "Las contraseñas no coinciden";
  if (Object.values(errors).length === 0) {
    setCanSubmit(true);
  } else setCanSubmit(false);
  return errors;
}
//funcion para validad imputs del login y setear errores
export function validateLogin(values: IUserLogin): LoginErrors {
  let errors: RegisterErrors = {};
  if (!values.email) errors.email = "Debes ingresar tu email";
  if (!values.password) {
    errors.password = "Debes ingresar tu contraseña";
  } else if (values.password.length < 6)
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  return errors;
}
