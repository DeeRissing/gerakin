export default function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">

      {/* SMALL LABEL */}

      {eyebrow && (
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-gerakin-blue sm:text-sm">
          {eyebrow}
        </p>
      )}

      {/* TITLE */}

      <h2 className="text-2xl font-black tracking-tight text-gerakin-navy sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {/* DESCRIPTION */}

      {description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
          {description}
        </p>
      )}

    </div>
  );
}