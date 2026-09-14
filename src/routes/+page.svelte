<script>
    // data.user kommt aus +layout.server.js. Die Seite ist öffentlich,
    // der User wird nur gebraucht, um den richtigen Button anzuzeigen.
    let { data } = $props();
</script>

<svelte:head>
    <title>PDFVault</title>
</svelte:head>

<!-- Hero: der erste Bereich, den jeder Besucher sieht -->
<section class="max-w-5xl mx-auto px-4 pt-20 pb-16">
    <div class="max-w-2xl">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Your documents, in one place you can actually find again.
        </h1>
        <p class="text-lg text-gray-600 mb-8">
            Upload your PDFs, keep them behind your own login and download them from any
            device. No folders on a USB stick, no attachments lost in a chat.
        </p>

        <!-- Je nach Login-Status führt der Button woanders hin -->
        {#if data.user}
            <a href={data.user.role === 'admin' ? '/admin' : '/dashboard'}
                class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Go to my documents
            </a>
        {:else}
            <a href="/login"
                class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Log in to upload
            </a>
        {/if}
    </div>
</section>

<!-- Drei Kernfunktionen, kurz erklärt -->
<section class="max-w-5xl mx-auto px-4 pb-16">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h2 class="font-semibold text-gray-900 mb-2">Upload in one step</h2>
            <p class="text-sm text-gray-600">
                Pick a file, give it a title, done. PDFVault accepts PDF files up to 10 MB.
            </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h2 class="font-semibold text-gray-900 mb-2">Only you see your files</h2>
            <p class="text-sm text-gray-600">
                Every document belongs to the account that uploaded it. Downloads are
                checked on the server, not hidden behind a secret link.
            </p>
        </div>

        <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h2 class="font-semibold text-gray-900 mb-2">Available everywhere</h2>
            <p class="text-sm text-gray-600">
                The files live in cloud storage, so the same document opens on your laptop
                and on your phone.
            </p>
        </div>

    </div>
</section>

<!-- Ablauf in drei Schritten -->
<section class="max-w-5xl mx-auto px-4 pb-24">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">How it works</h2>

    <ol class="border-t border-gray-200">
        <li class="flex gap-4 py-5 border-b border-gray-200">
            <span class="text-indigo-600 font-bold">1</span>
            <div>
                <p class="font-semibold text-gray-900">Log in</p>
                <p class="text-sm text-gray-600">Your teacher or the admin gives you an account.</p>
            </div>
        </li>
        <li class="flex gap-4 py-5 border-b border-gray-200">
            <span class="text-indigo-600 font-bold">2</span>
            <div>
                <p class="font-semibold text-gray-900">Upload your PDF</p>
                <p class="text-sm text-gray-600">The file goes straight to cloud storage, the title stays in the database.</p>
            </div>
        </li>
        <li class="flex gap-4 py-5 border-b border-gray-200">
            <span class="text-indigo-600 font-bold">3</span>
            <div>
                <p class="font-semibold text-gray-900">Download it again</p>
                <p class="text-sm text-gray-600">Your documents stay in your list until an admin removes them.</p>
            </div>
        </li>
    </ol>
</section>