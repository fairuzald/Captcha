import Image from "next/image";

const Captcha: React.FC = () => {
  const imagesArray = new Array(9).fill(null).map((value, index: number) => {
    return `/api/captcha-image?index=${index}`;
  });

  return (
    <div className="container grid grid-cols-3">
      {imagesArray.map((imageUrl: string, index: number) => {
        return (
          <div key={index} className="h-[100px] w-[100px] border-2 border-app-red bg-white">
            <Image
              src={imageUrl}
              alt={`Image number ${index+1}`}
              width={100}
              height={100}
              className=" w-full h-full object-cover object-center"
            />
          </div>
        );
      })}
    </div>
  );
};
export default Captcha;
