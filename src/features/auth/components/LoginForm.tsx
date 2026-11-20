import { useForm } from "react-hook-form";
import { LoginSchema, type LoginType } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginApi from "../services/login.service";
import { useNavigate } from "react-router";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import shieldCheck from "../../../../public/shield-check-svgrepo-com.svg";

const LoginForm = () => {
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const Onsubmit = async (data: LoginType) => {
    const Apiresponse = await LoginApi(data);
    console.log(Apiresponse);

    if (Apiresponse) {
      navigate("/DasboardUser");
    } else {
      return (
        <div className="toast toast-top toast-center">
          <div className="alert alert-warning">
            <span>Identifiants Invalident</span>
          </div>
        </div>
      );
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10 bg-[#071b16]">

      {/* BACKGROUND IMMERSIF */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Dégradés lumineux */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#15803d55,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_#16a34a40,_transparent_50%)]" />

        {/* Halos animés */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-green-500/30 blur-[100px] animate-pulse" />

        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-emerald-400/20 blur-[120px] animate-pulse" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-[100px]" />

        {/* Grille décorative */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:45px_45px]" />

        {/* Éléments flottants */}
        <div className="absolute top-[15%] right-[15%] w-3 h-3 rounded-full bg-green-300/70 blur-[1px] animate-ping" />

        <div className="absolute bottom-[20%] left-[12%] w-2 h-2 rounded-full bg-white/70 animate-pulse" />

        <div className="absolute top-[65%] right-[30%] w-2 h-2 rounded-full bg-green-400/70 animate-bounce" />
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-stretch justify-center gap-5">

        {/* PANNEAU GAUCHE */}
        <section className="relative hidden lg:flex lg:w-[42%] flex-col justify-between overflow-hidden rounded-3xl p-9 border border-white/15 bg-white/[0.07] backdrop-blur-2xl shadow-2xl shadow-black/20">

          {/* Reflet intérieur */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-green-500/10 pointer-events-none" />

          <div className="relative z-10">

            <div className="flex items-center gap-3 mb-20">
              <div className="w-11 h-11 rounded-xl bg-green-500/20 border border-green-300/30 flex items-center justify-center shadow-lg shadow-green-900/20">
                <span className="text-green-300 text-xl font-black">A</span>
              </div>

              <div>
                <h2 className="text-white font-extrabold text-lg">
                  Allô Mairie
                </h2>
                <p className="text-green-300 text-[10px] tracking-[3px] font-bold">
                  SERVICE CITOYEN
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-green-300 text-[11px] font-bold tracking-[3px] mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              PORTAIL CITOYEN
            </span>

            <h1 className="text-4xl xl:text-[42px] font-black text-white leading-[1.15] mb-5">
              Votre ville,
              <br />
              <span className="text-green-400">
                votre voix,
              </span>
              <br />
              votre avenir.
            </h1>

            <p className="text-sm leading-7 text-slate-300 max-w-sm">
              Retrouvez vos démarches, suivez vos signalements et participez
              activement à l'amélioration de votre cadre de vie.
            </p>
          </div>

          <div className="relative z-10">

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-300/20 flex items-center justify-center">
                <img src={shieldCheck} className="w-6 h-6" alt="" />
              </div>

              <div>
                <h3 className="text-white text-sm font-bold">
                  Plateforme municipale sécurisée
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Vos données sont traitées avec attention.
                </p>
              </div>
            </div>

            <p className="text-slate-500 text-[10px] mt-8 tracking-wider">
              QUARTIERALERTE · CONNEXION CITOYENNE
            </p>
          </div>

          {/* Décoration lumineuse */}
          <div className="absolute -right-20 top-1/3 w-56 h-56 rounded-full border border-green-400/10" />
          <div className="absolute -right-12 top-[38%] w-40 h-40 rounded-full border border-green-400/10" />
        </section>

        {/* FORMULAIRE GLASSMORPHISM */}
        <form
          onSubmit={handleSubmit(Onsubmit)}
          className="relative w-full lg:w-[58%] max-w-xl mx-auto flex flex-col justify-center gap-8 p-6 sm:p-9 md:p-12 rounded-3xl border border-white/25 bg-white/[0.12] backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-green-300/40"
        >

          {/* Reflet supérieur */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

          {/* En-tête */}
          <div className="flex flex-col gap-3">

            <div className="lg:hidden flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-300/30 flex items-center justify-center">
                <span className="text-green-300 font-black text-lg">A</span>
              </div>

              <div>
                <h2 className="text-white font-extrabold">
                  Allô Mairie
                </h2>
                <p className="text-green-300 text-[9px] tracking-[2px] font-bold">
                  SERVICE CITOYEN
                </p>
              </div>
            </div>

            <span className="text-green-300 text-[11px] font-bold tracking-[3px]">
              ESPACE PERSONNEL
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Connexion<span className="text-green-400">.</span>
            </h1>

            <p className="text-sm text-slate-300 leading-6">
              Heureux de vous retrouver ! Connectez-vous pour accéder à votre
              espace citoyen.
            </p>
          </div>

          {/* CHAMPS */}
          <div className="flex flex-col gap-6 w-full">

            <div className="w-full relative">
              <Input
                type="text"
                placeHolder="Entrer votre email"
                label="Email"
                {...register("email")}
                error={formState.errors.email?.message}
              />
            </div>

            <div className="w-full relative">
              <Input
                type="password"
                placeHolder="Entrer votre mot de passe"
                label="Mot de passe"
                {...register("password")}
                error={formState.errors.password?.message}
              />
            </div>

          </div>

          {/* BOUTON */}
          <div className="w-full relative transition-transform duration-300 hover:-translate-y-1">
            <Button type="submit" label="Se connecter" />
          </div>

          {/* SÉCURITÉ */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-white/15">
            <img src={shieldCheck} className="w-5 h-5 opacity-80" alt="" />

            <p className="text-[11px] text-slate-300 text-center">
              Connexion sécurisée · Allô Mairie
            </p>
          </div>

          {/* Reflet décoratif */}
          <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-green-400/10 blur-[60px] pointer-events-none" />

        </form>
      </div>
    </main>
  );
};

export default LoginForm;


// leffet glace doit etre un peu plus confortable et ammeliore le style des input avec des animation des hover focus et mm un meilleur alignemtn