

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data";

export default function FaqPage() {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto max-w-screen-md px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl tracking-tight">Preguntas Frecuentes</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes dudas? Aquí encontrarás las respuestas a las preguntas más comunes.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
             <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                <AccordionItem value={item.id} className="bg-card rounded-lg px-6 transition-shadow duration-300 hover:shadow-lg">
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline font-body text-black" style={{textShadow: 'none'}}>
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
