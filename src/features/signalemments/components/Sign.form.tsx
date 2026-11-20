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

const FormSign = () => {
  type Position = {
    latitude: number;
    longitude: number;
  };
const [showSuccess, setShowSuccess] = useState(false);
  const [commune, setCommune] = useState<CommuneType[]>([]);
  const [cat, setCat] = useState<CategrieType[]>([]);
  const [position, setposition] = useState<Position>();

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

      setValue("latitude", String(coords.latitude), {
        shouldValidate: true,
      });

      setValue("longitude", String(coords.longitude), {
        shouldValidate: true,
      });

      setposition({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };

    Coords();
  }, [setValue]);

  useEffect(() => {
    const Card = () => {
      if (!position) {
        return;
      }

      const map = Map(position?.latitude, position?.longitude);

      addMarker(map, position.latitude, position.longitude);
    };

    Card();
  }, [position]);

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
    formData.append("lieu", data.lieu);

    formData.append("image", data.image);

    if (data.latitude) {
      formData.append("latitude", String(data.latitude));
    }

    if (data.longitude) {
      formData.append("longitude", String(data.longitude));
    }

    const Api = await ApiCreateSign(formData);

    if (Api) {
      setShowSuccess(true);
    }

    console.log(formData, showSuccess);

    return Api;
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] px-4 pt-28 pb-16 md:px-8">

      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-green-200/30 blur-[100px]" />

        <div className="absolute top-[45%] -left-32 h-96 w-96 rounded-full bg-emerald-100/40 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col items-center text-center animate-header">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2 shadow-sm">

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#15803d]" />
            </span>

            <span className="text-xs font-bold tracking-[0.15em] text-[#166534]">
              ALLO MAIRIE · SERVICE CITOYEN
            </span>

          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] md:text-5xl">

            Ensemble, améliorons

            <span className="block text-[#15803d]">
              notre cadre de vie.
            </span>

          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">

            Vous constatez un problème dans votre quartier ?

            Signalez-le simplement. Votre participation contribue à
            construire une commune plus propre et plus agréable.

          </p>

          <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-green-200 via-green-600 to-green-200" />

        </div>


        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_0.85fr]">


          {/* FORM CARD */}

          <div className="form-card animate-form overflow-hidden rounded-3xl border border-green-100 bg-white shadow-[0_15px_60px_rgba(15,23,42,0.06)]">

            {/* CARD HEADER */}

            <div className="relative overflow-hidden bg-[#15803d] px-6 py-7 md:px-8">

              <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full border-[25px] border-white/5" />

              <div className="relative">

                <span className="text-xs font-bold tracking-[0.2em] text-green-100">
                  NOUVEAU DOSSIER
                </span>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Signaler un problème
                </h2>

                <p className="mt-2 text-sm text-green-100">
                  Décrivez le problème rencontré dans votre commune.
                </p>

              </div>

            </div>


            {/* FORM */}

            <form
              className="flex flex-col gap-7 p-6 md:p-8"
              onSubmit={handleSubmit(Onsubmit)}
              encType="multipart/form-data"
            >

              {/* CATEGORY AND COMMUNE */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="flex flex-col gap-2">

                  <label className="text-sm font-bold text-[#0f172a]">
                    Catégorie du problème
                  </label>

                  <select
                    {...register("categorie")}
                    className="select select-bordered w-full rounded-xl border-slate-200 bg-[#f8fafc] text-sm outline-none transition-all focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                  >

                    {cat.map((cat: CategrieType) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.nom}
                      </option>
                    ))}

                  </select>

                  <span className="text-xs text-red-500">
                    {formState.errors.categorie?.message}
                  </span>

                </div>


                <div className="flex flex-col gap-2">

                  <label className="text-sm font-bold text-[#0f172a]">
                    Commune concernée
                  </label>

                  <select
                    {...register("commune")}
                    className="select select-bordered w-full rounded-xl border-slate-200 bg-[#f8fafc] text-sm outline-none transition-all focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                  >

                    {commune.map((com: CommuneType) => (
                      <option value={com.id} key={com.id}>
                        {com.nom}
                      </option>
                    ))}

                  </select>

                  <span className="text-xs text-red-500">
                    {formState.errors.commune?.message}
                  </span>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="flex flex-col gap-3">

                <div>
                  <label className="text-sm font-bold text-[#0f172a]">
                    Description du problème
                  </label>

                  <p className="mt-1 text-xs text-slate-400">
                    Expliquez clairement ce que vous avez constaté.
                  </p>
                </div>

                <textarea
                  className="textarea textarea-bordered min-h-36 w-full resize-none rounded-xl border-slate-200 bg-[#f8fafc] p-4 text-sm leading-6 outline-none transition-all placeholder:text-slate-400 focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
                  placeholder="Ex : Une importante accumulation de déchets est observée près du marché..."
                  {...register("description")}
                />

                <span className="text-xs text-red-500">
                  {formState.errors.description?.message}
                </span>

              </div>


              {/* IMAGE */}

              <div className="flex flex-col gap-3">

                <div>
                  <label className="text-sm font-bold text-[#0f172a]">
                    Photo justificative
                  </label>

                  <p className="mt-1 text-xs text-slate-400">
                    Ajoutez une image pour mieux illustrer le problème.
                  </p>
                </div>

                <div className="rounded-2xl border border-dashed border-green-300 bg-green-50/50 p-4 transition-all duration-300 hover:border-green-500 hover:bg-green-50">

                  <Input
                    placeHolder="Sélectionner une image"
                    type="file"
                    label="image"
                    {...register("image")}
                    error={formState.errors.image?.message}
                  />

                </div>

              </div>


              {/* PLACE */}

              <div className="flex flex-col gap-2">

                <label className="text-sm font-bold text-[#0f172a]">
                  Localisation descriptive
                </label>

                <Input
                  placeHolder="Ex : Carrefour marché central, près de la pharmacie..."
                  type="text"
                  label="Lieu"
                  {...register("lieu")}
                  error={formState.errors.lieu?.message}
                />

                <p className="text-xs text-slate-400">
                  Précisez un repère permettant de retrouver facilement le lieu.
                </p>

              </div>


              {/* MAP */}

              <div className="flex flex-col gap-3">

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      Position géographique
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Votre position actuelle sur la carte.
                    </p>
                  </div>

                  <span className="badge badge-success badge-outline gap-1 rounded-full px-3 py-3 text-[10px] font-bold">
                    GPS ACTIF
                  </span>

                </div>


                <div className="map-container relative overflow-hidden rounded-2xl border border-green-100 bg-slate-100 p-1 shadow-inner">

                  <div
                    id="map"
                    className="h-64 w-full rounded-xl"
                  />

                  <div className="pointer-events-none absolute bottom-4 left-4 z-[500] flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">

                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                    <span className="text-[10px] font-bold text-slate-700">
                      VOTRE POSITION
                    </span>

                  </div>

                </div>


                {/* COORDINATES */}

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-xl border border-green-100 bg-green-50/60 p-3">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Latitude
                    </span>

                    <p className="mt-1 text-sm font-bold text-[#15803d]">
                      {position?.latitude ?? "Localisation..."}
                    </p>

                  </div>


                  <div className="rounded-xl border border-green-100 bg-green-50/60 p-3">

                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Longitude
                    </span>

                    <p className="mt-1 text-sm font-bold text-[#15803d]">
                      {position?.longitude ?? "Localisation..."}
                    </p>

                  </div>

                </div>

              </div>


              {/* SUBMIT */}

              <div className="border-t border-slate-100 pt-6">

                <button
                  type="submit"
                  className="group btn h-14 w-full rounded-xl border-none bg-[#15803d] text-sm font-bold text-white shadow-lg shadow-green-800/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#166534] hover:shadow-xl active:translate-y-0"
                >

                  <span>Envoyer mon signalement</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>

                </button>

                <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                  Votre contribution aide à améliorer les services
                  et le cadre de vie de votre commune.
                </p>

              </div>

            </form>

          </div>


          {/* RIGHT INFORMATION PANEL */}

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">


            {/* MAP INFORMATION CARD */}

            <div className="animate-side overflow-hidden rounded-3xl border border-green-100 bg-white p-6 shadow-[0_15px_60px_rgba(15,23,42,0.05)]">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-[#15803d]">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
                    />

                    <circle cx="12" cy="10" r="2.5" />
                  </svg>

                </div>

                <div>
                  <h3 className="font-bold text-[#0f172a]">
                    Votre position
                  </h3>

                  <p className="text-xs text-slate-400">
                    Géolocalisation automatique
                  </p>
                </div>

              </div>


              <div className="rounded-2xl bg-green-50 p-5">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                  <span className="text-xs font-bold text-[#15803d]">
                    POSITION IDENTIFIÉE
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Nous utilisons votre position GPS pour aider les services
                  municipaux à localiser précisément le problème signalé.
                </p>

              </div>

            </div>


            {/* HOW IT WORKS */}

            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_15px_60px_rgba(15,23,42,0.05)]">

              <h3 className="mb-6 text-lg font-extrabold text-[#0f172a]">
                Comment ça fonctionne ?
              </h3>


              <div className="relative flex flex-col gap-7">

                <div className="absolute left-[17px] top-8 h-[calc(100%-60px)] w-px bg-green-100" />


                <div className="relative flex gap-4">

                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-[#15803d]">
                    01
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Décrivez le problème
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Indiquez la nature du problème et sa localisation.
                    </p>
                  </div>

                </div>


                <div className="relative flex gap-4">

                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-[#15803d]">
                    02
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Envoyez votre signalement
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Ajoutez une photo pour faciliter l'identification.
                    </p>
                  </div>

                </div>


                <div className="relative flex gap-4">

                  <div className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-[#15803d]">
                    03
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      La mairie prend connaissance
                    </h4>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Votre signalement contribue à améliorer votre quartier.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* FOOTER INFO */}

            <div className="relative overflow-hidden rounded-3xl bg-[#0f172a] p-6 text-white">

              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[20px] border-green-500/10" />

              <div className="relative">

                <span className="text-xs font-bold tracking-[0.2em] text-green-400">
                  QUARTIERALERTE
                </span>

                <h3 className="mt-3 text-xl font-extrabold">
                  Votre quartier,
                  <span className="block text-green-400">
                    votre responsabilité.
                  </span>
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Chaque signalement est une occasion de rendre
                  notre environnement meilleur.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FormSign;