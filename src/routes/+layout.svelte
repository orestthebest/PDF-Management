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

    <!-- Kopfzeile schwebt als abgerundete Leiste über dem Inhalt.
         sticky top-4 hält sie beim Scrollen mit Abstand oben. -->
    <header class="sticky top-4 z-30 px-4">
        <div class="max-w-5xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm
                    px-3 sm:px-5 h-14 flex items-center justify-between">

            <!-- group + group-hover: das Logo reagiert, wenn man über den
                 ganzen Link fährt, nicht nur über das Symbol -->
            <a href="/" class="flex items-center gap-2.5 group pl-1">
                <div class="transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Logo size={30} />
                </div>
                <span class="text-base font-bold tracking-tight text-gray-900">PDFVault</span>
            </a>

            <nav class="flex items-center gap-1 sm:gap-2 text-sm font-medium">
                {#if data.user}
                    <!-- Namensschild mit dem ersten Buchstaben als Avatar-Ersatz -->
                    <span class="hidden sm:flex items-center gap-2 text-gray-600 pr-2">
                        <span class="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                            {data.user.username[0].toUpperCase()}
                        </span>
                        {data.user.username}
                    </span>

                    <!-- Admins verwalten alle Dateien, normale User sehen ihre eigenen -->
                    {#if data.user.role === 'admin'}
                        <a href="/admin"
                            class="px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition">
                            All documents
                        </a>
                    {:else}
                        <a href="/dashboard"
                            class="px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-indigo-700 transition">
                            My documents
                        </a>
                    {/if}

                    <!-- Logout ist ein POST-Formular, damit ein einfacher Link-Aufruf
                         niemanden ausloggen kann -->
                    <form action="/logout?/logout" method="POST" class="m-0">
                        <button type="submit"
                            class="px-3 py-2 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer bg-transparent border-none">
                            Log out
                        </button>
                    </form>
                {:else}
                    <a href="/login" class="px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition">
                        Log in
                    </a>
                    <a href="/register"
                        class="shine bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold
                               hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20 transition">
                        Create account
                    </a>
                {/if}
            </nav>
        </div>
    </header>

    <!-- -mt-14 zieht den Inhalt wieder nach oben, weil die Leiste darüber
         schwebt und sonst doppelt Platz entstünde -->
    <main class="flex-1 w-full -mt-14 pt-14">
        {@render children()}
    </main>

    <!-- Fußzeile -->
    <footer class="border-t border-gray-200 bg-white mt-24">
        <div class="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center gap-2.5">
                <Logo size={26} />
                <span class="text-sm font-bold text-gray-800">PDFVault</span>
            </div>
            <p class="text-sm text-gray-500">
                School project by Orest and Suisa, HTL Shkodër 2026
            </p>
        </div>
    </footer>

</div>