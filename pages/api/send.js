import {withIronSessionApiRoute} from "iron-session/next";
import {newCaptchaImages} from "./captcha-image";

export default withIronSessionApiRoute(async function handler(req,res) {
  const {message,selectedIndexes} = req.body;
  const dogsIndexes = req.session.captchaImages
    .map((path,index) => {
      return path.includes('dogs-and-muffins/dog') ? index : -1;
    })
    .filter(index => index !== -1);

    const dataselected = JSON.stringify(selectedIndexes.sort());
    const dataDog = JSON.stringify(dogsIndexes)
  const captchaIsOk = JSON.stringify(dogsIndexes) === JSON.stringify(selectedIndexes.sort());


  // reset captcha images
  req.session.captchaImages = newCaptchaImages();
  await req.session.save();


  // send
  const sent = captchaIsOk;
  // send for real

  res.json({
    captchaIsOk,
    dataDog,
    dataselected,
    sent,
  });
}, {
  cookieName: 'session',
  password: process.env.SESSION_SECRET,
});