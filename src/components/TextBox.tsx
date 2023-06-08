import type { Dispatch, SetStateAction } from "react";

const TextBox = ({
  value,
  setValue,
  name,
  placeholder,
}: {
  value: string;
  name: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <div className="flex w-full bg-white">
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        name={name}
        value={value}
        className="w-full bg-transparent px-3 py-1 outline-none"
      />
    </div>
  );
};

export default TextBox;
