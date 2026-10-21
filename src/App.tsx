import { useEffect, useState, type FormEvent } from "react";
import { cn, Eyebrow, Monogram, PlateImage, Reveal, StatusTag } from "./lib";
import {
  CANADA,
  CONTACT,
  FAQ,
  LETTERS,
  LEDGER,
  SERVICES,
  STANDARD,
  UNITED_STATES,
} from "./data";

const NAV = [
  { id: "practice", no: "01", label: "Practice" },
  { id: "standard", no: "02", label: "Standard" },
  { id: "principal", no: "03", label: "Principal" },
  { id: "coverage", no: "04", label: "Coverage" },
  { id: "correspondence", no: "05", label: "Letters" },
  { id: "contact", no: "06", label: "Enquiries" },
];

const H2 = "display text-[clamp(2rem,4.2vw,3.35rem)]";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("practice");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Telephone: ${data.get("phone") || "—"}`,
      `Property location: ${data.get("location") || "—"}`,
      `Units: ${data.get("units") || "—"}`,
      `Property type: ${data.get("type") || "—"}`,
      "",
      String(data.get("note") ?? ""),
    ].join("\n");

    window.location.href = `${CONTACT.emailHref}?subject=${encodeURIComponent(
      `Management enquiry — ${name || "property owner"}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <div className="grain min-h-screen bg-page">
      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-page/92 backdrop-blur-[6px]">
        <div className="mx-auto flex h-[72px] max-w-[1160px] items-center justify-between px-5 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Monogram className="h-9 w-9 text-ink" />
            <span className="leading-none">
              <span className="display-soft block text-[15px] font-medium tracking-[0.02em]">
                BOILY REAL ESTATE
              </span>
              <span className="mt-[3px] block font-mono text-[9px] uppercase tracking-[0.28em] text-inksoft/80">
                Property Management
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.slice(0, 5).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="border-b border-transparent pb-[2px] font-mono text-[10px] uppercase tracking-[0.2em] text-inksoft transition-colors hover:border-wax hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="font-mono text-[11px] tracking-[0.06em] text-ink transition-colors hover:text-wax"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href="#contact"
              className="bg-ink px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-plate transition-colors hover:bg-wax"
            >
              Enquire
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center border border-rule text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-rule bg-plate lg:hidden">
            <div className="mx-auto max-w-[1160px] px-5 py-3 sm:px-6">
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-3 border-b border-rule py-3 last:border-b-0"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-wax">{item.no}</span>
                  <span className="display-soft text-[1.05rem]">{item.label}</span>
                </a>
              ))}
              <a
                href={CONTACT.phoneHref}
                className="mt-4 mb-2 block bg-ink px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-plate"
              >
                Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── Index rail (large screens) ───────────────────────────── */}
      <nav
        aria-label="Section index"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 2xl:block"
      >
        <ul className="space-y-3 border-l border-rule pl-4">
          {NAV.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="group flex items-center gap-2.5">
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.18em] transition-colors",
                    active === item.id ? "text-wax" : "text-inksoft/45"
                  )}
                >
                  {item.no}
                </span>
                <span
                  className={cn(
                    "h-px transition-all duration-300",
                    active === item.id ? "w-7 bg-wax" : "w-3 bg-rule group-hover:w-5"
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[9px] uppercase tracking-[0.18em] transition-colors",
                    active === item.id ? "text-ink" : "text-inksoft/50 group-hover:text-inksoft"
                  )}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main id="top">
        {/* ── Hero plate ─────────────────────────────────────────── */}
        <section className="px-5 pt-[112px] pb-14 sm:px-6 md:pt-[150px] md:pb-20">
          <div className="mx-auto max-w-[1160px]">
            <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-7">
                <Eyebrow>Est. Vermilion, Alberta · Canada &amp; the United States</Eyebrow>
                <h1 className="display mt-6 text-[clamp(2.4rem,6vw,4.6rem)] font-light">
                  Property management
                  <br className="hidden sm:block" /> with an{" "}
                  <span className="italic text-wax">owner&rsquo;s</span>
                  <br className="hidden sm:block" /> conscience.
                </h1>
                <p className="mt-7 max-w-[46ch] text-[1.02rem] leading-[1.7] text-inksoft">
                  Boily Real Estate — Property Management looks after residential portfolios
                  across Canada and in select United States markets. Tenants placed properly,
                  maintenance answered at night, and a monthly statement you can read
                  without having to call anybody.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <a
                    href="#contact"
                    className="bg-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-plate transition-colors hover:bg-wax"
                  >
                    Request a consultation
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="group font-mono text-[12px] tracking-[0.04em] text-ink"
                  >
                    or call{" "}
                    <span className="border-b border-wax/50 pb-[2px] group-hover:border-wax">
                      {CONTACT.phoneDisplay}
                    </span>
                  </a>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={140}>
                <figure>
                  <div className="flex items-baseline justify-between border-b border-rule pb-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft">
                      Plate I
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft/70">
                      Vermilion, Alberta
                    </span>
                  </div>
                  <div className="border border-t-0 border-rule bg-plate p-2">
                    <PlateImage
                      src="images/hero-plate.jpg"
                      alt="Joseph Boily standing in a sunlit, empty apartment"
                      className="aspect-[4/5] w-full object-cover object-[50%_28%]"
                      eager
                    />
                  </div>
                  <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft">
                    Joseph Boily — Principal
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            {/* Ledger strip */}
            <Reveal delay={120} className="mt-14 md:mt-20">
              <dl className="grid grid-cols-2 md:grid-cols-4">
                {LEDGER.map((item, i) => (
                  <div
                    key={item.figure}
                    className={cn(
                      "border-t border-rule py-6 pr-4 md:py-8 md:pr-8",
                      i > 0 && "md:border-l md:border-rule md:pl-8",
                      i % 2 === 1 && "border-l border-rule pl-4 md:pl-8"
                    )}
                  >
                    <dt className="display text-[clamp(1.9rem,3.4vw,2.6rem)] font-light">
                      {item.figure}
                    </dt>
                    <dd className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-inksoft">
                      {item.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ── No. 01 The Practice ────────────────────────────────── */}
        <section id="practice" className="border-t border-rule px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[1160px]">
            <Reveal className="grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <Eyebrow no="01">The Practice</Eyebrow>
                <h2 className={cn(H2, "mt-5 font-light")}>What we do, written down plainly.</h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-[0.95rem] leading-[1.75] text-inksoft">
                  Eight services, one invoice, one person accountable for the whole of it.
                  Nothing below is optional — it is the practice, in the order it happens.
                </p>
                <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-inksoft/70">
                  Residential portfolio management · Canada &amp; US
                </p>
              </div>
            </Reveal>

            <div className="mt-12">
              {SERVICES.map((service, i) => (
                <Reveal key={service.no} delay={i * 45}>
                  <article className="reg-row group relative border-t border-rule">
                    <span className="reg-tick absolute left-0 top-0 h-px w-full bg-wax" />
                    <div className="grid gap-y-2 px-1 py-6 transition-colors duration-300 group-hover:bg-plate md:grid-cols-12 md:gap-x-8 md:py-7">
                      <div className="font-mono text-[10px] tracking-[0.16em] text-inksoft/60 md:col-span-1">
                        No. {service.no}
                      </div>
                      <h3 className="display-soft text-[1.3rem] leading-snug transition-transform duration-300 group-hover:translate-x-1 md:col-span-4 md:text-[1.4rem]">
                        {service.title}
                      </h3>
                      <p className="max-w-[52ch] text-[0.93rem] leading-[1.7] text-inksoft md:col-span-5">
                        {service.body}
                      </p>
                      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-inksoft/70 md:col-span-2 md:text-right">
                        {service.scope}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
              <div className="border-t border-rule" />
            </div>
          </div>
        </section>

        {/* ── No. 02 The Standard ────────────────────────────────── */}
        <section id="standard" className="bg-ink px-5 py-16 text-white sm:px-6 md:py-24">
          <div className="mx-auto max-w-[1160px]">
            <Reveal>
              <Eyebrow no="02" tone="paper">
                The Boily Standard
              </Eyebrow>
              <h2 className={cn(H2, "mt-5 max-w-[18ch] font-light text-white")}>
                Four rules we do not bend.
              </h2>
            </Reveal>

            <div className="mt-12 grid border-t border-white/15 md:grid-cols-2">
              {STANDARD.map((item, i) => (
                <Reveal
                  key={item.no}
                  delay={i * 70}
                  className={cn(
                    "border-b border-white/15 p-7 md:p-9",
                    i % 2 === 0 && "md:border-r md:border-white/15"
                  )}
                >
                  <span className="display block text-[3rem] font-light leading-none text-white/25">
                    {item.no}
                  </span>
                  <h3 className="display-soft mt-4 text-[1.35rem] leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[0.93rem] leading-[1.75] text-white/65">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── No. 03 The Principal ───────────────────────────────── */}
        <section id="principal" className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <figure>
                <div className="flex items-baseline justify-between border-b border-rule pb-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft">
                    Plate II
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft/70">
                    Portrait
                  </span>
                </div>
                <div className="border border-t-0 border-rule bg-plate p-2">
                  <PlateImage
                    src="images/portrait-plate.jpg"
                    alt="Portrait of Joseph Boily, principal of Boily Real Estate"
                    className="aspect-[4/5] w-full object-cover object-[50%_22%]"
                  />
                </div>
                <figcaption className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft">
                  J. Boily · Vermilion, Alberta
                </figcaption>
              </figure>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={110}>
              <Eyebrow no="03">The Principal</Eyebrow>
              <blockquote className="display-soft mt-6 text-[clamp(1.4rem,2.5vw,2rem)] font-light italic leading-[1.3]">
                &ldquo;I don&rsquo;t just manage properties. I protect people&rsquo;s life
                savings &mdash; and I answer for them myself.&rdquo;
              </blockquote>

              <p className="dropcap mt-8 text-[1.02rem] leading-[1.8] text-inksoft">
                Joseph Boily has spent the better part of twenty years around residential
                buildings &mdash; first as a tradesman walking through other people&rsquo;s
                mistakes, then as the man owners call to prevent them. He built Boily Real
                Estate &mdash; Property Management around a single argument: a managed
                property should cost an owner worry, never money.
              </p>
              <p className="mt-4 text-[1.02rem] leading-[1.8] text-inksoft">
                He still walks every unit himself before a lease is signed, still takes the
                emergency call when a boiler goes at two in the morning, and still writes the
                line at the bottom of your statement that explains the month. It is a small
                firm, on purpose.
              </p>

              <dl className="mt-9 border-t border-rule">
                {[
                  { figure: "20+ yrs", label: "In residential property and the building trades" },
                  { figure: "Every statement", label: "Reviewed and initialled by the principal" },
                  { figure: "One number", label: "Owners reach Joseph directly, not a call centre" },
                ].map((fact) => (
                  <div
                    key={fact.figure}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-rule py-4"
                  >
                    <dt className="font-mono text-[12px] tracking-[0.04em] text-wax">
                      {fact.figure}
                    </dt>
                    <dd className="text-[0.92rem] text-inksoft">{fact.label}</dd>
                  </div>
                ))}
              </dl>

              <p className="display mt-8 text-[1.7rem] font-light italic text-ink">
                Joseph Boily
              </p>
              <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-inksoft">
                Principal · Boily Real Estate &mdash; Property Management
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Plate III — full-bleed band ────────────────────────── */}
        <figure className="relative">
          <PlateImage
            src="images/band-interior.jpg"
            alt="A completed turn: empty apartment with oak floors and window light"
            className="h-[38vh] min-h-[260px] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
          <figcaption className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/85 sm:left-6">
            Plate III &mdash; A completed turn, ready for tenancy · Edmonton, Alberta
          </figcaption>
        </figure>

        {/* ── No. 04 Coverage ────────────────────────────────────── */}
        <section id="coverage" className="px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[1160px]">
            <Reveal className="grid items-end gap-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <Eyebrow no="04">Coverage</Eyebrow>
                <h2 className={cn(H2, "mt-5 font-light")}>Canada first. The United States, by request.</h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-[0.95rem] leading-[1.75] text-inksoft">
                  We manage where we are licensed and where we can get to a unit the same day.
                  Everywhere else is taken on by request, with the same standards and the same
                  statement format.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-7">
                <h3 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink">
                  Canada &mdash; primary market
                </h3>
                <ul>
                  {CANADA.map((row) => (
                    <li
                      key={row.region}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-5"
                    >
                      <div>
                        <h4 className="display-soft text-[1.15rem]">{row.region}</h4>
                        <p className="mt-1 text-[0.86rem] leading-relaxed text-inksoft">
                          {row.cities}
                        </p>
                      </div>
                      <StatusTag status={row.status} />
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="lg:col-span-5" delay={110}>
                <h3 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink">
                  United States &mdash; select markets
                </h3>
                <ul>
                  {UNITED_STATES.map((row) => (
                    <li
                      key={row.region}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-5"
                    >
                      <div>
                        <h4 className="display-soft text-[1.15rem]">{row.region}</h4>
                        <p className="mt-1 text-[0.86rem] leading-relaxed text-inksoft">
                          {row.cities}
                        </p>
                      </div>
                      <StatusTag status={row.status} />
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-inksoft/70">
                  Cross-border owners keep one manager and one statement format
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── No. 05 Correspondence ──────────────────────────────── */}
        <section
          id="correspondence"
          className="border-t border-rule bg-plate px-5 py-16 sm:px-6 md:py-24"
        >
          <div className="mx-auto max-w-[1160px]">
            <Reveal>
              <Eyebrow no="05">Correspondence</Eyebrow>
              <h2 className={cn(H2, "mt-5 max-w-[20ch] font-light")}>
                What owners and tenants write back.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                {LETTERS.map((letter, i) => (
                  <Reveal key={letter.initials} delay={i * 70}>
                    <figure className="border-t border-rule py-7">
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-wax">
                        Letter {String(i + 1).padStart(2, "0")}
                      </div>
                      <blockquote className="display-soft mt-3 max-w-[54ch] text-[1.1rem] font-light italic leading-[1.65]">
                        &ldquo;{letter.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.18em] text-inksoft">
                        &mdash; {letter.initials} · {letter.role}
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
                <div className="border-t border-rule" />
              </div>

              <Reveal className="lg:col-span-5" delay={120}>
                <h3 className="border-b border-rule pb-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink">
                  Asked often
                </h3>
                <dl>
                  {FAQ.map((item, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={item.q} className="border-b border-rule">
                        <dt>
                          <button
                            onClick={() => setOpenFaq(open ? null : i)}
                            aria-expanded={open}
                            className="flex w-full items-baseline justify-between gap-5 py-4 text-left"
                          >
                            <span className="display-soft text-[1.05rem] leading-snug">
                              {item.q}
                            </span>
                            <span className="mt-1 font-mono text-[13px] text-inksoft">
                              {open ? "–" : "+"}
                            </span>
                          </button>
                        </dt>
                        {open && (
                          <dd className="pb-5 pr-6 text-[0.92rem] leading-[1.75] text-inksoft">
                            {item.a}
                          </dd>
                        )}
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── No. 06 Enquiries ───────────────────────────────────── */}
        <section id="contact" className="border-t border-rule px-5 py-16 sm:px-6 md:py-24">
          <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <Eyebrow no="06">Enquiries</Eyebrow>
              <h2 className={cn(H2, "mt-5 font-light")}>Speak with the principal.</h2>
              <p className="mt-6 max-w-[42ch] text-[0.98rem] leading-[1.75] text-inksoft">
                Tell us where the property is and how many units it holds. Joseph reads every
                enquiry himself and answers the same working day &mdash; with a straight
                answer about whether we are the right firm for it.
              </p>

              <div className="mt-9 space-y-5">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft">
                    Email
                  </div>
                  <a
                    href={CONTACT.emailHref}
                    className="display-soft mt-1 block break-all text-[clamp(1.1rem,2vw,1.5rem)] text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:text-wax hover:decoration-wax"
                  >
                    {CONTACT.email}
                  </a>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-inksoft">
                    Telephone
                  </div>
                  <a
                    href={CONTACT.phoneHref}
                    className="display-soft mt-1 block text-[clamp(1.1rem,2vw,1.5rem)] text-ink underline decoration-rule underline-offset-[6px] transition-colors hover:text-wax hover:decoration-wax"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </div>
                <div className="border-t border-rule pt-5 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-inksoft">
                  Office hours Mon&ndash;Fri 8:30&ndash;17:30 MT
                  <br />
                  Emergency line answered 24 hours, 7 days
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={110}>
              <div className="border border-rule bg-plate p-6 sm:p-8 md:p-10">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-name">
                        Your name
                      </label>
                      <input id="f-name" name="name" required className="field mt-1" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-email">
                        Email
                      </label>
                      <input id="f-email" name="email" type="email" required className="field mt-1" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-phone">
                        Telephone
                      </label>
                      <input id="f-phone" name="phone" className="field mt-1" placeholder="+1 (___) ___-____" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-loc">
                        Property location
                      </label>
                      <input id="f-loc" name="location" className="field mt-1" placeholder="City, province / state" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-units">
                        Units
                      </label>
                      <input id="f-units" name="units" className="field mt-1" placeholder="e.g. 6" />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-type">
                        Property type
                      </label>
                      <select id="f-type" name="type" className="field mt-1" defaultValue="Single-family">
                        <option>Single-family</option>
                        <option>Duplex / triplex</option>
                        <option>Apartment building</option>
                        <option>Condominium</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-inksoft" htmlFor="f-note">
                        What would you like us to know?
                      </label>
                      <textarea id="f-note" name="note" rows={3} className="field mt-1 resize-none" placeholder="Current manager, occupancy, anything urgent…" />
                    </div>
                    <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
                      <button
                        type="submit"
                        className="bg-ink px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-plate transition-colors hover:bg-wax"
                      >
                        Send request
                      </button>
                      <p className="max-w-[34ch] text-[0.82rem] leading-relaxed text-inksoft">
                        No obligation, no pressure &mdash; a straight answer about your property.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="h-px w-16 bg-wax" />
                    <h3 className="display-soft mt-6 text-[1.5rem] font-light">
                      Thank you &mdash; your note is on its way.
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-[0.98rem] leading-[1.75] text-inksoft">
                      Your email program should now be opening with the details filled in
                      &mdash; press send and it reaches Joseph directly. He reads every enquiry
                      personally and replies the same working day. If it cannot wait, call{" "}
                      <a href={CONTACT.phoneHref} className="text-ink underline decoration-wax underline-offset-4">
                        {CONTACT.phoneDisplay}
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-7 border border-rule px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors hover:border-ink"
                    >
                      Send another
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Colophon ───────────────────────────────────────────── */}
      <footer className="border-t border-rule px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3">
                <Monogram className="h-9 w-9 text-ink" />
                <span className="leading-none">
                  <span className="display-soft block text-[15px] font-medium tracking-[0.02em]">
                    BOILY REAL ESTATE
                  </span>
                  <span className="mt-[3px] block font-mono text-[9px] uppercase tracking-[0.28em] text-inksoft/80">
                    Property Management
                  </span>
                </span>
              </div>
              <p className="mt-5 max-w-[34ch] text-[0.9rem] leading-[1.75] text-inksoft">
                Managing properties, building value. Residential portfolio management across
                Canada and select United States markets.
              </p>
            </div>

            <div className="md:col-span-3">
              <h4 className="border-b border-rule pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
                Sections
              </h4>
              <ul className="mt-3 space-y-2">
                {NAV.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex items-baseline gap-3 text-[0.9rem] text-inksoft transition-colors hover:text-ink"
                    >
                      <span className="font-mono text-[9px] tracking-[0.16em] text-wax">
                        {item.no}
                      </span>
                      {item.label === "Letters"
                        ? "Correspondence"
                        : item.label === "Enquiries"
                          ? "Enquiries"
                          : item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5">
              <h4 className="border-b border-rule pb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-ink">
                Contact
              </h4>
              <ul className="mt-3 space-y-3">
                <li>
                  <a
                    href={CONTACT.phoneHref}
                    className="display-soft text-[1.15rem] text-ink transition-colors hover:text-wax"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.emailHref}
                    className="display-soft break-all text-[1.15rem] text-ink transition-colors hover:text-wax"
                  >
                    {CONTACT.email}
                  </a>
                </li>
                <li className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.16em] text-inksoft">
                  Vermilion, Alberta, Canada
                  <br />
                  Licensed &amp; insured · Residential property management
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-inksoft/80 md:flex-row md:items-center md:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Boily Real Estate &mdash; Property Management
            </span>
            <span>Set in Fraunces &amp; IBM Plex · Printed on ivory</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
