import { useScopedI18n } from "@solid-primitives/i18n"

export default function Header() {
  const [t] = useScopedI18n("header");
  return (
    <div>
      <h1>Tagger<span>{t("credits")}</span></h1>
      <div>{t("subtitle")}</div>
    </div>
  )
}