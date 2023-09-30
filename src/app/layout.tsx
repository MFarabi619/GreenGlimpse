import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Green Glimpse",
    description:
        "GreenGlimpse offers an in-depth view into a company's environmental impact, tracing the complete emissions lifecycle across various operational stages. From the raw material sourcing to the end-point product delivery, we aim to provide an unparalleled glimpse into where and how emissions are generated, powered by the latest in AI, IoT, and 5G technologies.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${roboto.className} bg-black container m-10`}>
                {children}
            </body>
        </html>
    );
}
