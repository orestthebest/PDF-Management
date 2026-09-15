<script>
    // data = eigene PDFs, form = Fehlermeldung vom upload-Action.
    let { data, form } = $props();
</script>

<svelte:head>
    <title>My documents, PDFVault</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-12">

    <!-- Seitenkopf -->
    <div class="fade-up mb-10">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">My documents</h1>
        <p class="text-gray-600">Everything you uploaded, ready to download again.</p>
    </div>

    <!-- Zwei Spalten ab Desktop: links das Formular, rechts die Liste.
         Auf dem Handy liegen sie untereinander -->
    <div class="grid lg:grid-cols-[22rem_1fr] gap-8 items-start">

        <!-- ---------- Upload-Formular ----------
             lg:sticky lässt das Formular beim Scrollen stehen -->
        <form action="?/upload" method="POST" enctype="multipart/form-data"
            class="fade-up delay-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-5 lg:sticky lg:top-24">

            <div>
                <h2 class="font-semibold text-gray-900">Upload a PDF</h2>
                <p class="text-sm text-gray-500 mt-0.5">Up to 10 MB per file.</p>
            </div>

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

            <div class="flex flex-col gap-1.5">
                <label for="title" class="text-sm font-semibold text-gray-700">Title</label>
                <input type="text" id="title" name="title" required maxlength="150"
                    placeholder="Physics notes chapter 4"
                    class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-600 transition" />
            </div>

            <div class="flex flex-col gap-1.5">
                <label for="file" class="text-sm font-semibold text-gray-700">PDF file</label>
                <!-- accept filtert schon im Dateidialog, geprüft wird trotzdem am Server.
                     file:... gestaltet den Button innerhalb des Feldes -->
                <input type="file" id="file" name="file" accept="application/pdf" required
                    class="text-sm text-gray-600 border border-gray-300 rounded-lg px-3 py-2.5
                           file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5
                           file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 file:cursor-pointer" />
            </div>

            <button type="submit"
                class="bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 hover:shadow-md transition cursor-pointer">
                Upload
            </button>

        </form>

        <!-- ---------- Liste der eigenen PDFs ---------- -->
        <div class="fade-up delay-2">

            <div class="flex items-center justify-between mb-4">
                <h2 class="font-semibold text-gray-900">Your files</h2>
                <!-- Anzahl als kleine Pille -->
                <span class="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {data.pdfs.length}
                </span>
            </div>

            {#if data.pdfs.length === 0}
                <!-- Leerer Zustand: sagt dem User, was er als Nächstes tun kann -->
                <div class="bg-white border border-dashed border-gray-300 rounded-2xl px-6 py-16 text-center">
                    <p class="font-semibold text-gray-700 mb-1">No documents yet</p>
                    <p class="text-sm text-gray-500">Upload your first PDF with the form on the left.</p>
                </div>
            {:else}
                <ul class="flex flex-col gap-3">
                    {#each data.pdfs as pdf (pdf.id)}
                        <li class="group bg-white border border-gray-200 rounded-xl px-4 py-4 flex items-center gap-4
                                   hover:border-indigo-200 hover:shadow-md transition">

                            <!-- Dateisymbol -->
                            <span class="shrink-0 w-11 h-11 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                                PDF
                            </span>

                            <!-- min-w-0 zusammen mit truncate schneidet lange Namen ab,
                                 statt das Layout zu sprengen -->
                            <div class="min-w-0 flex-1">
                                <p class="font-medium text-gray-900 truncate">{pdf.title}</p>
                                <!-- size_bytes steht in Bytes, geteilt durch 1024 sind es KB -->
                                <p class="text-xs text-gray-500 truncate mt-0.5">
                                    {pdf.filename} · {Math.round(pdf.size_bytes / 1024)} KB · {pdf.uploaded_date}
                                </p>
                            </div>

                            <!-- Download läuft über unsere eigene Route, nicht über die
                                 Blob-URL, damit der Server die Berechtigung prüfen kann -->
                            <a href="/download/{pdf.id}"
                                class="shrink-0 flex items-center gap-1.5 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm font-semibold
                                       group-hover:border-indigo-600 group-hover:text-indigo-700 transition">
                                <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                                Download
                            </a>

                        </li>
                    {/each}
                </ul>
            {/if}

        </div>
    </div>
</div>