<script>
    import Logo from '$lib/Logo.svelte';

    // Die Seite ist öffentlich. data.user wird nur gebraucht, um den
    // passenden Button anzuzeigen.
    let { data } = $props();
</script>

<svelte:head>
    <title>PDFVault, your documents in one place</title>
</svelte:head>

<!-- ===================== HERO ===================== -->
<section class="relative overflow-hidden">

    <!-- Punktraster, nach unten hin ausgeblendet. mask-image blendet einen
         Bereich weich aus, ohne dass man ein Bild braucht -->
    <div class="absolute inset-0 dot-grid opacity-60
                [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true"></div>

    <!-- zwei weiche Farbflecken, die langsam schweben -->
    <div class="float absolute -top-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-indigo-200/60 blur-3xl"
        aria-hidden="true"></div>
    <div class="float absolute top-40 -left-32 w-96 h-96 rounded-full bg-indigo-100 blur-3xl"
        style="animation-delay: 2s" aria-hidden="true"></div>

    <div class="relative max-w-6xl mx-auto px-4 pt-24 pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

        <!-- linke Spalte: Text -->
        <div>
            <!-- kleines Etikett über der Überschrift -->
            <span class="fade-up inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full
                         px-3 py-1.5 text-xs font-semibold text-gray-600 mb-7">
                <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                Built for HTL students
            </span>

            <!-- gradient-text kommt aus layout.css -->
            <h1 class="fade-up delay-1 gradient-text text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Your documents, always one click away.
            </h1>

            <p class="fade-up delay-2 text-lg text-gray-600 mb-9 max-w-md leading-relaxed">
                Upload your PDFs, keep them behind your own login and download them from any
                device. No USB stick, no attachments lost in a chat.
            </p>

            <div class="fade-up delay-3 flex flex-wrap items-center gap-3">
                <!-- Je nach Login-Status führt der Button woanders hin -->
                {#if data.user}
                    <a href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
                        class="shine bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold
                               hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/25 transition">
                        Go to my documents
                    </a>
                {:else}
                    <a href="/register"
                        class="shine bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold
                               hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/25 transition">
                        Create a free account
                    </a>
                    <a href="/login"
                        class="bg-white border border-gray-300 text-gray-800 px-7 py-3.5 rounded-xl font-semibold
                               hover:border-indigo-600 hover:text-indigo-700 hover:-translate-y-0.5 transition">
                        I already have one
                    </a>
                {/if}
            </div>

            <!-- drei kleine Zahlen als Vertrauensanker -->
            <div class="fade-up delay-4 flex items-center gap-8 mt-12 pt-8 border-t border-gray-200 max-w-md">
                <div>
                    <p class="text-2xl font-bold text-gray-900">10 MB</p>
                    <p class="text-xs text-gray-500 mt-0.5">per file</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">2</p>
                    <p class="text-xs text-gray-500 mt-0.5">roles, user and admin</p>
                </div>
                <div>
                    <p class="text-2xl font-bold text-gray-900">0</p>
                    <p class="text-xs text-gray-500 mt-0.5">apps to install</p>
                </div>
            </div>
        </div>

        <!-- rechte Spalte: nachgebaute Oberfläche als Vorschau.
             Reine Deko, deshalb aria-hidden -->
        <div class="fade-up delay-3 hidden lg:block" aria-hidden="true">
            <div class="float bg-white border border-gray-200 rounded-3xl shadow-2xl shadow-gray-900/10 p-6 rotate-[1.5deg]">

                <!-- Fensterleiste -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-2">
                        <Logo size={26} />
                        <span class="text-sm font-bold text-gray-800">My documents</span>
                    </div>
                    <span class="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded-full">3 files</span>
                </div>

                <!-- drei Zeilen, die wie die echte Dateiliste aussehen -->
                <div class="flex flex-col gap-3">
                    {#each [36, 28, 40] as width}
                        <div class="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-3">
                            <span class="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                                PDF
                            </span>
                            <div class="flex-1">
                                <div class="h-2.5 bg-gray-800 rounded-full mb-2" style="width: {width * 4}px"></div>
                                <div class="h-2 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                            <div class="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" class="w-4 h-4 text-indigo-700" fill="none" stroke="currentColor"
                                    stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                            </div>
                        </div>
                    {/each}
                </div>

            </div>
        </div>

    </div>
</section>

<!-- ===================== FUNKTIONEN ===================== -->
<section class="max-w-6xl mx-auto px-4 py-24">

    <h2 class="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Everything you need, nothing you don't</h2>
    <p class="text-gray-600 mb-12 max-w-lg text-lg">Three things, and nothing else to learn.</p>

    <div class="grid sm:grid-cols-3 gap-5">

        <!-- hover:-translate-y-1 hebt die Karte beim Hovern leicht an -->
        <div class="group bg-white border border-gray-200 rounded-2xl p-7
                    hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 transition duration-300">
            <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6
                        group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                <!-- Pfeil nach oben als Upload-Symbol -->
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 text-lg">Upload in one step</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
                Pick a file, give it a title, done. PDFVault takes PDF files up to 10 MB and
                keeps the original name for the download.
            </p>
        </div>

        <div class="group bg-white border border-gray-200 rounded-2xl p-7
                    hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 transition duration-300">
            <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6
                        group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                <!-- Schloss als Symbol für den Zugriffsschutz -->
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 text-lg">Only you see your files</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
                Every document belongs to the account that uploaded it. The server checks who
                you are on every single download.
            </p>
        </div>

        <div class="group bg-white border border-gray-200 rounded-2xl p-7
                    hover:-translate-y-1.5 hover:shadow-xl hover:border-indigo-200 transition duration-300">
            <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6
                        group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                <!-- Wolke für den Cloud-Speicher -->
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M6 18h11a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 10.5 3.75 3.75 0 0 0 6 18z" />
                </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 text-lg">Available everywhere</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
                The files live in cloud storage, so the same document opens on your laptop in
                class and on your phone at home.
            </p>
        </div>

    </div>
</section>

<!-- ===================== ABLAUF ===================== -->
<section class="max-w-6xl mx-auto px-4 pb-24">
    <div class="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12">

        <h2 class="text-3xl font-bold text-gray-900 mb-10 tracking-tight">How it works</h2>

        <!-- Echte Reihenfolge, deshalb eine nummerierte Liste -->
        <ol class="grid sm:grid-cols-3 gap-10">
            <li class="relative">
                <span class="text-5xl font-bold text-indigo-100 block mb-3">01</span>
                <h3 class="font-bold text-gray-900 mb-1.5">Create your account</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Username and password, nothing else needed.</p>
            </li>
            <li class="relative">
                <span class="text-5xl font-bold text-indigo-100 block mb-3">02</span>
                <h3 class="font-bold text-gray-900 mb-1.5">Upload your PDFs</h3>
                <p class="text-sm text-gray-600 leading-relaxed">The file goes to cloud storage, the title stays in the database.</p>
            </li>
            <li class="relative">
                <span class="text-5xl font-bold text-indigo-100 block mb-3">03</span>
                <h3 class="font-bold text-gray-900 mb-1.5">Download any time</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Your list stays as it is until an admin removes a file.</p>
            </li>
        </ol>

    </div>
</section>

<!-- ===================== ABSCHLUSS ===================== -->
<section class="max-w-6xl mx-auto px-4 pb-28">
    <div class="relative overflow-hidden bg-indigo-800 rounded-3xl px-8 py-16 text-center">

        <!-- heller Schimmer im dunklen Kasten, rein dekorativ -->
        <div class="float absolute -top-24 -left-20 w-96 h-96 rounded-full bg-indigo-600 blur-3xl opacity-70"
            aria-hidden="true"></div>
        <div class="absolute inset-0 dot-grid opacity-[0.06]" aria-hidden="true"></div>

        <div class="relative">
            <div class="flex justify-center mb-6">
                <Logo size={52} />
            </div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                Ready to clean up your desktop?
            </h2>
            <p class="text-indigo-100 mb-9 max-w-md mx-auto text-lg">
                One login, all your documents, nothing to install.
            </p>
            <a href={data.user ? '/dashboard' : '/register'}
                class="shine inline-block bg-white text-indigo-800 px-7 py-3.5 rounded-xl font-semibold
                       hover:-translate-y-0.5 hover:shadow-2xl transition">
                {data.user ? 'Open my documents' : 'Get started'}
            </a>
        </div>

    </div>
</section>