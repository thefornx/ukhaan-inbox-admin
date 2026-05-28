"use client";

import { useState, type FormEvent } from "react";

/** The kinds of products a store can sell. */
const PRODUCT_TYPES = [
    { value: "physical", label: "Physical goods" },
    { value: "digital", label: "Digital products" },
    { value: "service", label: "Services" },
    { value: "subscription", label: "Subscriptions" },
    { value: "food", label: "Food & beverage" },
] as const;

type ProductType = (typeof PRODUCT_TYPES)[number]["value"];

type StoreSettings = {
    name: string;
    description: string;
    sellTypes: ProductType[];
};

const INITIAL: StoreSettings = {
    name: "",
    description: "",
    sellTypes: [],
};

export default function StoreSettingsForm() {
    const [settings, setSettings] = useState<StoreSettings>(INITIAL);
    const [saved, setSaved] = useState(false);

    function toggleSellType(type: ProductType) {
        setSaved(false);
        setSettings((prev) => ({
            ...prev,
            sellTypes: prev.sellTypes.includes(type)
                ? prev.sellTypes.filter((t) => t !== type)
                : [...prev.sellTypes, type],
        }));
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // Example only — wire this up to your API / server action.
        console.log("Saving store settings", settings);
        setSaved(true);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="card bg-base-100 border border-base-300 rounded-lg max-w-2xl"
        >
            <div className="card-body gap-6">
                <div>
                    <h2 className="card-title">General information</h2>
                    <p className="text-sm text-base-content/70">
                        Basic details about your store.
                    </p>
                </div>

                {/* Store name */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Store name</legend>
                    <input
                        type="text"
                        required
                        value={settings.name}
                        onChange={(e) => {
                            setSaved(false);
                            setSettings((prev) => ({ ...prev, name: e.target.value }));
                        }}
                        placeholder="e.g. Ukhaan Store"
                        className="input w-full"
                    />
                </fieldset>

                {/* Description */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea
                        value={settings.description}
                        onChange={(e) => {
                            setSaved(false);
                            setSettings((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }));
                        }}
                        placeholder="What does your store sell?"
                        className="textarea w-full"
                        rows={4}
                    />
                    <p className="label">Shown to customers on your storefront.</p>
                </fieldset>

                {/* Types of sell products */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Types of sell products</legend>
                    <div className="flex flex-col gap-2">
                        {PRODUCT_TYPES.map((type) => (
                            <label
                                key={type.value}
                                className="label cursor-pointer justify-start gap-3"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={settings.sellTypes.includes(type.value)}
                                    onChange={() => toggleSellType(type.value)}
                                />
                                <span>{type.label}</span>
                            </label>
                        ))}
                    </div>
                    <p className="label">Select all that apply.</p>
                </fieldset>

                <div className="flex items-center gap-3">
                    <button type="submit" className="btn btn-primary btn-sm">
                        Save changes
                    </button>
                    <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                            setSettings(INITIAL);
                            setSaved(false);
                        }}
                    >
                        Reset
                    </button>
                    {saved && (
                        <span className="text-sm text-success">Settings saved.</span>
                    )}
                </div>
            </div>
        </form>
    );
}
