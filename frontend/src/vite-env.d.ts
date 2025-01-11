/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_ENV: "development" | "production"
}

interface ImportMet {
    readonly env: ImportMetaEnv
}