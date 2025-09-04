// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Cercle décoratif */}
      <div className="mb-8">
        <div className="w-40 h-40 rounded-full bg-red-600 flex items-center justify-center shadow-xl">
          <span className="text-6xl font-black text-white">404</span>
        </div>
      </div>

      {/* Texte */}
      <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-slate-800">
        Oups&nbsp;! Cette page n’existe pas.
      </h1>
      <p className="text-lg text-slate-600 mb-2">
        Vous avez navigué trop loin sur les océans de{' '}
        <span className="font-bold text-red-600">Sailingloc</span>.
      </p>
      <p className="text-sm text-slate-500 mb-8">
        Retournez au port avant la tempête&nbsp;!
      </p>

      {/* Bouton */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full font-semibold transition-all shadow-md"
      >
        Retour à l’accueil
      </Link>
    </main>
  );
}