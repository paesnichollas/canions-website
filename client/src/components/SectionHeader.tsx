import { type ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SectionHeaderProps = {
  /** texto da pílula acima do título (ex.: "INSCRIÇÕES") */
  badge?: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

/**
 * Cabeçalho padrão de seção (padrão NewLife): pílula opcional + título +
 * divisor em gradiente + subtítulo opcional, com reveal ao rolar.
 */
export default function SectionHeader({
  badge,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      {badge && (
        <div className="mb-5">
          <span className="badge-pill">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            {badge}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-amber-500">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-amber-500" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--text-sec)] md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
