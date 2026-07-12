import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadDevVars() {
	const devVarsPath = resolve(process.cwd(), ".dev.vars");
	if (!existsSync(devVarsPath)) return;

	const content = readFileSync(devVarsPath, "utf8");
	for (const rawLine of content.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith("#")) continue;

		const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
		if (!match) continue;

		const [, key, rawValue] = match;
		if (process.env[key] !== undefined) continue;

		process.env[key] = rawValue.trim().replace(/^['"]|['"]$/g, "");
	}
}

loadDevVars();

const nextConfig: NextConfig = {
	// Coding-agent / Nodepod preview is served from platform.pubflow.com via SW.
	// Without this, Next 16 blocks /__nextjs_font and /_next assets (403) as cross-origin.
	allowedDevOrigins: [
		"platform.pubflow.com",
		"*.pubflow.com",
		"preview.pubflow.com",
		"localhost",
		"127.0.0.1",
	],
	turbopack: {
		root: process.cwd(),
	},
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
