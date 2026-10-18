export type ProjectScene = {
  title: string;
  body: string;
  notes: [string, string, string];
};

export const projectScenes: ProjectScene[][] = [
  [
    { title: "Zwei Oberflächen. Eine private Welt.", body: "Nach aussen ein funktionierender Rechner. Dahinter ein persönlicher Medien-Vault. Der Wechsel entsteht durch eine geheime PIN — die Inhalte bleiben auf dem eigenen Gerät.", notes: ["Alltag / Calculator", "Privater Bereich / Medien", "Speicherung / Local-first"] },
    { title: "Der Schlüssel bleibt bei dir.", body: "PBKDF2 leitet das Schlüsselmaterial ab. AES-GCM verschlüsselt die Inhalte. IndexedDB hält die Daten lokal. Die Architektur verzichtet auf einen Umweg über fremde Server.", notes: ["Schlüssel / PBKDF2", "Verschlüsselung / AES-GCM", "Datenhaltung / IndexedDB"] },
    { title: "Privatsphäre bis ins Detail.", body: "Alben und Favoriten schaffen Ordnung. Auto-Lock schliesst den privaten Bereich wieder. Verschlüsselte .cvault-Backups machen die eigenen Daten transportierbar, ohne sie offen abzulegen.", notes: ["Ordnung / Alben & Favoriten", "Zustand / Auto-Lock", "Export / .cvault"] },
  ],
  [
    { title: "Eine Stadt ist mehr als eine Karte.", body: "CityPulse beginnt mit einer einfachen Stadtsuche. Geocoding übersetzt den Namen in einen Ort — und dieser Ort wird zum gemeinsamen Bezugspunkt für Karte, Wetter und Luftqualität.", notes: ["Eingabe / Stadtsuche", "Auflösung / Geocoding", "Orientierung / OpenStreetMap"] },
    { title: "Aus einzelnen Daten wird Kontext.", body: "Wetter und Luftqualität stehen nicht als isolierte Zahlen nebeneinander. Sie werden am selben Ort lesbar und ergänzen die räumliche Übersicht zu einem verständlichen Lagebild.", notes: ["Quelle / Open-Meteo", "Ebene / Wetter & Luft", "Darstellung / Ein gemeinsamer Ort"] },
    { title: "Weniger Suchen. Mehr Verstehen.", body: "Die Oberfläche bündelt die wichtigsten City-Signale in einem Control Room. Der nächste Schritt bleibt direkt erreichbar: Stadt wechseln, Karte erkunden und aktuelle Bedingungen einordnen.", notes: ["Interaktion / Stadt wechseln", "Kontext / City-Signale", "Erlebnis / Im Browser ausprobieren"] },
  ],
  [
    { title: "Spannung braucht keinen Lärm.", body: "LUXE NOIR übersetzt die Atmosphäre eines privaten Spieltischs in eine Browser-Demo. Roulette, Blackjack und Slots erhalten eine gemeinsame visuelle Sprache — mit klaren Reaktionen auf jede Aktion.", notes: ["Atmosphäre / Dark Luxury", "Spielwelt / Drei Modi", "Einordnung / Simulator ohne Echtgeld"] },
    { title: "Jede Geste verändert den Zustand.", body: "Eine Karte wird ausgeteilt. Eine Runde endet. Die nächste beginnt. Hinter den sichtbaren Reaktionen stehen Spielregeln, Session-Zustände und Feedback, die nachvollziehbar zusammenarbeiten.", notes: ["Eingabe / Spieleraktion", "Logik / Spielzustand", "Antwort / Sichtbares Feedback"] },
    { title: "Die Runde endet. Das System bleibt.", body: "Lokaler Account-Bereich und Session-Statistiken verbinden die einzelnen Spiele. Das Ergebnis ist ein zusammenhängendes Interface-Experiment mit eigener Identität, statt drei voneinander getrennten Demos.", notes: ["Session / Lokal gespeichert", "Übersicht / Spielstatistiken", "Umsetzung / JavaScript, HTML, CSS"] },
  ],
  [
    { title: "Die Zahl ist erst der Anfang.", body: "Der Noten-Optimizer bildet die Schweizer Skala von 1.0 bis 6.0 ab. Gewichtete Leistungen werden zu einer nachvollziehbaren Ausgangslage — bevor aus einem Wunsch eine Planung wird.", notes: ["Skala / Schweiz 1.0–6.0", "Eingabe / Note × Gewicht", "Basis / Gewichteter Durchschnitt"] },
    { title: "Was verändert die nächste Prüfung?", body: "Im Was-wäre-wenn-Simulator wird aus einer Vermutung ein sichtbares Szenario. Die nächste Note verändert den Durchschnitt. Der Zielnoten-Rechner zeigt, welche Leistung dafür benötigt wird.", notes: ["Simulation / Nächste Note", "Berechnung / Zielnote", "Visualisierung / Beispieldaten"] },
    { title: "Ein Ziel braucht einen nächsten Schritt.", body: "Der Lernplan-Generator führt die Planung weiter. Der ICS-Export bringt die Termine in den Kalender. So bleibt das Ergebnis nicht bei einer Zahl stehen, sondern wird Teil des Lernalltags.", notes: ["Planung / Lernschritte", "Export / ICS-Kalender", "Umsetzung / Python & Streamlit"] },
  ],
  [
    { title: "Ein Browser. Ein präziser Impuls.", body: "Shooterball ist ein vollständig clientseitiges Arcade-Spiel. Bewegung, Hindernisse und Eingaben treffen im Canvas zusammen. Entscheidend ist das Gefühl zwischen Aktion und Reaktion.", notes: ["Plattform / HTML5 Canvas", "Steuerung / Direkte Eingabe", "Ausführung / Clientseitig"] },
    { title: "Ein Treffer muss sich richtig anfühlen.", body: "Partikel markieren den Einschlag. Screen-Shake verstärkt den Moment. Slow-Motion verändert die Wahrnehmung. Die Effekte folgen dem Spielgeschehen und machen dessen Zustände spürbar.", notes: ["Treffer / Partikel", "Gewicht / Screen-Shake", "Dramaturgie / Slow-Motion"] },
    { title: "Fünf Level. Dann der Boss.", body: "Kampagne, Boss-System und Endless-Modus geben dem Spiel unterschiedliche Rhythmen. Perks verändern den Lauf. Das Projekt verbindet Game-Loop, Spielzustände und visuelles Feedback in einer Browser-Anwendung.", notes: ["Kampagne / Fünf Level", "Finale / Boss-System", "Wiederspiel / Endless & Perks"] },
  ],
  [
    { title: "Das Spiel endet. Die Übersicht beginnt.", body: "Für Fans und Staff zählt zuerst, was auf dem Platz passiert ist. Das Dashboard bringt Resultate und Torschützen des FC Brugg in eine direkt lesbare Übersicht.", notes: ["Verein / FC Brugg", "Inhalt / Resultate", "Inhalt / Torschützen"] },
    { title: "Information mit klarer Hierarchie.", body: "Mannschaft, Spiel und Tor sind die Orientierungspunkte. Statt die Daten zu inszenieren, setzt die Darstellung auf Lesbarkeit: das Resultat zuerst, die zugehörigen Informationen direkt daneben.", notes: ["Hierarchie / Mannschaft → Spiel", "Fokus / Ergebnis zuerst", "Zielgruppe / Fans & Staff"] },
    { title: "Zwei Teams. Ein gemeinsamer Blick.", body: "Die erste Mannschaft und die Junioren B1 finden im selben Werkzeug Platz. Python und Streamlit halten die Umsetzung kompakt und richten die Oberfläche konsequent auf die Sportdaten aus.", notes: ["Team / 1. Mannschaft", "Nachwuchs / Junioren B1", "Umsetzung / Python & Streamlit"] },
  ],
  [
    { title: "Ein Portfolio, das sich bedienen lässt.", body: "Portfolio OS macht aus einer Projektsammlung einen kleinen Desktop. Fenster, Dock und Anwendungen bilden eine vertraute Umgebung, in der Besucher selbst auf Entdeckung gehen können.", notes: ["Navigation / Desktop & Dock", "Interaktion / Fenster-Manager", "Charakter / Eigenes Mini-OS"] },
    { title: "Mehr als eine Fenster-Illusion.", body: "Command Palette und Terminal eröffnen weitere Wege durch das Interface. Notizen und Themes ergänzen den Desktop. Dahinter stehen Fensterzustände, Fokus und zusammenhängende Interaktionen.", notes: ["Schnellzugriff / Command Palette", "Eingabe / Terminal", "Persönlich / Notizen & Themes"] },
    { title: "Eine Spielwiese mit echtem Handwerk.", body: "Vanilla-JavaScript, HTML, CSS und ein Canvas-Wallpaper tragen die gesamte Oberfläche. Das Projekt bleibt statisch hostbar und zeigt, wie weit ein Browser mit einer konsequenten Idee kommen kann.", notes: ["Stack / Vanilla JavaScript", "Bildwelt / Canvas-Wallpaper", "Delivery / Static Hosting"] },
  ],
  [
    { title: "Die Welt sendet Du erkennst das Muster", body: "SIGNAL macht globale Ereignisse räumlich erfahrbar. Weltkarte, Ereignisfeed und Themenfilter bilden einen gemeinsamen Arbeitsraum für Politik, Wirtschaft und Technologie. Aus einzelnen Meldungen entsteht ein erkundbares Lagebild.", notes: ["Perspektive / Globale Ereignisse", "Orientierung / Karte & Themen", "Produkt / Event Intelligence"] },
    { title: "Ein genauer Blick verändert alles", body: "Vom globalen Überblick zum ausgewählten Land. Filter für die Schweiz und Deutschland verdichten den sichtbaren Kontext. Karte, Timeline und Analytics eröffnen unterschiedliche Perspektiven auf dieselben Ereignisse.", notes: ["Fokus / Schweiz & Deutschland", "Zeit / Interaktive Timeline", "Analyse / ECharts & MapLibre"] },
    { title: "Aus Ereignissen wird Verständnis", body: "Eine Oberfläche, in der sich Zusammenhänge selbst erkunden lassen. Die öffentliche Portfolio-Demo zeigt originale synthetische Szenarien und ist direkt im Browser zugänglich. Ohne Registrierung, mit klarer Kennzeichnung der Beispieldaten.", notes: ["Erlebnis / Öffentlich im Browser", "Inhalt / Synthetische Szenarien", "Umsetzung / Next.js & TypeScript"] },
  ],
];
