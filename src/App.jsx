import { useState, useEffect, useCallback } from 'react'
import './App.css'

const companies = [
  {
    name: "Circle AI",
    contactEmail: "isaiah@usecircle.com",
    website: "https://www.usecircle.com",
    industry: "Insurance Technology (InsurTech)",
    bio: `Circle is an AI automation platform for US commercial P&C insurance brokerages. We deploy AI agents that execute operations work end-to-end -- handling email communications, COIs, endorsements, renewal outreach, quoting prep, and carrier portal automation. Unlike copilots, Circle executes complete workflows autonomously, working as an overlay on brokerages' existing systems. Founded by a Stanford team and already deployed with real agencies.`,
    funding: "Pre-seed (~$2M from Unusual Ventures, June 2025)",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: null,
    valuation: null,
  },
  {
    name: "Rox Data Corp",
    contactEmail: "mehul@rox.com",
    website: "https://rox.com",
    industry: "AI / GTM",
    bio: `Rox deploys thousands of AI agents to help run your business end to end.`,
    funding: "Series A",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product"],
    investors: null,
    valuation: null,
  },
  {
    name: "Cortex AI",
    contactEmail: "nishkarsh@usecortex.ai",
    website: "https://www.usecortex.ai",
    industry: "B2B SaaS",
    bio: `Memory for AI`,
    funding: "Seed funded",
    degreeLevels: ["Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Growth", "Software Engineer"],
    investors: "Angels & Operators from OpenAI, Google, & DoorDash",
    valuation: "$35M",
  },
  {
    name: "Convexia",
    contactEmail: "ayaan@convexia.bio",
    website: "https://convexia.bio",
    industry: "Biotech",
    bio: `World's First AI-Maximalist Pharma Company`,
    funding: "$6M Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "YC, Basis Set, Gaingels",
    valuation: "$35M",
  },
  {
    name: "DeepGrove",
    contactEmail: "edwardbzhang@gmail.com",
    website: "https://deepgrove.ai",
    industry: "AI",
    bio: `We're scaling a new efficient AI architecture.`,
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["ML Engineer", "Software Engineer"],
    investors: "YC",
    valuation: null,
  },
  {
    name: "Mem0",
    contactEmail: "taranjeet@mem0.ai",
    website: "https://mem0.ai",
    industry: "Artificial Intelligence",
    bio: `Mem0 provides a memory layer for LLM applications, enabling them to remember and learn from user interactions over time. Our hybrid architecture (graph, vector, and key-value stores) lets developers add persistent memory with just three lines of code. We're YC-backed and have raised $24M Series A. Our open-source project has 45K GitHub stars, and we're the exclusive memory provider for AWS's Agent SDK.`,
    funding: "Series A",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Software Engineer"],
    investors: "YC, Basis Set, Peak XV, Kindred Ventures, GitHub",
    valuation: null,
  },
  {
    name: "Embedder",
    contactEmail: "ethan@embedder.dev",
    website: "https://embedder.com",
    industry: "Software / Hardware AI",
    bio: `Embedder is building AI agents purpose-built for embedded development — the critical code powering automotive braking systems, medical devices, and industrial robotics. Our platform reads hardware documentation, generates production-ready firmware, and verifies it through simulation.`,
    funding: "$5M+",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Growth", "Software Engineer"],
    investors: "CRV, Box Group, YC",
    valuation: "$40M",
  },
  {
    name: "MathGPT",
    contactEmail: "nour@math-gpt.org",
    website: "https://math-gpt.org",
    industry: "Education",
    bio: `MathGPT is an always-on tutor that has helped 10M+ students go from confusion to confidence in their math subjects.`,
    funding: "Self-funded & profitable",
    degreeLevels: ["Juniors", "Seniors"],
    openToUnderclassmen: false,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: null,
    valuation: "$20M+",
  },
  {
    name: "Flywheel AI",
    contactEmail: "mahimana@useflywheel.ai",
    website: "https://useflywheel.ai",
    industry: "Robotics / Construction",
    bio: `Flywheel AI is on a mission to solve the data flywheel problem in robotics, starting with semi-autonomy and expert datasets on excavators to increase site safety and productivity.`,
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Product", "Software Engineer"],
    investors: "Boost, Lobster, Pioneer",
    valuation: "$30M",
  },
  {
    name: "Cheiron",
    contactEmail: "harshit@cheiron.bio",
    website: "https://www.cheiron.bio",
    industry: "AI / Life Sciences",
    bio: `Cheiron is a purpose-built AI platform for life sciences that integrates fragmented biomedical knowledge to power domain-specific AI agents for end-to-end pharmaceutical workflows. Leading GenAI platform in Korean pharmaceuticals with 20% market penetration, now expanding globally.`,
    funding: "$6M+ SAFE",
    degreeLevels: ["Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "Samsung, SK, Aidan Gomez, Illia Polosukhin",
    valuation: "$20M",
  },
  {
    name: "Bild AI",
    contactEmail: "roop@bild.ai",
    website: "https://www.bild.ai",
    industry: "Construction Tech",
    bio: `Bild AI is an AI-powered estimating platform helping construction subcontractors accelerate affordable housing delivery. We turn days of manual takeoff work into hours so subcontractors can bid more and win profitably.`,
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "YC, Khosla Ventures",
    valuation: "$30M",
  },
  {
    name: "AGI House",
    contactEmail: "rocky@agihouse.org",
    website: "https://www.agihouse.org",
    industry: "AI",
    bio: `Accelerate humanity's transition to AGI.`,
    funding: "Seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Product", "Software Engineer"],
    investors: "AGI House Ventures",
    valuation: "$50M",
  },
  {
    name: "Spectral Labs",
    contactEmail: "pranav@spectrallabs.ai",
    website: "https://www.spectrallabs.ai",
    industry: "Spatial Intelligence / AI",
    bio: `Spectral Labs is a spatial intelligence company building reasoning models for engineering physical systems.`,
    funding: "Series A",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Product", "Software Engineer"],
    investors: "Khosla Ventures, Pebblebed, Industry Ventures, Ravikant Capital",
    valuation: "$85M",
  },
  {
    name: "Polymath",
    contactEmail: "katherine@polymathmade.com",
    website: "https://polymathmade.com",
    industry: "AI / Spatial Reasoning",
    bio: `Polymath is tackling AI's next great frontier — spatial reasoning — to digitize the industrial world, starting by converting 2D engineering drawings into 3D CAD models.`,
    funding: "Pre-seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "Xfund, Omni Ventures, AME Cloud, Red Blue",
    valuation: "$9M",
  },
  {
    name: "Moxie Robots",
    contactEmail: "kt@moxierobtos.com",
    website: "https://moxierobots.com",
    industry: "AI & Robotics",
    bio: `We make the personal AI that the next generation will grow up with.`,
    funding: "Well funded",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Software Engineer"],
    investors: null,
    valuation: null,
  },
  {
    name: "Kerra",
    contactEmail: "caraiosa@stanford.edu",
    website: "https://kerra.earth",
    industry: "Materials / Biotech",
    bio: `Kerra extracts keratin protein from waste wool, creating keratin formulations for clothing fibers, sprayable films, and cosmetic ingredients — driving a new age of sustainable chemicals and materials innovation.`,
    funding: "$130K non-dilutive",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship"],
    visaSponsorship: null,
    roles: ["Growth"],
    investors: "The HIT Fund",
    valuation: null,
  },
  {
    name: "Ironsite AI",
    contactEmail: "Max@ironsite.ai",
    website: "https://ironsite.ai",
    industry: "Construction Tech",
    bio: `Ironsite deploys wearable vision devices for self-perform contractors, automating labor insight collection and enabling objective training and rewards. $13M+ raised with a $40M Series A upcoming.`,
    funding: "$13M+ Seed (closing $40M Series A)",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "8VC, South Park Commons, Jeff Dean, Eric Glyman, Karim Atiyeh, Scott Wu",
    valuation: "$70M",
  },
  {
    name: "Delve",
    contactEmail: "jayu@getdelve.com",
    website: "https://delve.co",
    industry: "Compliance / AI",
    bio: `Delve automates compliance busywork, saving you hundreds of hours. Leave the compliance to Delve's AI agents and get back to what makes your business better.`,
    funding: "Series A — $32M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "Insight Partners",
    valuation: "$300M",
  },
  {
    name: "Pally",
    contactEmail: "haz@pally.com",
    website: "https://www.pally.com",
    industry: "Software / Productivity",
    bio: `Pally is an intelligent unified inbox bringing together iMessage, WhatsApp, LinkedIn, and X — helping you keep track, stay in touch, and reach inbox zero.`,
    funding: "Seed — $4.6M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer"],
    investors: "YC, co-founders of Hugging Face, Slack, and Ramp",
    valuation: "$30M",
  },
  {
    name: "Phinity",
    contactEmail: "aadi@phinity.ai",
    website: "https://phinity.ai",
    industry: "Semiconductor / AI",
    bio: `Phinity is automating chip development so ASICs can be built in weeks instead of years. We build simulation environments to teach AI agents to develop chips end-to-end and are working with frontier model labs to benchmark hardware engineering agents.`,
    funding: "Seed — $5.5M+",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["ML Engineer", "Software Engineer"],
    investors: null,
    valuation: null,
  },
  {
    name: "Sequome",
    contactEmail: "edv@sequome.com",
    website: "https://www.sequome.com",
    industry: "Pharma / Biotech",
    bio: `Sequome engineers biological sequences to develop therapeutics.`,
    funding: "Seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["ML Engineer"],
    investors: "Former CEOs from Novartis, Merck, Gilead, RA Capital & OpenAI; Harvard & Stanford faculty",
    valuation: "$110M",
  },
  {
    name: "Mira",
    contactEmail: "A@trymira.com",
    website: "https://trymira.com",
    industry: "Consumer Electronics / AI",
    bio: `Mira is building AI glasses that see and hear the world around you to make you 10x smarter. Founded by two Harvard dropouts with 80M+ viral views across demos featured in NYT, Forbes, and NBC.`,
    funding: "$6.6M Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Product", "Software Engineer"],
    investors: "General Catalyst, Pillar VC, Naval Ravikant",
    valuation: "$40M",
  },
  {
    name: "Inkle",
    contactEmail: "arjun.m@inkle.ai",
    website: "https://www.inkle.ai",
    industry: "SaaS / Accounting",
    bio: `Inkle is an AI-powered tax & accounting firm disrupting the age-old sector with tools that automate processes and superpower human accountants. 500+ paying US customers, profitable, and backed by global VCs.`,
    funding: "Pre-seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth"],
    investors: "Picus Capital, Saison Capital",
    valuation: "$15M",
  },
  {
    name: "Soar",
    contactEmail: "stanley@joinsoar.co",
    website: "https://www.joinsoar.co",
    industry: "Consumer Travel",
    bio: `Building the future of travel.`,
    funding: "Angel round",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "Former Expedia CEO, execs from AllTrails, Tinder, World",
    valuation: "$8M",
  },
  {
    name: "Silimate",
    contactEmail: "ann@silimate.com",
    website: "https://www.silimate.com",
    industry: "AI / Semiconductors",
    bio: `The copilot for chip designers.`,
    funding: "Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "YC",
    valuation: null,
  },
  {
    name: "Aven",
    contactEmail: "rachel@aven.com",
    website: "https://www.aven.com",
    industry: "Fintech",
    bio: `Aven is building the world's first Machine Bank — using ML and dynamic systems to give consumers access to amazing financial products like the world's lowest APR credit card with a $250K line. Already generating $2.5M+ revenue per employee.`,
    funding: "Series E",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Product", "Software Engineer"],
    investors: "Khosla Ventures, Founders Fund, GIC, General Catalyst",
    valuation: "$2B+",
  },
  {
    name: "Mercor",
    contactEmail: "",
    website: "https://www.mercor.com",
    industry: "AI / Labor Markets",
    bio: `Mercor sits at the intersection of labor markets and AI research. 30,000+ experts in our network collectively earning $2M+ per day. A profitable Series C company valued at $10B.`,
    funding: "Series C — $350M",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "General Catalyst, Felicis, Benchmark",
    valuation: "$10B",
  },
  {
    name: "Antes",
    contactEmail: "rongfei@antes.ai",
    website: "https://www.antes.ai",
    industry: "AI / Hardware Engineering / Advanced Manufacturing",
    bio: `Antes is building the AI hardware engineer for complex manufacturers. Backed by General Catalyst, Kleiner Perkins, and the parent company of Ferrari. Our founding team spans AI, advanced engineering, and policy — including a former America's Cup world champion and former Chairmen of the FAA and FCC.`,
    funding: "Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Software Engineer"],
    investors: "General Catalyst, Kleiner Perkins, Exor (Ferrari / Stellantis)",
    valuation: "$50M",
  },
  {
    name: "Pomo",
    contactEmail: "praneet@usepomo.ai",
    website: "https://usepomo.ai",
    industry: "Marketing Tech / AI",
    bio: `Pomo builds autonomous AI agents that run modern marketing end-to-end — from detecting market shifts to launching campaigns in real time.`,
    funding: "Seed ($4.5M raised)",
    degreeLevels: ["Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Growth", "Software Engineer"],
    investors: "SV Angel, Kindred Ventures, Databricks",
    valuation: null,
  },
  {
    name: "Takt",
    contactEmail: "wzunker@taktconnect.com",
    website: "https://taktconnect.com",
    industry: "AI & Manufacturing",
    bio: `We're building a decision-making engine for manufacturing, so factories can think, decide, and act autonomously.`,
    funding: "Pre-seed — $1M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Software Engineer"],
    investors: "Pear VC",
    valuation: "$10M",
  },
  {
    name: "Tamarind Bio",
    contactEmail: "sherry@tamarind.bio",
    website: "https://www.tamarind.bio",
    industry: "AI / Drug Discovery",
    bio: `Tamarind provides ML infrastructure and tooling for AI-powered drug discovery. 8 of the top 20 pharma companies and tens of thousands of scientists use Tamarind to design protein drugs and improve industrial enzymes.`,
    funding: "Series A",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: null,
    roles: ["Growth", "Software Engineer"],
    investors: "YC, Dimension Capital",
    valuation: "$55M",
  },
  {
    name: "Neuralace",
    contactEmail: "akshaj@neuralace.co",
    website: "https://www.neuralace.co",
    industry: "Brain-Computer Interfaces / AI",
    bio: `Non-invasive brain-computer interfaces + AI — building wearables that let you communicate with technology just by thinking.`,
    funding: "$12M+",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "ML Engineer", "Product"],
    investors: "Khosla Ventures, Accel, Initialized",
    valuation: null,
  },
  {
    name: "Absurd",
    contactEmail: "daniel@absurd.com",
    website: "https://absurd.com",
    industry: "AI / Media",
    bio: `Absurd makes AI brand and performance ads at scale. Their video for Kalshi hit 1M+ views; videos average 400K+ organic views. Companies like Replit, Brex, and Whop use Absurd to create production-quality videos in 72 hours.`,
    funding: "Seed — $5.2M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer"],
    investors: "YC, SV Angel, Audacious",
    valuation: "$35M",
  },
  {
    name: "Smallest AI",
    contactEmail: "malikaa@smallest.ai",
    website: "https://smallest.ai",
    industry: "AI",
    bio: `Real-time multi-modal AI.`,
    funding: "Series A",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["ML Engineer", "Product"],
    investors: "Sierra, Seligman",
    valuation: "$100M",
  },
  {
    name: "Eigen Labs",
    contactEmail: "phil.burgess@eigenlabs.org",
    website: "https://eigenlabs.org",
    industry: "Blockchain / AI Infrastructure",
    bio: `Eigen Labs is the force behind EigenLayer, the developer platform turning the blockchain into a verifiable cloud for apps, data, and AI. Founded by Sreeram Kannan, former UW professor and head of the UW Blockchain Lab.`,
    funding: "$250M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "a16z, Dragonfly",
    valuation: null,
  },
  {
    name: "Kyber Knight Capital",
    contactEmail: "afnaan@kyberknight.com",
    website: "https://kyberknight.com",
    industry: "Venture Capital",
    bio: `Kyber Knight Capital is an early-stage VC firm with a $120M inaugural fund, focused on pre-seed and seed investments across commerce, AI, labor, and the built environment.`,
    funding: null,
    degreeLevels: ["Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Growth"],
    investors: null,
    valuation: null,
  },
  {
    name: "Tomo",
    contactEmail: "justin@tomo.ai",
    website: "https://www.tomo.ai",
    industry: "Consumer AI",
    bio: `Tomo is a personal agent that learns what people care about and helps them act on it — exercise, sleep, diet, finance, mental health. Building a living OS for each user with dynamic interfaces to empower greater agency in their lives.`,
    funding: "Seed — $5M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "Bain Capital Ventures, Conviction, Basis Set, Accel",
    valuation: null,
  },
  {
    name: "Tilde Research",
    contactEmail: "ben@tilderesearch.com",
    website: "https://tilderesearch.com",
    industry: "AI Research",
    bio: `Tilde Research is a moonshot AI research lab focused on mechanistic interpretability, novel model architectures, and pretraining science. Backed by Khosla Ventures and researchers from OpenAI and Anthropic.`,
    funding: "Seed — $8M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["ML Engineer", "Software Engineer"],
    investors: "Khosla Ventures, Pear VC, Bain Capital Ventures",
    valuation: "$75M",
  },
  {
    name: "Known",
    contactEmail: "aden@known.com",
    website: "https://known.com",
    industry: "Consumer AI",
    bio: `Known is an AI matchmaker that talks to users like a friend. New users average 27 minutes with our voice agent on onboarding. Built by engineers behind Uber Eats, Uber, Faire, and Afterpay.`,
    funding: "Seed — $10M",
    degreeLevels: ["Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "Forerunner, NFX, Pear",
    valuation: "$40M",
  },
  {
    name: "100x Technology",
    contactEmail: "anand@echelonai.com",
    website: "https://echelonai.com",
    industry: "AI / Coding Agents",
    bio: `The world's first AI ServiceNow developer.`,
    funding: "Seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["ML Engineer", "Software Engineer"],
    investors: "Bain Capital Ventures",
    valuation: "$22.5M",
  },
  {
    name: "Overlap",
    contactEmail: "casey@overlap.ai",
    website: "https://overlap.ai",
    industry: "Marketing Tech / AI",
    bio: `Overlap automates social video workflows for the world's largest media companies including iHeart Media, Yahoo Sports, and Vox Media, generating over 1B organic views annually.`,
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: false,
    roles: ["Growth", "Product", "Software Engineer"],
    investors: "Y Combinator, Pioneer Fund, Collab Fund",
    valuation: null,
  },
  {
    name: "General Matter",
    contactEmail: "jmurawczyk@gmail.com",
    website: "https://generalmatter.com",
    industry: "Energy / Nuclear",
    bio: `General Matter is a nuclear enrichment startup fueling American power. Raised $50M led by Founders Fund and won a $900M Government Award.`,
    funding: "$50M",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Growth", "Software Engineer"],
    investors: "Founders Fund",
    valuation: null,
  },
];

const ROLE_LABELS = ["Software Engineer", "ML Engineer", "Product", "Growth"]
const POSITION_LABELS = ["Internship", "Part-time", "Full-time"]
const STAGE_OPTIONS = ["All", "Pre-seed / Bootstrapped", "Seed", "Series A+"]

function normalizeRole(role) {
  if (/Software|Eng/i.test(role)) return "Software Engineer"
  if (/ML|ml|[Rr]esearch/.test(role)) return "ML Engineer"
  if (/Growth|Marketing|Business/i.test(role)) return "Growth"
  if (/Product|Design|PM/i.test(role)) return "Product"
  return role
}

function classifyStage(funding, valuation, name) {
  if (name === 'Mercor' || name === 'Aven') return "Series A+"

  const f = (funding || '').toLowerCase()
  const v = (valuation || '').toLowerCase()

  if (/series [ab+]/.test(f)) return "Series A+"
  // valuation ≥ $100M → Series A+
  const valNum = parseFloat((valuation || '').replace(/[^0-9.]/g, ''))
  if (valuation && !isNaN(valNum) && valNum >= 100) return "Series A+"

  if (/\bseed\b/.test(f) && !/pre-seed/.test(f)) return "Seed"
  if (/safe/.test(f)) return "Seed"

  if (/pre-seed|bootstrap|non-dilutive|130k/.test(f)) return "Pre-seed / Bootstrapped"

  return "Pre-seed / Bootstrapped" // default for unknown/very early
}

function parseValuation(valuation) {
  if (!valuation || valuation === 'Unannounced' || valuation === 'Private') return 0
  const isBillion = /b/i.test(valuation)
  const num = parseFloat(valuation.replace(/[^0-9.]/g, '')) || 0
  return isBillion ? num * 1000 : num
}

const sortedCompanies = [...companies].sort(
  (a, b) => parseValuation(b.valuation) - parseValuation(a.valuation)
)

function toggleSet(set, value) {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

const DEFAULT_FILTERS = {
  roles: new Set(),
  positions: new Set(),
  stage: "All",
  underclassmen: false,
  visa: false,
  starred: false,
}

function filterCompanies(companies, filters, favorites) {
  return companies.filter((c) => {
    const normalizedRoles = [...new Set(c.roles.map(normalizeRole))]

    if (filters.roles.size > 0 && !normalizedRoles.some((r) => filters.roles.has(r))) return false
    if (filters.positions.size > 0 && !c.positions.some((p) => filters.positions.has(p))) return false
    if (filters.stage !== "All" && classifyStage(c.funding, c.valuation, c.name) !== filters.stage) return false
    if (filters.underclassmen && !c.openToUnderclassmen) return false
    if (filters.visa && c.visaSponsorship !== true) return false
    if (filters.starred && !favorites.has(c.name)) return false
    return true
  })
}

function isFiltersActive(filters) {
  return (
    filters.roles.size > 0 ||
    filters.positions.size > 0 ||
    filters.stage !== "All" ||
    filters.underclassmen ||
    filters.visa ||
    filters.starred
  )
}

function FilterBar({ filters, onChange, onClear, totalCount, filteredCount, favoritesCount }) {
  const active = isFiltersActive(filters)

  return (
    <div className="filter-bar">
      <div className="filter-groups">

        {/* Role */}
        <div className="filter-group">
          <span className="filter-label">Role</span>
          <div className="filter-toggles">
            {ROLE_LABELS.map((r) => (
              <button
                key={r}
                className={`filter-btn ${filters.roles.has(r) ? 'filter-btn--active' : ''}`}
                onClick={() => onChange({ ...filters, roles: toggleSet(filters.roles, r) })}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Position */}
        <div className="filter-group">
          <span className="filter-label">Position</span>
          <div className="filter-toggles">
            {POSITION_LABELS.map((p) => (
              <button
                key={p}
                className={`filter-btn ${filters.positions.has(p) ? 'filter-btn--active' : ''}`}
                onClick={() => onChange({ ...filters, positions: toggleSet(filters.positions, p) })}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div className="filter-group">
          <span className="filter-label">Funding Stage</span>
          <div className="filter-toggles">
            {STAGE_OPTIONS.map((s) => (
              <button
                key={s}
                className={`filter-btn ${filters.stage === s ? 'filter-btn--active' : ''}`}
                onClick={() => onChange({ ...filters, stage: s })}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Other */}
        <div className="filter-group">
          <span className="filter-label">Other</span>
          <div className="filter-toggles">
            <button
              className={`filter-btn ${filters.starred ? 'filter-btn--active filter-btn--star' : ''}`}
              onClick={() => onChange({ ...filters, starred: !filters.starred })}
            >
              ★ Starred{favoritesCount > 0 ? ` (${favoritesCount})` : ''}
            </button>
            <button
              className={`filter-btn ${filters.underclassmen ? 'filter-btn--active' : ''}`}
              onClick={() => onChange({ ...filters, underclassmen: !filters.underclassmen })}
            >
              Open to Underclassmen
            </button>
            <button
              className={`filter-btn ${filters.visa ? 'filter-btn--active' : ''}`}
              onClick={() => onChange({ ...filters, visa: !filters.visa })}
            >
              Visa Sponsorship
            </button>
          </div>
        </div>

      </div>

      {/* Status row */}
      <div className="filter-status">
        <span className="filter-count">
          Showing {filteredCount} of {totalCount} companies
        </span>
        {active && (
          <button className="filter-clear" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <svg width="48" height="48" viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <line x1="18" y1="3" x2="18" y2="33" stroke="#1A3BB3" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="3" y1="18" x2="33" y2="18" stroke="#1A3BB3" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="7.5" y1="7.5" x2="28.5" y2="28.5" stroke="#1A3BB3" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="28.5" y1="7.5" x2="7.5" y2="28.5" stroke="#1A3BB3" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p className="empty-state-text">No companies match your filters</p>
    </div>
  )
}

function RoleBadges({ roles }) {
  const normalizedRoles = [...new Set(roles.map(normalizeRole))]
  return (
    <>
      {normalizedRoles.map((role) => (
        <span
          key={role}
          className={`tag role-tag ${ROLE_LABELS.includes(role) ? 'tag-filled' : 'tag-outline'}`}
        >
          {role}
        </span>
      ))}
    </>
  )
}

function PositionBadges({ positions }) {
  return (
    <>
      {positions.map((pos) => (
        <span key={pos} className="tag position-tag">{pos}</span>
      ))}
    </>
  )
}

function CompanyCard({ company, onClick, isFavorite, onToggleFavorite }) {
  const { name, industry, positions, roles } = company
  return (
    <div className="company-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="card-header">
        <div className="card-name-row">
          <h3 className="card-name">{name}</h3>
          <button
            className={`star-btn ${isFavorite ? 'star-btn--active' : ''}`}
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(name) }}
            aria-label={isFavorite ? 'Unstar company' : 'Star company'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <p className="card-industry">{industry}</p>
      </div>
      <div className="card-tags">
        <div className="card-roles">
          <RoleBadges roles={roles} />
        </div>
        <div className="card-positions">
          <PositionBadges positions={positions} />
        </div>
      </div>
    </div>
  )
}

function CompanyModal({ company, onClose, isFavorite, onToggleFavorite }) {
  const {
    name, website, industry, bio, funding, investors, valuation,
    degreeLevels, openToUnderclassmen, visaSponsorship,
    positions, roles, contactEmail,
  } = company

  const showValuation = valuation && valuation !== 'Unannounced'

  const visaLabel = visaSponsorship === true
    ? 'Yes ✓'
    : visaSponsorship === false
    ? 'No ✗'
    : 'TBD'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <button
          className={`modal-star-btn ${isFavorite ? 'star-btn--active' : ''}`}
          onClick={() => onToggleFavorite(company.name)}
          aria-label={isFavorite ? 'Unstar company' : 'Star company'}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        {/* Name */}
        <h2 className="modal-name">
          {website
            ? <a href={website} target="_blank" rel="noopener noreferrer" className="modal-name-link">{name}</a>
            : name}
        </h2>

        {/* Industry */}
        <div className="modal-industry-row">
          <span className="tag role-tag tag-outline">{industry}</span>
        </div>

        {/* Role + position badges */}
        <div className="modal-badges">
          <div className="card-roles"><RoleBadges roles={roles} /></div>
          <div className="card-positions"><PositionBadges positions={positions} /></div>
        </div>

        {/* Bio */}
        <div className="modal-section">
          <span className="modal-label">About</span>
          <p className="modal-bio">{bio}</p>
        </div>

        {/* Meta grid */}
        <div className="modal-meta-grid">
          <div className="modal-meta-row">
            <span className="modal-label">Funding</span>
            <span className="modal-value">{funding}</span>
          </div>
          {investors && (
            <div className="modal-meta-row">
              <span className="modal-label">Investors</span>
              <span className="modal-value">{investors}</span>
            </div>
          )}
          {showValuation && (
            <div className="modal-meta-row">
              <span className="modal-label">Valuation</span>
              <span className="modal-value">{valuation}</span>
            </div>
          )}
          <div className="modal-meta-row">
            <span className="modal-label">Degree Levels</span>
            <span className="modal-value">{degreeLevels.join(', ')}</span>
          </div>
          <div className="modal-meta-row">
            <span className="modal-label">Open to Underclassmen</span>
            <span className="modal-value">{openToUnderclassmen ? '✓ Yes' : '✗ No'}</span>
          </div>
          <div className="modal-meta-row">
            <span className="modal-label">Visa Sponsorship</span>
            <span className="modal-value">{visaLabel}</span>
          </div>
        </div>

        {/* Contact button */}
        {contactEmail && (
          <a href={`mailto:${contactEmail}`} className="modal-contact-btn">
            Contact Company →
          </a>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [activeCompany, setActiveCompany] = useState(null)
  const closeModal = useCallback(() => setActiveCompany(null), [])
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('bases-favorites')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch { return new Set() }
  })

  const toggleFavorite = useCallback((name) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      try { localStorage.setItem('bases-favorites', JSON.stringify([...next])) } catch {}
      return next
    })
  }, [])

  const filtered = filterCompanies(sortedCompanies, filters, favorites)
  const clearFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="page">
      {/* Mobile bottom tab bar */}
      <nav className="mobile-tab-bar" aria-label="Page sections">
        {[
          { label: "Companies", href: "#companies" },
          { label: "Dinners", href: "#dinners" },
        ].map(({ label, href }) => (
          <a key={href} href={href} className="mobile-tab">
            {label}
          </a>
        ))}
      </nav>

      {/* Sidebar nav */}
      <nav className="side-nav" aria-label="Page sections">
        {[
          { label: "Top", href: "#top" },
          { label: "Companies", href: "#companies" },
          { label: "Dinners", href: "#dinners" },
        ].map(({ label, href }) => (
          <a key={href} href={href} className="side-nav-item">
            <span className="side-nav-dot" />
            <span className="side-nav-label">{label}</span>
          </a>
        ))}
      </nav>

      {/* Hero */}
      <section id="top" className="hero">
        <div className="hero-inner">
          <h1 className="event-title">BASES Startup Career Fair</h1>
          <div className="event-meta">
            <span className="meta-item">February 26th, 2026</span>
            <span className="meta-dot">&middot;</span>
            <span className="meta-item">1&ndash;4 PM</span>
          </div>
          <div className="event-location">
            <span>Meyer Green, Stanford University</span>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="description-section">
        <div className="description-inner">
          <p className="description-text">
            Stanford&rsquo;s biggest startup recruiting event is here! Companies at the frontier of AI,
            spatial intelligence, biotech, robotics, infrastructure, and AI-native SaaS.{' '}
            <strong>$30B+ in total valuations, with multiple $1B+ companies.</strong>
          </p>
          <p className="description-text">
            Advisors include Jeff Dean, Aidan Gomez, and the co-founders of Hugging Face, Slack,
            and Ramp. Backed by Founders Fund, Khosla Ventures, a16z, Y Combinator, NVIDIA, 8VC,
            Greylock, Insight Partners, Felicis, and more.
          </p>
          <p className="description-text highlight-text">
            Open to all degree levels and all majors &mdash; internships and full-time roles available.
          </p>
        </div>
      </section>

      {/* Companies Grid */}
      <section id="companies" className="companies-section">
        <div className="companies-inner">
          <div className="section-header">
            <h2 className="section-title">Companies</h2>
          </div>
          <FilterBar
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            totalCount={sortedCompanies.length}
            filteredCount={filtered.length}
            favoritesCount={favorites.size}
          />
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="companies-grid">
              {filtered.map((company) => (
                <CompanyCard
                  key={company.name}
                  company={company}
                  onClick={() => setActiveCompany(company)}
                  isFavorite={favorites.has(company.name)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dinners */}
      <section id="dinners" className="dinners-section">
        <div className="dinners-inner">
          <div className="section-header">
            <h2 className="section-title">Dinners</h2>
          </div>
          <div className="dinners-grid">
            {[
              { company: "Embedder", url: "https://lu.ma/evt-eCtFKjbCjWjtoSI" },
              { company: "AGI House", url: "https://urldefense.com/v3/__https://app.agihouse.org/events/stanford-ai-ms-PhD-20260226__;!!G92We9drHetJ8EofZw!fF-AAgXQtb3oz80CYVPdzld9wmBA0dDDVu0geq0d7OrX4rZajyG5b-3bYYb7osjwbJmymWbWXfm-JCkiU5Yg$" },
            ].map(({ company, url }) => (
              <div key={company} className="dinner-card">
                <p
                  className="dinner-label dinner-label--link"
                  onClick={() => setActiveCompany(sortedCompanies.find(c => c.name === company))}
                >{company}</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dinner-external-link"
                >
                  RSVP to dinner →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <p className="footer-text">BASES &mdash; Stanford University &mdash; 2026</p>
      </footer>

      {/* Modal */}
      {activeCompany && (
        <CompanyModal
          company={activeCompany}
          onClose={closeModal}
          isFavorite={favorites.has(activeCompany.name)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}
