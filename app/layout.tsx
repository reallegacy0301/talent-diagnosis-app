import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "才能を事業に変える｜無料診断",
  description:
    "あなたが持つ才能は、事業になる可能性を秘めています。4つの軸で分析する独自の診断で、今のあなたのステージと次の一歩を明らかにします。",
  openGraph: {
    title: "才能を事業に変える｜無料診断",
    description: "4軸20問で、あなたの才能と事業可能性を診断します。",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
