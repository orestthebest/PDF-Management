<script>
    // Globales Stylesheet einbinden.
    import './layout.css';

    // children = Inhalt der jeweiligen Seite
    // data.user = eingeloggter User (kommt aus +layout.server.js)
    let { children, data } = $props();
</script>

<!-- Grundgerüst: Kopfzeile oben, Inhalt in der Mitte, Fußzeile unten -->
<div class="min-h-screen flex flex-col">

    <!-- Kopfzeile bleibt beim Scrollen oben kleben -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

            <!-- Logo führt immer zurück zur Startseite -->
            <a href="/" class="flex items-center gap-2">
                <span class="w-8 h-8 rounded-md bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    PV
                </span>
                <span class="text-lg font-bold text-gray-900">PDFVault</span>
            </a>

            <nav class="flex items-center gap-3 sm:gap-5 text-sm font-medium">
                {#if data.user}
                    <span class="hidden sm:inline text-gray-500">{data.user.username}</span>

                    <!-- Admins sehen alle Dokumente, normale User nur ihre eigenen -->
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
                    <!-- Nicht eingeloggt: nur der Weg zum Login -->
                    <a href="/login"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
                        Log in
                    </a>
                {/if}
            </nav>
        </div>
    </header>

    <!-- Hier wird der Inhalt der jeweiligen Seite eingefügt -->
    <main class="flex-1 w-full">
        {@render children()}
    </main>

    <!-- Fußzeile -->
    <footer class="bg-white border-t border-gray-200 mt-16">
        <div class="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500">
            <span>PDFVault, school project by Orest and Suisa</span>
            <span>HTL Shkodër, 2026</span>
        </div>
    </footer>

</div>