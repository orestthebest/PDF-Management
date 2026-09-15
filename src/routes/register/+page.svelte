<script>
    import Logo from '$lib/Logo.svelte';

    // form enthält die Fehlermeldung vom register-Action.
    let { form } = $props();
</script>

<svelte:head>
    <title>Create account, PDFVault</title>
</svelte:head>

<div class="dot-grid min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-20">
    <div class="w-full max-w-sm fade-up">

        <div class="flex flex-col items-center text-center mb-8">
            <Logo size={48} />
            <h1 class="text-2xl font-bold text-gray-900 mt-4">Create your account</h1>
            <p class="text-sm text-gray-600 mt-1">Takes about ten seconds.</p>
        </div>

        {#if form?.error}
            <p class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
                {form.error}
            </p>
        {/if}

        <form action="?/register" method="POST"
            class="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

            <div class="flex flex-col gap-1.5">
                <label for="username" class="text-sm font-semibold text-gray-700">Username</label>
                <input type="text" id="username" name="username" required maxlength="50" autocomplete="username"
                    value={form?.username ?? ''}
                    class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-600 transition" />
            </div>

            <div class="flex flex-col gap-1.5">
                <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
                <!-- minlength prüft schon im Browser, der Server prüft trotzdem nochmal -->
                <input type="password" id="password" name="password" required minlength="6" autocomplete="new-password"
                    class="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:border-indigo-600 transition" />
                <span class="text-xs text-gray-500">At least 6 characters.</span>
            </div>

            <button type="submit"
                class="bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 hover:shadow-md transition cursor-pointer">
                Create account
            </button>

        </form>

        <p class="text-sm text-gray-500 text-center mt-5">
            Already registered?
            <a href="/login" class="text-indigo-700 font-semibold hover:underline">Log in</a>
        </p>

    </div>
</div>