<script>
    import Logo from '$lib/Logo.svelte';

    // form enthält die Fehlermeldung vom login-Action.
    let { form } = $props();
</script>

<svelte:head>
    <title>Log in, PDFVault</title>
</svelte:head>

<!-- Punktraster über die ganze Höhe, damit die Anmeldeseite nicht leer wirkt -->
<div class="dot-grid min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-20">
    <div class="w-full max-w-sm fade-up">

        <!-- Logo über dem Formular als Anker -->
        <div class="flex flex-col items-center text-center mb-8">
            <Logo size={48} />
            <h1 class="text-2xl font-bold text-gray-900 mt-4">Welcome back</h1>
            <p class="text-sm text-gray-600 mt-1">Log in to see your documents.</p>
        </div>

        <!-- Fehlermeldung, falls der Login fehlgeschlagen ist -->
        {#if form?.error}
            <p class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                {form.error}
            </p>
        {/if}

        <form action="?/login" method="POST"
            class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

            <div class="flex flex-col gap-1.5">
                <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
                <!-- value füllt das Feld nach einem Fehlversuch wieder aus -->
                <input type="text" id="username" name="username" required autocomplete="username"
                    value={form?.username ?? ''}
                    class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-600 transition" />
            </div>

            <div class="flex flex-col gap-1.5">
                <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
                <input type="password" id="password" name="password" required autocomplete="current-password"
                    class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-600 transition" />
            </div>

            <button type="submit"
                class="bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 hover:shadow-md transition cursor-pointer">
                Log in
            </button>

        </form>

        <p class="text-sm text-gray-500 text-center mt-5">
            No account yet?
            <a href="/register" class="text-indigo-700 font-semibold hover:underline">Create one</a>
        </p>

    </div>
</div>