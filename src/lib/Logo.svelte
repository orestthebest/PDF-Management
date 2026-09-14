<script>
    // size = Kantenlänge in Pixel. Der Standard passt in die Kopfzeile,
    // auf der Startseite rufen wir die Komponente mit size={56} auf.
    let { size = 32 } = $props();
</script>

<!-- Alle Koordinaten beziehen sich auf den viewBox, dadurch bleibt das Logo
     bei jeder Größe scharf. aria-label beschreibt es für Screenreader. -->
<svg width={size} height={size} viewBox="0 0 80 80" role="img" aria-label="PDFVault logo">
    <!-- abgerundetes Quadrat als Hintergrund -->
    <rect width="80" height="80" rx="20" fill="#1f5f4e" />

    <!-- weißes Blatt Papier mit abgeknickter Ecke -->
    <path d="M18 18h24l12 12v32a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4z" fill="#ffffff" />
    <path d="M42 18v12h12z" fill="#b3d1c7" />

    <!-- Schlüsselloch: Kreis plus Trapez darunter -->
    <circle cx="36" cy="46" r="6" fill="#1f5f4e" />
    <path d="M33 50h6l2 12H31z" fill="#1f5f4e" />
</svg>