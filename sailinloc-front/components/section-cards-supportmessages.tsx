import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoTicketSharp } from "react-icons/io5";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { Link } from "@heroui/link";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-2 grid grid-cols-2 gap-2 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Link href="/dashboard/support&messages/ticketsdesupportouverts">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Tickets de support ouverts</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              0
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <IoTicketSharp className="size-10" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Suivi des demandes d'assistance
            </div>
            <div className="text-muted-foreground">
              Consultez l'état des tickets de support envoyés par les
              utilisateurs. Suivez facilement les demandes en attente, en cours
              de traitement ou déjà résolues, pour assurer une gestion rapide et
              efficace du service client.
            </div>
          </CardFooter>
        </Card>
      </Link>
      <Link href="/dashboard/support&messages/messagesutilisateurs">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Messages utilisateurs</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              0
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <BiSolidMessageRoundedDetail className="size-10" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Centre de messagerie utilisateur
            </div>
            <div className="text-muted-foreground">
              Accédez à tous les messages envoyés par les utilisateurs, qu'il
              s'agisse de demandes de contact, de retours ou de communications
              internes. Gardez une vue centralisée pour ne manquer aucune
              interaction importante.
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
