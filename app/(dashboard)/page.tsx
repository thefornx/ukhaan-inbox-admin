"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useTranslation();
  return <div className="">{t("home.title")}</div>;
}
