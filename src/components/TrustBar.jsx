import './TrustBar.css';

const logos = ['YourStory', 'Inc42', 'The Hindu', 'Economic Times', 'Shark Tank India', 'Forbes India', 'Mint', 'NDTV Profit'];

export default function TrustBar() {
  // Duplicate items so the marquee scrolls seamlessly
  const all = [...logos, ...logos];
  return (
    <section className="trust-bar" aria-label="Media mentions">
      <div className="trust-inner">
        <p className="trust-label">As Seen In</p>
        <div className="trust-track-wrap">
          <div className="trust-track">
            {all.map((l, i) => (
              <span className="trust-logo" key={i}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
