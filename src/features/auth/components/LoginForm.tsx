import { useForm } from "react-hook-form";
import { LoginSchema, type LoginType } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginApi from "../services/login.service";
import { useNavigate } from "react-router";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import shieldCheck from "../../../../public/shield-check-svgrepo-com.svg";
import { Key, Mail } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const Onsubmit = async (data: LoginType) => {
    const Apiresponse = await LoginApi(data);
    console.log(Apiresponse);

    if(Apiresponse) {
      navigate("/DasboardUser");
    }else{
      
    return (
      <div className="toast toast-top toast-center">
        <div className="alert alert-warning">
          <span>Identifiants Invalident</span>
        </div>
      </div>
    );
  };

    }



  return (
    <div className="w-screen h-screen flex items-center  justify-center">
      <div className="flex  max-sm:flex-col w-250 h-100  items-center justify-center ">
        <div className="w-100 max-sm:mt-24  bg-[#1e293b] p-5 rounded-l-2xl  bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]  shadow-sm h-100 flex items-center justify-center flex-col ">
          <h1>.</h1>
          <div className="flex flex-col justify-between h-full pt-24">
            <div className="flex flex-col gap-2">
              <h3 className="font-black text-[11px]  text-[#4ade80]">
                PORTAIL CITOYEN
              </h3>
              <h1 className="font-black text-[26px] text-[#ffffff] leading-6.5">
                Bienvenue sur votre espace Allô Mairie
              </h1>
              <p className="text-[12px] font-medium text-[#94a3b8]">
                Retrouvez vos démarches, vos signalements et les actualités de
                votre ville en toute simplicité.
              </p>
            </div>
            <div className="flex gap-2">
              <img src={shieldCheck} className="w-6 h-6 " alt="" />
              <h3>Plateforme municipale sécurisée</h3>
            </div>
          </div>
        </div>
        <form
          className="w-150 max-sm:w-100 h-100 gap-12  shadow-sm flex items-center justify-center flex-col p-10 rounded-r-2xl bg-[#ffffff]"
          onSubmit={handleSubmit(Onsubmit)}
        >
          <div className="w-120  max-sm:w-100 flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold text-[#0f172a]">
              Connexion
            </h1>
            <h3 className="text-[16px] text-[#64748b] font-normal">
              Accedez a votre espace pour gerer vos signalements
            </h3>
          </div>
          <div className="w-120  max-sm:w-100 flex flex-col gap-4 ">
            <div className="w-120 max-sm:w-100 relative">
              <Mail className="absolute top-11 left-2"/>
              <Input
                type="text"
                placeHolder="Entrer votre email"
                label="Email"
                {...register("email")}
                error={formState.errors.email?.message}
              />
            </div>
            <div className="w-120 max-sm:w-100 relative ">
              <Key className="absolute top-11 left-2"/>
              <Input
                type="password"
                placeHolder="Entrer votre mot de passe"
                label="Password"
                {...register("password")}
                error={formState.errors.password?.message}
              />
            </div>
            <Button type="submit" label="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
