"use client";
import React, { useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaPaperPlane } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default function CommentsSection() {
  const [rating, setRating] = useState(0);
  return (
    <div className="max-w-6xl mx-auto p-6 px-0 mb-4">
      {/* Titre */}
      <h2 className="text-2xl font-semibold mb-4">Commentaire</h2>

      {/* Zone de saisie */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 w-[40rem]">
        <textarea
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
            <p className="ml-4 text-sm mt-1.5">Note : {rating} / 5</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2">
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Nombre de commentaires + filtre */}
      <div className="flex justify-between items-center mb-4 w-[40rem]">
        <p className="text-gray-600 font-medium">12 Commentaire</p>
        <button className="text-gray-500 text-sm flex items-center space-x-1">
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
        </button>
      </div>

      {/* Commentaire 1 */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 w-[40rem]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
          <div>
            <p className="font-semibold">Mary Lewis</p>
            <p className="text-gray-400 text-xs">18/08/2025</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm mb-3">
          Just watched the latest Bollywood blockbuster! The songs were so
          catchy, and the dance numbers were breathtaking...
        </p>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center space-x-4"></div>
          <div className="flex flex-row space-x-2">
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-white" />
          </div>
        </div>
      </div>

      {/* Commentaire 2 */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 w-[40rem]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
          <div>
            <p className="font-semibold">James Anderson</p>
            <p className="text-gray-400 text-xs">18/08/2025</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm mb-3">
          Bollywood romance movies have a special charm that transports viewers
          into a world of love, passion, and emotion...
        </p>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center space-x-4"></div>
          <div className="flex flex-row space-x-2">
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-white" />
          </div>
        </div>
      </div>

      {/* Commentaire 3 */}
      <div className="bg-white rounded-lg shadow p-4 mb-4 w-[40rem]">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
          <div>
            <p className="font-semibold">William Hernandez</p>
            <p className="text-gray-400 text-xs">18/08/2025</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm mb-3">
          These films are renowned for their hilarious antics, witty dialogue,
          and comedic timing that keep audiences laughing non-stop...
        </p>
        <div className="flex items-center justify-between text-gray-500 text-xs">
          <div className="flex items-center space-x-4"></div>
          <div className="flex flex-row space-x-2">
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-amber-400" />
            <FaStar className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
