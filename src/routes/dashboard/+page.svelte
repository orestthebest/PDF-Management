<script>
    // data = eigene PDFs, form = Fehlermeldung vom upload-Action.
    let { data, form } = $props();
</script>

<svelte:head>
    <title>My documents, PDFVault</title>
</svelte:head>

<div class="max-w-3xl mx-auto px-4 py-12">

    <h1 class="text-2xl font-bold text-gray-900 mb-8">My documents</h1>

    <!-- Upload-Formular. enctype multipart/form-data wird für Dateien gebraucht -->
    <form action="?/upload" method="POST" enctype="multipart/form-data"
        class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 mb-10">

        <h2 class="font-semibold text-gray-900">Upload a PDF</h2>

        <!-- Fehlermeldung vom Server -->
        {#if form?.error}
            <p class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {form.error}
            </p>
        {/if}

        <!-- Erfolgsmeldung nach dem Upload -->
        {#if data.uploaded}
            <p class="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
                Upload finished.
            </p>
        {/if}

        <div class="flex flex-col gap-1">
            <label for="title" class="text-sm font-semibold text-gray-700">Title</label>
            <input type="text" id="title" name="title" required maxlength="150"
                placeholder="e.g. Physics notes chapter 4"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>

        <div class="flex flex-col gap-1">
            <label for="file" class="text-sm font-semibold text-gray-700">PDF file</label>
            <!-- accept filtert schon im Dateidialog, geprüft wird trotzdem am Server -->
            <input type="file" id="file" name="file" accept="application/pdf" required
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            <span class="text-xs text-gray-500">PDF only, up to 10 MB.</span>
        </div>

        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Upload
        </button>

    </form>

    <!-- Liste der eigenen PDFs -->
    <h2 class="font-semibold text-gray-900 mb-3">
        Your files <span class="text-gray-400 font-normal">({data.pdfs.length})</span>
    </h2>

    {#if data.pdfs.length === 0}
        <!-- Leerer Zustand: sagt dem User, was er als Nächstes tun kann -->
        <p class="bg-white border border-dashed border-gray-300 rounded-xl px-4 py-10 text-center text-sm text-gray-500">
            Nothing here yet. Upload your first PDF with the form above.
        </p>
    {:else}
        <ul class="bg-white border border-gray-200 rounded-xl divide-y divide-gray-200">
            {#each data.pdfs as pdf (pdf.id)}
                <li class="flex items-center justify-between gap-4 px-4 py-4">
                    <div class="min-w-0">
                        <p class="font-medium text-gray-900 truncate">{pdf.title}</p>
                        <!-- size_bytes steht in Bytes in der DB, geteilt durch 1024 sind es KB -->
                        <p class="text-xs text-gray-500 truncate">
                            {pdf.filename}, {Math.round(pdf.size_bytes / 1024)} KB, {pdf.uploaded_date}
                        </p>
                    </div>

                    <!-- Download läuft über unsere eigene Route, nicht über die
                         Blob-URL, damit der Server die Berechtigung prüfen kann -->
                    <a href="/download/{pdf.id}"
                        class="shrink-0 border border-indigo-600 text-indigo-600 rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-indigo-50 transition">
                        Download
                    </a>
                </li>
            {/each}
        </ul>
    {/if}

</div>