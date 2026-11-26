import Image from "next/image";
import type { CSSProperties } from "react";
import { ContactForm } from "./contact-form";
import { PriceDock } from "./price-dock";
import { SiteHeader } from "./site-header";
import { SiteMotion } from "./site-motion";

type Shape = "arch" | "oval" | "circle" | "soft";

function Media({ src, alt, shape, sizes, className = "", position, preload }: {
  src: string;
  alt: string;
  shape: Shape;
  sizes: string;
  className?: string;
  position?: string;
  preload?: boolean;
}) {
  return (
    <figure className={`media media-${shape} ${className}`} data-media>
      <div className="media-inner" data-parallax>
        <Image src={src} alt={alt} fill sizes={sizes} preload={preload} style={position ? { objectPosition: position } : undefined} />
      </div>
    </figure>
  );
}

const pillars = [
  { label: "Koti", text: "Selkeyttä, helppoutta ja toimivuutta arkeen.", src: "/images/aamu.webp", alt: "Aamuvalo makuuhuoneessa ja vaaleansininen pussilakana", shape: "soft" as const },
  { label: "Aika", text: "Tilaa olemiselle, tilaa olennaiselle.", src: "/images/pola3.jpg", alt: "Rullattuja pyyhkeitä korissa", shape: "arch" as const, position: "60% center" },
  { label: "Mieli", text: "Vähemmän visuaalista ja kognitiivista kuormaa.", src: "/images/ranta.webp", alt: "Tyyni järvimaisema illalla", shape: "circle" as const },
  { label: "Kuluttaminen", text: "Vähemmän tarpeetonta, enemmän kiitollisuutta olemassa olevaan.", src: "/images/pola4.jpg", alt: "Valoisa ja järjestetty vaatehuone", shape: "soft" as const, position: "center 40%" },
];

const moments = [
  "Kaappien ovet eivät meinaa mahtua kiinni, mutta silti tuntuu, ettei tarvittavaa tai päällepantavaa löydy.",
  "Olet järjestänyt saman eteisen tai keittiön tason monta kertaa, ja kaaos palaa aina takaisin.",
  "Kotona on kohtia, joiden ohi kuljet nopeasti ja joiden ajatteleminenkin väsyttää.",
  "Muuttolaatikot, pieneksi jääneet vaatteet tai varasto odottavat parempaa hetkeä, jota ei vain tule.",
  "Haluaisit luopua turhasta, mutta päätösten tekeminen yksin tuntuu raskaalta.",
];

const packages = [
  {
    name: "Alkukartoitus",
    lead: "Katsotaan tilanne rauhassa läpi kotonasi tai etänä. Saat selkeän ajatuksen siitä, mistä kannattaa aloittaa ja paljonko aikaa järjestämiseen menee.",
    includes: ["Tapaaminen kotonasi tai etänä", "Arvio kestosta ja etenemisestä", "Ei sido sinua mihinkään"],
  },
  {
    name: "Järjestelyapu kotiin",
    lead: "Järjestetään yhdessä vaatekaappi, eteinen, keittiö tai muu arkea kuormittava kohta. Karsitaan, etsitään tavaroille paikat ja lajitellaan kierrätykseen lähtevät.",
    includes: ["Yhdessä karsiminen ja järjestäminen", "Arjessa toimivat säilytysratkaisut", "Kierrätyksen ja lahjoitusten lajittelu"],
    featured: true,
  },
  {
    name: "Isompi kokonaisuus",
    lead: "Kun haluat laittaa kuntoon useamman tilan, koko kodin tai kaipaat apua muuton ja elämänmuutoksen keskelle. Edetään pala kerrallaan.",
    includes: ["Useampi käynti sinun tahdissasi", "Selkeä järjestys tila kerrallaan", "Vinkit järjestyksen ylläpitoon"],
  },
];

const focusAreas = ["Kaapit ja komerot", "Eteinen", "Keittiö", "Vaatehuone", "Lastenhuone", "Varasto", "Muutto"];

const instagramPreview = [
  "/images/ikkunavalo.webp",
  "/images/pola4.jpg",
  "/images/aamu.webp",
  "/images/pola3.jpg",
  "/images/liinavaatteet.webp",
];

const questions = [
  {
    question: "Pitääkö koti siivota ennen tapaamista?",
    answer: "Ei tarvitse siivota eikä järjestellä etukäteen. On oikeastaan vain hyödyllistä nähdä tilanne sellaisena kuin se arjessa on — ilman arvostelua.",
  },
  {
    question: "Pitääkö minun luopua tavaroistani?",
    answer: "Ei tarvitse. Sinä päätät aina, mitä pidät ja mistä olet valmis luopumaan. Autan sinua punnitsemaan vaihtoehtoja rauhassa, mutta en koskaan painosta heittämään mitään pois.",
  },
  {
    question: "Mitä palvelu maksaa ja saako siitä kotitalousvähennyksen?",
    answer: "Tarkat hinnat julkaistaan pian kohtaan Palvelut & hinnasto. Kotona tehtävästä järjestelytyöstä voit hyödyntää kotitalousvähennyksen (40 % työn osuudesta). Kerron aina etukäteen arvion kestosta, eikä lisätunteja tehdä ilman sopimista.",
  },
  {
    question: "Mitä ammattijärjestäjä oikeastaan tekee?",
    answer: "Autan sinua käymään tavaroita läpi, karsimaan tarpeetonta ja löytämään säilytyspaikat, jotka toimivat omassa arjessasi. Toimin rinnallasi niin, että työ oikeasti etenee.",
  },
  {
    question: "Voinko varata avun vain yhdelle kaapille tai huoneelle?",
    answer: "Ehdottomasti. Koko kotia ei tarvitse laittaa kerralla kuntoon — usein jo yksi toimiva eteinen tai vaatekaappi keventää arkea yllättävän paljon.",
  },
  {
    question: "Miten pääsemme alkuun?",
    answer: "Laita viestiä alla olevalla lomakkeella ja kerro lyhyesti, mikä kotona mietityttää. Sinun ei tarvitse tietää vielä tarkkaa pakettia — mietitään se yhdessä.",
  },
];

function LogoMark({ id }: { id: string }) {
  return (
    <svg className="logo-mark" viewBox="0 0 1600 586" role="img" aria-label="Tilaa elämään">
      <defs>
        <mask id={`${id}-name`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="586">
          <rect x="0" y="0" width="1600" height="330" fill="white" />
        </mask>
        <mask id={`${id}-rest`} maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="586">
          <rect className="logo-rule" x="0" y="360" width="1600" height="70" fill="white" />
          <rect className="logo-subtitle" x="0" y="480" width="1600" height="106" fill="white" />
        </mask>
      </defs>
      <g mask={`url(#${id}-name)`}>
        <image className="logo-name" href="/images/TElogo.svg" width="1600" height="586" />
      </g>
      <image href="/images/TElogo.svg" width="1600" height="586" mask={`url(#${id}-rest)`} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteMotion />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="loader" aria-hidden="true">
        <div className="loader-logo"><LogoMark id="loader-logo" /></div>
      </div>
      <a className="skip-link" href="#sisalto">Siirry sisältöön</a>
      <SiteHeader />
      <PriceDock />

      <main id="sisalto" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <h1 className="hero-title" id="hero-title">
                <span className="line"><span>Tilaa sinne,</span></span>{" "}
                <span className="line"><span>missä elämä</span></span>{" "}
                <span className="line"><span>tapahtuu.</span></span>
              </h1>
              <div className="hero-foot">
                <p>Autan sinua luomaan kaunista arkea, jossa on helppo hengittää. Voidaan aloittaa vaikka yhdestä kaapista — ilman kiirettä ja ilman arvostelua.</p>
                <div className="hero-actions">
                  <a className="button" href="#hinnasto">
                    <span>Palvelut &amp; hinnasto</span>
                    <span className="button-icon" aria-hidden="true">→</span>
                  </a>
                  <a className="text-link" href="#ajatus">Lue lisää</a>
                </div>
              </div>
            </div>

            <div className="hero-art">
              <div className="hero-ring" aria-hidden="true" />
              <div className="hero-piece hero-piece-arch" data-depth="0.5">
                <Media src="/images/ikkunavalo.webp" alt="Kuivakukkia maljakossa auringonvalossa ikkunan edessä" shape="arch" sizes="(max-width: 900px) 78vw, 36vw" preload />
              </div>
              <div className="hero-piece hero-piece-circle" data-depth="0.9">
                <Media src="/images/liinavaatteet.webp" alt="Pyyhkeitä siisteissä pinoissa kaapissa" shape="circle" sizes="(max-width: 900px) 44vw, 18vw" />
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto" id="ajatus" aria-label="Ajatus">
          <div className="wrap manifesto-inner">
            <span className="hairline" data-line aria-hidden="true" />
            <p className="manifesto-text" data-words>
              Hyvä ja tyytyväisyyttä tuova elämä ei välttämättä vaadi lisää uutta, vaan tilaa ja pysähtymistä sen äärelle, mikä on jo tärkeää.
            </p>
            <p className="manifesto-note" data-reveal>Arkea on eniten. Siksi kodin kannattaa toimia juuri sinulle.</p>
          </div>
        </section>

        <section className="pillars" aria-labelledby="pillars-title">
          <div className="wrap">
            <h2 id="pillars-title" className="section-title center">Kun kotiin tulee tilaa,<br />{" "}sitä tulee myös elämään.</h2>
            <div className="pillar-grid">
              {pillars.map(({ label, text, src, alt, shape, position }, index) => (
                <article className="pillar" key={label} style={{ "--i": index } as CSSProperties}>
                  <Media src={src} alt={alt} shape={shape} position={position} sizes="(max-width: 760px) 45vw, 22vw" />
                  <h3 className="label">{label}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="moments" aria-labelledby="moments-title">
          <div className="wrap moments-layout">
            <div className="moments-aside">
              <h2 id="moments-title">Kuulostaako<br />{" "}tutulta?</h2>
              <p data-reveal>Et ole ainoa. Usein järjestäminen ei jää kiinni tahdosta, vaan siitä, ettei yksin enää jaksa miettiä mistä aloittaisi.</p>
              <Media className="moments-photo" src="/images/aamu.webp" alt="Pehmeä aamuvalo makuuhuoneessa" shape="arch" sizes="(max-width: 900px) 80vw, 26vw" />
            </div>

            <div className="moments-body">
              <ol className="moments-list">
                {moments.map((text, index) => (
                  <li className="moment-item" key={text}>
                    <span className="hairline" data-line aria-hidden="true" />
                    <div className="moment-row" data-reveal>
                      <span className="moment-num">0{index + 1}</span>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="moments-close" data-reveal>
                <p>Koko kotia ei tarvitse laittaa kerralla kuntoon. Joskus jo yksi selkeä kaappi keventää koko viikkoa.</p>
                <a className="text-link" href="#yhteys">Mihin kaipaisit tilaa?</a>
              </div>
            </div>
          </div>
        </section>

        <section className="about" id="minusta" aria-labelledby="about-title">
          <div className="wrap about-layout">
            <div className="about-panel">
              <h2 id="about-title">Tervetuloa järjestyksen ja harmonian äärelle.</h2>
              <p data-reveal>Hei, olen Ella — koulutettu ammattijärjestäjä. Tavoitteeni ei ole rakentaa näyttelykotia, vaan auttaa sinua löytämään järjestys, joka kestää oikeaa arkea.</p>
              <p data-reveal>Käymme tavaroita läpi rauhassa sinun tahtiisi. Sinä päätät aina, mitä pidät ja mistä olet valmis luopumaan. Minä tuon mukanani selkeän suunnitelman, toiset silmät ja kädet avuksi.</p>
              <a className="text-link" href="#yhteys" data-reveal>Laita viestiä</a>
            </div>
            <div className="about-portrait">
              <Media className="about-photo" src="/images/henkilokuva-placeholder.webp" alt="Ella asettelee kukkia maljakkoon" shape="soft" sizes="(max-width: 900px) 75vw, 40vw" position="center 25%" />
            </div>
          </div>
        </section>

        <section className="pricing" id="hinnasto" aria-labelledby="pricing-title">
          <div className="wrap">
            <div className="pricing-head">
              <h2 id="pricing-title">Palvelut &amp;<br />{" "}hinnasto.</h2>
              <p data-reveal>Aloitetaan siitä, mikä arjessa tuntuu nyt raskaimmalta. Kotona tehtävästä työstä voi hyödyntää kotitalousvähennyksen (40 % työn osuudesta).</p>
            </div>

            <div className="package-grid">
              {packages.map(({ name, lead, includes, featured }, index) => (
                <article className={`package${featured ? " package-featured" : ""}`} key={name} data-card>
                  <span className="package-number">0{index + 1}</span>
                  <h3>{name}</h3>
                  <p>{lead}</p>
                  <ul>
                    {includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <div className="package-price">
                    <span>Hinta</span>
                    <strong>Julkaistaan pian</strong>
                  </div>
                  <a className="package-link" href="#yhteys">Kysy lisää <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>

            <div className="focus" data-reveal>
              <span className="label">Autan esimerkiksi</span>
              <p className="focus-line">{focusAreas.join(" · ")}</p>
            </div>
          </div>
        </section>

        <section className="story" aria-label="Asiakaskokemukset">
          <div className="wrap story-layout">
            <div className="story-quotes">
              <blockquote className="story-primary" data-reveal>
                <p>“Järjestelykonsultin kotiin päästäminen ja kurjan tilanteen esittely tuntui etukäteen nololta, mutta myös positiiviselta — nyt saan toiset silmät ja aivot tarkistamaan tilan. Työskentely oli helppoa ja luontevaa. Ella tarttui rivakasti toimeen, ja hänen kanssaan oli helppo päättää, mitä säästetään ja mitä laitetaan kierrätykseen.”</p>
                <footer className="label">— Asiakas</footer>
              </blockquote>
              <span className="hairline" data-line aria-hidden="true" />
              <blockquote className="story-secondary" data-reveal>
                <p>“Lähtötilanne oli enemmän kuin surullinen. Vaatehuone oli ajan saatossa kuin pommin jäljiltä, eikä aika ja jaksaminen riittänyt aloittamiseen, kun ei enää jaksanut edes ajatella mihin pitäisi tarttua.”</p>
                <footer className="label">— Asiakas, vaatehuone</footer>
              </blockquote>
            </div>
            <div className="story-art">
              <Media className="story-main" src="/images/liinavaatteet.webp" alt="Pyyhkeet järjestettynä kaappiin" shape="soft" sizes="(max-width: 760px) 70vw, 30vw" />
              <Media className="story-side" src="/images/pola1.jpg" alt="Lastenhuoneen hylly ja säilytyskorit" shape="circle" sizes="(max-width: 760px) 40vw, 16vw" position="center 60%" />
            </div>
          </div>
        </section>

        <section className="faq" id="usein-kysyttya" aria-labelledby="faq-title">
          <div className="wrap faq-layout">
            <div className="faq-intro">
              <h2 id="faq-title">Usein<br />{" "}kysyttyä.</h2>
              <p data-reveal>Moni miettii samoja asioita ennen ensimmäistä viestiä. Tässä suorat vastaukset.</p>
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
              <h2 id="contact-title">Mihin kaipaisit<br />{" "}tilaa?</h2>
              <p data-reveal>Kerro lyhyesti, mikä kotona kaipaisi apua. Sinun ei tarvitse tietää vielä tarkkaa palvelua — mietitään se yhdessä. Yhteydenotto ei sido mihinkään.</p>
            </div>
            <ContactForm email={process.env.CONTACT_EMAIL?.trim()} />
          </div>
        </section>

        <section className="instagram" aria-labelledby="instagram-title">
          <div className="wrap">
            <div className="instagram-head">
              <h2 id="instagram-title">Instagram</h2>
              <p>Esimerkkikuvat – Instagram-julkaisut tulevat tähän myöhemmin.</p>
            </div>
            <div className="instagram-grid">
              {instagramPreview.map((src) => (
                <div className="instagram-image" key={src}>
                  <Image src={src} alt="" fill sizes="(max-width: 760px) 30vw, 19vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p className="footer-statement" data-reveal>Selkeys ja kauneus voi asua myös sinun kodissasi.</p>
          <div className="footer-inner">
            <a className="brand" href="#alku" aria-label="Tilaa elämään – alkuun">
              <Image className="brand-logo" src="/images/TElogo.svg" alt="Tilaa elämään" width={1600} height={586} />
            </a>
            <nav className="footer-nav" aria-label="Alatunnisteen valikko">
              <a href="#ajatus">Ajatus</a>
              <a href="#hinnasto">Palvelut &amp; hinnasto</a>
              <a href="#minusta">Minusta</a>
              <a href="#usein-kysyttya">Kysyttyä</a>
              <a href="#yhteys">Ota yhteyttä</a>
            </nav>
            <a className="text-link" href="#alku">Takaisin alkuun <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </footer>
    </>
  );
}
