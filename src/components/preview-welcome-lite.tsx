export function PreviewWelcomeLite() {
	return (
		<main className="preview-welcome-shell">
			<section className="preview-welcome-hero">
				<div className="preview-welcome-logo" aria-hidden="true">
					<img src="/Pubflow-Favicon.png" alt="" />
				</div>
				<span className="eyebrow-badge">✧ Coding preview</span>
				<h1>Welcome to your Pubflow App</h1>
				<p>
					This friendly preview starts here so you can edit confidently. Your login,
					dashboard, auth bridge, theme, and deploy scripts are still ready.
				</p>
				<div className="preview-welcome-actions">
					<a className="button button-primary" href="/login">→ Go to sign in</a>
					<a className="button button-outline" href="/dashboard">▦ Open dashboard</a>
				</div>
			</section>

			<section className="preview-welcome-card">
				<h2>Start customizing</h2>
				<p>Ask ZenoCode to change the copy, layout, colors, auth flow, or dashboard modules.</p>
				<div className="preview-welcome-steps">
					<div>
						<span>⌘</span>
						<span>Edit src/app/page.tsx to change this first screen.</span>
					</div>
					<div>
						<span>⌘</span>
						<span>Open /login to test the Flowless authentication flow.</span>
					</div>
					<div>
						<span>⌘</span>
						<span>Update src/lib/pubflow-config.ts or environment variables for branding and API URLs.</span>
					</div>
				</div>
			</section>
		</main>
	);
}
