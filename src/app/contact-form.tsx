"use client";

import { useState, type FormEvent } from "react";

const challenges = ["Tavaraa kertyy liikaa", "Tavaroille on vaikea löytää paikkoja", "En saa aloitettua järjestämistä", "Muu asia"];

export function ContactForm({ email }: { email?: string }) {
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const message = [
      `Nimi: ${values.get("name")}`,
      `Sähköposti: ${values.get("email")}`,
      `Suurin haaste: ${values.get("challenge") || "Ei valintaa"}`,
      "",
      String(values.get("message")).trim(),
    ].join("\n");

    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Yhteydenotto – Tilaa elämään")}&body=${encodeURIComponent(message)}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(message);
      setDraft("");
      setStatus("Viesti kopioitu. Voit liittää sen sähköpostiin.");
    } catch {
      setDraft(message);
      setStatus("Kopioi viesti alla olevasta kentästä.");
    }
  }

  return (
    <form className="contact-form" method="post" onSubmit={submit}>
      <div className="form-row">
        <label>Nimi<input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>Sähköposti<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label>Missä kaipaisit eniten apua?
        <select name="challenge" defaultValue="">
          <option value="">Valitse, jos haluat</option>
          {challenges.map((challenge) => <option key={challenge}>{challenge}</option>)}
        </select>
      </label>
      <label>Kerro vähän tilanteestasi
        <textarea name="message" rows={4} maxLength={2000} required />
      </label>
      <button className="button" type="submit">
        <span>{email ? "Jatka sähköpostiin" : "Kopioi viesti"}</span>
        <span className="button-icon" aria-hidden="true">→</span>
      </button>
      {!email && <p className="form-note">Viesti ei lähde automaattisesti. Voit kopioida tekstin ja lähettää sen itse.</p>}
      {status && <p className="form-note" role="status">{status}</p>}
      {draft && <textarea aria-label="Kopioitava viesti" readOnly value={draft} rows={5} />}
    </form>
  );
}
