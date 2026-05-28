"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Brands() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.storeBrands")}</div>;
}
