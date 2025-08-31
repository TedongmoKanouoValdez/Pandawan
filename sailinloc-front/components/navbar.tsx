"use client";
import * as React from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { RiLoginCircleFill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { siteConfig } from "@/config/site";
import { FaUser } from "react-icons/fa";
import { SearchIcon, Logo } from "@/components/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Checkbox } from "@heroui/checkbox";
import { User } from "@heroui/user";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { IoIosMailUnread } from "react-icons/io";
import Notification from "@/components/comp-292";
import { Select, Space } from "antd";

function decodeJWT(token: string): Token | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded as Token;
  } catch (e) {
    console.error("Erreur decoding JWT :", e);
    return null;
  }
}

export const Iconlang = ({ url }: { url: string }) => {
  return <img src={url} className="w-[1.6rem]" alt="iconeSailingTime" />;
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export const MailIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M12.0011 17.3498C12.9013 17.3498 13.6311 16.6201 13.6311 15.7198C13.6311 14.8196 12.9013 14.0898 12.0011 14.0898C11.1009 14.0898 10.3711 14.8196 10.3711 15.7198C10.3711 16.6201 11.1009 17.3498 12.0011 17.3498Z"
        fill="currentColor"
      />
      <path
        d="M18.28 9.53V8.28C18.28 5.58 17.63 2 12 2C6.37 2 5.72 5.58 5.72 8.28V9.53C2.92 9.88 2 11.3 2 14.79V16.65C2 20.75 3.25 22 7.35 22H16.65C20.75 22 22 20.75 22 16.65V14.79C22 11.3 21.08 9.88 18.28 9.53ZM12 18.74C10.33 18.74 8.98 17.38 8.98 15.72C8.98 14.05 10.34 12.7 12 12.7C13.66 12.7 15.02 14.06 15.02 15.72C15.02 17.39 13.67 18.74 12 18.74ZM7.35 9.44C7.27 9.44 7.2 9.44 7.12 9.44V8.28C7.12 5.35 7.95 3.4 12 3.4C16.05 3.4 16.88 5.35 16.88 8.28V9.45C16.8 9.45 16.73 9.45 16.65 9.45H7.35V9.44Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onOpenChange: onOpenRegisterChange,
  } = useDisclosure();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [token, setToken] = useState<Token | null>(null);
  const [utilisateurId, setUtilisateurId] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const sessionData = localStorage.getItem("token");
    if (sessionData) {
      const decodedToken = decodeJWT(sessionData);
      if (decodedToken) {
        setUtilisateurId(Number(decodedToken.userId));
        setToken(decodedToken);
      }
    }
  }, []);

  const handleRegister = async (onClose: () => void) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, password, role: "CLIENT" }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
        onClose();
      } else {
        alert(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      alert("Erreur lors de l'inscription.");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Connexion réussie !");
        localStorage.setItem("token", data.token);
      } else {
        alert(data.message || "Erreur de connexion");
      }
    } catch (err) {
      alert("Erreur serveur");
      console.error("Erreur lors de la connexion :", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // supprime la clé
    setToken(null);
    router.push("/");
  };

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
      className="fixed top-0 left-0 w-full bg-black text-white shadow z-50"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SailingLoc</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium text-white"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="space-x-3">
          <Select
            defaultValue="FR"
            // style={{ width: 120 }}
            onChange={handleChange}
            options={[
              {
                value: "US",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/united-kingdom_1_gihox0.png" />
                ),
              },
              {
                value: "CN",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751228300/china_1_nzkdzd.png" />
                ),
              },
              {
                value: "IN",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/india_kwbcea.png" />
                ),
              },
              {
                value: "ES",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/flag_sbnixy.png" />
                ),
              },
              {
                value: "FR",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/france_gaq5eo.png" />
                ),
              },
              {
                value: "SA",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/flag_1_qa5odr.png" />
                ),
              },
              {
                value: "BD",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227231/bangladesh_tae0eb.png" />
                ),
              },
              {
                value: "RU",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227232/russia_dyvhrz.png" />
                ),
              },
              {
                value: "PT",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227232/portugal_kwbylu.png" />
                ),
              },
              {
                value: "ID",
                label: (
                  <Iconlang url="https://res.cloudinary.com/dluqkutu8/image/upload/v1751227232/indonesia_tg0x1c.png" />
                ),
              },
            ]}
          />
        </NavbarItem>
        <NavbarItem className={`space-x-3 ${utilisateurId ? "hidden" : ""}`}>
          <Button
            // as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            // href="/login"
            onPress={onOpen}
            startContent={<RiLoginCircleFill />}
            variant="flat"
          >
            Connexion
          </Button>
          <Modal
            isOpen={isOpen}
            backdrop="blur"
            placement="top-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Bienvenue sur votre espace
                  </ModalHeader>
                  <form onSubmit={handleLogin}>
                    <ModalBody>
                      <Input
                        endContent={
                          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        variant="bordered"
                      />
                      <Input
                        endContent={
                          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        type="password"
                        variant="bordered"
                      />
                      <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                          classNames={{
                            label: "text-small",
                          }}
                        >
                          Souviens-toi de moi
                        </Checkbox>
                        <Link color="primary" href="#" size="sm">
                          Mot de passe oublié ?
                        </Link>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Fermer
                      </Button>
                      <Button color="primary" onPress={onClose} type="submit">
                        Se connecter
                      </Button>
                    </ModalFooter>
                  </form>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem className={`space-x-3 ${utilisateurId ? "hidden" : ""}`}>
          <Button
            // as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            // href="/register"
            onPress={onOpenRegister}
            startContent={<GiArchiveRegister />}
            variant="flat"
          >
            Inscription
          </Button>
          <Modal
            isOpen={isOpenRegister}
            backdrop="blur"
            placement="top-center"
            onOpenChange={onOpenRegisterChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Créez votre compte
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      endContent={
                        <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Nom"
                      type="text"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Veuillez saisir votre nom"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Prénom"
                      type="text"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Veuillez saisir votre prénom"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Veuillez saisir votre email"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <div className="space-x-1">
                        <Checkbox
                          classNames={{
                            label: "text-small",
                          }}
                        >
                          J'accepte la
                        </Checkbox>
                        <Link href="/" className="text-[#00ced1]">
                          politique de confidentialité
                        </Link>
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Fermer
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => handleRegister(onClose)}
                    >
                      S&apos;inscrire
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarItem>
        <NavbarItem className={`${utilisateurId ? "" : "hidden"}`}>
          <Notification />
        </NavbarItem>
        <NavbarItem className={`${utilisateurId ? "" : "hidden"}`}>
          <div className="flex items-center gap-4">
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                  }}
                  className="transition-transform border-red-500"
                  color="success"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="settings">
                  <Link href="/profil">Profil</Link>
                </DropdownItem>
                <DropdownItem key="team_settings">
                  <Link href="/dashboard">Tableau de bord</Link>
                </DropdownItem>
                {/* <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem> */}
                <DropdownItem
                  onClick={handleLogout}
                  key="logout"
                  color="danger"
                >
                  Deconnexion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
