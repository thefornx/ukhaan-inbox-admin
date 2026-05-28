"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Returns() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.orderPayments")}</div>;
}
