import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { PUBFLOW_CONFIG } from "@/lib/pubflow-config";
import "./globals.css";
import { cn } from "@/lib/utils";

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

const PREVIEW_THEME_BOOT_SCRIPT = `(function(){try{var p=location.pathname,s=location.search;if(${PUBFLOW_CONFIG.PREVIEW_MODE ? "true" : "false"}||window.__PUBFLOW_PREVIEW__||/(?:__preview__|__virtual__)/.test(p)||/^\\/preview\\/pod[^/]+/i.test(p)||/[?&]pubflowPreview=1(?:&|$)/.test(s)){window.__PUBFLOW_PREVIEW__=true;var r=document.documentElement;r.classList.add("dark");r.dataset.theme="dark";r.style.colorScheme="dark";}}catch(e){}})();`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Avoid next/font (/__nextjs_font + /_next/static/media): Nodepod serves the
	// app under /__preview__/pod…/port, and absolute font URLs escape that prefix
	// or get blocked by Next 16 cross-origin guards. Google Fonts CDN works.
	const previewDark = PUBFLOW_CONFIG.PREVIEW_MODE;

	return (
		<html
			lang="en"
			className={cn("font-sans", previewDark && "dark")}
			data-theme={previewDark ? "dark" : undefined}
			style={previewDark ? { colorScheme: "dark" } : undefined}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: PREVIEW_THEME_BOOT_SCRIPT }} />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/Pubflow-Favicon.png" type="image/png" />
				<link rel="apple-touch-icon" href="/Pubflow-Favicon.png" />
			</head>
			<body className="antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
