"use client";

import { useState } from 'react';
import Image from 'next/image';
import { artists } from '@/lib/data';
import type { Artist } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={artist.imageUrl}
            alt={`Foto de ${artist.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="artist portrait"
          />
        </div>
        <div className="p-4 border-t">
          <h3 className="text-xl font-bold font-headline">{artist.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{artist.description}</p>
          <div className="text-xs text-primary font-semibold mt-2">
            {artist.stage} - {artist.time}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export default function LineupPage() {
  const [activeTab, setActiveTab] = useState('all');

  const stages: Artist['stage'][] = ['Main Stage', 'Urban Stage', 'Electronic Stage'];

  const filteredArtists = artists.filter(artist => {
    if (activeTab === 'all') return true;
    return artist.stage === activeTab;
  });

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-screen-xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Lineup & Horarios</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre los artistas que harán historia en el JK Festival. Filtra por escenario para planificar tu experiencia.
          </p>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto mb-8">
            <TabsTrigger value="grid">Cartel</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid">
            <div className="flex justify-center mb-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="Main Stage">Main Stage</TabsTrigger>
                        <TabsTrigger value="Urban Stage">Urban Stage</TabsTrigger>
                        <TabsTrigger value="Electronic Stage">Electronic Stage</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtists.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Hora</TableHead>
                      {stages.map(stage => (
                        <TableHead key={stage}>{stage}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from(new Set(artists.map(a => a.time))).sort().map(time => (
                      <TableRow key={time}>
                        <TableCell className="font-medium">{time}</TableCell>
                        {stages.map(stage => {
                          const artist = artists.find(a => a.time === time && a.stage === stage);
                          return (
                            <TableCell key={stage}>
                              {artist ? (
                                <div className="font-semibold">{artist.name}</div>
                              ) : (
                                <div className="text-muted-foreground">-</div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
