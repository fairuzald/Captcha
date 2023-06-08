import type { NextApiResponse } from "next";

export default async function handler(req: any, res: NextApiResponse) {
  const { message, selectedImages } = req.body;
  const captchaImages = JSON.parse(localStorage.getItem("captchaImages") || "null");
  console.log(captchaImages, message, selectedImages);
  // res.json(body: {});
}
