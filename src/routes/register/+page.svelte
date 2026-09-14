<script>
    // form enthält die Fehlermeldung vom register-Action.
    let { form } = $props();
</script>
 
<svelte:head>
<title>Create account, PDFVault</title>
</svelte:head>
 
<div class="max-w-sm mx-auto px-4 mt-20">
<h1 class="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
<p class="text-sm text-gray-600 mb-6">Pick a username and a password, then you can upload.</p>
 
    {#if form?.error}
<p class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
            {form.error}
</p>
    {/if}
 
    <form action="?/register" method="POST"
        class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
 
        <div class="flex flex-col gap-1">
<label for="username" class="text-sm font-semibold text-gray-700">Username</label>
<!-- value füllt das Feld nach einem Fehlversuch wieder aus -->
<input type="text" id="username" name="username" required maxlength="50"
                value={form?.username ?? ''}
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
</div>
 
        <div class="flex flex-col gap-1">
<label for="password" class="text-sm font-semibold text-gray-700">Password</label>
<!-- minlength prüft schon im Browser, der Server prüft trotzdem nochmal -->
<input type="password" id="password" name="password" required minlength="6"
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
<span class="text-xs text-gray-500">At least 6 characters.</span>
</div>
 
        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Create account
</button>
 
        <p class="text-sm text-gray-500 text-center">
            Already have an account? <a href="/login" class="text-indigo-600 hover:underline">Log in</a>
</p>
    <p class="text-sm text-gray-500 text-center">
         No account? <a href="/register" class="text-indigo-600 hover:underline">Create one</a>
    </p>
    </form>


</div>