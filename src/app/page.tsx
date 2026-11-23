import Image from "next/image";
import { ContactForm } from "./contact-form";
import { HeroVisual } from "./hero-visual";
import { SiteMotion } from "./site-motion";

const services = [
  {
    number: "01",
    title: "Kaapit ja säilytystilat",
    text: "Käydään tavarat yhdessä läpi ja löydetään niille paikat, joista ne on helppo ottaa ja palauttaa.",
  },
  {
    number: "02",
    title: "Arjen solmukohdat",
    text: "Aloitetaan eteisestä, keittiöstä tai muusta tilasta, jonka toimivuus helpottaisi arkeasi.",
  },
  {
    number: "03",
    title: "Karsinta ja järjestäminen",
    text: "Saat tukea sen päättämiseen, mitä haluat pitää ja mistä olet valmis luopumaan.",
  },
];

export default function Home() {
  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#sisalto">Siirry sisältöön</a>
      <header className="site-header" id="alku">
        <div className="wrap header-inner">
          <a className="brand" href="#alku" aria-label="Tilaa elämään – alkuun">
            <Image className="brand-logo" src="/images/TE.svg" alt="Tilaa elämään" width={2172} height={724} priority />
          </a>
          <nav aria-label="Päävalikko">
            <a href="#palvelut">Palvelut</a>
            <a href="#minusta">Minusta</a>
            <a className="nav-contact" href="#yhteys">Ota yhteyttä <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>

      <main id="sisalto" tabIndex={-1}>
        <div className="hero-scene">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stage">
            <h1 className="hero-title" id="hero-title">
              <svg className="hero-logo" viewBox="0 0 2172 724" role="img" aria-label="Tilaa elämään">
                <defs>
                  <mask id="hero-logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="2172" height="724">
                    <rect className="hero-logo-name" x="0" y="0" width="2172" height="480" fill="white" />
                    <rect className="hero-logo-rule" x="0" y="480" width="2172" height="70" fill="white" />
                    <rect className="hero-logo-subtitle" x="0" y="550" width="2172" height="174" fill="white" />
                  </mask>
                </defs>
                <image href="/images/TE.svg" width="2172" height="724" mask="url(#hero-logo-mask)" />
              </svg>
            </h1>
            <HeroVisual />
          </div>
          <div className="wrap hero-footer">
            <p>Autan sinua järjestämään kotisi niin, että tavarat löytyvät ja arki sujuu.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#palvelut">Tutustu palveluihin <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#minusta">Kuka auttaa?</a>
            </div>
            <span className="scroll-cue" aria-hidden="true">Rullaa alas <span>↓</span></span>
          </div>
        </section>
        </div>

        <section className="services" id="palvelut" aria-labelledby="service-title">
          <div className="services-panel">
            <div className="wrap services-layout">
              <div className="services-intro">
                <h2 id="service-title">Järjestystä,<br /><em>joka tuntuu omalta.</em></h2>
                <p data-reveal>Kodin järjestäminen lähtee sinun arjestasi. Etsitään yhdessä ratkaisu, joka helpottaa juuri sinun päiviäsi.</p>
              </div>
              <div className="service-list">
                {services.map(({ number, title, text }) => (
                  <article className="service-item" key={number}>
                    <span className="service-number">{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <span className="service-arrow" aria-hidden="true">↗</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="principle" id="tyoskentely" aria-labelledby="principle-title">
          <div className="principle-image">
            <Image src="/images/ranta.webp" alt="Rauhallinen järvimaisema ilta-auringossa" fill sizes="100vw" />
            <div className="principle-shade" />
            <div className="wrap principle-copy">
              <h2 id="principle-title">Järjestys ei ole päämäärä.<br /><em>Se tekee tilaa elämälle.</em></h2>
              <p data-reveal>Kun näemme, mitä meillä jo on, koti voi palvella paremmin sitä elämää, jota haluat elää.</p>
              <a className="text-link" href="#yhteys" data-reveal>Kerro, mistä haluat aloittaa <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="about" id="minusta" aria-labelledby="about-title">
          <div className="wrap about-layout">
            <div className="about-portrait">
              <div className="portrait-photo">
                <Image src="/images/henkilokuva-placeholder.webp" alt="Kuvituskuva kukkia asettelevasta henkilöstä" fill sizes="(max-width: 760px) 80vw, 40vw" />
              </div>
            </div>
            <div className="about-copy">
              <h2 id="about-title">Koti on sinua varten.<br /><em>Ei toisin päin.</em></h2>
              <p data-reveal>Perustin Tilaa elämään, koska uskon, että arki voi helpottua, kun näemme, mitä meillä jo on.</p>
              <p data-reveal>Järjestämme kotia yhdessä sinun tahdissasi. Sinä päätät, mille haluat tehdä tilaa.</p>
              <span className="about-signoff" data-reveal>Tilaa elämään</span>
            </div>
          </div>
        </section>

        <section className="contact" id="yhteys" aria-labelledby="contact-title">
          <div className="wrap contact-layout">
            <div className="contact-intro">
              <h2 id="contact-title">Mistä<br /><em>aloitetaan?</em></h2>
              <p data-reveal>Yksi hankala kaappi riittää alkuun. Kerro, mikä kotona kaipaa järjestystä.</p>
            </div>
            <ContactForm email={process.env.CONTACT_EMAIL?.trim()} />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="brand" href="#alku" aria-label="Tilaa elämään – alkuun">
            <Image className="brand-logo" src="/images/fff350a0-1c99-4eb8-954e-a1b576e990ee.png" alt="Tilaa elämään" width={2172} height={724} />
          </a>
          <p>Vähemmän tavaraa. Enemmän elämää.</p>
          <a className="text-link" href="#alku">Takaisin alkuun <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
