"use client";

import * as React from "react";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Tag = {
  id: string;
  label: string;
};

type TagsSelectorProps = {
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  inputs: Record<string, string>;
  setInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export function TagsSelector({
  tags,
  selectedTags,
  setSelectedTags,
  inputs,
  setInputs,
}: TagsSelectorProps) {
  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedTags]);

  return (
    <div className="max-w-lg w-full flex flex-col">
      <motion.h2 layout className="text-sm">
        Options payantes ou en supplément
      </motion.h2>
      <motion.div
        className="w-full flex items-center justify-start gap-1.5 bg-white border h-14 mt-2 mb-3 overflow-x-auto p-1.5 no-scrollbar"
        style={{
          borderRadius: 16,
        }}
        ref={selectedsContainerRef}
        layout
      >
        {selectedTags.map((tag) => (
          <motion.div
            key={tag.id}
            className="flex items-center gap-1 pl-3 pr-1 py-1 bg-white shadow-md border h-full shrink-0"
            style={{
              borderRadius: 14,
            }}
            layoutId={`tag-${tag.id}`}
          >
            <motion.span
              layoutId={`tag-${tag.id}-label`}
              className="text-gray-700 font-medium text-sm"
            >
              {tag.label}
            </motion.span>
            <button
              onClick={() => removeSelectedTag(tag.id)}
              className="p-1 rounded-full"
            >
              <X className="size-5 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="space-y-3 mb-4">
        {selectedTags.map((tag) => (
          <div key={tag.id}>
            <label className="block text-sm font-medium mb-1">
              Détail pour {tag.label}
            </label>
            <input
              type="text"
              value={inputs[tag.id] || ""}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [tag.id]: e.target.value,
                }))
              }
              placeholder={`Entrez une info pour ${tag.label}`}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}
      </motion.div>
      {tags.length > selectedTags.length && (
        <motion.div
          className="bg-white shadow-sm p-2 border w-full"
          style={{
            borderRadius: 16,
          }}
          layout
        >
          <motion.div className="flex flex-wrap gap-2">
            {tags
              .filter(
                (tag) =>
                  !selectedTags.some((selected) => selected.id === tag.id)
              )
              .map((tag) => (
                <motion.button
                  key={tag.id}
                  layoutId={`tag-${tag.id}`}
                  className="flex items-center gap-1 px-4 py-2.5 bg-gray-100/60 rounded-full shrink-0"
                  onClick={() => addSelectedTag(tag)}
                  style={{
                    borderRadius: 14,
                  }}
                >
                  <motion.span
                    layoutId={`tag-${tag.id}-label`}
                    className="text-gray-700 font-medium text-sm"
                  >
                    {tag.label}
                  </motion.span>
                </motion.button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
"use client";

import * as React from "react";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Tag = {
  id: string;
  label: string;
};

type TagsSelectorProps = {
  tags: Tag[];
};

export function TagsSelector({ tags }: TagsSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const selectedsContainerRef = useRef<HTMLDivElement>(null);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const removeSelectedTag = (id: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedTags]);

  return (
    <div className="max-w-lg w-full flex flex-col">
      <motion.h2 layout className="text-sm">
        Options payantes ou en supplément
      </motion.h2>
      <motion.div
        className="w-full flex items-center justify-start gap-1.5 bg-white border h-14 mt-2 mb-3 overflow-x-auto p-1.5 no-scrollbar"
        style={{
          borderRadius: 16,
        }}
        ref={selectedsContainerRef}
        layout
      >
        {selectedTags.map((tag) => (
          <motion.div
            key={tag.id}
            className="flex items-center gap-1 pl-3 pr-1 py-1 bg-white shadow-md border h-full shrink-0"
            style={{
              borderRadius: 14,
            }}
            layoutId={`tag-${tag.id}`}
          >
            <motion.span
              layoutId={`tag-${tag.id}-label`}
              className="text-gray-700 font-medium text-sm"
            >
              {tag.label}
            </motion.span>
            <button
              onClick={() => removeSelectedTag(tag.id)}
              className="p-1 rounded-full"
            >
              <X className="size-5 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="space-y-3 mb-4">
        {selectedTags.map((tag) => (
          <div key={tag.id}>
            <label className="block text-sm font-medium mb-1">
              Détail pour {tag.label}
            </label>
            <input
              type="text"
              value={inputs[tag.id] || ""}
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  [tag.id]: e.target.value,
                }))
              }
              placeholder={`Entrez une info pour ${tag.label}`}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}
      </motion.div>
      {tags.length > selectedTags.length && (
        <motion.div
          className="bg-white shadow-sm p-2 border w-full"
          style={{
            borderRadius: 16,
          }}
          layout
        >
          <motion.div className="flex flex-wrap gap-2">
            {tags
              .filter(
                (tag) =>
                  !selectedTags.some((selected) => selected.id === tag.id)
              )
              .map((tag) => (
                <motion.button
                  key={tag.id}
                  layoutId={`tag-${tag.id}`}
                  className="flex items-center gap-1 px-4 py-2.5 bg-gray-100/60 rounded-full shrink-0"
                  onClick={() => addSelectedTag(tag)}
                  style={{
                    borderRadius: 14,
                  }}
                >
                  <motion.span
                    layoutId={`tag-${tag.id}-label`}
                    className="text-gray-700 font-medium text-sm"
                  >
                    {tag.label}
                  </motion.span>
                </motion.button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
