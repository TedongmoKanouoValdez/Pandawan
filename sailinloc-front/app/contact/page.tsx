'use client';
import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { BsTelephoneFill} from "react-icons/bs";
import { TbMailFilled } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import { FlipWords } from "@/components/ui/flip-words";
import { PiSunDimFill } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { DatePicker } from "@heroui/date-picker";
import { RippleButton } from "@/components/magicui/ripple-button";
import { NumberInput } from "@heroui/number-input";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Input } from "@heroui/input";
import { BiSolidBookmark } from "react-icons/bi";
import { BsCloudSunFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Badge, Space } from "antd";
import { Chip } from "@heroui/chip";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { BsShieldFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Form } from "@heroui/form";
import { Button, ButtonGroup } from "@heroui/button";



export default function ContactPage() {
  const words = ["aventure", "voyage", "périple", "épopée", "exploration"];

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    nom: false,
    email: false,
    objet: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nom: formData.nom.trim() === "",
      email: formData.email.trim() === "",
      objet: formData.objet.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val === true);

     if (hasError) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const SERVICE_ID = 'service_29gmwal';
    const TEMPLATE_ID = 'template_rq3pwru';
    const PUBLIC_KEY = '7EUjUve2HG1kZcB1t';

    const templateParams = {
      from_name: formData.nom,
      from_email: formData.email,
      subject: formData.objet,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("Votre message a bien été envoyé !");
        setFormData({ "" nom: "", email: "", objet: "", message: "" });
      })
      .catch((error) => {
        // console.error("Erreur lors de l'envoi :", error);
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  return (
    <>

     <section className="">
            <div className="relative">
              <div className="contentvideohome">
                <video
                  muted
                  autoPlay
                  loop
                  playsInline
                  controls={false}
                  style={{ width: "100%", height: "100vh", objectFit: "cover" }}
                  src="https://res.cloudinary.com/dluqkutu8/video/upload/v1750331153/14637966-uhd_2560_1440_60fps_tli0wh.mp4"
                />
              </div>
              <div className="contenttext">
                <div className="flex flex-row space-x-2">
                  {/* <div>
                    <LogoSecondaire />
                  </div> */}
                  <div className="justify-items-center  Textheader text-white">
                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                      <h1 className="  text-6xl font-bold">
                        Votre prochaine
                        <FlipWords words={words} className="text-white" />
                        commence ici
                      </h1>
                    </BoxReveal>
    
                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                      <p className="text-lg mt-4">
                        Louez ou proposez un bateau en quelques clics.
                      </p>
                    </BoxReveal>
    
                  
                    </div>
                  </div>
                </div>
              </div>
              
            
          </section>


    <section
      className="bg-cover bg-center w-screen min-h-screen flex items-center justify-center px-4 py-12"
      style={{Z
        backgroundImage:
          "url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751037337/4931029_zmkvbr.jpg')",
      }}
    >
      <div className=" mx-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-5 gap-6 p-6 ">
        <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Formulaire de contact
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.objet && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <button
              type="submit"
              className="mx-auto flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md shadow hover:bg-gray-800 transition"
            >
              <BsSendFill />
              <span>Envoyer le message</span>
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="col-span-1 md:col-span-2 bg-glass p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Informations de contact
            </h2>
            <div className="grid grid-cols-2 gap-4 place-items-center">
              <InfoCard
                icon={<BsTelephoneFill className="text-4xl" />}
                text={
                  <a href="tel:+33123456789" className="hover:text-blue-500">
                    +33 1 23 45 67 89
                  </a>
                }
              />
              <InfoCard
                icon={<TbMailFilled className="text-4xl" />}
                text={
                  <a href="mailto:contact@example.com" className="hover:text-blue-500">
                    contact@example.com
                  </a>
                }
              />
              <InfoCard
                icon={<FaLocationDot className="text-4xl" />}
                text={
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="hover:text-blue-500"
                  >
                    12 Rue des Navigateurs,
                    <br />
                    75000 Paris, France
                  </a>
                }
              />
              <InfoCard
                icon={<IoIosTime className="text-4xl" />}
                text="Lun - Ven, 9h à 18h"
              />
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow border border-white mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337477058263!2d2.3522217156742816!3d48.85661407928786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdfba7dfb1b%3A0xb60ff7f3732f7e3!2sParis!5e0!3m2!1sfr!2sfr!4v1616589273186!5m2!1sfr!2sfr"
              width="100%"
              height="220"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="bg-glass border border-gray-200 rounded-xl shadow-md w-full aspect-square flex flex-col items-center justify-center p-4 text-center space-y-2">
      <div className="text-4xl text-black">{icon}</div>
      <p className="text-[13px] font-semibold text-gray-800 leading-tight">{text}</p>
    </div>
  );
}
'use client';
import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { BsTelephoneFill} from "react-icons/bs";
import { TbMailFilled } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';


export default function ContactPage() {
  const words = ["aventure", "voyage", "périple", "épopée", "exploration"];

  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    nom: false,
    email: false,
    objet: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      nom: formData.nom.trim() === "",
      email: formData.email.trim() === "",
      objet: formData.objet.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val === true);

     if (hasError) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const SERVICE_ID = 'service_29gmwal';
    const TEMPLATE_ID = 'template_rq3pwru';
    const PUBLIC_KEY = '7EUjUve2HG1kZcB1t';

    const templateParams = {
      from_name: formData.nom,
      from_email: formData.email,
      subject: formData.objet,
      message: formData.message,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        toast.success("Votre message a bien été envoyé !");
        setFormData({ nom: "", email: "", objet: "", message: "" });
      })
      .catch((error) => {
        // console.error("Erreur lors de l'envoi :", error);
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      });
  };

  return (
    <section
      className="bg-cover bg-center w-screen min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dluqkutu8/image/upload/v1751037337/4931029_zmkvbr.jpg')",
      }}
    >
      <div className=" mx-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-5 gap-6 p-6 ">
        <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Formulaire de contact
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.objet && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">Champ requis.</p>}
            </div>

            <button
              type="submit"
              className="mx-auto flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md shadow hover:bg-gray-800 transition"
            >
              <BsSendFill />
              <span>Envoyer le message</span>
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div className="col-span-1 md:col-span-2 bg-glass p-6 rounded-xl shadow flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Informations de contact
            </h2>
            <div className="grid grid-cols-2 gap-4 place-items-center">
              <InfoCard
                icon={<BsTelephoneFill className="text-4xl" />}
                text={
                  <a href="tel:+33123456789" className="hover:text-blue-500">
                    +33 1 23 45 67 89
                  </a>
                }
              />
              <InfoCard
                icon={<TbMailFilled className="text-4xl" />}
                text={
                  <a href="mailto:contact@example.com" className="hover:text-blue-500">
                    contact@example.com
                  </a>
                }
              />
              <InfoCard
                icon={<FaLocationDot className="text-4xl" />}
                text={
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    className="hover:text-blue-500"
                  >
                    12 Rue des Navigateurs,
                    <br />
                    75000 Paris, France
                  </a>
                }
              />
              <InfoCard
                icon={<IoIosTime className="text-4xl" />}
                text="Lun - Ven, 9h à 18h"
              />
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow border border-white mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337477058263!2d2.3522217156742816!3d48.85661407928786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdfba7dfb1b%3A0xb60ff7f3732f7e3!2sParis!5e0!3m2!1sfr!2sfr!4v1616589273186!5m2!1sfr!2sfr"
              width="100%"
              height="220"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-none"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="bg-glass border border-gray-200 rounded-xl shadow-md w-full aspect-square flex flex-col items-center justify-center p-4 text-center space-y-2">
      <div className="text-4xl text-black">{icon}</div>
      <p className="text-[13px] font-semibold text-gray-800 leading-tight">{text}</p>
    </div>
  );
}
