import { Link } from "@heroui/link";
import Image from 'next/image';
import { Suspense } from 'react'

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    }>
      <div className="relative w-full min-h-screen flex flex-col">
        <div className="fixed inset-0">
          <Image
            src="/images/resized.jpg"
            alt="Background"
            fill
            quality={50}
            priority={false}
            loading="lazy"
            className="object-cover will-change-transform"
            style={{ opacity: 0.7 }}
            sizes="100vw"
          />
        </div>

        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-fuchsia-500/10 to-violet-500/10 animate-float" 
          />
        </div>

        <div className="fixed inset-0 bg-gradient-to-b from-zinc-50/70 to-white/70 dark:from-background/95 dark:to-background/75" />
        
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[1000px] h-[1000px] -top-40 -right-20 bg-violet-500/20 dark:bg-violet-500/30 rounded-full blur-[100px] opacity-20" />
          <div className="absolute w-[1000px] h-[1000px] -bottom-40 -left-20 bg-fuchsia-500/20 dark:bg-fuchsia-500/30 rounded-full blur-[100px] opacity-20" />
        </div>

        <div className="relative z-10 container mx-auto flex-1 flex flex-col">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col items-center gap-16 max-w-5xl mx-auto py-32">
              <div className="flex flex-col items-center gap-6 text-center">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 animate-gradient">
                    GTA World
                  </span>
                  <br />
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-white">
                    Report Generators
                  </span>
                </h1>
                <p className="max-w-lg text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Create the most common report formats in various
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500"> Legal Factions </span>
                  with just a few clicks.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
                <Link 
                  href="/protech"
                  className="group relative overflow-hidden rounded-2xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="rounded-full bg-white dark:bg-zinc-800 p-1 shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div className="w-[50px] h-[50px] overflow-hidden flex items-center justify-center">
                          <Image
                            src="/images/protech-logo.png"
                            alt="ProTech Logo"
                            width={50}
                            height={50}
                            className="transform group-hover:scale-110 transition-transform duration-300 scale-[1.1]"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-zinc-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-500 group-hover:to-violet-500 transition-all">
                          ProTech
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">ProTech Security Solutions</p>
                      </div>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-300">Create incident reports, use of force reports, assignments, personnel files, and more.</p>
                  </div>
                </Link>

                <div className="group relative overflow-hidden rounded-2xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 opacity-75 cursor-not-allowed">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/images/lssd-badge.png"
                        alt="LSSD Badge"
                        width={50}
                        height={50}
                        className="rounded-full opacity-50"
                      />
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-zinc-400 dark:text-zinc-500">
                          LSSD
                          <span className="ml-2 text-sm text-fuchsia-500/70">Coming Soon</span>
                        </h2>
                        <p className="text-sm text-zinc-400 dark:text-zinc-500">Los Santos Sheriff's Department</p>
                      </div>
                    </div>
                    <p className="text-zinc-400 dark:text-zinc-500">Generate patrol logs, deployment logs, use of force reports, supplemental reports, and more.</p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 opacity-75 cursor-not-allowed">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/images/lshs-icon.png"
                        alt="LSHS"
                        width={50}
                        height={50}
                        className="rounded-full opacity-50"
                      />
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-zinc-400 dark:text-zinc-500">
                          LSHS
                          <span className="ml-2 text-sm text-fuchsia-500/70">Coming Soon</span>
                        </h2>
                        <p className="text-sm text-zinc-400 dark:text-zinc-500">Los Santos High School</p>
                      </div>
                    </div>
                    <p className="text-zinc-400 dark:text-zinc-500">Generate assignments, personnel files, report cards, position postings, and more.</p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl p-8 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 opacity-75 cursor-not-allowed">
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <Image
                        src="/images/dao-badge.png"
                        alt="LSDA"
                        width={50}
                        height={50}
                        className="rounded-full opacity-50"
                      />
                      <div>
                        <h2 className="text-2xl font-heading font-bold text-zinc-400 dark:text-zinc-500">
                          LSDA
                          <span className="ml-2 text-sm text-fuchsia-500/70">Coming Soon</span>
                        </h2>
                        <p className="text-sm text-zinc-400 dark:text-zinc-500">Los Santos District Attorney</p>
                      </div>
                    </div>
                    <p className="text-zinc-400 dark:text-zinc-500">Generate patrol logs, deployment logs, use of force reports, supplemental reports, and more.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center py-6 mt-auto">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Made with{" "}
                <span className="text-[#ff0000] dark:text-[#ff3333] text-base font-bold animate-heart-pulse inline-block">❤</span>
                {" "}by <a href="https://forum.gta.world/en/profile/50132-brant/" target="_blank" className="hover:text-fuchsia-400 transition-colors">Brant</a> for the GTA World Community
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
