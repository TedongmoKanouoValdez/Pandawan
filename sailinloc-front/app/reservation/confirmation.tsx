// ConfirmModal.tsx
export default function ConfirmModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Demande envoyée !</h2>
        <p className="text-gray-700 mb-6">
          Votre demande de réservation a bien été envoyée. <br />
          Vous recevrez un email dans les plus bref delai contenant les instructions pour procéder au paiement.
        </p>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
        >
          
          Fermer
        </button>
      </div>
    </div>
  );
}
