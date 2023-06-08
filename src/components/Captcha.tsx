import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import CheckIcon from "@/components/icons/CheckIcon";
const Captcha = ({
  selectedImages,
  setSelectedImages,
}: {
  selectedImages: number[];
  setSelectedImages: Dispatch<SetStateAction<number[]>>;
}) => {
  const imagesArray = new Array(9).fill(null).map((_, index: number) => {
    return `/api/captcha-image?index=${index}`;
  });
  function toogleSelected(index: number) {
    if (selectedImages.includes(index)) {
      const newSelectedImages = selectedImages.filter(
        (imageIndex) => imageIndex !== index
      );
      setSelectedImages(newSelectedImages);
    } else {
      const newSelectedImages = [...selectedImages, index];
      setSelectedImages(newSelectedImages);
    }
  }
  return (
    <div className="container grid grid-cols-3">
      {imagesArray.map((imageUrl: string, index: number) => {
        return (
          <button
            key={index}
            type="button"
            onClick={() => toogleSelected(index)}
            className="relative h-[100px] w-[100px] overflow-hidden border-2 border-white bg-white"
          >
            <Image
              src={imageUrl}
              alt={`Image number ${index + 1}`}
              width={100}
              height={100}
              priority
              className="h-full w-full object-cover object-center"
            />
            {selectedImages.includes(index) && (
              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-app-blue bg-opacity-50">
                <CheckIcon style="w-10 h-10 fill-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
export default Captcha;
