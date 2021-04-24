import "./Footer.css";

export const Footer = () => (
  <footer className="Footer footer">
    <div className="content has-text-centered">
      <p>
        Built by{" "}
        <a href="https://www.tiernebre.com/" target="_blank" rel="noreferrer">
          Brendan Tierney
        </a>
        .
      </p>
      <p>
        <a href="https://opensource.org/licenses/MIT">MIT Licensed</a>. Check
        out my{" "}
        <a
          href="https://github.com/Tiernebre/ninjask"
          target="_blank"
          rel="noreferrer"
        >
          source code
        </a>
        !
      </p>
    </div>
  </footer>
);
