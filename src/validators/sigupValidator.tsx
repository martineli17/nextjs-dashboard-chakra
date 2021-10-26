import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

export const SigupValidator = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("E-mail é inválido").required("E-mail é obrigatório"),
});

export const SigupValidatorResolver = yupResolver(SigupValidator);