"use client";

import { useTranslation } from "@/contexts/LanguageContext";

export default function Chats() {
    const { t } = useTranslation();
    return <div className="">{t("placeholders.userChats")}</div>;
}
