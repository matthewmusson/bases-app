import { useState, useEffect, useCallback } from 'react'
import './App.css'

const companies = [
  {
    name: "Circle AI",
    contactEmail: "isaiah@usecircle.com",
    website: "https://www.usecircle.com",
    industry: "Insurance Technology (InsurTech)",
    bio: "Circle is an AI automation platform for US commercial P&C insurance brokerages. We deploy AI agents that execute operations work end-to-end — handling email communications, COIs, endorsements, renewal outreach, quoting prep, and carrier portal automation. Unlike copilots, Circle executes complete workflows autonomously, working as an overlay on brokerages' existing systems. Founded by a Stanford team and already deployed with real agencies.",
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
    name: "Rox",
    contactEmail: "mehul@rox.com",
    website: "https://rox.com",
    industry: "AI / GTM",
    bio: "Rox deploys thousands of AI agents to help run your business end to end.",
    funding: "Series A",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth", "Product"],
    investors: null,
    valuation: null,
  },
  {
    name: "Cortex AI",
    contactEmail: "nishkarsh@usecortex.ai",
    website: "https://www.usecortex.ai",
    industry: "B2B SaaS",
    bio: "Memory for AI.",
    funding: "Seed",
    degreeLevels: ["Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "Growth"],
    investors: "Angels & Operators from OpenAI, Google, & DoorDash",
    valuation: "$35M",
  },
  {
    name: "Sphere",
    contactEmail: "nicholas@getsphere.com",
    website: "https://www.getsphere.com",
    industry: "Fintech",
    bio: "Sphere is an AI-native cross-border compliance platform. We help companies like Lovable, ElevenLabs, and Deel automate their global tax compliance obligations via our AI-native tax engine and local rails into 100+ tax authorities around the world.",
    funding: "Series A — $21M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "a16z, Felicis Ventures, Y Combinator, Flexport, Deel Ventures",
    valuation: "$100M+",
  },
  {
    name: "Convexia",
    contactEmail: "ayaan@convexia.bio",
    website: "https://convexia.bio",
    industry: "Biotech",
    bio: "World's first AI-maximalist pharma company.",
    funding: "$6M Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "YC, Basis Set, Gaingels",
    valuation: "$35M",
  },
  {
    name: "DeepGrove",
    contactEmail: "edwardbzhang@gmail.com",
    website: "https://deepgrove.ai",
    industry: "AI",
    bio: "DeepGrove AI is an efficient AI research lab based in San Francisco. We develop foundational AI models on the Pareto frontier of efficiency and performance, delivering state-of-the-art quality while dramatically reducing memory, energy, and infrastructure requirements.",
    funding: "Seed — $9M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "ML Engineer"],
    investors: "YC, Initialized, Greylock",
    valuation: "$80M",
  },
  {
    name: "Mem0",
    contactEmail: "taranjeet@mem0.ai",
    website: "https://mem0.ai",
    industry: "Artificial Intelligence",
    bio: "Mem0 provides a memory layer for LLM applications, enabling them to remember and learn from user interactions over time. YC-backed with $24M Series A, 45K GitHub stars, and exclusive memory provider for AWS's Agent SDK.",
    funding: "Series A — $24M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: "YC, Basis Set, Peak XV, Kindred Ventures, GitHub",
    valuation: null,
  },
  {
    name: "Turing Labs",
    contactEmail: "manmit@turingsaas.com",
    website: "https://www.turingsaas.com",
    industry: "Vertical SaaS",
    bio: "Turing Labs is a B2B AI platform purpose-built for R&D to replace manual trial-and-error experimentation. Backed by Y Combinator with $20M raised. Turing does for CPG products what AI does for drug discovery.",
    funding: "$20M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Growth"],
    investors: "Y Combinator, Insight Partners",
    valuation: null,
  },
  {
    name: "Embedder",
    contactEmail: "ethan@embedder.dev",
    website: "https://embedder.com",
    industry: "Software / Hardware AI",
    bio: "Embedder is building AI agents purpose-built for embedded development — the critical code powering automotive braking systems, medical devices, and industrial robotics. Our platform reads hardware documentation, generates production-ready firmware, and verifies it through simulation.",
    funding: "Seed — $5M+",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "Growth"],
    investors: "CRV, Box Group, YC",
    valuation: "$40M",
  },
  {
    name: "MathGPT",
    contactEmail: "nour@math-gpt.org",
    website: "https://math-gpt.org",
    industry: "Education",
    bio: "MathGPT is an always-on tutor that has helped 10M+ students go from confusion to confidence in their math subjects.",
    funding: "Self-funded & profitable",
    degreeLevels: ["Juniors", "Seniors"],
    openToUnderclassmen: false,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: null,
    valuation: "$20M+",
  },
  {
    name: "Digipals",
    contactEmail: "peggy@digipals.app",
    website: "https://www.digipals.app",
    industry: "AI + Consumer Social",
    bio: "Building the future of social in the age of AI.",
    funding: "$3M Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "YC, Reach Capital, Lifelike Capital, Dentsu Ventures, Pioneer Fund",
    valuation: null,
  },
  {
    name: "AARI Care",
    contactEmail: "vaibhav@aari.care",
    website: "https://aari.care",
    industry: "Mental Health / Health AI",
    bio: "AI-native end-to-end platform for mental health.",
    funding: "Bootstrapped",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Growth"],
    investors: null,
    valuation: null,
  },
  {
    name: "Flywheel AI",
    contactEmail: "mahimana@useflywheel.ai",
    website: "https://useflywheel.ai",
    industry: "Robotics / Construction",
    bio: "Flywheel AI is solving the data flywheel problem in robotics, starting by enabling semi-autonomy and collecting expert datasets on excavators to increase site safety and productivity.",
    funding: "Seed — $30M valuation",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "Boost, Lobster, Pioneer",
    valuation: "$30M",
  },
  {
    name: "Schematic",
    contactEmail: "luey@stanford.edu",
    website: null,
    industry: "Industrials",
    bio: "We upgrade frontline workers in critical industries.",
    funding: "Pre-seed — $10M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "E14 Fund",
    valuation: "$10M",
  },
  {
    name: "Cheiron",
    contactEmail: "harshit@cheiron.bio",
    website: "https://www.cheiron.bio",
    industry: "AI / Life Sciences",
    bio: "Cheiron is a purpose-built AI platform for life sciences that integrates fragmented biomedical knowledge to power domain-specific AI agents for end-to-end pharmaceutical workflows. Leading GenAI platform in Korean pharmaceuticals with 20% market penetration, now expanding globally.",
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
    bio: "Bild AI is an AI-powered estimating platform helping construction subcontractors accelerate affordable housing delivery. We turn days of manual takeoff work into hours so subcontractors can bid more and win profitably.",
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "YC, Khosla Ventures",
    valuation: "$30M",
  },
  {
    name: "AGI House",
    contactEmail: "rocky@agihouse.org",
    website: "https://www.agihouse.org",
    industry: "AI",
    bio: "Accelerating humanity's transition to AGI.",
    funding: "Seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "AGI House Ventures",
    valuation: "$50M",
  },
  {
    name: "Spectral Labs",
    contactEmail: "pranav@spectrallabs.ai",
    website: "https://www.spectrallabs.ai",
    industry: "Spatial Intelligence / AI",
    bio: "Spectral Labs is a spatial intelligence company building reasoning models for engineering physical systems.",
    funding: "Series A",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "Khosla Ventures, Pebblebed, Industry Ventures, Ravikant Capital",
    valuation: "$85M",
  },
  {
    name: "Polymath",
    contactEmail: "katherine@polymathmade.com",
    website: "https://polymathmade.com",
    industry: "AI / Spatial Reasoning",
    bio: "Polymath is tackling AI's next great frontier — spatial reasoning — to digitize the industrial world, starting by converting 2D engineering drawings into 3D CAD models.",
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
    bio: "We make the personal AI that the next generation will grow up with.",
    funding: "Well funded",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: null,
    valuation: null,
  },
  {
    name: "Kerra",
    contactEmail: "caraiosa@stanford.edu",
    website: "https://kerra.earth",
    industry: "Materials / Biotech",
    bio: "Kerra extracts keratin protein from waste wool, creating keratin formulations for clothing fibers, sprayable films, and cosmetic ingredients — driving a new age of sustainable chemicals and materials innovation.",
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
    name: "Arini",
    contactEmail: "bryan@arini.ai",
    website: "https://www.arini.ai",
    industry: "Healthcare AI",
    bio: "Arini is building the AI-native operating system for dental practice operations — the world's largest retail healthcare vertical. We use voice AI to automate patient interactions and complex optimization for practice scheduling.",
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "Y Combinator",
    valuation: "$60M",
  },
  {
    name: "Prime Intellect",
    contactEmail: "ash@primeintellect.ai",
    website: "https://www.primeintellect.ai",
    industry: "AI Infrastructure",
    bio: "The open superintelligence stack.",
    funding: "Series A (undisclosed)",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "ML Engineer", "Product", "Growth"],
    investors: "Founders Fund, NVIDIA",
    valuation: "$500M+",
  },
  {
    name: "Ironsite AI",
    contactEmail: "Max@ironsite.ai",
    website: "https://ironsite.ai",
    industry: "Construction Tech",
    bio: "Ironsite deploys wearable vision devices for self-perform contractors, automating labor insight collection and enabling objective training and rewards. $13M+ raised with a $40M Series A upcoming.",
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
    bio: "Delve automates compliance busywork, saving you hundreds of hours. Leave the compliance to Delve's AI agents and get back to what makes your business better.",
    funding: "Series A — $32M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "Insight Partners",
    valuation: "$300M",
  },
  {
    name: "Pally",
    contactEmail: "haz@pally.com",
    website: "https://www.pally.com",
    industry: "Software / Productivity",
    bio: "Pally is an intelligent unified inbox bringing together iMessage, WhatsApp, LinkedIn, and X — helping you keep track, stay in touch, and reach inbox zero. Productivity for the DMs.",
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
    bio: "Phinity is automating chip development so ASICs can be built in weeks instead of years. We build simulation environments to teach AI agents to develop chips end-to-end and are working with frontier model labs to benchmark hardware engineering agents.",
    funding: "Seed — $5.5M+",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "ML Engineer"],
    investors: "Unannounced (incl. Jeff Dean)",
    valuation: null,
  },
  {
    name: "Topology",
    contactEmail: "sumer@relatent.com",
    website: "https://relatent.com",
    industry: "Consumer Software / AI",
    bio: "Topology is bringing personal intelligence to every human being on the planet. We've built state-of-the-art technology that unlocks your personal context from all your favorite apps to create proactive personal agents with complete understanding of your life.",
    funding: "$5M–$15M Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "OpenAI, Khosla Ventures, Google Ventures",
    valuation: "$100M+",
  },
  {
    name: "Sequome",
    contactEmail: "edv@sequome.com",
    website: "https://www.sequome.com",
    industry: "Pharma / Biotech",
    bio: "Sequome engineers biological sequences to develop therapeutics.",
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
    bio: "Mira is building AI glasses that see and hear the world around you to make you 10x smarter. Founded by two Harvard dropouts with 80M+ viral views. Imagine understanding 60+ languages, perfect recall of any conversation, and always knowing the best thing to say.",
    funding: "$6.6M Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "General Catalyst, Pillar VC, Naval Ravikant",
    valuation: "$40M",
  },
  {
    name: "Inkle",
    contactEmail: "arjun.m@inkle.ai",
    website: "https://www.inkle.ai",
    industry: "SaaS / Accounting",
    bio: "Inkle is an AI-powered tax & accounting firm disrupting the age-old sector with tools that automate processes and superpower human accountants. 500+ paying US customers, profitable, and backed by global VCs.",
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
    bio: "Building the future of travel.",
    funding: "Angel round",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "Former Expedia CEO, execs from AllTrails, Tinder, World",
    valuation: "$8M",
  },
  {
    name: "Silimate",
    contactEmail: "ann@silimate.com",
    website: "https://www.silimate.com",
    industry: "AI / Semiconductors",
    bio: "The copilot for chip designers.",
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
    bio: "Aven is building the world's first Machine Bank — using robotics, ML, and dynamic systems to give consumers access to amazing financial products like the world's lowest APR credit card with a $250K line. Already the most efficient bank in the world at $2.5M+ revenue per employee.",
    funding: "Series E",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product"],
    investors: "Khosla Ventures, Founders Fund, GIC, General Catalyst",
    valuation: "$2B+",
  },
  {
    name: "Antes",
    contactEmail: "rongfei@antes.ai",
    website: "https://www.antes.ai",
    industry: "AI / Hardware Engineering / Advanced Manufacturing",
    bio: "Antes is building the AI hardware engineer for complex manufacturers. We partner with iconic automotive and industrial manufacturers and are backed by General Catalyst, Kleiner Perkins, and the parent company of Ferrari. Our founding team spans AI, advanced engineering, and policy — including a former America's Cup world champion, AI researchers from Stanford AI Lab, and former Chairmen of the FAA and FCC.",
    funding: "Seed",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: "General Catalyst, Kleiner Perkins, Exor (Ferrari / Stellantis)",
    valuation: "$50M",
  },
  {
    name: "Takt",
    contactEmail: "wzunker@taktconnect.com",
    website: "https://taktconnect.com",
    industry: "AI & Manufacturing",
    bio: "We're building a decision-making engine for manufacturing, so factories can think, decide, and act autonomously.",
    funding: "Pre-seed — $1M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: "Pear VC",
    valuation: "$10M",
  },
  {
    name: "Tamarind Bio",
    contactEmail: "sherry@tamarind.bio",
    website: "https://www.tamarind.bio",
    industry: "AI / Drug Discovery",
    bio: "Tamarind provides ML infrastructure and tooling for AI-powered drug discovery. 8 of the top 20 pharma companies and tens of thousands of scientists use Tamarind to design protein drugs, improve industrial enzymes, and create cutting-edge molecules.",
    funding: "Series A",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "Growth"],
    investors: "YC, Dimension Capital",
    valuation: "$55M",
  },
  {
    name: "Terac",
    contactEmail: "zac@terac.com",
    website: "https://terac.com",
    industry: "Market Research / AI",
    bio: "Terac is an expert network that automatically matches people with consistent, high-paying short-term opportunities including expert interviews, user research studies, and AI training.",
    funding: "Seed — $9M",
    degreeLevels: ["Sophomores", "Juniors", "Seniors", "Masters"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: "Emergence Capital, ZFellows, SignalFire",
    valuation: "$40M",
  },
  {
    name: "Smallest AI",
    contactEmail: "malikaa@smallest.ai",
    website: "https://smallest.ai",
    industry: "AI",
    bio: "Real-time multi-modal AI.",
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
    bio: "Eigen Labs is the force behind EigenLayer, the developer platform turning the blockchain into a verifiable cloud for apps, data, and AI. Founded by Sreeram Kannan, former UW professor and head of the UW Blockchain Lab.",
    funding: "$250M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "a16z, Dragonfly",
    valuation: null,
  },
  {
    name: "Mercor",
    contactEmail: "careers@mercor.com",
    website: "https://www.mercor.com",
    industry: "AI / Labor Markets",
    bio: "Mercor sits at the intersection of labor markets and AI research. We partner with leading AI labs and enterprises to provide human intelligence essential to AI development. 30,000+ experts in our network collectively earning $2M+ per day. A profitable Series C company valued at $10B.",
    funding: "Series C — $350M",
    degreeLevels: ["Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "General Catalyst, Felicis, Benchmark",
    valuation: "$10B",
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
}

function filterCompanies(companies, filters) {
  return companies.filter((c) => {
    const normalizedRoles = [...new Set(c.roles.map(normalizeRole))]

    if (filters.roles.size > 0 && !normalizedRoles.some((r) => filters.roles.has(r))) return false
    if (filters.positions.size > 0 && !c.positions.some((p) => filters.positions.has(p))) return false
    if (filters.stage !== "All" && classifyStage(c.funding, c.valuation, c.name) !== filters.stage) return false
    if (filters.underclassmen && !c.openToUnderclassmen) return false
    if (filters.visa && c.visaSponsorship !== true) return false
    return true
  })
}

function isFiltersActive(filters) {
  return (
    filters.roles.size > 0 ||
    filters.positions.size > 0 ||
    filters.stage !== "All" ||
    filters.underclassmen ||
    filters.visa
  )
}

function FilterBar({ filters, onChange, onClear, totalCount, filteredCount }) {
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

function CompanyCard({ company, onClick }) {
  const { name, website, industry, positions, roles } = company
  return (
    <div className="company-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="card-header">
        <h3 className="card-name">{name}</h3>
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

function CompanyModal({ company, onClose }) {
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

  const filtered = filterCompanies(sortedCompanies, filters)
  const clearFilters = () => setFilters(DEFAULT_FILTERS)

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero">
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
      <section className="companies-section">
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
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <p className="footer-text">BASES &mdash; Stanford University &mdash; 2026</p>
      </footer>

      {/* Modal */}
      {activeCompany && (
        <CompanyModal company={activeCompany} onClose={closeModal} />
      )}
    </div>
  )
}
