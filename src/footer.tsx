import { useScopedI18n } from "@solid-primitives/i18n";

export default function Footer() {
  const [t] = useScopedI18n("footer");
  return (
    <div class="flex flex-col items-center w-full py-12px fixed bottom-0 left-0 footer text-.8rem">
      <p class="text-center max-w-80%">
        {t("made_with")} <span class="text-#1880a1">❤</span> {t("by")} <a href="https://raul.zip" target="_blank" rel="noopener noreferrer">Raúl Mortes</a>
      </p>
      <p class="text-center max-w-80%">
        {t("source_available")} <a href="https://github.com/rmortes/tagger" target="_blank" rel="noopener noreferrer">GitHub</a>
        . {t("if_broken")} <a href="https://github.com/rmortes/tagger/issues" target="_blank" rel="noopener noreferrer">{t("open_issue")}</a>.
      </p>
    </div>
  )
}