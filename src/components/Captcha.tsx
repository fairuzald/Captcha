import Image from "next/image";

const Captcha: React.FC = () => {
  const imagesArray = new Array(9).fill(null).map((value, index) => {
    return `/api/captcha-image?index=${index}.png`;
  });

  return (
    <div className="container grid grid-cols-3">
      {imagesArray.map((imageUrl: string, index: number) => {
        return (
          <Image
            key={index}
            src={imageUrl}
            alt={`Image number ${index}`}
            width={100}
            height={100}
            className="h-[100px] w-[100px] border-2 border-app-red bg-white"
          />
        );
      })}
    </div>
  );
};
export default Captcha;
