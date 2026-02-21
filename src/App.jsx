import { useState, useEffect, useCallback } from 'react'
import './App.css'

const companies = [
  {
    name: "Circle AI",
    website: "https://www.usecircle.com",
    industry: "Insurance Technology (InsurTech)",
    bio: "Circle is an AI automation platform for US commercial P&C insurance brokerages. We deploy AI agents that execute operations work end-to-end — handling email communications, COIs, endorsements, renewal outreach, quoting prep, and carrier portal automation. Unlike copilots, Circle executes complete workflows autonomously, working as an overlay on brokerages' existing systems. Founded by a Stanford team and already deployed with real agencies.",
    funding: "Pre-seed (~$2M from Unusual Ventures)",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "Unusual Ventures",
    valuation: null,
    contactEmail: "careers@usecircle.com",
  },
  {
    name: "Rox",
    website: "https://rox.com",
    industry: "AI / GTM",
    bio: "Rox deploys thousands of AI agents to help run your business end to end.",
    funding: "Series A — $49M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: null,
    valuation: "$415M",
    contactEmail: "careers@rox.com",
  },
  {
    name: "Sphere",
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
    contactEmail: "careers@getsphere.com",
  },
  {
    name: "Convexia",
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
    contactEmail: "careers@convexia.bio",
  },
  {
    name: "DeepGrove",
    website: "https://deepgrove.ai",
    industry: "AI",
    bio: "DeepGrove AI is an efficient AI research lab based in San Francisco. We develop foundational AI models that operate on the Pareto frontier of efficiency and performance, delivering state-of-the-art quality while dramatically reducing memory, energy, and infrastructure requirements.",
    funding: "Seed — $9M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "ML Engineer"],
    investors: "YC, Initialized, Greylock",
    valuation: "$80M",
    contactEmail: "careers@deepgrove.ai",
  },
  {
    name: "Mem0",
    website: "https://mem0.ai",
    industry: "Artificial Intelligence",
    bio: "Mem0 provides a memory layer for LLM applications, enabling them to remember and learn from user interactions over time. YC-backed with $24M Series A. 45K GitHub stars, and exclusive memory provider for AWS's Agent SDK.",
    funding: "Series A — $24M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Growth"],
    investors: "YC, Basis Set, Peak XV, Kindred Ventures, GitHub",
    valuation: null,
    contactEmail: "careers@mem0.ai",
  },
  {
    name: "Turing Labs",
    website: "https://www.turingsaas.com",
    industry: "Vertical SaaS",
    bio: "Turing Labs is a B2B AI platform purpose-built for R&D to replace manual trial-and-error experimentation. Backed by Y Combinator and $20M funded. Turing does for CPG products what AI does for drug discovery.",
    funding: "$20M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: false,
    roles: ["Software Engineer", "Growth"],
    investors: "Y Combinator, Insight Partners",
    valuation: "Private",
    contactEmail: "careers@turingsaas.com",
  },
  {
    name: "Embedder",
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
    contactEmail: "careers@embedder.com",
  },
  {
    name: "Bild AI",
    website: "https://www.bild.ai",
    industry: "Construction Tech",
    bio: "Bild AI is an AI-powered estimating platform helping construction subcontractors accelerate affordable housing delivery. We turn days of manual takeoff work into hours — so subcontractors can bid on more projects and win them profitably.",
    funding: "Seed",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "YC, Khosla Ventures",
    valuation: "$30M",
    contactEmail: "careers@bild.ai",
  },
  {
    name: "AGI House",
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
    contactEmail: "careers@agihouse.org",
  },
  {
    name: "Spectral Labs",
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
    contactEmail: "careers@spectrallabs.ai",
  },
  {
    name: "Polymath",
    website: "https://polymathmade.com",
    industry: "AI / Spatial Reasoning",
    bio: "Polymath is tackling AI's next great frontier — spatial reasoning — to digitize the industrial world, starting by converting 2D drawings into 3D CAD models.",
    funding: "Pre-seed",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: false,
    positions: ["Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "Xfund, Omni Ventures, AME Cloud",
    valuation: "$9M",
    contactEmail: "careers@polymathmade.com",
  },
  {
    name: "Moxie Robots",
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
    contactEmail: "careers@moxierobots.com",
  },
  {
    name: "Kerra",
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
    contactEmail: "careers@kerra.earth",
  },
  {
    name: "Prime Intellect",
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
    contactEmail: "careers@primeintellect.ai",
  },
  {
    name: "Ironsite AI",
    website: "https://ironsite.ai",
    industry: "Construction Tech",
    bio: "Ironsite deploys wearable vision devices for field contractors, automating the collection of labor insights and enabling objective training and rewards. $13M+ raised, with an upcoming $40M Series A.",
    funding: "$13M+ (closing $40M Series A)",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer"],
    investors: "8VC, South Park Commons, Jeff Dean, Eric Glyman",
    valuation: "$70M",
    contactEmail: "careers@ironsite.ai",
  },
  {
    name: "Delve",
    website: "https://delve.co",
    industry: "Compliance / AI",
    bio: "Delve automates compliance busywork, saving you hundreds of hours. Get back to what makes your business better and leave the compliance to Delve's AI agents.",
    funding: "Series A — $32M",
    degreeLevels: ["Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Part-time", "Full-time"],
    visaSponsorship: true,
    roles: ["Software Engineer", "Product", "Growth"],
    investors: "Insight Partners",
    valuation: "$300M",
    contactEmail: "careers@delve.co",
  },
  {
    name: "Pally",
    website: "https://www.pally.com",
    industry: "Software / Productivity",
    bio: "Pally is an intelligent unified inbox. We bring together iMessage, WhatsApp, LinkedIn, and X — helping you keep track, stay in touch, and reach inbox zero. We bring productivity to the DMs.",
    funding: "Seed — $4.6M",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer"],
    investors: "YC, co-founders of Hugging Face, Slack, and Ramp",
    valuation: "$30M",
    contactEmail: "careers@pally.com",
  },
  {
    name: "Phinity",
    website: "https://phinity.ai",
    industry: "Semiconductor / AI",
    bio: "Phinity is automating chip development so ASICs can be built in weeks instead of years. We build simulation environments to teach AI agents to develop chips end-to-end, and are working with frontier model labs to benchmark and train hardware engineering agents.",
    funding: "Seed — $5.5M+",
    degreeLevels: ["Freshmen", "Sophomores", "Juniors", "Seniors", "Masters", "PhD"],
    openToUnderclassmen: true,
    positions: ["Internship", "Part-time", "Full-time"],
    visaSponsorship: null,
    roles: ["Software Engineer", "ML Engineer"],
    investors: "Unannounced (incl. Jeff Dean)",
    valuation: "Unannounced",
    contactEmail: "careers@phinity.ai",
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

function classifyStage(funding, valuation) {
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
  // Handle "500M+" style strings — strip non-numeric except decimal
  return parseFloat(valuation.replace(/[^0-9.]/g, '')) || 0
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
    if (filters.stage !== "All" && classifyStage(c.funding, c.valuation) !== filters.stage) return false
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
            <strong>$3B+ in total valuations, $300M+ companies.</strong>
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
