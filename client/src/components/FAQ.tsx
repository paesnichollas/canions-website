import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "1",
    question: "Qual é a distância total da prova?",
    answer:
      "A Cânions Ultramarathon Xtreme 106K possui 106 quilômetros de percurso desafiador pelos cânions do São Francisco, em Piranhas, Alagoas.",
  },
  {
    id: "2",
    question: "Qual é o tempo limite para completar a prova?",
    answer:
      "O tempo limite é de 30 horas para a categoria Solo. Para equipes, o tempo limite varia conforme a categoria (Dupla, Quarteto, Sexteto e Decateto).",
  },
  {
    id: "3",
    question: "Preciso ter experiência anterior em ultramaratonas?",
    answer:
      "Para a categoria Solo, é altamente recomendado ter experiência em corridas de longa distância. Para as categorias em equipe, a experiência pode ser compartilhada entre os atletas.",
  },
  {
    id: "4",
    question: "Qual é o valor da inscrição?",
    answer:
      "Os valores de inscrição variam conforme a categoria. Entre em contato conosco para obter informações atualizadas sobre os preços.",
  },
  {
    id: "5",
    question: "Há apoio técnico durante a prova?",
    answer:
      "Sim, há postos de apoio estrategicamente distribuídos ao longo do percurso com água, alimentos e suporte médico.",
  },
  {
    id: "6",
    question: "Posso desistir durante a prova?",
    answer:
      "Sim, a segurança dos atletas é prioridade. Você pode desistir a qualquer momento informando aos postos de apoio.",
  },
  {
    id: "7",
    question: "Como funciona a chipagem eletrônica?",
    answer:
      "Cada atleta recebe um chip que registra automaticamente sua passagem nos postos de controle. Os resultados são disponibilizados em tempo real.",
  },
  {
    id: "8",
    question: "Há limite de inscrições?",
    answer:
      "Sim, as inscrições são limitadas para garantir a segurança e qualidade da experiência. Recomenda-se inscrever-se com antecedência.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-16">
      <div className="container max-w-2xl">
        <h2 className="text-4xl font-bold text-ink mb-12 text-center">
          Perguntas Frequentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-lg font-bold text-ink hover:text-blue-700">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

