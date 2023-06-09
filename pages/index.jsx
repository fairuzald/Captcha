import { useState } from "react";
import { withIronSessionSsr } from "iron-session/next";
import { newCaptchaImages } from "./api/captcha-image";
import Head from "next/head";
import TextBox from "../components/TextBox";
import Captcha from "../components/Captcha";

export default function Home({ defaultCaptchaKey }) {
  const [message, setMessage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [captchaKey, setCaptchaKey] = useState(defaultCaptchaKey);
  function submitForm(e) {
    e.preventDefault();
    if (!message) {
      alert("The message is required");
      return;
    }
    fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({
        message,
        selectedIndexes: selectedImages,
      }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then((json) => {
        if (json.sent) {
          setCaptchaKey(new Date().getTime());
          alert("message sent");
          setMessage("");
        }
        if (!json.captchaIsOk) {
          setCaptchaKey(new Date().getTime());
          alert("wrong captcha. try again");
        }
      });
    });
  }
  return (
    <>
      <Head>
        <title>Captcha</title>
        <meta name="description" content="Manual Captcha by Fairuz" />
        <link rel="icon" href="/Icon.png" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-14 lg:gap-20 bg-gradient-to-b from-[#212121] to-app-black-soft px-20">
        <h1 className="text-3xl lg:text-4xl font-[700] text-white">Captcha</h1>
        <form className="flex w-[300px] lg:w-[450px] flex-col gap-5 lg:gap-6">
          <TextBox
            value={message}
            name="Text Box"
            placeholder="Input the message"
            setValue={setMessage}
          />
          <h2 className="flex items-start justify-start text-left text-2xl lg:text-3xl font-semibold text-white">
            Select all dog
          </h2>
          <Captcha
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            captchaKey={captchaKey}
          />
          <button
            type="submit"
            className="mx-auto mt-2 flex w-[50%] items-center justify-center rounded-md text-lg lg:text-xl bg-app-red px-4 py-1 text-center font-semibold text-white"
            onClick={(e) => {
              submitForm(e);
            }}
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async ({ req }) => {
    {
      if (!req.session.captchaImages) {
        req.session.captchaImages = newCaptchaImages();
        await req.session.save();
      }
      return {
        props: {
          defaultCaptchaKey: new Date().getTime(),
        },
      };
    }
  },
  {
    cookieName: "session",
    password: process.env.SESSION_SECRET,
  }
);
