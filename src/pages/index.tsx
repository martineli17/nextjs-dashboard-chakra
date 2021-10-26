import { Flex, Stack, FormLabel, Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from '../components/form/input';
import { useAuthContext } from "../contexts/authContext";
import { useCanView } from "../hooks/useCanView";
import { useToast } from "../hooks/useToast";
import { IndexServerSideProps } from "../serverRender";
import { SiginValidatorResolver } from "../validators/siginValidator";


interface SignInForm {
  password: string;
  email: string;
}

export default function Home() {
  const { Toast } = useToast();
  const { Sigin, isAuthenticate, user } = useAuthContext();
  const { register, handleSubmit, formState } = useForm({ resolver: SiginValidatorResolver });
  const router = useRouter();

  const handleSignIn: SubmitHandler<SignInForm> = async (values, event) => {
    const message = await Sigin(values);
    
    if (message === "") 
      router.push("/dashboard");
    else
      Toast.error(message, { theme: "dark" });
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center">
      <Flex
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={8}>
          <Input type="email" name="email" label="E-mail" {...register("email")} error={formState.errors.email} />
          <Input type="password" name="password" label="Senha" {...register("password")} error={formState.errors.password} />
        </Stack>
        <Button
          isLoading={formState.isSubmitting}
          onClick={handleSubmit(handleSignIn)}
          type="button"
          mt="6"
          colorScheme="pink"
          size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}

export const getServerSideProps = IndexServerSideProps;
