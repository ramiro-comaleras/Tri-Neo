// ============================================================
// SITE CONFIG - TRI-NEO Creative
// ============================================================

export interface SiteConfig {
  firmName: string
  firmSlogan: string
  firmDescription: string
  seo: {
    siteTitle: string
    titleTemplate: string
    defaultDescription: string
    locale: string
  }
}

export const siteConfig: SiteConfig = {
  firmName: 'Método TRI-NEO',
  firmSlogan: 'Recuperá claridad mental',
  firmDescription: 'Sistema de transformación personal para recuperar claridad mental a través de meditación guiada y reflexión diaria.',

  seo: {
    siteTitle: 'Método TRI-NEO | Recuperá Claridad Mental',
    titleTemplate: '%s | Método TRI-NEO',
    defaultDescription: 'Sistema de transformación personal para recuperar claridad mental a través de meditación guiada y reflexión diaria.',
    locale: 'es_AR',
  },
}
