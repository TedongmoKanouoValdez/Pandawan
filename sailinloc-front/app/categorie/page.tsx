import { title } from "@/components/primitives";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { RippleButton } from "@/components/magicui/ripple-button";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { NumberInput } from "@heroui/number-input";
import { FlipWords } from "@/components/ui/flip-words";
import {Image} from "@heroui/image";
import NextImage from "next/image";
import {Select, SelectSection, SelectItem} from "@heroui/select";

export const animals = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];
export const LogoBoar = () => {
  let boar =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686482/sailing-boat_j2nbpt.png";
  return <img src={boar} className="allogo" alt="iconeBoar" />;
};

export const LogoCatamarans = () => {
  let catamarans =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686482/catamaran_r5gjhc.png";
  return <img src={catamarans} className="allogo" alt="iconeCatamarans" />;
};

export const LogoCap = () => {
  let cap =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686481/sailor-cap_erm3tc.png";
  return <img src={cap} className="allogo" alt="iconeCap" />;
};

export const LogoMap = () => {
  let map =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686481/map_u3koli.png";
  return <img src={map} className="allogo" alt="iconeMap" />;
};

export const LogoZeus = () => {
  let zeus =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686482/zeus_fy0klw.png";
  return <img src={zeus} className="allogo" alt="iconeZeus" />;
};

export const LogoSailingTime = () => {
  let sailingtime =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750699330/sailing_dffir0.png";
  return <img src={sailingtime} className="allogo" alt="iconeSailingTime" />;
};

export const LogoBateauSansPermis = () => {
  let bateauSansPermis =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686483/small_zcmu0m.png";
  return <img src={bateauSansPermis} className="allogo" alt="iconebateauSansPermis" />;
};

export const LogoBateauSale = () => {
  let bateauSale =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686481/sale_xqgnxw.png";
  return <img src={bateauSale} className="allogo" alt="iconebateauSale" />;
};

export const LogoIdealFamille = () => {
  let idealFamille =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686481/family_fb9ymr.png"
  return <img src={idealFamille} className="allogo" alt="iconeidealFamille" />;
};

export const LogoSoleil = () => {
  let soleil =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686482/sunset_dometl.png"
  return <img src={soleil} className="allogo" alt="iconesoleil" />;
};
export const LogoSeminaire = () => {
  let seminaire =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686482/seminar_ads3ym.png"
  return <img src={seminaire} className="allogo" alt="iconeseminaire" />;
};
export const LogoPMR = () => {
  let PMR =
    "https://res.cloudinary.com/dluqkutu8/image/upload/v1750686481/disabled-person_bn2sbu.png"
  return <img src={PMR} className="allogo" alt="iconePMR" />;
};
export default function CategoriesPage() {
   const words = ["aventure", "voyage", "périple", "épopée", "exploration"];

  return (
    <>
      <section className="">
             <div className="relative">
               <div className="contentvideohome" style={{backgroundImage: "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751325213/handicap%C3%A9s_ffn7ax.jpg)", width: "100%", height:"100vh", objectFit:"cover", backgroundRepeat: "no-repeat", backgroundSize: "97rem"}} >

               </div>
               <div className="contenttext">
                 <div className="flex flex-row space-x-2">
                   <div className="Textheader text-white">
                     <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                       <h1 className="text-6xl font-bold">
                         Nos Categories de navigation
                       </h1>
                     </BoxReveal>
     
                     <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                       <p className="text-lg mt-4">
                         Choisissez la categorie de bateau ou de service <br/> qui vous  
                         convient le mieux
                         pour vivre <br/> une experience en mer  inoubliable.
                       </p>
                     </BoxReveal>

                   </div>
                 </div>
               </div>
               <div className="contentFormHome">
                 <form action="">
                   <div className="grid grid-cols-5 gap-4">
                     <div className="inputformhome">
                       <Input
                         label="Veuillez saisire votre destination"
                         type="text"
                         variant="bordered"
                         color="secondary"
                       />
                     </div>
                     <div className="inputformhome">
                       <Input
                         label="Type de bateau"
                         type="text"
                         variant="bordered"
                         color="secondary"
                       />
                     </div>
                     <div className="inputformhome">
                       <DatePicker
                         label={"Dates de navigation"}
                         variant="bordered"
                         color="secondary"
                       />
                     </div>
                     <div className="inputformhome">
                  <NumberInput
                         label="Nombre de passagers"
                         variant="bordered"
                         color="secondary"
                       />
                     </div>
                     <div>
                       <RippleButton rippleColor="#ADD8E6" className="py-3.5">
                         Trouver mon bateau
                       </RippleButton>
                     </div>
                   </div>
                 </form>
               </div>
             </div>
      </section>

        <section>
        <div
          className="py-24"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750525392/5594016_ntbb0p.jpg)",
          }}
        >
          <div className="flex flex-col justify-center items-center pb-20">
            <div>
              <h2 className="text-5xl font-medium mb-5">
                EMBARQUEZ POUR UNE AVENTURE SUR MESURE
              </h2>
            </div>
            <div>
              <p className="descriptionallsectionhome text-center">
               Découvrez notre sélection de bateaux adaptés à tous les styles de navigation. Que vous recherchiez 
               une escapade paisible à bord d’un voilier, une croisière conviviale en catamaran, 
               ou une sortie guidée avec skipper, trouvez l’expérience idéale pour voguer à votre rythme..
              </p>
            </div>
          </div>
          <div className="flex justify-start mx-auto max-w-6xl w-full mb-10">
            <div>
             
                <RippleButton className="bg-black text-white font-bold">
                  Toutes les catégories
                </RippleButton>
             
            </div>
          </div>
          <div className="contentcategoriehome">
            <div className="grid grid-cols-3 gap-1">
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoBoar />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750692648/vue-d-un-voilier-sur-l-eau_ar6ixe.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">Voiliers</div>
                    <div>
                      Naviguez à l&apos;ancienne et ressentez chaque brise pour
                      une expérience authentique.
                    </div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Explorer les voiliers
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoCatamarans />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750692435/7522620_20200716035334376_1_XLARGE_ifo7b4.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">Catamarans</div>
                    <div>
                      Stables et confortables, parfaits pour les familles ou les
                      longs séjours.
                    </div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Voir les catamarans
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoCap />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750698388/oJptb16CS56Ll4CiOdjHep2JSxqzgiDm.big_lczbgu.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Excursions avec Skipper
                    </div>
                    <div>
                      Partez sans permis : un professionnel vous accompagne tout
                      au long de votre navigation.
                    </div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Réserver une excursion
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoMap />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750698539/femme-robe-debout-yacht-tenue-dore-ballons-quoique-voile_sobx8q.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Destinations Populaires
                    </div>
                    <div>
                      Explorez les spots les plus réservés par nos utilisateurs,
                      testés et approuvés.
                    </div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Voir les destinations
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoZeus />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750699720/dji-0392-scaled_wpckgh.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">Bateaux à Moteur</div>
                    <div>
                      Vitesse, liberté et adrénaline pour vos journées en mer.
                    </div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Choisir un bateau à moteur
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoSailingTime />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1750700813/I3ZXx2CNWO4JpH1VgdRcF2MLYrFddN8c.big_1_nx2qog.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Location à la Journée
                    </div>
                    <div>Idéal pour une escapade rapide sans engagement</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Louer à la journée
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
               <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoBateauSansPermis />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751324800/bateau_sans_permis_etgemz.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Bateaux sans permis
                    </div>
                    <div>Naviguez librement sans avoir besoin de licence</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Partir sans permis
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
               <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoBateauSale />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751324556/offre_de_derniere_minute_jdzwk1.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Offre de derniere minute
                    </div>
                    <div>Profitez des prix reduits sur les locations recentes</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Profiter des offres
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
               <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoIdealFamille />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751324672/Famille_zgx8qn.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Ideal en Famille
                    </div>
                    <div>Bateaux spacieux et securisés pour tous ages</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Voir pour la famille
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoSoleil />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751324971/soleil_xb95vo.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Coucher de soleil
                    </div>
                    <div>Petites Croisières romantiques à l'heure dorée</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Réserver au coucher du soleil
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoSeminaire />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751325283/team_bhthzg.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                      Séminaires & Team building
                    </div>
                    <div>Organisez un evenement pro en mer</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Organiser un événement
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative cardcategorie">
                <div className="logocategrie1 flex justify-center items-center">
                  <LogoPMR />
                </div>
                <div
                  className="cardcategoriecontent"
                  style={{
                    backgroundImage:
                      "url(https://res.cloudinary.com/dluqkutu8/image/upload/v1751325213/handicap%C3%A9s_ffn7ax.jpg)",
                  }}
                >
                  <div className="relative contentdescriptioncategorie flex flex-col justify-center px-6 py-16 z-10 space-y-4 text-white">
                    <div className="text-xl font-bold">
                     Accessibilité PMR
                    </div>
                    <div>Bateaux adaptés aux personnes à mobilité reduite</div>
                    <div>
                      <RippleButton
                        className="rounded-full bg-glace text-white font-medium"
                        rippleColor="#ADD8E6"
                      >
                        Voir les bateaux accessibles
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}
