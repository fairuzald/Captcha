import { NextApiResponse } from "next";
import { readFileSync } from "fs";
import path from "path";
import { withIronSessionApiRoute } from "iron-session/next";

// Define the probability of a dog image appearing in the captcha
const dogProbability = 0.5;

// Function to generate a new set of captcha images
function newCaptchaImages() {
  // Create a new array of length 9 and fill it with null values
  return new Array(9).fill(null).map(() => {
    // Randomly determine whether the image should be a dog or a muffin
    const shouldBeDog = Math.random() <= dogProbability;

    // Generate a random number between 1 and 10 for dogs, or between 1 and 13 for muffins
    const number = Math.floor(Math.random() * (shouldBeDog ? 10 : 13)) + 1;

    // Create the filename based on whether it should be a dog or a muffin
    const fileName = (shouldBeDog ? "dog" : "muffin") + number + ".png";

    // Return the image path
    return `public/dogs-and-muffins/${fileName}`;
  });
}

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    // Check if the session has captchaImages, if not, generate new ones
    if (!req.session.captchaImages) {
      req.session.captchaImages = newCaptchaImages();
      await req.session.save();
    }

    const { index } = req.query;

    // Retrieve the captchaImages array from the session
    const captchaImages = req.session.captchaImages;

    // Check if captchaImages is not defined or if the index is invalid
    if (!captchaImages || index === undefined || index >= captchaImages.length) {
      res.status(400).send("Invalid captcha image index");
      return;
    }

    res.setHeader("Content-Type", "image/png");

    // Get the image path based on the provided index
    const imagePath = path.join(process.cwd(), captchaImages[index]);

    // Read the image file into a buffer
    const imageBuffer = readFileSync(imagePath);

    // Send the image buffer as the response
    res.send(imageBuffer);
  },
  {
    cookieName: "session",
    password: process.env.SECRET_SESSION || "",
    cookieOptions: {
      secure: process.env.NODE_ENV === "development",
    },
  }
);
