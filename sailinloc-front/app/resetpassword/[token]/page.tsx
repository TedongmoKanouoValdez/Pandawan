"use client";
import { useParams } from "next/navigation";
import { useState, FormEvent } from "react";
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";
// import { LockIcon } from "@heroui/shared-icons";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params?.token as string;

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return setError("Token manquant");

    try {
      const res = await fetch("http://localhost:3001/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        window.location.href = "http://localhost:3000";
      } else {
        setError(data.message || "Erreur");
      }
    } catch {
      setError("Erreur réseau");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mx-auto max-w-[30rem] mt-[14rem] h-[25rem] items-center justify-center bg-gray-100" style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px", borderRadius: '28px' }}>
        <h2 className="text-xl font-bold">Nouveau mot de passe</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            // endContent={
            //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            // }
            label="Nouveau mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {message && <p className="text-sm text-green-600">{message}</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" color="primary" fullWidth>
            Confirmer
          </Button>
        </form>
      </div>
    </div>
  );
}
