import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterType } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { MoveRight, LockKeyhole, MailPen, Phone, User, User2 } from "lucide-react";
import RegisterApi from "../services/register.service";
import { useNavigate } from "react-router";

const LoginFormData = () => {
  const navigate = useNavigate()
  const [Isloding, setLoding] = useState<boolean>(false);
  const { register, formState, handleSubmit } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const OnSubmit = async (data: RegisterType) => {
    try {
      console.log(data);
      setLoding(true);
       const apiResponse = await RegisterApi(data)
       console.log(apiResponse)
       navigate("/Login")
    } catch (error) {
      console.log("echec register", error);
    }
  };

  return (
    <div className="self-center w-screen h-screen  flex items-center justify-center">
      <div className="flex flex-col gap-8  items-center self-center justify-center shadow-2xl w-350 h-full">
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col gap-6 px-4 mt-16 items-start self-center justify-center shadow-2xl w-1/2 h-full bg-[F0F0F0]"
        >
                  <h1 className="text-4xl pb-3 font-black leading-1.5">Céer votre compte citoyen </h1>

          <div className="flex  gap-2 items-start justify-center w-full">
            <div className="w-full relative">
              <Input
                placeHolder="Entrer votre nom"
                type="text"
                label="Nom"
                {...register("first_name")}
                error={formState.errors.first_name?.message}
              />
               <User className="absolute left-4 top-13"/>
            </div>

            <div className="w-full relative">
              <Input
                placeHolder="Entrer votre Prenom"
                type="text"
                label="Prenom"
                {...register("last_name")}
                error={formState.errors.last_name?.message}
              />
              <User2 className="absolute left-4 top-13"/>
            </div>
          </div>
          <div className="w-full relative">
            <Input
              placeHolder="Entrer votre email"
              type="text"
              label=" Adresse e-mail"
              {...register("email")}
              error={formState.errors.email?.message}
            />

            <MailPen className="absolute left-4 top-13"/>
          </div>
          <div className="w-full relative">
            <Input
              placeHolder="Entrer votre nume de telephone"
              type="text"
              label="Telephone"
              {...register("tel")}
              error={formState.errors.tel?.message}
            />
            <Phone className="absolute left-4 top-13"/>
          </div>
          <div className="w-full relative">
            <Input
              placeHolder="Entrer votre mot de passe"
              type="password"
              label="Mot de passe"
              {...register("password")}
              error={formState.errors.password?.message}
            />
            <LockKeyhole className="absolute left-4 top-13"/>
          </div>
          <div className="w-full relative">
            <Button
              type="submit"
              isLoading={Isloding}
              label="Céer mon compte citoyen"
            />
            <MoveRight className="absolute right-38 top-6"/>
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default LoginFormData;
