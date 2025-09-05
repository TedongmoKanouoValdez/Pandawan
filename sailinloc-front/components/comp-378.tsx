import {
  BookIcon,
  InfoIcon,
  LifeBuoyIcon,
  MessageCircleMoreIcon,
} from "lucide-react";
import { RiInformationLine } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { RiRefund2Line } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@heroui/react";

export default function Component() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none"
          aria-label="Open edit menu"
        >
          <InfoIcon size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pb-2">
        <DropdownMenuLabel>Besoin d aide ?</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="/">
            <RiInformationLine
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            À propos de nous
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="/">
            <RiCustomerService2Line
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Service client
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer py-1 focus:bg-transparent focus:underline"
          asChild
        >
          <Link href="/">
            <RiRefund2Line
              size={16}
              className="opacity-60"
              aria-hidden="true"
            />
            Politique de remboursement
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
