<script>
    import Logo from '$lib/Logo.svelte';

    // page enthält den Status und die Meldung, die der Server mit
    // error(403, '...') geworfen hat.
    import { page } from '$app/state';
</script>

<svelte:head>
    <title>{page.status}, PDFVault</title>
</svelte:head>

<div class="relative min-h-[calc(100vh-3.5rem)] flex items-start justify-center px-4 py-28 overflow-hidden">

    <div class="absolute inset-0 dot-grid opacity-60
                [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" aria-hidden="true"></div>

    <div class="relative max-w-md text-center">

        <div class="fade-up flex justify-center mb-8">
            <Logo size={48} />
        </div>

        <!-- Die Statusnummer groß als Blickfang -->
        <p class="fade-up delay-1 text-7xl font-bold text-indigo-600 mb-5 tracking-tight">{page.status}</p>

        <h1 class="fade-up delay-2 text-2xl font-bold text-gray-900 mb-3">
            {#if page.status === 404}
                We could not find that page
            {:else if page.status === 403}
                You are not allowed in here
            {:else}
                Something went wrong
        {/if}
        </h1>

        <!-- Die genaue Meldung vom Server, falls es eine gibt -->
        <p class="fade-up delay-2 text-gray-600 mb-9">{page.error?.message}</p>

        <a href="/"
            class="shine fade-up delay-3 inline-block bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold
                   hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/25 transition">
            Back to the start page
        </a>

    </div>
</div>