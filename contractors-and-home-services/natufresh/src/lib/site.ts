export const SITE = {
  name: "NatuFresh",
  tagline: "Green Cleaning for Healthy Living",
  phoneDisplay: "571-575-5615",
  phoneTel: "5715755615",
  email: "NatufreshLLC@hotmail.com",
  owner: 'Maria "Bertilla" Torres',
  yearsExperience: 12,
} as const;

/**
 * Public folder URL, safe for any `import.meta.env.BASE_URL`
 * (dev `/`, production `/nutrue/` for GitHub Pages).
 */
export function publicAsset(relativePath: string): string {
  const p = relativePath.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/") {
    return `/${p}`;
  }
  return base.endsWith("/") ? `${base}${p}` : `${base}/${p}`;
}

export const IMAGES = {
  logo: publicAsset("images/natufresh-logo.png"),
  logoFallback: publicAsset("images/natufresh-logo.svg"),
  hero: publicAsset("images/commercial-hallway.png"),
  galleryMain: publicAsset("images/commercial-hallway.png"),
  galleryA: publicAsset("images/office-cubicle.png"),
  galleryB: publicAsset("images/long-hallway.png"),
  businessCard: publicAsset("images/natufresh-logo.png"),
  pwhi: publicAsset("images/pwhi-logo.png"),
  dataIntegration: publicAsset("images/data-integration-logo.png"),
} as const;
