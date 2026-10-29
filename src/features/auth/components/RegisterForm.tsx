import { useForm } from "react-hook-form";
import { RegisterSchema, type RegisterType } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

import RegisterApi from "../services/register.service";
import { useNavigate } from "react-router";
import shieldCheck from "../../../../public/shield-check-svgrepo-com.svg";
import ListCommune from "../../communes/services/service.commune";
import type { CommuneType } from "../../communes/types";

const LoginFormData = () => {
  const navigate = useNavigate();
  const [Isloding, setLoding] = useState<boolean>(false);
  const [commune, setCommune] = useState<CommuneType[]>([]);
  const { register, formState, handleSubmit } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const Commune = async () => {
    const commune = await ListCommune();
    if (commune) {
      setCommune(commune);
    }
  };

  useEffect(() => {
    Commune();
  }, []);

  if(!commune){
    return
  }



  const OnSubmit = async (data: RegisterType) => {
    try {
      console.log(data);
      setLoding(true);
      const apiResponse = await RegisterApi(data);
      if(apiResponse){
      navigate("/Login");
    }
    } catch (error) {
      console.log("echec register", error);
    }
  };

  return (
    <div className="self-center w-screen h-screen  flex items-center justify-center">
      <div className="flex max-sm:flex-col  items-center self-center justify-center  w-350 h-150">
        <div className="w-130  mt-12  h-full max-sm:mt-24 max-sm:hidden sm:rounded-t-2xl  bg-[#1e293b] p-5 lg:rounded-l-2xl  bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem]  shadow-sm  flex items-center justify-center flex-col ">
          <h1>.</h1>
          <div className="flex flex-col justify-between h-full pt-24">
            <div className="flex flex-col gap-2">
              <h3 className="font-black text-[11px]  text-[#4ade80]">
                PORTAIL CITOYEN
              </h3>
              <h1 className="font-black text-[26px] text-[#ffffff] leading-6.5">
                Bienvenue sur Allô Mairie l' action citoyenne au coeur de notre
                commune.
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
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col gap-2 px-4 rounded-r-2xl mt-12  items-start self-center justify-center shadow-sm w-120 h-full bg-[F0F0F0]"
        >
          <div className="flex justify-between w-full my-2.5">
            <div className="flex gap-1 items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] "></div>
              <h1 className=" text-[#4ade80] text-[10px] text-center">
                INSCRIPTION UNIQUE
              </h1>
            </div>
            <div className="flex gap-1 items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#4ade80] "></div>
              <h1 className=" text-[#1e293b] text-[10px] text-center">
                SERVEUR SECURISE
              </h1>
            </div>
          </div>
          <h1 className="text-2xl pb-3 font-black leading-1.5 mt-1.5">
            Céer votre compte citoyen{" "}
          </h1>
          <div className="flex  gap-2 items-start justify-center w-full">
            <div className="w-full relative">
              <Input
                placeHolder="Entrer votre nom"
                type="text"
                label="Nom"
                {...register("first_name")}
                error={formState.errors.first_name?.message}
              />
            </div>

            <div className="w-full relative">
              <Input
                placeHolder="Entrer votre Prenom"
                type="text"
                label="Prenom"
                {...register("last_name")}
                error={formState.errors.last_name?.message}
              />
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
          </div>
          <div className="w-full relative">
            <Input
              placeHolder="Entrer votre nume de telephone"
              type="text"
              label="Telephone"
              {...register("tel")}
              error={formState.errors.tel?.message}
            />
          </div>
          <div className="w-full relative">
            <Input
              placeHolder="Entrer votre mot de passe"
              type="password"
              label="Mot de passe"
              {...register("password")}
              error={formState.errors.password?.message}
            />
          </div>
          <div className="w-full">
            <select {...register("communeId")} className="w-full h-12 rounded-xl outline-0 text-[10px] focus:(border-emerald-600) bg-[#f8fafc] px-12" >
              <option value="" className="bg-amber-50 rounded-sm text-sm text-[#4ade80]">choisissez votre commune</option>
              {commune.map((com: CommuneType) =>(
                <option value={com.id} key={com.id} className="bg-[#1e293b] hover:bg-[F0F0F0] rounded-xl text-sm text-[#4ade80]" >  {com.nom} </option>
              ))}
            </select>
          </div>
          <div className="w-full relative">
            <Button
              type="submit"
              isLoading={Isloding}
              label="Céer mon compte citoyen"
              className="text-sm"
            />
          </div>{" "}
        </form>
      </div>
    </div>
  );
};

export default LoginFormData;
