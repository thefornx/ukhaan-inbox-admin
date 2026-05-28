import { Calendar, Check, CreditCard, Crown, Download } from "lucide-react";

type Plan = {
    name: string;
    price: number;
    tagline: string;
    features: string[];
    current?: boolean;
    featured?: boolean;
    cta: string;
};

const PLANS: Plan[] = [
    {
        name: "Starter",
        price: 19,
        tagline: "For new stores getting started",
        features: [
            "Up to 100 products",
            "1 staff account",
            "Basic analytics",
            "Email support",
        ],
        cta: "Downgrade",
    },
    {
        name: "Growth",
        price: 49,
        tagline: "For growing businesses",
        features: [
            "Up to 2,000 products",
            "10 staff accounts",
            "Advanced analytics",
            "Discount codes",
            "Priority support",
        ],
        current: true,
        featured: true,
        cta: "Current plan",
    },
    {
        name: "Enterprise",
        price: 149,
        tagline: "For high-volume stores",
        features: [
            "Unlimited products",
            "Unlimited staff accounts",
            "Custom analytics",
            "Dedicated account manager",
            "API access",
        ],
        cta: "Upgrade",
    },
];

type Invoice = {
    date: string;
    plan: string;
    amount: number;
    status: "Paid" | "Refunded" | "Pending";
};

const HISTORY: Invoice[] = [
    { date: "May 27, 2026", plan: "Growth (Monthly)", amount: 49, status: "Paid" },
    { date: "Apr 27, 2026", plan: "Growth (Monthly)", amount: 49, status: "Paid" },
    { date: "Mar 27, 2026", plan: "Growth (Monthly)", amount: 49, status: "Paid" },
    { date: "Feb 27, 2026", plan: "Starter (Monthly)", amount: 19, status: "Refunded" },
    { date: "Jan 27, 2026", plan: "Starter (Monthly)", amount: 19, status: "Paid" },
];

const STATUS_BADGE: Record<Invoice["status"], string> = {
    Paid: "badge-success",
    Refunded: "badge-ghost",
    Pending: "badge-warning",
};

export default function Subscription() {
    return (
        <div className="space-y-1">
            {/* Current subscription information */}
            <section className="card bg-base-100 border border-base-300 rounded-lg">
                <div className="card-body gap-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2 className="card-title">
                                <Crown className="w-5 h-5 text-warning" />
                                Growth plan
                                <span className="badge badge-success badge-sm">Active</span>
                            </h2>
                            <p className="text-sm text-base-content/70">
                                Your current subscription.
                            </p>
                        </div>
                        <button type="button" className="btn btn-sm btn-soft btn-primary">
                            Manage billing
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <InfoItem label="Price" value="$49 / month" />
                        <InfoItem label="Billing cycle" value="Monthly" />
                        <InfoItem
                            label="Next renewal"
                            value="Jun 27, 2026"
                            icon={<Calendar className="w-3.5 h-3.5" />}
                        />
                        <InfoItem
                            label="Payment method"
                            value="Visa •••• 4242"
                            icon={<CreditCard className="w-3.5 h-3.5" />}
                        />
                    </div>
                </div>
            </section>

            {/* Plan cards */}
            <section className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-base-content/80">
                    Available plans
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`card bg-base-100 rounded-lg border ${
                                plan.featured
                                    ? "border-primary border-2"
                                    : "border-base-300"
                            }`}
                        >
                            <div className="card-body gap-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="card-title">{plan.name}</h3>
                                    {plan.featured && (
                                        <span className="badge badge-primary badge-sm">
                                            Current
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <span className="text-3xl font-bold">${plan.price}</span>
                                    <span className="text-sm text-base-content/70"> / month</span>
                                </div>

                                <p className="text-sm text-base-content/70">{plan.tagline}</p>

                                <ul className="space-y-2 text-sm">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-success shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    type="button"
                                    disabled={plan.current}
                                    className={`btn btn-sm mt-2 ${
                                        plan.featured ? "btn-primary" : "btn-soft btn-primary"
                                    }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Subscription history */}
            <section className="card bg-base-100 border border-base-300 rounded-lg">
                <div className="card-body gap-4">
                    <h3 className="card-title">Subscription history</h3>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Plan</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th className="text-right">Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HISTORY.map((invoice) => (
                                    <tr key={invoice.date}>
                                        <td>{invoice.date}</td>
                                        <td>{invoice.plan}</td>
                                        <td>${invoice.amount.toFixed(2)}</td>
                                        <td>
                                            <span
                                                className={`badge badge-sm ${STATUS_BADGE[invoice.status]}`}
                                            >
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <button
                                                type="button"
                                                aria-label={`Download invoice for ${invoice.date}`}
                                                className="btn btn-ghost btn-xs btn-square"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

function InfoItem({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon?: React.ReactNode;
}) {
    return (
        <div>
            <div className="text-xs uppercase tracking-wide text-base-content/60">
                {label}
            </div>
            <div className="flex items-center gap-1.5 text-sm font-medium mt-0.5">
                {icon}
                {value}
            </div>
        </div>
    );
}
