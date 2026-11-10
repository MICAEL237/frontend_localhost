import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Type = "password" | "text" | "file"| "number";

type Input = {
  type: Type;
  placeHolder: string;
  label?: string;
  ClassName?: string;
  error?: string | undefined;
  valeur?: string | number
  // onchange?: st
};

const Input = ({
  type,
  placeHolder,
  label,
  valeur,
  ClassName,
  error,
  ...props
}: Input) => {


    
const [MotPasse, setMotPasse] = useState<boolean>(false);
const VoirMotPasse = () => setMotPasse(!MotPasse);
  return (
    <div className="flex flex-col px-4 gap-1 items-start justify-center w-full ">
      <label htmlFor="" className="label"> {label} </label>
      <input
      
        type={type}
        placeholder={placeHolder}
        value={valeur}
        // onChange={onchange}
        className={`w-full h-12 p-4 input input-accent ${ClassName}`}
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

      <span className="text-[10px] text-red-500 px-2 opacity-65"> {error} </span>
    </div>
  );
};


export default Input