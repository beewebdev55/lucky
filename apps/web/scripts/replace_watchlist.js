const fs = require('fs');
const path = require('path');

const file = 'c:\\Users\\k\\Downloads\\NyumatFlix-main\\NyumatFlix-main\\apps\\web\\components\\watchlist\\watchlist.tsx';
let content = fs.readFileSync(file, 'utf-8');

const replacements = {
  '"Last watched"': '"Último visto"',
  '"1 new episode"': '"1 nuevo episodio"',
  'new episodes"': 'nuevos episodios"',
  'until next episode"': 'hasta el próximo episodio"',
  '"To add items to your watchlist, you must be logged in."': '"Para agregar títulos a tu lista, debes iniciar sesión."',
  '"Sign in"': '"Iniciar sesión"',
  '"Removed from watchlist"': '"Eliminado de tu lista"',
  '"Failed to remove from watchlist"': '"Error al eliminar de tu lista"',
  '"Failed to add to watchlist"': '"Error al agregar a tu lista"',
  '"Loading..."': '"Cargando..."',
  '"Remove from watchlist"': '"Eliminar de tu lista"',
  '"Add to watchlist"': '"Agregar a tu lista"',
  '"Search your watchlist..."': '"Buscar en tu lista..."',
  '"Sort"': '"Ordenar"',
  '"All"': '"Todos"',
  '"Movies"': '"Películas"',
  '"TV Shows"': '"Series"',
  '"Status"': '"Estado"',
  '"Watching"': '"Viendo"',
  '"Plan to Watch"': '"Plan para ver"',
  '"On-Hold"': '"En pausa"',
  '"Dropped"': '"Abandonado"',
  '"Completed"': '"Completado"',
  '"Most Recently Watched"': '"Visto más recientemente"',
  '"New Episodes Available"': '"Nuevos episodios disponibles"',
  '"Recently Added"': '"Añadido recientemente"',
  '"No titles in this section yet."': '"No hay títulos en esta sección aún."',
  '"Unavailable"': '"No disponible"'
};

for (const [eng, span] of Object.entries(replacements)) {
  content = content.replaceAll(eng, span);
}

fs.writeFileSync(file, content, 'utf-8');
console.log('Replaced text in watchlist.tsx');
