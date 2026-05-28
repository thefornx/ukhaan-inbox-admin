"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Orders() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.order")}</div>;
}
