<script>
    // form enthält die Fehlermeldung vom login-Action.
    let { form } = $props();
</script>
 
<svelte:head>
<title>Log in, PDFVault</title>
</svelte:head>
 
<div class="max-w-sm mx-auto px-4 mt-20">
<h1 class="text-2xl font-bold text-gray-900 mb-2">Log in</h1>
<p class="text-sm text-gray-600 mb-6">Use the account you got from your teacher.</p>
 
    <!-- Fehlermeldung anzeigen, falls der Login fehlgeschlagen ist -->
    {#if form?.error}
<p class="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-4 text-sm">
            {form.error}
</p>
    {/if}
 
    <form action="?/login" method="POST"
        class="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
 
        <div class="flex flex-col gap-1">
<label for="username" class="text-sm font-semibold text-gray-700">Username</label>
<!-- value füllt das Feld nach einem Fehlversuch wieder aus -->
<input type="text" id="username" name="username" required value={form?.username ?? ''}
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
</div>
 
        <div class="flex flex-col gap-1">
<label for="password" class="text-sm font-semibold text-gray-700">Password</label>
<input type="password" id="password" name="password" required
                class="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
</div>
 
        <button type="submit"
            class="bg-indigo-600 text-white rounded-lg py-2 font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Log in
</button>
 
    </form>
</div>