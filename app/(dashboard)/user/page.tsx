"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Users() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.user")}</div>;
}
