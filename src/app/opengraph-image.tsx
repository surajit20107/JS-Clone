import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Next Basket – Shop More. Live Better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#fdf6ee",
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.08)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 200,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(249,115,22,0.05)",
            display: "flex",
          }}
        />

        {/* Main content wrapper */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            padding: "52px 64px 40px 64px",
            gap: 40,
          }}
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Cart icon SVG */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#f97316",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="3"
                    y1="6"
                    x2="21"
                    y2="6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 10a4 4 0 01-8 0"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 0 }}>
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Next{" "}
                </span>
                <span
                  style={{
                    fontSize: 30,
                    fontWeight: 700,
                    color: "#f97316",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Basket
                </span>
              </div>
            </div>

            {/* Headline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 28 }}>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: "#1a1a2e",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                }}
              >
                Shop More.
              </span>
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: "#f97316",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                }}
              >
                Live Better.
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: 18,
                color: "#4b5563",
                lineHeight: 1.6,
                marginTop: 20,
                maxWidth: 420,
              }}
            >
              Your one-stop destination for quality products, great deals, and a
              seamless shopping experience.
            </p>

            {/* Feature badges */}
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: "✦", label: "Top Quality" },
                { icon: "⚡", label: "Fast Delivery" },
                { icon: "🔒", label: "Secure Pay" },
                { icon: "🕐", label: "24/7 Support" },
              ].map((f) => (
                <div
                  key={f.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "white",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: 100,
                    padding: "6px 14px",
                    fontSize: 13,
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ fontSize: 12 }}>{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 32,
                background: "#f97316",
                borderRadius: 100,
                padding: "14px 32px",
                alignSelf: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "white",
                  letterSpacing: "0.3px",
                }}
              >
                Shop Now →
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN – Visual card stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              gap: 16,
            }}
          >
            {/* Big stat card */}
            <div
              style={{
                background: "#f97316",
                borderRadius: 24,
                padding: "28px 36px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: 4,
              }}
            >
              <span
                style={{ fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1 }}
              >
                50K+
              </span>
              <span style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                Happy Customers
              </span>
            </div>

            {/* Two smaller cards */}
            <div style={{ display: "flex", gap: 14, width: "100%" }}>
              <div
                style={{
                  flex: 1,
                  background: "#1a1a2e",
                  borderRadius: 20,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{ fontSize: 34, fontWeight: 900, color: "#f97316", lineHeight: 1 }}
                >
                  10K+
                </span>
                <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 500, textAlign: "center" }}>
                  Products
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "white",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 20,
                  padding: "22px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{ fontSize: 34, fontWeight: 900, color: "#1a1a2e", lineHeight: 1 }}
                >
                  4.9★
                </span>
                <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500, textAlign: "center" }}>
                  Rating
                </span>
              </div>
            </div>

            {/* Category pills */}
            <div
              style={{
                background: "white",
                border: "1.5px solid #e5e7eb",
                borderRadius: 20,
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>
                Browse Categories
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Electronics", "Fashion", "Home & Living", "Beauty", "Sports"].map(
                  (cat) => (
                    <div
                      key={cat}
                      style={{
                        background: "#fff7ed",
                        border: "1px solid #fed7aa",
                        borderRadius: 100,
                        padding: "4px 12px",
                        fontSize: 12,
                        color: "#c2410c",
                        fontWeight: 600,
                      }}
                    >
                      {cat}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1a1a2e",
            padding: "14px 64px",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 15, color: "#9ca3af" }}>
            nextbasket.shop
          </span>
          <span style={{ color: "#4b5563", fontSize: 15 }}>·</span>
          <span style={{ fontSize: 15, color: "#f97316", fontWeight: 600 }}>
            Better choices, better life.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
