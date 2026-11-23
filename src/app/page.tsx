import Image from "next/image";
import { ContactForm } from "./contact-form";
import { HeroVisual } from "./hero-visual";
import { SiteHeader } from "./site-header";
import { SiteMotion } from "./site-motion";

const services = [
  {
    number: "01",
    title: "Kaapit ja säilytystilat",
    text: "Käydään kaappi tai varasto yhdessä läpi. Katsotaan, mitä käytät ja mihin tavarat olisi kätevintä laittaa.",
  },
  {
    number: "02",
    title: "Arjen hankalat kohdat",
    text: "Eteinen, keittiön taso tai pyykkikori, joka täyttyy taas. Aloitetaan siitä, mikä kotona harmittaa eniten.",
  },
  {
    number: "03",
    title: "Tavaroiden läpikäynti",
    text: "Sinä päätät, mitä pidät. Voin auttaa miettimään, mikä kannattaa säästää ja mistä voisi olla aika luopua.",
  },
];

const questions = [
  {
    question: "Mitä ammattijärjestäjä tekee?",
    answer: "Autan käymään tavaroita läpi ja miettimään, mihin ne olisi kätevintä laittaa. Sinä päätät, mitä tehdään. Voidaan aloittaa vaikka yhdestä kaapista.",
  },
  {
    question: "Kenelle palvelu sopii?",
    answer: "Jos jokin kohta kotona kuormittaa tai et saa järjestämistä yksin alkuun, voin auttaa. Koko kotia ei tarvitse laittaa kerralla kuntoon.",
  },
  {
    question: "Pitääkö minun luopua tavaroistani?",
    answer: "Ei tarvitse. Sinä päätät, mitä säilytät. Voin auttaa punnitsemaan, käytätkö tavaraa tai olisiko sille käyttöä jossain muualla, mutta en painosta luopumaan.",
  },
  {
    question: "Pitääkö koti siivota ennen tapaamista?",
    answer: "Ei tarvitse siivota tai järjestellä etukäteen. Aloitetaan siitä, mikä kaipaa apua.",
  },
  {
    question: "Miten pääsemme alkuun?",
    answer: "Laita viesti ja kerro, mikä kotona ei oikein toimi. Mietitään yhdessä, mistä olisi hyvä aloittaa.",
  },
];

export default function Home() {
  return (
    <>
      <SiteMotion />
      <a className="skip-link" href="#sisalto">Siirry sisältöön</a>
      <SiteHeader />

      <main id="sisalto" tabIndex={-1}>
        <div className="hero-scene">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-stage">
            <h1 className="hero-title" id="hero-title">
              <svg className="hero-logo" viewBox="0 0 2172 724" role="img" aria-label="Tilaa elämään">
                <defs>
                  <mask id="hero-logo-name-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="2172" height="724">
                    <rect x="0" y="0" width="2172" height="480" fill="white" />
                  </mask>
                  <mask id="hero-logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="2172" height="724">
                    <rect className="hero-logo-rule" x="0" y="480" width="2172" height="70" fill="white" />
                    <rect className="hero-logo-subtitle" x="0" y="550" width="2172" height="174" fill="white" />
                  </mask>
                </defs>
                <g mask="url(#hero-logo-name-mask)">
                  <image className="hero-logo-name" href="/images/TE.svg" width="2172" height="724" />
                </g>
                <image href="/images/TE.svg" width="2172" height="724" mask="url(#hero-logo-mask)" />
              </svg>
            </h1>
            <HeroVisual />
          </div>
          <div className="wrap hero-footer">
            <p>Tuntuuko, etteivät tavarat löydä paikkaansa tai järjestäminen jää aina kesken? Voidaan aloittaa yhdestä kaapista.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#palvelut">Katso, missä voin auttaa <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#minusta">Tietoa minusta</a>
            </div>
            <span className="scroll-cue" aria-hidden="true">Rullaa alas <span>↓</span></span>
          </div>
        </section>
        </div>

        <section className="services" id="palvelut" aria-labelledby="service-title">
          <div className="services-panel">
            <div className="wrap services-layout">
              <div className="services-intro">
                <h2 id="service-title">Missä kotona kaipaisit apua?<br /><em>Aloitetaan siitä.</em></h2>
                <p data-reveal>Koko kotia ei tarvitse laittaa kerralla uusiksi. Valitaan yhdessä kohta, jonka järjestäminen helpottaisi arkea eniten.</p>
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
            <Image src="/images/mid.jpg" alt="Järjestetty olohuone, jossa on sohva ja kirjahylly" fill sizes="100vw" />
            <div className="principle-shade" />
            <div className="wrap principle-copy">
              <h2 id="principle-title">Koti ei ole näyttelytila.<br /><em>Sen pitää toimia arjessa.</em></h2>
              <p data-reveal>Mietitään, missä tavaroita käytät ja mihin ne on helppo laittaa takaisin. En järjestä kaappeja kuvaa varten, vaan sinun arkeasi varten.</p>
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
              <h2 id="about-title">Minä autan.<br /><em>Sinä päätät.</em></h2>
              <p data-reveal>Perustin Tilaa elämään, koska kodin pitäisi helpottaa arkea, ei tehdä siitä hankalampaa.</p>
              <p data-reveal>Käydään tavaroita läpi ja mietitään niille paikat, jotka sopivat sinun arkeesi. Sinä päätät, mitä säilytetään.</p>
              <span className="about-signoff" data-reveal>Tilaa elämään</span>
            </div>
          </div>
        </section>

        <section className="faq" id="usein-kysyttya" aria-labelledby="faq-title">
          <div className="wrap faq-layout">
            <div className="faq-intro">
              <span className="faq-eyebrow">Hyvä tietää</span>
              <h2 id="faq-title">Usein<br /><em>kysyttyä.</em></h2>
              <p>Mietitkö, pitääkö siivota ennen käyntiä tai luopua tavaroista? Ei tarvitse kumpaakaan.</p>
              <a className="text-link" href="#yhteys">Ota yhteyttä <span aria-hidden="true">↗</span></a>
            </div>
            <div className="faq-list">
              {questions.map(({ question, answer }) => (
                <details className="faq-item" key={question}>
                  <summary>
                    <span>{question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="yhteys" aria-labelledby="contact-title">
          <div className="wrap contact-layout">
            <div className="contact-intro">
              <h2 id="contact-title">Mistä<br /><em>aloitetaan?</em></h2>
              <p data-reveal>Kerro, mikä kotona mietityttää. Ei haittaa, vaikka et vielä tietäisi, mitä tarvitset — mietitään sitä yhdessä.</p>
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
          <p>Kotona ei tarvitse olla valmista, kun aloitetaan.</p>
          <a className="text-link" href="#alku">Takaisin alkuun <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
