export type Service = {
  no: string;
  title: string;
  body: string;
  scope: string;
};

export const SERVICES: Service[] = [
  {
    no: "01",
    title: "Tenant Screening & Placement",
    body: "Credit, employment, rental history and reference checks completed before a key is cut. We decline applicants, and we tell you why.",
    scope: "CA · US",
  },
  {
    no: "02",
    title: "Rent Collection & Owner Reporting",
    body: "Invoiced on the first, deposited on schedule, reconciled monthly. Every statement itemised and issued on the fifth.",
    scope: "Monthly",
  },
  {
    no: "03",
    title: "Maintenance & Emergency Coordination",
    body: "One number, answered day and night. We hold the trades, we hold the quotes, and we hold the line on cost.",
    scope: "24/7 line",
  },
  {
    no: "04",
    title: "Lease Drafting & Renewals",
    body: "Provincial and state-specific leases, renewals and notices prepared correctly the first time, in the jurisdiction the property sits in.",
    scope: "Local forms",
  },
  {
    no: "05",
    title: "Inspections & Condition Reports",
    body: "Move-in, move-out and annual walk-throughs, photographed and filed against the unit's record so nothing is argued from memory.",
    scope: "Documented",
  },
  {
    no: "06",
    title: "Compliance & Landlord–Tenant Law",
    body: "Rent rules, notice periods, safety certificates and eviction procedure kept current in every market we work in.",
    scope: "To statute",
  },
  {
    no: "07",
    title: "Turnover & Construction Coordination",
    body: "Paint, flooring, trades and timelines managed between tenancies, so the unit is re-let faster and not simply cheaper.",
    scope: "Trade scheduling",
  },
  {
    no: "08",
    title: "Owner Accounting & Year-End Packages",
    body: "Trust accounting, tax-ready year-end packages, and a direct line to the principal when a number needs explaining.",
    scope: "Year-end ready",
  },
];

export const STANDARD = [
  {
    no: "01",
    title: "One man reads every statement",
    body: "Joseph reviews each owner statement before it leaves the office. Nothing is auto-approved into your account, and nothing goes out unexplained.",
  },
  {
    no: "02",
    title: "The phone is answered by a person",
    body: "Owners and tenants reach a person, not a queue. Emergency calls are returned within two hours — at any hour, on any day of the year.",
  },
  {
    no: "03",
    title: "We decline work we cannot do well",
    body: "If a property is too far, or too large, or needs more than we can properly give it, we say so at the meeting — not in the first month.",
  },
  {
    no: "04",
    title: "Money accounted for to the cent",
    body: "Owner funds are held in a segregated trust account, reconciled monthly, and never mixed with operating cash. Ever.",
  },
];

export type Region = {
  region: string;
  cities: string;
  status: "ACTIVE" | "BY REQUEST";
};

export const CANADA: Region[] = [
  { region: "Alberta", cities: "Calgary · Edmonton · Red Deer · Lethbridge · Vermilion", status: "ACTIVE" },
  { region: "Ontario", cities: "Toronto · Ottawa · Mississauga · Hamilton · Kitchener", status: "ACTIVE" },
  { region: "British Columbia", cities: "Vancouver · Surrey · Kelowna · Abbotsford", status: "ACTIVE" },
  { region: "Saskatchewan & Manitoba", cities: "Saskatoon · Regina · Winnipeg", status: "BY REQUEST" },
  { region: "Quebec", cities: "Montreal · Laval · Quebec City", status: "BY REQUEST" },
  { region: "Atlantic Provinces", cities: "Halifax · Moncton · Fredericton · St. John's", status: "BY REQUEST" },
];

export const UNITED_STATES: Region[] = [
  { region: "Washington", cities: "Seattle · Tacoma · Spokane", status: "BY REQUEST" },
  { region: "Montana", cities: "Billings · Missoula", status: "BY REQUEST" },
  { region: "North Dakota", cities: "Fargo · Bismarck", status: "BY REQUEST" },
  { region: "Minnesota", cities: "Minneapolis · St. Paul", status: "BY REQUEST" },
  { region: "New York", cities: "Buffalo · Rochester", status: "BY REQUEST" },
];

export const LETTERS = [
  {
    quote:
      "I have never had a manager tell me about a tenant's problem before I had to ask. Joseph called me about a water heater in January, had two quotes by the afternoon, and the unit was never cold.",
    initials: "D. P.",
    role: "Multi-unit owner · Calgary, Alberta",
  },
  {
    quote:
      "Rent lands on the same day every month and the statement explains every dollar taken out. After three managers in ten years, that is the first thing I check.",
    initials: "M. R.",
    role: "Single-family owner · Edmonton, Alberta",
  },
  {
    quote:
      "They kept me in the loop the entire time I lived there. My renewal came through early, with the increase written out plainly. No surprises, no games.",
    initials: "S. L.",
    role: "Tenant · Toronto, Ontario",
  },
];

export const FAQ = [
  {
    q: "What does management cost?",
    a: "Residential management is charged as a percentage of collected rent, with no setup fee for a standard single-family or small multi-family portfolio. You receive the exact figure in writing before you sign anything.",
  },
  {
    q: "How quickly can a property be let?",
    a: "Most well-priced units in our active markets are leased within 10 to 21 days of a completed turn. If your rent target sits above the market, we will tell you so plainly on the first call.",
  },
  {
    q: "Do you manage outside Canada?",
    a: "Yes — select markets in the United States, handled by request. Cross-border owners keep one manager, one statement format and one point of contact for both countries.",
  },
  {
    q: "Who will I actually speak with?",
    a: "Joseph Boily, the principal, on every account. There is no account-manager layer between you and the person responsible for your property.",
  },
];

export const LEDGER = [
  { figure: "140+", label: "Units under management" },
  { figure: "97.4%", label: "Occupancy, trailing 12 months" },
  { figure: "2 hr", label: "Average emergency response" },
  { figure: "5th", label: "Owner statements issued" },
];

export const CONTACT = {
  phoneDisplay: "+1 (403) 495-5940",
  phoneHref: "tel:+14034955940",
  email: "boilyjoseph1949@gmail.com",
  emailHref: "mailto:boilyjoseph1949@gmail.com",
};
