<script>
    // data.pdfs = alle PDFs von allen Usern.
    let { data } = $props();
</script>
 
<svelte:head>
<title>All documents, PDFVault</title>
</svelte:head>
 
<div class="max-w-4xl mx-auto px-4 py-12">
 
    <h1 class="text-2xl font-bold text-gray-900 mb-2">All documents</h1>
<p class="text-sm text-gray-600 mb-8">
        Every file uploaded by every user. Admins do not upload, they manage.
</p>
 
    {#if data.pdfs.length === 0}
<p class="bg-white border border-dashed border-gray-300 rounded-xl px-4 py-10 text-center text-sm text-gray-500">
            No documents have been uploaded yet.
</p>
    {:else}
<div class="bg-white border border-gray-200 rounded-xl overflow-x-auto">
<table class="w-full text-sm">
<thead class="bg-gray-50 border-b border-gray-200">
<tr>
<th class="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
<th class="text-left px-4 py-3 font-semibold text-gray-600">Owner</th>
<th class="text-left px-4 py-3 font-semibold text-gray-600">Size</th>
<th class="text-left px-4 py-3 font-semibold text-gray-600">Uploaded</th>
<th class="text-left px-4 py-3 font-semibold text-gray-600">File</th>
</tr>
</thead>
<tbody>
<!-- Eine Zeile pro PDF -->
                    {#each data.pdfs as pdf (pdf.id)}
<tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
<td class="px-4 py-3 font-medium text-gray-900">{pdf.title}</td>
<td class="px-4 py-3 text-gray-600">{pdf.owner_name}</td>
<!-- size_bytes steht in Bytes, geteilt durch 1024 sind es KB -->
<td class="px-4 py-3 text-gray-500">{Math.round(pdf.size_bytes / 1024)} KB</td>
<td class="px-4 py-3 text-gray-500">{pdf.uploaded_date}</td>
<td class="px-4 py-3">
<!-- Admins dürfen jede Datei herunterladen, das prüft
                                     die Download-Route selbst -->
<a href="/download/{pdf.id}"
                                    class="text-indigo-600 font-semibold hover:underline">
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