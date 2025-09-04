import { CheckCircle } from "lucide-react";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 px-4 py-16">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-xl w-full text-white text-center border border-white/20">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="text-green-400 w-16 h-16" />
          <h1 className="text-4xl font-bold drop-shadow">Paiement réussi !</h1>
          <p className="text-lg text-white/80">
            Merci pour votre réservation. Nous avons bien reçu votre paiement.
          </p>

          <div className="mt-6 bg-white text-purple-600 rounded-full px-6 py-3 text-2xl font-bold shadow-lg">
            {Number(amount).toFixed(2)} €
          </div>
          

          <p className="mt-4 text-sm text-white/60">
            Un email de confirmation vous a été envoyé.
          </p>
        </div>
      </div>
    </main>
  );
}
