import Image from "next/image";
import { useEffect } from "react";
import CheckIcon from "./icons/CheckIcon";

export default function Captcha({
  selectedImages,
  setSelectedImages,
  captchaKey,
}) {
  useEffect(() => {
    setSelectedImages([]);
  }, [captchaKey, setSelectedImages]);

  const imagesArray = new Array(9).fill(null).map((value, index) => {
    return `/api/captcha-image?index=${index}&key=${captchaKey}`;
  });
  function toogleSelected(index) {
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
      {imagesArray.map((imageUrl, index) => {
        return (
          <button
            key={index}
            type="button"
            onClick={() => toogleSelected(index)}
            className="relative w-[100px] h-[100px] lg:h-[150px] lg:w-[150px] overflow-hidden border-2 border-white bg-white"
          >
                       <img src={imageUrl} alt=""/>

            {selectedImages.includes(index) && (
              <div className="absolute inset-0 flex h-full w-full z-20 items-center justify-center bg-app-blue bg-opacity-50">
                <CheckIcon style="w-10 h-10 fill-white z-50" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
