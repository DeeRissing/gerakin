export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <article
      className="
        group
        rounded-3xl
        border
        border-sky-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-sky-300
        hover:shadow-lg
        hover:shadow-sky-100
      "
    >
      {/* ICON */}

      <div
        className="
          mb-5
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-sky-100
          text-gerakin-blue
          transition-colors
          group-hover:bg-gerakin-blue
          group-hover:text-white
        "
      >
        <Icon size={28} strokeWidth={2.2} aria-hidden="true" />
      </div>

      {/* TITLE */}

      <h3 className="text-lg font-extrabold text-gerakin-navy">
        {title}
      </h3>

      {/* DESCRIPTION */}

      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </article>
  );
}