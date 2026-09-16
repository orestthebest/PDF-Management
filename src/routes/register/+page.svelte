<script>
    import Logo from '$lib/Logo.svelte';
 
    // form enthält die Fehlermeldung vom register-Action.
    let { form } = $props();
</script>
 
<svelte:head>
<title>Create account, PDFVault</title>
</svelte:head>
 
<div class="relative min-h-[calc(100vh-3.5rem)] flex items-start justify-center px-4 py-24 overflow-hidden">
 
    <div class="absolute inset-0 dot-grid opacity-60
                [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" aria-hidden="true"></div>
 
    <div class="float absolute -top-24 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-indigo-200/50 blur-3xl"
        aria-hidden="true"></div>
 
    <div class="relative w-full max-w-sm">
 
        <div class="fade-up flex flex-col items-center text-center mb-8">
<Logo size={52} />
<h1 class="text-3xl font-bold text-gray-900 mt-5 tracking-tight">Create your account</h1>
<p class="text-gray-600 mt-2">Takes about ten seconds.</p>
</div>
 
        {#if form?.error}
<p class="fade-up bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
                {form.error}
</p>
        {/if}
 
        <form action="?/register" method="POST"
            class="fade-up delay-1 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-900/5 p-7 flex flex-col gap-5">
 
            <div class="flex flex-col gap-1.5">
<label for="username" class="text-sm font-semibold text-gray-700">Username</label>
<input type="text" id="username" name="username" required maxlength="50" autocomplete="username"
                    value={form?.username ?? ''}
                    class="border border-gray-300 rounded-xl px-3.5 py-3 text-sm
                           focus:border-indigo-600 hover:border-gray-400 transition" />
</div>
 
            <div class="flex flex-col gap-1.5">
<label for="password" class="text-sm font-semibold text-gray-700">Password</label>
<!-- minlength prüft schon im Browser, der Server prüft trotzdem nochmal -->
<input type="password" id="password" name="password" required minlength="6" autocomplete="new-password"
                    class="border border-gray-300 rounded-xl px-3.5 py-3 text-sm
                           focus:border-indigo-600 hover:border-gray-400 transition" />
<span class="text-xs text-gray-500">At least 6 characters.</span>
</div>
 
            <button type="submit"
                class="shine bg-indigo-600 text-white rounded-xl py-3 font-semibold mt-1
                       hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/25 transition cursor-pointer">
                Create account
</button>
 
        </form>
 
        <p class="fade-up delay-2 text-sm text-gray-500 text-center mt-6">
            Already registered?
<a href="/login" class="text-indigo-700 font-semibold hover:underline">Log in</a>
</p>
 
    </div>
</div>