/**
 * main-entry.js
 * Punto de entrada modular para O.S.10 Coquimbo.
 * Optimiza el Critical Request Chain cargando módulos en paralelo.
 */

import { initUICore } from './ui-core.js';
import { initAppFeatures } from './app-features.js';
import { initDynamicLoaders } from './dynamic-loaders.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Sistema O.S.10: Iniciando carga modular...");
    
    // Ejecución inmediata de la interfaz base
    initUICore();
    
    // Ejecución de lógica de negocio y estados
    initAppFeatures();
    
    // Preparación de componentes pesados
    initDynamicLoaders();
});