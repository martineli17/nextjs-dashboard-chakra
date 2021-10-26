import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const SiginValidator = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória")
});

export const SiginValidatorResolver = yupResolver(SiginValidator);