<script>
    // data.pdfs = alle PDFs von allen Usern.
    let { data } = $props();

    // Kennzahlen für die Kopfzeile. $derived rechnet automatisch neu,
    // sobald sich die Liste ändert.
    let totalKb = $derived(
        Math.round(data.pdfs.reduce((summe, pdf) => summe + pdf.size_bytes, 0) / 1024)
    );

    // new Set(...) wirft doppelte Namen weg, übrig bleibt die Anzahl
    // der User, die überhaupt etwas hochgeladen haben.
    let owners = $derived(new Set(data.pdfs.map((pdf) => pdf.owner_name)).size);
</script>

<svelte:head>
    <title>All documents, PDFVault</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-12">

    <!-- Seitenkopf mit Admin-Kennzeichnung -->
    <div class="fade-up flex flex-wrap items-center gap-3 mb-2">
        <h1 class="text-3xl font-bold text-gray-900">All documents</h1>
        <span class="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">Admin</span>
    </div>
    <p class="fade-up text-gray-600 mb-8">
        Every file uploaded by every user. Admins manage, they do not upload.
    </p>

    <!-- Drei Kennzahlen auf einen Blick -->
    <div class="fade-up delay-1 grid grid-cols-3 gap-4 mb-8">
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p class="text-2xl font-bold text-gray-900">{data.pdfs.length}</p>
            <p class="text-sm text-gray-500 mt-0.5">Documents</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p class="text-2xl font-bold text-gray-900">{owners}</p>
            <p class="text-sm text-gray-500 mt-0.5">Users with files</p>
        </div>
        <div class="bg-white border border-gray-200 rounded-xl px-5 py-4">
            <p class="text-2xl font-bold text-gray-900">{totalKb} KB</p>
            <p class="text-sm text-gray-500 mt-0.5">Storage used</p>
        </div>
    </div>

    {#if data.pdfs.length === 0}
        <div class="fade-up delay-2 bg-white border border-dashed border-gray-300 rounded-2xl px-6 py-16 text-center">
            <p class="font-semibold text-gray-700 mb-1">Nothing uploaded yet</p>
            <p class="text-sm text-gray-500">As soon as a user uploads a PDF, it shows up here.</p>
        </div>
    {:else}
        <!-- overflow-x-auto: auf schmalen Bildschirmen lässt sich die Tabelle schieben -->
        <div class="fade-up delay-2 bg-white border border-gray-200 rounded-2xl overflow-x-auto">
            <table class="w-full text-sm">
                <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th class="text-left px-5 py-3.5 font-semibold text-gray-600">Document</th>
                        <th class="text-left px-5 py-3.5 font-semibold text-gray-600">Owner</th>
                        <th class="text-left px-5 py-3.5 font-semibold text-gray-600">Size</th>
                        <th class="text-left px-5 py-3.5 font-semibold text-gray-600">Uploaded</th>
                        <th class="text-right px-5 py-3.5 font-semibold text-gray-600">File</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Eine Zeile pro PDF -->
                    {#each data.pdfs as pdf (pdf.id)}
                        <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">

                            <td class="px-5 py-4">
                                <div class="flex items-center gap-3">
                                    <span class="shrink-0 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                                        PDF
                                    </span>
                                    <div class="min-w-0">
                                        <p class="font-medium text-gray-900 truncate">{pdf.title}</p>
                                        <p class="text-xs text-gray-500 truncate">{pdf.filename}</p>
                                    </div>
                                </div>
                            </td>

                            <td class="px-5 py-4">
                                <!-- Besitzer als kleine Pille mit Anfangsbuchstaben -->
                                <span class="inline-flex items-center gap-2 text-gray-700">
                                    <span class="w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                                        {pdf.owner_name[0].toUpperCase()}
                                    </span>
                                    {pdf.owner_name}
                                </span>
                            </td>

                            <!-- size_bytes steht in Bytes, geteilt durch 1024 sind es KB -->
                            <td class="px-5 py-4 text-gray-500 whitespace-nowrap">
                                {Math.round(pdf.size_bytes / 1024)} KB
                            </td>

                            <td class="px-5 py-4 text-gray-500 whitespace-nowrap">{pdf.uploaded_date}</td>

                            <td class="px-5 py-4 text-right">
                                <!-- Admins dürfen jede Datei herunterladen, das prüft
                                     die Download-Route selbst -->
                                <a href="/download/{pdf.id}"
                                    class="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 rounded-lg px-3 py-1.5 font-semibold
                                           hover:border-indigo-600 hover:text-indigo-700 transition">
                                    <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                        <path d="M12 5v14M5 12l7 7 7-7" />
                                    </svg>
                                    Download
                                </a>
                            </td>

                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}

</div>