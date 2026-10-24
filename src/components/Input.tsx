import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Type = "password" | "text";

type Input = {
  type: Type;
  placeHolder: string;
  label?: string;
  ClassName?: string;
  error?: string | undefined;
};

const Input = ({
  type,
  placeHolder,
  label,
  // ClassName,
  error,
  ...props
}: Input) => {


    
const [MotPasse, setMotPasse] = useState<boolean>(false);
const VoirMotPasse = () => setMotPasse(!MotPasse);
  return (
    <div className="flex flex-col gap-1 items-start justify-center w-full">
      <label htmlFor="" className="text-xl  px-2"> {label} </label>
      <input
      
        type={type === "password" && !MotPasse ? "password" : "text"}
        placeholder={placeHolder}
        className={`w-full h-12 rounded-xl outline-0 text-[10px] focus:(border-emerald-600) bg-[#f8fafc] px-12 `}
        {...props }
      />

    <div className="w-full relative">
        {type === "password" && (MotPasse?
      (
        <button type="button" onClick={VoirMotPasse} className=" absolute cursor-pointer bg-white right-10 bottom-10">
          {" "}
          <Eye className="absolute" />{" "}
        </button>
      ) : (
        <button type="button" onClick={VoirMotPasse} className="flex absolute cursor-pointer bg-white right-10 bottom-10">
          {" "}
          <EyeOff className="absolute"/>{" "}
        </button>
      )

      )}
    </div>

      <span className="text-xl text-red-500 px-2"> {error} </span>
    </div>
  );
};


export default Input