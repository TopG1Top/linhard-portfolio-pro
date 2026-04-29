"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CloudRain,
  Compass,
  Gauge,
  Loader2,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Thermometer,
  Wind,
} from "lucide-react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type GeoResult = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
  population?: number;
  timezone?: string;
};

type WeatherData = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    rain: number;
    cloud_cover: number;
    surface_pressure: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    weather_code: number;
    is_day: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    wind_speed_10m: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
};

type AirQualityData = {
  hourly: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
    nitrogen_dioxide: number[];
    ozone: number[];
  };
};

const presets = ["Zürich", "Brugg", "Basel", "Bern", "Luzern", "Genf"];

const weatherLabels: Record<number, string> = {
  0: "Klar",
  1: "Meist klar",
  2: "Teilweise bewölkt",
  3: "Bewölkt",
  45: "Nebel",
  48: "Reifnebel",
  51: "Leichter Nieselregen",
  53: "Nieselregen",
  55: "Starker Nieselregen",
  61: "Leichter Regen",
  63: "Regen",
  65: "Starker Regen",
  71: "Leichter Schnee",
  73: "Schnee",
  75: "Starker Schnee",
  80: "Regenschauer",
  81: "Starke Schauer",
  82: "Heftige Schauer",
  95: "Gewitter",
};

function formatNumber(value?: number) {
  if (value === undefined || Number.isNaN(value)) return "n/a";
  return new Intl.NumberFormat("de-CH").format(Math.round(value));
}

function weatherLabel(code: number) {
  return weatherLabels[code] ?? "Aktive Wetterlage";
}

function getAirQualityLabel(pm25?: number) {
  if (pm25 === undefined || Number.isNaN(pm25)) return { label: "n/a", level: "neutral" };
  if (pm25 <= 10) return { label: "Sehr gut", level: "good" };
  if (pm25 <= 20) return { label: "Gut", level: "good" };
  if (pm25 <= 35) return { label: "Mittel", level: "warn" };
  return { label: "Belastet", level: "danger" };
}

function calculateTrafficScore(city: GeoResult, weather?: WeatherData) {
  const hour = new Date().getHours();
  const commuterPeak = hour >= 7 && hour <= 9 ? 28 : hour >= 16 && hour <= 18 ? 32 : 8;
  const citySize = city.population ? Math.min(26, Math.log10(city.population) * 5) : 14;
  const rainLoad = weather ? Math.min(18, (weather.current.precipitation || 0) * 8) : 0;
  const windLoad = weather ? Math.min(10, weather.current.wind_speed_10m / 5) : 0;
  return Math.min(96, Math.round(18 + commuterPeak + citySize + rainLoad + windLoad));
}

function trafficLabel(score: number) {
  if (score >= 72) return "Stark belastet";
  if (score >= 52) return "Erhöht";
  if (score >= 34) return "Normal";
  return "Ruhig";
}

function mapUrl(city: GeoResult) {
  const lat = city.latitude;
  const lon = city.longitude;
  const deltaLat = 0.065;
  const deltaLon = 0.105;
  const bbox = [
    lon - deltaLon,
    lat - deltaLat,
    lon + deltaLon,
    lat + deltaLat,
  ].join("%2C");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
  tone = "default",
}: {
  icon: typeof Thermometer;
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "good" | "warn" | "danger";
}) {
  return (
    <div className="rounded-lg border bg-card/85 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <Icon
          className={cn(
            "h-5 w-5",
            tone === "good" && "text-emerald-500",
            tone === "warn" && "text-amber-500",
            tone === "danger" && "text-rose-500",
            tone === "default" && "text-primary",
          )}
        />
      </div>
      <div className="mt-4 text-3xl font-black tracking-tight">{value}</div>
      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

export default function CityPulsePage() {
  const [query, setQuery] = useState("Zürich");
  const [city, setCity] = useState<GeoResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function loadCity(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    setStatus("loading");
    setError(null);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          trimmed,
        )}&count=1&language=de&format=json`,
      );
      if (!geoRes.ok) throw new Error("Stadt konnte nicht gesucht werden.");
      const geoJson = await geoRes.json();
      const match = geoJson.results?.[0] as GeoResult | undefined;
      if (!match) throw new Error("Keine Stadt gefunden. Probiere z. B. Zürich, Basel oder Brugg.");

      const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
      weatherUrl.search = new URLSearchParams({
        latitude: String(match.latitude),
        longitude: String(match.longitude),
        current:
          "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,is_day",
        hourly: "temperature_2m,precipitation_probability,wind_speed_10m",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
        forecast_days: "5",
        timezone: "auto",
      }).toString();

      const airUrl = new URL("https://air-quality-api.open-meteo.com/v1/air-quality");
      airUrl.search = new URLSearchParams({
        latitude: String(match.latitude),
        longitude: String(match.longitude),
        hourly: "pm10,pm2_5,nitrogen_dioxide,ozone",
        forecast_days: "1",
        timezone: "auto",
      }).toString();

      const [weatherRes, airRes] = await Promise.all([fetch(weatherUrl), fetch(airUrl)]);
      if (!weatherRes.ok) throw new Error("Wetterdaten konnten nicht geladen werden.");

      setCity(match);
      setWeather((await weatherRes.json()) as WeatherData);
      setAirQuality(airRes.ok ? ((await airRes.json()) as AirQualityData) : null);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unerwarteter Fehler.");
    }
  }

  useEffect(() => {
    loadCity("Zürich");
  }, []);

  const currentAir = useMemo(() => {
    if (!airQuality?.hourly?.time?.length) return undefined;
    const index = Math.max(
      0,
      airQuality.hourly.time.findIndex((time) => time >= new Date().toISOString().slice(0, 13)),
    );
    return {
      pm25: airQuality.hourly.pm2_5[index],
      pm10: airQuality.hourly.pm10[index],
      no2: airQuality.hourly.nitrogen_dioxide[index],
      ozone: airQuality.hourly.ozone[index],
    };
  }, [airQuality]);

  const trafficScore = city ? calculateTrafficScore(city, weather ?? undefined) : 0;
  const airLabel = getAirQualityLabel(currentAir?.pm25);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadCity(query);
  }

  return (
    <Section className="overflow-hidden py-8 md:py-12">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,hsl(var(--background))_0%,hsl(var(--muted))_45%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(20,184,166,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="min-w-0">
          <Badge className="rounded-md">City Intelligence</Badge>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">CityPulse Control Room</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Gib eine Stadt ein und erhalte Wetter, Luftqualität, Kartenlage und einen Traffic-Index in einem
            modernen Einsatz-Dashboard.
          </p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="h-12 pl-10 text-base"
                placeholder="Stadt suchen, z. B. Zürich"
              />
            </div>
            <Button className="h-12 rounded-lg" type="submit" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Navigation className="mr-2 h-5 w-5" />}
              Analysieren
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setQuery(preset);
                  loadCity(preset);
                }}
                className="rounded-md border bg-background/70 px-3 py-1.5 text-sm font-medium transition hover:bg-accent"
                type="button"
              >
                {preset}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-card/85 p-4">
              <Building2 className="h-5 w-5 text-primary" />
              <div className="mt-3 text-2xl font-black">{city?.name ?? "..."}</div>
              <p className="text-sm text-muted-foreground">
                {city ? `${city.admin1 ?? city.country ?? "Region"} · ${formatNumber(city.population)} Einwohner` : "Stadt wird geladen"}
              </p>
            </div>
            <div className="rounded-lg border bg-card/85 p-4">
              <Compass className="h-5 w-5 text-secondary" />
              <div className="mt-3 text-2xl font-black">
                {city ? `${city.latitude.toFixed(2)}, ${city.longitude.toFixed(2)}` : "..."}
              </div>
              <p className="text-sm text-muted-foreground">{city?.timezone ?? "Lokale Zeitzone"}</p>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg border bg-card/90 shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Live Control Room
            </div>
            <span className="text-xs text-muted-foreground">{weather?.current?.time ?? "syncing"}</span>
          </div>
          <div className="grid min-h-[360px] lg:grid-cols-[1fr_0.85fr]">
            <div className="min-h-[320px] bg-muted">
              {city ? (
                <iframe
                  title={`Karte von ${city.name}`}
                  src={mapUrl(city)}
                  className="h-full min-h-[320px] w-full border-0"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">Karte wird geladen...</div>
              )}
            </div>
            <div className="grid gap-3 p-4">
              <div className="rounded-lg border bg-background/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-muted-foreground">Traffic Index</span>
                  <Gauge className="h-5 w-5 text-amber-500" />
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-black">{trafficScore || "--"}</span>
                  <span className="pb-2 text-sm text-muted-foreground">/ 100</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500" style={{ width: `${trafficScore}%` }} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {city ? `${trafficLabel(trafficScore)} · basiert auf Uhrzeit, Stadtgrösse und Wetterlage.` : "Wird berechnet"}
                </p>
              </div>
              <div className="rounded-lg border bg-background/70 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-500" />
                  <p className="text-sm text-muted-foreground">
                    {city && weather
                      ? `${city.name}: ${weatherLabel(weather.current.weather_code)}, gefühlt ${Math.round(
                          weather.current.apparent_temperature,
                        )}°C. ${trafficLabel(trafficScore)}e Verkehrslage, Luftqualität ${airLabel.label}.`
                      : "Live Summary wird vorbereitet."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Thermometer}
          label="Temperatur"
          value={weather ? `${Math.round(weather.current.temperature_2m)}°C` : "--"}
          detail={weather ? `${weatherLabel(weather.current.weather_code)} · gefühlt ${Math.round(weather.current.apparent_temperature)}°C` : "Live Wetter"}
        />
        <StatCard
          icon={CloudRain}
          label="Regen"
          value={weather ? `${Math.round(weather.current.precipitation || 0)} mm` : "--"}
          detail={weather ? `${weather.current.cloud_cover}% Wolken · ${weather.current.relative_humidity_2m}% Luftfeuchte` : "Niederschlag"}
          tone={(weather?.current.precipitation ?? 0) > 0 ? "warn" : "good"}
        />
        <StatCard
          icon={Wind}
          label="Wind"
          value={weather ? `${Math.round(weather.current.wind_speed_10m)} km/h` : "--"}
          detail={weather ? `${weather.current.wind_direction_10m}° Richtung · ${weather.current.surface_pressure} hPa` : "Winddaten"}
        />
        <StatCard
          icon={MapPin}
          label="Luftqualität"
          value={airLabel.label}
          detail={currentAir ? `PM2.5 ${Math.round(currentAir.pm25)} · PM10 ${Math.round(currentAir.pm10)}` : "Air Quality API"}
          tone={airLabel.level as "good" | "warn" | "danger" | "default"}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-5">
        <div className="rounded-lg border bg-card/85 p-5 lg:col-span-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight">5-Tage Forecast</h2>
            <Badge className="rounded-md">Open-Meteo</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {weather?.daily.time.map((day, index) => (
              <div key={day} className="rounded-lg border bg-background/70 p-3">
                <div className="text-sm font-bold">
                  {new Date(day).toLocaleDateString("de-CH", { weekday: "short" })}
                </div>
                <div className="mt-3 text-2xl font-black">{Math.round(weather.daily.temperature_2m_max[index])}°</div>
                <p className="text-xs text-muted-foreground">
                  min {Math.round(weather.daily.temperature_2m_min[index])}° · Regen {weather.daily.precipitation_probability_max[index]}%
                </p>
              </div>
            )) ?? <p className="text-sm text-muted-foreground">Forecast wird geladen...</p>}
          </div>
        </div>

        <div className="rounded-lg border bg-card/85 p-5 lg:col-span-2">
          <h2 className="text-xl font-bold tracking-tight">City Signals</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Rush Hour", trafficScore >= 55 ? "Aktiv" : "Ruhig", trafficScore],
              ["Rain Impact", (weather?.current.precipitation ?? 0) > 0 ? "Erhöht" : "Tief", Math.min(100, (weather?.current.precipitation ?? 0) * 32)],
              ["Wind Load", weather ? `${Math.round(weather.current.wind_speed_10m)} km/h` : "n/a", Math.min(100, (weather?.current.wind_speed_10m ?? 0) * 2.5)],
              ["Air Quality", airLabel.label, airLabel.level === "good" ? 24 : airLabel.level === "warn" ? 62 : 86],
            ].map(([label, value, width]) => (
              <div key={label as string}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{label}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-secondary" style={{ width: `${Number(width)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-lg border bg-card/85 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Upgrade-Pfad</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Echte Live-Verkehrsdaten können später über TomTom, HERE oder Google Traffic ergänzt werden.
            </p>
          </div>
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Datenquelle ansehen <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Section>
  );
}
