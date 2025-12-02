
"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useCollection } from "@/firebase/firestore/use-collection";
import { initializeFirebase, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import type { ChatMessage } from "@/lib/types";
import { sendChatMessage } from "@/lib/orders-service";
import Link from 'next/link';
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogIn, Send, Loader2, Crown, Shield } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const { firestore } = initializeFirebase();

function ChatBubble({ message, isCurrentUser }: { message: ChatMessage, isCurrentUser: boolean }) {
    const bubbleAlignment = isCurrentUser ? "justify-end" : "justify-start";
    const bubbleClasses = {
        base: "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
        general: "bg-white text-black",
        vip: "bg-gradient-to-br from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/20",
        admin: "bg-gradient-to-br from-cyan-400 to-blue-600 text-white font-bold",
    };
    
    const roleClass = bubbleClasses[message.role] || bubbleClasses.general;
    const alignmentClass = isCurrentUser ? "rounded-br-none" : "rounded-bl-none";

    const timestampDate = message.timestamp?.toDate ? message.timestamp.toDate() : new Date();
    const timeAgo = formatDistanceToNow(timestampDate, { addSuffix: true, locale: es });
    
    const RoleIcon = () => {
        if(message.role === 'vip') return <Crown className="h-4 w-4 text-amber-300 inline-block mr-1" />;
        if(message.role === 'admin') return <Shield className="h-4 w-4 text-cyan-200 inline-block mr-1" />;
        return null;
    }

    return (
        <div className={`flex items-end gap-2 ${bubbleAlignment}`}>
            <div className={cn("flex-shrink-0", isCurrentUser && "order-2")}>
                {/* Optional: Avatar could go here */}
            </div>
            <div className={cn("flex-shrink-0", isCurrentUser ? "order-1" : "")}>
                <div className={cn(bubbleClasses.base, roleClass, alignmentClass)}>
                    {!isCurrentUser && (
                        <p className="text-xs font-bold mb-1 opacity-80 flex items-center">
                            <RoleIcon /> {message.userName}
                        </p>
                    )}
                    <p className="text-sm break-words">{message.text}</p>
                </div>
                 <p className={cn("text-xs text-gray-500 mt-1", isCurrentUser ? "text-right" : "text-left")}>{timeAgo}</p>
            </div>
        </div>
    );
}

export default function ChatPage() {
    const { user, isGuest } = useApp();
    const [newMessage, setNewMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const messagesQuery = useMemoFirebase(() => 
        query(collection(firestore, "chat_messages"), orderBy("timestamp", "asc"))
    , [firestore]);

    const { data: messages, isLoading } = useCollection<ChatMessage>(messagesQuery);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user) return;
        
        setIsSending(true);
        try {
            await sendChatMessage(user.email, user.username, user.email, newMessage.trim());
            setNewMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
            // Optionally, show a toast notification
        } finally {
            setIsSending(false);
        }
    };
    
    if (isGuest) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <Card className="bg-gray-900 border-gray-800 w-full max-w-md text-center">
                <CardHeader className="items-center">
                    <LogIn className="h-12 w-12 text-yellow-400 mb-4"/>
                    <CardTitle className="text-white">Únete a la conversación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-400">El chat es exclusivo para miembros registrados. ¡Inicia sesión para participar!</p>
                    <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500">
                        <Link href="/mobileapp/login">Iniciar Sesión / Registrarse</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      );
    }
  
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-yellow-400">JK FESTIVAL FEBRERO CHAT</h1>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-6 p-4">
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <Loader2 className="h-8 w-8 text-yellow-400 animate-spin" />
                    </div>
                )}
                {!isLoading && messages?.map(msg => (
                    <ChatBubble key={msg.id} message={msg} isCurrentUser={msg.userId === user?.email} />
                ))}
                 <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-1 bg-gray-800 border-gray-700 text-white"
                        disabled={isSending}
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim() || isSending}>
                        {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    </Button>
                </form>
            </div>
        </div>
    );
}
