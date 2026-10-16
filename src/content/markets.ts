export type Market = {
  code: string;
  /** Short label used in compact lists. */
  label: string;
  name: string;
  tier: "primary" | "additional";
  region: "North America" | "Europe" | "Middle East" | "Asia-Pacific";
  /** Representative business hub, used only to place the market on the map. */
  lat: number;
  lon: number;
};

export const markets: Market[] = [
  { code: "US", label: "USA", name: "United States", tier: "primary", region: "North America", lat: 40.71, lon: -74.01 },
  { code: "GB", label: "UK", name: "United Kingdom", tier: "primary", region: "Europe", lat: 51.51, lon: -0.13 },
  { code: "CA", label: "Canada", name: "Canada", tier: "primary", region: "North America", lat: 43.65, lon: -79.38 },
  { code: "AU", label: "Australia", name: "Australia", tier: "primary", region: "Asia-Pacific", lat: -33.87, lon: 151.21 },
  { code: "AE", label: "UAE", name: "United Arab Emirates", tier: "primary", region: "Middle East", lat: 25.2, lon: 55.27 },
  { code: "SA", label: "Saudi Arabia", name: "Saudi Arabia", tier: "primary", region: "Middle East", lat: 24.71, lon: 46.68 },
  { code: "QA", label: "Qatar", name: "Qatar", tier: "additional", region: "Middle East", lat: 25.29, lon: 51.53 },
  { code: "KW", label: "Kuwait", name: "Kuwait", tier: "additional", region: "Middle East", lat: 29.38, lon: 47.99 },
  { code: "OM", label: "Oman", name: "Oman", tier: "additional", region: "Middle East", lat: 23.59, lon: 58.41 },
  { code: "BH", label: "Bahrain", name: "Bahrain", tier: "additional", region: "Middle East", lat: 26.23, lon: 50.59 },
  { code: "DE", label: "Germany", name: "Germany", tier: "additional", region: "Europe", lat: 52.52, lon: 13.4 },
  { code: "NL", label: "Netherlands", name: "Netherlands", tier: "additional", region: "Europe", lat: 52.37, lon: 4.9 },
  { code: "CH", label: "Switzerland", name: "Switzerland", tier: "additional", region: "Europe", lat: 47.38, lon: 8.54 },
  { code: "FR", label: "France", name: "France", tier: "additional", region: "Europe", lat: 48.86, lon: 2.35 },
  { code: "IE", label: "Ireland", name: "Ireland", tier: "additional", region: "Europe", lat: 53.35, lon: -6.26 },
  { code: "SE", label: "Sweden", name: "Sweden", tier: "additional", region: "Europe", lat: 59.33, lon: 18.07 },
  { code: "NO", label: "Norway", name: "Norway", tier: "additional", region: "Europe", lat: 59.91, lon: 10.75 },
  { code: "DK", label: "Denmark", name: "Denmark", tier: "additional", region: "Europe", lat: 55.68, lon: 12.57 },
  { code: "NZ", label: "New Zealand", name: "New Zealand", tier: "additional", region: "Asia-Pacific", lat: -36.85, lon: 174.76 },
  { code: "SG", label: "Singapore", name: "Singapore", tier: "additional", region: "Asia-Pacific", lat: 1.35, lon: 103.82 },
];

/** Connections drawn between markets on the globe and the map. */
export const marketRoutes: Array<[string, string]> = [
  ["US", "GB"],
  ["US", "CA"],
  ["GB", "AE"],
  ["AE", "SA"],
  ["AE", "SG"],
  ["SG", "AU"],
  ["AU", "NZ"],
  ["GB", "IE"],
  ["NL", "SE"],
  ["AE", "QA"],
  ["SA", "KW"],
  ["CH", "DE"],
  ["US", "AU"],
];

export const marketByCode = Object.fromEntries(
  markets.map((m) => [m.code, m]),
) as Record<string, Market>;

export const primaryMarkets = markets.filter((m) => m.tier === "primary");
export const additionalMarkets = markets.filter((m) => m.tier === "additional");
