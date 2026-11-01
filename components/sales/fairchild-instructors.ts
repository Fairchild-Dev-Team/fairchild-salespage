export type Instructor = {
  id: string
  image: string
  imagePosition?: string
  badge: string
  name: string
  quote: string
}

export const fairchildInstructors = {
  heading: "Only The Best Brains Teach at FairChild Institute",
  subtitle:
    "Our mentors aren't just teachers. They're practitioners solving real problems with data every day.",
  instructors: [
    {
      id: "oluwaseyi-allison",
      image: "/images/instructors/seyi.png",
      badge: "CRM Platform & Projects",
      name: "Oluwaseyi Allison",
      quote:
        "I work in CRM every day. I teach project delivery from the field, not the textbook.",
    },
    {
      id: "malik-pelumi-bello",
      image: "/images/instructors/malik.png",
      badge: "Data Analytics & Business Intelligence",
      name: "Malik Pelumi Bello",
      quote: "Data and BI are my world. I teach you to make numbers tell a story.",
    },
    {
      id: "baba-nureni-yusuf",
      image: "/images/instructors/baba.png",
      badge: "Business analysis",
      name: "Baba Nureni-Yusuf",
      quote: "BA is where I made my name. I teach the craft and the interview game.",
    },
    {
      id: "babajide-onabajo",
      image: "/images/instructors/babajide.png",
      imagePosition: "object-[center_12%]",
      badge: "Agile and Scrum Mastery",
      name: "Babajide Onabajo",
      quote: "Agile is how I run teams. I teach Scrum without the jargon.",
    },
    {
      id: "debo-fafore",
      image: "/images/instructors/debo.png",
      imagePosition: "object-[center_8%]",
      badge: "Salesforce Service Cloud with Projects",
      name: "Debo Fafore",
      quote: "I build on Service Cloud. I teach solutions that survive go-live.",
    },
    {
      id: "samson-bavo",
      image: "/images/instructors/samson.png",
      badge: "Salesforce Essentials",
      name: "Samson Bavo",
      quote: "Salesforce got me in the door. I teach the essentials that still do.",
    },
    {
      id: "sophie-mokah",
      image: "/images/instructors/sophie.png",
      badge: "Salesforce Sales Cloud",
      name: "Sophie Mokah",
      quote: "I live in Sales Cloud. I teach setups that help teams sell.",
    },
    {
      id: "qahhar-okenla",
      image: "/images/instructors/qahhar.png",
      badge: "Data Analytics & Business Intelligence",
      name: "Qahhar Okenla",
      quote: "BI is my thing. I teach dashboards people actually open.",
    },
    {
      id: "ogenna-odebatu",
      image: "/images/instructors/ogenna.png",
      badge: "Salesforce Experience Cloud",
      name: "Ogenna Odebatu",
      quote: "Experience Cloud is my space. I teach portals built for real users.",
    },
    {
      id: "niloy-debnath",
      image: "/images/instructors/niloy.jpg",
      badge: "Triple Play Course B - Salesforce Flow Automation Implementations",
      name: "Niloy Debnath",
      quote: "Flow is what I do. I teach automations that work on day one.",
    },
    {
      id: "oladipo-ojo",
      image: "/images/instructors/dipo.jpg",
      badge: "Triple Play Course A - 8+ Salesforce Project Implementation",
      name: "Oladipo Ojo",
      quote: "8+ projects in. I teach Salesforce how it's done on the job.",
    },
    {
      id: "ola-badiru",
      image: "/images/instructors/ola.jpg",
      badge: "Triple Play Course C - Salesforce Admin Platforms Implementations",
      name: "Olanrewaju Badiru (Ola B)",
      quote: "Admin platforms are my lane. I teach configs built for production.",
    },
  ] satisfies Instructor[],
}
