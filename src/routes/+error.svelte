<script>
    // page enthält den Status und die Fehlermeldung, die der Server
    // mit error(403, '...') geworfen hat.
    import { page } from '$app/state';
</script>

<svelte:head>
    <title>{page.status}, PDFVault</title>
</svelte:head>

<div class="max-w-md mx-auto px-4 py-28 text-center">

    <!-- Die Statusnummer groß als Blickfang -->
    <p class="fade-up text-6xl font-bold text-indigo-600 mb-4">{page.status}</p>

    <h1 class="fade-up delay-1 text-xl font-bold text-gray-900 mb-2">
        {#if page.status === 404}
            We could not find that page
        {:else if page.status === 403}
            You are not allowed in here
        {:else}
            Something went wrong
        {/if}
    </h1>

    <!-- Die genaue Meldung vom Server, falls es eine gibt -->
    <p class="fade-up delay-1 text-gray-600 mb-8">{page.error?.message}</p>

    <a href="/"
        class="fade-up delay-2 inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition">
        Back to the start page
    </a>

</div>