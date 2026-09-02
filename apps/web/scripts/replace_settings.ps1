$file = 'c:\Users\k\Downloads\NyumatFlix-main\NyumatFlix-main\apps\web\app\settings\settings-client.tsx'
$content = Get-Content $file -Raw -Encoding UTF8

$replacements = @{
  '>Settings<' = '>Ajustes<';
  '"Playback"' = '"Reproducción"';
  '"Integrations"' = '"Integraciones"';
  '"Account"' = '"Cuenta"';
  '"No ads mode"' = '"Modo sin anuncios"';
  '"Proxy only — hides iframe and skips embed fallback"' = '"Solo proxy — oculta iframe y omite respaldo de incrustación"';
  '"Static hero"' = '"Héroe estático"';
  '"Backdrop image instead of autoplay trailers"' = '"Imagen de fondo en lugar de tráileres automáticos"';
  '"Card hover sounds"' = '"Sonidos al pasar el ratón"';
  '"Play sounds when hovering posters and cards"' = '"Reproducir sonidos al pasar el ratón sobre pósteres"';
  '>Display name<' = '>Nombre a mostrar<';
  '>Enter a display name to get started<' = '>Ingresa un nombre para empezar<';
  '"What should we call you?"' = '"¿Cómo deberíamos llamarte?"';
  '>Email<' = '>Correo electrónico<';
  '"Signed in with MyAnimeList (no email set)"' = '"Inició sesión con MyAnimeList (sin correo configurado)"';
  '>Avatar<' = '>Avatar<';
  '>Randomize<' = '>Aleatorio<';
  '>Accent<' = '>Acento<';
  '>Save profile<' = '>Guardar perfil<';
  '>Delete account<' = '>Eliminar cuenta<';
  '>Delete your account?<' = '>¿Eliminar tu cuenta?<';
  '>This permanently deletes your account and watchlist. This action cannot be undone.<' = '>Esto elimina permanentemente tu cuenta y lista. Esta acción no se puede deshacer.<';
  '>Cancel<' = '>Cancelar<';
  '>Sign in<' = '>Iniciar sesión<';
}

foreach ($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
}

Set-Content $file $content -Encoding UTF8
Write-Host "Replaced text in settings-client.tsx"
