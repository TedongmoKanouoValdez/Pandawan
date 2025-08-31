<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> ea0937cd57c221cfee4b59a9c6c7b96220081499
import { title } from "@/components/primitives";
import Link from "next/link";
import { RippleButton } from "@/components/magicui/ripple-button";
import {Checkbox} from "@heroui/checkbox";
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 // Pour voir si le composant se monte
  useEffect(() => {
    console.log("✅ Composant LoginPage monté");
  }, []);
  
const handleLogin = async (e) => {
  e.preventDefault(); // évite le rechargement de la page


  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Connexion réussie !');
      localStorage.setItem('token', data.token); // facultatif : stocker le token pour authentification future
      // Rediriger ou mettre à jour l'état utilisateur ici si besoin
    } else {
      alert(data.message || 'Erreur de connexion');
    }
  } catch (err) {
    alert('Erreur serveur');
    console.error('Erreur lors de la connexion :', err);
  }
};


console.log("Composant LoginPage monté")
  return (
    <>
      <div className="container mx-auto px-4 h-full py-24">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-glace border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-white text-2xl font-bold">
                    Bienvenue sur votre espace
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <form onSubmit={handleLogin}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                       required
                    />
                  </div>
                  <div>
                     <Checkbox className="text-white"><span className="text-white">Souviens-toi de moi</span></Checkbox>
                  </div>

                  <div className="flex justify-center text-center mt-6">
                    <RippleButton 
                        rippleColor="#ADD8E6" type="submit" onClick={() => {
                        console.log("Clic détecté");
                      }}> Se connecter</RippleButton>
                  </div>
                  {success && (
                    <p className="text-green-500 text-sm mt-2 text-center">{success}</p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                  )}
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link href="/" className="text-white">
                  <small className="text-base">Mot de passe oublié ?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/register" className="text-white">
                    <small className="text-base">Créer un nouveau compte</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
