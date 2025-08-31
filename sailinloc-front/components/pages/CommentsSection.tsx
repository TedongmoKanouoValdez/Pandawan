"use client";
import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaThumbsDown, FaPaperPlane } from "react-icons/fa";
import StarsRating from "@/components/StarsRating";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, ButtonGroup } from "@heroui/button";

interface Commentaire {
  id: number;
  contenu: string;
  note: number;
  creeLe: string;
  auteur: { id: number; nom: string };
}

interface CommentairesProps {
  bateauId: number;
  utilisateurId: number;
}

export default function CommentsSection({
  bateauId,
  utilisateurId,
}: CommentairesProps) {
  const [commentaires, setCommentaires] = useState<Commentaire[]>([]);
  const [newCommentaire, setNewCommentaire] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // Pour le modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState<"opaque" | "transparent">("opaque");
  const handleOpen = (backdropType: "opaque" | "transparent") => {
    setBackdrop(backdropType);
    onOpen();
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/commentaires?bateauId=${bateauId}`)
      .then((res) => res.json())
      .then((data) => {
        setCommentaires(data);
        setLoading(false);
      });
  }, [bateauId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!utilisateurId) {
      handleOpen("opaque");
      return;
    }
    if (!newCommentaire) return alert("Le commentaire est vide");

    const res = await fetch("http://localhost:3001/api/commentaires", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contenu: newCommentaire,
        note: rating,
        auteurId: utilisateurId,
        bateauId,
      }),
    });

    if (res.ok) {
      const saved = await res.json();
      setCommentaires((prev) => [saved, ...prev]);
      setNewCommentaire("");
      setRating(0);
    } else {
      alert("Erreur lors de l'envoi");
    }
  };

  console.log(commentaires);

  return (
    <div className="max-w-6xl mx-auto p-6 px-0 mb-4">
      {/* Titre */}
      <h2 className="text-2xl font-semibold mb-4">Commentaire</h2>

      {/* Zone de saisie */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow p-4 mb-6 w-[40rem]">
          <textarea
            value={newCommentaire}
            onChange={(e) => setNewCommentaire(e.target.value)}
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
            rows={3}
            placeholder="Enter your comment..."
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex space-x-1 items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`${star} star`}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-5 h-5 cursor-pointer transition ${
                      star <= rating ? "fill-orange-400" : "fill-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.851L19.336 24 12 20.202 4.664 24 6 15.599 0 9.748l8.332-1.73z" />
                  </svg>
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </form>

      {/* Nombre de commentaires + filtre */}
      <div className="flex justify-between items-center mb-4 w-[40rem]">
        <p className="text-gray-600 font-medium">
          {commentaires.length} Commentaire
        </p>
        {/* <button className="text-gray-500 text-sm flex items-center space-x-1">
          <span>Plus</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 9l-7 7-7-7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}
      </div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {Array.isArray(commentaires) && commentaires.length === 0 && (
            <p>Aucun commentaire.</p>
          )}
          {Array.isArray(commentaires) &&
            commentaires.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-lg shadow p-4 mb-4 w-[40rem]"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">
                      {c.auteur?.nom ?? "Anonyme"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(c.creeLe).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 text-sm mb-3">{c.contenu}</p>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex items-center space-x-4"></div>
                  <div className="flex flex-row space-x-2">
                    <StarsRating rating={c.note} />
                  </div>
                </div>
              </div>
            ))}
        </>
      )}

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Information
              </ModalHeader>
              <ModalBody>
                <p>Vous devez être connecté pour commenter.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
