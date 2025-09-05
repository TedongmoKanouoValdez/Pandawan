"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, CreditCard } from "lucide-react";

export const Component = ({
  proprietaireId,
  userId,
}: {
  proprietaireId: number;
  userId: number;
}) => {
  const [bateaux, setBateaux] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [bateauxRes, reservationsRes, messagesRes] = await Promise.all([
          fetch(
            `http://localhost:3001/api/bateaux/proprietaire/${proprietaireId}`
          ),
          fetch(
            `http://localhost:3001/api/reservations/proprietaire/${proprietaireId}`
          ),
          fetch(
            `http://localhost:3001/messages?userId=${userId}&type=recus`
          ), // ou type=envoyes
        ]);

        const bateauxData = await bateauxRes.json();
        const reservationsData = await reservationsRes.json();
        const messagesData = await messagesRes.json();

        setBateaux(bateauxData.bateaux || []);
        setReservations(reservationsData.reservations || []);
        setMessages(messagesData.messages || []);
      } catch (err) {
        console.error("Erreur front:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [proprietaireId, userId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="grid grid-cols-3 gap-6 w-full mx-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            nombre de bateaux
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bateaux.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">réservations</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reservations.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{messages.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};
