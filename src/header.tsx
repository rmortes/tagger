import { useScopedI18n } from "@solid-primitives/i18n"
import labelIcon from './assets/icons/label.svg';

export default function Header() {
  const [t] = useScopedI18n("header");
  return (
    <div>
      <h1 class="flex flex-wrap lg:flex-nowrap items-baseline">
        <img src={labelIcon} alt="" class="w-64px h-64px inline place-self-center" />
        Tagger
        <span class="w-full">{t("credits")}
        </span>
      </h1>
      <div>{t("subtitle")}</div>
    </div>
  )
}