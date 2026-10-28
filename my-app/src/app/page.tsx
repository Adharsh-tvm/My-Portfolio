
export default function Home() {
  return (
    <main className="portfolio">
      <div className="background-glow" />

      <div className="hero-content">
        <p className="eyebrow">
          FULL STACK DEVELOPER
        </p>

        <h1>
          Turning ideas
          <br />
          into <span>digital reality.</span>
        </h1>

        <p className="description">
          I design and develop modern web experiences
          combining clean code, creative thinking, and
          cutting-edge technology.
        </p>

        <div className="actions">
          <a href="#projects" className="primary-btn">
            Explore My Work ↗
          </a>

          <a href="mailto:your-email@example.com" className="secondary-btn">
            Contact Me
          </a>
        </div>

        <div className="tech-stack">
          <span>React</span>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Node.js</span>
        </div>
      </div>

      <div className="visual">
        <div className="ring ring-one" />
        <div className="ring ring-two" />
        <div className="ring ring-three" />

        <div className="core">
          <span>&lt;/&gt;</span>
        </div>

        <div className="floating-card card-one">
          <span className="card-icon">✳</span>
          <div>
            <strong>Creative</strong>
            <p>Design & Experience</p>
          </div>
        </div>

        <div className="floating-card card-two">
          <span className="card-icon">⌘</span>
          <div>
            <strong>Developer</strong>
            <p>Ideas into Products</p>
          </div>
        </div>
      </div>

      <div className="bottom-label">
        <span>PORTFOLIO — 2026</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </main>
  );
}
