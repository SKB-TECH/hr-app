/**
 * Seul fichier autorisé à lire process.env.
 * Tout accès direct à process.env dans le code applicatif est interdit.
 * Règle ESLint « no-process-env » enforce cette contrainte.
 */

export const ENV = {
    /** URL de base de l'API (proxy local en dev, distant en prod) */
    API_URL: process.env.NEXT_PUBLIC_API_URL ?? "/api/proxy",
    NEXT_PUBLIC_FILES_BASE_URL: process.env.NEXT_PUBLIC_FILES_BASE_URL,
    /** URL upstream réelle du backend (utilisée côté serveur dans le proxy) */
    API_BASE_URL:process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "",

    /** Clé secrète transmise au backend */
    API_KEY: process.env.NEXT_PUBLIC_API_KEY ?? "",

    /** Identifiant du canal applicatif */
    API_CHANNEL: process.env.NEXT_PUBLIC_API_CHANNEL ?? "",

    /** Base URL pour les fichiers/images du backend */
    FILES_BASE_URL: process.env.NEXT_PUBLIC_FILES_BASE_URL ?? "",

    /** Passe par le proxy Next.js (true en prod, false en dev direct) */
    USE_PROXY: process.env.NEXT_PUBLIC_USE_PROXY === "true",

    /** Environnement courant */
    NODE_ENV: process.env.NODE_ENV ?? "development",
} as const;

export type EnvConfig = typeof ENV;
