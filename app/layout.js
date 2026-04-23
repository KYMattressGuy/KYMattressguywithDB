import "./globals.css";

export const metadata = {
  title: "RetailSleep Academy",
  description: "Sleep retail training platform — quizzes, leaderboards, and team insights",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RetailSleep Academy",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1B2B4B",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-light antialiased">{children}</body>
    </html>
  );
}
