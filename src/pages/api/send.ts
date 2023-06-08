import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiResponse } from "next";

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    const { message, selectedImages } = req.body;
    const captchaImages = req.session.captchaImages
    console.log(captchaImages, message, selectedImages);
    // res.json(body: {});
  },
  {
    cookieName: "session",
    password: process.env.SECRET_SESSION || "",
  }
);
