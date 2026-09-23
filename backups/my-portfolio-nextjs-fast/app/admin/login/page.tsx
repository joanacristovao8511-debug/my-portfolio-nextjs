'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dark, setDark] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError('Invalid email address or password.');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <main className={dark
      ? 'relative min-h-screen overflow-hidden bg-[#050911] text-white'
      : 'relative min-h-screen overflow-hidden bg-[#f5f7fb] text-slate-950'}>
      <div className="pointer-events-none absolute inset-0">
        <div className={dark
          ? 'absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[110px]'
          : 'absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-300/20 blur-[110px]'} />
        <div className={dark
          ? 'absolute -bottom-48 -right-24 h-[40rem] w-[40rem] rounded-full bg-blue-600/10 blur-[120px]'
          : 'absolute -bottom-48 -right-24 h-[40rem] w-[40rem] rounded-full bg-blue-300/20 blur-[120px]'} />
        <div className={dark
          ? 'absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(148,163,184,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.5)_1px,transparent_1px)] bg-[size:44px_44px]'
          : 'absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(15,23,42,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.6)_1px,transparent_1px)] bg-[size:44px_44px]'} />
      </div>

      <button
        type="button"
        onClick={() => setDark((current) => !current)}
        aria-label="Toggle theme"
        className={dark
          ? 'absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 shadow-2xl backdrop-blur-xl transition hover:bg-white/[0.08]'
          : 'absolute right-6 top-6 z-30 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/80 text-slate-600 shadow-lg backdrop-blur-xl transition hover:bg-white'}>
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 py-10 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <section className="hidden lg:block">
          <div className="max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_currentColor]" />
              Private administration
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-white shadow-xl shadow-blue-600/20">
                <Terminal className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-black tracking-[0.16em]">MY-PORTFOLIO</p>
                <p className={dark ? 'mt-1 text-xs text-slate-500' : 'mt-1 text-xs text-slate-400'}>
                  Engineering control plane
                </p>
              </div>
            </div>

            <h2 className={dark
              ? 'mt-10 text-5xl font-black leading-[1.02] tracking-[-0.055em] text-white xl:text-6xl'
              : 'mt-10 text-5xl font-black leading-[1.02] tracking-[-0.055em] text-slate-950 xl:text-6xl'}>
              Build the signal.<br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                Control the system.
              </span>
            </h2>

            <p className={dark
              ? 'mt-7 max-w-lg text-base leading-7 text-slate-400'
              : 'mt-7 max-w-lg text-base leading-7 text-slate-500'}>
              A focused workspace for maintaining the portfolio surface, technical profile,
              projects, experience and quality signals.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ['01', 'Content'],
                ['02', 'Projects'],
                ['03', 'Signals'],
              ].map(([number, label]) => (
                <div key={number} className={dark
                  ? 'rounded-2xl border border-white/10 bg-white/[0.035] p-4'
                  : 'rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm'}>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-cyan-500">{number}</p>
                  <p className={dark ? 'mt-3 text-xs font-semibold text-slate-300' : 'mt-3 text-xs font-semibold text-slate-700'}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center lg:max-w-[470px]">
          <div className={dark
            ? 'rounded-[30px] border border-white/10 bg-[#0a111d]/90 p-7 shadow-[0_35px_100px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:p-9'
            : 'rounded-[30px] border border-slate-200/80 bg-white/90 p-7 shadow-[0_35px_90px_rgba(15,23,42,.14)] backdrop-blur-2xl sm:p-9'}>
            <div className="mb-8 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" />

            <div className="flex items-start justify-between gap-5">
              <div>
                <div className={dark
                  ? 'mb-4 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400'
                  : 'mb-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500'}>
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  Admin access
                </div>
                <h1 className={dark
                  ? 'text-3xl font-black tracking-[-0.04em] text-white'
                  : 'text-3xl font-black tracking-[-0.04em] text-slate-950'}>
                  Welcome back.
                </h1>
                <p className={dark ? 'mt-2 text-sm leading-6 text-slate-500' : 'mt-2 text-sm leading-6 text-slate-500'}>
                  Sign in to continue to your control center.
                </p>
              </div>
              <div className={dark
                ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/10 text-cyan-400'
                : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-600'}>
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            {error && (
              <div role="alert" className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className={dark ? 'mb-2 block text-xs font-semibold text-slate-300' : 'mb-2 block text-xs font-semibold text-slate-700'}>
                  Email address
                </label>
                <div className="relative">
                  <Mail className={dark ? 'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600' : 'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    className={dark
                      ? 'h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10'
                      : 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className={dark ? 'mb-2 block text-xs font-semibold text-slate-300' : 'mb-2 block text-xs font-semibold text-slate-700'}>
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className={dark ? 'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600' : 'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400'} />
                  <input
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    className={dark
                      ? 'h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/60 focus:ring-4 focus:ring-cyan-400/10'
                      : 'h-12 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-400/10'}
                  />
                  <button type="button" onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-500/10 hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
              >
                {loading ? 'Authenticating…' : 'Continue to dashboard'}
                {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
              </button>
            </form>

            <div className={dark
              ? 'mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] text-slate-600'
              : 'mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-[10px] text-slate-400'}>
              <span>MY-PORTFOLIO</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Protected workspace
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
