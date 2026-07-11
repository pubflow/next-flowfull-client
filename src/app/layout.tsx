import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { PUBFLOW_CONFIG } from "@/lib/pubflow-config";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: PUBFLOW_CONFIG.APP_NAME,
	description: "Flowfull/Pubflow Next.js client starter",
	icons: {
		icon: [{ url: "/Pubflow-Favicon.png", type: "image/png" }],
		shortcut: ["/Pubflow-Favicon.png"],
		apple: [{ url: "/Pubflow-Favicon.png" }],
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={cn("font-sans", inter.variable)}>
			<head>
				<link rel="icon" href="/Pubflow-Favicon.png" type="image/png" />
				<link rel="apple-touch-icon" href="/Pubflow-Favicon.png" />
			</head>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
