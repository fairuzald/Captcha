export default function TextBox({ placeholder, name, value, setValue }) {
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
}
