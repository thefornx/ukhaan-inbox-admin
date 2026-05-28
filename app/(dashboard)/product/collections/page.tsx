"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Collections() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.productCollections")}</div>;
}
