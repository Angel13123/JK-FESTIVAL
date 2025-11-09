"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { artists as mockArtists } from "@/lib/data";
import type { Artist } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit } from "lucide-react";
import Image from "next/image";

const artistSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "El nombre es obligatorio."),
  description: z.string().min(10, "La descripción es muy corta."),
  imageUrl: z.string().url("Debe ser una URL de imagen válida."),
  day: z.coerce.number().min(1, "El día es obligatorio."),
  stage: z.enum(['Main Stage', 'Urban Stage', 'Electronic Stage']),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "El formato debe ser HH:MM"),
});

type ArtistFormData = z.infer<typeof artistSchema>;

function ArtistForm({ artist, onSave, closeDialog }: { artist?: ArtistFormData; onSave: (data: ArtistFormData) => void; closeDialog: () => void }) {
  const form = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: artist || { name: "", description: "", imageUrl: "https://picsum.photos/seed/newartist/400/400", day: 1, stage: "Main Stage", time: "18:00" },
  });

  function onSubmit(data: ArtistFormData) {
    onSave(data);
    closeDialog();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem><FormLabel>Nombre del Artista</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem><FormLabel>Descripción</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="imageUrl" render={({ field }) => (
          <FormItem><FormLabel>URL de la Imagen</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-3 gap-4">
          <FormField control={form.control} name="day" render={({ field }) => (
            <FormItem><FormLabel>Día</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="time" render={({ field }) => (
            <FormItem><FormLabel>Hora (HH:MM)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="stage" render={({ field }) => (
             <FormItem><FormLabel>Escenario</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Main Stage">Main Stage</SelectItem>
                    <SelectItem value="Urban Stage">Urban Stage</SelectItem>
                    <SelectItem value="Electronic Stage">Electronic Stage</SelectItem>
                  </SelectContent>
                </Select>
             <FormMessage /></FormItem>
          )} />
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default function AdminLineupPage() {
  const [artists, setArtists] = useState<Artist[]>(mockArtists);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtist, setEditingArtist] = useState<Artist | undefined>(undefined);
  
  const handleSave = (data: ArtistFormData) => {
    // TODO: This should be an API call.
    if (editingArtist) {
      setArtists(artists.map(a => a.id === editingArtist.id ? { ...a, ...data } : a));
    } else {
      setArtists([...artists, { ...data, id: `artist_${Date.now()}` }]);
    }
    setEditingArtist(undefined);
  };
  
  const openEditDialog = (artist: Artist) => {
    setEditingArtist(artist);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingArtist(undefined);
    setIsDialogOpen(true);
  };


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-headline">Gestionar Lineup</h1>
          <p className="text-muted-foreground">Añade o edita los artistas del festival.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}><PlusCircle className="mr-2 h-4 w-4" />Añadir Artista</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingArtist ? "Editar" : "Añadir"} Artista</DialogTitle>
              <DialogDescription>Completa los detalles del artista y su actuación.</DialogDescription>
            </DialogHeader>
            <ArtistForm artist={editingArtist} onSave={handleSave} closeDialog={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Artista</TableHead>
              <TableHead>Día</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Escenario</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.map((artist) => (
              <TableRow key={artist.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Image src={artist.imageUrl} alt={artist.name} width={40} height={40} className="rounded-full object-cover" />
                    <span>{artist.name}</span>
                  </div>
                </TableCell>
                <TableCell>{artist.day}</TableCell>
                <TableCell>{artist.time}</TableCell>
                <TableCell>{artist.stage}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(artist)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
