"use client";

import { useState, type FormEvent } from "react";

const challenges = ["Tavaraa on liikaa", "Kaapeissa ei ole toimivaa järjestystä", "Aloittaminen tuntuu vaikealta", "Jokin muu"];

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
      setStatus("Viesti kopioitu leikepöydälle.");
    } catch {
      setDraft(message);
      setStatus("Voit kopioida viestin alla olevasta kentästä.");
    }
  }

  return (
    <form className="contact-form" method="post" onSubmit={submit}>
      <div className="form-row">
        <label>Nimi<input name="name" autoComplete="name" maxLength={100} required /></label>
        <label>Sähköposti<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
      </div>
      <label>Mikä on suurin haasteesi?
        <select name="challenge" defaultValue="">
          <option value="">Valitse sinulle sopivin</option>
          {challenges.map((challenge) => <option key={challenge}>{challenge}</option>)}
        </select>
      </label>
      <label>Kerro tilanteestasi
        <textarea name="message" rows={4} maxLength={2000} required />
      </label>
      <button className="button button-primary" type="submit">
        {email ? "Avaa sähköpostissa" : "Kopioi viesti"} <span aria-hidden="true">↗</span>
      </button>
      {!email && <p className="form-note">Esikatselu. Voit kokeilla lomaketta ja kopioida viestin itsellesi.</p>}
      {status && <p className="form-note" role="status">{status}</p>}
      {draft && <textarea aria-label="Kopioitava viesti" readOnly value={draft} rows={5} />}
    </form>
  );
}
