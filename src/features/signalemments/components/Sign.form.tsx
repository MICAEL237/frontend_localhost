import { useForm } from "react-hook-form";
import {
  type TypeISigna,
  type TypeOSigna,
  type TypeSigna,
  SchemaSigna,
} from "../schemas/create.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Position from "../services/take.position";
import ApiCreateSign from "../services/create.signalement.api";
import { useEffect, useState } from "react";
import type { CommuneType } from "../../communes/types";
import type { CategrieType } from "../../categorie/types/read.type";
import ListCommune from "../../communes/services/service.commune";
import ListCategorie from "../../categorie/services/service.cat";
import Input from "../../../components/Input";
import { addMarker, Map } from "../../../providers/leafstreat.map";
// import Button from "../../components/Button";
// import { data } from "react-router";

const FormSign = () => {
  type Position = {
    latitude: number;
    longitude: number;
  };
  const [commune, setCommune] = useState<CommuneType[]>([]);
  const [cat, setCat] = useState<CategrieType[]>([]);
  const [position, setposition] = useState<Position >();

  const { register, formState, handleSubmit, setValue } = useForm<
    TypeISigna,
    TypeSigna,
    TypeOSigna
  >({
    resolver: zodResolver(SchemaSigna),
  });


  useEffect(() => {
    const Coords = async () => {
      const coords = await Position();
      setValue("latitude", String(coords.latitude), { shouldValidate: true });
      setValue("longitude", String(coords.longitude), { shouldValidate: true });
      setposition({ latitude: coords.latitude, longitude: coords.longitude });

      // setposition(coords);
    };

    Coords();
  }, [setValue]);


    useEffect(() => {
     
      const Card = () => {
         if(!position){
          return
         }
        const map = Map(position?.latitude, position?.longitude)
        addMarker(map, position.latitude, position.longitude)
       
      };
      Card()
    }, [position])

  useEffect(() => {
    const Commune = async () => {
      const com = await ListCommune();
      if (com) {
        setCommune(com);
      }
    };

    Commune();
  }, []);

  useEffect(() => {
    const Categorie = async () => {
      const categorie = await ListCategorie();
      if (categorie) {
        setCat(categorie);
      }
    };

    Categorie();
  }, []);

  if (!cat) {
    return <h1></h1>;
  }

  const Onsubmit = async (data: TypeSigna) => {
    try {
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("categorie", data.categorie);
      formData.append("commune", data.commune);
      formData.append("image", data.image);
      if (data.latitude) {
        formData.append("latitude", String(data.latitude));
      }

      if (data.longitude) {
        formData.append("longitude", String(data.longitude));
      }

      const Api = await ApiCreateSign(formData);
      console.log(formData);
      return Api;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-center py-24">
      <div className="flex flex-col items-center justify-start my-0">
       <div className="flex flex-col items-center text-center gap-3 mb-8 animate-header">

        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#15803d]/10 border border-[#15803d]/20 backdrop-blur-md shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#16a34a] animate-ping opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#15803d]"></span>
          </span>
          <span className="text-xs font-bold tracking-wide text-[#166534]">
            ESPACE SIGNALEMENT
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0f172a] tracking-tight">
          Nouveau <span className="text-[#15803d]">signalement.</span>
        </h1>

        <p className="text-sm md:text-base text-[#475569] max-w-md">
          Contribuez à améliorer votre environnement en signalant
          les anomalies constatées dans votre commune.
        </p>

        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#86efac] via-[#15803d] to-[#86efac] animate-gradient"></div>

      </div>

        <form
        className="form-card relative overflow-hidden flex flex-col gap-6 rounded-3xl border border-[#15803d]/20 bg-white/[0.93] backdrop-blur-2xl p-5 md:p-9 shadow-2xl"
          onSubmit={handleSubmit(Onsubmit)}
          encType="multipart/form-data"
        >
          <div className="flex items-center p-4  w-156 max-md:w-full gap-18 max-md:gap-6 justify-between">
            <div className="flex  flex-col w-full">
              <label htmlFor="" className="label  ">
                Categorie
              </label>

              <select
                id=""
                {...register("categorie")}
                className={`w-64  max-md:w-32 select select-accent `}
              >
                {cat.map((cat: CategrieType) => (
                  <option value={cat.id} key={cat.id}>
                    {cat.nom}{" "}
                  </option>
                ))}{" "}
              </select>
              {formState.errors.categorie?.message}
            </div>

            <div className="flex flex-col  w-full">
              <label htmlFor="" className="label">
                Commune
              </label>
              <select
                id=""
                {...register("commune")}
                className={`w-64 max-md:w-32 select select-accent`}
              >
                {commune.map((com: CommuneType) => (
                  <option value={com.id} key={com.id}>
                    {com.nom}{" "}
                  </option>
                ))}
              </select>
              {formState.errors.commune?.message}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-156 max-md:w-full">
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              className="input input-accent w-full px-4 h-48"
              placeholder="Entrer une description du signalement"
              {...register("description")}
            />
            <span className="text-[10px] text-red-500 px-4">
              {" "}
              {formState.errors.description?.message}
            </span>
          </div>
          <div className="w-156  max-md:w-full">
            <Input
              placeHolder="Entrer une image"
              type="file"
              label="image"
              {...register("image")}
              error={formState.errors.image?.message}
            />
          </div>
          <div className="w-156  max-md:w-full">
            <Input
              placeHolder="Entrer le lieu du signalement"
              type="text"
              label="Lieu"
              {...register("lieu")}
              error={formState.errors.lieu?.message}
            />
          </div>

          <div id="map" className="w-150 h-48 rounded-xl max-md:w-full px-4 ">
           
          </div>

           <div className="flex justify-between max-md:w-full w-156 px-4 mt-4 ">
              <h3 className="text-success"><span className="text-[#0f172a] font-semibold">Latitude: </span> {position?.latitude} </h3>
              <h3 className="text-success"><span className="text-[#0f172a] font-semibold">Longitude: </span> {position?.longitude} </h3>
            </div>
          <div className="w-156 p-4  max-md:w-full">
            <button
              type="submit"
              className="btn btn-ghost btn-success w-full h-12"
            >
              signaler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSign;
