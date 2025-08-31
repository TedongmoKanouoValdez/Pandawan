"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useDraggable,
} from "@heroui/modal";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CheckCircle2Icon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
}

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function ModalDelete({ userId, onDelete, userName, user }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });
  const [showEditUser, setShowEditUser] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(() => {
    const saved = localStorage.getItem("editingUser");
    return saved ? JSON.parse(saved) : null;
  });
  const modalCloseRef = useRef<() => void>(null);
  const [selectedUserName, setSelectedUserName] = useState("");
  const { id, prenom, nom, email, telephone, adresse } = user;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/utilisateur/${userId}`,
        {
          method: "DELETE",
        }
      );

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorText = contentType?.includes("application/json")
          ? await response.json()
          : await response.text();
        throw new Error(`Erreur suppression : ${JSON.stringify(errorText)}`);
      }

      const result = contentType?.includes("application/json")
        ? await response.json()
        : null;

      alert(result?.message ?? "Utilisateur supprimé avec succès");

      // // Appelle le callback pour rafraîchir le tableau
      // if (onDelete) {
      //   onDelete();
      // }

      // Fermer la modale après 2 secondes
      setTimeout(() => {
        if (modalCloseRef.current) {
          modalCloseRef.current(); // 👈 appelle la fonction de fermeture
        }
      }, 1000);

      // Tu peux aussi ici rafraîchir ton tableau si besoin
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  React.useEffect(() => {
    if (editingUser) {
      localStorage.setItem("editingUser", JSON.stringify(editingUser));
    }
  }, [editingUser]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setShowEditUser(true);
              setEditingUser(user);
            }}
          >
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setSelectedUserName(userName); // définit le nom sélectionné
              onOpen(); // ouvre la modale
            }}
          >
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserPanel
        open={showEditUser}
        editingUser={editingUser}
        onClose={() => setShowEditUser(false)}
      />

      <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => {
            modalCloseRef.current = onClose; // stocke la fonction pour usage plus tard
            return (
              <>
                <ModalHeader {...moveProps} className="flex flex-col gap-1">
                  Supprimer un utilisateur
                </ModalHeader>
                <ModalBody>
                  <p>
                    Voulez-vous vraiment supprimer cet utilisateur?{" "}
                    <strong>{selectedUserName}</strong>
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button variant="light" onClick={onClose}>
                    Fermer
                  </Button>
                  <Button
                    className="bg-red-600 text-white font-bold hover:bg-red-800"
                    onClick={handleDelete}
                  >
                    Supprimer
                  </Button>
                </ModalFooter>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom",
    header: "Nom complet",
    cell: ({ row }) => {
      const user = row.original;
      return <span>{user.nomcomplet}</span>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.email}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "telephone",
    header: "Téléphone",
    cell: ({ row }) => <span>{row.original.telephone || "Non renseigné"}</span>,
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
    cell: ({ row }) => <span>{row.original.adresse || "Non renseignée"}</span>,
  },
  {
    accessorKey: "nbbateau",
    header: () => <div className="w-full">Nombre de bateaux</div>,
    cell: ({ row }) => <span>{row.original.nbbateau ?? 0}</span>,
  },

  {
    accessorKey: "role",
    header: "Rôle",
    cell: ({ row }) => <span>{row.original.role || "Non renseignée"}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { id, prenom, nom, email, telephone, adresse, role, photoProfil } =
        row.original;

      return (
        <ModalDelete
          userId={user.id}
          userName={`${user.prenom} ${user.nom}`}
          user={{
            id,
            prenom,
            nom,
            email,
            telephone,
            adresse,
            role,
            photoProfil,
          }}
          //onDelete={onRefresh} // <- pour rafraîchir la liste après suppression
        />
      );
    },
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const [showAddUser, setShowAddUser] = React.useState(false);
  const [showEditUser, setShowEditUser] = React.useState(false);

  return (
    <Tabs
      defaultValue="outline"
      className="flex w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance" className="gap-1">
            Past Performance{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel" className="gap-1">
            Key Personnel{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="lg"
            className="font-bold text-white bg-black"
            onClick={() => setShowAddUser(true)}
          >
            <PlusIcon />
            <span className="hidden lg:inline">Ajouter un utilisateur</span>
          </Button>
          <AddUserPanel
            open={showAddUser}
            onClose={() => setShowAddUser(false)}
          />
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.header}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>{item.header}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          <div className="flex items-center justify-center py-[2rem]">
            <Avatar
              classNames={{
                base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-[7rem] h-[7rem]",
                icon: "text-black/80",
              }}
              icon={<AvatarIcon />}
            />
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Nom complet</Label>
              <Input id="header" defaultValue={item.header} disabled />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Email</Label>
              <Input id="header" defaultValue={item.header} disabled />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Téléphone</Label>
              <Input id="header" defaultValue={item.header} disabled />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Nombre de bateaux</Label>
              <Input id="header" defaultValue={item.header} disabled />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Date d'inscription</Label>
              <Input id="header" defaultValue="18/08/2025" disabled />
            </div>
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Rôle</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Selectionne un role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CLIENT">Client</SelectItem>
                    <SelectItem value="PROPRIETAIRE">Propriétaire</SelectItem>
                    <SelectItem value="ADMIN">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <Button className="w-full">Modifier</Button>
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button className="w-full bg-red-700 text-white font-medium">
                  Supprimer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Supprimer cet utilisateur ?</DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <p>
                    Cette action est définitive et entraînera la perte
                    irréversible de toutes ses données associées.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Annuler</Button>
                  </DialogClose>
                  <Button className="bg-red-700 text-white font-medium">
                    Supprimer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Fermer
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function AddUserPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!open) {
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setMotDePasse("");
      setRole("");
      setImageFile(null);
      setImageSrc(null);
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  function handleAvatarClick() {
    inputFileRef.current?.click();
  }

  // exploiter ceci pour l'image
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setImageFile(file);
  }

  function handleRemoveImage() {
    setImageSrc(null);
    setImageFile(null);

    // Optionnel: reset aussi l'input file pour pouvoir recharger la même image après suppression
    if (inputFileRef.current) inputFileRef.current.value = "";
  }

  function validateForm() {
    const newErrors = {};
    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|fr|net|org|edu|gov|io|info|co|biz)$/;
    if (!prenom.trim()) newErrors.prenom = "Le prenom  est requis";
    if (!nom.trim()) newErrors.nom = "Le nom  est requis";
    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format d'email invalide";
    }
    if (!motDePasse.trim()) newErrors.motDePasse = "Le mot de passe est requis";
    if (!role.trim()) newErrors.role = "Le role  est requis";
    if (!imageFile) newErrors.photoProfil = "La photo est requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // retourne vrai si pas d'erreurs
  }

  // code de creation utilisateur backend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      return; // Stoppe si erreurs, n’envoie pas le formulaire
      console.log("Formulaire validé !");
    }

    setIsLoading(true); // Commence le chargement

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email.trim().toLowerCase());
    formData.append("motDePasse", motDePasse);
    formData.append("telephone", telephone);
    formData.append("role", role);
    if (imageFile) {
      formData.append("photoProfil", imageFile);
    }

    try {
      const res = await fetch("http://localhost:3001/api/utilisateur", {
        method: "POST",
        body: formData,
      });

      const responseText = await res.text(); // Consomme le corps ici
      console.log("Status de la réponse :", res.status);
      console.log("Texte de la réponse :", responseText);

      if (!res.ok) {
        if (res.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: "Cet email est déjà utilisé",
          }));
        } else {
          throw new Error("Erreur lors de l'ajout");
        }
        setIsLoading(false);
        return;
      }

      const data = JSON.parse(responseText); // Parse manuellement en JSON
      console.log("Utilisateur ajouté :", data);
      //alert("Utilisateur créé avec succès !");

      setSuccessMessage("Utilisateur créé avec succès !");
      setTimeout(() => setSuccessMessage(""), 4000);

      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setRole("");
      handleRemoveImage();

      onClose(); // Ferme le panneau si tout s'est bien passé
    } catch (error) {
      console.error("Erreur lors de la création :", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  }
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Ajouter un utilisateur</SheetTitle>
        </SheetHeader>

        {open && (
          <form
            className="flex flex-col gap-4 flex-1 overflow-y-auto py-4 text-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col items-center justify-center py-[2rem] gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              {submitted && errors.photoProfil && (
                <span className="text-red-500 text-sm">
                  {errors.photoProfil}
                </span>
              )}
              <Avatar
                src={imageSrc || undefined}
                onClick={handleAvatarClick}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-[7rem] h-[7rem] cursor-pointer",
                  icon: "text-black/80",
                }}
                icon={!imageSrc ? <AvatarIcon /> : undefined}
                radius="full"
                size="lg"
              />
              {imageSrc && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="w-[7rem]"
                >
                  Supprimer l'image
                </Button>
              )}
            </div>
            <Input
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            {submitted && errors.prenom && (
              <p className="text-red-600 text-sm mt-1">{errors.prenom}</p>
            )}
            <Input
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            {submitted && errors.nom && (
              <span className="text-red-500 text-sm">{errors.nom}</span>
            )}
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submitted && errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            <Input
              placeholder="Mot de passe"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
            {submitted && errors.motDePasse && (
              <span className="text-red-500 text-sm">{errors.motDePasse}</span>
            )}
            <Input
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />

            {/* Autres champs si besoin */}
            <Select value={role} onValueChange={(val) => setRole(val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="PROPRIETAIRE">Propriétaire</SelectItem>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
            {submitted && errors.role && (
              <span className="text-red-500 text-sm">{errors.role}</span>
            )}

            {successMessage && (
              <p className="text-green-600 text-sm text-center">
                {successMessage}
              </p>
            )}
            <div className="mt-auto flex gap-2">
              <Button type="submit" className="w-full">
                {isLoading ? "Chargement..." : "Ajouter"}
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Annuler
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

function EditUserPanel({
  open,
  onClose,
  editingUser,
}: {
  open: boolean;
  onClose: () => void;
  editingUser: User | null;
}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState("");
  const [urlProfileDefault, setUrlProfileDefault] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);

  // console.log(editingUser);

  useEffect(() => {
    if (!open) {
      setNom("");
      setPrenom("");
      setEmail("");
      setTelephone("");
      setMotDePasse("");
      setRole("");

      setImageFile(null);
      setImageSrc(null);
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  // Quand editingUser change, on met à jour les states avec ses valeurs
  useEffect(() => {
    if (open && editingUser) {
      setNom(editingUser.nom);
      setPrenom(editingUser.prenom);
      setEmail(editingUser.email);
      setTelephone(editingUser.telephone);
      setRole(editingUser.role || "");
      setUrlProfileDefault(editingUser.photoProfil || "");
      setMotDePasse(""); // mot de passe non pré-rempli pour la sécurité
    }
  }, [open, editingUser]);

  function handleAvatarClick() {
    inputFileRef.current?.click();
  }

  // exploiter ceci pour l'image
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setImageFile(file);
  }

  function handleRemoveImage() {
    setImageSrc(null);
    setImageFile(null);

    // Optionnel: reset aussi l'input file pour pouvoir recharger la même image après suppression
    if (inputFileRef.current) inputFileRef.current.value = "";
  }

  // code de creation utilisateur backend
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);

    setIsLoading(true);

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("telephone", telephone);
    formData.append("role", role);

    // N’envoie le mot de passe que si l’utilisateur en a saisi un nouveau
    if (motDePasse.trim()) {
      formData.append("motDePasse", motDePasse);
    }

    // N’envoie la photo que si elle a été modifiée
    if (imageFile) {
      formData.append("photoProfil", imageFile);
    }

    try {
      const res = await fetch(
        `http://localhost:3001/api/utilisateur/${editingUser?.id}`,
        {
          method: "PUT",
          body: formData, // fetch gère automatiquement le Content-Type ici
        }
      );

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const data = await res.json();
      console.log("Utilisateur mis à jour :", data);
      alert("Utilisateur mis à jour avec succès !");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log("urlProfileDefault");
  // console.log(editingUser.photoProfil);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Modifier un utilisateur</SheetTitle>
        </SheetHeader>

        {open && (
          <form
            className="flex flex-col gap-4 flex-1 overflow-y-auto py-4 text-sm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2>
              Modifier {editingUser.prenom} {editingUser.nom}
            </h2>
            <div className="flex flex-col items-center justify-center py-[2rem] gap-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
              {submitted && errors.photoProfil && (
                <span className="text-red-500 text-sm">
                  {errors.photoProfil}
                </span>
              )}
              <Avatar
                src={imageSrc || urlProfileDefault || undefined}
                onClick={handleAvatarClick}
                classNames={{
                  base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] w-[7rem] h-[7rem] cursor-pointer",
                  icon: "text-black/80",
                }}
                icon={
                  !imageSrc && !urlProfileDefault ? <AvatarIcon /> : undefined
                }
                radius="full"
                size="lg"
              />
              {imageSrc && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="w-[7rem]"
                >
                  Supprimer l'image
                </Button>
              )}
            </div>
            <Input
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            {submitted && errors.prenom && (
              <p className="text-red-600 text-sm mt-1">{errors.prenom}</p>
            )}
            <Input
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            {submitted && errors.nom && (
              <span className="text-red-500 text-sm">{errors.nom}</span>
            )}
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submitted && errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
            {/* <Input
              placeholder="Mot de passe"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
            {submitted && errors.motDePasse && (
              <span className="text-red-500 text-sm">{errors.motDePasse}</span>
            )} */}
            <Input
              placeholder="Téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />

            {/* Autres champs si besoin */}
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="PROPRIETAIRE">Propriétaire</SelectItem>
                <SelectItem value="ADMIN">Administrateur</SelectItem>
              </SelectContent>
            </Select>
            {submitted && errors.role && (
              <span className="text-red-500 text-sm">{errors.role}</span>
            )}

            {successMessage && (
              <p className="text-green-600 text-sm text-center">
                {successMessage}
              </p>
            )}
            <div className="mt-auto flex gap-2">
              <Button type="submit" className="w-full">
                {isLoading ? "Chargement..." : "modifier"}
              </Button>
              <Button variant="outline" onClick={onClose} className="w-full">
                Annuler
              </Button>
            </div>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
