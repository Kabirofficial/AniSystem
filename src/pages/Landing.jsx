import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { TrendingUp, Calendar, Layout, Shield, Database, WifiOff } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Landing = () => {
    return (
        <div className="min-h-screen bg-bg-main text-text-main flex flex-col">
            <SEO
                title="Home"
                description="Track your anime journey completely offline. No servers, no tracking, just you and your media."
            />
            {/* Navbar */}
            <header className="border-b border-white/5 bg-bg-main/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg" />
                        <span className="font-bold text-xl tracking-tight">AniSystem</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/search" className="hidden sm:block text-sm font-medium text-text-muted hover:text-text-main transition-colors">Search</Link>
                        <Link to="/support" className="hidden sm:block text-sm font-medium text-text-muted hover:text-text-main transition-colors">Support</Link>
                        <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
                        <Link to="/dashboard">
                            <Button size="sm">Open Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main className="flex-1">
                <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium border border-brand-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                            </span>
                            Local-First Media Tracker
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                            Your watchlist, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">completely offline.</span>
                        </h1>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                            Track your Anime and TV shows without creating an account.
                            Your data stays in your browser. No servers, no tracking, just you and your media.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link to="/dashboard">
                                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-lg shadow-xl shadow-brand-primary/20">
                                    Start Tracking Now
                                </Button>
                            </Link>
                            <Link to="/search">
                                <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-8 text-lg">
                                    Explore Library
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image Mockup replacement with cleaner visual */}
                    <div className="mt-20 relative max-w-5xl mx-auto rounded-xl border border-white/10 bg-bg-panel shadow-2xl overflow-hidden aspect-[16/9] animate-slide-up group">
                        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none"></div>

                        {/* Fake Browser Chrome */}
                        <div className="bg-bg-panel/50 backdrop-blur border-b border-white/5 p-4 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                            <div className="ml-4 flex-1 h-6 bg-white/5 rounded-md flex items-center px-4 text-xs text-text-muted font-mono">
                                anisystem.app
                            </div>
                        </div>

                        <div className="relative h-full w-full bg-bg-main flex items-center justify-center overflow-hidden">
                            {/* Abstract representation of the layout */}
                            <div className="grid grid-cols-4 gap-4 w-3/4 opacity-50 transform group-hover:scale-105 transition-transform duration-700">
                                <div className="col-span-1 h-40 bg-white/5 rounded-xl"></div>
                                <div className="col-span-1 h-40 bg-white/5 rounded-xl"></div>
                                <div className="col-span-1 h-40 bg-white/5 rounded-xl"></div>
                                <div className="col-span-1 h-40 bg-white/5 rounded-xl"></div>
                                <div className="col-span-3 h-64 bg-white/5 rounded-xl"></div>
                                <div className="col-span-1 h-64 bg-white/5 rounded-xl"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-bg-panel/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl text-center">
                                    <TrendingUp size={32} className="mx-auto text-brand-primary mb-2" />
                                    <p className="font-bold text-white">Privacy First Design</p>
                                    <p className="text-sm text-text-muted">No data leaves your device.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 bg-bg-panel/30 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-white mb-4">Why choose local-first?</h2>
                            <p className="text-text-muted text-lg">Speed, privacy, and full control over your data.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Database, title: "Local Storage", desc: "Your watchlist lives in your browser. Persistent, fast, and yours forever." },
                                { icon: WifiOff, title: "Works Offline", desc: "View your tracked history and stats even without an internet connection." },
                                { icon: Shield, title: "Zero Tracking", desc: "We don't know what you watch. No analytics, no ads, no user accounts." },
                                { icon: Layout, title: "Unified Dashboard", desc: "Track Anime (AniList) and TV Shows (TVmaze) in one beautiful interface." },
                                { icon: Calendar, title: "Release Calendar", desc: "Visual schedule for your upcoming episodes." },
                                { icon: TrendingUp, title: "Smart Stats", desc: "Visualize your watching habits with simple, clear analytics." },
                            ].map((feature, i) => (
                                <div key={i} className="bg-bg-panel p-8 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-colors group">
                                    <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-text-muted leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-8 border-t border-white/5 text-center text-sm text-text-muted">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© 2024 AniSystem. Open source usage.</p>
                    <div className="flex gap-6">
                        <Link to="/support" className="hover:text-white transition-colors">Support</Link>
                        <a href="https://github.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};
