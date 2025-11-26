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
    <Card className="overflow-hidden group transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 transform will-change-transform">
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <Image
            src={artist.imageUrl}
            alt={`Foto de ${artist.name}`}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            data-ai-hint="artist portrait"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
             <div className="text-xs font-semibold bg-primary/80 backdrop-blur-sm px-2 py-1 rounded-full">
                {artist.stage} - {artist.time}
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <h3 className="text-xl">{artist.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{artist.description}</p>
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
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Lineup & Horarios</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre los talentos de Golden Epiphany que harán historia. Filtra por escenario para planificar tu experiencia.
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
              {filteredArtists.map((artist, index) => (
                <div key={artist.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`}}>
                    <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <Card>
              <CardContent className="p-0 md:p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] font-bold">Hora</TableHead>
                      {stages.map(stage => (
                        <TableHead key={stage} className="font-bold">{stage}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from(new Set(artists.map(a => a.time))).sort().map(time => (
                      <TableRow key={time} className="transition-colors hover:bg-muted/50">
                        <TableCell className="font-medium text-primary">{time}</TableCell>
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
