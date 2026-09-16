<script>
    // data.pdfs = alle PDFs von allen Usern.
    let { data } = $props();
 
    // Kennzahlen für die Kopfzeile. $derived rechnet automatisch neu,
    // sobald sich die Liste ändert.
    let totalKb = $derived(
        Math.round(data.pdfs.reduce((summe, pdf) => summe + pdf.size_bytes, 0) / 1024)
    );
 
    // new Set(...) wirft doppelte Namen weg, übrig bleibt die Anzahl der
    // User, die überhaupt etwas hochgeladen haben.
    let owners = $derived(new Set(data.pdfs.map((pdf) => pdf.owner_name)).size);
</script>
 
<svelte:head>
<title>All documents, PDFVault</title>
</svelte:head>
 
<div class="max-w-6xl mx-auto px-4 pt-20 pb-12">
 
    <!-- Seitenkopf mit Admin-Kennzeichnung -->
<div class="fade-up flex flex-wrap items-center gap-3 mb-3">
<h1 class="text-4xl font-bold text-gray-900 tracking-tight">All documents</h1>
<span class="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">Admin</span>
</div>
<p class="fade-up text-lg text-gray-600 mb-10">
        Every file uploaded by every user. Admins manage, they do not upload.
</p>
 
    <!-- Drei Kennzahlen auf einen Blick -->
<div class="fade-up delay-1 grid grid-cols-3 gap-4 mb-10">
<div class="bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-indigo-200 hover:shadow-md transition">
<p class="text-3xl font-bold text-gray-900">{data.pdfs.length}</p>
<p class="text-sm text-gray-500 mt-1">Documents</p>
</div>
<div class="bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-indigo-200 hover:shadow-md transition">
<p class="text-3xl font-bold text-gray-900">{owners}</p>
<p class="text-sm text-gray-500 mt-1">Users with files</p>
</div>
<div class="bg-white border border-gray-200 rounded-2xl px-6 py-5 hover:border-indigo-200 hover:shadow-md transition">
<p class="text-3xl font-bold text-gray-900">{totalKb} <span class="text-lg text-gray-400">KB</span></p>
<p class="text-sm text-gray-500 mt-1">Storage used</p>
</div>
</div>
 
    {#if data.pdfs.length === 0}
<!-- Leerer Zustand -->
<div class="fade-up delay-2 bg-white border border-dashed border-gray-300 rounded-2xl px-6 py-20 text-center">
<p class="font-bold text-gray-700 mb-1">Nothing uploaded yet</p>
<p class="text-sm text-gray-500">As soon as a user uploads a PDF, it shows up here.</p>
</div>
    {:else}
<!-- overflow-x-auto: auf schmalen Bildschirmen lässt sich die Tabelle schieben -->
<div class="fade-up delay-2 bg-white border border-gray-200 rounded-2xl overflow-x-auto">
<table class="w-full text-sm">
<thead class="bg-gray-50 border-b border-gray-200">
<tr>
<th class="text-left px-6 py-4 font-semibold text-gray-600">Document</th>
<th class="text-left px-6 py-4 font-semibold text-gray-600">Owner</th>
<th class="text-left px-6 py-4 font-semibold text-gray-600">Size</th>
<th class="text-left px-6 py-4 font-semibold text-gray-600">Uploaded</th>
<th class="text-right px-6 py-4 font-semibold text-gray-600">File</th>
</tr>
</thead>
<tbody>
<!-- Eine Zeile pro PDF -->
                    {#each data.pdfs as pdf (pdf.id)}
<tr class="group border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
 
                            <td class="px-6 py-4">
<div class="flex items-center gap-3">
<span class="shrink-0 w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center
                                                 group-hover:bg-indigo-600 group-hover:text-white transition">
                                        PDF
</span>
<!-- min-w-0 zusammen mit truncate schneidet lange Namen ab,
                                         statt das Layout zu sprengen -->
<div class="min-w-0">
<p class="font-semibold text-gray-900 truncate">{pdf.title}</p>
<p class="text-xs text-gray-500 truncate">{pdf.filename}</p>
</div>
</div>
</td>
 
                            <td class="px-6 py-4">
<!-- Besitzer mit Anfangsbuchstaben als Avatar-Ersatz -->
<span class="inline-flex items-center gap-2 text-gray-700">
<span class="w-7 h-7 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold flex items-center justify-center">
                                        {pdf.owner_name[0].toUpperCase()}
</span>
                                    {pdf.owner_name}
</span>
</td>
 
                            <!-- size_bytes steht in Bytes, geteilt durch 1024 sind es KB -->
<td class="px-6 py-4 text-gray-500 whitespace-nowrap">
                                {Math.round(pdf.size_bytes / 1024)} KB
</td>
 
                            <td class="px-6 py-4 text-gray-500 whitespace-nowrap">{pdf.uploaded_date}</td>
 
                            <td class="px-6 py-4 text-right">
<!-- Admins dürfen jede Datei herunterladen, das prüft
                                     die Download-Route selbst -->
<a href="/download/{pdf.id}"
                                    class="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 rounded-xl px-3.5 py-2 font-semibold
                                           hover:border-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition">
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