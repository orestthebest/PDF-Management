<script>
    // Globales Stylesheet einbinden.
    import './layout.css';
    import Logo from '$lib/Logo.svelte';

    // children = Inhalt der jeweiligen Seite
    // data.user = eingeloggter User (kommt aus +layout.server.js)
    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="min-h-screen flex flex-col">

    <!-- Kopfzeile bleibt beim Scrollen oben kleben. backdrop-blur macht den
         Hintergrund milchig, wenn Inhalt darunter durchscrollt -->
    <header class="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

            <!-- group + group-hover: das Logo kippt, wenn man über den ganzen
                 Link fährt, nicht nur über das Symbol -->
            <a href="/" class="flex items-center gap-2.5 group">
                <div class="transition group-hover:-rotate-6">
                    <Logo />
                </div>
                <span class="text-lg font-bold tracking-tight text-gray-900">PDFVault</span>
            </a>

            <nav class="flex items-center gap-3 sm:gap-5 text-sm font-medium">
                {#if data.user}
                    <!-- Kleines Namensschild mit dem ersten Buchstaben -->
                    <span class="hidden sm:flex items-center gap-2 text-gray-600">
                        <span class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">
                            {data.user.username[0].toUpperCase()}
                        </span>
                        {data.user.username}
                    </span>

                    {#if data.user.role === 'admin'}
                        <a href="/admin" class="text-gray-700 hover:text-indigo-600 transition">All documents</a>
                    {:else}
                        <a href="/dashboard" class="text-gray-700 hover:text-indigo-600 transition">My documents</a>
                    {/if}

                    <!-- Logout ist ein POST-Formular, damit ein einfacher Link-Aufruf
                         niemanden ausloggen kann -->
                    <form action="/logout?/logout" method="POST" class="m-0">
                        <button type="submit"
                            class="text-gray-500 hover:text-red-600 transition cursor-pointer bg-transparent border-none">
                            Log out
                        </button>
                    </form>
                {:else}
                    <a href="/login"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-md transition">
                        Log in
                    </a>
                {/if}
            </nav>
        </div>
    </header>

    <main class="flex-1 w-full">
        {@render children()}
    </main>

    <footer class="bg-white border-t border-gray-200 mt-16">
        <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
            <span>PDFVault, school project by Orest and Suisa</span>
            <span>HTL Shkodër, 2026</span>
        </div>
    </footer>

</div>