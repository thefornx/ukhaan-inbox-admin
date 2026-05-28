"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Branches() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.storeBranches")}</div>;
}
