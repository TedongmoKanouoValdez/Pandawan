import { useEffect, useState } from "react";
import { fetchMessages, Message } from "@/services/notifications";

export const useMessages = (
  token: string,
  userId: number,
  type: "recus" | "envoyes" = "recus"
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchMessages(token, userId, type);
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, type]);

  return { messages, setMessages, loading };
};
