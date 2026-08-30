import { useState, useEffect } from 'react';
import { AnimSection, StaggerGrid } from './AnimSection';
import { itemVariant } from './animVariants';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useUrlState } from '../hooks/useUrlState';
import { StartupModal } from './StartupModal';
import './FeaturedStartups.css';

const startups = [
  { id: 'agroconnect', emoji: '🌾', tag: 'AgriTech',    name: 'AgroConnect',   desc: 'Connecting 50,000+ farmers directly to urban markets, eliminating middlemen and increasing farmer income by 40%.', stage: 'Pre-Seed', loc: 'Nashik, MH' },
  { id: 'desithreads', emoji: '👗', tag: 'D2C Fashion', name: 'DesiThreads',   desc: 'Premium Indian ethnic wear brand with a digital-first approach, selling artisan handloom products across India.', stage: 'Seed', loc: 'Varanasi, UP' },
  { id: 'ruralmed',    emoji: '🏥', tag: 'HealthTech',  name: 'RuralMed',      desc: 'Telemedicine platform connecting rural patients to specialist doctors, serving 200+ villages across 5 states.', stage: 'Series A', loc: 'Bhopal, MP' },
  { id: 'bharatlearn', emoji: '📚', tag: 'EdTech',      name: 'BharatLearn',   desc: 'Vernacular skill-learning platform offering job-ready courses in 12 Indian languages for blue-collar workers.', stage: 'Pre-Seed', loc: 'Jaipur, RJ' },
  { id: 'solarkisan',  emoji: '⚡', tag: 'CleanTech',   name: 'SolarKisan',    desc: 'Affordable solar energy solutions for Indian farmers, reducing electricity bills by 70% across 1,000+ farms.', stage: 'Seed', loc: 'Indore, MP' },
  { id: 'tiffinwala',  emoji: '🍱', tag: 'FoodTech',    name: 'TiffinWala',    desc: 'B2B tiffin service platform connecting home cooks to offices, currently serving 5,000+ fresh meals daily.', stage: 'Seed', loc: 'Pune, MH' },
];

const categories = ['All', 'AgriTech', 'D2C Fashion', 'HealthTech', 'EdTech', 'CleanTech', 'FoodTech'];

export default function FeaturedStartups({ onApplyToPitch }) {
  const [urlState, setUrlState] = useUrlState({ cat: 'All', startup: '' });
  const [selectedStartup, setSelectedStartup] = useState(null);

  // Sync modal state from URL parameter (?startup=agroconnect)
  useEffect(() => {
    if (urlState.startup) {
      const match = startups.find((s) => s.id === urlState.startup || s.name.toLowerCase() === urlState.startup.toLowerCase());
      if (match) setSelectedStartup(match);
    } else {
      setSelectedStartup(null);
    }
  }, [urlState.startup]);

  const handleSelectStartup = (s) => {
    setSelectedStartup(s);
    setUrlState({ startup: s.id });
  };

  const handleCloseModal = () => {
    setSelectedStartup(null);
    setUrlState({ startup: '' });
  };

  const filtered = urlState.cat === 'All' 
    ? startups 
    : startups.filter((s) => s.tag.toLowerCase() === urlState.cat.toLowerCase());

  return (
    <section className="featured-startups" id="startups" aria-labelledby="startups-heading">
      <div className="container">
        <AnimSection className="section-header">
          <span className="section-badge">Season 1 Spotlight</span>
          <h2 className="section-title" id="startups-heading">
            The Startups Joining<br /><span className="gradient-text">Karo Pitch Season 1</span>
          </h2>
          <p className="section-subtitle">Bold founders building for Bharat — from agri-tech to deep tech, every corner of India represented.</p>

          {/* Stateful Filter Tabs */}
          <div className="startups-filter-bar" role="tablist" aria-label="Filter startups by sector">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={urlState.cat === cat}
                className={`filter-pill ${urlState.cat === cat ? 'active' : ''}`}
                onClick={() => setUrlState({ cat })}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimSection>

        <StaggerGrid className="startups-grid">
          {filtered.map((s) => (
            <motion.div
              key={s.name}
              className="startup-card"
              variants={itemVariant}
              onClick={() => handleSelectStartup(s)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectStartup(s);
                }
              }}
              aria-label={`View details for ${s.name}`}
            >
              <div className="sc-header">
                <span className="sc-emoji" aria-hidden="true">{s.emoji}</span>
                <span className="sc-tag">{s.tag}</span>
                <ArrowUpRight className="sc-arrow" size={16} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="sc-footer">
                <span className="sc-stage">{s.stage}</span>
                <span className="sc-location">📍 {s.loc}</span>
              </div>
            </motion.div>
          ))}
        </StaggerGrid>
      </div>

      <StartupModal
        startup={selectedStartup}
        onClose={handleCloseModal}
        onApplyToPitch={onApplyToPitch}
      />
    </section>
  );
}
