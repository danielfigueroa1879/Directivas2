document.addEventListener('DOMContentLoaded', function () {
    // --- DOM Element Selection ---
    const chatPopup = document.getElementById('chat-popup');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatBackdrop = document.getElementById('chat-backdrop');
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    const internalCloseBtn = document.getElementById('chat-close-btn-internal');

       // --- Estilos del Chatbot Adaptados ---
    // He simplificado y corregido los estilos para bajar el ícono en PC.
    const styles = `
        :root {
            --green-light: #22c55e;
            --green-dark: #4ade80;
        }
        body.chat-open-mobile {
            overflow: hidden;
        }
        
        /* --- CORRECCIÓN DE POSICIÓN --- */
        #chat-widget-container {
            position: fixed;
            bottom: 20px; /* Posición base para móviles y pantallas pequeñas */
            right: 20px; 
            z-index: 1000;
            transition: bottom 0.3s ease, right 0.3s ease; /* Añade una transición suave */
        }

        /* Regla específica para PC (pantallas de 1024px o más) */
        /* AHORA EL CAMBIO ES MÁS GRANDE Y NOTABLE */
        @media (min-width: 1024px) {
            #chat-widget-container {
                bottom: 50px; /* <-- Mueve el ícono MÁS ARRIBA (lejos del borde inferior) en PC */
                right: 50px;  /* <-- Lo separa más del borde derecho en PC */
            }
        }
        
        #chat-popup {
            font-family: 'Poppins', sans-serif;
            position: absolute;
            bottom: 80px; /* Espacio para el botón */
            right: 0;
            width: 90vw;
            max-width: 400px;
            max-height: calc(100vh - 120px); /* Asegura que no se salga de la pantalla */
            transform-origin: bottom right;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        
        #chat-popup.hidden {
            transform: scale(0.5);
            opacity: 0;
            pointer-events: none;
        }
        #chat-toggle-button {
            position: absolute; 
            bottom: 0;
            right: 0;
            width: 90px;
            height: 90px;
            border-radius: 0.25rem;
            border: 3px solid var(--green-light);
            background-color: white;
            box-shadow: 0 4px 15px -2px rgba(34,197,94,0.4);
            animation: float-animation 2.5s infinite ease-in-out;
            transform: translateZ(0);
            transition: all 0.3s ease-in-out;
            will-change: transform;
            cursor: pointer;
            z-index: 1;
        }
        #chat-toggle-button:hover {
            transform: scale(0.05) translateZ(0);
            animation-play-state: paused;
        }
        .dark #chat-toggle-button {
            border-color: var(--green-dark);
            background-color: #1f2937;
            box-shadow: 0 4px 15px -2px rgba(74,222,128,0.4);
        }
        @keyframes float-animation {
            0%, 100% { transform: translateY(0) translateZ(0); }
            50% { transform: translateY(-18px) translateZ(0); }
        }
        .chat-messages-container { 
            scrollbar-width: thin;
            touch-action: pan-y;
            overscroll-behavior-y: contain;
            flex: 1;
            overflow-y: auto;
        }
        .light .chat-messages-container { scrollbar-color: #a1a1aa #e5e7eb; }
        .dark .chat-messages-container { scrollbar-color: #6b7280 #374151; }
        .chat-messages-container::-webkit-scrollbar { width: 5px; }
        .light .chat-messages-container::-webkit-scrollbar-track { background: #e5e7eb; }
        .dark .chat-messages-container::-webkit-scrollbar-track { background: #374151; }
        .light .chat-messages-container::-webkit-scrollbar-thumb { background-color: #a1a1aa; border-radius: 20px; }
        .dark .chat-messages-container::-webkit-scrollbar-thumb { background-color: #6b7280; border-radius: 20px; }
        .message-fade-in {
            opacity: 0;
            transform: translateY(10px);
            animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn { to { opacity: 1; transform: translateY(0); } }
        .typing-indicator span {
            height: 8px; width: 8px; float: left; margin: 0 1px;
            background-color: #9ca3af; display: block; border-radius: 50%;
            opacity: 0.4; animation: 1s blink infinite .3333s;
        }
        .typing-indicator span:nth-child(2) { animation-delay: .5s; }
        .typing-indicator span:nth-child(3) { animation-delay: .6666s; }
        @keyframes blink { 50% { opacity: 1; } }
        
        .bot-bubble {
            background-color: rgba(34, 197, 94, 0.2);
            border: 1px solid rgba(34, 197, 94, 0.3);
        }
        .dark .bot-bubble {
            background-color: rgba(74, 222, 128, 0.25);
            border: 1px solid rgba(74, 222, 128, 0.4);
        }

        #chat-backdrop {
            transition: opacity 0.3s ease-in-out;
        }
        
        .chatbot-message-text {
            font-size: 0.85rem;
            line-height: 1.4;
            font-weight: 400;
            word-break: break-word;
        }

        @media (max-width: 640px) {
            .chatbot-message-text {
                font-size: 1rem;
            }
             #chat-widget-container.fullscreen {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0 !important;
                width: 100%;
                height: 100vh;
                border-radius: 0;
                animation: none;
                touch-action: none;
                overscroll-behavior: none;
            }
            #chat-widget-container.fullscreen #chat-popup {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
                border-radius: 0;
                border: none;
                box-shadow: none;
                bottom: 0; /* Reset para fullscreen */
            }
            #chat-widget-container.fullscreen #chat-toggle-button {
                display: none;
            }
        }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
// --- Predefined Responses ---
const predefinedResponses = {
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE*👮🏻‍♂️ \n ⬇️\n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS' },
    'rule_5': { keywords: ["guardia de seguridad","guardia","guardia seguridad"], response: '🤖 🧙🏻‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf' },
    'rule_6': { keywords: ["jefe de seguridad"], response: 'OK..en este link encontrará la guía de *JEFE DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf' },
    'rule_7': { keywords: ["supervisor","acreditación supervisor","supervisor seguridad","para supervisor","acreditar un supervisor","supervisores","acreditar supervisores"], response: '🤖. *SUPERVISOR* \n1.- *GUIA*\nhttps://www.zosepcar.cl/content/OS10/TRAM_supervisor.pdf\n2.- *CREDENCIAL*\nhttps://os10.short.gy/Sup' },
    'rule_8': { keywords: ["*encargado de seguridad*","*encargado*"], response: '🤖 *ENCARGADO DE SEGURIDAD*\n*CREDENCIAL:*\nhttps://bit.ly/3H6pIOu\n*GUIA:*\nhttps://www.zosepcar.cl/content/OS10/TRAM_encargado_de_seguridad.pdf' },
    'rule_9': { keywords: ["capacitador"], response: '🤖 *CAPACITADOR*\nhttps://www.zosepcar.cl/content/OS10/TRAM_capacitador.pdf' },
    'rule_10': { keywords: ["tecnico"], response: '*TÉCNICO* https://www.zosepcar.cl/content/OS10/TRAM_tecnico.pdf' },
    'rule_11': { keywords: ["asesor"], response: '🤖 *ASESOR*\n**GUÍA:* \nhttps://www.zosepcar.cl/content/OS10/TRAM_asesor.pdf' },
    'rule_12': { keywords: ["*instalador tecnico","*técnico*","instalador*"], response: '*INSTALADOR TÉCNICO*\n https://www.zosepcar.cl/content/OS10/TRAM_instalador_tecnico.pdf' },
    'rule_13': { keywords: ["operador de cajeros"], response: '*OPERADOR DE CAJEROS AUTOMÁTICOS* \nhttps://www.zosepcar.cl/content/OS10/TRAM_operador_cajeros.pdf' },
    'rule_14': { keywords: ["*operador cctv","cctv*"], response: '🤖 *OPERADOR CCTV*\n*GUÍA:* https://www.zosepcar.cl/content/OS10/TRAM_operador_cctv.pdf' },
    'rule_15': { keywords: ["manuales"], response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*1M.-* MANUAL DE FUNCIONAMIENTO\n*2M.-* MANUAL DE CAPACITACIÓN \n*3M.-* MANUAL DE ORGANIZACIÓN' },
    'rule_16': { keywords: ["empresas","empresa"], response: '*EMPRESAS* https://www.zosepcar.cl/content/OS10/TRAM_empresas.pdf' },
    'rule_17': { keywords: ["1m"], response: '*MANUAL DE FUNCIONAMIENTO* https://www.zosepcar.cl/content/OS10/manual_funcionamiento.pdf' },
    'rule_18': { keywords: ["3m"], response: '*MANUAL DE ORGANIZACIÓN*\nhttps://www.zosepcar.cl/content/OS10/manual_organizacion.pdf' },
    'rule_19': { keywords: ["2m"], response: '*MANUAL DE CAPACITACIÓN*\nhttps://www.zosepcar.cl/content/OS10/manual_capacitacion.pdf' },
    'rule_20': { keywords: ["leyes"], response: '*ESCRIBE UN NUMERO LEY O DECRETO*.\n 🚦. ⬇️ \n \nDECTO. *261* DEL 31.0 un7.2020\nDECTO. *298* DEL 17.09.2019\n DECTO. *123* DEL 05.04.2019\nDECTO. *1045* DEL 12.09.2018\nDECTO. *867* DEL 12.09.2017\nDECTO. *1814* DEL 10.11.2014\nDECTO. *222* DEL 30.10.2014\nDECTO. *1122* DEL 19.10.1994\nDECTO. *41* DEL 05.03.1996\nDECTO. *1772* DEL 26.01.1995\nDECTO. *1773* DEL 14.11.1994\nDECTO. *93* DEL 21.10.1985\nD. LEY. *3607* DEL 08.01.1981\nLEY *19303* DEL 13.04.1994\nResol. *253* DEL 29.10.2013\nResol. *59* DEL 30.09.2014\nResol. *32* DEL 31.01.2024\nResol. *80* DEL 20.03.2024\nLEY. *21659* DEL 21.03.2024' },
    'rule_21': { keywords: ["261"], response: '*DECRETO NRO 261*. \n\n\nhttps://www.zosepcar.cl/content/OS10/Decreto-261.pdf' },
    'rule_22': { keywords: ["298"], response: '*DECRETO 298*. https://www.bcn.cl/leychile/navegar?idNorma=1136545&idParte=10054790&idVersion=2019-09-17' },
    'rule_23': { keywords: ["123"], response: '*DECRETO 123*. https://www.bcn.cl/leychile/navegar?idNorma=1130300' },
    'rule_24': { keywords: ["1045"], response: '*DECRETO 1045*. https://www.bcn.cl/leychile/navegar?idNorma=1122982&idParte=9948603&idVersion=2018-09-12' },
    'rule_25': { keywords: ["867"], response: '*DECRETO 867*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1116274' },
    'rule_26': { keywords: ["1814"], response: '*DECRETO 1814*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1069299' },
    'rule_27': { keywords: ["222"], response: '*DECRETO 222*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1055580' },
    'rule_28': { keywords: ["1122"], response: '*DECRETO 1122*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1072929' },
    'rule_29': { keywords: ["41"], response: '*DECRETO 41*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=19870' },
    'rule_30': { keywords: ["1772"], response: '*DECRETO 1772*. \nhttps://www.bcn.cl/leychile/navegar?idNorma=18592' },
    'rule_31': { keywords: ["1773"], response: '*DECRETO 1773*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=18594' },
    'rule_32': { keywords: ["93"], response: '*DECRETO 93*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=9081' },
    'rule_33': { keywords: ["3607"], response: '*D. LEY 3607*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=7193' },
    'rule_34': { keywords: ["19303"], response: '*LEY 19303*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=30670' },
    'rule_35': { keywords: ["253"], response: '*Resol. 253*. https://www.zosepcar.cl/content/OS10/resolucion_253.pdf' },
    'rule_36': { keywords: ["59"], response: '*Resol. 59*. https://www.zosepcar.cl/content/OS10/resolucion_59.pdf' },
    'rule_37': { keywords: ["32"], response: '*Decreto. 32*. https://www.bcn.cl/leychile/navegar?idNorma=1200633' },
    'rule_38': { keywords: ["80"], response: '*Resol. 80*. https://www.zosepcar.cl/content/OS10/resolucion_80.pdf' },
    'rule_39': { keywords: ["*21659*", "*nueva ley de seguridad*"], response: 'Entra en vigencia el 28-NOV-2025 *LEY 21659*. https://dal5.short.gy/LeySeg' },
    'rule_60': { keywords: ["cursos","curso"], response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*CF.-* CURSO FORMACIÓN GUARDIA\n*CJ.-* CURSO JEFE DE SEGURIDAD\n*CE.-* CURSO ENCARGADO\n*CS.-* CURSO SUPERVISOR\n*CT.-* CURSO TÉCNICO\n*CI.-* CURSO INSTALADOR\n*CC.-* CURSO OPERADOR CAJEROS\n*CV.-* CURSO OPERADOR CCTV\n*CP.-* CURSO PERFECCIONAMIENTO' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *OS10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFonos: 512651024-512651022-\nCredenciales:512651023\nhttps://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*ESCRIBA LO QUE ESTA CON NEGRILLAS*\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\n*Bots*: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_68': { keywords: ["imc"], response: '*CALCULAR IMC*\nhttps://nutricionistavirtual.cl/calculadora/' },
    'rule_69': { keywords: ["curso os10","vigencia curso","tiene curso","si tiene curso"], response: '🤖 *GUARDIA / EMPRESA* 👮🏻‍♂️ 👇🏽 VIGENCIA GG.SS./ VV.PP. /EMP. \nhttps://zosepcar.cl/OS10.php#buscador\n\n🏭 *RAZON SOC. / RUT EMP.*👇🏽\nboletaofactura.com\ngenealog.cl\nmercantil.com\n \n⚖️ *JUZGADO DE TURNO LA SERENA*\nhttps://bit.ly/3GIrWE1' },
    'rule_70': { keywords: ["4651"], response: '*RESOLUCIÓN 4651 INASISTENCIA*\n\nhttps://zosepcar.cl/content/OS10/resol_4651.pdf' },
    'rule_71': { keywords: ["empresa capacitacion arica"], response: '*EMPRESA DE CAPACITACIÓN ARICA*\n\n*SETCH* FONO: 582251978\n*GSC* FONO: 950144679\n*EDGARDO ABARZUA* FONO: 977777716\n*FUNCAL* FONO: 951490729' },
    'rule_72': { keywords: ["empresa en un dia"], response: '*\"CREA TU EMPRESA EN UN DIA\"* \n https://www.registrodeempresasysociedades.cl/' },
    'rule_73': { keywords: ["insignia digital"], response: '*INSIGNIA DIPLOMADO CIBERSEGURIDAD*\n\nhttps://bit.ly/3DSuD46' },
    'rule_74': { keywords: ["capacitadores"], response: '🤖 *CAPACITADORES*\n https://drive.google.com/file/d/1hpZrzhXCnGyLkFLRhj0FOY_zDwTEUIaN/view?usp=drivesdk' },
    'rule_76': { keywords: ["domicilio figueroa"], response: '*DOMICILIO*\nhttps://maps.app.goo.gl/rnqLdPG5sEFzN32C9' },
    'rule_78': { keywords: ["*votaciones*","*votar*","*excusarme*","*lugar de votación*"], response: '*LUGAR DE VOTACIÓN - VOCAL DE MESA*☝🏼👍🏽\nhttps://consulta.servel.cl/\n*PUEDE LLAMAR AL* 600 600 0166 desde su teléfono\n🤖 *CONSULTAS Y RECLAMOS SERVEL LINK- EXCUSA*: \nhttps://www.servel.cl/contacto/' },
    'rule_80': { keywords: ["comisaria","cuadrante","cuadrantes","comisarías"], response: '🤖👮🏻‍♂️ TEL. CUADRANTES\n- https://www.comisariavirtual.cl\n- https://www.stop.carabineros.cl/\n- BUSCA TU CUADRANTE:\nhttps://www.bit.ly/3Yna7AP\n- CUAD. LA SERENA\nhttps://www.dal5.short.gy/C\n- CUAD. LAS COMPAÑIAS\nhttps://www.dal5.short.gy/C1\n- CUAD. COQUIMBO\nhttps://www.dal5.short.gy/Co\n- MAPA CUAD LA SERENA\nhttps://www.d6.short.gy/LS\n- MAPA CUAD COQUIMBO\nhttps://www.d6.short.gy/CQ\n- CEROFILAS\nhttps://www.dal5.short.gy/CFil' },
    'rule_82': { keywords: ["rut","ver un rut"], response: '🤖 🧙🏻‍♂️ *Consultar R.U.T.* 👇?\nhttps://www.elrutificador.com/\nhttps://www.nombrerutyfirma.com\nhttps://www.rutynombre.com/\nhttps://www.rutificador.co/rut/' },
    'rule_83': { keywords: ["aaff"], response: '*AA.FF. A NIVEL NACIONAL* 🤖Busque la comuna que necesita en el mapa. \nhttps://www.zosepcar.cl/OS10.php#autoridad' },
    'rule_85': { keywords: ["reclamo","fiscalizacion","fiscalizar"], response: '*REQUERIMIENTO* \n https://dal5.short.gy/R3' },
    'rule_86': { keywords: ["*cuál es la pagina del os10*","*zosepcar*"], response: '*🤖 Está es la página del os10*\nhttps://www.zosepcar.cl/OS10.php' },
    'rule_87': { keywords: ["reglamento"], response: '*Reglamento 11*\nhttps://drive.google.com/file/d/0By_MScWZi3fRLVlIN2dJby1hekU/view?usp=drivesdk&resourcekey=0-3OB6XmcfWnIf9KZU1J65Yw' },
    'rule_88': { keywords: ["ciberseguridad"], response: '🤖 🧙🏻‍♂️ *\"CIBERSEGURIDAD\"*\n➢ *1.-¿Que Hacer?*:\nhttps://www.dal5.short.gy/SIyeI3\n➢ *2.,-¿Cómo notificar?*:\nhttps://www.dal5.short.gy/GFxMgX' },
    'rule_89': { keywords: ["menu os10", "menú O.S.10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ ESCRIBA El QUE NECESITE:\n➢ *Bots:* recibirá un listado de bots con Inteligencia Avanzada.\n➢ *Componentes:* Obtendrá las guías\n➢ *Manuales:* Se desplega menu\n➢ *Leyes:* Se desplega menu\n➢ *Editable:* Documentos en Word.\n➢ *Directiva:* Requisitos presentar\n➢ *Valores:* Cursos y planes.\n➢ *Independiente:* Requisitos Cred.\n➢ *Menu credencial:* Menú credenciales\n➢ *Nueva Ley:* Nueva ley seguridad privada y reglamento.' },
    'rule_90': { keywords: ["*directiva*","*directiva de funcionamiento*","*directivas*","directiva de funcionamiento instalacion","funcionamiento","formulario directiva"], response: '🧙🏻‍♂️🤖 *PRESENTAR DIRECTIVA DE FUNCIONAMIENTO*\n(Instalación - Evento - Partidos de Fútbol Profesional)\nPagina: https://dal5.short.gy/df' },
    'rule_91': { keywords: ["mantra"], response: '*Mantra*\n\nOm: Om es la sílaba semilla que sintoniza cualquier mantra que se recita en su vibración' },
    'rule_92': { keywords: ["usuario diploma"], response: '*PAGINA DIPLOMADO* https://centropyc.carabineros.cl/acipol/login/index.php Usuario: 982083a Contraseña: Flor9820&' },
    'rule_93': { keywords: ["auditorias empresa de capacitacion","auditorias empresas de capacitacion","auditoria empresa de capacitacion","auditoria empresas de capacitacion"], response: ',👮🏼*AUDITORIAS EMPRESA CAPACITACIÓN 2024*\n\nhttps://dal5.short.gy/AuCap' },
    'rule_94': { keywords: ["*"], response: 'La siguiente es una conversación con un asistente de IA que usa AutoResponder.ai. El asistente es útil, creativo, inteligente y muy amigable.' },
    'rule_95': { keywords: ["*independiente*","*credencial independiente*","*credencial independientes*"], response: '🤖 *INDEPENDIENTE 1ER. SEM. 2025* \n*Descargar Guía:* \nhttps://os10.short.gy/I25' },
    'rule_96': { keywords: ["medidas"], response: '🤖🧙🏻‍♂️ *MEDIDAS DE SEGURIDAD*\n➢ *MED.EDITABLE:* https://dal5.short.gy/M3' },
    'rule_98': { keywords: ["Valores","cuanto cuesta","cual es el valor","valor plan","valores planes","valores plan","*valor*","*cuesta*"], response: '🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2025*\n1.- CREDENCIAL\nhttps://dal5.short.gy/val\n2.- CRED. EMPRESA\nhttps://dal5.short.gy/C.emp\n3.- CURSO FORMACIÓN\nhttps://dal5.short.gy/Form\n4.- CURSO PERFECC\nhttps://dal5.short.gy/BjzkHI\n5.- VALOR PLAN\nhttps://os10.short.gy/Pl4n' },
    'rule_102': { keywords: ["no hay sistema"], response: '🤖 *NO HAY SISTEMA CENTRAL ACTUALMENTE*\nLa resolución 3632 del 30 de Noviembre de 2023 establece que actualmente no existe un sistema central de registro.' },
    'rule_103': { keywords: ["infraccion","infracciones"], response: '🤖 *INFRACCIONES TRANSITO*\nhttps://bit.ly/3HFKLaH\nhttps://bit.ly/3ilvbrN\nhttps://bit.ly/3ZcOzb9' },
    'rule_104': { keywords: ["infraccion os10"], response: '🤖 *INFRACCIONES OS10*\nSegún decreto 867 y sus modificaciones' },
    'rule_105': { keywords: ["infracción alcoholes"], response: '🤖 *INFRACCIONES ALCOHOLES*\nLey 19.925 sobre expendio y consumo de bebidas alcohólicas' },
    'rule_106': { keywords: ["estadio"], response: '🤖 *ESTADIO*\nRequisitos especiales para eventos deportivos según circular 28' },
    'rule_107': { keywords: ["bots"], response: '🤖 *LISTADO DE BOTS INTELIGENCIA AVANZADA*\n- Bot Seguridad Privada\n- Bot Ciberseguridad\n- Bot Tránsito\n- Bot Ley Karyn' },
    'rule_108': { keywords: ["dgac"], response: '🤖 *DGAC SEGURIDAD PRIVADA*\nDirección General de Aeronáutica Civil - Requisitos especiales' },
    'rule_109': { keywords: ["decreto 32"], response: '*DECRETO 32/2024*\nModifica decreto 261\nhttps://www.zosepcar.cl/content/OS10/Resol_32.pdf' },
    'rule_110': { keywords: ["*editable*","*documentos word*"], response: '🤖 *DOCUMENTOS EDITABLES EN WORD*\n✅ Estudio\n✅ Plan\n✅ Medidas\n✅ Directiva\n✅ Todos@ ' },
    'rule_111': { keywords: ["nueva ley"], response: '🤖 *NUEVA LEY SEGURIDAD PRIVADA*\nLey 21.659 del 21 de marzo de 2024\nhttps://dal5.short.gy/LeySeg' },
    'rule_112': { keywords: ["menu credencial"], response: '🤖 *MENÚ CREDENCIALES*\n- Guardia\n- Jefe Seguridad\n- Supervisor\n- Asesor\n- Independiente' },
    'rule_113': { keywords: ["vigilante privado"], response: '🤖 *VIGILANTE PRIVADO*\nSimilar a guardia de seguridad pero con funciones específicas\nhttps://www.zosepcar.cl/content/OS10/TRAM_vigilante_privado.pdf' },
    'rule_149': { keywords: ["empresas recursos humanos"], response: '🤖 *EMPRESAS DE RECURSOS HUMANOS*\nAutorización especial para intermediación laboral\nRequisitos específicos' },
    'rule_150': { keywords: ["*supermercados*","*sobre 500 uf*","*requisitos sobre 500 uf*"], response: '🤖 *REQUISITOS SOBRE 500 UF.*\n\nhttps://dal5.short.gy/S500' },
    'rule_152': { keywords: ["linkedin"], response: '🧙🏻‍♂️.*LinkedIn* \nhttps://dal5.short.gy/Lin' },
    'rule_153': { keywords: ["pdf"], response: '🤖 *PDF sh4nge 3dit0r 3d1t0r Plus*\n\n*https://dal5.short.gy/PDF2*' },
    'rule_154': { keywords: ["*facultades*","*fiscalizar vigilante*"], response: '🧙🏻‍♂️👮🏻‍♂️🏦☝️ LAS FACULTADES CONFERIDAS A CARABINEROS DE CHILE CONFORME LO SIGUIENTE PARA *VIGILANTES PRIVADOS Y ENTIDAD OBLIGADAS* SEGÚN EL ARTICULO 3 DEL DECRETO 3.607' },
    'rule_155': { keywords: ["circular","eventos"], response: '🤖 *CIRCULAR 28*\n\n*https://www.bcn.cl/leychile/navegar?i=1083082*' },
    'rule_156': { keywords: ["*cursos online*","*modalidad telematica*"], response: '🤖 *CURSOS MODALIDAD TELEMATICA* (online)\n\nhttps://www.zosepcar.cl/content/OS10/resolucion_80.pdf' },
    'rule_157': { keywords: ["*guía de perro*","*perro*"], response: '🤖 D/E 164678609OS10 del 28/07/2022.\n👮🐕🐕‍🦺 *INSTRUCCIONES SOBRE ACREDITACIÓN DE GUÍAS DE PERROS ADIESTRADOS Y CERTIFICACIÓN DE LOS EJEMPLARES*' },
    'rule_160': { keywords: ["*requisitos plan*"], response: '🤖 📘 *REQUISITOS PLAN DE SEGURIDAD*\nhttps://dal5.short.gy/RPl4n' },
    'rule_161': { keywords: ["*como presentar una ddff*","*presentar directiva*","*presentar una directiva de funcionamiento*","*presentar ddff*","*presentar dd.ff.*"], response: '🤖👉🏼 *COMO SE DEBE PRESENTAR UNA DIRECTIVA DE FUNCIONAMIENTO EN PDF*\nNota- Hipervínculos en el pdf\nhttps://dal5.short.gy/PdDdff' },
    'rule_162': { keywords: ["*por qué no puede en la vía*","*guardia en la via publica*"], response: '☝🏼👮🏻‍♂️🚦\n*EL GUARDIA DE SEGURIDAD SOLO DEBE REALIZAR SUS LABORES DENTRO DE UN RECINTO O ÁREA DELIMITADA.*' },
    'rule_163': { keywords: ["tiempo"], response: '😃👉🏼*TIEMPO*\n*Windy*\nhttps://www.windy.com\n*Meteored*\nhttps://www.meteored.cl/mapas-meteorologicos/' },
    'rule_164': { keywords: ["radios"], response: '*RADIOS LA SERENA*\nhttps://onlineradiobox.com/cl/La_Serena' },
    'rule_165': { keywords: ["grupos"], response: 'Grupo trabajos\nhttps://dal5.short.gy/Grup' },
    'rule_166': { keywords: ["*manual cs55*"], response: '🤖👽👉🏼🚙 MANUAL CS55 2021\n\nhttps://drive.google.com/file/d/1NrPRmy9ag2pLtd2E5OX0sHfI-x9rCblo/view?usp=drivesdk' },
    'rule_167': { keywords: ["*crear imagen*","*ia imagen*","*imagen ia*"], response: '👽🤖👌🏼*IA CREA IMAGEN Y VIDEO*\nhttps://huggingface.co/spaces' },
    'rule_168': { keywords: ["criptografia"], response: 'Estás invitado a una reunión de Teams.\n\nClases de Criptografía\n\nhttps://teams.microsoft.com/l/meetup-join' },
    'rule_169': { keywords: ["diplomado"], response: '🤖👉🏼 *DIPLOMADO*\n\nhttps://dal5.short.gy/Diplo' },
    'rule_170': { keywords: ["*ley de control de armas*","*armas*"], response: '🤖👉🏼LEY DE CONTROL DE ARMAS\n\nhttps://www.bcn.cl/leychile/navegar?i=29291&f=1972-10-21' },
    'rule_172': { keywords: ["209"], response: '🤖 *REGLAMENTO LEY DE SEGURIDAD PRIVADA* https://dal5.short.gy/Regl' },
    'rule_173': { keywords: ["auditorias","instructivo auditorias","auditoría"], response: '👮🏼☝🏼 *INSTRUCTIVO AUDITORIAS D/E 142623956*\n1.- Empresas de RR.HH.\n2.- Empresas de TT.VV.\n3.- Empresas de Capacitación' },
    'rule_174': { keywords: ["binance","recibir criptomonedas"], response: '🤖🪙💰🪙👉🏼 💸*RECIBIR CRIPTO EN BINANCE*\n*Recibir:*\n 0x78b349586f9de0ad692549b20e0efba58df1ff79' },
    'rule_175': { keywords: ["partido","futbol","copa américa","donde ver futbol"], response: '👽👉🏼 *VER FUTBOL ONLINE O DESCARGAR APP*\n\n👉🏼 *VER ONLINE*: LINK : https://futbollibrehd.cl/' },
    'rule_177': { keywords: ["doodieman"], response: '*Doodieman*\nhttps://www.1001juegos.com/juego/doodieman-voodoo' },
    'rule_178': { keywords: ["usek","anexos"], response: '🤖 *ANEXOS* \nLink: https://anexos.usek.cl/\nPdf: https://www.dal5.short.gy/Kj2AUu' },
    'rule_179': { keywords: ["calendario clases"], response: '🤖👮🏼👉🏼 *CALENDARIO CLASES* https://www.dal5.short.gy/ie1DxQ' },
    'rule_180': { keywords: ["prompts","pront","prom","pron","promt","promtsp","promstp"], response: '🤖👉🏼 *PROMPTS*\n\nCrear App\nhttps://dal5.short.gy/CreaApp' },
    'rule_181': { keywords: ["estudios"], response: '🤖👉🏼 *TECNICO DE NIVEL SUPERIOR EN TRABAJO SOCIAL*\nhttps://www.dal5.short.gy/SU' },
    'rule_182': { keywords: ["currículum"], response: '🤖👍🏼 *CURRÍCULUM VITAE* \nhttps://dal5.short.gy/CV' },
    'rule_185': { keywords: ["foto ia","ia foto","agrandar foto","ampliar foto","herramientas de inteligencia artificial","inteligencia","cambiar fondo"], response: '🤖☝🏼 *HERREMIENTAS DE INTELIGENCIA ARTIFICIAL*\n\n1.- *Laboratorio de Google IA*\nlabs.google/fx/es' },
    'rule_186': { keywords: ["diplomados"], response: '*DANIEL FIGUEROA* \n*INGENIERO EN INFORMÁTICA*\nhttps://drive.google.com/file/d/1k2oiHE9VkBsU8MdFsRo6uFYYnDh-tEs1/view?usp=drivesdk' },
    'rule_188': { keywords: ["trabajo"], response: '*Seguridad IOT*\nTRABAJO 3 INDIVIDUAL \n\nhttps://docs.google.com/document/d/1gDgNpIwkqmGK2GTJ_sTP1O1Dx1ZDnmR9/edit' },
    'rule_192': { keywords: ["que significa atm","significado atm"], response: '🤖 ATM (Automated Teller Machine)' },
    'rule_193': { keywords: ["tejidos","tejido","tejer","tejidos luna"], response: '🤖 *TEJIDOS LUNA*👇🏽🦴🐕\n\nhttps://dal5.short.gy/Tej3' },
    'rule_194': { keywords: ["14 puntos cajeros"], response: '🤖 *14 PUNTOS CAJEROS*\n\nMi XXXXXXX se informa el siguiente procedimiento' },
    'rule_195': { keywords: ["*¿los días de votación serán feriados?"], response: '*¿Los días de votación serán feriados?*\n\nSí. El sábado 26 de octubre será feriado normal, por lo que el comercio podrá abrir. Mientras que el domingo 27 de octubre será feriado irrenunciable.' },
    'rule_196': { keywords: ["bots","tienes un bot","hay un bot","tiene algún bot de seguridad privada","algun bot","tiene un bot","dame el bot","bot de seguridad privada","bot"], response: '🤖 *Bots con IA avanzada:*\n\n➢ *Bot Seguridad Privada*\nhttps://dal5.short.gy/SePriv' },
    'rule_197': { keywords: ["colores"], response: '🤖 *Colores votaciones* \nhttps://drive.google.com/file/d/1qAQoR_DRaXl8Cgzfueyx2ggh2LL_caBh/view?usp=drivesdk' },
    'rule_198': { keywords: ["*para tramitar una credencial de guardia*","*credencial de guardia*"], response: '👮🏽‍♂️👉🏼 Existen dos tipos de credenciales para guardia de seguridad, escribe lo que está con negrillas del que necesitas:\n*1. Independiente:* (solo eventos)\n*2. Credencial Empresa* (instalación empresa)' },
    'rule_199': { keywords: ["*bot*","*bot seguridad privada*"], response: '🤖👮🏽‍♂️👉🏼 *Bots con IA avanzada Chat Gpt 4o:*\n\n🤖 *Bot de Seguridad Privada* https://dal5.short.gy/SePriv' },
    'rule_201': { keywords: ["y tiene los valores","y tiene los valores del plan","credencial empresa","los valores","valores credencial","valor","cual es el valor","cuanto cuesta","plan"], response: 'Si, claro: 🤖🧙🏻‍♂️ *AQUI ESTAN LOS VALORES 2DO. SEMESTRE 2024*\n\n1.- *CREDENCIAL*\nhttps://bit.ly/3vmqEvz' },
    'rule_202': { keywords: ["registro ingreso biometrico"], response: '🤖👉🏼 *Registro ingreso Biométrico*\n\nhttps://dal5.short.gy/Reg' },
    'rule_203': { keywords: ["sacar cantidad de guardias por evento","guardia por evento","cantidad de guardias","cuantos guardias","guardias por evento"], response: '🤖👮🏼‍♂️👉🏼 *CANTIDAD DE GUARDIA POR EVENTO:* \n \n*Link:*\n*https://dal5.short.gy/GGSS*' },
    'rule_204': { keywords: ["hora dipreca","para sacar hora en dipreca","sacar hora dipreca","dipreca"], response: 'Gracias por contactarse con DIPRECA. \n*Informamos que desde el 13 de Junio este whatsapp dejó de funcionar*' },
    'rule_206': { keywords: ["os11","arma","inscripción de un arma","trámites os11","tramites os11"], response: '🧙🏼‍♂️🤖👉🏼 *Portal de consultas de armas*\n https://www.portalarmaschile.gob.cl/' },
    'rule_207': { keywords: ["certificado","certificados","como sacar certificado os10","cerofilas","cero filas","0 filas"], response: '👮🏽‍♂️ 👉🏼 *TRÁMITES CEROFILAS*:\n\nLink: https://dal5.short.gy/CFil' },
    'rule_208': { keywords: ["dpi"], response: '*LOS DPI AFECTAN ÚNICAMENTE LA RESOLUCIÓN DE IMPRESIÓN, NO EL TAMAÑO FÍSICO DE LA IMAGEN EN PÍXELES.*' },
    'rule_209': { keywords: ["7 puntos"], response: '*1. TIPIFICACIÓN:* ROBO VEHÍCULO AFECTA CONSEJAL COMUNA VITACURA.' },
    'rule_213': { keywords: ["fotografía","fotito"], response: '*1.- FOTOSTORE:* Calle Prat 629, La Serena.\nUbicación: *https://dal5.short.gy/629*' },
    'rule_215': { keywords: ["sacar hora dental","dentista","sacar hora"], response: '🤖 *SACAR HORA DENTISTA CARABINEROS LA SERENA O SANTIAGO.*\n*https://www.hoscar.cl/v2.0/horasdentales/login.php*' },
    'rule_216': { keywords: ["valor infracciones","valores infracciones","cuanto cuesta una infracción de seguridad privada"], response: ',🤖☝🏼 Dado que las multas establecidas en la Ley 21.659 se expresan en UTM' },
    'rule_220': { keywords: ["pagina"], response: '🧙🏼‍♂️ *PAGINA CIBERSEGURIDAD*\n*https://dal5.short.gy/C25*' },
    'rule_222': { keywords: ["bot telegram"], response: '*Bots telegram*\n1.- Borra fondo: AI_Background_Remover_Bot' },
    'rule_223': { keywords: ["cédula","cédula de identidad"], response: '*CÉDULA DE IDENTIDAD 2025*\nhttps://dal5.short.gy/Ce' },
    'rule_224': { keywords: ["ia","ai","avanzada","ias","ias avanzada","ia avanzada","ai avanzada"], response: ',🧙🏼‍♂️ *IA AVANZADA 2025*\n1.- https://chat.qwenlm.ai/' },
    'rule_227': { keywords: ["preventiva"], response: '🤖 *PREVENTIVA*\nhttp://www.medpreventiva.dipreca.cl:8098/autoconsulta/ingresarut.asp' },
    'rule_238': { keywords: ["pensiones","calculo pensión","jubilación","retiro","pensión","retirarme","retirarse"], response: '🧙🏼‍♂️ *Calculo Pensiones*\ndal5.short.gy/Pens' },
    'rule_239': { keywords: ["directiva","directiva de funcionamiento","directivas","directiva de funcionamiento instalacion","funcionamiento","formulario directiva"], response: '🤖 *PAGINA PARA:*\n*1.- PRESENTAR DIRECTIVA.*\n*2.- CREDENCIAL EMPRESA.*\n*3.- CRED. INDEPENDIENTE.*' },
    'rule_240': { keywords: ["credencial empresa","credencial empleador","cred empresa","*credencial empresas*","credenciales empresas","credencial","*credencial independiente*","*independiente*","credencial independientes","*tramitar credencial*"], response: '*TRAMITAR CREDENCIALES* 🤖👉🏼 https://directiva.netlify.app/credenciales \naquí salen los pasos a seguir para tramitar una credencial.' },
    'rule_243': { keywords: ["realizaron examen","los que realizaron el examen","enviar el resultado examen","enviar resultado","enviar resultados"], response: '🤖 👮🏼‍♂️\n1.- Los que están con rojo sacaron bajo el 60% y están reprobados' },
    'rule_244': { keywords: ["usuario portal","portal usuario","portal de usuario","usuario"], response: '🧙🏼‍♂️\nhttps://dal5.short.gy/U53' },
    'rule_245': { keywords: ["presentación con ia","presentaciónes"], response: '🤖🧙🏼‍♂️ \n\n1.- https://gamma.app/' },
    'rule_246': { keywords: ["plano oficina"], response: '🤖 Plano Oficina \nhttps://os10.short.gy/Pl40' },
    'rule_247': { keywords: ["requerimiento de desarrollo web","requerimiento página","página","requisitos página","crear página web","desarrollo web"], response: '🤖🧙🏼‍♂️ 💡🥇 *Para saber que es lo que necesita, responder lo siguiente*\n\n*1.- Requerimiento de desarrollo*\nhttps://dal5.short.gy/D3sa' },
    'rule_248': { keywords: ["servidor","servidores","alojar página","alojar"], response: '🧙🏼‍♂️*Alojar páginas web*\n1.- https://app.netlify.com/\n2.- https://github.com/' },
    'rule_252': { keywords: ["requisitos","requisito","requisitos plan","requisitos medidas","requisitos directiva"], response: '🤖🧙🏼‍♂️ *Requisitos Plan, Medidas y Directiva*\nhttps://os10coquimbo.netlify.app' },
    'rule_253': { keywords: ["valores infracciones ciberseguridad","infracciones de ciberseguridad","infracciones ciberseguridad"], response: '🤖🧙🏼‍♂️*VALORES INFRACCIONES DE CIBERSEGURIDAD*\nhttps://dal5.short.gy/Vc' },
    'rule_254': { keywords: ["*examen os10*","examen"], response: '🧙🏼‍♂️🤖👮🏼‍♂️ *Practicar examen*\nhttps://dal5.short.gy/SeSec' },
    'rule_255': { keywords: ["*examen moto*","examen para moto","moto"], response: '🤖🧙🏼‍♂️ *Examen moto*\nhttps://dal5.short.gy/ExMoto' },
    'rule_257': { keywords: ["gestudio","estudiar","gestor académico","gestor"], response: '🤖🧙🏼‍♂️✅\n\nhttps://gestudios.netlify.app/' },
    'rule_258': { keywords: ["modelos de solicitud","modelo","punto 6","punto 7"], response: '🤖🧙🏼‍♂️✅\n\nhttps://www.zosepcar.cl/OS10.php#Modelo' },
    //'rule_259': { keywords: ["*Hola*", "como estamos","que tal","como va", "de que ta las das", ], response: 'Hola que tal, cuenteme en que lo puedo ayudar' },
    'rule_260': { keywords: ["*como estas*"], response: 'Bien aqui trabajando para variar y tu ¿como estas?' },
    // Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada

// Reglas conversacionales para el chatbot OS10 Coquimbo - Interacciones iniciales y análisis inteligente
// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada

'rule_261': { keywords: ["hola","saludos"], response: '🤖👮🏻‍♂️ ¡Hola! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261a': { keywords: ["buenos días","buen día"], response: '🤖👮🏻‍♂️ ¡Buenos días! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261b': { keywords: ["buenas tardes","buena tarde"], response: '🤖👮🏻‍♂️ ¡Buenas tardes! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_261c': { keywords: ["buenas noches","buena noche"], response: '🤖👮🏻‍♂️ ¡Buenas noches! Bienvenido/a a la Oficina de Seguridad Privada OS10 Coquimbo. Estoy aquí para ayudarle con sus consultas. ¿En qué puedo asistirle hoy?' },
'rule_262': { keywords: ["gracias","muchas gracias","te agradezco","agradezco"], response: '🤖😊 ¡Es un placer ayudarle! Para eso estamos aquí en OS10 Coquimbo. Si tiene alguna otra consulta, no dude en escribirme. ¡Que tenga un excelente día!' },
'rule_263': { keywords: ["chao","adiós","nos vemos","hasta luego","me voy"], response: '🤖👋 ¡Hasta luego! Gracias por contactar a OS10 Coquimbo. Recuerde que estamos de lunes a jueves de 09:00 a 13:00 horas en Cienfuegos 180, La Serena. ¡Que tenga un buen día!' },
'rule_264': { keywords: ["ayuda","no entiendo","estoy perdido","no sé qué hacer"], response: '🤖🆘 ¡Tranquilo/a! Entiendo que puede ser confuso. Estoy aquí para guiarle paso a paso. Por favor, cuénteme específicamente qué necesita y con mucho gusto le ayudo a encontrar la solución. ¿Se trata de una credencial, curso, o algún trámite específico?' },
'rule_265': { keywords: ["información","qué hacen","qué es os10","oficina seguridad"], response: '🤖🏢 OS10 Coquimbo es la Oficina de Seguridad Privada que regula y supervisa todo lo relacionado con seguridad privada en la región. Nos encargamos de credenciales, cursos, empresas de seguridad, y cumplimiento normativo. ¿En qué área específica necesita información?' },
'rule_266': { keywords: ["problema","error","no funciona","dificultad"], response: '🤖⚠️ Lamento escuchar que está teniendo dificultades. Por favor, descríbame detalladamente cuál es el problema y haré todo lo posible por ayudarle a solucionarlo. Si es algo técnico, también puede contactarnos directamente al 512651024.' },
'rule_267': { keywords: ["urgente","apurado","rápido","prisa"], response: '🤖🚨 Entiendo que su consulta es urgente. Permítame ayudarle de la manera más eficiente posible. Por favor, indíqueme exactamente qué necesita y le proporcionaré la información de forma directa y clara.' },
'rule_268': { keywords: ["confundido","no encuentro","perdido","desorientado"], response: '🤖🧭 ¡No se preocupe! Es normal sentirse un poco desorientado con tantos procedimientos. Estoy aquí para guiarle correctamente. Cuénteme qué está buscando y le ayudo a encontrar el camino correcto paso a paso.' },
'rule_269': { keywords: ["primera vez","soy nuevo","no conozco","principiante"], response: '🤖🌟 ¡Bienvenido/a al mundo de la seguridad privada! Es un gusto ayudar a personas que recién comienzan. No se preocupe, todos empezamos desde cero. Cuénteme qué le interesa y le explico todo desde el principio de manera sencilla.' },
'rule_270': { keywords: ["recomendación","qué me recomienda","consejo","sugerencia"], response: '🤖💡 ¡Excelente pregunta! Para darle la mejor recomendación, necesito conocer un poco más sobre su situación. ¿Busca trabajar en seguridad privada, tiene una empresa, o necesita contratar servicios? Con esa información podré orientarle perfectamente.' },
'rule_271': { keywords: ["no sé","no estoy seguro","duda","indeciso"], response: '🤖🤔 ¡Perfecto! Las dudas son normales y es mejor aclararlas antes de proceder. No hay problema en no estar seguro, para eso estoy aquí. Cuénteme qué opciones está considerando y juntos encontraremos la mejor alternativa para usted.' },
'rule_272': { keywords: ["complicado","difícil","enredado","complejo"], response: '🤖⚡ ¡Entiendo perfectamente! Los procedimientos pueden parecer complicados al principio, pero no se preocupe. Mi trabajo es simplificar todo para usted. Vamos paso a paso y verá que no es tan difícil como parece. ¿Por dónde empezamos?' },
'rule_273': { keywords: ["reclamo","queja","molesto","disconforme","requerimiento"], response: '🤖📋 Lamento escuchar que tiene una situación que le molesta. Su satisfacción es importante para nosotros. Para formalizar su reclamo o requerimiento, por favor utilice nuestro formulario oficial: 📋 *REQUERIMIENTO:* https://dal5.short.gy/R3' },
'rule_274': { keywords: ["felicitaciones","excelente","muy bueno","genial"], response: '🤖😊 ¡Muchas gracias por sus palabras! Es muy gratificante saber que nuestro servicio le parece bueno. Seguiremos trabajando para brindarle la mejor atención. ¿En qué más puedo ayudarle hoy?' },
'rule_275': { keywords: ["bot","robot","artificial","automático"], response: '🤖🤖 ¡Así es! Soy un asistente virtual inteligente creado especialmente para ayudarle con sus consultas de seguridad privada. Aunque soy un bot, estoy programado con toda la información actualizada de OS10 Coquimbo para brindarle respuestas precisas y útiles.' },
'rule_276': { keywords: ["qué dice la ley","según la ley","ley dice","normativa"], response: '🤖📚 Permítame analizar la Nueva Ley de Seguridad Privada 21.659 y su reglamento para responder su consulta específica. Por favor, sea más específico sobre qué aspecto de la ley necesita conocer y le proporcionaré la información exacta.' },
'rule_277': { keywords: ["multa","sanción","infracción","castigo"], response: '🤖⚖️ Analizando la normativa vigente... Las sanciones están detalladas en la Ley 21.659. Para darle información precisa sobre multas, necesito saber qué tipo de infracción consulta. ¿Se refiere a empresas, guardias, o alguna situación específica?' },
'rule_278': { keywords: ["artículo","según el artículo","art","art."], response: '🤖📖 Perfecto, veo que necesita información específica de un artículo. Por favor indíqueme el número del artículo de la Ley 21.659 o del Reglamento 209 que necesita consultar, y le proporcionaré el contenido exacto y su interpretación.' },
'rule_279': { keywords: ["cambios","modificaciones","diferencias","nuevo"], response: '🤖🔄 Excelente consulta. La Nueva Ley 21.659 introduce importantes cambios. Basándome en mi análisis de la normativa, puedo explicarle las modificaciones específicas. ¿Se refiere a cambios en requisitos, procedimientos, o algún aspecto particular?' },
'rule_280': { keywords: ["obligación","deber","debe","obligatorio"], response: '🤖📋 Analizando las obligaciones según la normativa vigente... Para darle información precisa sobre deberes y obligaciones, necesito saber si consulta por empresas de seguridad, guardias, o algún actor específico del sistema.' },
'rule_281': { keywords: ["prohibido","no se puede","está prohibido","prohibición"], response: '🤖🚫 Revisando las prohibiciones establecidas en la Ley 21.659... Hay varias prohibiciones específicas según el tipo de actor. ¿Su consulta se refiere a guardias, empresas, o alguna actividad en particular?' },
'rule_282': { keywords: ["plazo","tiempo","días","vigencia"], response: '🤖⏰ Consultando los plazos establecidos en la normativa... Los plazos varían según el trámite o procedimiento. Para darle información exacta, ¿a qué tipo de plazo se refiere? ¿Credenciales, cursos, o algún procedimiento específico?' },
'rule_283': { keywords: ["requisito","condición","necesito","exigencia"], response: '🤖✅ Analizando los requisitos según la Nueva Ley de Seguridad Privada... Los requisitos varían según lo que necesite tramitar. ¿Consulta por requisitos para credenciales, empresas, cursos, o algún trámite específico?' },
'rule_284': { keywords: ["fiscalización","inspección","control","supervisión"], response: '🤖🔍 Revisando las disposiciones sobre fiscalización en la normativa... La ley establece claras facultades de fiscalización. ¿Su consulta se refiere a inspecciones a empresas, controles a guardias, o algún aspecto específico del proceso?' },
'rule_285': { keywords: ["capacitación","formación","entrenamiento","curso obligatorio"], response: '🤖🎓 Analizando los requisitos de capacitación según la Ley 21.659... La normativa establece obligaciones específicas de formación. ¿Necesita información sobre cursos obligatorios, empresas capacitadoras, o algún aspecto particular?' },

// El bot analiza las consultas y extrae respuestas de la base de conocimiento de la Nueva Ley de Seguridad Privada 2

'rule_286': { keywords: ["guardia sin curso","vigilante sin capacitación","sin formación","no tengo curso","no tiene curso","falta curso","sin curso","no hice curso","no ha hecho curso","capacitación pendiente","curso vencido","certificado vencido"], response: '🤖⚠️ Un guardia sin curso de capacitación NO puede ejercer funciones. Según Decreto 93 art. 13° y DL 3607, es OBLIGATORIO contar con curso básico de formación vigente (3 años). Sin curso = INFRACCIÓN GRAVE. Multa: 25 a 125 ingresos mínimos mensuales (primera vez), hasta 250 en reincidencia.' },
'rule_287': { keywords: ["guardia sin credencial","vigilante sin autorización","sin credencial","no tengo credencial","no tiene credencial","falta credencial","credencial vencida","sin licencia","no tengo licencia","no tiene licencia","autorización vencida","permiso vencido"], response: '🤖❌ Un guardia sin credencial vigente NO puede trabajar. Según Decreto 93 art. 93° la credencial es requisito ESENCIAL para ejercer. Sin credencial = EJERCICIO ILEGAL. Multa: 25 a 125 ingresos mínimos mensuales, duplicándose en reincidencia + posible clausura.' },
'rule_288': { keywords: ["sin directiva funcionamiento","empresa sin directiva","falta directiva","no tengo directiva","no tiene directiva","directiva vencida","sin autorización empresa","empresa no autorizada","sin resolución","no tenemos directiva"], response: '🤖📋 Una empresa NO puede operar sin Directiva de Funcionamiento aprobada. Según Decreto 93 art. 15°, es OBLIGATORIA y tiene vigencia de 3 años. Sin directiva = OPERACIÓN ILEGAL. Debe solicitarse con 15 días hábiles de anticipación. Sanción: clausura inmediata + multa.' },
'rule_288': { keywords: ["sin directiva funcionamiento","empresa sin directiva","falta directiva"], response: '🤖📋 Una empresa NO puede operar sin Directiva de Funcionamiento aprobada. Es requisito obligatorio según DL 3607 art. 2°. La autorización se otorga por Decreto del Ministerio del Interior previo informe favorable de Carabineros.' },
'rule_289': { keywords: ["guardia sin uniforme","vigilante sin uniforme","uniforme obligatorio"], response: '🤖👕 Los vigilantes DEBEN usar uniforme reglamentario según DL 3607 art. 1°. El uniforme debe ser diferente al de FF.AA. y Carabineros, y de uso exclusivo para vigilantes autorizados. No usarlo constituye infracción.' },
'rule_290': { keywords: ["vigilante sin arma","guardia desarmado","arma obligatoria"], response: '🤖🔫 Los vigilantes DEBEN portar armas según DL 3607 art. 1°. El porte y control de armas se rige por Ley 17.798. Solo pueden portar armas autorizadas y registradas según normativa vigente.' },
'rule_291': { keywords: ["empresa sin registro","compañía no autorizada","registro empresa"], response: '🤖🏢 Las empresas de seguridad DEBEN estar registradas y autorizadas. Operar sin registro constituye ejercicio ilegal de actividad regulada. Sanción: multa de 25 a 125 ingresos mínimos mensuales, más clausura.' },
'rule_292': { keywords: ["vigilante fuera recinto","guardia fuera instalaciones","límites funciones"], response: '🤖🚫 Los vigilantes SOLO pueden actuar dentro del recinto autorizado según DL 3607 art. 1°. NO pueden ejercer funciones fuera del área específica designada en su autorización.' },
'rule_293': { keywords: ["credencial vencida","vigencia credencial","renovación credencial"], response: '🤖📅 Las credenciales tienen vigencia limitada y DEBEN renovarse antes del vencimiento. Trabajar con credencial vencida equivale a no tener credencial. Renovación debe solicitarse con anticipación.' },
'rule_294': { keywords: ["curso vencido","capacitación vencida","actualización curso"], response: '🤖📚 Los cursos de capacitación tienen vigencia según Decreto 93. DEBE mantenerse capacitación actualizada. Trabajar con curso vencido constituye falta de requisito esencial para ejercer.' },
'rule_295': { keywords: ["antecedentes penales","inhabilidad","requisitos morales"], response: '🤖⚖️ Los vigilantes NO pueden tener antecedentes penales según DL 3607. Condenas por delitos simples, robos, hurtos o drogas inhabilitan para ejercer funciones de seguridad privada.' },
'rule_296': { keywords: ["menor edad guardia","vigilante menor","edad mínima"], response: '🤖🔞 Los vigilantes DEBEN ser mayores de 18 años según normativa. Menores de edad NO pueden ejercer funciones de seguridad privada bajo ninguna circunstancia.' },
'rule_297': { keywords: ["examen médico","aptitud física","certificado médico"], response: '🤖🏥 Los vigilantes DEBEN acreditar aptitud física y mental mediante examen médico según reglamento. El certificado debe estar vigente y emitido por profesional autorizado.' },
'rule_298': { keywords: ["libro registro","registro vigilantes","control personal"], response: '🤖📖 Las empresas DEBEN mantener libro de registro actualizado con datos de todos los vigilantes según Decreto 93. Debe incluir: datos personales, credenciales, capacitación y destinos.' },
'rule_299': { keywords: ["estudio seguridad","plan seguridad","medidas mínimas"], response: '🤖📊 Las entidades obligadas DEBEN presentar Estudio de Seguridad según DL 3607 art. 3°. Debe incluir: análisis de riesgos, medidas propuestas, organización del servicio y recursos necesarios.' },
'rule_300': { keywords: ["jefe seguridad","encargado seguridad","responsable interno"], response: '🤖👨‍💼 Las entidades obligadas DEBEN designar Jefe de Seguridad según Decreto 1122. Debe tener capacitación específica y conocimiento de la normativa de seguridad privada.' },
'rule_301': { keywords: ["conexión alarmas","central monitoreo","sistema alarmas"], response: '🤖📡 Las conexiones a centrales de alarmas requieren autorización según Decreto 41. Deben cumplir especificaciones técnicas y protocolos de comunicación con Carabineros.' },
'rule_302': { keywords: ["transporte valores","blindados","carga valiosa"], response: '🤖🚛 El transporte de valores se rige por Decreto 1814. Requiere: vehículos blindados, personal especializado, rutas autorizadas y medidas de seguridad específicas.' },
'rule_303': { keywords: ["vigilancia nocturna","turno noche","horario nocturno"], response: '🤖🌙 La vigilancia nocturna requiere medidas especiales según normativa. Debe considerar: iluminación adecuada, comunicaciones, rondas programadas y protocolos de emergencia.' },
'rule_304': { keywords: ["fiscalización carabineros","inspección","control autoridad"], response: '🤖👮‍♂️ Carabineros puede fiscalizar en cualquier momento según DL 3607. Las empresas y vigilantes DEBEN facilitar información, mostrar credenciales y permitir inspecciones.' },
'rule_305': { keywords: ["denuncia infracción","reportar irregularidad","violación normativa"], response: '🤖📞 Las infracciones deben denunciarse a la Prefectura de Carabineros competente. Incluya: fecha, lugar, descripción detallada y evidencias disponibles de la irregularidad observada.' },
'rule_306': { keywords: ["capacitación continua","cursos actualización","perfeccionamiento"], response: '🤖📖 Los vigilantes DEBEN mantener capacitación continua según nuevas normativas. Incluye: actualización legal, técnicas de seguridad, primeros auxilios y manejo de situaciones.' },
'rule_307': { keywords: ["seguro responsabilidad","póliza seguro","cobertura daños"], response: '🤖🛡️ Las empresas DEBEN mantener seguros de responsabilidad civil según reglamento. Debe cubrir: daños a terceros, errores profesionales y responsabilidad del personal.' },
'rule_308': { keywords: ["procedimiento emergencia","protocolo crisis","plan contingencia"], response: '🤖🚨 Las empresas DEBEN tener protocolos de emergencia definidos. Incluye: cadena de mando, comunicaciones, evacuación, primeros auxilios y coordinación con autoridades.' },
'rule_309': { keywords: ["documentación obligatoria","papeles requeridos","documentos vigentes"], response: '🤖📄 Documentación obligatoria: credencial vigente, certificado curso, carnet identidad, autorización porte armas (si aplica), certificado médico y contrato trabajo.' },
'rule_310': { keywords: ["horarios trabajo","jornada laboral","turnos vigilantes"], response: '🤖⏰ Los horarios deben cumplir Código del Trabajo. Jornada máxima, descansos obligatorios, horas extras reguladas. Turnos nocturnos tienen normativa especial de protección.' },
'rule_311': { keywords: ["equipo comunicación","radio transmisor","medios comunicación"], response: '🤖📻 Los vigilantes DEBEN contar con medios de comunicación efectivos según normativa. Equipos deben estar autorizados por SUBTEL y mantener protocolo de comunicaciones.' },
'rule_312': { keywords: ["material guerra","armas prohibidas","equipamiento restringido"], response: '🤖⛔ PROHIBIDO uso de material de guerra, armas automáticas o equipamiento militar según DL 3607. Solo armas autorizadas por normativa civil de control de armas.' },
'rule_313': { keywords: ["detención ciudadana","arrestar","facultades vigilante"], response: '🤖👮‍♂️ Los vigilantes NO tienen facultades de detención especiales. Solo pueden ejercer detención ciudadana en flagrancia según Código Procesal Penal, entregando inmediatamente a Carabineros.' },
'rule_314': { keywords: ["uso fuerza","agresión","violencia vigilante"], response: '🤖✋ El uso de fuerza debe ser: necesario, proporcional y último recurso según principios legales. PROHIBIDO uso excesivo, torturas o tratos inhumanos. Solo legítima defensa justifica fuerza.' },
'rule_315': { keywords: ["revisión personas","cacheo","registro corporal"], response: '🤖🔍 Los vigilantes NO pueden realizar registros corporales invasivos. Solo inspección visual de bultos/bolsos con consentimiento o cuando reglamento interno lo autorice expresamente.' },
'rule_316': { keywords: ["banco entidad financiera","institución bancaria","servicio financiero"], response: '🤖🏦 Bancos e instituciones financieras DEBEN contar con servicio propio de vigilancia según DL 3607 art. 3°. Además requieren organismo interno de seguridad y oficina especializada.' },
'rule_317': { keywords: ["empresa estratégica","servicio público","entidad obligada"], response: '🤖🏭 Empresas estratégicas y servicios públicos determinados DEBEN contar con vigilancia privada obligatoria según DL 3607 art. 3°. Listado se define por decreto supremo secreto.' },
'rule_318': { keywords: ["porte armas","licencia armas","autorización armamento"], response: '🤖🔫 El porte de armas requiere: licencia individual vigente, inscripción en Registro Nacional de Armas, capacitación específica y autorización del empleador según Ley 17.798.' },
'rule_319': { keywords: ["subcontratación","tercerización","empresa contratista"], response: '🤖🤝 La subcontratación de servicios de seguridad está permitida pero la empresa principal mantiene responsabilidad solidaria según normativa laboral y de seguridad privada.' },
'rule_320': { keywords: ["reclutamiento","selección personal","contratación vigilantes"], response: '🤖👥 El reclutamiento DEBE verificar: antecedentes, aptitud física/mental, capacitación previa, referencias laborales y cumplimiento de todos los requisitos legales vigentes.' },
'rule_321': { keywords: ["puedo trabajar sin curso","trabajo sin capacitación","me contratan sin curso","contrato sin formación","empiezo sin curso","inicio sin capacitación"], response: '🤖🚫 NO puedes trabajar sin curso. Es ILEGAL según Decreto 93 art. 13°. Primero debes: 1) Hacer curso básico (40 horas mínimo) 2) Aprobar examen 3) Obtener certificado 4) Solicitar credencial. Trabajar sin curso = multa para ti y tu empleador.' },
'rule_322': { keywords: ["él trabaja sin curso","ella trabaja sin curso","trabaja sin capacitación","empleado sin curso","personal sin formación","guardia nuevo sin curso"], response: '🤖⚠️ Esa persona NO puede trabajar sin curso. Según Decreto 93 art. 13° es obligatorio tener capacitación vigente. Si detectas esta situación, repórtala a Carabineros. La empresa también será sancionada por contratar personal no calificado.' },
'rule_323': { keywords: ["puedo trabajar sin credencial","trabajo sin licencia","me contratan sin credencial","empiezo sin autorización","inicio sin permiso","trabajo sin papeles"], response: '🤖❌ NO puedes trabajar sin credencial. Es ILEGAL según Decreto 93. La credencial es tu "licencia de conducir" para seguridad privada. Sin ella cometes delito. Proceso: 1) Curso aprobado 2) Solicitar credencial 3) Esperar autorización 4) Recién ahí trabajar.' },
'rule_324': { keywords: ["él trabaja sin credencial","ella trabaja sin credencial","trabaja sin licencia","guardia sin papeles","empleado sin autorización","personal sin credencial"], response: '🤖🚨 Esa persona comete INFRACCIÓN GRAVE trabajando sin credencial. Según Decreto 93, solo pueden ejercer quienes tengan autorización vigente. Denuncia inmediatamente a Carabineros. Multa para guardia Y empresa.' },
'rule_325': { keywords: ["empresa puede operar sin directiva","trabajamos sin directiva","operamos sin autorización","empresa nueva sin papeles","negocio sin permisos","compañía sin resolución"], response: '🤖🛑 NO pueden operar sin Directiva de Funcionamiento. Según Decreto 93 art. 15° es OBLIGATORIA. Vigencia: 3 años. Sin directiva = CLAUSURA INMEDIATA. Deben solicitarla 15 días hábiles antes de operar. Es delito ejercer sin autorización.' },
'rule_326': { keywords: ["esa empresa opera sin directiva","empresa sin autorización","compañía ilegal","negocio sin permisos","operan sin papeles","funcionan sin directiva"], response: '🤖📢 Esa empresa opera ILEGALMENTE sin Directiva de Funcionamiento. Según Decreto 93 art. 15°, todas las empresas de seguridad DEBEN tener autorización vigente. Denuncia inmediatamente: pueden clausurarla y multar a directivos.' },
'rule_327': { keywords: ["si no tengo curso os10", "qué pasa si no tengo curso","qué pasa si trabajo sin curso","consecuencias sin capacitación","multa por no tener curso","sanción trabajar sin formación"], response: '🤖⚖️ Consecuencias trabajar sin curso: 1) Multa personal: 25-125 ingresos mínimos 2) Multa empresa: 25-250 ingresos mínimos 3) Prohibición ejercer 4) Antecedentes laborales negativos 5) Posible denuncia penal por ejercicio ilegal de profesión.' },
'rule_328': { keywords: ["qué pasa si trabajo sin credencial","consecuencias sin licencia","multa por no tener credencial","sanción trabajar sin autorización"], response: '🤖⚖️ Consecuencias trabajar sin credencial: 1) Multa personal: 25-125 ingresos mínimos 2) Multa empresa: hasta 250 ingresos mínimos 3) Inhabilitación temporal 4) Antecedentes penales posibles 5) Clausura del servicio de seguridad.' },
'rule_329': { keywords: ["qué pasa empresa sin directiva","consecuencias operar sin autorización","multa empresa sin directiva","sanción compañía ilegal"], response: '🤖⚖️ Consecuencias empresa sin directiva: 1) Clausura INMEDIATA 2) Multa directivos: 25-250 ingresos mínimos 3) Inhabilitación directivos 4) Pérdida inversión 5) Responsabilidad civil por daños 6) Posible querella criminal por ejercicio ilegal.' },


// Reglas conversacionales para el chatbot OS10 Coquimbo solo region de Coquimbo.
    
'rule_350': { keywords: ["*donde puedo hacer el curso*","*empresa capacitadora*","*empresa de capacitacion*","punto 7"], response: '🤖🧙🏼‍♂️✅ 🧙🏻‍♂️ Estas son algunas empresas de aqui de la region:\n*EMPRESAS DE CAPACITACIÓN 2025* https://d6.short.gy/Cap'},
'rule_351': { keywords: ["*quien es tu creador*","*quien te creo*"], response: '🤖🧙🏼‍♂️✅ Mi creador es todo el equipo de Profesionales que se encuentra trabajando en la oficina de seguridad Privada OS10 Coquimbo y el\n*Ingeniero en Informática y Ciberseguridad Daniel Figueroa Chacama*' }

};

// --- API Configuration ---
// La URL ahora apunta a nuestra ruta de proxy segura definida en netlify.toml
const API_URL = '/api/gemini';

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual y funcionario de la oficina de Seguridad Privada OS10 de Carabineros en Coquimbo, Chile. Tu principal objetivo es ayudar a los usuarios con sus trámites y consultas, responde como si fueras un experto en Seguridad Privada, profesional
Tus reglas principales son:
1.  **Asume tu Rol:** Responde siempre como si fueras un miembro del equipo de la oficina OS10 Coquimbo. Usa un tono servicial y profesional, se preciso y concreto para responder, responde corto y preciso, no te explayes deja tu respuesta corta y buena.
2.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
3.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
4.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").
5.- **OS10 COQUIMBO, OFICINA DE SEGURIDAD PRIVADA OS10 COQUIMBO, OFICINA, OS10:** Es una oficina que se ecuentra en en el centro de La Serena, su direccion es Calle Cienfuegos N°180, La Serena, su fono o telefono es el siguiente: 51 2 651024 o el 51 2 651023, su correo es *os10.couimbo@carabineros.cl* - *os10coquimbo@gmail.com*
6.  **infracciones del os10:** las principales infracciones de guardia de seguridad son las siguiente: sin curso os10 art. 13 del decreto 93, sin directiva de funcionamiento art. 15 del decreto 93, sin credencial de guardia (gg.ss) art 18 del decreto 93, guardia de seguridad no puede usar armamento art. 14 decreto 93, sin uniforme reglamentario art. 8vo del decrero 867 y decreto 23/2024. 
7.- **Nueva Ley de seguridad privada:** La Nueva ley de seguridad privada entra en vigencia el 28-NOV-2025 pero por el momento no han llegado instrucciones del funcionamiento de la nueva ley de seguridad privada, se informara en forma oportuna si llega alguna información. 
Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con * o números.
8.- **Resumen detallado de la nueva ley de seguridad privada 21659 sobre seguridad privada** RESUMEN DETALLADO DE LA LEY 21659 SOBRE 
SEGURIDAD PRIVADA. 
ÍNDICE: 
RESUMEN DETALLADO DE LA LEY 21659 SOBRE SEGURIDAD PRIVADA. .......................................................... 1 
1. Introducción.................................................................................................................................................................................... 3 
• Contexto y fundamentación de la nueva ley ................................................................................. 3 
• Relación con las normativas anteriores (Decreto Ley 3607 y Ley 19303) ............. 4 
• Objetivos principales de la reforma ........................................................................................................ 5 
2. Nuevo marco institucional .............................................................................................................................................. 6 
• Órgano rector y sus competencias ......................................................................................................... 6 
• Autoridades fiscalizadoras y su rol ........................................................................................................... 8 
• Sistema de registros y sub-registros ..................................................................................................... 10 
• Transición entre el modelo anterior y el actual ............................................................................ 11 
3. Clasificación de entidades obligadas ................................................................................................................ 13 
• Criterios de clasificación por niveles de riesgo ........................................................................... 13 
• Procedimiento para declarar una entidad como obligada ........................................... 15 
• Medidas de seguridad según tipo de entidad............................................................................. 17 
• Sistema de vigilancia privada para entidades de alto riesgo ................................... 20 
4. Estudios y planes de seguridad ................................................................................................................................ 21 
• Contenido y alcance de los estudios de seguridad ............................................................... 21 
• Procedimiento de aprobación y plazos .............................................................................................. 21 
• Vigencia y renovación ....................................................................................................................................... 22 
• Implementación y seguimiento ............................................................................................................... 24 
5. Personal de seguridad privada ............................................................................................................................... 26 
• Vigilantes privados: requisitos y funciones .................................................................................... 26 
• Guardias de seguridad: nuevas regulaciones ........................................................................... 28 
• Otros componentes: jefes de seguridad, supervisores, capacitadores ............ 32 
• Formación y capacitación requerida ................................................................................................. 36 
6. Empresas de seguridad privada ........................................................................................................................... 39 


• Requisitos para la constitución y operación ................................................................................ 39 
• Empresas de transporte de valores ..................................................................................................... 43 
• Empresas de seguridad electrónica .................................................................................................... 47 
• Obligaciones específicas ................................................................................................................................ 50 
7. Elementos de seguridad y protección .............................................................................................................. 55 
• Sistemas de registro audiovisual ............................................................................................................ 55 
• Armas y elementos defensivos permitidos ................................................................................... 58 
• Requisitos técnicos y certificaciones ................................................................................................... 62 
• Sistemas de alarmas y verificación ...................................................................................................... 66 
Seguridad en eventos masivos .................................................................................................................................... 69 
• Definición y clasificación de eventos .................................................................................................. 69 
• Plan de seguridad específico ...................................................................................................................... 72 
• Autorizaciones requeridas ............................................................................................................................. 75 
• Responsabilidades de organizadores ................................................................................................ 79 
9. Régimen sancionatorio ................................................................................................................................................... 84 
• Tipificación de infracciones .......................................................................................................................... 84 
• Sanciones aplicables .......................................................................................................................................... 86 
• Procedimientos ante los Juzgados de Policía Local ............................................................. 87 
• Revocación de autorizaciones .................................................................................................................. 89 
10. Implementación y transición ................................................................................................................................... 90 
• Entrada en vigor ....................................................................................................................................................... 90 
• Período de adaptación para entidades actualmente obligadas ............................ 91 
• Validez de las autorizaciones existentes .......................................................................................... 92 
• Reglamentos complementarios .............................................................................................................. 93 
11. Conclusiones ............................................................................................................................................................................. 94 
• Principales avances respecto al régimen anterior ................................................................ 94 
• Desafíos en la implementación ................................................................................................................ 96 
• Impacto esperado en el sector de seguridad privada ..................................................... 98 

 

 

 

 

 

 


1. Introducción 
• Contexto y fundamentación de la nueva ley 
La Ley 21659 sobre Seguridad Privada representa una actualización integral y 
necesaria del marco normativo que ha regido el sector durante más de cuatro 
décadas en Chile. Esta nueva legislación surge en un contexto caracterizado 
por: 
• Obsolescencia del marco normativo anterior: El Decreto Ley 3607 de 1981 
y la Ley 19303 de 1994 fueron creados en contextos sociales, económicos 
y tecnológicos muy diferentes a los actuales, resultando inadecuados 
para regular las complejidades del sector en el siglo XXI. 
• Crecimiento exponencial del sector: En las últimas décadas, la industria 
de seguridad privada ha experimentado un crecimiento significativo, 
diversificándose en múltiples servicios y tecnologías que no estaban 
contemplados en la normativa anterior. 
• Necesidad de coordinación público-privada: La ley reconoce 
expresamente el rol "preventivo, coadyuvante y complementario de la 
seguridad pública" que cumple la seguridad privada, estableciendo un 
enfoque colaborativo en lugar de meramente regulatorio. 
• Exigencias tecnológicas contemporáneas: El desarrollo de nuevas 
tecnologías de seguridad (sistemas de alarma, videovigilancia, 
geolocalización, entre otras) requería un marco legal adaptado a estos 
avances. 
• Profesionalización del sector: La nueva normativa busca elevar los 
estándares profesionales de quienes trabajan en seguridad privada, 
mejorando la formación, capacitación y condiciones laborales. 
• Mejora en los mecanismos de control: Se busca establecer un sistema 
de supervisión más efectivo para garantizar que las actividades de 
seguridad privada se desarrollen con respeto a los derechos 
fundamentales de las personas. 
• Respuesta a nuevos escenarios de riesgo: La ley incorpora capítulos 
específicos para regular situaciones particulares como eventos masivos, 
que presentan desafíos específicos para la seguridad. 
La nueva legislación busca equilibrar la necesaria regulación del sector con la 
flexibilidad suficiente para adaptarse a los cambios tecnológicos y sociales, 
estableciendo un sistema coordinado que contribuya efectivamente a la 
seguridad pública sin sustituirla. 

 


• Relación con las normativas anteriores (Decreto Ley 3607 y Ley 19303) 
Relación con las normativas anteriores (Decreto Ley 3607 y Ley 19303) 
La Ley 21659 reemplaza completamente el marco normativo anterior, 
estableciendo una relación de sucesión y actualización respecto a sus 
predecesoras. Los aspectos más relevantes de esta relación son: 
• Derogación explícita: El artículo 115 deroga expresamente el Decreto Ley 
N° 3.607 de 1981 y la Ley N° 19.303 de 1994, así como sus reglamentos 
complementarios, poniendo fin a un régimen fragmentado y 
desactualizado. 
• Integración normativa: Mientras que antes existían distintos cuerpos 
legales para regular diferentes aspectos de la seguridad privada, la 
nueva ley integra en un único texto coherente todas las dimensiones del 
sector, desde vigilantes privados hasta eventos masivos. 
• Preservación de elementos funcionales: La nueva ley mantiene algunas 
instituciones que funcionaban adecuadamente, como los estudios de 
seguridad y el reconocimiento de entidades obligadas, pero moderniza 
sus requisitos, procedimientos y vigencia. 
• Transición gradual: Las disposiciones transitorias establecen un período 
de adaptación para las entidades actualmente obligadas bajo el 
antiguo régimen, permitiéndoles funcionar bajo la antigua normativa por 
un máximo de dos años mientras se realiza la transición al nuevo 
sistema. 
• Validez de autorizaciones vigentes: La ley reconoce la validez de las 
autorizaciones ya otorgadas bajo el régimen anterior hasta su fecha de 
vencimiento, facilitando una transición ordenada. 
• Reorganización institucional: Mientras el Decreto Ley 3607 centralizaba el 
control en Carabineros de Chile, la nueva ley establece un modelo donde 
la rectoría corresponde a la Subsecretaría de Prevención del Delito, 
manteniendo a Carabineros como autoridad fiscalizadora. 
• Actualización de requisitos: Los requisitos para vigilantes privados, 
guardias de seguridad y empresas del sector se actualizan manteniendo 
la esencia de la regulación anterior pero adaptándola a los estándares 
contemporáneos. 
• Sistematización de infracciones y sanciones: A diferencia de la normativa 
anterior, que contenía un régimen sancionatorio disperso, la nueva ley 
establece un sistema claro de infracciones (gravísimas, graves y leves) 
con sanciones proporcionales. 


Esta nueva legislación no representa una ruptura radical con la tradición 
normativa chilena en materia de seguridad privada, sino una evolución 
necesaria que preserva los elementos funcionales del régimen anterior 
mientras introduce las actualizaciones necesarias para responder a los 
desafíos contemporáneos del sector. 

 

 

• Objetivos principales de la reforma 
La Ley 21659 sobre Seguridad Privada establece una reforma integral cuyo 
propósito es modernizar la regulación del sector. Los objetivos principales de 
esta reforma son: 
1. Establecer un marco legal unificado y coherente: Integrar en un solo 
cuerpo normativo toda la regulación de seguridad privada, superando la 
fragmentación del sistema anterior que dificultaba su aplicación 
efectiva. 
2. Modernizar el sistema institucional: Redefinir los roles de las instituciones 
involucradas, estableciendo a la Subsecretaría de Prevención del Delito 
como órgano rector, con Carabineros como autoridad fiscalizadora, 
creando así una estructura institucional más eficiente. 
3. Profesionalizar el sector: Elevar los estándares profesionales mediante 
requisitos más estrictos para el personal de seguridad privada, 
mejorando los sistemas de capacitación y estableciendo obligaciones 
de formación continua. 
4. Incorporar avances tecnológicos: Regular adecuadamente las nuevas 
tecnologías de seguridad, incluyendo los sistemas de alarma, 
videovigilancia, y dispositivos electrónicos, estableciendo requisitos 
técnicos específicos. 
5. Mejorar la seguridad pública mediante la colaboración público-privada: 
Reconocer y potenciar el rol complementario de la seguridad privada 
respecto a la seguridad pública, estableciendo mecanismos de 
coordinación y colaboración efectiva. 
6. Fortalecer la protección de derechos fundamentales: Asegurar que las 
actividades de seguridad privada se desarrollen con pleno respeto a los 
derechos humanos y las libertades fundamentales, especialmente de 
personas en situación de vulnerabilidad. 
7. Adecuar las exigencias según el nivel de riesgo: Establecer un sistema de 
clasificación de entidades obligadas según su nivel de riesgo (bajo, 


medio, alto), permitiendo adaptar las medidas de seguridad a las 
necesidades específicas de cada caso. 
8. Regular la seguridad en eventos masivos: Incorporar un título específico 
sobre seguridad en eventos masivos, respondiendo a los desafíos 
particulares que presenta la protección de grandes concentraciones de 
personas. 
9. Establecer un régimen sancionatorio efectivo y proporcional: Crear un 
sistema de infracciones y sanciones claro, gradual y disuasivo, que 
favorezca el cumplimiento normativo y sancione adecuadamente las 
conductas contrarias a la ley. 
10. Implementar mecanismos de supervisión y control: Desarrollar 
instrumentos efectivos para monitorear el funcionamiento del sistema, 
incluyendo registros, inspecciones y procedimientos de denuncia. 
11. Asegurar condiciones laborales adecuadas: Proteger los derechos de los 
trabajadores del sector, exigiendo seguros de vida y estableciendo la 
obligación de que los empleadores proporcionen los elementos de 
protección necesarios. 
12. Facilitar la adaptación al nuevo régimen: Establecer disposiciones 
transitorias que permitan una implementación progresiva y ordenada 
del nuevo sistema, minimizando las disrupciones en el sector. 

 

Estos objetivos reflejan un enfoque integral que busca no solo actualizar la 
normativa, sino también transformar el sector de seguridad privada en Chile, 
elevando sus estándares y mejorando su contribución a la seguridad general. 

 

2. Nuevo marco institucional 
• Órgano rector y sus competencias 
Órgano rector y sus competencias 
La Ley 21659 establece un cambio fundamental en la estructura institucional 
del sistema de seguridad privada en Chile, designando al Ministerio encargado 
de la Seguridad Pública, a través de la Subsecretaría de Prevención del Delito, 
como el órgano rector en esta materia. Este cambio representa una transición 
desde un modelo centrado principalmente en Carabineros de Chile hacia uno 
con una dirección civil especializada. 
Designación como órgano rector 
El artículo 81 establece expresamente que: 


"Al Ministerio encargado de la Seguridad Pública, a través de la Subsecretaría 
de Prevención del Delito, le corresponderá autorizar, regular, supervigilar, 
controlar y ejercer las demás atribuciones legales en materia de seguridad 
privada. Para ello, actuará como órgano rector, y velará por que las personas 
naturales y jurídicas reguladas en esta ley cumplan su rol preventivo, 
coadyuvante y complementario de la seguridad pública." 
Competencias específicas 
El artículo 83 detalla las atribuciones de la Subsecretaría de Prevención del 
Delito, entre las que destacan: 
1. Atribuciones normativas: 
o Aplicar e interpretar administrativamente las disposiciones de la 
ley y sus reglamentos 
o Impartir instrucciones de general aplicación en materia de 
seguridad privada 
2. Atribuciones estratégicas: 
o Proponer políticas sobre seguridad privada al Ministerio 
o Actuar como órgano de consulta, análisis, comunicación y 
coordinación 
3. Atribuciones ejecutivas: 
o Determinar entidades obligadas según los criterios de riesgo 
o Aprobar o solicitar modificaciones a los estudios de seguridad 
o Otorgar, denegar, suspender y revocar autorizaciones a personas 
y empresas 
o Fijar y aprobar los contenidos de capacitación del personal 
4. Atribuciones de control: 
o Mantener un registro actualizado de entidades, personas y 
empresas del sector 
o Supervigilar las labores de las autoridades fiscalizadoras 
o Elaborar planes de fiscalización con criterios uniformes 
5. Atribuciones sancionatorias: 
o Suspender temporalmente o revocar autorizaciones 
o Ordenar la clausura temporal o definitiva de establecimientos 
Estructura orgánica 
Para implementar estas nuevas funciones, la ley en su artículo 116 crea en la 
Planta de Directivos de la Subsecretaría de Prevención del Delito: 
• Un cargo de Jefe de División grado 3° E.U.S. 
• Un incremento de doce cupos en la dotación máxima de personal 
Obligación de reserva 


El personal de la Subsecretaría que tome conocimiento de información 
reservada en el ejercicio de sus funciones debe guardar secreto, obligación 
que se mantiene hasta por cuatro años después de cesar en el cargo, bajo 
sanción según lo dispuesto en el artículo 246 del Código Penal. 
Este nuevo modelo institucional centraliza la dirección estratégica y normativa 
del sistema en un órgano civil especializado, mientras mantiene la fiscalización 
operativa en Carabineros de Chile, lo que permite aprovechar las fortalezas de 
ambas instituciones y mejorar la coherencia global del sistema. 

 

• Autoridades fiscalizadoras y su rol 
La Ley 21659 establece un sistema de fiscalización especializado para el 
sector de seguridad privada, manteniendo a Carabineros de Chile como 
principal autoridad fiscalizadora pero con importantes adaptaciones y 
especificaciones sobre su rol. Este sistema se estructura de la siguiente 
manera: 
Designación de autoridades fiscalizadoras 
El artículo 86 establece: 
"Carabineros de Chile será la autoridad fiscalizadora en materia de seguridad 
privada y estará encargada de supervisar el cumplimiento de las normas 
legales y reglamentarias en esta materia, bajo la dirección de la Subsecretaría 
de Prevención del Delito, y de acuerdo a las instrucciones generales y 
específicas que ésta imparta." 
Asimismo, se reconoce la competencia de autoridades especializadas 
en ámbitos específicos: 
"Tratándose de entidades ubicadas en recintos portuarios, aeropuertos u otros 
espacios sometidos al control de la autoridad militar, marítima o aeronáutica, 
las atribuciones que se otorgan en esta ley a Carabineros de Chile serán 
ejercidas por la autoridad institucional que corresponda." 
Esto incluye: 
• La Dirección General del Territorio Marítimo y de Marina Mercante 
(DIRECTEMAR) en recintos portuarios 
• La Dirección General de Aeronáutica Civil (DGAC) en aeropuertos 
• Las autoridades militares en sus respectivas jurisdicciones 
Funciones específicas de las autoridades fiscalizadoras 
Las principales funciones de estas autoridades incluyen: 
1. Supervisión y control: Verificar el cumplimiento de la normativa por parte 
de entidades obligadas y empresas de seguridad privada. 


2. Elaboración de informes técnicos: Emitir informes a solicitud de la 
Subsecretaría de Prevención del Delito sobre los estudios de seguridad 
presentados por las entidades obligadas (artículo 15). 
3. Inspección de establecimientos: Realizar visitas a instalaciones para 
comprobar la implementación de las medidas de seguridad aprobadas. 
4. Denuncia de infracciones: Presentar denuncias ante los juzgados de 
policía local cuando verifiquen incumplimientos a la ley (artículo 88). 
5. Notificación de actos administrativos: Realizar notificaciones personales 
de los actos administrativos dictados por el Ministerio o la Subsecretaría 
(artículo 89). 
6. Actualización de registros: Proporcionar información para el Registro de 
Seguridad Privada sobre autorizaciones, fiscalizaciones y sanciones. 
7. Certificación de capacitaciones: Participar en la evaluación de los cursos 
de capacitación de personal de seguridad privada (artículo 60). 
Relación con el órgano rector 
A diferencia del sistema anterior, las autoridades fiscalizadoras actúan 
ahora bajo la dirección de la Subsecretaría de Prevención del Delito, lo 
que implica: 
• Sujeción a instrucciones generales y específicas del órgano rector 
• Obligación de emitir informes en los plazos establecidos (artículo 87) 
• Coordinación con los planes de fiscalización elaborados por la 
Subsecretaría 
• Participación en la implementación del nuevo Registro de Seguridad 
Privada 
Colaboración con otras autoridades 
El artículo 90 especifica que las actividades fiscalizadoras en materia de 
seguridad privada no obstan a las labores de fiscalización de otros 
órganos en sus respectivos ámbitos de competencia, lo que reconoce la 
necesaria colaboración interinstitucional, especialmente con: 
• Dirección del Trabajo en materia laboral 
• Superintendencia de Electricidad y Combustibles 
• Autoridades sanitarias 
• Municipalidades 
Este nuevo diseño institucional busca equilibrar la experiencia técnica de 
Carabineros y otras autoridades especializadas con la dirección 
estratégica y normativa de la Subsecretaría de Prevención del Delito, 
creando un sistema más coherente, eficiente y adaptado a las 
necesidades actuales del sector. 


 

 

• Sistema de registros y sub-registros 
Sistema de registros y sub-registros 
La Ley 21659 establece un sistema integral de registro y control de información 
relativo a la seguridad privada, centralizando datos que anteriormente se 
encontraban dispersos en distintas instituciones. Este sistema constituye una 
pieza fundamental del nuevo marco institucional. 
Creación del Registro de Seguridad Privada 
El artículo 84 establece la creación de un Registro de Seguridad Privada a 
cargo de la Subsecretaría de Prevención del Delito, diseñado para mantener 
información actualizada y sistematizada sobre todos los componentes del 
sistema. Este registro se estructura en seis sub-registros especializados: 
1. Sub-registro de entidades obligadas: Contiene información de todas las 
entidades que deben mantener medidas de seguridad privada por 
disposición legal, especificando aquellas que cuentan con sistemas de 
vigilancia privada. 
2. Sub-registro de entidades voluntarias: Incluye a aquellas que, sin estar 
obligadas, han decidido someterse voluntariamente al régimen de 
medidas de seguridad. 
3. Sub-registro de personas naturales: Consolida la información de 
vigilantes privados, guardias de seguridad, jefes de seguridad y demás 
personal que ejerce funciones en materia de seguridad privada, 
distinguiendo según la naturaleza de sus funciones. 
4. Sub-registro de empresas de seguridad privada: Contiene datos de 
todas las empresas autorizadas para prestar servicios de seguridad 
privada, con diferenciación según el tipo de actividad que realizan 
(transporte de valores, seguridad electrónica, recursos humanos, etc.). 
5. Sub-registro de sanciones: Centraliza información sobre las sanciones 
impuestas tanto a entidades obligadas como a personas naturales y 
jurídicas del sector, constituyendo una herramienta esencial para 
identificar reincidencias. 
6. Sub-registro de eventos masivos: Específico para organizadores, 
productores y recintos habituales para eventos masivos. 
Carácter y acceso al Registro 
El segundo inciso del artículo 84 establece que: 
"El Registro será secreto y se llevará de conformidad con la Ley N° 19.628, sobre 
Protección de la Vida Privada." 


Sin embargo, se establecen excepciones específicas: 
• Las autoridades fiscalizadoras tienen acceso íntegro para el adecuado 
ejercicio de sus funciones. 
• Las delegaciones presidenciales regionales, los juzgados de policía 
local, las entidades obligadas y las personas que ejercen actividades 
de seguridad privada pueden acceder al sub-registro de sanciones, en 
los términos que establezca el reglamento. 
Protección de la información 
El sistema incorpora medidas para proteger la confidencialidad de la 
información: 
• El funcionario que difunda el contenido del Registro será sancionado 
según lo dispuesto en el inciso segundo del artículo 246 del Código 
Penal. 
• El reglamento determinará los medios específicos de resguardo de la 
información. 
Alimentación del Registro 
Para asegurar la actualización constante del Registro, la ley establece 
obligaciones específicas: 
• Los juzgados de policía local deben remitir las sentencias 
condenatorias que dicten en materia de seguridad privada dentro de 
las 48 horas siguientes a que queden ejecutoriadas (artículo 85). 
• Las autoridades fiscalizadoras deben informar sobre autorizaciones, 
fiscalizaciones y sanciones que efectúen. 
• Las entidades obligadas y empresas del sector deben informar 
periódicamente sobre su personal, contratos y actividades. 
Este sistema de registro y sub-registros representa un avance significativo en 
términos de centralización, accesibilidad y protección de la información del 
sector, facilitando tanto la labor de control de las autoridades como la 
coordinación entre los distintos actores del sistema de seguridad privada. 

 

• Transición entre el modelo anterior y el actual 
La Ley 21659 establece un proceso de transición gradual y ordenado desde el 
régimen anterior hacia el nuevo marco normativo, reconociendo la 
complejidad del cambio y la necesidad de minimizar disrupciones en el sector. 
Este proceso de transición se estructura a través de los artículos transitorios de 
la ley. 

 

Entrada en vigencia diferida 


El artículo primero transitorio establece: 
"Esta ley entrará en vigencia seis meses después de la publicación en el Diario 
Oficial del último de sus reglamentos complementarios, con excepción de lo 
dispuesto en los artículos transitorios siguientes." 
Este mecanismo permite: 
• Otorgar un tiempo prudencial para que todos los actores del sistema 
conozcan la nueva normativa 
• Asegurar que los reglamentos estén publicados antes de la aplicación 
de la ley 
• Facilitar la preparación de las instituciones públicas para asumir sus 
nuevas funciones 
Desarrollo reglamentario 
La ley encomienda al Ministerio encargado de la Seguridad Pública: 
"... dentro del plazo de un año contado desde la publicación de esta ley, deberá 
dictar el reglamento referido en esta ley además del reglamento sobre eventos 
masivos mencionado en el Título IV." 
Este plazo asegura que los reglamentos complementarios estarán 
disponibles con antelación a la entrada en vigencia de la ley. 
Transición para entidades obligadas 
El artículo segundo transitorio establece un régimen diferenciado: 
1. Entidades de alto riesgo: Las empresas de transporte de valores, 
instituciones bancarias y financieras, empresas de apoyo al giro 
bancario y establecimientos de venta de combustibles deberán 
presentar un nuevo estudio de seguridad dentro de los seis meses 
siguientes a la entrada en vigencia de la ley, incluso si tienen estudios 
vigentes bajo la normativa anterior. 
2. Otras entidades obligadas: Las demás entidades obligadas bajo el 
antiguo régimen mantendrán esa calidad por un máximo de dos años, 
período durante el cual la Subsecretaría de Prevención del Delito deberá 
evaluarlas según los nuevos criterios de riesgo. 
3. Ultraactividad normativa: Durante este período de transición, 
"mantendrán su vigencia el decreto ley N° 3.607, de 1981, la ley N° 19.303 y 
sus reglamentos complementarios exclusivamente respecto a las 
normas que regulan a estas entidades." 
Continuidad de las autorizaciones 
Para evitar disrupciones en el funcionamiento del sistema, el artículo 
tercero transitorio establece: 


"Las autorizaciones otorgadas a las personas naturales y jurídicas para ejercer 
actividades de seguridad privada y que se encuentren vigentes al momento 
de la entrada en vigencia de esta ley, se mantendrán hasta la fecha de su 
vencimiento conforme con la legislación vigente a la época de su 
otorgamiento." 
Transición en la emisión de autorizaciones 
El mismo artículo tercero transitorio establece que: 
"Las nuevas autorizaciones, de conformidad a esta ley, continuarán siendo 
emitidas por las Prefecturas de Carabineros de Chile mientras no se encuentre 
en funcionamiento la plataforma informática, administrada por la 
Subsecretaría de Prevención del Delito e interconectada con las autoridades 
fiscalizadoras para emitir las certificaciones, de acuerdo a lo dispuesto en el 
artículo 60." 
Esta plataforma deberá estar operativa en el plazo máximo de un año 
desde la entrada en vigencia de la ley. 
Creación del Registro de Seguridad Privada 
El artículo cuarto transitorio establece la obligación de crear el Registro 
en el plazo máximo de un año desde la entrada en vigencia de la ley, 
señalando además que: 
"Para ello, Carabineros de Chile deberá remitir, dentro del plazo de seis meses 
contado desde la entrada en vigencia de esta ley, por la vía más expedita 
posible, el registro actualizado de las entidades obligadas tanto por el decreto 
ley N° 3.607, de 1981, como por la ley N° 19.303, así como toda la información 
sobre las personas naturales y jurídicas que se encuentren autorizadas para 
ejercer actividades de seguridad privada." 
Este diseño de transición busca equilibrar la necesidad de implementar 
oportunamente el nuevo régimen con la importancia de garantizar la 
continuidad operativa del sistema de seguridad privada en Chile, 
estableciendo un proceso gradual que minimiza los riesgos de vacíos 
regulatorios o incertidumbre jurídica durante el cambio normativo. 

 

3. Clasificación de entidades obligadas 
• Criterios de clasificación por niveles de riesgo 
La Ley 21659 introduce un innovador sistema de clasificación de entidades 
obligadas basado en niveles de riesgo, lo que permite adaptar las exigencias 
de seguridad a las necesidades específicas de cada tipo de entidad. Este 


enfoque representa un avance significativo respecto al régimen anterior, que 
aplicaba criterios más rígidos y homogéneos. 
Base legal de la clasificación 
El artículo 8 establece la base para la clasificación: 
"El reglamento de esta ley clasificará el nivel de riesgo de las entidades 
obligadas en bajo, medio y alto." 
Esta disposición confiere al reglamento la tarea de desarrollar los detalles 
operativos del sistema, pero la propia ley establece los criterios generales que 
deberán ser considerados. 
Criterios específicos para la clasificación 
Según el mismo artículo 8, la clasificación considerará criterios como: 
1. Actividades desarrolladas: El tipo de operaciones y servicios que brinda 
la entidad. 
2. Localización del establecimiento: La ubicación geográfica y las 
características de la zona donde se encuentra. 
3. Características del entorno: El contexto urbano, social y delictual que 
rodea al establecimiento. 
4. Valor o peligrosidad de los objetos: La naturaleza de los bienes que se 
transportan, almacenan o se encuentran en su interior. 
5. Alta concurrencia de público: El volumen y las características de las 
personas que frecuentan el establecimiento. 
6. Funciones estratégicas: Si la entidad cumple funciones esenciales para 
la economía o la sociedad. 
7. Servicios de utilidad pública: Si la entidad presta servicios considerados 
esenciales para la población. 
8. Monto de transacciones y utilidades: El volumen económico de las 
operaciones que realiza. 
9. Horario de funcionamiento: Las características temporales de su 
actividad. 
10. Ocurrencia reiterada de delitos: La historia delictual previa en la entidad 
o su entorno. 
11. Otros criterios semejantes: La ley deja abierta la posibilidad de 
considerar otros factores relevantes. 
Entidades siempre obligadas 
La ley establece excepciones al sistema de clasificación, determinando que 
ciertas entidades siempre estarán obligadas a mantener medidas de 
seguridad, independientemente de evaluaciones adicionales: 


"Con todo, las empresas de venta de combustible estarán siempre obligadas 
a tener medidas de seguridad." (artículo 8, inciso final) 
Asimismo, el artículo 9 establece que determinadas entidades siempre 
deberán contar con sistemas de vigilancia privada: 
"Sin perjuicio de lo anterior, estarán siempre obligadas a mantener sistemas 
de vigilancia privada las empresas de transporte de valores, las instituciones 
bancarias y financieras de cualquier naturaleza y las empresas de apoyo al 
giro bancario que reciban o mantengan dinero en sus operaciones." 
Exenciones posibles 
La ley contempla la posibilidad de eximir de la obligación de contar con 
vigilantes privados a ciertas entidades: 
"Las entidades mencionadas en el inciso anterior que no dispongan de cajas 
receptoras y pagadoras de dinero en efectivo y valores podrán solicitar a la 
Subsecretaría de Prevención del Delito autorización para eximirse de contar 
con vigilantes privados." (artículo 9, inciso final) 
Implementación del sistema 
La clasificación efectiva de las entidades obligadas será responsabilidad de 
la Subsecretaría de Prevención del Delito: 
"Estas entidades serán declaradas por resolución exenta de la Subsecretaría 
de Prevención del Delito previo informe de la autoridad fiscalizadora y en 
consideración al nivel de riesgo que pueda generar su actividad." (artículo 7, 
inciso final) 
Este sistema de clasificación por niveles de riesgo permite una aplicación 
más inteligente y proporcional de la normativa de seguridad privada, 
adaptando las exigencias a las necesidades reales de cada entidad, 
optimizando recursos y mejorando la eficacia de las medidas 
implementadas. 

 

 

• Procedimiento para declarar una entidad como obligada 
Procedimiento para declarar una entidad como obligada 
La Ley 21659 establece un procedimiento específico para declarar a una 
entidad como obligada a implementar medidas de seguridad privada. Este 
procedimiento se caracteriza por incluir garantías para los afectados y 
mecanismos de impugnación que buscan equilibrar la seguridad con el 
respeto a los derechos de las entidades. 
Iniciación del procedimiento 
El proceso puede iniciarse de tres formas distintas: 


1. De oficio por la autoridad: La Subsecretaría de Prevención del Delito, con 
base en los criterios de riesgo establecidos en el artículo 8, puede iniciar 
el procedimiento para declarar a una entidad como obligada. 
2. A propuesta de la autoridad fiscalizadora: Según establece el artículo 10, 
tercer inciso: 
"Sin perjuicio de lo anterior, la autoridad fiscalizadora, de manera general o 
específica, podrá proponer a la Subsecretaría de Prevención del Delito que 
una o más personas jurídicas sean declaradas entidades obligadas, y 
acompañará toda la información de que disponga para el análisis 
respectivo." 
3. A solicitud del interesado: El artículo 10 permite que cualquier persona 
jurídica solicite voluntariamente ser declarada entidad obligada: 
"Toda persona jurídica podrá solicitar a la Subsecretaría de Prevención del 
Delito ser declarada entidad obligada de conformidad con lo establecido en 
los artículos anteriores." 
Evaluación y decisión 
El procedimiento continúa con la evaluación por parte de la Subsecretaría, 
que debe: 
1. Analizar el nivel de riesgo que genera la actividad de la entidad 
2. Solicitar un informe a la autoridad fiscalizadora respectiva 
3. Decidir mediante resolución exenta si la entidad debe ser declarada 
como obligada 
El artículo 7, inciso final, establece: 
"Estas entidades serán declaradas por resolución exenta de la Subsecretaría 
de Prevención del Delito previo informe de la autoridad fiscalizadora y en 
consideración al nivel de riesgo que pueda generar su actividad." 
Notificación 
Una vez dictada la resolución, debe ser notificada a la entidad afectada: 
"La Subsecretaría de Prevención del Delito requerirá a la autoridad 
fiscalizadora respectiva que notifique personalmente al propietario, 
representante legal o administrador de la entidad obligada, la resolución que 
la declara como tal, de conformidad con las normas del presente Título." 
(artículo 11, inciso primero) 
Si la persona no fuere habida en más de una oportunidad, la notificación se 
efectuará mediante carta certificada (artículo 11, inciso segundo). 
Mecanismos de impugnación 
La ley contempla dos vías principales para impugnar la resolución: 
1. Recursos administrativos: 


"Las entidades obligadas podrán interponer contra la resolución exenta que 
las designa como tales los recursos que procedan, de conformidad con la Ley 
N° 19.880, que establece Bases de los Procedimientos Administrativos que 
rigen los Actos de los Órganos de la Administración del Estado." (artículo 12, 
inciso primero) 
Esto incluye: 
o Recurso de reposición ante la misma autoridad que dictó la 
resolución 
o Recurso jerárquico ante el superior jerárquico 
o Recurso de revisión en casos calificados 
2. Reclamo de ilegalidad judicial: 
"Asimismo, procederá contra la referida resolución exenta el reclamo de 
ilegalidad ante la Corte de Apelaciones correspondiente al lugar en el que el 
acto produce sus efectos, el que podrá interponerse en el plazo de quince 
días contado desde la fecha del acto administrativo que resuelve los recursos 
administrativos o el vencimiento del plazo para interponerlos." (artículo 12, 
inciso segundo) 
El procedimiento judicial contempla plazos expeditos y la posibilidad de 
decreto de orden de no innovar: 
"La Corte podrá decretar orden de no innovar cuando sea solicitada por el 
recurrente y la ejecución del acto impugnado le produzca un daño 
irreparable al recurrente." (artículo 12, inciso cuarto) 
Este procedimiento de declaración equilibra las necesidades de seguridad 
con las garantías de debido proceso para las entidades afectadas, 
permitiendo tanto impugnaciones administrativas como judiciales, con miras 
a asegurar decisiones fundamentadas y proporcionadas al nivel de riesgo 
real que enfrenta cada entidad. 

 

• Medidas de seguridad según tipo de entidad 
La Ley 21659 establece un sistema diferenciado de medidas de seguridad 
dependiendo del tipo de entidad obligada y su nivel de riesgo. Este enfoque 
permite adaptar los requerimientos a las necesidades específicas de cada 
caso, optimizando recursos y mejorando la eficacia de las medidas 
implementadas. 
Principio de proporcionalidad por nivel de riesgo 
La ley establece una correlación entre el nivel de riesgo de la entidad y las 
medidas de seguridad que debe implementar: 


• Entidades de bajo riesgo: Generalmente requerirán medidas básicas de 
seguridad. 
• Entidades de riesgo medio: Necesitarán medidas de seguridad más 
robustas. 
• Entidades de alto riesgo: Deberán implementar las medidas más 
exigentes, que pueden incluir sistemas de vigilancia privada. 
Tipos de medidas según clasificación de entidades 
1. Entidades obligadas a mantener sistemas de vigilancia privada 
Según el artículo 9, estas incluyen: 
"Las empresas de transporte de valores, las instituciones bancarias y 
financieras de cualquier naturaleza y las empresas de apoyo al giro bancario 
que reciban o mantengan dinero en sus operaciones." 
También se incluirán aquellas otras entidades clasificadas de alto riesgo por la 
Subsecretaría de Prevención del Delito. 
Las medidas obligatorias para estas entidades incluyen: 
• Sistema de vigilancia privada completo: Según el artículo 22, éste estará 
integrado por: 
"Un organismo de seguridad interno, por los recursos tecnológicos y materiales 
y por el estudio de seguridad debidamente autorizado por la Subsecretaría de 
Prevención del Delito." 
• Estructura organizativa específica: Que debe incluir: 
o Jefe de seguridad 
o Encargado de seguridad 
o Encargados de armas 
o Vigilantes privados 
o Guardias de seguridad de apoyo (en caso necesario) 
• Medidas de seguridad específicas para bancos: El artículo 31 establece 
que: 
"Las instituciones bancarias y financieras de cualquier naturaleza y las 
empresas de apoyo al giro bancario que reciban o mantengan dineros en sus 
operaciones, en las áreas de cajas y de espera de atención, deberán contar, 
acorde con la disposición y el diseño de cada sucursal, con las medidas de 
seguridad señaladas en el reglamento de la presente ley." 
2. Entidades obligadas por su nivel de riesgo 
Para estas entidades, la ley establece en su artículo 16 que: 
"Las entidades obligadas deberán informar en su propuesta de estudio de 
seguridad las medidas de seguridad precisas y concretas que se 
implementarán en el recinto o área donde se encuentra emplazada, tales 


como el uso de recursos tecnológicos, la contratación de guardias de 
seguridad, entre otras." 
Las medidas pueden incluir: 
• Personal de seguridad: Guardias de seguridad, porteros, nocheros, 
rondines u otros de similar carácter. 
• Recursos tecnológicos: Sistemas de alarma, circuitos cerrados de 
televisión, controles de acceso, entre otros. 
• Elementos físicos de seguridad: Barreras, cerraduras especiales, cajas de 
seguridad, etc. 
• Procedimientos operativos: Protocolos de actuación ante emergencias o 
incidentes de seguridad. 
3. Establecimientos de venta de combustible 
El artículo 8, inciso segundo, establece explícitamente que: 
"Las empresas de venta de combustible estarán siempre obligadas a tener 
medidas de seguridad." 
Las medidas específicas para estos establecimientos serán determinadas 
según cada caso por la Subsecretaría de Prevención del Delito, dependiendo 
de sus características particulares. 
Recursos tecnológicos y materiales 
El artículo 32 de la ley establece que las características de los recursos 
tecnológicos o materiales serán determinadas en el reglamento, el que 
regulará, al menos: 
1. Características y condiciones del sistema de alarmas de asalto 
2. Requisitos de las cajas receptoras y pagadoras de dinero 
3. Sistemas de filmación, su resolución y tiempo de resguardo 
4. Sistema de comunicaciones para el transporte de valores 
5. Implementación de recursos tecnológicos según el tipo de actividad 
Adaptabilidad de las medidas 
Un aspecto destacable de la nueva ley es la flexibilidad para adaptar las 
medidas: 
• Las entidades pueden proponer las medidas específicas que consideren 
adecuadas en su estudio de seguridad 
• La Subsecretaría puede aprobar, modificar o rechazar estas propuestas 
• El sistema permite actualizaciones y ajustes según cambien las 
condiciones de riesgo 
Esta estructura diferenciada según el tipo de entidad y su nivel de riesgo 
representa una evolución significativa respecto al régimen anterior, 


permitiendo una optimización de recursos y una mayor efectividad de las 
medidas implementadas. 

 

• Sistema de vigilancia privada para entidades de alto riesgo 

 

Según la Ley 21.659, las entidades cuya actividad genere un mayor nivel de 
riesgo para la seguridad pública deben incorporar un sistema de vigilancia 
privada dentro de sus medidas de seguridad. La Subsecretaría de Prevención 
del Delito determinará si una entidad debe implementar este sistema al emitir 
la resolución correspondiente.    
Además de lo anterior, siempre deben mantener sistemas de vigilancia privada 
las empresas de transporte de valores, las instituciones bancarias y financieras 
de cualquier tipo, y las empresas de apoyo al giro bancario que reciban o 
manejen dinero en sus operaciones.    
Sin embargo, las entidades mencionadas en el inciso anterior que no tengan 
cajas receptoras y pagadoras de dinero en efectivo y valores pueden solicitar 
a la Subsecretaría de Prevención del Delito que se les permita no contar con 
vigilantes privados. Si se acepta la solicitud, los estudios de seguridad de estas 
entidades no necesitarán incluir la dotación de vigilantes privados, pero la 
Subsecretaría de Prevención del Delito puede sugerir otros medios de 
seguridad alternativos, dependiendo del nivel de riesgo de la entidad.    

 

 

 

 

 

 

 

 

 

 

 

 

 


4. Estudios y planes de seguridad 
• Contenido y alcance de los estudios de seguridad 
Según la Ley 21.659, las entidades obligadas deben tener un estudio de 
seguridad vigente y autorizado por la Subsecretaría de Prevención del Delito 
para poder operar.    
El reglamento de la ley determinará la forma, características y contenidos 
mínimos de este estudio, incluyendo los requisitos específicos para entidades 
que deben contar con un sistema de vigilancia privada.    
En general, el estudio de seguridad debe detallar las medidas de seguridad 
precisas y concretas que se implementarán en el área de la entidad, como el 
uso de tecnología o la contratación de guardias de seguridad. 
• Procedimiento de aprobación y plazos 
Procedimiento de aprobación y plazos 
El procedimiento para la aprobación de los estudios de seguridad se regula 
detalladamente en los artículos 13 y 15 de la Ley 21659: 
1. Presentación inicial: La entidad obligada dispone de un plazo de sesenta 
días hábiles para elaborar y presentar su propuesta de estudio de 
seguridad ante la Subsecretaría de Prevención del Delito, contado desde 
la notificación de la resolución que la declara como entidad obligada o 
desde el rechazo de los recursos presentados, según corresponda. En 
esta etapa, la entidad puede contratar servicios de asesoría de 
empresas de seguridad autorizadas conforme a la ley. 
2. Informe técnico: Recibido el estudio de seguridad, la Subsecretaría de 
Prevención del Delito solicita a la autoridad fiscalizadora un informe 
técnico sobre éste para que manifieste su opinión. Este informe debe ser 
remitido en un plazo de diez días, prorrogable hasta por cinco días 
adicionales. 
3. Resolución: Una vez recibido el informe técnico, la Subsecretaría debe 
aprobar el estudio o disponer las modificaciones que correspondan, en 
un solo acto, dentro del plazo de treinta días, mediante resolución 
fundada, y notificar a la respectiva entidad. 
4. Aprobación tácita: El artículo 15, inciso tercero, establece una novedosa 
figura de silencio administrativo positivo: "Con todo, transcurrido un plazo 
de sesenta días sin que dicha Subsecretaría se pronuncie, se entenderá 


aprobado el estudio de seguridad en los términos propuestos por la 
entidad obligada." 
5. Modificaciones: En caso de que la Subsecretaría disponga 
modificaciones, la entidad obligada deberá realizarlas dentro de un 
plazo de diez días, que puede ser prorrogado por el mismo período previa 
solicitud de la entidad interesada. 
6. Impugnación: Contra la resolución que dispone modificaciones al 
estudio de seguridad propuesto, proceden los recursos de reposición y 
jerárquico, en la forma prevista por la ley N° 19.880. 
7. Rechazo y nueva presentación: Si la entidad no realiza las modificaciones 
requeridas, o si éstas no satisfacen lo solicitado por la Subsecretaría, se 
rechazará la propuesta, debiendo la entidad presentar una nueva 
propuesta que cumpla con el procedimiento y plazos establecidos. 
Este procedimiento busca equilibrar la rigurosidad técnica con la eficiencia 
administrativa, estableciendo plazos definidos para cada etapa y mecanismos 
para evitar dilaciones injustificadas, como la aprobación tácita por silencio 
administrativo. 
Vigencia y renovación 
La Ley 21659 establece un régimen claro sobre la vigencia y renovación de los 
estudios de seguridad, diferenciando según el tipo de entidad: 

 

• Vigencia y renovación 
La Ley 21659 establece un régimen claro sobre la vigencia y renovación de los 
estudios de seguridad, diferenciando según el tipo de entidad: 
1. Período general de vigencia: El artículo 17 de la ley establece que "la 
vigencia del estudio de seguridad será de cuatro años", lo que representa 
una extensión significativa respecto al régimen anterior, que 
contemplaba plazos más breves. 
2. Entidades con sistema de vigilancia privada: Para aquellas entidades 
que dentro de sus medidas contemplen un sistema de vigilancia privada, 
la vigencia se reduce a dos años, reconociendo el mayor nivel de riesgo 
y la necesidad de revisiones más frecuentes. 
3. Proceso de renovación: El mismo artículo 17 establece que "la renovación 
del estudio de seguridad se someterá al mismo procedimiento señalado 
en los artículos 13 y siguientes", lo que implica que debe seguir todos los 
pasos descritos anteriormente, incluyendo la evaluación por parte de la 
autoridad fiscalizadora. 


4. Plazo para solicitar la renovación: Al menos tres meses antes del 
vencimiento de la vigencia del estudio de seguridad, la entidad obligada 
deberá presentar uno nuevo o solicitar que se prorrogue su vigencia. Esta 
anticipación permite que el proceso de evaluación y aprobación se 
complete antes del vencimiento del estudio vigente, evitando vacíos en 
la seguridad. 
5. Modificaciones durante la vigencia: La ley contempla la posibilidad de 
que surjan cambios que afecten al estudio de seguridad durante su 
período de vigencia: "Cualquier modificación que incida en el estudio de 
seguridad deberá ser presentada a la Subsecretaría de Prevención del 
Delito, se someterá al mismo procedimiento señalado en los artículos 13 
y siguientes y no podrá implementarse sino luego de su aprobación." 
6. Ultraactividad del estudio vigente: Un aspecto importante es que "el 
estudio vigente mantendrá su validez si la demora en resolver dentro de 
los plazos establecidos es imputable a la Subsecretaría de Prevención 
del Delito." Esta disposición protege a la entidad obligada de posibles 
consecuencias administrativas por retrasos no imputables a ella. 
7. Disposiciones transitorias: El artículo segundo transitorio establece un 
régimen especial para la primera presentación de estudios de seguridad 
bajo la nueva ley: "Las empresas de transporte de valores, las 
instituciones bancarias y financieras de cualquier naturaleza, las 
empresas de apoyo al giro bancario que reciban o mantengan dineros 
en sus operaciones y los establecimientos de venta de combustibles 
obligados deberán presentar el primer estudio de seguridad dentro de 
los seis meses siguientes a la entrada en vigencia de esta ley, aun 
cuando tengan estudios de seguridad vigentes de conformidad a la 
normativa actual." 
Este régimen de vigencia y renovación busca un equilibrio entre la necesaria 
actualización periódica de las medidas de seguridad y la estabilidad operativa 
de las entidades obligadas, adaptando los plazos según el nivel de riesgo y 
estableciendo mecanismos claros para las modificaciones que resulten 
necesarias durante la vigencia del estudio. 

 

 

 

 

 

 


• Implementación y seguimiento 
La Ley 21659 establece un sistema integral para la implementación y 
seguimiento de los estudios de seguridad aprobados, asegurando que las 
medidas propuestas se materialicen efectivamente y se mantengan en el 
tiempo: 
1. Plazo de implementación: El artículo 19 establece que "aprobado el 
estudio de seguridad, la entidad obligada tendrá un plazo de treinta días 
para implementarlo." Este período acotado busca evitar dilaciones 
innecesarias y garantizar que las medidas de seguridad entren en 
funcionamiento rápidamente. 
2. Verificación de implementación: Corresponde a la Subsecretaría de 
Prevención del Delito autorizar el funcionamiento de la entidad obligada, 
pero solo después de verificar, previo informe de la autoridad 
fiscalizadora, que la implementación de las medidas de seguridad se 
ajusta al estudio aprobado y que se han individualizado todas las 
personas que integrarán el organismo de seguridad interno, cuando 
corresponda. 
3. Plazo para la autorización: La Subsecretaría debe emitir esta autorización 
en un plazo máximo de treinta días. El mismo artículo 19 contempla una 
solución para evitar paralizaciones por demoras administrativas: "En 
caso contrario, la entidad obligada podrá funcionar provisoriamente, y 
deberá para ello implementar todas las medidas contenidas en el 
estudio aprobado." 
4. Fiscalización continua: El artículo 88 establece que "cuando la autoridad 
fiscalizadora respectiva verifique el incumplimiento de esta ley o de su 
reglamento deberá presentar una denuncia ante el juzgado de policía 
local que corresponda", lo que constituye un mecanismo de seguimiento 
permanente para asegurar el cumplimiento de las medidas aprobadas. 
5. Informes periódicos: Las entidades con sistemas de vigilancia privada 
deben mantener a la autoridad fiscalizadora informada sobre la 
situación de su personal y cualquier cambio en los integrantes del 
organismo de seguridad interno, lo que permite un seguimiento 
actualizado. 
6. Responsabilidad de los jefes de seguridad: Según el artículo 23, el jefe de 
seguridad "será el responsable de la ejecución del estudio de seguridad 
de la entidad" y tendrá a su cargo "la organización, dirección, 
administración, control y gestión de los recursos destinados a la 


protección de personas y bienes". Esta estructura de responsabilidad 
personal refuerza el seguimiento interno. 
7. Supervisión del encargado de seguridad: Complementariamente, el 
artículo 24 establece que "cada recinto, oficina, agencia o sucursal de las 
entidades obligadas a contar con un sistema de vigilancia privada 
tendrá un encargado de seguridad, quien velará por el cumplimiento de 
las medidas establecidas en el estudio de seguridad". Este rol está 
específicamente orientado al seguimiento cotidiano. 
8. Sanciones por incumplimiento: El artículo 94 clasifica como infracción 
gravísima "no disponer de aquellas medidas de seguridad que hayan 
sido autorizadas en los estudios de seguridad, respecto del sistema de 
vigilancia privada o hacerlo de una forma distinta", lo que puede 
acarrear multas significativas (entre 650 y 13.500 UTM según el artículo 
100). 
9. Responsabilidad en caso de externalización: El artículo 20 prevé 
situaciones de externalización, estableciendo que "cuando, por cualquier 
medio, las entidades obligadas externalicen, total o parcialmente, la 
administración, operación o explotación de aquellos establecimientos o 
locales donde realicen sus actividades en otras personas naturales o 
jurídicas, se podrán aplicar a cualquiera de ellas las sanciones que 
correspondan por el incumplimiento de las obligaciones que impone 
esta ley." 
10. Registro de Seguridad Privada: El artículo 84 crea un Registro de 
Seguridad Privada a cargo de la Subsecretaría de Prevención del Delito, 
que incluye sub-registros de entidades obligadas, lo que facilita el 
seguimiento sistemático y centralizado del cumplimiento de las medidas 
de seguridad. 
Este sistema de implementación y seguimiento representa un avance 
significativo respecto al régimen anterior, estableciendo responsabilidades 
claras, plazos definidos y mecanismos de verificación y sanción que buscan 
asegurar la efectiva materialización de las medidas de seguridad aprobadas 
en los estudios correspondientes. 

 

 

 

 

 

 


 

 

 

 

 

 

5. Personal de seguridad privada 
• Vigilantes privados: requisitos y funciones 
La Ley 21659 establece un marco regulatorio detallado para los vigilantes 
privados, definiendo con precisión tanto sus requisitos como sus funciones: 
Definición y naturaleza jurídica 
El artículo 25 define al vigilante privado como "quien realice labores de 
protección a personas y bienes, dentro de un recinto o área determinada, 
autorizado para portar armas, credencial y uniforme." 
Asimismo, establece su relación laboral: "El vigilante privado tendrá la calidad 
de trabajador dependiente de la entidad en la que presta servicios o de la 
empresa de seguridad en el caso del artículo 22 y le serán aplicables las 
normas del Código del Trabajo." 
Requisitos específicos 
Los vigilantes privados deben cumplir con los requisitos generales establecidos 
en el artículo 46 para todas las personas que prestan servicios en seguridad 
privada, y adicionalmente, según el artículo 25, deben cumplir con requisitos 
específicos: 
1. Manejo de armas: "Haber cumplido con lo establecido en el decreto N° 
83, de 2007, del Ministerio de Defensa Nacional, que aprueba Reglamento 
Complementario de la Ley N° 17.798, sobre Control de Armas y elementos 
similares, en cuanto al uso de armas de fuego." 
2. Capacitación especializada: "Haber aprobado un curso especial de 
formación y perfeccionamiento en las entidades autorizadas para ello, 
de conformidad con esta ley y su reglamento." 
3. Condición física: "No haber sido declarado con invalidez de segunda o de 
tercera clase por el sistema previsional y de salud de la Caja de Previsión 
de la Defensa Nacional o de la Dirección de Previsión de Carabineros de 
Chile, según corresponda." 
4. Edad mínima: El artículo 46, numeral 1, establece como requisito general 
"ser mayor de edad". Sin embargo, para los vigilantes privados, el artículo 


46, en su contexto general, señala que se exige tener 21 años como 
mínimo. 
Exenciones para ex-miembros de fuerzas de seguridad 
La ley contempla exenciones para quienes han ejercido funciones similares: 
"En el caso de quienes hayan ejercido funciones de control o fiscalización como 
integrantes de las Fuerzas Armadas o de Orden y Seguridad Pública, el 
reglamento de la presente ley establecerá las materias de las cuales se podrán 
eximir en razón de su conocimiento previo." 
Funciones y ámbito de acción 
Las funciones de los vigilantes privados se pueden sintetizar en: 
1. Protección de personas y bienes: Su función principal es brindar 
protección a las personas y bienes dentro del recinto o área 
determinada para la cual fueron autorizados. 
2. Porte y uso de armas: Según el artículo 26, "los vigilantes privados 
deberán portar armas de fuego en el ejercicio de sus funciones, 
exclusivamente, mientras dure la jornada de trabajo y sólo dentro del 
recinto o área para el cual fueron autorizados." Excepcionalmente, la 
Subsecretaría de Prevención del Delito puede eximir de esta obligación 
en casos calificados. 
3. Dispositivos eléctricos: El artículo 27 establece que "los vigilantes privados 
podrán portar y utilizar armamentos no letales, incluidos los dispositivos 
eléctricos de control durante el ejercicio y desarrollo de sus funciones", 
aunque su uso es excepcional y requiere autorización específica. 
4. Limitación territorial: Los vigilantes cumplen sus funciones 
exclusivamente dentro del recinto o área para la cual fueron autorizados, 
no pudiendo extender sus labores fuera de estos límites. 
Obligaciones adicionales 
1. Uso de uniforme y credencial: Según el artículo 28, "los vigilantes privados 
tendrán la obligación de usar uniforme y credencial", con características 
determinadas reglamentariamente. El uniforme debe diferenciarse del 
utilizado por las Fuerzas Armadas, de Orden y Seguridad Pública y 
Gendarmería. 
2. Sistemas de registro audiovisual: El mismo artículo establece que "los 
vigilantes privados deberán contar con sistemas de registro audiovisual 
durante el ejercicio de sus funciones" en los casos y forma que determine 
el reglamento. 


3. Responsabilidad por armas: Deben cumplir estrictamente con los 
protocolos de entrega, devolución y registro de armas y municiones, 
según lo establecido en el artículo 26. 
Protección laboral y seguros 
La ley establece importantes garantías para los vigilantes privados: 
1. Seguro de vida obligatorio: El artículo 29 establece que "las entidades 
empleadoras deberán contratar un seguro de vida en beneficio de cada 
vigilante privado, por el monto y en las condiciones que determine el 
reglamento." 
2. Seguro de responsabilidad civil: Adicionalmente, "las entidades 
empleadoras deberán contar con un seguro de responsabilidad civil o 
un mecanismo de provisión de fondo de reserva para la reparación de 
daños a terceros que por dolo o negligencia pueda cometer el vigilante 
privado durante el cumplimiento de sus funciones." 
3. Estatus de accidentes laborales: Los daños físicos o psíquicos que sufran 
los vigilantes privados con ocasión de su trabajo son considerados 
accidentes laborales, sujetos a las normas de la Ley N° 16.744. 
Prohibiciones y sanciones 
El artículo 30 establece prohibiciones específicas: 
"Se prohíbe desempeñar funciones de vigilantes privados fuera de los casos 
contemplados en esta ley." 
"Se prohíbe a toda persona natural o jurídica proporcionar u ofrecer, bajo 
cualquier forma o denominación, servicios de personas que porten o utilicen 
armas de fuego, con excepción de las empresas de transporte de valores 
autorizadas en conformidad con esta ley." 
Las sanciones por infringir estas prohibiciones son severas: presidio menor en 
sus grados mínimo a medio, multa de 1.000 a 2.000 UTM y la inhabilitación 
perpetua para desempeñar actividades de seguridad privada. En caso de 
reincidencia, las penas aumentan a presidio menor en sus grados medio a 
máximo y multa de 2.000 a 4.000 UTM. 
Este régimen integral constituye un avance significativo respecto a la 
regulación anterior, estableciendo con claridad el estatus, requisitos, funciones, 
obligaciones y garantías de los vigilantes privados, con un énfasis especial en 
su profesionalización y protección laboral. 

 

• Guardias de seguridad: nuevas regulaciones 
Guardias de seguridad: nuevas regulaciones 


La Ley 21659 introduce un marco regulatorio específico para los guardias de 
seguridad, estableciendo con precisión su definición, requisitos, obligaciones y 
protección laboral. Este es uno de los aspectos donde la nueva ley presenta 
mayores innovaciones respecto al régimen anterior. 
Definición y ámbito de acción 
El artículo 49 define al guardia de seguridad como "aquel que, sin ser vigilante 
privado, otorga personalmente protección a personas y bienes, dentro de un 
recinto o área determinada y previamente delimitada." 
Esta definición establece una clara distinción respecto a los vigilantes privados: 
los guardias de seguridad no están autorizados para portar armas de fuego, 
limitando su capacidad operativa pero ampliando significativamente su 
ámbito de empleo. 
Requisitos de acceso a la función 
Para ejercer como guardia de seguridad, según los artículos 50 y 46, se 
requiere: 
1. Requisitos generales: Cumplir con todos los requisitos establecidos en el 
artículo 46 para las personas naturales que prestan servicios en 
seguridad privada, incluyendo ser mayor de edad, tener condiciones 
físicas y psíquicas compatibles, haber cursado educación media, no 
tener antecedentes penales, entre otros. 
2. Capacitación especializada: "Haber aprobado un curso de capacitación, 
de conformidad con lo dispuesto en esta ley y su reglamento." 
3. Autorización oficial: "Los interesados deberán estar autorizados por la 
Subsecretaría de Prevención del Delito mediante resolución fundada." 
Duración y renovación de la autorización 
A diferencia de los vigilantes privados, cuya autorización tiene una vigencia de 
dos años, el artículo 50 establece que: 
"La autorización referida tendrá una vigencia de cuatro años, y podrá ser 
renovada por la Subsecretaría de Prevención del Delito por el mismo período u 
otro menor." 
Esta autorización se materializa en "una licencia personal e intransferible que 
constará en una credencial emitida por la Subsecretaría de Prevención del 
Delito", que debe ser portada en todo momento durante el ejercicio de 
funciones. 
Modalidades de contratación 
El artículo 51 establece una flexibilidad significativa en las modalidades de 
contratación: 


"Cualquier persona, natural o jurídica, podrá contratar guardias para brindar 
seguridad a un grupo de viviendas, edificios, conjunto residencial, locales 
comerciales u otros que, por su naturaleza, requieran de este tipo de servicios." 
Para esto, permite dos modalidades: 
1. Contratar "los servicios de una empresa debidamente acreditada que 
provea personal para estos fines" 
2. Contratar "directamente los servicios de una o más personas que 
cuenten con la licencia que les permite ejercer esta labor" 
Directiva de funcionamiento 
Una innovación importante es la obligación de contar con una directiva de 
funcionamiento: 
"Los servicios que desarrollen los guardias de seguridad deberán comunicarse 
a la autoridad fiscalizadora y a la Subsecretaría de Prevención del Delito, y 
especificarán en una directiva de funcionamiento, el lugar donde se realizarán 
y la individualización de la persona que presta el servicio." 
Esta directiva debe ser aprobada por la Subsecretaría de Prevención del Delito, 
previo informe de la autoridad fiscalizadora, quien puede solicitar 
modificaciones que deben ser implementadas en un plazo de diez días o el 
plazo prudencial que determine la Subsecretaría. 
Uniforme y elementos identificadores 
El artículo 52 establece la obligación de usar uniforme, cuyas características 
serán determinadas reglamentariamente. Excepcionalmente, la Subsecretaría 
de Prevención del Delito, previo informe de la autoridad fiscalizadora, puede 
eximir a determinados guardias de esta obligación. 
Elementos defensivos y prohibiciones de armamento 
Una de las regulaciones más importantes se refiere a los elementos de 
protección y defensa: 
1. Elementos defensivos permitidos: El artículo 53 establece que "los 
empleadores deberán proporcionar a los guardias de seguridad privada 
elementos defensivos que permitan resguardar su vida e integridad 
física con el objeto de que puedan cumplir sus funciones", previa 
autorización de la Subsecretaría de Prevención del Delito. 
2. Prohibición expresa de armas: El mismo artículo prohíbe 
categóricamente proporcionar "ningún tipo de máquina, instrumento, 
utensilio u objeto cortante o punzante, armas de fuego y demás 
elementos regulados en la ley N° 17.798, sobre Control de Armas y su 
reglamento complementario." 


3. Sanción por porte de armas: El artículo 56 refuerza esta prohibición 
estableciendo que constituye una infracción gravísima usar armas en el 
cumplimiento de sus funciones. 
Capacitación y especialización 
La ley establece un sistema de capacitación diferenciado según el nivel de 
riesgo: 
"Los guardias de seguridad deberán cursar capacitaciones, las que 
dependerán de los distintos niveles de riesgo que enfrentan. Asimismo, podrán 
tener especializaciones según el tipo de actividad de seguridad privada que 
ejerzan." (Artículo 54) 
Para aquellos clasificados en nivel de riesgo alto, se establece la obligación de 
"contar con sistemas de registro audiovisual durante el ejercicio de sus 
funciones", en los términos que determine el reglamento. 
Protección laboral 
Al igual que para los vigilantes privados, la ley establece garantías laborales 
específicas: 
"El empleador de los guardias de seguridad deberá contratar un seguro de vida 
en su favor, por el monto y en las condiciones que determine el reglamento y 
según el nivel de riesgo de sus actividades." (Artículo 49) 
Además, según el artículo 53, los elementos defensivos y de protección no 
pueden ser costeados por el trabajador, sino que deben ser proporcionados 
por el empleador. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Mayor formalización: Se establece un sistema estructurado de requisitos, 
capacitación y autorización para una función que anteriormente tenía 
una regulación menos rigurosa. 
2. Sistema de licencias: La credencial emitida por la Subsecretaría de 
Prevención del Delito constituye una verdadera licencia profesional, con 
vigencia determinada y procedimientos de renovación. 
3. Uniformidad nacional: Se establece un marco normativo uniforme para 
todo el país, superando la dispersión normativa anterior. 
4. Directiva de funcionamiento: Esta herramienta permite un control más 
efectivo de las condiciones específicas en que se desarrolla el servicio. 
5. Elementos defensivos regulados: Se establece con claridad qué 
elementos defensivos pueden portar los guardias, previa autorización, y 
cuáles están prohibidos. 


6. Capacitación diferenciada por riesgo: El sistema reconoce que no todos 
los guardias enfrentan los mismos riesgos, adaptando la capacitación 
según el nivel de exposición. 
7. Protección laboral reforzada: La obligación de contratar seguros de vida 
y proporcionar elementos defensivos refuerza la protección de estos 
trabajadores. 
Esta regulación específica para guardias de seguridad representa un avance 
significativo en la profesionalización de esta actividad, estableciendo un marco 
normativo claro que equilibra la necesaria flexibilidad operativa con garantías 
adecuadas de formación, control y protección laboral. 

 

• Otros componentes: jefes de seguridad, supervisores, capacitadores 
La Ley 21659 establece un marco normativo detallado para diversos roles 
profesionales dentro del sistema de seguridad privada, más allá de los 
vigilantes y guardias. Esta regulación refleja la complejidad del sector y busca 
profesionalizar todos sus niveles jerárquicos y funcionales. 
Jefes de seguridad 
El jefe de seguridad constituye una pieza clave en el sistema de vigilancia 
privada, especialmente para entidades de alto riesgo. 
Definición y funciones 
El artículo 23 define al jefe de seguridad como el responsable de: 
• Dirigir el sistema de vigilancia privada 
• Ejecutar el estudio de seguridad de la entidad 
• Organizar, dirigir, administrar, controlar y gestionar los recursos 
destinados a la protección 
• Coordinar internamente la entidad y con las autoridades fiscalizadoras 
Sus funciones específicas incluyen: 
1. La detección y análisis de situaciones de riesgo 
2. La planificación y programación de actuaciones preventivas 
3. La organización, dirección y control del personal a su cargo 
4. La proposición de sistemas de seguridad pertinentes 
5. La supervisión del funcionamiento y mantenimiento de sistemas 
6. La coordinación con la autoridad fiscalizadora y la Subsecretaría de 
Prevención del Delito 
Requisitos específicos 
Además de los requisitos generales establecidos en el artículo 46, los jefes de 
seguridad deben cumplir requisitos adicionales según el artículo 23: 


1. Formación superior: "Estar en posesión de un título profesional de una 
carrera de, a lo menos, ocho semestres de duración otorgado por 
entidades de educación superior del Estado o reconocidas por éste y, al 
menos, de un curso de especialidad en seguridad o materias afines." 
2. Aptitud física: "No haber sido declarado con invalidez de segunda o de 
tercera clase por el sistema previsional y de salud de la Caja de Previsión 
de la Defensa Nacional o de la Dirección de Previsión de Carabineros de 
Chile, según corresponda." 
La ley contempla posibles exenciones para ex miembros de las Fuerzas 
Armadas o de Orden y Seguridad Pública, que serán reguladas en el 
reglamento. 
Encargados de seguridad 
Para asegurar la implementación efectiva de las medidas de seguridad en 
cada instalación, la ley crea la figura del encargado de seguridad. 
Definición y funciones 
Según el artículo 24: "Cada recinto, oficina, agencia o sucursal de las entidades 
obligadas a contar con un sistema de vigilancia privada tendrá un encargado 
de seguridad, quien velará por el cumplimiento de las medidas establecidas 
en el estudio de seguridad, en coordinación con el jefe de seguridad y se 
relacionará con la autoridad fiscalizadora para los efectos de esta ley." 
Requisitos 
El mismo artículo establece que "el encargado de seguridad deberá cumplir 
los mismos requisitos establecidos para los vigilantes privados", lo que implica 
una formación específica y autorización oficial. 
Supervisores de seguridad 
Definición y ámbito 
El artículo 4 del Reglamento que contiene el decreto N° 867, de 2017, definía al 
supervisor de seguridad como "el encargado de efectuar labores de 
supervigilancia y control de los componentes del sistema de seguridad privada 
que se encuentren bajo su subordinación", definición que la Ley 21659 mantiene 
en esencia. 
Requisitos específicos 
La ley establece que los supervisores deben cumplir con los requisitos 
generales del personal de seguridad privada y, cuando supervisen vigilantes 
armados, deberán cumplir también los requisitos específicos de éstos. 
Capacitadores 
Los capacitadores juegan un rol fundamental en la profesionalización del 
sector, siendo responsables de la formación del personal de seguridad. 


Definición y ámbito 
El artículo 59 define a los capacitadores como "los profesionales y técnicos 
autorizados por la Subsecretaría de Prevención del Delito dedicados a la 
instrucción, formación, capacitación y perfeccionamiento de vigilantes 
privados, guardias de seguridad, porteros, nocheros, rondines, conserjes, en su 
caso, u otros de similar carácter." 
Requisitos y autorización 
Para desempeñarse como capacitadores deben: 
1. Cumplir con los requisitos generales del artículo 46 
2. Contar con aprobación específica de la Subsecretaría de Prevención del 
Delito, previo informe de la autoridad fiscalizadora 
3. Acreditar nivel de educación profesional y técnico en materias 
inherentes a seguridad privada, según determine el reglamento 
Especialización por materias 
La ley contempla la existencia de capacitadores especializados por áreas 
temáticas, cada uno con requisitos específicos de formación y experiencia. 
Estas áreas incluyen: 
• Legislación aplicada a la seguridad privada 
• Primeros auxilios 
• Uso de implementos de seguridad y técnicas de reducción 
• Arma y tiro 
• Prevención y control de emergencias 
• Defensa personal 
• Sistemas de alarma y comunicaciones 
Otros roles especializados 
La ley también regula otros roles específicos dentro del sistema de seguridad 
privada: 
Encargados de armas de fuego 
El artículo 26 establece que "las labores de registro [...], así como la 
conservación y custodia de las armas y municiones, serán realizadas por un 
encargado de armas de fuego, quien será designado para tales efectos por la 
entidad y a quien se le aplicarán los mismos requisitos establecidos en el 
artículo 25 para los vigilantes privados." 
Este rol es crucial para la seguridad en el manejo de armamento y puede ser 
ejercido por la misma persona que cumple funciones de encargado de 
seguridad. 
Asesores de seguridad 


Son profesionales dedicados a las labores de asesoría en materia de seguridad 
privada, como elaboración de estudios y planes de seguridad. Según la ley, 
deben contar con formación superior específica y autorización de la 
Subsecretaría de Prevención del Delito. 
Operadores de CCTV y alarmas 
Profesionales especializados en el control y operación de sistemas 
tecnológicos de seguridad, que deben cumplir requisitos específicos de 
formación y autorización. 
Aspectos comunes y diferencias con el régimen anterior 
Innovaciones principales 
1. Centralización de autorizaciones: La Subsecretaría de Prevención del 
Delito centraliza la autorización de todos estos roles profesionales, lo que 
permite un control más efectivo y homogéneo. 
2. Jerarquía clara: La ley establece con precisión las relaciones jerárquicas 
y funcionales entre los distintos roles, especialmente entre jefes de 
seguridad, encargados y supervisores. 
3. Requisitos diferenciados: Cada rol tiene requisitos específicos adaptados 
a sus funciones y responsabilidades, superando la homogeneidad del 
régimen anterior. 
4. Capacitación especializada: Se reconoce la necesidad de formación 
específica para cada función, estableciendo sistemas de capacitación 
diferenciados. 
5. Responsabilidades delimitadas: Cada rol tiene asignadas 
responsabilidades específicas dentro del sistema, lo que facilita la 
rendición de cuentas y el control. 
Esta regulación detallada de los distintos componentes del sistema de 
seguridad privada constituye uno de los avances más significativos de la Ley 
21659, estableciendo un marco normativo integral que abarca todos los niveles 
jerárquicos y funcionales del sector, favoreciendo su profesionalización y la 
mejora de la calidad de los servicios. 

 

 

 

 

 

 

 

 


 

 

 

 

• Formación y capacitación requerida 
La Ley 21659 establece un marco integral y diferenciado para la formación y 
capacitación del personal de seguridad privada, aspecto que constituye una 
de las innovaciones más significativas respecto al régimen anterior. Este 
sistema busca profesionalizar el sector y asegurar que cada componente 
cuente con las competencias necesarias para sus funciones específicas. 
Marco institucional de la capacitación 
Entidades autorizadas para capacitar 
El artículo 58 determina quiénes pueden impartir capacitación en seguridad 
privada: 
"Sólo podrán actuar como instituciones de capacitación aquellas autorizadas 
por la Subsecretaría de Prevención del Delito para formar, capacitar y 
perfeccionar al personal de seguridad que desarrolle labores de vigilante 
privado, guardia de seguridad, portero, nochero, rondín y demás personas que 
ejerzan las actividades de seguridad privada señaladas en el artículo 2." 
Específicamente, pueden ser instituciones de capacitación: 
• Organismos técnicos de capacitación (OTEC) 
• Instituciones de educación superior acreditadas (universidades, 
institutos profesionales y centros de formación técnica) 
Estas instituciones deben obtener una autorización específica de la 
Subsecretaría de Prevención del Delito, cumpliendo los requisitos generales de 
las empresas de seguridad privada y requisitos adicionales que establecerá el 
reglamento. 
Aprobación de programas y planes 
La Subsecretaría de Prevención del Delito tiene un rol fundamental en la 
determinación de contenidos: 
"Los programas y planes de estudio y los perfiles de ingreso y egreso de las 
instituciones capacitadoras serán aprobados por la Subsecretaría de 
Prevención del Delito." (Artículo 58, inciso final) 
Capacitadores autorizados 
La capacitación debe ser impartida por profesionales específicamente 
autorizados: 
"Se entenderá por capacitadores a los profesionales y técnicos autorizados por 
la Subsecretaría de Prevención del Delito dedicados a la instrucción, formación, 


capacitación y perfeccionamiento de vigilantes privados, guardias de 
seguridad, porteros, nocheros, rondines, conserjes, en su caso, u otros de similar 
carácter." (Artículo 59) 
Estos capacitadores deben: 
• Cumplir con los requisitos generales del artículo 46 
• Contar con aprobación específica de la Subsecretaría de Prevención del 
Delito 
• Acreditar nivel de educación profesional y técnico en las materias 
correspondientes 
Estructura y tipos de capacitación 
La ley establece una estructura de capacitación diferenciada para las distintas 
funciones: 
Niveles de capacitación 
El artículo 61 establece que: 
"Las capacitaciones del personal de seguridad privada deberán distinguir entre 
los distintos niveles de riesgo y propenderán a la especialización según el tipo 
de actividad de seguridad privada que desempeñen, de acuerdo con lo 
señalado en el artículo 2." 
Esto implica un sistema de formación adaptado a: 
• El nivel de riesgo enfrentado (bajo, medio o alto) 
• El tipo específico de actividad de seguridad privada 
Tipos de cursos 
La ley contempla distintos tipos de cursos: 
1. Cursos de formación o básicos: Dirigidos a quienes inician su actividad 
en seguridad privada. 
2. Cursos de perfeccionamiento: Para actualizar conocimientos y 
competencias de quienes ya ejercen funciones en el sector. 
3. Cursos de especialización: Destinados a profundizar en áreas específicas 
o desarrollar competencias para funciones particulares. 
Procedimiento de evaluación y certificación 
Examinación 
El artículo 60 establece que: 
"Los cursos de capacitación a que se refiere este párrafo finalizarán con un 
examen ante Carabineros de Chile. Una vez aprobado, la Subsecretaría de 
Prevención del Delito entregará una certificación que acreditará haber 
cumplido con los requisitos correspondientes." 
Este procedimiento busca asegurar un estándar uniforme de calidad en la 
certificación de competencias. 


Plataforma tecnológica 
La ley innova al establecer un sistema digital de certificación: 
"Esta certificación deberá ser emitida a través de una plataforma informática 
administrada por la Subsecretaría de Prevención del Delito e interconectada 
con las autoridades fiscalizadoras." (Artículo 60) 
Vigencia de las certificaciones 
La certificación tiene una vigencia determinada según la función: 
• Para vigilantes privados: dos años 
• Para guardias de seguridad y otros: cuatro años 
Durante estos plazos, no es necesario repetir la capacitación aunque la 
persona cambie de empleador, lo que favorece la movilidad laboral sin 
comprometer los estándares de formación. 
Contenidos mínimos obligatorios 
El artículo 60 establece contenidos mínimos obligatorios para todas las 
capacitaciones: 
"Para obtener la certificación del presente artículo el personal que ejerza 
actividades de seguridad privada deberá ser capacitado, al menos, en las 
siguientes materias: 
• Respeto y promoción de los derechos humanos 
• Privacidad y uso de datos personales 
• Correcto uso de elementos defensivos cuando corresponda 
• Legislación sobre seguridad privada 
• Primeros auxilios 
• Probidad 
• No discriminación y perspectiva de género" 
Estos contenidos reflejan una visión moderna de la seguridad privada, que 
integra consideraciones de derechos humanos, ética profesional y 
responsabilidad social. 
Exenciones y convalidaciones 
La ley contempla un sistema de exenciones para ex miembros de fuerzas de 
seguridad: 
"En el caso de quienes hayan ejercido funciones de control o fiscalización como 
integrantes de las Fuerzas Armadas o de Orden y Seguridad Pública, el 
reglamento de la presente ley establecerá las materias de las cuales se podrán 
eximir en razón de su conocimiento previo." (Artículo 25, numeral 2, inciso 
segundo) 
Esto reconoce la formación y experiencia previa, evitando duplicidades 
innecesarias en la capacitación. 


Diferencias con el régimen anterior 
Las principales innovaciones respecto al sistema de capacitación anterior 
incluyen: 
1. Rectoría centralizada: La Subsecretaría de Prevención del Delito asume 
un rol rector en la aprobación y supervisión de programas y entidades 
de capacitación. 
2. Capacitación diferenciada por riesgos: Se adaptan los contenidos y 
exigencias según el nivel de riesgo y especialización. 
3. Contenidos modernizados: Se incorporan materias como derechos 
humanos, privacidad de datos y perspectiva de género. 
4. Certificación digital: Se implementa una plataforma informática para la 
gestión de certificaciones, facilitando la verificación de autenticidad. 
5. Portabilidad de certificaciones: Las certificaciones mantienen su validez 
aunque el trabajador cambie de empleador. 
6. Exámenes estandarizados: Los exámenes son aplicados por Carabineros 
de Chile, asegurando un estándar uniforme. 
7. Mayor periodicidad: Se establecen plazos definidos para la renovación 
de certificaciones (dos o cuatro años según el rol). 
8. Régimen transitorio: La ley establece un régimen de transición para las 
certificaciones otorgadas bajo el régimen anterior. 
Este sistema integral de capacitación constituye uno de los pilares 
fundamentales de la profesionalización del sector que busca la Ley 21659, 
estableciendo mecanismos para asegurar la idoneidad técnica y ética de 
todos los componentes del sistema de seguridad privada. 

 

 

6. Empresas de seguridad privada 
• Requisitos para la constitución y operación 
La Ley 21659 establece un marco regulatorio detallado y exigente para las 
empresas de seguridad privada, definiendo con precisión los requisitos para su 
constitución, los procedimientos de autorización y las obligaciones operativas 
que deben cumplir. Este marco busca profesionalizar el sector y garantizar 
estándares adecuados en la prestación de servicios. 
Definición y ámbito 
El artículo 33 define a las empresas de seguridad privada como: 
"Aquellas que tengan por objeto suministrar bienes o prestar servicios 
destinados a la protección de personas, bienes y procesos productivos de las 


actividades descritas en el artículo 2 y dispongan de medios materiales, 
técnicos y humanos para ello." 
Esta definición amplia abarca diversas actividades, incluyendo vigilancia y 
protección, transporte de valores, custodia de objetos, instalación de sistemas 
electrónicos, entre otras. 
Requisitos para la constitución 
El artículo 34 establece los requisitos fundamentales que deben cumplir las 
empresas para obtener autorización: 
1. Constitución legal: "Estar legalmente constituidas como personas 
jurídicas de derecho privado y tener por objeto social alguna o algunas 
de las actividades de seguridad privada establecidas en el artículo 2." 
La ley incluye una excepción importante: "Cuando estas instituciones hayan 
sido formalizadas como Organismos Técnicos de Capacitación, quedarán 
exceptuadas del requisito de objeto social único de los artículos 12 y 21, número 
1, de la ley N° 19.518." 
2. Medios adecuados: "Contar con los medios humanos, de formación, 
financieros, materiales y técnicos que establezca el reglamento 
respectivo, en función de la naturaleza de las actividades para las que 
soliciten autorización y las características de los servicios que se prestan." 
3. Seguros obligatorios: "Suscribir los contratos de seguro en favor del 
personal que corresponda, de acuerdo a lo establecido en esta ley." 
4. Idoneidad de socios y directivos: "Que los socios, administradores y 
representantes legales no hayan sido condenados por crimen o simple 
delito." 
5. Ausencia de formalización: La ley establece un extenso listado de delitos 
por los cuales los socios, administradores y representantes legales no 
pueden estar formalizados, incluyendo delitos relativos a armas, 
narcotráfico, terrorismo, lavado de activos, seguridad del Estado, 
violencia intrafamiliar, delitos sexuales, homicidio y trata de personas, 
entre otros. 
6. Antecedentes institucionales: "Que los socios, administradores y 
representantes legales, en el caso de personas jurídicas, no hubiesen 
dejado de pertenecer a las Fuerzas Armadas, de Orden y Seguridad 
Pública o a Gendarmería de Chile, como consecuencia de la aplicación 
de una medida disciplinaria en los últimos cinco años." 
7. Ausencia de responsabilidad penal corporativa: "No haber sido 
condenada la persona jurídica por delitos contemplados en la ley N° 
20.393." 


8. Denominación distintiva: "El nombre o razón social de la persona jurídica 
no podrá ser igual o similar al de los órganos públicos, especialmente el 
del Ministerio encargado de la Seguridad Pública, el de las Fuerzas 
Armadas y Fuerzas de Orden y Seguridad Pública, el del Ministerio Público 
o cualquier otro que induzca a error respecto de su naturaleza privada." 
Procedimiento de autorización 
El artículo 34 establece que sólo podrán actuar como empresas de seguridad 
privada las que se encuentren autorizadas por la Subsecretaría de Prevención 
del Delito. El reglamento de la ley determinará la forma y procedimientos 
específicos para esta autorización. 
Según las disposiciones transitorias de la ley, mientras no se encuentre en 
funcionamiento la plataforma informática administrada por la Subsecretaría 
de Prevención del Delito, las nuevas autorizaciones continuarán siendo 
emitidas por las Prefecturas de Carabineros de Chile. 
Obligaciones operativas 
Una vez autorizadas, las empresas de seguridad privada deben cumplir con 
diversas obligaciones operativas, detalladas en el artículo 35: 
1. Deber de reserva: "Mantener bajo reserva toda información de que 
dispongan o que les sea proporcionada en razón de los servicios que 
prestan y velar porque su personal cumpla con la misma obligación." 
Este deber se mantiene por cuatro años desde que haya cesado la prestación 
de servicios y su infracción se considera grave. Si es cometida por personal de 
la empresa, se sanciona con penas de presidio menor y multa. 
2. Cumplimiento normativo: "Cumplir con las normas e instrucciones 
generales que imparta la Subsecretaría de Prevención del Delito." 
3. Informes periódicos: Elaborar y enviar cada dos años un informe a la 
Subsecretaría de Prevención del Delito que incluya: 
o El cumplimiento de los requisitos para actuar como empresa de 
seguridad privada 
o La nómina del personal y el cumplimiento de sus requisitos 
o Los contratos de prestación de servicios formalizados 
4. Colaboración informativa: "Remitir cualquier antecedente o información 
solicitada por la Subsecretaría de Prevención del Delito o la autoridad 
fiscalizadora respectiva, dentro del plazo que dichas instituciones 
determinen." 
5. Otras obligaciones reglamentarias: Cumplir con las demás obligaciones 
que determinen la ley y el reglamento. 
Vigencia y renovación de autorizaciones 


El artículo 103 de la Ley 21659 no especifica explícitamente la vigencia de las 
autorizaciones para empresas de seguridad privada, pero el artículo tercero 
transitorio establece que: 
"Las autorizaciones otorgadas a las personas naturales y jurídicas para ejercer 
actividades de seguridad privada y que se encuentren vigentes al momento 
de la entrada en vigencia de esta ley, se mantendrán hasta la fecha de su 
vencimiento conforme con la legislación vigente a la época de su 
otorgamiento." 
Esto implica un régimen de transición que respeta las autorizaciones existentes. 
Prohibiciones específicas 
El artículo 36 establece una prohibición relevante: 
"No podrán prestar servicios de seguridad privada a la Administración del 
Estado o a las corporaciones autónomas de derecho público las personas 
jurídicas en las que tenga participación el Presidente de la República, ministros 
de Estado, subsecretarios, personal directivo y de exclusiva confianza del 
Ministerio encargado de la Seguridad Pública y de la Subsecretaría de 
Prevención del Delito, oficiales superiores y generales de las Fuerzas Armadas y 
Fuerzas de Orden y Seguridad Pública en servicio activo, senadores, diputados, 
gobernadores regionales, consejeros regionales, alcaldes, concejales o las 
personas que tengan la calidad de cónyuge, convivientes civiles, hijos 
adoptados o parientes hasta tercer grado de consanguinidad y segundo de 
afinidad de dichas autoridades." 
Esta prohibición busca evitar conflictos de interés en la contratación pública 
de servicios de seguridad. 
Régimen sancionatorio específico 
El artículo 101 establece sanciones específicas para las empresas de seguridad 
privada: 
1. Infracciones gravísimas: Multa de 50 a 650 unidades tributarias 
mensuales. 
2. Infracciones graves: Multa de 15 a 50 unidades tributarias mensuales. 
3. Infracciones leves: Multa de 1,5 a 15 unidades tributarias mensuales. 
Adicionalmente, el artículo 109 faculta a la Subsecretaría de Prevención del 
Delito para suspender o revocar la autorización a empresas que hayan 
reincidido en infracciones gravísimas o graves, pudiendo incluso ordenar la 
clausura temporal o definitiva de sus recintos. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 


1. Centralización de autorización: La Subsecretaría de Prevención del Delito 
se convierte en la autoridad central para autorizar a las empresas, 
reemplazando el sistema anterior donde esta responsabilidad recaía en 
las Prefecturas de Carabineros. 
2. Mayor detalle en requisitos: La ley establece con mucha mayor precisión 
los requisitos para la constitución y operación de estas empresas. 
3. Ampliación de prohibiciones: Se establecen prohibiciones más extensas 
respecto a los antecedentes de socios y directivos. 
4. Régimen sancionatorio gradual: Se establece un sistema de sanciones 
proporcionales al tipo de infracción. 
5. Prevención de conflictos de interés: Se incorporan normas específicas 
para evitar conflictos en la contratación pública. 
6. Obligaciones de información: Se establecen obligaciones periódicas de 
información a la autoridad. 
7. Sistema integrado de fiscalización: Las empresas quedan sujetas a un 
sistema coordinado de fiscalización bajo la supervisión de la 
Subsecretaría. 
Este marco normativo constituye un avance significativo en la regulación de 
las empresas de seguridad privada, estableciendo requisitos y controles más 
estrictos que buscan profesionalizar el sector y garantizar un funcionamiento 
adecuado en su rol complementario a la seguridad pública. 

 

• Empresas de transporte de valores 
La Ley 21659 dedica una sección específica a las empresas de transporte de 
valores, reconociendo la naturaleza particular de esta actividad y los riesgos 
especiales que conlleva. Este marco regulatorio busca garantizar la máxima 
seguridad en el traslado de valores, actividad crítica para el sistema financiero 
y comercial. 
Definición y ámbito 
El artículo 37 define con precisión esta actividad: 
"Se entenderá por transporte de valores el conjunto de actividades asociadas 
a la custodia y traslado de valores desde un lugar a otro, dentro y fuera del 
territorio nacional, por vía terrestre, aérea, fluvial, lacustre o marítima." 
El mismo artículo aclara que "el transporte de valores sólo se podrá realizar a 
través de empresas de seguridad privada autorizadas por la Subsecretaría de 
Prevención del Delito, previo informe técnico de la autoridad fiscalizadora." 


Esta clara delimitación establece un régimen de exclusividad para empresas 
especializadas, prohibiendo implícitamente que otras entidades realicen esta 
actividad sin la autorización correspondiente. 
Definición de valores 
El artículo 2, numeral 2, precisa qué se considera "valores" para efectos de esta 
ley: 
"Se entenderá por valores el dinero en efectivo, los documentos bancarios y 
mercantiles de normal uso en el sistema financiero, los metales preciosos sean 
en barra, amonedados o elaborados, las obras de arte y, en general, cualquier 
otro bien que, atendidas sus características, haga aconsejable su 
conservación, custodia o traslado bajo medidas especiales de seguridad." 
Esta definición amplia permite adaptar la regulación a distintos tipos de bienes 
que requieren protección especial durante su transporte. 
Requisitos específicos 
El artículo 38 establece que "las personas jurídicas que presten servicios de 
transporte de valores deberán contar con un sistema de vigilancia privado, de 
conformidad con lo dispuesto en esta ley y en su reglamento." 
Esto implica que, además de los requisitos generales para empresas de 
seguridad privada (artículo 34), estas empresas deben implementar un 
sistema de vigilancia privada completo, que incluye: 
• Jefe de seguridad 
• Encargado de seguridad 
• Vigilantes privados 
• Estudio de seguridad aprobado 
• Recursos tecnológicos y materiales adecuados 
Adicionalmente, se establece un requisito específico para su personal: "Los 
tripulantes de vehículos blindados para transporte de valores deberán cumplir 
con los requisitos de vigilante privado y las demás exigencias que establezca 
el reglamento." 
Actividades conexas autorizadas 
La ley reconoce que las empresas de transporte de valores pueden realizar 
actividades complementarias relacionadas con su giro principal: 
1. Mantenimiento de dispensadores de dinero: El artículo 39 establece que 
"las empresas de transporte de valores están autorizadas para mantener 
los dispensadores de dinero, cajeros automáticos u otros sistemas de 
similares características de propiedad de las instituciones bancarias o 
financieras." 


Esta actividad puede realizarse "con apertura de bóveda o sin ella, 
condicionada a las disposiciones de seguridad que establezca el reglamento 
para la citada operación y características de implementación de los 
dispensadores de dinero." 
2. Administración de centros de recaudación y pago: El mismo artículo 
autoriza a estas empresas a "administrar, por cuenta de terceros, centros 
de recaudación y pago bajo condiciones de seguridad que se 
determinarán según el nivel de riesgo y de acuerdo al informe de la 
autoridad fiscalizadora respectiva." 
Estas disposiciones amplían el ámbito operativo de estas empresas, 
reconociendo su capacidad técnica para actividades relacionadas con el 
manejo seguro de valores. 
Obligaciones reforzadas 
Además de las obligaciones generales aplicables a todas las empresas de 
seguridad privada, las empresas de transporte de valores están sujetas a 
exigencias adicionales: 
1. Sistema de vigilancia privado obligatorio: Sin excepción, deben contar 
con este sistema completo. 
2. Personal altamente calificado: Sus tripulantes deben cumplir los 
requisitos de vigilantes privados, que son más exigentes que los de 
guardias de seguridad. 
3. Estudios de seguridad especiales: El artículo segundo transitorio 
establece que "las empresas de transporte de valores [...] deberán 
presentar el primer estudio de seguridad dentro de los seis meses 
siguientes a la entrada en vigencia de esta ley, aun cuando tengan 
estudios de seguridad vigentes de conformidad a la normativa actual." 
4. Medidas técnicas específicas: El artículo 40 señala que "el reglamento de 
la presente ley regulará el equipamiento, implementos, procedimientos, 
dotaciones, solemnidades y cuantías sujetas a las disposiciones de este 
párrafo." 
Control y fiscalización reforzados 
Las empresas de transporte de valores están sujetas a un régimen de 
fiscalización especialmente estricto: 
1. Autorización específica: Requieren autorización expresa de la 
Subsecretaría de Prevención del Delito, previo informe técnico de la 
autoridad fiscalizadora. 


2. Informe técnico obligatorio: A diferencia de otras empresas de seguridad, 
en este caso el informe de la autoridad fiscalizadora es un requisito 
previo ineludible. 
3. Fiscalización permanente: La autoridad fiscalizadora debe supervisar 
constantemente el cumplimiento de las medidas de seguridad 
establecidas. 
4. Sanciones agravadas: Dada la criticidad de su actividad, las infracciones 
a la normativa pueden ser consideradas gravísimas, con las 
correspondientes sanciones elevadas. 
Integración con otros regímenes normativos 
La Ley 21659 integra y complementa otras normativas relevantes para el 
transporte de valores: 
1. Relación con la regulación bancaria: Se reconoce la vinculación con el 
sistema financiero, estableciendo que pueden mantener cajeros y 
dispensadores de propiedad de instituciones bancarias. 
2. Coordinación con normativa de tránsito: El artículo 119 modifica el artículo 
63 de la Ley de Tránsito para incorporar la posibilidad de que la Dirección 
de Vialidad autorice "según el nivel de riesgo, la contratación de servicios 
de seguridad privada que permitan la custodia y transporte de carga 
sobredimensionada." 
3. Articulación con ley de control de armas: Los vigilantes privados que 
trabajan en estas empresas deben cumplir con la Ley N° 17.798 sobre 
Control de Armas. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Unificación normativa: La ley integra en un solo cuerpo legal la regulación 
del transporte de valores, que antes se encontraba dispersa en diversos 
decretos y reglamentos. 
2. Ampliación de actividades conexas: Se reconoce expresamente la 
facultad de realizar actividades complementarias como la 
administración de centros de recaudación y pago. 
3. Mayor precisión en requisitos: Se detallan con mayor claridad los 
requisitos específicos para estas empresas y su personal. 
4. Enfoque de riesgo: Se adopta un enfoque basado en el nivel de riesgo 
para determinar las medidas de seguridad aplicables. 
5. Autorización centralizada: La autorización se centraliza en la 
Subsecretaría de Prevención del Delito, en lugar del sistema anterior más 
descentralizado. 


6. Integración con regulación de carga sobredimensionada: Se establece 
una vinculación explícita con la normativa de tránsito para el transporte 
de cargas especiales. 
Este marco regulatorio específico para empresas de transporte de valores 
reconoce la naturaleza crítica de esta actividad para el funcionamiento del 
sistema económico y establece garantías reforzadas para su adecuado 
desarrollo, buscando minimizar los riesgos inherentes al traslado de bienes de 
alto valor. 

 

• Empresas de seguridad electrónica 
Empresas de seguridad electrónica 
La Ley 21659 incorpora una regulación específica para las empresas de 
seguridad electrónica, reconociendo la creciente importancia de los 
componentes tecnológicos en el sector de la seguridad privada. Este marco 
normativo busca garantizar estándares técnicos adecuados y establecer 
responsabilidades claras para quienes proveen estos servicios especializados. 
Definición y ámbito 
El artículo 41 define con precisión a estas empresas: 
"Empresas de seguridad electrónica son aquellas que tienen por objeto la 
instalación y mantenimiento de aparatos, equipos, dispositivos, componentes 
tecnológicos y sistemas de seguridad con fines privados y conectados a 
centrales receptoras de alarmas, centros de control o de videovigilancia 
privados, así como la operación de dichas centrales y centros, y disponen de 
medios materiales, técnicos y humanos para ello." 
Esta definición abarca tanto la instalación y mantenimiento de dispositivos 
como la operación de centrales de monitoreo, reconociendo la naturaleza 
integral de estos servicios tecnológicos. 
El artículo 3, numeral 1, complementa esta definición al especificar que 
constituyen actividades de seguridad privada: 
"La instalación y mantenimiento de aparatos, equipos, dispositivos, 
componentes tecnológicos y sistemas de seguridad electrónica conectados a 
centrales receptoras de alarmas, centros de control o de videovigilancia, así 
como la operación de dichas centrales y centros." 
Proceso de autorización específico 
El artículo 42 establece los requisitos para su autorización: 
"Sólo podrán actuar como empresas de seguridad electrónica las que, además 
de cumplir con los requisitos del párrafo 1 de este Título, se encuentren 
autorizadas por la Subsecretaría de Prevención del Delito, previo informe de la 


autoridad fiscalizadora. El otorgamiento de esta autorización será regulado en 
el correspondiente reglamento." 
Esto implica que estas empresas deben cumplir: 
1. Los requisitos generales para empresas de seguridad privada (artículo 
34) 
2. Requisitos específicos que establecerá el reglamento 
3. Contar con informe favorable de la autoridad fiscalizadora 
4. Obtener autorización expresa de la Subsecretaría de Prevención del 
Delito 
Registro especializado 
El artículo 43 establece una obligación de registro específica: 
"Las empresas de seguridad electrónica deberán ser inscritas en el sub-registro 
de empresas de seguridad señalado en el artículo 84." 
Este sub-registro forma parte del Registro de Seguridad Privada a cargo de la 
Subsecretaría de Prevención del Delito, permitiendo un control especializado 
de estas entidades. 
Obligaciones de información al usuario 
La ley establece obligaciones específicas de transparencia hacia los usuarios: 
"Asimismo, dichas empresas estarán obligadas a informar a sus usuarios sobre 
el funcionamiento del servicio que prestan, las características técnicas y 
funcionales del sistema de seguridad electrónico instalado y las 
responsabilidades que lleva consigo su uso, conforme a esta ley y su 
reglamento." (Artículo 43) 
Esta obligación busca asegurar que los usuarios comprendan 
adecuadamente las capacidades y limitaciones de los sistemas contratados. 
Conexión con centrales policiales 
La ley regula específicamente la conexión con centrales de Carabineros: 
"Las empresas de seguridad electrónica cuyos aparatos, dispositivos, sistemas 
de seguridad o de alarmas se encuentren conectados a una central de 
Carabineros de Chile deberán verificar, cada vez que se produzca una 
activación, si éstas constituyen efectivamente una emergencia." (Artículo 44) 
Los medios específicos de verificación serán establecidos en el reglamento, 
pero la ley establece claramente la responsabilidad de la empresa de verificar 
la existencia real de una emergencia antes de activar la respuesta policial. 
Régimen de responsabilidad por falsas alarmas 
La ley establece un régimen específico de responsabilidad para evitar el 
desperdicio de recursos policiales: 


"Si la activación se produce por un hecho que no constituye una emergencia, 
será responsable la empresa de seguridad electrónica que transmita la 
activación de una señal de alarma sin verificarla a través de los medios 
establecidos en el reglamento, y siempre que de ello se derive un 
procedimiento policial inoficioso." (Artículo 44, inciso segundo) 
Esta responsabilidad se establece como una infracción leve, cuya sanción será 
determinada por el juzgado de policía local correspondiente, previa denuncia 
de Carabineros de Chile. 
Remisión reglamentaria para aspectos técnicos 
Dada la complejidad técnica de esta actividad, el artículo 45 establece una 
amplia remisión reglamentaria: 
"El reglamento de la presente ley regulará el funcionamiento, la calificación del 
personal, los medios de verificación, gestión y monitoreo de alarmas, los 
aspectos relacionados con la certificación de los sistemas tecnológicos, 
equipos, alarmas y otros artículos tecnológicos que puedan ser ofrecidos por 
las empresas de seguridad electrónica." 
Esta remisión permite adaptar los aspectos técnicos específicos a los avances 
tecnológicos sin necesidad de modificar la ley. 
Personal técnico especializado 
Aunque la ley no detalla los requisitos específicos para el personal técnico de 
estas empresas, el artículo 46 establece los requisitos generales para las 
personas naturales que prestan servicios en seguridad privada, que serían 
aplicables al personal de empresas de seguridad electrónica. 
El artículo 3, numeral 1, reconoce implícitamente las figuras de instaladores, 
mantenedores y operadores de centrales, cuya regulación específica 
corresponderá al reglamento. 
Infracciones específicas 
El régimen de infracciones de la ley contempla situaciones particulares 
relevantes para las empresas de seguridad electrónica: 
1. Estándares técnicos: El artículo 96, numeral 3, considera infracción grave 
"no cumplir con los estándares técnicos de calidad señalados en el 
reglamento en lo que se refiere a los recursos tecnológicos y materiales." 
2. Interrupción del servicio: El artículo 96, numeral 5, clasifica como 
infracción grave "suspender el cumplimiento de los servicios de 
seguridad a que se ha obligado la empresa sin dar aviso oportuno a 
quienes lo contrataron, y no proporcionar a éstos los fundamentos de 
hecho y de derecho que así lo justifican." 
Protección de datos personales 


En relación con los sistemas de videovigilancia y registro, el artículo 6, inciso 
tercero, establece: 
"Para el cumplimiento de lo dispuesto en los incisos precedentes, el tratamiento 
de datos de carácter personal y los sistemas, automatizados o no, creados 
para el cumplimiento de esta ley se someterán a lo dispuesto en la normativa 
de protección de datos personales." 
Esto implica que las empresas de seguridad electrónica deben cumplir con la 
legislación sobre protección de datos personales en su operación. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Reconocimiento específico: La ley reconoce expresamente a las 
empresas de seguridad electrónica como una categoría específica 
dentro del sector, con un régimen propio. 
2. Registro especializado: Se establece un sub-registro específico, 
facilitando el control y la fiscalización especializada. 
3. Obligaciones de información: Se establecen deberes específicos de 
información hacia los usuarios sobre las características y 
funcionamiento de los sistemas. 
4. Responsabilidad por falsas alarmas: Se establece un régimen claro de 
responsabilidad por la activación de alarmas sin verificación previa. 
5. Certificación de sistemas: Se anticipa un sistema de certificación para 
los componentes tecnológicos, que será detallado en el reglamento. 
6. Centralización normativa: Se integra esta regulación en el marco general 
de seguridad privada, superando la dispersión normativa anterior. 
7. Enfoque en la calidad del servicio: La ley pone énfasis en los estándares 
técnicos y la calidad del servicio, aspectos particularmente relevantes en 
el ámbito tecnológico. 
Este marco regulatorio específico para empresas de seguridad electrónica 
refleja la creciente importancia de los componentes tecnológicos en la 
seguridad privada moderna y busca establecer un equilibrio entre la 
innovación tecnológica y las garantías necesarias para un servicio adecuado 
y responsable. 

 

 

• Obligaciones específicas 
La Ley 21659 establece un conjunto detallado de obligaciones específicas para 
las empresas de seguridad privada, que complementan las obligaciones 


generales aplicables a todos los actores del sistema. Estas exigencias 
particulares buscan garantizar altos estándares de operación, transparencia y 
responsabilidad en la prestación de servicios de seguridad. 
Obligaciones de reserva y confidencialidad 
La ley establece un riguroso deber de reserva, particularmente importante en 
un sector que maneja información sensible: 
"Mantener bajo reserva toda información de que dispongan o que les sea 
proporcionada en razón de los servicios que prestan y velar porque su personal 
guarde igual obligación." (Artículo 35, numeral 1) 
Este deber tiene características particulares: 
1. Extensión temporal: "Ésta se mantendrá hasta por un período de cuatro 
años contado desde que haya cesado la prestación de los servicios." 
2. Gravedad de la infracción: "Su infracción se considerará un 
incumplimiento grave para los efectos de esta ley." 
3. Responsabilidad penal: "Si la infracción del deber de reserva es cometida 
por personal de la empresa se sancionará con penas de presidio menor 
en sus grados mínimo a medio y multa de seis a diez unidades tributarias 
mensuales." 
4. Excepciones legítimas: El deber no aplica a información entregada: 
o En cumplimiento de las obligaciones de denunciar y comunicar 
hechos delictuales (artículo 4, numerales 3 y 4) 
o En respuesta a requerimientos de información realizados por los 
Tribunales de Justicia o el Ministerio Público 
o Al Ministerio encargado de la Seguridad Pública o la autoridad 
fiscalizadora cuando sea necesario para el cumplimiento de la ley 
Obligaciones de información y reporte 
Las empresas deben mantener informadas a las autoridades sobre diversos 
aspectos de su operación: 
1. Informes periódicos completos: "Elaborar y enviar cada dos años, en la 
forma y oportunidad que determine el reglamento, un informe a la 
Subsecretaría de Prevención del Delito" (Artículo 35, numeral 3) 
Este informe debe incluir: 
o El cumplimiento de los requisitos para actuar como empresa de 
seguridad privada 
o La nómina del personal y el cumplimiento de sus requisitos 
o La celebración de contratos de prestación de servicios 
formalizados por escrito 


2. Respuesta a requerimientos de información: "Remitir cualquier 
antecedente o información solicitada por la Subsecretaría de Prevención 
del Delito o la autoridad fiscalizadora respectiva, dentro del plazo que 
dichas instituciones determinen." (Artículo 35, numeral 4) 
3. Información a clientes: "Poner a disposición de sus clientes y del público 
en general, medios de comunicación expeditos que permitan atender 
consultas y solicitudes." (Artículo 35, numeral 4, implícito en Artículo 13, 
numeral 4) 
4. Transparencia comercial: "Informar de manera veraz y oportuna al 
cliente que contrate servicios de seguridad privada sobre la naturaleza 
de estos, su precio, condiciones de contratación y otras características 
relevantes de los mismos, debiendo prestarlos en los términos 
convenidos en el contrato respectivo." (Artículo 35, numeral 5, implícito en 
Artículo 13, numeral 5) 
Obligaciones relacionadas con el personal 
Las empresas tienen responsabilidades específicas respecto a su personal: 
1. Verificación de requisitos: Deben verificar que su personal cumpla con 
todos los requisitos legales y reglamentarios para ejercer actividades de 
seguridad privada. 
2. Reportes de pérdida de requisitos: Según el artículo 47, "las entidades 
empleadoras deberán informar esta circunstancia a la Subsecretaría de 
Prevención del Delito" cuando un empleado pierda alguno de los 
requisitos necesarios. 
3. Capacitación periódica: Deben garantizar la capacitación periódica de 
su personal según los requerimientos establecidos en la ley. 
4. Contratación de seguros: El artículo 29 establece que "las entidades 
empleadoras deberán contratar un seguro de vida en beneficio de cada 
vigilante privado" y "un seguro de responsabilidad civil o un mecanismo 
de provisión de fondo de reserva para la reparación de daños a terceros." 
5. Provisión de elementos de seguridad: El artículo 53 establece que "los 
empleadores deberán proporcionar a los guardias de seguridad privada 
elementos defensivos que permitan resguardar su vida e integridad 
física." 
Obligaciones respecto a equipamiento y ejecución de servicios 
La ley establece parámetros específicos sobre equipamiento y ejecución: 
1. Estándares técnicos: Deben cumplir con "los estándares técnicos de 
calidad señalados en el reglamento en lo que se refiere a los recursos 


tecnológicos y materiales" (implícito como infracción grave en el artículo 
96, numeral 3). 
2. Continuidad del servicio: No pueden "suspender el cumplimiento de los 
servicios de seguridad a que se ha obligado la empresa sin dar aviso 
oportuno a quienes lo contrataron, y no proporcionar a éstos los 
fundamentos de hecho y de derecho que así lo justifican" (implícito como 
infracción grave en el artículo 96, numeral 5). 
3. Corrección de irregularidades: Deben "subsanar las irregularidades 
señaladas por las autoridades fiscalizadoras durante el control de esas 
actividades en el plazo otorgado por la Subsecretaría de Prevención del 
Delito" (implícito como infracción grave en el artículo 96, numeral 6). 
4. Sistemas de verificación: Para empresas de seguridad electrónica, el 
artículo 44 establece la obligación de "verificar, cada vez que se 
produzca una activación, si éstas constituyen efectivamente una 
emergencia." 
Obligaciones específicas por tipo de empresa 
La ley establece obligaciones diferenciadas según la actividad específica: 
1. Empresas de transporte de valores: Deben contar con un sistema de 
vigilancia privada completo (artículo 38), cumplir con requisitos técnicos 
específicos para vehículos y procedimientos, y mantener protocolos 
estrictos de manejo de valores. 
2. Empresas de seguridad electrónica: Deben "informar a sus usuarios 
sobre el funcionamiento del servicio que prestan, las características 
técnicas y funcionales del sistema de seguridad electrónico instalado y 
las responsabilidades que lleva consigo su uso" (artículo 43). 
3. Empresas que prestan servicios a eventos masivos: Deben cumplir con 
requisitos particulares establecidos en el Título IV, especialmente en 
cuanto a planes de seguridad y medidas específicas según el tipo de 
evento. 
4. Empresas de capacitación: Deben cumplir con los requisitos 
establecidos para instituciones de capacitación en el artículo 58, 
incluyendo la aprobación de sus programas por la Subsecretaría de 
Prevención del Delito. 
Obligaciones ante incidentes 
La ley establece claramente las obligaciones de las empresas ante incidentes: 
1. Deber de denuncia: Según el artículo 4, numeral 4, deben "denunciar todo 
hecho que revista caracteres de delito, dentro de las 24 horas siguientes 


al momento en que tomen conocimiento de él, en los términos 
establecidos en los artículos 173 y siguientes del Código Procesal Penal." 
2. Deber de información a autoridades: "Deberán comunicar a las Fuerzas 
de Orden y Seguridad Pública cualquier circunstancia o información 
relevante para la prevención, el mantenimiento o restablecimiento de la 
seguridad pública." (Artículo 4, numeral 4, inciso segundo) 
3. Deber de colaboración: "Conservar y poner a disposición de las 
autoridades respectivas todos los antecedentes, instrumentos, efectos y 
pruebas que obren en su poder y que permitan individualizar a los 
autores y demás partícipes en hechos que revistan caracteres de delito." 
(Artículo 4, numeral 3) 
Obligaciones de prevención de conflictos de interés 
La ley establece restricciones para prevenir conflictos de interés: 
"No podrán prestar servicios de seguridad privada a la Administración del 
Estado o a las corporaciones autónomas de derecho público las personas 
jurídicas en las que tenga participación el Presidente de la República, ministros 
de Estado, subsecretarios," y otras autoridades específicas. (Artículo 36) 
Consecuencias del incumplimiento 
El incumplimiento de estas obligaciones específicas puede acarrear diversas 
consecuencias: 
1. Sanciones administrativas: Multas diferenciadas según la gravedad de la 
infracción (artículo 101). 
2. Revocación de autorizaciones: "La Subsecretaría de Prevención del Delito 
podrá suspender o revocar la autorización para ejercer actividades de 
seguridad privada a una persona natural o jurídica que haya reincidido 
en infracciones gravísimas o graves." (Artículo 109) 
3. Clausura de establecimientos: La Subsecretaría podrá "ordenar la 
clausura temporal o definitiva de uno o más de los recintos donde éstas 
funcionen." (Artículo 109) 
4. Responsabilidad penal: En casos específicos como la violación del deber 
de reserva por parte del personal. 
5. Responsabilidad civil: Por daños causados a terceros en el ejercicio de 
sus funciones. 
Este conjunto integral de obligaciones específicas constituye un marco 
exigente que busca profesionalizar el sector, garantizar servicios de calidad y 
asegurar que las empresas de seguridad privada cumplan efectivamente su 
rol preventivo, coadyuvante y complementario de la seguridad pública, con 


pleno respeto a los derechos de las personas y en coordinación adecuada con 
las autoridades. 

 

7. Elementos de seguridad y protección 
• Sistemas de registro audiovisual 
La Ley 21659 establece un marco normativo específico para los sistemas de 
registro audiovisual en el ámbito de la seguridad privada, reconociendo su 
importancia tanto como herramienta preventiva como probatoria. Esta 
regulación busca equilibrar la efectividad de estos sistemas con el respeto a 
los derechos fundamentales, especialmente la privacidad. 
Ámbito de aplicación y obligatoriedad 
La ley establece diferentes contextos en los que estos sistemas son obligatorios: 
1. Vigilantes privados: El artículo 28, inciso quinto, establece que: "Los 
vigilantes privados deberán contar con sistemas de registro audiovisual 
durante el ejercicio de sus funciones en los casos, forma y periodicidad 
que determine el reglamento, el que también deberá señalar sus 
características." 
2. Guardias de seguridad en entornos de alto riesgo: El artículo 54, inciso 
segundo, dispone: "Los guardias de seguridad que sean clasificados para 
enfrentar un nivel de riesgo alto deberán contar con sistemas de registro 
audiovisual durante el ejercicio de sus funciones en los casos, la forma y 
periodicidad que determine el reglamento, el que también definirá sus 
características." 
3. Vigilantes privados con dispositivos eléctricos de control: Según el 
artículo 27, inciso tercero: "Los vigilantes privados que porten dispositivos 
eléctricos de control deberán contar con sistemas de registro 
audiovisual, de conformidad con el artículo siguiente." 
4. Entidades obligadas: El artículo 16 establece que las entidades obligadas 
deben informar en su propuesta de estudio de seguridad las medidas a 
implementar, incluyendo "el uso de recursos tecnológicos", que pueden 
incluir sistemas de registro audiovisual cuando corresponda. 
5. Eventos masivos: El artículo 70, numeral 8, establece que los 
organizadores de eventos masivos deben: "Instalar y utilizar recursos 
tecnológicos, tales como cámaras de seguridad, detectores de metales 
u otros que sean necesarios para resguardar adecuadamente la 
seguridad de los asistentes y sus bienes." 
Características técnicas y operativas 


La ley no detalla exhaustivamente las características técnicas de estos 
sistemas, remitiendo mayoritariamente al reglamento. Sin embargo, establece 
algunos parámetros generales: 
1. Alta resolución: Para sistemas de filmación en instituciones bancarias y 
financieras, el artículo 32, numeral 3, se refiere a "sistemas de filmación, 
su nivel de resolución y el tiempo y medidas de resguardo y custodia de 
estas grabaciones para utilizarlas como medio probatorio." 
2. Capacidad de captura identificable: El artículo 70, numeral 8, para 
eventos masivos, establece que "en caso de que existan cámaras de 
seguridad, los organizadores deberán monitorearlas permanentemente 
durante el desarrollo de la actividad." 
3. Período de resguardo: La ley establece la obligación de "tomar las 
medidas para resguardar sus imágenes por el período que establezca el 
reglamento." 
4. Protección física: El equipamiento debe estar "instalado de forma que 
queden debidamente resguardadas de posible intrusión", según puede 
inferirse de diversas disposiciones. 
Respeto a derechos fundamentales 
La ley establece garantías importantes para el respeto de derechos 
fundamentales: 
1. Protección de datos personales: El artículo 6, inciso tercero, establece 
que: "Para el cumplimiento de lo dispuesto en los incisos precedentes, el 
tratamiento de datos de carácter personal y los sistemas, automatizados 
o no, creados para el cumplimiento de esta ley se someterán a lo 
dispuesto en la normativa de protección de datos personales." 
2. Limitación de uso: El artículo 48, numeral 2, prohíbe a las personas y 
empresas de seguridad privada: "Grabar ni almacenar imágenes, audios 
o datos del recinto o establecimiento donde prestan servicios, para fines 
distintos de seguridad." 
3. Ámbito de uso permitido: Los sistemas de registro audiovisual solo 
pueden utilizarse "durante el ejercicio de sus funciones" y nunca fuera del 
recinto o área en que presten servicios ni fuera del horario laboral, según 
el artículo 54, inciso segundo, in fine. 
Valor probatorio y acceso a grabaciones 
Aunque la ley no lo menciona expresamente, establece disposiciones que 
reconocen implícitamente el valor probatorio de estos registros: 
1. Obligación de conservación y entrega: El artículo 4, numeral 3, establece 
el deber de: "Conservar y poner a disposición de las autoridades 


respectivas todos los antecedentes, instrumentos, efectos y pruebas que 
obren en su poder y que permitan individualizar a los autores y demás 
partícipes en hechos que revistan caracteres de delito." 
2. Colaboración con autoridades: En eventos masivos, el artículo 70, 
numeral 2, obliga a los organizadores a: "Proporcionar toda la 
información o antecedentes que obren en su poder para la identificación 
de los responsables, tales como grabaciones o fotografías, los que 
entregarán a las policías o al Ministerio Público, a la mayor brevedad 
posible o dentro del plazo requerido por éstos." 
3. Disponibilidad para fiscalización: El artículo 70, numeral 3, establece el 
deber de: "Entregar a la autoridad competente, a la mayor brevedad, los 
antecedentes que le sean requeridos para la adecuada fiscalización de 
esta ley, tales como grabaciones, registro de asistentes, documentos de 
la organización e informes técnicos." 
Supervisión y monitoreo 
La ley establece disposiciones específicas sobre la supervisión de estos 
sistemas: 
1. Monitoreo constante: Para eventos masivos, el artículo 70, numeral 8, 
exige que "los organizadores deberán monitorearlas permanentemente 
durante el desarrollo de la actividad." 
2. Centralización de monitoreo: Para instituciones bancarias y financieras, 
el artículo 17 de manera implícita reconoce la existencia de centros de 
monitoreo centralizado. 
3. Verificación de alarmas: Para empresas de seguridad electrónica, el 
artículo 44 establece la obligación de verificar las activaciones de 
alarmas, lo que implícitamente incluye el uso de sistemas de registro 
audiovisual cuando estén disponibles. 
Regulación reglamentaria 
La ley remite al reglamento la determinación de múltiples aspectos específicos: 
1. Características técnicas: "El reglamento de la presente ley regulará [...] los 
aspectos relacionados con la certificación de los sistemas tecnológicos, 
equipos, alarmas y otros artículos tecnológicos que puedan ser ofrecidos 
por las empresas de seguridad electrónica." (Artículo 45) 
2. Periodicidad y forma de uso: El reglamento determinará "los casos, forma 
y periodicidad" en que deben utilizarse estos sistemas tanto para 
vigilantes privados como para guardias de seguridad. 


3. Período de resguardo: El reglamento establecerá el tiempo durante el 
cual deben conservarse las grabaciones según el tipo de instalación y 
nivel de riesgo. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Obligatoriedad generalizada: La ley establece la obligatoriedad de estos 
sistemas para múltiples contextos, mientras que el régimen anterior era 
más limitado. 
2. Diferenciación por nivel de riesgo: Se adapta la exigencia según el nivel 
de riesgo, especialmente para guardias de seguridad. 
3. Vinculación con dispositivos eléctricos: Se establece expresamente la 
obligatoriedad de sistemas de registro cuando se utilizan dispositivos 
eléctricos de control. 
4. Mayor protección de datos personales: Se incorporan garantías 
específicas para el tratamiento de datos personales obtenidos mediante 
estos sistemas. 
5. Ampliación a eventos masivos: Se incluye expresamente la obligación de 
utilizar estos sistemas en eventos masivos cuando corresponda. 
6. Centralización normativa: Se integra esta regulación en el marco general 
de seguridad privada, superando la dispersión normativa anterior. 
Este marco regulatorio para los sistemas de registro audiovisual refleja el 
reconocimiento de su importancia como herramienta fundamental en el 
sistema moderno de seguridad privada, estableciendo un equilibrio entre su 
utilidad preventiva y probatoria, y las necesarias garantías para los derechos 
de las personas, especialmente en materia de privacidad y protección de 
datos personales. 

 

• Armas y elementos defensivos permitidos 
La Ley 21659 establece un marco regulatorio detallado y diferenciado sobre las 
armas y elementos defensivos permitidos en el ámbito de la seguridad privada, 
distinguiendo claramente entre vigilantes privados y guardias de seguridad, y 
estableciendo un sistema de autorizaciones y controles que busca equilibrar la 
efectividad operativa con la seguridad pública. 
Armas de fuego para vigilantes privados 
La ley regula con precisión el porte y uso de armas de fuego por parte de los 
vigilantes privados: 
Obligatoriedad del porte 


El artículo 26 establece como regla general la obligatoriedad del porte de 
armas: 
"Los vigilantes privados deberán portar armas de fuego en el ejercicio de sus 
funciones, exclusivamente, mientras dure la jornada de trabajo y sólo dentro 
del recinto o área para el cual fueron autorizados." 
Esta obligatoriedad puede ser exceptuada en casos calificados: 
"Excepcionalmente, el Ministerio encargado de la Seguridad Pública, a través 
de la Subsecretaría de Prevención del Delito y previo informe de la autoridad 
fiscalizadora, podrá eximir el porte de armas de fuego en casos debidamente 
calificados." 
Registro y control 
La ley establece un riguroso sistema de control para las armas de fuego: 
1. Registro de entrega y devolución: "La entrega de armas y de municiones 
a los vigilantes privados y su restitución por éstos deberá ser registrada, 
de acuerdo con lo establecido en el reglamento de esta ley y las 
instrucciones que conforme a él imparta Carabineros de Chile." 
2. Registro de uso: "Asimismo, deberá consignarse en el registro el uso del 
arma de fuego y el hecho de haberse extraviado o perdido dicha arma 
o sus municiones." 
3. Inscripción obligatoria: "Todas las armas de fuego que posea la entidad 
deberán estar inscritas ante las autoridades señaladas en la ley N° 17.798 
y su reglamento." 
4. Responsabilidad por incumplimiento: "La omisión de este requisito hará 
incurrir al representante legal de la entidad, al jefe de seguridad y al 
vigilante privado, en su caso, en las responsabilidades penales y 
administrativas que corresponda." 
Custodia y almacenamiento 
El artículo 26 establece responsabilidades específicas para la custodia de las 
armas: 
1. Encargado de armas: "Las labores de registro [...], así como la 
conservación y custodia de las armas y municiones, serán realizadas por 
un encargado de armas de fuego, quien será designado para tales 
efectos por la entidad y a quien se le aplicarán los mismos requisitos 
establecidos en el artículo 25 para los vigilantes privados." 
2. Lugar de almacenamiento: "El encargado de armas de fuego será el 
responsable de guardar las armas y municiones en un lugar cerrado 
dentro del mismo recinto en que éstas se utilizan o en otros que 
determine la autoridad fiscalizadora, el cual debe ofrecer garantías 


suficientes de seguridad e incorporarse en el respectivo estudio de 
seguridad." 
Pérdida o extravío 
La ley establece obligaciones específicas en caso de pérdida de armamento: 
"En caso de pérdida, extravío o robo de un arma de fuego o de municiones, la 
entidad obligada deberá informarlo o denunciarlo, en su caso, de conformidad 
con la Ley N° 17.798, sobre Control de Armas. En caso de no cumplir con este 
deber, la entidad responderá conforme con lo dispuesto en el artículo 94." 
Dispositivos eléctricos de control 
La ley introduce una regulación específica para estos dispositivos, que 
constituye una novedad importante respecto al régimen anterior: 
"Los vigilantes privados podrán portar y utilizar armamentos no letales, incluidos 
los dispositivos eléctricos de control durante el ejercicio y desarrollo de sus 
funciones, mientras dure la jornada de trabajo y sólo dentro del recinto o área 
para el cual fueron autorizados." (Artículo 27) 
Sin embargo, establece importantes restricciones: 
1. Carácter excepcional: "La manipulación, porte y uso de los dispositivos 
eléctricos de control por parte de los vigilantes privados es excepcional." 
2. Autorización específica: "Sólo podrán ser empleados por los vigilantes 
autorizados por la Subsecretaría de Prevención de Delito, previo informe 
de la autoridad fiscalizadora y en la forma en que señale el reglamento 
respectivo." 
3. Registro obligatorio: "Los vigilantes privados que porten dispositivos 
eléctricos de control deberán contar con sistemas de registro 
audiovisual." 
Elementos defensivos para vigilantes privados 
Además de las armas de fuego y dispositivos eléctricos, la ley contempla 
elementos defensivos complementarios: 
"Los empleadores deberán proporcionar a los vigilantes privados los elementos 
defensivos, esto es, aquellos que permitan resguardar su vida e integridad 
física, con el objeto de que puedan dar cumplimiento a sus funciones. Para ello 
deberán contar con autorización de la Subsecretaría de Prevención del Delito, 
previo informe de la autoridad fiscalizadora." (Artículo 26, inciso octavo) 
El reglamento establecerá "los elementos defensivos y de protección mínimos 
que portarán los vigilantes privados y los requisitos que deberán acreditarse 
para su correcto uso, según corresponda." (Artículo 26, inciso final) 
Elementos defensivos para guardias de seguridad 


Para los guardias de seguridad, que no pueden portar armas, la ley establece 
un régimen específico de elementos defensivos: 
"Los empleadores deberán proporcionar a los guardias de seguridad privada 
elementos defensivos que permitan resguardar su vida e integridad física con 
el objeto de que puedan cumplir sus funciones. Para ello, deberán contar con 
autorización de la Subsecretaría de Prevención del Delito, previo informe de la 
autoridad fiscalizadora." (Artículo 53, inciso primero) 
Al igual que para los vigilantes, "el reglamento de la presente ley establecerá 
los elementos defensivos y de protección mínimos con los que contarán los 
guardias de seguridad privada y los requisitos que deberán acreditarse para 
su correcto uso, según corresponda." (Artículo 53, inciso segundo) 
Prohibiciones explícitas para guardias de seguridad 
La ley establece prohibiciones categóricas para los guardias de seguridad: 
1. Prohibición general: "Prohíbese a las personas que desarrollen labores de 
guardia de seguridad, portero, nochero, rondines, conserjes u otros de 
similar carácter usar armas en el cumplimiento de su cometido." (Artículo 
56, inciso primero) 
2. Prohibición específica de armas cortantes y de fuego: "Los empleadores 
no podrán proporcionar ningún tipo de máquina, instrumento, utensilio u 
objeto cortante o punzante, armas de fuego y demás elementos 
regulados en la ley N° 17.798, sobre Control de Armas y su reglamento 
complementario." (Artículo 53, inciso tercero) 
3. Prohibición extensiva: "El uso y porte de los elementos señalados en el 
inciso precedente está prohibido para todo guardia de seguridad, sin 
distinción." (Artículo 53, inciso cuarto) 
4. Sanción por infracción: "El incumplimiento de lo preceptuado 
anteriormente importará una infracción gravísima, sin perjuicio de las 
demás sanciones que correspondan por los delitos que se cometan." 
(Artículo 56, inciso segundo) 
Responsabilidad por provisión de elementos 
Un aspecto importante es que la ley establece claramente que la 
responsabilidad de proporcionar los elementos de protección recae en el 
empleador: 
1. Para vigilantes privados: "Sin perjuicio del porte de armas de fuego, los 
empleadores deberán proporcionar a los vigilantes privados los 
elementos defensivos..." (Artículo 26, inciso octavo) 


2. Para guardias de seguridad: "Los empleadores deberán proporcionar a 
los guardias de seguridad privada elementos defensivos..." (Artículo 53, 
inciso primero) 
3. Prohibición de traslado de costo: De forma implícita, al igual que con el 
uniforme, estos elementos no pueden ser costeados por el trabajador. 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Regulación de dispositivos eléctricos: La ley incorpora expresamente la 
posibilidad de que los vigilantes privados utilicen dispositivos eléctricos 
de control, con las debidas autorizaciones y controles. 
2. Distinción clara entre vigilantes y guardias: Se establece una separación 
nítida entre los elementos que pueden portar los vigilantes privados 
(incluyendo armas de fuego) y los guardias de seguridad (limitados a 
elementos defensivos). 
3. Rol de la Subsecretaría de Prevención del Delito: Se establece que esta 
entidad, y no solo Carabineros, debe autorizar el uso de ciertos elementos 
defensivos. 
4. Sistema de registro obligatorio: Se exige registro audiovisual para 
vigilantes que porten dispositivos eléctricos. 
5. Reglamentación detallada: Se remite al reglamento la determinación 
precisa de los elementos defensivos permitidos, pero estableciendo 
principios claros en la ley. 
6. Responsabilidad penal y administrativa: Se establecen con claridad las 
consecuencias por incumplimiento de las normas sobre armamento. 
7. Centralización normativa: Se integra esta regulación en el marco general 
de seguridad privada, superando la dispersión normativa anterior. 
Este marco regulatorio sobre armas y elementos defensivos constituye uno de 
los aspectos más sensibles de la ley, pues busca un equilibrio entre 
proporcionar herramientas efectivas para la labor de seguridad privada y 
evitar riesgos para la seguridad pública, estableciendo claras distinciones 
según el tipo de personal y múltiples mecanismos de control para el uso de 
estos elementos. 
• Requisitos técnicos y certificaciones 

 

La Ley 21659 establece un marco normativo para los requisitos técnicos y 
certificaciones aplicables a diversos componentes del sistema de seguridad 
privada. Este aspecto representa un avance significativo respecto al régimen 
anterior, al establecer estándares más precisos y mecanismos de certificación 


que buscan garantizar la calidad y confiabilidad de los equipos, sistemas y 
procedimientos utilizados en el sector. 
Elementos de protección personal 
Chalecos antibalas 
La ley establece requisitos técnicos específicos para los chalecos antibalas que 
pueden utilizar los guardias de seguridad: 
1. Nivel de resistencia: "El chaleco deberá contar con una señal de impacto 
que no sea superior a 40 mm." (Artículo 9, numeral 1, letra a, implícito en 
el artículo 94) 
2. Certificación obligatoria: "Los chalecos antibalas que utilicen los guardias 
de seguridad, deberán estar certificados de acuerdo a la normativa 
técnica de ensayo balístico NIJ 0101.04., por el Laboratorio de Resistencia 
Balística, del Instituto de Investigaciones y Control del Ejército de Chile 
(IDIC)." (Artículo 9, numeral 1, letra c, implícito en el artículo 94) 
3. Registro y trazabilidad: "Al momento de presentar el producto para su 
certificación, el proveedor o fabricante deberá declarar el lote y la 
cantidad de unidades que lo componen (N° de serie), así como su 
material, cantidad y área de protección, lo que permitirá mantener una 
trazabilidad del producto." (Artículo 9, numeral 1, letra d, implícito en el 
artículo 94) 
4. Seguro obligatorio: "El fabricante deberá contar con un seguro de vida 
por 30 UF o su equivalente en dólares americanos en caso que un 
chaleco antibalas no cumpla su función." (Artículo 9, numeral 1, letra b, 
implícito en el artículo 94) 
Chalecos anticorte 
De manera similar, se establecen requisitos para chalecos anticorte: 
1. Normativa aplicable: "Los chalecos anticortes que utilicen los guardias de 
seguridad, deberán estar certificados de acuerdo a la normativa técnica 
norteamericana NIJ 0115.00." (Artículo 9, numeral 2, letra b, implícito en el 
artículo 94) 
2. Registro y trazabilidad: Similar al caso de los chalecos antibalas, se 
requiere declaración de lote, número de serie, materiales y área de 
protección. 
3. Seguro obligatorio: "El fabricante deberá contar con un seguro de vida 
por 30 UF o su equivalente en dólares americanos en caso que un 
chaleco anticorte no cumpla su función." (Artículo 9, numeral 2, inciso 
final, implícito en el artículo 94) 
Sistemas electrónicos de seguridad 


La ley establece que el reglamento determinará los requisitos técnicos 
aplicables a los sistemas electrónicos: 
"El reglamento de la presente ley regulará el funcionamiento, la calificación del 
personal, los medios de verificación, gestión y monitoreo de alarmas, los 
aspectos relacionados con la certificación de los sistemas tecnológicos, 
equipos, alarmas y otros artículos tecnológicos que puedan ser ofrecidos por 
las empresas de seguridad electrónica." (Artículo 45) 
Sin embargo, la ley ya establece algunos parámetros generales: 
1. Sistemas de alarma: El artículo 32 establece que el reglamento regulará 
"las características y condiciones del sistema de alarmas de asalto, 
independiente de las alarmas de incendio, robo u otras." 
2. Sistemas de filmación: El mismo artículo indica que se regularán "los 
sistemas de filmación, su nivel de resolución y el tiempo y medidas de 
resguardo y custodia de estas grabaciones para utilizarlas como medio 
probatorio." 
3. Verificación de alarmas: El artículo 44 establece la obligación de verificar 
las activaciones de alarmas, indicando que "los medios de verificación 
serán establecidos en el reglamento de esta ley." 
Vehículos de transporte de valores 
La ley remite al reglamento la determinación de los requisitos técnicos 
específicos para los vehículos utilizados en el transporte de valores: 
"El reglamento de la presente ley regulará el equipamiento, implementos, 
procedimientos, dotaciones, solemnidades y cuantías sujetas a las 
disposiciones de este párrafo." (Artículo 40) 
Sin embargo, establece implícitamente que estos vehículos deben ser 
blindados, al referirse a "tripulantes de vehículos blindados para transporte de 
valores" (Artículo 38, inciso segundo). 
Dispositivos de entintado de billetes 
Aunque la ley no menciona específicamente los sistemas de entintado de 
billetes (dispositivos que manchan los billetes en caso de robo, haciéndolos 
inservibles), el artículo 94, numeral 1, implícitamente reconoce la existencia de 
"sistemas o dispositivos disuasivos de seguridad de entintado de billetes", que 
deben ser utilizados conforme a la normativa técnica correspondiente. 
Sistemas de registro audiovisual 
La ley establece que el reglamento determinará las características técnicas de 
los sistemas de registro audiovisual obligatorios para vigilantes privados y 
guardias de seguridad de alto riesgo: 


"Los vigilantes privados deberán contar con sistemas de registro audiovisual 
durante el ejercicio de sus funciones en los casos, forma y periodicidad que 
determine el reglamento, el que también deberá señalar sus características." 
(Artículo 28, inciso quinto) 
"Los guardias de seguridad que sean clasificados para enfrentar un nivel de 
riesgo alto deberán contar con sistemas de registro audiovisual durante el 
ejercicio de sus funciones en los casos, la forma y periodicidad que determine 
el reglamento, el que también definirá sus características." (Artículo 54, inciso 
segundo) 
Dispositivos eléctricos de control 
El artículo 27 establece que los vigilantes privados pueden portar y utilizar 
armamentos no letales, incluidos los dispositivos eléctricos de control, pero no 
especifica los requisitos técnicos de estos dispositivos, remitiendo al 
reglamento: "en la forma en que señale el reglamento respectivo." 
Estándares técnicos como obligación 
La ley establece como obligación general el cumplimiento de estándares 
técnicos, cuyo incumplimiento constituye una infracción grave: 
"No cumplir con los estándares técnicos de calidad señalados en el reglamento 
en lo que se refiere a los recursos tecnológicos y materiales." (Artículo 96, 
numeral 3) 
Sistema de certificación y verificación 
La ley establece un sistema de certificación para diversos elementos: 
1. Entidades certificadoras: Se reconoce explícitamente el rol del Instituto 
de Investigaciones y Control del Ejército de Chile (IDIC) para la 
certificación de chalecos antibalas y, por extensión, de otros elementos 
de protección. 
2. Registros de certificación: Las entidades certificadoras deben llevar 
registros que incluyen: 
o Los elementos a ensayar 
o Cantidad y tipo 
o Resultados de los ensayos realizados 
3. Comunicación a autoridades: Estos registros "deberán ser comunicados 
cada 90 días corridos a la Zona de Seguridad Privada, Control de Armas 
y Explosivos, quienes lo distribuirán entre las autoridades fiscalizadoras 
de Seguridad Privada." 
4. Certificación de capacitación: El artículo 60 establece que la 
Subsecretaría de Prevención del Delito emitirá las certificaciones de 
capacitación a través de una plataforma informática. 


Plataformas tecnológicas oficiales 
La ley establece la creación de plataformas tecnológicas para gestionar 
certificaciones y registros: 
"Esta certificación deberá ser emitida a través de una plataforma informática 
administrada por la Subsecretaría de Prevención del Delito e interconectada 
con las autoridades fiscalizadoras. Las características de funcionamiento de 
dicha plataforma serán señaladas en el reglamento de esta ley." (Artículo 60, 
inciso segundo) 
Diferencias con el régimen anterior 
Las principales innovaciones respecto al régimen anterior incluyen: 
1. Mayor especificidad normativa: La ley establece con mayor precisión los 
requisitos técnicos y procedimientos de certificación, aunque remite 
muchos detalles al reglamento. 
2. Incorporación de normativas internacionales: Se adoptan estándares 
internacionales como la norma NIJ 0101.04 para chalecos antibalas y NIJ 
0115.00 para chalecos anticorte. 
3. Sistema integrado de certificación: Se establece un sistema coordinado 
bajo la supervisión de la Subsecretaría de Prevención del Delito. 
4. Trazabilidad de productos: Se exige la identificación detallada de los 
equipos certificados, incluyendo número de serie, lote y características. 
5. Seguros obligatorios: Se establece la obligación de contar con seguros 
que cubran fallos de los equipos de protección. 
6. Plataforma digital centralizada: Se crea una plataforma informática para 
la gestión de certificaciones. 
7. Incorporación de nuevas tecnologías: Se reconocen y regulan 
tecnologías como los dispositivos eléctricos de control y los sistemas de 
entintado de billetes. 
Este marco de requisitos técnicos y certificaciones busca garantizar la calidad, 
confiabilidad y seguridad de los equipos, sistemas y procedimientos utilizados 
en el sector de seguridad privada, estableciendo estándares mínimos y 
mecanismos de control que contribuyen a la profesionalización del sector y a 
la protección tanto de los trabajadores como del público en general. 

 

• Sistemas de alarmas y verificación 
La Ley 21659 establece un marco regulatorio específico para los sistemas de 
alarmas y los procesos de verificación, reconociendo su importancia como 
elementos fundamentales de la seguridad privada moderna. Esta regulación 


busca maximizar su efectividad y minimizar las falsas alarmas que consumen 
recursos policiales innecesariamente. 
Marco regulatorio general 
El artículo 32 establece que el reglamento de la ley regulará "las características 
y condiciones del sistema de alarmas de asalto, independiente de las alarmas 
de incendio, robo u otras". Este enfoque reconoce la necesidad de diferenciar 
los diversos tipos de sistemas de alarma según su función específica. 
Conexión con centrales de monitoreo 
La ley distingue entre distintos tipos de centrales receptoras de alarmas: 
1. Centrales privadas: Operadas por empresas de seguridad electrónica 
autorizadas, según lo establecido en el artículo 41, que define estas 
empresas como "aquellas que tienen por objeto la instalación y 
mantenimiento de aparatos, equipos, dispositivos, componentes 
tecnológicos y sistemas de seguridad con fines privados y conectados a 
centrales receptoras de alarmas, centros de control o de videovigilancia 
privados". 
2. Centrales policiales: El artículo 44 regula específicamente la conexión 
con centrales de Carabineros de Chile, estableciendo que "las empresas 
de seguridad electrónica cuyos aparatos, dispositivos, sistemas de 
seguridad o de alarmas se encuentren conectados a una central de 
Carabineros de Chile deberán verificar, cada vez que se produzca una 
activación, si éstas constituyen efectivamente una emergencia". 
Obligación de verificación 
Un aspecto innovador de la ley es la obligación expresa de verificación de 
alarmas: 
1. Procedimiento de verificación: El artículo 44 establece que las empresas 
deben verificar la activación de alarmas a través de medios específicos 
que serán determinados en el reglamento. 
2. Consecuencias por falsas alarmas: "Si la activación se produce por un 
hecho que no constituye una emergencia, será responsable la empresa 
de seguridad electrónica que transmita la activación de una señal de 
alarma sin verificarla a través de los medios establecidos en el 
reglamento, y siempre que de ello se derive un procedimiento policial 
inoficioso" (artículo 44, inciso segundo). 
3. Sanción específica: Este incumplimiento constituye infracción leve y será 
sancionado por el juzgado de policía local correspondiente al domicilio 
del infractor, previa denuncia de Carabineros de Chile. 
Requisitos técnicos y certificación 


La ley establece un marco para la determinación de requisitos técnicos 
específicos: 
1. Especificaciones técnicas: El artículo 45 señala que el reglamento 
regulará "los aspectos relacionados con la certificación de los sistemas 
tecnológicos, equipos, alarmas y otros artículos tecnológicos que 
puedan ser ofrecidos por las empresas de seguridad electrónica". 
2. Protocolos de operación: El mismo artículo indica que el reglamento 
regulará "el funcionamiento, la calificación del personal, los medios de 
verificación, gestión y monitoreo de alarmas". 
3. Estándares de calidad: El artículo 96 considera como infracción grave "no 
cumplir con los estándares técnicos de calidad señalados en el 
reglamento en lo que se refiere a los recursos tecnológicos y materiales". 
Integración con otros sistemas de seguridad 
La ley promueve la integración de los sistemas de alarma con otros 
componentes de seguridad: 
1. Coordinación institucional: El artículo 6 establece que "las entidades 
obligadas podrán convenir con las policías la transmisión de 
informaciones de seguridad que sean necesarias para prevenir los 
riesgos para la seguridad pública". 
2. Interoperabilidad de sistemas: El mismo artículo indica que las entidades 
obligadas "podrán utilizar los sistemas instalados por las empresas de 
seguridad privada que permitan comprobar la información de forma 
simultánea, interoperando para tal efecto". 
3. Sistemas integrados de seguridad bancaria: Para instituciones bancarias 
y financieras, el artículo 31 establece obligaciones específicas de 
seguridad en las áreas de cajas y espera de atención, que incluyen 
sistemas integrados de alerta. 
Diferencias con el régimen anterior 
La regulación de sistemas de alarmas y verificación presenta importantes 
avances respecto al régimen anterior: 
1. Mayor responsabilidad de las empresas: La obligación de verificación de 
alarmas y las consecuencias por falsas alarmas establecen un régimen 
de responsabilidad más estricto. 
2. Estándares técnicos unificados: La ley prevé un sistema de certificación 
y estándares técnicos homogéneos a nivel nacional. 
3. Enfoque integrado: Se promueve la interoperabilidad y coordinación 
entre distintos sistemas y entidades. 


4. Gradualidad sancionatoria: Se establece un régimen sancionatorio 
proporcionado que distingue entre infracciones de distinta gravedad. 
Esta regulación específica de los sistemas de alarmas y verificación busca 
maximizar su efectividad como herramientas preventivas y reactivas, 
minimizando al mismo tiempo los recursos desperdiciados por falsas alarmas, 
lo que representa un significativo avance en la profesionalización del sector. 

 

Seguridad en eventos masivos 
• Definición y clasificación de eventos 

 

 

Seguridad en eventos masivos: Definición y clasificación de eventos 
La Ley 21659 dedica su Título IV específicamente a la seguridad en eventos 
masivos, estableciendo un marco regulatorio detallado que define, clasifica y 
establece obligaciones para estos eventos. A continuación, se presenta un 
análisis en profundidad de cómo la ley define y clasifica estos eventos. 
Definición legal de evento masivo 
El artículo 64 establece una definición precisa de lo que constituye un evento 
masivo: 
"Evento masivo: Suceso programado, organizado por una o más personas 
naturales o jurídicas de cualquier tipo, en recintos o espacios públicos, privados 
o en bienes nacionales de uso público, que sean capaces de producir una 
amplia concentración de asistentes, con el objeto de participar en actividades, 
representaciones o exhibiciones de cualquier naturaleza." 
Esta definición contiene varios elementos esenciales: 
• Es un suceso programado y organizado (no espontáneo) 
• Puede ocurrir en espacios públicos, privados o bienes nacionales de uso 
público 
• Produce una amplia concentración de asistentes 
• Tiene un propósito específico (actividades, representaciones o 
exhibiciones) 
Criterios de clasificación cuantitativos 
La ley establece un criterio cuantitativo primario para determinar cuándo un 
evento es considerado masivo: 
"Se entenderá que son capaces de producir una amplia concentración de 
asistentes, aquellos eventos cuya concurrencia estimada sea de más de 3.000 
personas." 


Este umbral de 3.000 personas constituye la línea divisoria básica para aplicar 
automáticamente las disposiciones del Título IV. 
Criterios de clasificación cualitativos 
Además del criterio cuantitativo, la ley introduce criterios cualitativos 
importantes que amplían el alcance de la definición: 
"Aun cuando su concurrencia estimada sea inferior a 3.000 personas, se 
considerarán también eventos masivos, y quedarán sujetos a esta ley aquellas 
actividades que, por sus características específicas, requieran, en su 
organización y desarrollo, la adopción de medidas especiales tendientes a 
evitar riesgos para la integridad de sus asistentes o bienes, así como 
alteraciones a la seguridad o el orden público, o cuando se efectúen en lugares 
que no están destinados en forma permanente a la realización de eventos 
masivos." 
Este párrafo establece dos criterios cualitativos alternativos: 
1. Necesidad de medidas especiales de seguridad: Cuando por las 
características del evento se requieran medidas extraordinarias de 
seguridad 
2. Lugar no habitual: Cuando el evento se realiza en espacios no destinados 
habitualmente a eventos masivos 
Autoridad decisoria para la clasificación 
La ley establece que la evaluación de los criterios cualitativos corresponde a la 
Delegación Presidencial Regional: 
"Para determinar los eventos que requerirán medidas especiales se tendrá en 
especial consideración el lugar, el público asistente, si el espectáculo se 
desarrolla en un bien nacional de uso público, la fecha de su realización, las 
circunstancias climáticas o ambientales, entre otras, lo que será evaluado por 
la Delegación Presidencial Regional respectiva." 
Este mecanismo permite una evaluación caso a caso, considerando las 
particularidades de cada evento y su contexto específico. 
Categorización de organizadores 
La ley distingue entre diferentes tipos de organizadores, estableciendo 
regímenes distintos: 
1. Organizador habitual: "Se considerará organizador habitual a toda 
persona natural o jurídica cuya actividad comprenda, ordinariamente, la 
realización de eventos masivos y en todo caso a las personas naturales 
o jurídicas que celebren más de cinco eventos masivos en un plazo de 
doce meses corridos." 


2. Organizador ocasional: Por exclusión, serían aquellos que organizan 
eventos masivos de manera esporádica (menos de cinco al año). 
3. Productora de evento masivo: "Persona natural o jurídica a quien el 
organizador le encarga la ejecución del evento y que se guía por los 
lineamientos y presupuesto definido por éste." 
La ley establece que los organizadores habituales tienen la obligación 
adicional de inscribirse ante la Subsecretaría de Prevención del Delito. 
Recintos habituales para eventos masivos 
El artículo 66 introduce una categoría especial para recintos: 
"Los propietarios o administradores de un recinto podrán solicitar que la 
Delegación Presidencial Regional respectiva declare dicho recinto como 
habitual en la celebración de eventos masivos." 
Estos recintos habituales reciben un tratamiento diferenciado: 
• Deben ser inscritos en el sub-registro de eventos masivos 
• Pueden contar con un plan de seguridad estándar que no requiere ser 
presentado para cada evento 
• Tienen un procedimiento simplificado de autorización 
Exclusiones específicas 
La ley establece claramente qué tipos de eventos o actividades quedan 
excluidos de la aplicación del Título IV: 
"No quedarán sujetas a este Título las actividades que ordinariamente realicen 
los establecimientos gastronómicos o de entretenimiento, tales como teatros, 
cines, bares, discotecas o restaurantes, de acuerdo a las patentes comerciales 
que posean de conformidad a la ley, salvo que organicen un evento que 
cumpla con las características del numeral 1 del artículo 64." 
Además, se excluyen explícitamente: 
• Espectáculos de fútbol profesional (regulados por la ley N° 19.327) 
• Eventos deportivos del artículo 164 de la Ley de Tránsito 
• Actos relacionados con el derecho de reunión (regulados por el decreto 
N° 1.086 del Ministerio del Interior) 
Sin embargo, la ley establece que estas actividades pueden quedar sujetas a 
las disposiciones del Título IV "en los aspectos o materias no regulados en sus 
respectivas normativas y siempre que ellas no fueren contrarias a estos 
últimos." 
Esta detallada categorización y definición de eventos masivos permite un 
enfoque regulatorio diferenciado según el tipo, magnitud y características 
específicas de cada evento, estableciendo un régimen más proporcional y 
adaptado a los distintos niveles de riesgo. 


 

• Plan de seguridad específico 

 

Plan de seguridad específico para eventos masivos 
El plan de seguridad constituye uno de los elementos centrales del nuevo 
régimen para eventos masivos establecido por la Ley 21659. Este instrumento 
es definido en el artículo 64, numeral 6, como: 
"Instrumento que contiene las medidas que se implementarán en el evento 
masivo para proteger eficazmente la vida, la integridad física y psíquica y 
bienes de los participantes y de terceros, así como para precaver o disminuir 
los riesgos asociados a su realización y las alteraciones a la seguridad y al 
orden público." 
Contenido obligatorio del plan de seguridad 
El artículo 72 establece el contenido mínimo obligatorio que debe incluir todo 
plan de seguridad para eventos masivos: 
1. Medidas de seguridad específicas: Deben detallarse según el tipo de 
evento de que se trate, reconociendo que distintos tipos de eventos 
presentan desafíos de seguridad diferentes. 
2. Identificación del responsable de seguridad: Se debe individualizar a la 
persona natural designada como responsable de seguridad del evento 
masivo, quien velará por el adecuado cumplimiento de las normas y la 
correcta aplicación del plan de seguridad. 
3. Personal de seguridad privada: El plan debe incluir: 
o Individualización completa del personal 
o Cantidad y distribución según criterios técnicos 
o Turnos que cubrirán 
o Descripción del uniforme, equipamiento y credenciales 
o En caso de contar con guardias de seguridad, la directiva de 
funcionamiento respectiva 
4. Medidas sobre manejo de valores: Si corresponde, el plan debe detallar 
las medidas de seguridad para el manejo de dinero y valores, 
individualizando a la empresa de transporte de valores que se utilizará, 
en caso de ser necesario. 
5. Sistemas de alarmas: Describir los sistemas de alarmas para evacuación 
en caso de emergencia, si existieren. 
6. Control de acceso: Detallar las medidas de control e identificación para 
el acceso de los asistentes al evento masivo, si existieren. 


7. Prevención de riesgos y accidentes: Este aspecto es particularmente 
relevante y debe formalizarse en un informe adjunto al plan de 
seguridad, que debe ser elaborado por un prevencionista de riesgos 
profesional, previa visita al lugar de celebración del evento. La ley exige 
que se adjunte el certificado de título del profesional que lo evacúa. 
8. Elementos adicionales: La ley permite incluir cualquier otro elemento que 
el organizador considere relevante para la seguridad del evento. 
Desarrollo del plan y procedimiento de aprobación 
La ley establece que el plan de seguridad debe ser presentado como parte de 
la solicitud de autorización para realizar el evento masivo (artículo 71). Una vez 
recibido, la Delegación Presidencial Regional coordina con: 
1. El Ministerio encargado de la Seguridad Pública y la autoridad 
fiscalizadora, para que se pronuncien sobre el cumplimiento de las 
normas de seguridad privada. 
2. La municipalidad correspondiente, para evaluar el impacto en el entorno 
urbano. 
3. Organismos públicos pertinentes (SEREMI de Salud, SEC, SEREMI de 
Transportes, etc.). 
Estos organismos pueden proponer medidas adicionales de seguridad que 
deben ser consideradas por la Delegación Presidencial Regional en la 
resolución que autorice el evento. 
Carácter vinculante del plan 
El artículo 74 establece que la Delegación Presidencial Regional, con el mérito 
de la información recibida, puede exigir medidas de seguridad adicionales a 
las contempladas en el plan de seguridad presentado inicialmente. Estas 
medidas adicionales serán incorporadas en la resolución que autoriza el 
evento. 
El incumplimiento del plan de seguridad aprobado constituye una infracción 
gravísima según el artículo 95, numeral 1, que establece como tal "no adoptar, 
de conformidad al plan de seguridad, las medidas suficientes para proteger la 
vida, la integridad física y psíquica, y bienes de los participantes y de terceros". 
Plan de seguridad en recintos habituales 
La ley establece un régimen especial para recintos habituales de eventos 
masivos. El artículo 72, inciso final, indica: 
"Cuando el recinto en el que se lleve a cabo el evento se encuentre autorizado 
e inscrito en el sub-registro de eventos masivos correspondiente, de 
conformidad a lo establecido en el artículo 84, el organizador podrá elaborar 
un plan de seguridad estándar que se someterá a la aprobación de la 


Delegación Presidencial Regional respectiva. Ésta lo eximirá de presentar uno 
nuevo en cada ocasión, salvo que se modifiquen las circunstancias que dieron 
lugar a su aprobación." 
Este mecanismo simplifica el procedimiento para eventos recurrentes en 
recintos específicamente diseñados para ello, reduciendo la carga 
administrativa pero manteniendo los estándares de seguridad. 
Presencia de Carabineros como medida especial 
El artículo 73 aborda un aspecto específico que puede incluirse en el plan de 
seguridad: 
"En caso de requerirse la presencia de Carabineros de Chile durante el evento, 
atendido el riesgo que pueda existir para la seguridad y orden público, el 
organizador deberá señalarlo como medida en el plan de seguridad 
establecido en el artículo anterior, lo que quedará sujeto a la autorización de la 
Delegación Presidencial Regional y del Ministerio encargado de la Seguridad 
Pública, previo informe de Carabineros de Chile." 
Esta disposición reconoce que en ciertos eventos de alto riesgo puede ser 
necesaria la presencia de fuerza pública, pero establece un procedimiento 
formal para solicitarla y aprobarla. 
Implementación, seguimiento y responsabilidad 
La implementación del plan de seguridad es responsabilidad del organizador 
y del responsable de seguridad designado. La ley establece varias 
disposiciones para asegurar su efectivo cumplimiento: 
1. Obligación de cumplimiento: El artículo 70, numeral 1, establece como 
deber del organizador "implementar las medidas de seguridad 
establecidas en el plan de seguridad, así como todas aquellas 
adicionales que determine el Delegado Presidencial Regional respectivo." 
2. Revocación de autorización: Según el artículo 78, la Delegación 
Presidencial Regional puede revocar o suspender la autorización 
otorgada en caso de "incumplimiento de la ley, de su reglamento o de 
cualquiera de las medidas impuestas por la autoridad que 
comprometan la seguridad de los asistentes, de terceros o el orden 
público." 
3. Responsabilidad solidaria: El artículo 80 establece que "los organizadores 
y productores de un evento masivo responderán solidariamente por 
todos los daños que se produzcan con ocasión de su celebración." 
Innovaciones respecto al régimen anterior 
El plan de seguridad específico establecido por la Ley 21659 presenta varias 
innovaciones importantes: 


1. Carácter técnico y profesional: Se requiere la participación de 
profesionales especializados, particularmente en lo relativo a la 
prevención de riesgos. 
2. Enfoque integral: Abarca aspectos de seguridad física, manejo de 
emergencias, control de accesos y prevención de riesgos. 
3. Adaptabilidad según riesgo: Permite exigir medidas adicionales según la 
evaluación específica de cada evento. 
4. Eficiencia administrativa: Permite planes estándar para recintos 
habituales, equilibrando seguridad con simplificación de trámites. 
5. Coordinación interinstitucional: Promueve la coordinación entre 
diferentes organismos públicos para evaluar y complementar el plan. 
Este enfoque integral y técnico del plan de seguridad constituye uno de los 
pilares fundamentales del nuevo régimen para eventos masivos, buscando 
profesionalizar la gestión de la seguridad en estas actividades y establecer 
responsabilidades claras para sus organizadores. 

 

• Autorizaciones requeridas 
Autorizaciones requeridas para eventos masivos 
La Ley 21659 establece un detallado procedimiento administrativo para 
obtener la autorización necesaria para realizar eventos masivos. Este régimen 
busca garantizar que todos los eventos que concentren gran cantidad de 
público cuenten con las medidas de seguridad adecuadas y hayan sido 
evaluados preventivamente por las autoridades competentes. 
Obligatoriedad y autoridad competente 
El artículo 71 establece claramente la obligatoriedad de la autorización: 
"Los organizadores de un evento masivo de los que trata este Título deberán 
solicitar autorización para su realización ante la Delegación Presidencial 
Regional correspondiente al lugar donde se celebrará, en el plazo, forma y 
según el procedimiento establecido en el reglamento de este Título." 
Aspectos clave: 
• La autorización es obligatoria para todos los eventos masivos definidos 
en el artículo 64 
• La autoridad competente es la Delegación Presidencial Regional 
correspondiente al territorio donde se realizará el evento 
• Constituye una infracción gravísima realizar un evento masivo sin contar 
con esta autorización (artículo 95, numeral 3) 
Contenido de la solicitud de autorización 


La solicitud debe contener, según el artículo 71, al menos la siguiente 
información y antecedentes: 
1. Información del organizador: Domicilio y correo electrónico 
2. Descripción del evento: Tipo de evento y caracterización detallada 
3. Aspectos logísticos: Día, lugar, hora y horarios de labores de montaje y 
desmontaje de instalaciones 
4. Entradas: Forma de venta y cantidad de entradas disponibles, que no 
puede superar el aforo de seguridad del recinto 
5. Aforo estimado: Número esperado de asistentes, que nunca puede 
superar el aforo de seguridad del recinto 
6. Control de acceso: Descripción de los sistemas de control e identificación 
de asistentes 
7. Seguro: Datos del seguro de responsabilidad civil obligatorio 
8. Permisos adicionales: Solicitudes de permisos, patentes y autorizaciones 
especiales requeridas por otros organismos 
9. Plan de seguridad: Documento detallado según lo especificado en el 
artículo 72 
10. Mitigación de impacto: Medidas que mitiguen el impacto vecinal y 
acciones para el aseo y ornato del entorno 
11. Información adicional: Cualquier otro antecedente requerido según el 
tipo específico de evento 
Procedimiento administrativo 
Plazos y admisibilidad 
La ley establece que: 
• Las solicitudes extemporáneas no serán admitidas a tramitación 
• Excepcionalmente, la Delegación Presidencial Regional puede admitir 
solicitudes fuera de plazo en casos calificados 
El artículo 74 establece que al recibir la solicitud, la autoridad verificará que: 
• Esté completa la información requerida 
• No existan errores o inconsistencias 
• Si los hay, requerirá que sean subsanados o solicitará información 
adicional 
Consulta a organismos técnicos 
Un aspecto fundamental del procedimiento es la coordinación 
interinstitucional. El artículo 74 establece que la Delegación Presidencial 
Regional debe oficiar a: 
1. Ministerio de Seguridad Pública y autoridad fiscalizadora: Para verificar el 
cumplimiento de normas de seguridad privada 


2. Municipalidad: Para que se pronuncie sobre medidas de mitigación de 
impacto vecinal y aseo 
3. Organismos técnicos pertinentes: Según el tipo de evento, pueden incluir: 
o SEREMI de Salud 
o Superintendencia de Electricidad y Combustibles 
o SEREMI de Transportes y Telecomunicaciones (para eventos que 
afecten el tránsito) 
o Otras autoridades pertinentes 
Estas instituciones deben: 
• Pronunciarse dentro del plazo establecido por el reglamento 
• Pueden proponer medidas adicionales para la realización del evento 
• Si no responden en el plazo establecido, se entiende que no tienen 
objeciones 
La norma establece una excepción importante: 
"...con excepción de la presencia de Carabineros de Chile, medida que 
necesariamente deberá ser autorizada por el Ministerio encargado de la 
Seguridad Pública." 
Resolución final 
El artículo 75 establece que, cumplidos los trámites anteriores, la Delegación 
Presidencial Regional emitirá una resolución fundada que debe contener, al 
menos: 
1. Identificación del organizador, la productora y el responsable de 
seguridad 
2. Recinto donde se desarrollará el evento (indicando si es habitual o no) 
3. Plan de seguridad aprobado, con detalle del personal de seguridad y 
medidas adicionales 
Esta resolución debe ser notificada al organizador por correo electrónico en el 
plazo de cinco días y comunicada a los organismos públicos involucrados. 
Revocación o suspensión de autorizaciones 
La ley establece un régimen de revocación o suspensión de autorizaciones en 
el artículo 78: 
"La Delegación Presidencial Regional podrá revocar o suspender la autorización 
que se haya otorgado a los organizadores del evento para su realización. Ello 
se realizará mediante resolución fundada, previo informe de la autoridad 
fiscalizadora, en cualquier momento y hasta antes de la realización del evento, 
en caso de incumplimiento de la ley, de su reglamento o de cualquiera de las 
medidas impuestas por la autoridad que comprometan la seguridad de los 
asistentes, de terceros o el orden público..." 


Las causales incluyen: 
• Incumplimiento normativo 
• Desaparición de las circunstancias que motivaron el otorgamiento 
• Aparición de circunstancias que habrían justificado su rechazo 
La resolución puede ser revertida si el organizador subsana las observaciones 
realizadas. 
Rechazo de solicitudes 
El artículo 79 establece el deber de rechazar solicitudes en ciertos casos: 
"La Delegación Presidencial Regional deberá siempre rechazar la solicitud 
cuando no constate el cabal cumplimiento por parte del organizador de las 
medidas exigidas en virtud de las normativas sectoriales pertinentes." 
Cuando la autorización es denegada, la Delegación Presidencial Regional 
puede adoptar medidas preventivas para garantizar el orden público y la 
seguridad. 
Casos especiales: recintos habituales 
La ley establece un régimen simplificado para recintos habituales de eventos 
masivos en el artículo 66: 
"Los propietarios o administradores de un recinto podrán solicitar que la 
Delegación Presidencial Regional respectiva declare dicho recinto como 
habitual en la celebración de eventos masivos." 
Ventajas de este reconocimiento: 
• Permite un plan de seguridad estándar (artículo 72) 
• Simplifica el proceso de autorización para eventos futuros 
• Reduce la documentación requerida para cada evento 
Este reconocimiento requiere autorización de la Delegación Presidencial 
Regional, previa consulta al Ministerio encargado de la Seguridad Pública, y 
posterior inscripción en el sub-registro correspondiente. 
Innovaciones respecto al régimen anterior 
El procedimiento de autorización establecido por la Ley 21659 presenta varias 
innovaciones significativas: 
1. Centralización de la autoridad: Establece claramente a la Delegación 
Presidencial Regional como autoridad única de autorización 
2. Coordinación interinstitucional formalizada: Establece un mecanismo 
específico de consulta a diferentes organismos técnicos 
3. Régimen simplificado para recintos habituales: Reconoce la 
particularidad de los recintos especializados en eventos 
4. Enfoque preventivo: Permite medidas adicionales de seguridad según la 
evaluación específica 


5. Notificación electrónica: Moderniza el sistema de comunicaciones 
estableciendo el correo electrónico como medio oficial 
Este sistema de autorizaciones constituye un pilar fundamental del nuevo 
régimen para eventos masivos, asegurando una evaluación técnica integral y 
una respuesta institucional coordinada ante los desafíos de seguridad que 
representan estos eventos. 

 

• Responsabilidades de organizadores 

 

Responsabilidades de organizadores de eventos masivos 
La Ley 21659 establece un detallado marco de responsabilidades para los 
organizadores de eventos masivos, estableciendo obligaciones específicas 
antes, durante y después del evento. Este régimen busca profesionalizar el 
sector y garantizar adecuados niveles de seguridad para los asistentes. 
Deberes generales de los organizadores 
El artículo 70 establece un catálogo completo de las obligaciones que deben 
cumplir los organizadores de eventos masivos: 
1. Adopción de medidas preventivas: "Adoptar las medidas de prevención 
y protección de riesgos inherentes a la actividad, y todas las medidas 
técnicas necesarias y suficientes que los organizadores, dentro de su 
esfera de control, deban adoptar con dicho propósito." 
Esta obligación implica implementar todas las medidas establecidas en el plan 
de seguridad aprobado, así como las adicionales que determine la Delegación 
Presidencial Regional. 
2. Deber de denuncia: "Denunciar, dentro de las 24 horas siguientes, ante la 
autoridad que corresponda, los hechos que revistan caracteres de delito 
que presencien o de los que tomen conocimiento con ocasión del evento 
masivo, en especial, los que les afecten a ellos o a los asistentes." 
Este deber incluye: 
o Proporcionar información para identificar responsables 
(grabaciones, fotografías) 
o Entregar estos antecedentes a policías o al Ministerio Público 
oportunamente 


3. Cooperación con fiscalización: "Entregar a la autoridad competente, a la 
mayor brevedad, los antecedentes que le sean requeridos para la 
adecuada fiscalización de esta ley, tales como grabaciones, registro de 
asistentes, documentos de la organización e informes técnicos." 
4. Infraestructura adecuada: "Contar con accesos y salidas adecuados 
para la cantidad de público estimada, y establecer accesos y salidas 
preferenciales para personas con dificultad de desplazamiento, así 
como para quienes asistan con menores de edad, mujeres 
embarazadas, personas en situación de discapacidad y adultos 
mayores." 
5. Designación de responsable de seguridad: Están obligados a designar 
un responsable de seguridad del evento masivo, inscribir esta 
designación en el sub-registro respectivo e informar oportunamente a la 
Delegación Presidencial Regional. 
6. Contratación de seguros: "Contratar un seguro con el objeto de 
garantizar la reparación de los daños o perjuicios que, con motivo u 
ocasión de la realización del evento masivo, se causen a los asistentes, a 
terceros o a bienes públicos o privados ubicados en el recinto o espacio 
donde éste se desarrolle o en sus inmediaciones." 
Alternativamente, pueden proponer a la Delegación Presidencial Regional otra 
caución para cubrir indemnizaciones. 
7. Personal de seguridad privada: "Contratar guardias de seguridad 
privada, en conformidad a las normas señaladas en esta ley." 
8. Recursos tecnológicos: "Instalar y utilizar recursos tecnológicos, tales 
como cámaras de seguridad, detectores de metales u otros que sean 
necesarios para resguardar adecuadamente la seguridad de los 
asistentes y sus bienes." 
En caso de contar con cámaras, deben monitorearse permanentemente y 
resguardar las imágenes por el período reglamentario. 
9. Procedimiento de autorización: Deben presentar la solicitud de 
autorización establecida en el párrafo 4 del Título IV. 
10. Registro para organizadores habituales: Los organizadores habituales 
deben inscribirse en el sub-registro de eventos masivos del Registro de 
Seguridad Privada. 


11. Colaboración con autoridades: "Seguir las instrucciones operativas 
dispuestas por Carabineros de Chile." 
12. No discriminación: "Dar cumplimiento a las normas de no discriminación, 
de acuerdo a lo dispuesto en la ley N° 20.609" (Ley Antidiscriminación). 
Responsabilidades según el ciclo de vida del evento 
Responsabilidades previas al evento 
1. Obtención de autorizaciones: Obtener la autorización de la Delegación 
Presidencial Regional y otros permisos sectoriales necesarios. 
2. Planificación de seguridad: Elaborar y presentar el plan de seguridad 
completo según lo establecido en el artículo 72. 
3. Contratación de seguros: Adquirir pólizas de seguro o constituir 
cauciones previas para responder por posibles daños. 
4. Coordinación institucional: Realizar las gestiones de coordinación con 
autoridades fiscalizadoras y otros organismos públicos. 
5. Medidas de mitigación de impacto: Establecer medidas para mitigar el 
impacto vecinal y coordinarse con la municipalidad para el aseo y 
ornato. 
Responsabilidades durante el evento 
1. Implementación del plan: Ejecutar todas las medidas aprobadas en el 
plan de seguridad. 
2. Monitoreo constante: Mantener el monitoreo permanente de cámaras y 
sistemas de seguridad. 
3. Control de aforo: Asegurar que el número de asistentes no supere el aforo 
de seguridad autorizado. 
4. Respuesta a emergencias: Aplicar los protocolos establecidos ante 
cualquier situación de emergencia. 
5. Coordinación con autoridades: Mantener comunicación constante con 
las autoridades fiscalizadoras presentes. 
Responsabilidades posteriores al evento 
1. Cooperación en investigaciones: Proporcionar antecedentes sobre 
hechos delictivos ocurridos. 


2. Atención de reclamos: Recibir y gestionar reclamos de asistentes por 
daños o incidentes. 
3. Reparación de daños: Responder por los daños causados al espacio 
público o a terceros. 
4. Desmontaje seguro: Realizar el desmontaje de instalaciones en 
condiciones seguras. 
Responsabilidad civil de los organizadores 
El artículo 80 establece un régimen de responsabilidad civil solidaria: 
"Sin perjuicio de las sanciones que impone esta ley, los organizadores y 
productores de un evento masivo responderán solidariamente por todos los 
daños que se produzcan con ocasión de su celebración, tanto respecto de las 
personas asistentes como de los trabajadores, y también respecto del daño a 
bienes públicos e infraestructura privada. Asimismo, serán responsables del 
incumplimiento de lo dispuesto en el numeral 10 del artículo 71." 
Este régimen de responsabilidad presenta características específicas: 
1. Carácter solidario: Tanto el organizador como la productora responden 
por el total de los daños, sin perjuicio de las acciones de repetición entre 
ellos. 
2. Amplio alcance: Cubre daños a asistentes, trabajadores y bienes 
públicos o privados. 
3. Relación con el seguro obligatorio: Se conecta con la obligación de 
contratar seguros establecida en el numeral 6 del artículo 70. 
4. Complementariedad con responsabilidad contractual: Esta 
responsabilidad es complementaria a las obligaciones establecidas en 
la ley N° 19.496 de protección al consumidor (artículo 77). 
Sanciones por incumplimiento 
La ley establece un régimen sancionatorio diferenciado según la gravedad de 
las infracciones: 
Infracciones gravísimas (Artículo 95) 
Se consideran infracciones gravísimas de los organizadores: 
1. No adoptar las medidas de seguridad suficientes según el plan 
aprobado 


2. Proporcionar información falsa a las autoridades 
3. Realizar eventos masivos sin autorización 
4. Ofrecer más entradas que el aforo autorizado 
5. No contratar seguro de responsabilidad civil cuando corresponda 
Estas infracciones son sancionadas con multas de 501 a 1.000 UTM (artículo 103). 
Infracciones graves (Artículo 97) 
Son infracciones graves: 
1. Contar con dispositivos de seguridad insuficientes o inadecuados 
2. No establecer accesos preferenciales para personas con movilidad 
reducida 
3. No implementar medidas adicionales determinadas por la autoridad 
4. Realizar eventos como organizador habitual sin estar registrado 
Estas infracciones son sancionadas con multas de 21 a 500 UTM. 
Infracciones leves (Artículo 99) 
"Incurrirán en infracciones leves los organizadores o productoras de eventos 
masivos que incurran en cualquier otra infracción que no sea catalogada 
como grave o gravísima." 
Estas infracciones se sancionan con multas de 2 a 20 UTM. 
Comparación con el régimen anterior 
El régimen de responsabilidades establecido por la Ley 21659 introduce varias 
innovaciones significativas: 
1. Sistematización de responsabilidades: Establece un catálogo detallado 
y sistemático de obligaciones, a diferencia del régimen anterior más 
disperso. 
2. Figura del responsable de seguridad: Crea esta figura específica con 
funciones definidas. 
3. Obligación de seguro: Establece la obligatoriedad de contar con seguro 
de responsabilidad civil. 
4. Responsabilidad solidaria: Define claramente la responsabilidad 
compartida entre organizador y productora. 


5. Énfasis en inclusión y accesibilidad: Incorpora obligaciones específicas 
relacionadas con personas con movilidad reducida y grupos vulnerables. 
6. Medidas de mitigación de impacto vecinal: Introduce la obligación de 
mitigar impactos en el entorno urbano. 
7. Monitoreo tecnológico: Establece obligaciones relacionadas con 
sistemas de vigilancia y resguardo de grabaciones. 
Este régimen integral de responsabilidades constituye uno de los pilares 
fundamentales del nuevo marco regulatorio para eventos masivos, 
estableciendo obligaciones claras que buscan profesionalizar el sector y 
garantizar adecuados niveles de seguridad para los asistentes. 

 

9. Régimen sancionatorio 
• Tipificación de infracciones 
Aspectos Generales 
• Objetivo principal: Regular la seguridad privada como actividad 
preventiva, coadyuvante y complementaria de la seguridad pública. 
• Deroga: Decreto Ley 3.607 (1981) y Ley 19.303, unificando la normativa. 
• Entrada en vigor: Seis meses después de publicación del último 
reglamento complementario. 
• Ámbito de aplicación: Personas naturales y jurídicas que desarrollen 
actividades de protección de personas, bienes o procesos productivos. 
Marco Institucional 
• Órgano rector: Subsecretaría de Prevención del Delito (autorización, 
regulación y supervisión). 
• Autoridad fiscalizadora: Carabineros de Chile, excepto en recintos bajo 
autoridad militar, marítima o aeronáutica. 
• Registro de Seguridad Privada: Centraliza información de entidades 
obligadas, empresas, personal y sanciones. 
Entidades Obligadas 
• Clasificación: Niveles de riesgo bajo, medio y alto según criterios 
técnicos. 


• Requisito fundamental: Contar con estudio de seguridad vigente 
autorizado. 
• Obligación especial: Entidades de alto riesgo deben implementar 
sistema de vigilancia privada (bancos, financieras, transportadoras de 
valores). 
• Estudios de seguridad: Vigencia de 4 años (general) o 2 años (con 
vigilancia privada). 
Personal de Seguridad 
• Vigilantes privados: Autorizados para portar armas, requieren curso 
especializado. 
• Guardias de seguridad: Sin armas, precisan aprobación de curso y 
licencia por 4 años. 
• Jefes de seguridad: Responsables del sistema de vigilancia, requieren 
título profesional. 
• Capacitación: Certificada por la Subsecretaría de Prevención del Delito. 
Empresas de Seguridad 
• Requisitos: Constitución legal, objeto social específico, medios 
adecuados. 
• Tipos principales: 
o Empresas de transporte de valores 
o Empresas de seguridad electrónica 
o Instituciones de capacitación 
Eventos Masivos 
• Definición: Sucesos programados con más de 3.000 asistentes o que 
requieran medidas especiales. 
• Obligaciones: Presentar plan de seguridad, contratar seguros, designar 
responsable. 
• Autorización: Otorgada por la Delegación Presidencial Regional 
correspondiente. 
Régimen Sancionatorio 


• Clasificación: Infracciones gravísimas, graves y leves. 
• Sanciones: Multas diferenciadas según tipo de infractor y gravedad. 
• Competencia: Juzgados de Policía Local. 
• Sanciones adicionales: Suspensión o revocación de autorizaciones, 
clausura de establecimientos. 
Implementación 
• Transición: Autoridades fiscalizadoras seguirán emitiendo 
autorizaciones hasta crear plataforma informática. 
• Plazo de adaptación: Entidades críticas tienen 6 meses para presentar 
nuevos estudios de seguridad tras la entrada en vigor. 
• Desafíos principales: Dictación oportuna de reglamentos, desarrollo de 
capacidades institucionales y adaptación del sector privado. 
Esta ley moderniza integralmente el marco regulatorio de la seguridad 
privada en Chile, estableciendo requisitos más claros, fortaleciendo la 
institucionalidad supervisora y promoviendo la profesionalización del sector. 

 

• Sanciones aplicables 
La ley establece un régimen de sanciones diferenciado según el tipo de 
infractor y la gravedad de la infracción: 
Entidades obligadas 
• Infracciones gravísimas: Multa de 650 a 13.500 UTM 
• Infracciones graves: Multa de 50 a 650 UTM 
• Infracciones leves: Multa de 15 a 50 UTM 
Empresas de seguridad privada e instituciones de capacitación 
• Infracciones gravísimas: Multa de 50 a 650 UTM 
• Infracciones graves: Multa de 15 a 50 UTM 
• Infracciones leves: Multa de 1,5 a 15 UTM 
Personas naturales y contratantes de servicios 
• Infracciones gravísimas: Multa de 3 a 20 UTM 


• Infracciones graves: Multa de 1 a 3 UTM 
• Infracciones leves: Multa de 0,5 a 1 UTM 
Organizadores de eventos masivos 
• Infracciones gravísimas: Multa de 501 a 1.000 UTM 
• Infracciones graves: Multa de 21 a 500 UTM 
• Infracciones leves: Multa de 2 a 20 UTM 
Sanciones adicionales 
• Suspensión temporal: De 3 a 6 meses para empresas de seguridad 
privada 
• Revocación de autorización: Por reincidencia en infracciones graves o 
gravísimas 
• Clausura: Temporal o definitiva de establecimientos (para entidades 
obligadas, solo la sucursal donde ocurrió la infracción) 
Atenuantes y reincidencia 
• Autodenuncia: Reducción hasta 80% de la multa por autodenuncia y 
colaboración 
• Reincidencia: Infracciones leves reiteradas se sancionan como graves; 
infracciones graves reiteradas se sancionan como gravísimas 
Las multas se gradúan considerando la gravedad del hecho, el daño causado, 
el perjuicio para el interés público, el riesgo creado y la conducta anterior del 
infractor. 

 

• Procedimientos ante los Juzgados de Policía Local 

 

Procedimientos ante los Juzgados de Policía Local 
Las infracciones a la Ley 21659 sancionadas con multa son procesadas 
mediante el siguiente procedimiento: 
Competencia y normativa aplicable 
• Tribunal competente: Juzgado de Policía Local correspondiente al 
domicilio del infractor 


• Procedimiento base: Se aplica el procedimiento ordinario establecido en 
la Ley 18.287 
• Normas complementarias: Disposiciones especiales del Título VI de la Ley 
21659 
Inicio del procedimiento 
• Denuncia por autoridad fiscalizadora: Cuando Carabineros u otra 
autoridad constate infracciones 
• Denuncia por Subsecretaría: La Subsecretaría de Prevención del Delito 
puede denunciar directamente 
• Autodenuncia: El infractor puede autodenunciarse para acceder a 
beneficios 
Mecanismo de autodenuncia y reducción de sanciones 
• Reducción estándar: Hasta 80% de la multa por autodenuncia voluntaria 
y colaboración 
• Escala para múltiples infractores: 
o Primer denunciante: Reducción del 90% 
o Segundo denunciante: Reducción del 60% 
o Demás denunciantes: Reducción máxima del 30% 
• Requisito: Aporte de antecedentes relevantes para esclarecer los hechos 
Plan de cumplimiento 
• Propósito: Regularización cuando no sea posible cumplir 
inmediatamente 
• Requisito: Aprobación por la Subsecretaría de Prevención del Delito 
• Consecuencia de incumplimiento: Reactivación del procedimiento con 
multa original más recargo del 50% 
Aspectos procesales destacados 
• Informes técnicos: El juez puede solicitar informes a la Subsecretaría o 
autoridad fiscalizadora 
• Sentencia: Debe ser remitida a la División de Seguridad Privada cuando 
quede ejecutoriada 


• Registro: Las sentencias condenatorias se incluyen en el Registro de 
Seguridad Privada 
Este procedimiento busca equilibrar la sanción con la regularización, 
ofreciendo incentivos para el cumplimiento voluntario mientras mantiene 
consecuencias efectivas para las infracciones. 

 

• Revocación de autorizaciones 
La Ley 21659 establece un mecanismo específico para la revocación de 
autorizaciones en materia de seguridad privada: 
Órgano competente 
• La Subsecretaría de Prevención del Delito es la única entidad facultada 
para suspender temporalmente o revocar autorizaciones. 
Causales de revocación 
• Reincidencia en infracciones gravísimas o graves 
• Pérdida de requisitos establecidos en la ley 
• Desaparición de las circunstancias que motivaron su otorgamiento 
• Circunstancias sobrevinientes que habrían justificado su denegación 
original 
Alcance según tipo de entidad 
• Empresas de seguridad privada: Revocación total de la autorización 
• Entidades obligadas: La clausura afecta solo a la sucursal, agencia u 
oficina donde se cometió la infracción 
Medidas alternativas 
• Si los requisitos faltantes son subsanables, se puede optar por una 
suspensión temporal mientras se acredita su cumplimiento 
• Para empresas de seguridad, la suspensión y clausura temporal no 
puede ser inferior a tres meses ni superior a seis meses 
Procedimiento administrativo 
1. Resolución fundada de la Subsecretaría de Prevención del Delito 
2. Notificación por la autoridad fiscalizadora 


3. Posibilidad de presentar recursos administrativos (Ley 19.880) 
4. Una vez agotada la vía administrativa, posibilidad de reclamo de 
ilegalidad 
Recursos judiciales 
• Reclamo de ilegalidad ante la Corte de Apelaciones con jurisdicción 
donde el acto produce efectos 
• Plazo: 5 días desde la notificación del acto administrativo 
• Contra la sentencia de la Corte de Apelaciones no procede recurso 
alguno 
La revocación de autorizaciones constituye la sanción más severa del sistema, 
aplicándose principalmente en casos de incumplimientos graves y reiterados 
de la normativa de seguridad privada. 
10. Implementación y transición 
• Entrada en vigor 
Entrada en vigor 
La Ley 21659 sobre seguridad privada establece un proceso gradual para su 
implementación: 
Vigencia general 
• La ley entrará en vigor seis meses después de la publicación en el Diario 
Oficial del último de sus reglamentos complementarios 
• Excepción: Las disposiciones transitorias tienen aplicación inmediata 
Plazos para reglamentación 
• El Ministerio encargado de la Seguridad Pública dispone de un año desde 
la publicación de la ley para dictar:  
o El reglamento general de la ley 
o El reglamento específico sobre eventos masivos 
Aplicación escalonada 
• Mientras no entre en vigencia la ley, continúan aplicándose: 
o Decreto Ley 3.607 (1981) 


o Ley 19.303 
o Sus respectivos reglamentos complementarios 
Publicación y divulgación 
• La fecha de publicación de la ley fue el 21 de marzo de 2024 
• La promulgación se realizó el 14 de marzo de 2024 
• El URL corto oficial es: https://bcn.cl/3k5xq 
Esta estructura de entrada en vigor diferida permite un período de adaptación 
para que tanto las autoridades como las entidades reguladas puedan 
prepararse adecuadamente para implementar el nuevo marco normativo, 
evitando disrupciones en el funcionamiento del sector de seguridad privada. 

 

• Período de adaptación para entidades actualmente obligadas 

 

Período de adaptación para entidades actualmente obligadas 
La Ley 21659 establece un régimen de transición diferenciado para las 
entidades que ya están obligadas bajo la normativa anterior: 
Entidades críticas (adaptación prioritaria) 
• Plazo especial: Deben presentar el primer estudio de seguridad dentro de 
los seis meses siguientes a la entrada en vigencia de la ley 
• Entidades específicas: 
o Empresas de transporte de valores 
o Instituciones bancarias y financieras 
o Empresas de apoyo al giro bancario que manejen dinero 
o Establecimientos de venta de combustibles 
• Obligación adicional: Deben cumplir esta exigencia aunque tengan 
estudios de seguridad vigentes bajo la normativa anterior 
Demás entidades obligadas 
• Período de transición extendido: Mantendrán su calidad de obligadas 
durante un máximo de dos años contados desde la entrada en vigencia 
de la ley 


• Proceso de reclasificación: Durante este período, la Subsecretaría de 
Prevención del Delito, con informe previo de la autoridad fiscalizadora, 
determinará mediante resolución si continúan como obligadas según los 
nuevos criterios 
Régimen normativo aplicable 
• Durante el período de transición, se mantiene vigente para estas 
entidades:  
o Decreto Ley 3.607 (1981) 
o Ley 19.303 
o Sus reglamentos complementarios 
• Esta normativa solo aplicará a las disposiciones específicas que regulan 
a estas entidades mientras se completa su transición 
Este mecanismo escalonado busca priorizar la adaptación de las entidades de 
mayor riesgo mientras permite un proceso ordenado para las demás, evitando 
disrupturas en la seguridad y dando tiempo para la implementación 
adecuada del nuevo sistema. 
• Validez de las autorizaciones existentes 
La Ley 21659 establece disposiciones claras sobre la continuidad de las 
autorizaciones durante el período de transición: 
Autorizaciones vigentes 
• Las autorizaciones otorgadas a personas naturales y jurídicas para 
ejercer actividades de seguridad privada mantienen su validez hasta la 
fecha de vencimiento conforme a la legislación anterior 
• No se requiere revalidación anticipada de estas autorizaciones 
• Aplica a vigilantes privados, guardias de seguridad, empresas de 
seguridad y otros actores autorizados 
Emisión de nuevas autorizaciones durante la transición 
• Las Prefecturas de Carabineros de Chile continuarán emitiendo las 
nuevas autorizaciones mientras no esté operativa la plataforma 
informática de la Subsecretaría 


• Se mantienen los procedimientos y requisitos vigentes hasta la plena 
implementación del nuevo sistema 
Transferencia de competencias 
• La facultad de otorgar autorizaciones se transferirá completamente a la 
Subsecretaría de Prevención del Delito cuando esté operativa la 
plataforma informática 
• El plazo máximo para la implementación de esta plataforma es de un 
año desde la entrada en vigencia de la ley 
• A partir de esa fecha, la Subsecretaría comenzará a emitir todas las 
autorizaciones correspondientes 
Acreditaciones y certificaciones 
• Los cursos de capacitación y certificaciones otorgadas bajo el régimen 
anterior mantienen su validez por el período por el cual fueron emitidas 
• Las nuevas certificaciones se irán adaptando gradualmente a los 
requisitos de la nueva ley 
Esta estrategia de transición busca garantizar la continuidad operativa del 
sector mientras se implementa progresivamente el nuevo marco regulatorio, 
evitando vacíos administrativos que pudieran afectar la seguridad. 

 

• Reglamentos complementarios 
La Ley 21659 establece la necesidad de diversos reglamentos para su 
implementación efectiva: 
Plazo y responsabilidad 
• El Ministerio encargado de la Seguridad Pública debe dictar los 
reglamentos en un plazo máximo de un año desde la publicación de la 
ley 
• La entrada en vigor de la ley depende directamente de la publicación del 
último reglamento complementario 
Reglamentos específicos mencionados 
1. Reglamento general de la ley 
2. Reglamento sobre eventos masivos 


3. Reglamento sobre clasificación de entidades obligadas (por niveles de 
riesgo) 
4. Reglamento sobre capacitación (contenidos y periodicidad) 
Principales materias a regular 
• Criterios de riesgo: Para clasificar entidades obligadas en niveles bajo, 
medio y alto 
• Estudios de seguridad: Forma, contenido y procedimientos 
• Requisitos técnicos: Para recursos tecnológicos y materiales de 
seguridad 
• Capacitación: Programas, exámenes y certificaciones 
• Características de uniformes y credenciales 
• Transporte de valores: Equipamiento, procedimientos y cuantías 
• Elementos defensivos: Especificaciones técnicas 
• Procedimientos de verificación para empresas de seguridad electrónica 
• Funcionamiento del Registro de Seguridad Privada 
Función normativa 
• Los reglamentos detallarán los aspectos operativos de la ley 
• Proporcionarán las especificaciones técnicas necesarias 
• Definirán procedimientos administrativos específicos 
• Establecerán estándares mínimos exigibles 
La ley delega en estos instrumentos aspectos técnicos y procedimentales 
clave, por lo que su dictación oportuna y completa es esencial para la correcta 
implementación del nuevo sistema de seguridad privada. 

 

11. Conclusiones 
• Principales avances respecto al régimen anterior 

 

Principales avances respecto al régimen anterior 


La Ley 21659 introduce mejoras sustanciales sobre la normativa precedente: 
Institucionalidad robustecida 
• Órgano rector único: Centraliza en la Subsecretaría de Prevención del 
Delito las funciones anteriormente dispersas 
• Separación de roles: Distingue claramente entre funciones reguladoras 
(Subsecretaría) y fiscalizadoras (Carabineros) 
• Mayor jerarquía normativa: Eleva a rango legal materias antes reguladas 
por decreto 
Criterios técnicos objetivos 
• Clasificación por riesgo: Establece parámetros objetivos para determinar 
obligaciones según nivel de riesgo (bajo, medio, alto) 
• Estudios de seguridad estandarizados: Define contenidos mínimos y 
procedimientos uniformes 
• Especificaciones técnicas: Actualiza requisitos tecnológicos conforme a 
avances contemporáneos 
Profesionalización del sector 
• Mayores exigencias formativas: Eleva requisitos de capacitación para 
todo el personal 
• Certificación centralizada: Sistema unificado de acreditación de 
competencias 
• Jefes de seguridad profesionales: Exige título profesional para 
responsables de sistemas de vigilancia 
Ampliación del ámbito regulatorio 
• Inclusión de eventos masivos: Incorpora un área no regulada 
anteriormente 
• Regulación de empresas de seguridad electrónica: Actualiza normativa 
frente a nuevas tecnologías 
• Tratamiento especializado de distintos servicios: Diferencia requisitos 
según tipos de actividad 
Registro y trazabilidad 


• Sistema integrado de información: Crea registro único con múltiples sub-
registros 
• Mayor transparencia: Facilita verificación de autorizaciones y 
seguimiento de infracciones 
• Interoperabilidad: Establece bases para intercambio de información 
entre organismos públicos 
Régimen sancionatorio efectivo 
• Graduación de infracciones: Tipifica detalladamente los incumplimientos 
según gravedad 
• Sanciones proporcionales: Multas diferenciadas según tipo de entidad y 
capacidad económica 
• Incentivos al cumplimiento: Mecanismos de autodenuncia y planes de 
regularización 
Esta modernización normativa responde a la evolución del sector y a la 
necesidad de mayores estándares de calidad y seguridad, estableciendo un 
marco regulatorio integrado que supera la fragmentación y desactualización 
del sistema anterior. 

 

• Desafíos en la implementación 
Desafíos en la implementación 
La implementación efectiva de la Ley 21659 enfrenta importantes desafíos: 
Desarrollo reglamentario 
• Complejidad técnica: Los reglamentos deben equilibrar exigencia y 
viabilidad práctica 
• Plazos ajustados: Un año para desarrollar múltiples cuerpos normativos 
detallados 
• Consulta sectorial: Necesidad de incorporar visión de actores relevantes 
sin captura regulatoria 
Capacidades institucionales 
• Fortalecimiento organizacional: La Subsecretaría de Prevención del Delito 
requiere recursos humanos especializados 


• Infraestructura tecnológica: Desarrollo de plataforma informática 
robusta en un año 
• Capacidad de procesamiento: Volumen significativo de autorizaciones, 
estudios y registros a gestionar 
Transición ordenada 
• Reclasificación de entidades: Revisión de miles de entidades 
actualmente obligadas 
• Continuidad operativa: Evitar interrupciones en servicios críticos durante 
el cambio normativo 
• Gestión de expectativas: Comunicación clara sobre plazos y requisitos 
transitorios 
Adaptación del sector 
• Inversión privada: Actualización de sistemas, procedimientos y 
equipamientos 
• Costos de cumplimiento: Especialmente desafiantes para pequeñas y 
medianas empresas 
• Resistencia al cambio: Superar inercias de prácticas establecidas bajo el 
régimen anterior 
Formación especializada 
• Oferta educativa: Desarrollo de instituciones capacitadoras que 
cumplan nuevos estándares 
• Actualización profesional: Miles de vigilantes y guardias requieren 
recertificación 
• Formación de formadores: Capacitadores que dominen los nuevos 
contenidos exigidos 
Coordinación interinstitucional 
• Articulación efectiva: Entre Subsecretaría, Carabineros y otras 
autoridades fiscalizadoras 
• Gestión de información: Sistemas interoperables entre distintas 
instituciones públicas 


• Criterios unificados: Interpretación homogénea de la normativa entre 
distintos actores 
Superar estos desafíos requerirá planificación estratégica, asignación 
adecuada de recursos y compromiso sostenido tanto del sector público como 
privado para lograr una implementación exitosa. 

 

• Impacto esperado en el sector de seguridad privada 
Impacto esperado en el sector de seguridad privada 
La Ley 21659 generará transformaciones significativas en el ecosistema de 
seguridad privada chileno: 
Mercado y estructura empresarial 
• Consolidación del sector: Probable reducción de operadores informales 
y concentración en empresas más profesionalizadas 
• Barreras de entrada: Mayores requisitos técnicos y financieros para 
nuevos entrantes 
• Especialización: Desarrollo de nichos especializados según tipos de 
servicios regulados 
Profesionalización 
• Mejora en remuneraciones: Tendencia al alza por mayor cualificación 
exigida 
• Carrera profesional: Desarrollo de trayectorias laborales estructuradas 
• Dignificación: Reconocimiento formal del rol complementario con la 
seguridad pública 
Innovación y tecnología 
• Actualización tecnológica: Adopción acelerada de sistemas modernos 
de seguridad electrónica 
• Integración de sistemas: Mayor interoperabilidad entre distintas 
soluciones técnicas 
• Análisis de datos: Incorporación progresiva de big data y analítica 
predictiva 


Calidad y eficacia 
• Estándares elevados: Mejor servicio por certificación de competencias y 
fiscalización efectiva 
• Mayor cobertura: Expansión ordenada en áreas anteriormente 
desatendidas o informales 
• Reducción de incidentes: Disminución esperable de fallos operativos y 
negligencias 
Relación público-privada 
• Complementariedad efectiva: Mejor coordinación con fuerzas de orden 
público 
• Contribución a políticas de seguridad: Datos del sector privado 
informando políticas públicas 
• Reconocimiento institucional: Legitimación del rol coadyuvante de la 
seguridad privada 
Percepción social 
• Confianza pública: Mayor credibilidad por regularización y 
profesionalización 
• Transparencia: Mejor información sobre empresas, personal y servicios 
autorizados 
• Responsabilidad social: Enfoque en derechos humanos y protección de 
grupos vulnerables 
Inversión sectorial 
• Modernización de infraestructura: Actualización de equipamiento, 
uniformes y sistemas 
• Desarrollo formativo: Inversión significativa en capacitación y 
certificación 
• Servicios de valor agregado: Evolución hacia servicios integrados de 
seguridad y gestión de riesgos 
Esta transformación del sector aportará previsiblemente a la construcción de 
un sistema de seguridad más estructurado, profesional y efectivo, 
contribuyendo positivamente a la seguridad integral del país.
Decreto 209
APRUEBA REGLAMENTO DE SEGURIDAD PRIVADA DE LA LEY N° 21.659
SOBRE SEGURIDAD PRIVADA
MINISTERIO DE SEGURIDAD PÚBLICA; SUBSECRETARÍA DE PREVENCIÓN
DEL DELITO

Fecha Publicación: 27-MAY-2025 | Fecha Promulgación: 18-JUN-2024
Tipo Versión: Con Vigencia Diferida por Fecha De : 28-NOV-2025
Url Corta: https://bcn.cl/vWLa0b

APRUEBA REGLAMENTO DE SEGURIDAD PRIVADA DE LA LEY N° 21.659 SOBRE SEGURIDAD PRIVADA 
     
     Núm. 209.- Santiago, 18 de junio de 2024.
     
     Vistos:
     
     Lo dispuesto en los artículos 32 N° 6, 35 y 101, inciso 2°, de la
Constitución Política de la República, cuyo texto refundido, coordinado y
sistematizado fue fijado mediante el decreto N° 100, de 2005, del Ministerio
Secretaría General de la Presidencia; la Ley N° 18.575, Orgánica Constitucional de
Bases Generales de la Administración del Estado, cuyo texto refundido, coordinado y
sistematizado fue fijado mediante el decreto con fuerza de ley N° 1-19.653, de 2000,
del Ministerio Secretaría General de la Presidencia; la Ley N° 19.880, que
Establece Bases de los Procedimientos Administrativos que Rigen los Actos de los
Órganos de la Administración del Estado; la Ley N° 20.502, que crea el Ministerio
del Interior y Seguridad Pública y el Servicio Nacional para la Prevención y
Rehabilitación del Consumo de Drogas y Alcohol, y modifica diversos cuerpos legales;
el decreto ley N° 3.607, de 1981, que deroga el decreto ley N° 194, de 1973, y
establece nuevas normas sobre funcionamiento de vigilantes privados; la ley N°
19.303, que establece obligaciones a entidades que indica, en materia de seguridad de
las personas, así como sus reglamentos complementarios; la Ley N° 21.659 sobre
Seguridad Privada; y la resolución N° 7, de 2019, de la Contraloría General de la
República, sobre exención del trámite de toma de razón en las materias que
indica.
     
     Considerando:
     
     1.- Que, con fecha 21 de marzo de 2024, se publicó en el Diario Oficial la Ley
N° 21.659 sobre Seguridad Privada, cuyo objetivo es regular la seguridad privada,
entendiéndose por tal el conjunto de actividades o medidas de carácter preventivas,
coadyuvantes y complementarias de la seguridad pública, destinadas a la protección
de personas, bienes y procesos productivos, desarrolladas en un área determinada y
realizadas por personas naturales o jurídicas de derecho privado, debidamente
autorizadas en la forma y condiciones que establece esta ley.
     2.- Que, la ley N° 21.659 busca establecer un nuevo régimen jurídico que
regule de manera orgánica los distintos aspectos que comprende la seguridad privada.
De esta forma, se busca enfrentar el crecimiento de esta industria y la necesidad de
una normativa específica en este ámbito dentro del ordenamiento jurídico de
nuestro país. Asimismo, de acuerdo con lo dispuesto en su artículo 81, corresponde
al Ministerio encargado de la Seguridad Pública, a través de la Subsecretaría de
Prevención del Delito, autorizar, regular, supervigilar, controlar y ejercer las
demás atribuciones legales en materia de seguridad privada, en su calidad de órgano
rector. 
     3.- Que, el artículo primero de las disposiciones transitorias de la ley N°


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 2 de 62

21.659 establece que esta ley entrará en vigencia seis meses después de la
publicación en el Diario Oficial del último de sus reglamentos complementarios,
debiendo el Ministerio encargado de la Seguridad Pública, dentro del plazo de un
año contado desde la publicación de la ley, dictar el reglamento referido a
seguridad privada, además del reglamento sobre eventos masivos mencionado en su
Título IV.
     4.- Que, la ley N° 20.502, que crea el Ministerio del Interior y Seguridad
Pública y el Servicio Nacional para la Prevención y Rehabilitación del Consumo de
Drogas y Alcohol, y modifica diversos cuerpos legales, establece en su artículo 1°
que el Ministerio del Interior y Seguridad Pública será el colaborador directo e
inmediato del Presidente de la República en asuntos relativos al orden público y la
seguridad pública interior, para cuyos efectos concentrará la decisión política
en estas materias, y coordinará, evaluará y controlará la ejecución de planes y
programas que desarrollen los demás Ministerios y Servicios Públicos en materia de
prevención y control de la delincuencia, rehabilitación de infractores de ley y su
reinserción social, en la forma que establezca la ley y dentro del marco de la
Política Nacional de Seguridad Pública Interior. De igual manera, en su artículo
2°, establece que para los efectos de lo dispuesto en el inciso segundo del
artículo 101 de la Constitución Política de la República, el Ministerio del
Interior y Seguridad Pública será el Ministerio encargado de la seguridad pública.
     5.- Que, en virtud de lo indicado en los considerandos precedentes, vengo en
decretar lo siguiente:
     
     Decreto:
     
     Apruébase el Reglamento de Seguridad Privada de la Ley N° 21.659 sobre
Seguridad Privada, cuyo texto es el siguiente:  Ley N° 21.659 
     
     REGLAMENTO DE SEGURIDAD PRIVADA DE LA LEY N° 21.659 SOBRE SEGURIDAD PRIVADA

     TÍTULO I
     Disposiciones Generales

     Artículo 1°.- Objeto. El presente reglamento tiene por objeto complementar las
disposiciones de la ley N° 21.659, sobre Seguridad Privada, con excepción de su
Título IV, así como precisar las obligaciones y demás aspectos técnicos,
operativos y de cualquier otra especie necesarios para su adecuada implementación.
     Se entenderá por seguridad privada el conjunto de actividades o medidas de
carácter preventivas, coadyuvantes y complementarias de la seguridad pública,
destinadas a la protección de personas, bienes y procesos productivos, desarrolladas
en un área determinada y realizadas por personas naturales o jurídicas de derecho
privado, debidamente autorizadas en la forma y condiciones que establece la ley N°
21.659 y el presente reglamento. 
     Las personas naturales y jurídicas que presten servicios de seguridad privada
quedarán sujetas, en la ejecución material de sus actividades, a las normas e
instrucciones que al efecto imparta el Ministerio encargado de la Seguridad Pública,
a través de la Subsecretaría de Prevención del Delito, en su calidad de órgano
rector en la materia. Asimismo, quedarán sujetas a la autoridad fiscalizadora que
corresponde a Carabineros de Chile, cuya dependencia técnica recaerá en la
Prefectura de Seguridad Privada OS-10. 
     Tratándose de entidades ubicadas en recintos portuarios, aeropuertos u otros
espacios sometidos al control de la autoridad militar, marítima o aeronáutica, las
atribuciones que se otorgan en el presente reglamento a Carabineros de Chile, serán
ejercidas por la autoridad institucional que corresponda.
     En todo lo no regulado en el presente reglamento, serán aplicables
supletoriamente las normas contenidas en la ley N° 19.880.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 3 de 62

     Artículo 2°.- Actividades de seguridad privada. Constituyen actividades de
seguridad privada, especialmente, las siguientes:
     
     1. La vigilancia, protección y seguridad de establecimientos, sucursales,
lugares, faenas y eventos, tanto públicos como privados, así como de las personas o
bienes que puedan encontrarse en ellos.
     2. La custodia y el transporte de valores. Se entenderá por valores el dinero
en efectivo, los documentos bancarios y mercantiles de normal uso en el sistema
financiero, los metales preciosos sean en barra, amonedados o elaborados, las obras
de arte, y, en general, cualquier otro bien que, atendidas sus características, haga
aconsejable su conservación, custodia o traslado bajo medidas especiales de
seguridad.
     3. El depósito, custodia, transporte y distribución de objetos que por su
peligrosidad precisen de vigilancia y protección especial, de acuerdo con la
regulación sectorial que sea aplicable a una determinada mercancía por el organismo
público competente. 
     En estos casos, la vigilancia y protección que deberán prestar las personas
naturales y jurídicas que custodien estas operaciones, deberá, además, sujetarse a
las reglas especiales, de conformidad a la naturaleza de los elementos sobre los que
recaiga. 
     Sin perjuicio de lo anterior, las medidas especiales en materia de seguridad
privada deberán implementarse de conformidad al nivel de riesgo de las operaciones,
de acuerdo a lo dispuesto en el artículo 9 de este reglamento. 
     4. La instalación y mantenimiento de aparatos, equipos, dispositivos,
componentes tecnológicos y sistemas de seguridad electrónica conectados a centrales
receptoras de alarmas, centros de control o de videovigilancia, así como la
operación de dichas centrales y centros.
     5. La asesoría en materias de seguridad. Se entenderá para estos efectos por
tal, aquellas labores que consistan en dar consejo o ilustrar a una persona o
entidad, con el propósito de ejecutar el buen funcionamiento de una instalación,
tanto en sus bienes como en los individuos que en ella se encuentren, evitando que
esta falle, se frustre o sea violentada.
     6. La formación y capacitación de vigilantes privados, guardias de seguridad y
demás personas naturales que desarrollen labores de seguridad privada, de
conformidad a la ley N° 21.659 y al presente reglamento.
     7. La custodia y transporte de carga sobredimensionada, según lo dispuesto en
el artículo 63 de la ley N° 18.290, de Tránsito, cuyo texto refundido, coordinado
y sistematizado fue fijado por el decreto con fuerza de ley N° 1, de 2007, de los
Ministerios de Transportes y Telecomunicaciones, y de Justicia.
     8. Cualquier otra actividad o medida de carácter preventivo destinada a la
protección de personas, bienes y procesos productivos, en los términos del inciso
segundo del artículo 1° del presente reglamento. 

     Artículo 3°.- Obligaciones de seguridad privada. En cumplimiento de su rol
preventivo, coadyuvante y complementario de la seguridad pública, las personas
naturales y jurídicas que ejerzan actividades de seguridad privada y las entidades
obligadas señaladas en el Título II de este reglamento, tendrán las siguientes
obligaciones:
     
     1. Observar las normas e instrucciones que al efecto imparta el Ministerio
encargado de la Seguridad Pública, a través de la Subsecretaría de Prevención del
Delito y la autoridad fiscalizadora. 
     2. Coordinar sus actividades de seguridad privada con Carabineros de Chile o la
autoridad militar, marítima o aeronáutica, según corresponda.
     3. Conservar y poner a disposición de las autoridades respectivas todos los
antecedentes, instrumentos, efectos y pruebas que obren en su poder y que permitan
individualizar a los autores y demás partícipes en hechos que revistan caracteres
de delito.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 4 de 62

     4. Denunciar todo hecho que revista caracteres de delito, dentro de las
veinticuatro horas siguientes al momento en que tomen conocimiento de él, en los
términos establecidos en los artículos 173 y siguientes del Código Procesal Penal.
     Asimismo, dentro del mismo plazo, deberán comunicar a las Fuerzas de Orden y
Seguridad Pública cualquier circunstancia o información relevante para la
prevención, el mantenimiento o restablecimiento de la seguridad pública.
     5. Respetar y proteger los derechos humanos y libertades fundamentales,
especialmente si se trata de personas en situación de vulnerabilidad, niños, niñas
o adolescentes y personas en situación de discapacidad. Ello, en cumplimiento de los
tratados internacionales de derechos humanos, ratificados por Chile y que se
encuentren vigentes, que prohíben cualquier acto constitutivo de tortura u otros
tratos crueles, inhumanos o degradantes.

     Artículo 4°.- Deber de colaboración. Los sujetos regulados por este
reglamento, en el ejercicio de su rol coadyuvante, están especialmente obligados a
colaborar con las Fuerzas de Orden y Seguridad Pública, así como con la respectiva
autoridad militar, marítima o aeronáutica, de conformidad a lo dispuesto en el
inciso cuarto del artículo 1° del presente reglamento. 
     Por su parte, las Fuerzas de Orden y Seguridad Pública, la Dirección General
del Territorio Marítimo y de Marina Mercante y la Dirección General de Aeronáutica
Civil podrán proporcionar a las entidades obligadas y a las municipalidades, en el
ejercicio de sus funciones, informaciones de seguridad que faciliten su evaluación
de riesgos y consiguiente implementación de medidas de protección. 

     Artículo 5°.- Obligaciones ante el Ministerio Público y las policías. Las
entidades obligadas deberán transmitir al Ministerio Público y a las policías,
previo requerimiento y en el menor plazo posible, los datos personales y las placas
patentes únicas de los vehículos que ingresen a sus recintos. Para ello, podrán
utilizar los sistemas instalados por las empresas de seguridad privada que permitan
comprobar la información de forma simultánea, interoperando para tal efecto. 
     Con todo, las entidades obligadas podrán convenir con las policías la
transmisión de informaciones de seguridad que sean necesarias para prevenir los
riesgos a la seguridad pública. 
     Para el cumplimiento de lo dispuesto en los incisos precedentes, el tratamiento
de datos de carácter personal y los sistemas, automatizados o no, creados para el
cumplimiento de este reglamento se someterán a lo dispuesto en la normativa de
protección de datos personales. 
     La comunicación de buena fe de información al Ministerio Público y a las
policías por parte de las entidades obligadas no constituirá vulneración de las
restricciones sobre divulgación de información impuestas por vía contractual o por
cualquier disposición legal, reglamentaria o administrativa. 

     Artículo 6°.- Forma de tramitación y plazos. Las solicitudes, autorizaciones
y demás procedimientos administrativos establecidos en el presente reglamento se
llevarán a cabo a través de la plataforma informática establecida en el artículo
115 de este reglamento, en adelante, también, "la plataforma". 
     Con excepción de los casos expresamente dispuestos, los plazos que establece
este reglamento son de días hábiles.

     TÍTULO II
     Entidades Obligadas

     Párrafo I
     Aspectos generales


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 5 de 62

     Artículo 7°.- Entidades obligadas. Se entenderá por entidades obligadas a
mantener medidas de seguridad privada a las personas jurídicas de carácter público
o privado, cuyas actividades puedan generar un riesgo para la seguridad pública y
que hayan sido declaradas como obligadas por la ley o por una resolución exenta de
la Subsecretaría de Prevención del Delito, de conformidad a lo dispuesto en el
inciso tercero del artículo 7 de la ley N° 21.659. 
     Corresponden a entidades declaradas como obligadas por la ley N° 21.659 las
empresas de venta de combustible; las empresas de transporte de valores; las
instituciones bancarias y financieras de cualquier naturaleza y las de apoyo al giro
bancario que reciban o mantengan dinero en sus operaciones, según lo dispuesto en el
inciso final del artículo 8 y en el inciso segundo del artículo 9 de dicho cuerpo
legal.

     Artículo 8°.- Medidas de seguridad privada. Se entenderá por medidas de
seguridad privada toda acción que involucre la implementación de recursos humanos,
materiales, tecnológicos o los procedimientos destinados a otorgar protección a las
personas y sus bienes dentro de un recinto o área determinada.

     Artículo 9°.- Niveles de riesgo y criterios para determinarlos. Las entidades
se clasificarán, de acuerdo a su nivel de riesgo en alto, medio o bajo. Aquellas que
sean determinadas como de riesgo medio o alto serán declaradas por la Subsecretaría
de Prevención del Delito, a través de resolución exenta, como entidades obligadas
a mantener medidas de seguridad privada.
     Los criterios orientadores para determinar el nivel de riesgo de las entidades
son los siguientes:
     
     1. Actividades que desarrolle. Se refiere al conjunto de operaciones, labores o
tareas que desempeña, de conformidad a su giro, en la medida en que determinadas
actividades concitan un atractivo mayor para la ocurrencia de delitos; o tienen un
mayor nivel de criticidad para el funcionamiento de la sociedad. Permite determinar
el valor, monetario o no, asociado a la actividad.
     2. Cumplimiento de funciones estratégicas o servicios de utilidad pública.
Guarda relación con la necesidad de garantizar la continuidad de funcionamiento de
una entidad, en la medida en que existen áreas diferenciadas dentro de la actividad
laboral, económica y productiva que involucran un servicio esencial o necesario para
el mantenimiento de las funciones sociales básicas del país y su normal
funcionamiento, tales como la salud, el abastecimiento de la población, el bienestar
social y económico de los ciudadanos, o el funcionamiento de las instituciones del
Estado. Al igual que el criterio anterior, permite determinar el valor, monetario o
no, asociado a la actividad.
     3. Localización de su establecimiento. Se refiere al lugar específico en el
que la entidad desarrolla sus actividades, considerando características de su
infraestructura y emplazamiento, tales como, si el lugar es abierto o cerrado, si
existe o no cierre perimetral, si existe una adecuada visibilidad desde el interior
al exterior y viceversa, entre otras, a fin de determinar las vulnerabilidades del
recinto.
     4. Características del funcionamiento de la entidad. Se relaciona con las
particularidades y condiciones de los procesos que se llevan a cabo para el
desarrollo de las labores de la entidad, tales como la cantidad de personal, los
turnos de trabajo, entre otras. Permite identificar los riesgos de seguridad que
puedan afectar a la entidad en razón de las dinámicas del lugar, la cantidad de
personal, entre otras.
     5. Valor o peligrosidad de los objetos que transporte, almacene o se encuentren
en su interior. Dice relación con el valor monetario de los bienes que produce o
requiere la entidad en función de su actividad; o bien, a la peligrosidad potencial
de estos como precursores o medios facilitadores para la comisión de delitos.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 6 de 62

Permite identificar los riesgos de seguridad que puedan afectar a la entidad, en
atención a las características de los objetos que mantiene al interior. 
     6. Concurrencia de público. Se vincula con la afluencia de personas que pueden
encontrarse al interior del recinto durante su horario de funcionamiento. Permite
identificar el eventual número de personas en riesgo en caso de que ocurra algún
delito al interior del lugar, así como las medidas de seguridad que debiesen
incorporarse para evitar una posible afectación de su integridad física o
psíquica. 
     7. Monto de sus transacciones y utilidades. Dice relación con el valor
monetario vinculado a la actividad. Permite identificar el mayor o menor interés que
puede suscitar una entidad de verse afectada por un delito, en atención a su flujo
de dinero.
     8. Horario de funcionamiento. Se refiere a momentos específicos que representan
un riesgo a la seguridad, el que varía en función de días y horas en particular,
por ejemplo, el número de horas de funcionamiento, si este último es diurno o
nocturno. Este criterio permite determinar las vulnerabilidades del recinto asociadas
al lapso de tiempo en los cuales lleva a cabo sus actividades.
     9. La ocurrencia reiterada de delitos en la entidad. Dice relación con el
número de delitos cometidos en el recinto o área determinada donde esta funciona.
Al igual que el criterio anterior, permite determinar las vulnerabilidades de la
respectiva entidad. 
     10. Características de su entorno. Se vincula con las particularidades de las
inmediaciones de el o los recintos en el que se encuentra emplazada la entidad,
atendido a que la distribución de los delitos responde a patrones que se asocian a
las señales que emite el contexto en relación, por ejemplo, con las
características físicas, espaciales o culturales. Debe considerar el diseño del
espacio urbano y los posibles riesgos situacionales que puedan afectarle, tales como
la falta de visibilidad o iluminación, el deterioro o abandono del sector, entre
otras. Este criterio permite determinar las vulnerabilidades del entorno.
     11. El comportamiento delictual en su entorno. Dice relación con el tipo y
número de delitos cometidos en las inmediaciones del recinto en el que se encuentra
emplazada la entidad. Al igual que el criterio anterior, permite determinar las
vulnerabilidades del entorno.
     12. Los demás criterios que determine la Subsecretaría de Prevención del
Delito, mediante resolución, basada en fundamentos objetivos y técnicos. 
     
     Para efectos de desarrollar la calificación del riesgo de cada entidad, la
Subsecretaría de Prevención del Delito elaborará una matriz que permita aplicar
los criterios orientadores referidos en el inciso precedente, la que se aprobará
mediante resolución. Este instrumento deberá especificar, a lo menos, las
dimensiones, factores, variables e indicadores que se considerarán en el análisis y
asignar la ponderación correspondiente. 
     Para la aplicación de la matriz, se deberán considerar datos estadísticos
oficiales del Ministerio encargado de la Seguridad Pública, de las policías, del
Ministerio Público, del Instituto Nacional de Estadísticas o de otros organismos
del Estado, de conformidad a lo dispuesto en el numeral 4 del artículo 83 de la ley
N° 21.659, sin perjuicio de solicitar cualquier otra información pertinente que
pueda requerirse de entidades privadas. 
     Sin perjuicio de lo anterior, la o el Subsecretario de Prevención del Delito
ponderará en su mérito el resultado en la aplicación de la matriz, en atención a
las medidas de seguridad que como consecuencia de ello se originen para la entidad
obligada, considerando su necesidad, idoneidad y proporcionalidad.

     Párrafo II
     Procedimiento de determinación de una entidad como obligada

     Artículo 10.- Formas de inicio. El procedimiento de declaración de una entidad


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 7 de 62

obligada podrá iniciarse de oficio por la Subsecretaría de Prevención del Delito,
a propuesta de la autoridad fiscalizadora respectiva o a solicitud de la propia
entidad.

     Artículo 11.- Procedimiento de oficio y a propuesta de la autoridad
fiscalizadora. El procedimiento de declaración de una entidad obligada se iniciará
de oficio cuando la Subsecretaría de Prevención del Delito tome conocimiento de
antecedentes que puedan fundar la declaración de una persona jurídica como entidad
obligada, en cuyo caso se solicitará informe a la autoridad fiscalizadora y se
determinará como tal en consideración al nivel de riesgo que pueda generar su
actividad, según lo establecido en el artículo 9° del presente reglamento. 
     Asimismo, se iniciará a propuesta de la autoridad fiscalizadora cuando estas,
acompañando toda la información que dispongan para el análisis correspondiente
conforme el artículo 9° del presente reglamento, soliciten a la Subsecretaría de
Prevención del Delito que una o más personas jurídicas sean declaradas entidades
obligadas. 

     Artículo 12.- Procedimiento de declaración de una entidad como obligada a
solicitud de la propia entidad. Toda persona jurídica podrá solicitar a la
Subsecretaría de Prevención del Delito que sea declarada como entidad obligada a
mantener medidas de seguridad, para lo cual deberá presentar, al menos, la siguiente
información:
     
     1. Cumplir con lo establecido en los números 1, 2, 3, 4, 5, 6 y 8 del inciso
cuarto del artículo 15 del presente reglamento.
     2. Los motivos que justifiquen la solicitud, señalando los criterios del
artículo 9° de este reglamento que conllevarían a que dicha entidad genere un
riesgo medio o alto para la seguridad pública.
     3. El número de trabajadores con que cuenta. 
     4. Identificar si atiende o no público en sus establecimientos. 
     5. Singularizar los recintos, plantas, instalaciones, equipos y, en general, los
bienes de la entidad.
     
     Una vez recibida la solicitud de una persona jurídica para ser declarada como
obligada, la Subsecretaría de Prevención del Delito requerirá a la autoridad
fiscalizadora competente informe donde se pronuncie sobre la solicitud en el plazo de
quince días contado desde la recepción del requerimiento.
     La Subsecretaría de Prevención del Delito deberá resolver fundadamente, en el
plazo de veinte días, contado desde la recepción del informe de la autoridad
fiscalizadora o desde que se reciban los antecedentes complementarios, según lo
dispuesto en el inciso siguiente.
     Durante la revisión de los antecedentes presentados por la entidad, la
Subsecretaría de Prevención del Delito podrá solicitar que estos se complementen,
se subsanen errores, omisiones formales, así como requerir aclaraciones. La entidad
tendrá un plazo máximo de cinco días, contado desde la notificación, para cumplir
con lo solicitado. En caso de que estos fueren insuficientes o no fueren presentados
dentro del plazo correspondiente, la Subsecretaría tendrá por desistida la
solicitud, mediante resolución, lo que pondrá fin al procedimiento.
     La solicitud y los documentos que la fundamenten tendrán el carácter de
secreto.  

     Artículo 13.- Notificación. La Subsecretaría de Prevención del Delito
requerirá a la autoridad fiscalizadora respectiva que notifique personalmente al
propietario, representante legal o administrador de la entidad obligada, la
resolución que la declara como tal.
     Si la persona no fuere habida en más de una oportunidad en el respectivo
recinto o local, la notificación se efectuará mediante carta certificada.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 8 de 62

     Artículo 14.- Recursos. Una vez notificadas, tanto las entidades obligadas como
aquellas referidas en el artículo 12 del presente reglamento, podrán interponer,
contra la resolución exenta que las designa como tales o la que rechace la
solicitud, según corresponda, los recursos que procedan de conformidad con la Ley
N° 19.880, que establece Bases de los Procedimientos Administrativos que rigen los
Actos de los Órganos de la Administración del Estado.
     Asimismo, procederá contra las referidas resoluciones, el reclamo de ilegalidad
ante la Corte de Apelaciones correspondiente al lugar en el que el acto produce sus
efectos, el que podrá interponerse en el plazo de quince días contado desde la
fecha del acto administrativo que resuelve los recursos administrativos o del
vencimiento del plazo para interponerlos. 
     Ante la interposición de un reclamo de ilegalidad, la Corte de Apelaciones se
pronunciará en cuenta sobre su admisibilidad, y declarará admisible el recurso si
el reclamante señala en su escrito con precisión el acto u omisión objeto del
reclamo, la norma legal que se supone infringida, la forma en que se ha producido la
infracción y las razones por las cuales el acto le perjudica. En contra de la
resolución que declare inadmisible el reclamo se podrá interponer el recurso de
reposición con apelación subsidiaria. Dicho recurso será igualmente conocido en
cuenta.
     La Corte podrá decretar orden de no innovar cuando sea solicitada por el
recurrente y la ejecución del acto impugnado le produzca un daño irreparable al
recurrente.
     Admitido a tramitación el reclamo, la Corte de Apelaciones dará traslado a la
Subsecretaría de Prevención del Delito, la notificará por oficio y le informará
que dispone del plazo de diez días para presentar sus descargos u observaciones.
     Si la Corte de Apelaciones estima que existen hechos sustanciales, pertinentes y
controvertidos, abrirá un término de prueba de ocho días. Dentro del mismo plazo,
podrá dictar medidas para mejor resolver en caso de que no se hayan acompañado
antecedentes relevantes para la resolución o fallo.
     Vencido el plazo para que la Subsecretaría de Prevención del Delito presente
sus descargos u observaciones o bien, vencido el término de prueba del inciso
anterior, la Corte ordenará traer los autos en relación y la causa se agregará
extraordinariamente a la tabla de la audiencia más próxima, previo sorteo de la
Sala.
     La Corte, a solicitud de las partes, oirá sus alegatos y dictará sentencia
dentro del término de diez días desde la vista de la causa.
     Si se da lugar al reclamo, la Corte decidirá u ordenará, según sea
procedente, la anulación total o parcial del acto impugnado y la dictación, por
parte de la Subsecretaría de Prevención del Delito, de la resolución que
corresponda para subsanar la omisión o reemplazar la resolución anulada.
     La sentencia podrá ser apelada para ante la Corte Suprema dentro del plazo de
diez días, la que resolverá en cuenta.

     Párrafo III
     Del estudio de seguridad, su procedimiento de aprobación y de la
implementación de las medidas de seguridad

     Artículo 15.- Estudio de seguridad. Es el instrumento de seguridad privada que
deben elaborar las entidades obligadas, con el objeto de identificar sus
vulnerabilidades y establecer la política de seguridad que se implementará acorde
con sus características y las exigencias de la normativa vigente. 
     Para la ejecución del estudio de seguridad, la entidad obligada deberá
elaborar un plan de seguridad por cada sucursal o instalación, si fuere procedente,
el cual se entenderá como parte integrante de dicho instrumento.
     Las entidades obligadas deberán contar con un estudio de seguridad vigente
autorizado por la Subsecretaría de Prevención del Delito para desarrollar sus


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 9 de 62

actividades. Sin perjuicio de lo anterior y lo señalado en el artículo 19 del
presente reglamento, aquellas entidades que se encuentren en funcionamiento con
anterioridad a que les sea notificada la resolución que las declare como obligadas
podrán seguir desarrollando sus actividades durante el proceso de aprobación del
estudio de seguridad y la implementación de las medidas respectivas. 
     Los estudios de seguridad deberán incluir los siguientes contenidos:
     
     1. Razón social, nombre de fantasía, rol único tributario, giro, domicilio
legal, correo electrónico y teléfono de contacto.
     2. Representante legal de la entidad, nombre completo de este, cédula de
identidad, domicilio, personería, correo electrónico y teléfono de contacto.
     3. Instalaciones o sucursales de la entidad obligada con indicación de sus
domicilios respectivos.
     4. Identificación de los riesgos y/o vulnerabilidades por cada instalación o
sucursal.
     5. Personal de seguridad privada que ya se encuentre contratado, en su caso,
indicando si es contratado directamente o subcontratado.
     6. Medidas de seguridad que ya se encuentren implementadas, en su caso,
identificando su ubicación.
     7. Propuesta de medidas de seguridad concretas, señalando cómo estas permiten
neutralizar las vulnerabilidades identificadas. Si dentro de las medidas se considera
la incorporación de personal de seguridad privada distinto a la inicial, deberá
precisar su forma de contratación.
     8. Documentos o antecedentes que sirven de fundamento para acreditar las
vulnerabilidades identificadas y la pertinencia de las medidas de seguridad.
     
     Sin perjuicio de lo anterior, el estudio de seguridad de aquellas entidades que
se encuentren obligadas a mantener un sistema de vigilancia privada deberá contener,
a lo menos, la siguiente información:
 
     1. La información general y particular de la entidad obligada y sus
instalaciones.
     2. El detalle de la estructura del organismo de seguridad interno, la
identificación de las personas que lo integran y las acciones de contingencia ante
emergencias o la eventual comisión de ilícitos.
     Cualquier cambio en los integrantes del organismo de seguridad interno deberá
ser informado al Ministerio encargado de la Seguridad Pública, a través de la
Subsecretaría de Prevención del Delito, y a la autoridad fiscalizadora dentro del
plazo de quince días.
     3. La identificación de áreas vulnerables, las condiciones de riesgo que se
identifiquen y la proposición de medidas técnicas y materiales tendientes a
neutralizar y evitar situaciones delictuales.
     4. El número de vigilantes con los que contará la entidad obligada y las
modalidades a las que deberá sujetarse la organización y el funcionamiento de dicho
servicio.
     5. Cantidad y tipo de armamento y municiones, acompañando los contratos de
comodato de acuerdo con lo dispuesto en los artículos 99 y siguientes del reglamento
complementario de la Ley N° 17.798, sobre Control de Armas y Elementos Similares,
aprobado por el decreto supremo N° 83, de 2007, del Ministerio de Defensa Nacional.
     6. Las medidas de seguridad concretas que se adoptarán para dar cabal
cumplimiento a la ley N° 21.659 y a este reglamento.
     
     Para elaborar y presentar la propuesta de estudio de seguridad ante la
Subsecretaría de Prevención del Delito, la entidad respectiva tendrá el plazo de
sesenta días contado desde que se notifique la resolución que la determina como
obligada o aquella que rechaza los recursos presentados, según sea el caso. En el
cumplimiento de esta obligación, la entidad obligada podrá contratar el servicio de
asesoría de cualquier persona natural o jurídica que se encuentre autorizada de
conformidad con las normas de la ley N° 21.659 y del presente reglamento.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 10 de 62

     Artículo 16.- Procedimiento de aprobación de un estudio de seguridad. Recibido
el estudio de seguridad de la entidad obligada, la Subsecretaría de Prevención del
Delito requerirá a la autoridad fiscalizadora un informe técnico sobre este para
que manifieste su opinión. El informe deberá ser remitido a dicha Subsecretaría en
el plazo de diez días, contado desde la recepción del referido requerimiento, el
que podrá ser prorrogado, previa solicitud de la autoridad fiscalizadora, hasta por
cinco días.
     Una vez recibido el informe técnico de la autoridad fiscalizadora, la
Subsecretaría de Prevención del Delito deberá aprobar o disponer las
modificaciones que correspondan, en un solo acto, dentro del plazo de treinta días,
mediante resolución fundada y notificar a la respectiva entidad. 
     En este último caso, la entidad obligada deberá efectuar las correcciones que
se indiquen dentro del plazo de diez días, contado desde que se notifique la
resolución que solicita las modificaciones, el que podrá ser prorrogado hasta por
el mismo período, previa solicitud de la entidad interesada.
     Con todo, transcurrido un plazo de sesenta días, contado desde la recepción de
las modificaciones ordenadas, sin que dicha Subsecretaría se pronuncie, se
entenderá aprobado el estudio de seguridad en los términos propuestos por la
entidad obligada.
     En contra de la resolución que dispone modificaciones al estudio de seguridad
propuesto, procederán los recursos de reposición y jerárquico, en la forma
prevista por la ley N° 19.880.
     Si la entidad obligada no realiza las modificaciones, o si a juicio de la
Subsecretaría de Prevención del Delito estas no son las requeridas, se rechazará
la propuesta de estudio de seguridad. En tal caso, la entidad deberá presentar una
nueva propuesta que cumpla con el procedimiento y los plazos referidos. 

     Artículo 17.- Vigencia del estudio de seguridad. La vigencia del estudio de
seguridad será de cuatro años, salvo que dentro de sus medidas se contemple un
sistema de vigilancia privada, en cuyo caso la vigencia será de dos años. 
     Sin perjuicio de lo anterior, la vigencia de los estudios de seguridad para una
empresa de transporte de valores será de un año, renovable, de conformidad a lo
dispuesto en el artículo 55 del presente reglamento.
     La renovación del estudio de seguridad se someterá al mismo procedimiento
señalado en los artículos precedentes. 
     Al menos tres meses antes del vencimiento de la vigencia del estudio de
seguridad aprobado, la entidad obligada deberá presentar un nuevo estudio de
seguridad o solicitar que se prorrogue la vigencia del ya aprobado, por uno, dos o
cuatro años, según corresponda. En este último caso, si la Subsecretaría de
Prevención del Delito advierte que las medidas de seguridad privada del estudio cuya
vigencia se requiere prorrogar son insuficientes en relación al nivel de riesgo de
la entidad, podrá, mediante resolución fundada, denegar esta prórroga y requerir
la presentación de un nuevo estudio de seguridad, o bien, aprobar su prórroga por
un plazo de vigencia inferior.
     No obstante, cualquier modificación que incida en el estudio de seguridad
deberá ser presentada a la Subsecretaría de Prevención del Delito, se someterá al
mismo procedimiento señalado precedentemente y no podrá implementarse sino luego de
su aprobación. El estudio vigente mantendrá su validez si la demora en resolver,
dentro de los plazos establecidos, es imputable a la Subsecretaría de Prevención
del Delito. 

     Artículo 18.- Protocolos conjuntos de dos o más entidades obligadas. Los
estudios de seguridad de dos o más entidades obligadas que comparten
infraestructuras o espacios determinados deberán encontrarse debidamente
coordinados. Para ello, elaborarán conjuntamente un protocolo que contenga
estrategias y objetivos comunes con el fin de que exista una perspectiva integral y


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 11 de 62

armónica ante los riesgos y amenazas que puedan afectarles.
     La Subsecretaría de Prevención del Delito notificará a las entidades que
comparten infraestructuras o espacios el deber de confeccionar un protocolo conjunto.
Para ello, las entidades deberán nombrar un responsable de seguridad de común
acuerdo, quien coordinará la elaboración y presentación del referido instrumento.
En el caso de que el propietario o administrador de la infraestructura común sea
declarada como entidad obligada, será designado siempre como responsable de
seguridad.
     No se requerirá notificar a aquellas entidades obligadas de conformidad a lo
dispuesto en el inciso final del artículo 8 y en el inciso segundo del artículo 9
de la ley N° 21.659.
     El protocolo será autorizado por la Subsecretaría de Prevención del Delito,
la que deberá aprobarlo o solicitar las modificaciones que correspondan, para lo
cual estas entidades acompañarán los antecedentes necesarios para que dicha
Subsecretaría evalúe el cumplimiento de los requisitos aplicables.
     El protocolo conjunto será secreto y tendrá el siguiente contenido mínimo:
     
     1. Un análisis de los espacios comunes de las entidades y de las
vulnerabilidades que puedan afectarles. 
     2. La definición de los objetivos de seguridad que se adopten en los espacios
que comparten.
     3. La designación de las contrapartes de cada entidad. Estas deberán
coordinarse para implementar sus respectivos estudios de seguridad, así como para
enfrentar cualquier emergencia. 
     4. La determinación de las medidas de seguridad concretas que se implementarán
en los espacios que comparten las entidades. 
     En el caso de que las medidas de seguridad incluyan cámaras de televigilancia o
alarmas de asalto, se deberá señalar la distribución de las mismas en los espacios
que comparten.
     5. Acompañar documentos o antecedentes que sirvan de fundamento para acreditar
las vulnerabilidades identificadas y la pertinencia de las medidas de seguridad.
     6. La definición de la actuación conjunta de las entidades y su personal de
seguridad, en caso de enfrentar una emergencia que afecte a una o más entidades que
suscriban el protocolo. 

     Artículo 19.- Implementación del estudio de seguridad. Desde que se notifique
la resolución que aprueba el estudio de seguridad, la entidad obligada tendrá un
plazo de treinta días para implementarlo. La Subsecretaría de Prevención del
Delito autorizará el funcionamiento de la entidad obligada una vez que verifique,
previo informe de la autoridad fiscalizadora, que la implementación de las medidas
de seguridad se ajusta al estudio aprobado y se han individualizado, en su caso, por
parte de la entidad obligada, todas las personas que integrarán el organismo de
seguridad interno. La Subsecretaría deberá emitir esta autorización en un plazo
máximo de treinta días. En caso contrario, la entidad obligada podrá funcionar
provisoriamente y deberá para ello implementar todas las medidas contenidas en el
estudio aprobado.

     Artículo 20.- Secreto de la documentación. El estudio de seguridad, su
propuesta y sus documentos fundantes, así como todas las actuaciones del
procedimiento pertinente serán secretos y solo tendrán acceso a ellos la entidad
obligada, el Ministerio encargado de la Seguridad Pública, la Subsecretaría de
Prevención del Delito y la Autoridad Fiscalizadora respectiva. Lo anterior, sin
perjuicio de lo dispuesto en el artículo 131 del presente reglamento, sobre
fiscalización de la normativa laboral y de seguridad social. 

     Párrafo IV
     Sistema de vigilancia privada


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 12 de 62

     Artículo 21.- Sistema de vigilancia privada. Las entidades que sean
clasificadas por la Subsecretaría de Prevención del Delito como de riesgo alto
deberán incorporar, dentro de sus medidas de seguridad, un sistema de vigilancia
privada en los términos que prevé la ley N° 21.659 y el presente reglamento. 
     Sin perjuicio de lo anterior, estarán siempre obligadas a mantener sistemas de
vigilancia privada las empresas de transporte de valores, las instituciones bancarias
y financieras de cualquier naturaleza y las empresas de apoyo al giro bancario que
reciban o mantengan dinero en sus operaciones.
     El sistema de vigilancia privada estará integrado por un organismo de seguridad
interno, por los recursos tecnológicos y materiales y por el estudio de seguridad
debidamente autorizado por la Subsecretaría de Prevención del Delito.
     El sistema de vigilancia privada podrá ser implementado por personal contratado
directamente por la entidad obligada o subcontratado a una empresa externa. En ambos
casos serán aplicables las obligaciones establecidas en la ley N° 21.659 y en el
presente reglamento. Con todo, el armamento que porten los vigilantes privados en el
ejercicio de sus funciones siempre será de propiedad de la entidad obligada donde se
presten los servicios, debiendo celebrarse el respectivo comodato de conformidad a la
normativa vigente en materia de control de armas. 
     El organismo de seguridad interno estará compuesto por el jefe de seguridad, el
encargado de seguridad, los encargados de armas, los vigilantes privados y los
guardias de seguridad que apoyen la función de estos últimos.

     Artículo 22.- Jefe de seguridad. El sistema de vigilancia privada será
dirigido por el jefe de seguridad.
     El jefe de seguridad es aquella persona que conoce y domina materias inherentes
a seguridad privada y que dirige el sistema de vigilancia privada de una entidad
obligada. La autorización para ejercer como jefe de seguridad será entregada por la
Subsecretaría de Prevención del Delito, mediante resolución fundada, la que será
otorgada previo cumplimiento de los requisitos señalados en la ley N° 21.659 y en
el presente reglamento, de conformidad a lo dispuesto en el artículo 85 de este
último cuerpo normativo. 

     Artículo 23.- Requisitos del jefe de seguridad. Además de los requisitos
generales de toda persona natural que ejerce labores de seguridad privada del
artículo 46 de la ley N° 21.659, deberá cumplir con los siguientes: 
     
     1. Estar en posesión de un título profesional de una carrera de, a lo menos,
ocho semestres de duración, otorgado por instituciones de educación superior del
Estado o reconocidas oficialmente por este. Asimismo, deberá contar con un curso de
especialidad en seguridad o materias afines. Para estos efectos, se entenderá por
curso de materias afines aquellos cuya malla curricular esté relacionada con las
actividades de seguridad privada, como también aquellas materias que digan relación
con la prevención de la seguridad física de las personas y de las instalaciones.
     El curso indicado precedentemente deberá ser impartido por una institución de
educación superior del Estado o reconocida por este, o por un organismo técnico de
capacitación acreditado por el Servicio Nacional de Capacitación y Empleo, el que
deberá tener una duración igual o superior a cuatrocientas horas académicas. Se
entenderá que cumple con este requisito quien haya aprobado un Diplomado de
Seguridad Privada, en los mismos términos antes señalados. 
     Con todo, para el cómputo total de las horas académicas mínimas, se le
reconocerán al postulante las horas que haya aprobado en los diferentes cursos de
capacitación en seguridad privada, tales como aquellos impartidos a vigilantes
privados o a guardias de seguridad, siempre que hayan sido aprobados dentro de los
cuatro años anteriores a la postulación al cargo de jefe de seguridad.
     En el caso de quienes hayan ejercido funciones de control o fiscalización como
integrantes de las Fuerzas Armadas o de Orden y Seguridad Pública, podrán eximirse


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 13 de 62

de cursar aquellas materias que coincidan con el contenido de las asignaturas
aprobadas previamente en la institución a la que hubieren pertenecido, siempre que
estas consten en la malla curricular vigente a la época en que se cursaron, lo que
deberá ser acreditado mediante certificación emitida por la respectiva institución
y convalidado por la entidad que imparte el curso o diplomado, de conformidad a lo
dispuesto en el artículo 107, inciso tercero del presente reglamento.
     2. No haber sido declarado con invalidez de segunda o de tercera clase por el
sistema previsional de salud y de la Caja de Previsión de la Defensa Nacional o de
la Dirección de Previsión de Carabineros de Chile, según corresponda. 

     Artículo 24.- Funciones del jefe de seguridad. Son funciones del jefe de
seguridad las siguientes:
     
     1. Visar y ejecutar el estudio de seguridad de la entidad.
     2. Organizar, dirigir, administrar, controlar y gestionar los recursos humanos,
materiales y tecnológicos destinados a la protección de personas y bienes en los
recintos previamente delimitados en que ejerza sus funciones. 
     3. Detectar y analizar situaciones de riesgo junto a la planificación y
programación de las actuaciones precisas para prevenirlas.
     4. Proponer los sistemas de seguridad que resulten pertinentes, así como
supervisar su utilización, funcionamiento y mantención.
     5. Proponer las medidas oportunas para subsanar deficiencias o anomalías que
observen o les comuniquen los encargados de seguridad, vigilantes privados, guardias
de seguridad u otros.
     6. Proponer actualizaciones al estudio de seguridad.
     7. Coordinar y colaborar con la autoridad fiscalizadora respectiva y la
Subsecretaría de Prevención del Delito.
     8. Las demás que sean necesarias para el ejercicio de sus labores.

     Artículo 25.- Encargado de seguridad. Es la persona designada por la entidad
obligada para velar por el cumplimiento de las medidas establecidas en el estudio de
seguridad en cada recinto, oficina, agencia o sucursal de la misma. El encargado de
seguridad se relacionará con la autoridad fiscalizadora, en coordinación con el
jefe de seguridad. 
     Asimismo, el encargado de seguridad deberá cumplir los mismos requisitos de los
vigilantes privados, además de aprobar un curso relacionado con el área de
seguridad o materias afines con una duración de, a lo menos, ciento veinte horas
académicas. Para estos efectos, se entenderá por curso de materias afines aquellos
cuya malla curricular esté relacionada con las actividades de seguridad privada,
como también aquellas materias que digan relación con la prevención de la
seguridad física de las personas y de las instalaciones. 
     La autorización para ejercer como encargado de seguridad será entregada por la
Subsecretaría de Prevención del Delito, mediante resolución fundada, la que será
otorgada previo cumplimiento de los requisitos anteriormente señalados, de
conformidad a lo dispuesto en el artículo 85 del presente reglamento.

     Párrafo V
     Vigilantes privados

     Artículo 26.- Vigilantes privados. Son vigilantes privados aquellos que
realizan labores de protección a personas y bienes dentro de un recinto o área
determinada, autorizados para portar armas, credencial y uniforme. 
     Sin perjuicio de las normas establecidas en el Código del Trabajo, el vigilante
privado tendrá la calidad de trabajador dependiente de la entidad en la que ejerce
sus labores o de la empresa de seguridad en el caso del inciso cuarto del artículo
21 del presente reglamento.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 14 de 62

     Los vigilantes privados, además de los requisitos generales establecidos en el
artículo 46 de la ley N° 21.659, deberán cumplir específicamente con los
siguientes: 
     
     1. Haber cumplido con lo establecido en el decreto supremo N° 83, de 2007, del
Ministerio de Defensa Nacional, que aprueba Reglamento Complementario de la ley N°
17.798, sobre Control de Armas y Elementos Similares, en cuanto al uso de armas de
fuego. Este requisito se acreditará con el correspondiente certificado de la
Dirección General de Movilización Nacional. 
     2. Haber aprobado el curso de formación y perfeccionamiento, de conformidad a
lo dispuesto en el artículo 27 de este reglamento. Para ello, la Subsecretaría de
Prevención del Delito verificará dicha circunstancia a través de la plataforma
establecida en el artículo 115 del presente reglamento. 
     En el caso de quienes hayan ejercido funciones de control o fiscalización como
integrantes de las Fuerzas Armadas o de Orden y Seguridad Pública, podrán eximirse
de cursar aquellas materias que coincidan con el contenido de las asignaturas
aprobadas previamente en la institución a la que hubieren pertenecido, siempre que
estas consten en la malla curricular vigente a la época en que se cursaron, lo que
deberá ser acreditado mediante certificación emitida por la respectiva institución
y convalidado por la entidad que imparte el curso, de acuerdo a lo dispuesto en el
artículo 107 inciso tercero del presente reglamento.
     3. No haber sido declarado con invalidez de segunda o de tercera clase por el
sistema previsional y de salud de la Caja de Previsión de la Defensa Nacional o de
la Dirección de Previsión de Carabineros de Chile, según corresponda. Lo anterior,
será acreditado mediante un certificado emitido por la institución correspondiente.
     
     La autorización para ejercer como vigilante privado será entregada por la
Subsecretaría de Prevención del Delito, mediante resolución fundada, de
conformidad con lo dispuesto en el artículo 85 del presente reglamento. La
autorización se otorgará previo cumplimiento de los requisitos señalados en la ley
N° 21.659 y en el presente reglamento.

     Artículo 27.- Cursos de formación y perfeccionamiento. La formación de los
vigilantes privados estará compuesta por los siguientes cursos:
     
     1. Formación: es aquel que habilita a una persona natural para desempeñarse
como vigilante privado. Este curso se rendirá una sola vez, con excepción de lo
dispuesto en el numeral 2. Su duración será de, a lo menos, cien horas
pedagógicas.
     2. Perfeccionamiento: es aquel que permite a los vigilantes privados actualizar
los conocimientos del curso de formación y acreditar sus competencias para seguir
desempeñando sus funciones. Este curso deberá aprobarse cada dos años y deberá
tener una duración de, a lo menos, cuarenta horas pedagógicas. Si la persona no
rinde el curso de perfeccionamiento dentro del plazo establecido precedentemente,
deberá rendir nuevamente el curso de formación.
     
     La Subsecretaría de Prevención del Delito, mediante resolución, previa
propuesta de la autoridad fiscalizadora determinará el contenido, la forma,
modalidades y duración de los distintos programas de capacitación de vigilantes
privados, debiendo actualizarse la malla específica en función de la evolución de
los riesgos en materia de seguridad y de las capacidades formativas de las entidades
capacitadoras autorizadas por la Subsecretaría de Prevención del Delito. Sin
perjuicio de lo anterior, el contenido del curso de formación será, a lo menos, el
siguiente:
     
     1. Legislación aplicada a la seguridad privada. Esta asignatura se orientará a
desarrollar conocimientos sobre las normas vigentes en materia de seguridad privada
que permitan un adecuado entendimiento del rol coadyuvante que esta tiene para con la


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 15 de 62

seguridad pública, además del estudio específico de los fundamentos
constitucionales, de la ley N° 21.659 y sus reglamentos complementarios. Del mismo
modo, deberá incorporar materias vinculadas con seguridad privada, tales como las
normas laborales aplicables al personal de seguridad privada y el marco normativo
sobre control de armas. 
     2. Respeto y promoción de los derechos humanos. Esta asignatura se orientará a
desarrollar conocimientos relativos a conceptos y normas nacionales e internacionales
relacionadas con los derechos humanos, con especial énfasis en grupos de especial
protección, tales como mujeres, niños, niñas o adolescentes, diversidades y
disidencias sexo-genéricas, personas en situación de discapacidad o adultos
mayores. 
     3. Privacidad y uso de datos personales. Esta asignatura tendrá por objeto
entregar conocimientos sobre principios, conceptos y normas sobre datos personales y
sensibles, con énfasis en su adecuada protección.
     4. Instrucción física. Esta asignatura tiene por objeto que el alumno mantenga
una condición física que le permita un eficiente desempeño de sus funciones.
     5. Correcto uso de elementos defensivos y de protección. Esta asignatura
tendrá por objeto que el alumno adquiera y desarrolle técnicas para el adecuado uso
de elementos defensivos y de protección, especialmente en casos de legítima defensa
propia o de terceros.
     6. Primeros auxilios. Esta asignatura tendrá por objeto entregar al alumno
conocimientos básicos para la atención y respuesta de una persona víctima de un
accidente, una agresión o una afección natural. 
     7. Prevención de riesgos. Esta asignatura tendrá por objeto orientar al alumno
en lo que se refiere a los riesgos, accidentes y enfermedades profesionales, así
como las formas de prevenirlos. 
     8. Seguridad de instalaciones. Esta asignatura tendrá como propósito
desarrollar conocimientos relacionados con la aplicación de medidas de seguridad
tendientes a evitar o minimizar los riesgos que puedan afectar a un recinto o área
determinada, incluyendo el análisis de riesgos potenciales, el manejo de situaciones
de emergencia, entre otras.
     9. Probidad, no discriminación y perspectiva de género. Esta asignatura
abordará principios, conceptos y normas tendientes a promover un actuar íntegro de
los alumnos, así como a la prevención de actos de discriminación arbitraria y la
adopción de una perspectiva de género en el desempeño de sus funciones.
     10. Seguridad electrónica. Esta asignatura tendrá por objeto proporcionar
conocimientos conceptuales, prácticos y normas operativas relacionadas con los
diferentes sistemas electrónicos utilizados en el ámbito de la seguridad privada,
tales como cámaras de televigilancia, alarmas, entre otros.
     11. Sistema de telecomunicaciones. Esta asignatura tendrá por objeto
desarrollar en los alumnos conocimientos relacionados con la aplicación, en el
ámbito de la seguridad privada, de equipos de comunicación y sus características
técnicas.
     12. Técnicas de reducción. Esta asignatura tendrá por objeto que el alumno
desarrolle técnicas de reducción adecuadas y proporcionadas al peligro actual o
inminente al que se enfrentan en casos de legítima defensa propia o de terceros.
     13. Conocimiento de arma y tiro, de conformidad al reglamento complementario de
la ley N° 17.798, sobre Control de Armas y Elementos Similares, aprobado por decreto
supremo N° 83, de 2007, del Ministerio de Defensa Nacional. Esta asignatura
orientará al alumno en los conocimientos suficientes para el uso, porte y custodia
de armas de fuego.

     Artículo 28.- Porte de armas de fuego por parte de los vigilantes privados. Los
vigilantes privados deberán portar armas de fuego exclusivamente en el ejercicio de
sus funciones, mientras dure la jornada de trabajo y solo dentro del recinto o área
para el cual fueron autorizados. 
     Excepcionalmente, el Ministerio encargado de la Seguridad Pública, a través de
la Subsecretaría de Prevención del Delito y previo informe de la autoridad


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 16 de 62

fiscalizadora, podrá eximir del porte de armas de fuego en casos debidamente
calificados. Para ello, deberá considerar, especialmente, el nivel de riesgo de la
entidad para la cual se desempeña. 
     La entrega de armas y de municiones a los vigilantes privados y su restitución
deberá ser registrada, de acuerdo con lo establecido en el presente reglamento y las
instrucciones que Carabineros de Chile imparta a este respecto. 

     Artículo 29.- Entrega de armas y forma de registro. La entrega de armas y de
municiones a los vigilantes privados y su restitución deberá ser consignada en un
registro diario de armas, que deberá cumplir con lo dispuesto en el artículo 104
del reglamento complementario de la ley N° 17.798, sobre Control de Armas y
Elementos Similares, aprobado por decreto supremo N° 83, de 2007, del Ministerio de
Defensa Nacional. 
     Asimismo, en este registro deberá consignarse el uso del arma de fuego, con
indicación de la munición utilizada y si resultaron lesiones o muerte de alguna
persona o daños de cualquier naturaleza, así como el robo o extravío del arma o
sus municiones. Estas circunstancias deberán ser informadas a la autoridad
fiscalizadora respectiva, al encargado de armas, al jefe de seguridad o representante
legal de la entidad o jefe de la oficina o agencia respectiva, sin perjuicio del
deber de denuncia del artículo 4 numeral 4 de la ley N° 21.659.
     Cuando la autoridad fiscalizadora verifique el cumplimiento del estudio de
seguridad, deberá dejar constancia en el registro de las observaciones que hallare
referidas al armamento. En caso de no encontrar observaciones, deberá señalar esta
circunstancia.

     Artículo 30.- El encargado de armas. Son encargados de armas aquellos que
tienen como función mantener a resguardo en un lugar cerrado las armas de fuego que
posea la entidad obligada. Asimismo, será el encargado de la entrega y recepción de
estas armas cada vez que los vigilantes privados inicien y terminen la jornada de
trabajo.
     El encargado de armas y el encargado de seguridad podrán ser una misma persona.
El encargado de armas deberá cumplir los mismos requisitos establecidos para los
vigilantes privados.

     Artículo 31.- Elementos defensivos y de protección. Sin perjuicio del porte de
armas de fuego, los empleadores deberán proporcionar a los vigilantes privados los
elementos defensivos y de protección que permitan resguardar su vida e integridad
física en el ejercicio de sus funciones. 
     Los elementos deberán constar en el estudio de seguridad autorizado por la
Subsecretaría de Prevención del Delito. 
     Los elementos mínimos, por cada vigilante, consistirán en un chaleco
antibalas, un bastón retráctil y esposas. Sin perjuicio de lo anterior, de oficio o
a petición del vigilante o de su empleador, la Subsecretaría de Prevención del
Delito podrá requerir la utilización de uno o más elementos adicionales, mediante
resolución fundada, previo informe de la autoridad fiscalizadora. 
     Al término de la jornada de trabajo, el vigilante deberá restituir los
elementos defensivos a la persona designada por el empleador para su custodia. Para
estos efectos, el sujeto obligado deberá disponer de un lugar cerrado que ofrezca
garantías suficientes de seguridad y que se encuentre dentro del mismo recinto
informado en el estudio de seguridad y sus respectivos planes, en su caso.
     Los empleadores deberán incorporar, en los respectivos contratos de trabajo de
los vigilantes privados, estipulaciones tendientes a asegurar la entrega y
restitución de los elementos defensivos y de protección, de conformidad a lo
dispuesto en los incisos precedentes, teniendo para ello en consideración las
directivas que, en esta materia, ha impartido la Dirección del Trabajo y los
derechos laborales establecidos en los distintos cuerpos normativos que la regulan.
     El empleador no podrá exigir al vigilante que proporcione estos elementos ni


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 17 de 62

tampoco deducir, retener o compensar, por este concepto, suma alguna de la
remuneración del trabajador, siendo de su exclusivo cargo y costo.
     Para el correcto uso de los elementos defensivos y de protección mínimos, la
Subsecretaría de Prevención del Delito, mediante resolución, podrá contemplar el
cumplimiento de normas técnicas, para lo cual podrá requerir la información que
considere necesaria a las instituciones correspondientes. 
     Sin perjuicio de lo anterior, en relación con el chaleco antibalas, deberá
cumplirse lo siguiente:
      
     1. Entidad certificadora: los chalecos antibalas que utilicen los vigilantes
privados deberán estar certificados de acuerdo con la normativa técnica de ensayo
balístico NIJ 0101.04., por el Laboratorio de Resistencia Balística, del Instituto
de Investigaciones y Control del Ejército de Chile (IDIC). Esta entidad
certificadora, además, llevará un registro de los elementos a ensayar y cantidad,
tipo y resultado de los ensayos realizados. Este registro deberá ser comunicado cada
noventa días corridos a la Subsecretaría de Prevención del Delito, quien lo
pondrá en conocimiento de las autoridades fiscalizadoras.
     2. Seguro de vida por 30 UF o su equivalente en dólares americanos: el
fabricante deberá contar con un seguro de vida en caso de que un chaleco antibalas
no cumpla su función. Los proveedores deberán acreditar y declarar la póliza al
comprador, además de adjuntar este documento a la entidad certificadora señalada en
el numeral anterior.
     3. Al momento de presentar el producto para su certificación, el proveedor o
fabricante deberá declarar el lote y la cantidad de unidades que lo componen
(número de serie), así como su material, cantidad y área de protección, lo que
permitirá mantener una trazabilidad del producto.

     Artículo 32.- Autorización de uso de armas no letales. Solo podrán portar y
utilizar armamentos no letales, en los términos dispuestos en el artículo 27 de la
ley N° 21.659, los vigilantes expresamente autorizados por la Subsecretaría de
Prevención del Delito. Para obtener la autorización, la entidad obligada deberá
incorporarlo como medida de seguridad en el respectivo estudio, su modificación o
renovación, según corresponda. En estos casos, deberá acompañar, adicionalmente,
lo siguiente:
     
     1. Identificación del tipo de arma no letal cuyo uso por parte de los
vigilantes privados solicita.
     2. Motivos que justifiquen su solicitud, acompañando todos los documentos o
antecedentes que permitan acreditar la necesidad de contar con armamentos no letales.

     3. Identificación de los vigilantes privados para los cuales solicita el uso de
este tipo de armamento y comunicar a la Subsecretaría de Prevención del Delito
cualquier cambio en los vigilantes a quienes se les asignen estos elementos.
     
     La presente solicitud solo puede decir relación con armas permitidas en virtud
de la ley N° 17.798, cuyo texto refundido, coordinado y sistematizado se fijó por
el decreto N° 400, de 1977, del Ministerio de Defensa Nacional, y su reglamento,
aprobado por decreto supremo N° 83, de 2007, del Ministerio de Defensa Nacional,
debiendo cumplir con las características técnicas y los requisitos exigidos en
estas normas. La tramitación de dicha solicitud se someterá al mismo procedimiento
que rige para la aprobación del respectivo estudio de seguridad. 
     Lo dispuesto en este artículo será sin perjuicio de las autorizaciones y
demás requisitos que se dispongan en virtud de las normas citadas en el inciso
anterior.

     Artículo 33.- Uniforme de los vigilantes. El uniforme de los vigilantes
privados será de tipo slack, debiendo cumplir con los siguientes detalles: 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 18 de 62

     1. Gorra color gris perla azulado, modelo militar, visera negra y barboquejo del
mismo color. En casos debidamente calificados por la Subsecretaría de Prevención
del Delito, se podrá utilizar casco de seguridad azul o quepís gris perla azulado. 
     2. Parte superior del uniforme consistente en una camisa de color gris perla
azulado, con cuello, palas en los hombros y dos bolsillos. Será confeccionado con
tela gruesa o delgada, de manga corta o larga abotonada, según la época del año. 
     3. Corbata negra, cuyo uso será obligatorio al vestir camisa de manga larga. 
     4. Parte inferior del uniforme consistente en un pantalón, del mismo color y
tela que la camisa. 
     5. Calzado y calcetines negros.
     6. Cinturón negro con cartuchera del mismo color para revólver o pistola,
según sea el caso. 
     7. Bastón retráctil con porta bastón. 
     8. Chaquetón impermeable gris perla azulado, con cierre de cremallera (eclair)
o abotonado, para uso en la época del año que corresponda. En casos debidamente
calificados por la Subsecretaría de Prevención del Delito, podrá sustituirse o
complementarse esta última prenda con chaqueta corta, parka impermeable o manta, del
mismo color.
     
     Las empresas de transporte de valores utilizarán el uniforme descrito
anteriormente, siendo obligatorio el uso del distintivo de la empresa en la gorra y
en la manga derecha de la camisa o chaquetón, según el caso.
     El uso del uniforme será obligatorio para los vigilantes privados mientras se
encuentran desempeñando sus funciones y quedará estrictamente prohibido usarlo
fuera del recinto o área en el cual presten sus servicios, incluso en los trayectos
de ida y regreso de su domicilio al lugar de trabajo.
     Excepcionalmente, en casos calificados de acuerdo con la naturaleza de las
funciones que desempeñe, la Subsecretaría de Prevención del Delito, previo informe
de la autoridad fiscalizadora, podrá eximir a determinados vigilantes privados de la
obligación de usar uniforme o autorizar el uso de un uniforme alternativo. El
uniforme a que se refiere este artículo es de uso exclusivo de los vigilantes
privados, el cual deberá ser proporcionado gratuitamente por el empleador o entidad
en la que prestan sus servicios, en cantidad y calidad suficientes, de acuerdo con lo
que se establezca en el estudio de seguridad. 
     La Subsecretaría de Prevención del Delito podrá dictar instrucciones
generales, de conformidad a lo dispuesto en el artículo 83 N° 1 de la ley N°
21.659, que establezcan reglas especiales referidas al uniforme, exclusivamente en
atención a circunstancias de seguridad, climáticas u otras relativas a la
naturaleza de la entidad en la que se desempeñan los vigilantes privados, sin
perjuicio de las obligaciones laborales que sean aplicables al empleador. Asimismo,
podrá autorizar, mediante resolución fundada, modificaciones en el uso de
uniformes, en atención a estas mismas circunstancias.

     Artículo 34.- Autorización y licencia de los vigilantes privados. Para
desempeñarse como vigilante privado se deberá contar con una autorización, emitida
por la Subsecretaría de Prevención del Delito, de conformidad a lo dispuesto en los
artículos 26 y 85 del presente reglamento. En virtud de esta autorización, se
entregará una licencia, personal e intransferible que constará en una credencial
emitida por la Subsecretaría de Prevención del Delito.

     Artículo 35.- Características de la credencial de los vigilantes privados. La
credencial de los vigilantes privados consistirá en una tarjeta de plástico de 5.5
centímetros de ancho por 8.5 centímetros de largo. En su anverso, en la parte
superior izquierda llevará el membrete de la Subsecretaría de Prevención del
Delito y, a continuación, el número clasificado que la autoridad le asigne; al
costado derecho con letra destacada la leyenda "Credencial de Vigilante Privado"; al
lado izquierdo desde el medio hacia abajo y en orden descendente, el nombre del


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 19 de 62

vigilante privado, su cédula de identidad y la fecha de vencimiento de la
credencial; en el lado inferior derecho llevará una fotografía en colores con fondo
rojo de 3.5 centímetros de alto por 2.8 centímetros de ancho sin ninguna
anotación. Entre la individualización y la fotografía se estampará el timbre de
la Subsecretaría de Prevención del Delito. 
     En el reverso, en letras mayúsculas y destacadas contendrá la siguiente
leyenda "esta credencial identifica al vigilante privado habilitado para ejercer sus
funciones solo dentro del recinto o área determinada en que la entidad tiene
autorización. prohibido cualquier otro uso. en caso de extravío devuélvase a la
autoridad fiscalizadora correspondiente". 
     La credencial de los vigilantes privados será de color amarillo, con excepción
de la que porten aquellos que desarrollen la función de transporte de valores, la
que será de color azul, así como la de quienes trabajen en empresas que, por las
especiales características del servicio que prestan, deban proteger instalaciones
ubicadas fuera de sus recintos, la que será de color verde. 
     En este último caso, la entidad obligada podrá tener otros recintos de
vigilancia aledaños a esta y donde el vigilante privado debe trasladarse por la vía
pública hasta este último lugar, estando obligado a realizar solo el trayecto de
ida y regreso, sin que medie ningún desvío durante el recorrido. 
     El vigilante privado deberá portar obligatoriamente dicha credencial mientras
esté desempeñando sus funciones, quedando prohibido otro uso.
     Todos los gastos que se originen en el otorgamiento de la credencial serán de
cargo del solicitante. La Subsecretaría de Prevención del Delito, mediante
resolución, establecerá los costos de la emisión de estas credenciales, las que
regirán desde la publicación del acto administrativo en el Diario Oficial. 
     En caso de pérdida o extravío de la credencial, el vigilante deberá dar aviso
para su bloqueo en el sistema, dentro de un plazo máximo de veinticuatro horas a la
Subsecretaría de Prevención del Delito, quien deberá otorgarle una nueva, sin
perjuicio de las infracciones que procedan cuando dicha situación sea imputable al
vigilante o a la entidad para la que se desempeña. 
     La omisión de dar aviso de la pérdida o extravío de la credencial en la forma
establecida en el inciso precedente, constituirá infracción leve, de conformidad
con lo dispuesto en el artículo 88, en relación al numeral 3 del artículo 98,
ambos de la ley N° 21.659. 

     Artículo 36.- Los sistemas de registro audiovisual de vigilantes privados. Para
efectos del presente reglamento, se entenderá por sistemas de registro audiovisual
el conjunto de dispositivos tecnológicos de grabación, procesamiento y/o
almacenamiento de imágenes y sonidos, incluyendo su transmisión en tiempo real,
así como la reconstrucción de una secuencia de imágenes que representen escenas en
movimiento, utilizados por los vigilantes privados en el ejercicio de sus funciones. 
     Las características, requisitos y especificaciones de dichos sistemas se
establecerán siempre con el objetivo de que la calidad del audio y video que se
obtenga de su utilización permita la adecuada identificación de las situaciones que
se registraron, tales como su contexto, el o los hechos que las originaron y las
personas involucradas en las mismas. Sin perjuicio de lo señalado por el presente
reglamento en los artículos siguientes, la Subsecretaría de Prevención del Delito
podrá, mediante resolución fundada, complementar las características, requisitos y
especificaciones de los sistemas de registro audiovisual para cumplir con los
objetivos dispuestos por la ley y el presente reglamento.
     Los metadatos asociados a los registros audiovisuales se entenderán parte
integral del sistema en que se encuentren. 

     Artículo 37.- Requisitos mínimos de hardware. Los sistemas de registro
audiovisual de los vigilantes privados se conformarán, preferentemente, de
dispositivos especialmente diseñados para el desempeño de sus labores o, en su
defecto, de aquellos que permitan un adecuado uso de conformidad a la finalidad de


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 20 de 62

sus funciones y de las condiciones del entorno en el que desarrollan sus actividades.
     Los dispositivos deberán permitir su debido uso en condiciones adversas, tales
como movimientos violentos, golpes, caídas o ruido ambiente elevado.
     La capacidad de almacenamiento y autonomía de la batería de los sistemas no
podrá ser inferior a la duración de la jornada laboral respectiva; de tal manera
que permita su utilización continua, sin necesidad de utilizar elementos externos a
los propios dispositivos. La grabación del dispositivo debe ser encriptada,
permitiendo su descarga y almacenamiento de modo automático.
     Además, los dispositivos contarán con sistemas que incorporen, al menos,
capacidad de recuperación del registro audiovisual e inviolabilidad de la batería,
la memoria y los metadatos de los registros que capturen.

     Artículo 38.- Requisitos mínimos de software. Los sistemas de registro
audiovisual de los vigilantes privados contarán con tecnología que permita el
debido registro de grabaciones en alta definición.
     Asimismo, el software deberá contar con la capacidad de proporcionar un
registro de auditoría completo, que incluya los registros originales y todas las
acciones realizadas con ellos. De igual manera, el software deberá registrar todas
las imágenes y garantizar la seguridad de los registros originales, evitando su
edición o manipulación indebida. 
     Los datos producidos en virtud de la utilización de los sistemas, así como las
tecnologías utilizadas para su almacenamiento, carga o descarga, serán encriptadas
de extremo a extremo.

     Artículo 39.- Forma de uso del sistema de registro audiovisual. Los sistemas de
registro audiovisual deberán usarse adosados a la vestimenta o equipos de seguridad
del vigilante privado, para que las imágenes se puedan grabar en primera persona.
Para ello, los dispositivos contarán con mecanismos que posibiliten su instalación
en cualquier tipo de vestimenta o equipamiento de modo que permitan una grabación
adecuada de las situaciones que registren. 
     Cada sistema de registro audiovisual deberá estar en permanente funcionamiento
y contar con un mecanismo de activación para grabar, de conformidad a lo establecido
en el artículo siguiente. 
     En caso de provocarse alguna falla, el vigilante, sin descuidar la prestación
del servicio, deberá efectuar una revisión minuciosa de la cámara, equipos y
accesorios que se encuentren a cargo, informando cualquier anomalía al encargado de
seguridad. 
     Al finalizar el turno de trabajo, el vigilante privado deberá entregar el
sistema de registro audiovisual al encargado de seguridad o a la persona que este
designe, con el objeto de realizar la descarga de la información y almacenarla en la
forma señalada en los artículos siguientes. 

     Artículo 40.- Criterios de uso del sistema de registro audiovisual y de la
información registrada. Para su debido registro, y sin perjuicio de mantener el
sistema de registro audiovisual en permanente funcionamiento, los vigilantes privados
deberán activar la grabación, especialmente, en los siguientes casos: 
     
     1. Cuando presenciaren un hecho que revista carácter de delito.
     2. Cuando ejerzan la facultad de detención en flagrancia, de conformidad a lo
dispuesto en el inciso primero del artículo 129 del Código Procesal Penal. 
     3. Cuando deban hacer uso de elementos defensivos y de protección o de armas de
fuego, a partir del momento que las circunstancias lo permitan.
     4. Cuando se encuentren autorizados, de conformidad a la ley, a controlar el
acceso de personas a las dependencias de la entidad en la cual desempeñan labores.
     5. Cuando la naturaleza de sus funciones implique el desplazamiento de un sitio
a otro.
     6. Cuando se encuentren en cualquier otra circunstancia que implique riesgo para


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 21 de 62

su integridad física o la de un tercero.
     
     La información registrada se atendrá a los siguientes criterios: 
     
     1. Su conservación formará parte del inventario de cada entidad y se deberá
mantener en una dependencia específica destinada a dicho propósito. Esta
conservación estará a cargo de un empleado de la entidad obligada o subcontratada
con experiencia en la manipulación y extracción de la información que recopilen
las cámaras.
     2. En caso de daño, defecto o deterioro, se deberá procurar su reparación o
reemplazo.
     3. La supervisión del uso, porte y manipulación de estas cámaras recaerá en
el jefe de seguridad de la entidad y los encargados de seguridad de cada sucursal,
quienes deberán instruir al vigilante privado con respecto a su utilización. Lo
anterior, sin perjuicio de la responsabilidad del vigilante y de la entidad.
     
     Los vigilantes privados y toda persona que acceda a los registros estarán
obligados a guardar secreto respecto de la información obtenida en dichos
procedimientos, la que deberá ser mantenida y tratada como información reservada.
Asimismo, deberán tomar los resguardos necesarios para proteger la identidad y
privacidad de quienes aparezcan en los registros. Tanto el secreto como los
resguardos para proteger la identidad y privacidad de las personas serán mantenidos
sin perjuicio de su incorporación íntegra a investigaciones penales, a
requerimiento del Ministerio Público, o a procedimientos judiciales o
administrativos. Todo lo anterior, conforme a lo establecido en la Ley N° 19.628,
sobre Protección a la Vida Privada. 

     Artículo 41.- Almacenamiento de la información. Los registros audiovisuales en
los dispositivos especialmente destinados para tales efectos contarán con las
características y especificaciones técnicas necesarias para asegurar su debida
identificación y fidelidad, así como la integridad de archivos y metadatos y la
trazabilidad de sus cambios y producciones.
     Las capacidades de los sistemas de registro deberán permitir que las
grabaciones almacenadas puedan mantenerse por un período de, al menos, ciento veinte
días corridos, salvo que la grabación sea susceptible de formar parte de una causa
o investigación judicial o proceso administrativo, en cuyo caso se deberá almacenar
hasta finalizar la tramitación legal correspondiente. 
     Con todo, los registros que se obtengan, que no fueren requeridos por el
Ministerio Público, un tribunal de la República o un funcionario a cargo de un
procedimiento administrativo, deberán ser destruidos luego de transcurridos dos
años desde su captura. En virtud de lo anterior, aquellos registros que fueren
destruidos deberán constar en un acta en la que se indique, a lo menos, el nombre de
la persona a cargo de la gestión referida junto con su firma y la causal para su
procedencia. 

     Artículo 42.- Seguro de vida. Las entidades empleadoras deberán contratar un
seguro de vida a favor de cada vigilante privado, cuyo monto no podrá ser inferior a
doscientas cincuenta unidades de fomento. 
     Este seguro de vida cubrirá los riesgos a los que se encuentre expuesto el
vigilante privado, siempre que se cumplan las siguientes condiciones:
     
     1. Que el siniestro ocurra con motivo u ocasión del desempeño de sus labores.
     2. Que el asegurado cumpla los requisitos generales y específicos consagrados
en la ley N° 21.659 y en el presente reglamento al momento en que ocurra el
siniestro. 
     3. Que la relación laboral entre el trabajador y la respectiva entidad
empleadora se encuentre vigente al momento en que ocurra el siniestro.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 22 de 62

     Artículo 43.- Reemplazo de vigilante privado. El reemplazo de vigilantes
privados se regirá por las reglas siguientes:
     
     1. En el evento de que se requiera suplir ausencias temporales producto de
situaciones no previstas, tales como licencia médica, o ausencia laboral sin
autorización previa, la entidad obligada procurará que el resguardo del recinto o
área determinada se verifique siempre mediante el servicio de vigilantes privados
armados. 
     En razón de lo anterior, si el estudio de seguridad autoriza una dotación
correspondiente a un solo vigilante privado por turno, se deberá disponer el
reemplazo de este por otro vigilante privado que trabaje en alguna de las sucursales
de la entidad, en la que se desempeñe más de un vigilante privado por turno, el
cual, a su vez, podrá ser reemplazado en su sucursal de origen por un guardia de
seguridad contratado directamente o a través de una empresa de seguridad privada,
durante un plazo máximo de treinta días corridos contado desde que empiece a
prestar servicios. 
     Asimismo, en caso de que la entidad afectada por la ausencia temporal imprevista
no posea otra sucursal, deberá contratar en forma directa o a través de empresas de
seguridad privada, un vigilante privado por el tiempo que dure la ausencia del
titular. 
     Por su parte, si en la sucursal donde presta servicios el vigilante privado
afectado temporalmente en sus labores, se desempeña más de un vigilante privado por
turno, se le podrá reemplazar por un guardia de seguridad, contratado de forma
directa o a través de empresas de seguridad privada, durante un plazo máximo de
treinta días corridos, contado desde que empiece a prestar servicios.
     Con todo, cuando los vigilantes de la entidad obligada se encuentren eximidos de
portar armas de fuego en el recinto o área afectada por la ausencia temporal del
vigilante, de conformidad a lo establecido en el inciso segundo del artículo 26 de
la ley N° 21.659, se podrá reemplazar al vigilante privado por un guardia de
seguridad contratado de forma directa o a través de empresas de seguridad privada,
durante un plazo máximo de treinta días corridos contado desde que empiece a
prestar servicios.
     La entidad obligada deberá comunicar el reemplazo del vigilante privado a la
Subsecretaría de Prevención del Delito y a la autoridad fiscalizadora respectiva,
dentro de las veinticuatro horas siguientes contadas desde que la persona
reemplazante comience a prestar servicios, de conformidad a lo dispuesto en el
presente numeral, lo que será registrado en la plataforma informática establecida
en el artículo 115, dejando constancia de la entidad obligada, el personal
reemplazado y su respectivo reemplazo, la sucursal, la fecha, el motivo y la
duración del reemplazo. 
     2. En lo que respecta a las ausencias temporales previstas, como, por ejemplo,
uso de feriado legal, el vigilante privado deberá ser siempre reemplazado por otro
vigilante privado, el que podrá ser contratado directamente por la entidad obligada
o por intermedio de una empresa externa debidamente acreditada. Asimismo, el
reemplazante podrá corresponder a un vigilante que trabaje en otra sucursal de la
entidad obligada.
     Para que opere el reemplazo señalado en el presente numeral, las entidades
obligadas a tener un sistema de vigilancia privada deberán comunicar a la
Subsecretaría de Prevención del Delito, una vez al año, una calendarización del
uso del feriado legal por sus vigilantes privados, así como cualquier modificación
de la misma, lo que quedará registrado en la plataforma establecida en el artículo
115 del presente reglamento. 

     Párrafo VI
     Obligaciones especiales de instituciones bancarias y financieras de cualquier
naturaleza y empresas de apoyo al giro bancario que reciban o mantengan dineros en


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 23 de 62

sus operaciones

     Artículo 44.- Medidas especiales. Sin perjuicio de contar con un sistema de
vigilancia privada, así como de implementar las demás medidas que establezca el
respectivo estudio de seguridad, las instituciones bancarias y financieras de
cualquier naturaleza y las empresas de apoyo al giro bancario que reciban o mantengan
dineros en sus operaciones, deberán contar con una o más medidas especiales
determinadas por la Subsecretaría de Prevención del Delito, previo informe de la
autoridad fiscalizadora, acorde con la disposición y el diseño de cada sucursal.
Estas medidas especiales serán las siguientes:
     
     1. Sistema de registro de personas. Mecanismo que permita registrar a las
personas que ingresen a una sucursal o local determinado. Para estos efectos se
podrán requerir antecedentes que permitan identificar a las personas y/o utilizar
mecanismos tecnológicos con este fin. Esta información deberá estar disponible
por, al menos, ciento veinte días corridos.
     2. Modificación de estructura de asientos de espera. La ubicación de los
asientos de las zonas de espera de atención de clientes deberá disponerse de modo
tal que las personas que se sientan den la espalda al sector de las cajas. Se
exceptúan los asientos destinados a adultos mayores, embarazadas y personas con
discapacidad. Asimismo, frente a los asientos se deberá instalar una cámara que
capte la imagen de los usuarios sentados a la espera de atención y un monitor de
televisión donde dicha imagen se refleje y los usuarios puedan verse a sí mismos en
todo momento. 
     3. Barreras visuales. Se deberá contar con barreras visuales para la
protección de la privacidad en las transacciones en la caja o línea de cajas, de
forma que las personas que están a la espera de ser atendido no puedan observar las
actividades que se desarrollan en esos lugares. Estas barreras no deberán impedir la
normal toma de imágenes de los movimientos mediante el circuito cerrado de
televisión.
     4. Silenciamiento de máquinas contadoras de billetes. Todas las máquinas
contadoras de billetes que se ubiquen en cajas de atención de público deberán
operar en forma silenciosa. 

     Artículo 45.- Derecho de admisión. Las entidades podrán ejercer el derecho de
admisión, respecto de quienes infrinjan las condiciones de ingreso y permanencia, o
cuando existan motivos que justifiquen razonablemente la utilización de dicha
facultad.
     Para los efectos del presente reglamento, se entenderá que existen motivos
razonables para que las entidades obligadas de este párrafo ejerzan el derecho de
admisión, cuando la conducta de quienes ingresen o se encuentren en el lugar, ponga
en riesgo o amenace la seguridad de las personas o bienes del establecimiento. 
     Constituyen especialmente condiciones de ingreso y permanencia las siguientes
conductas:
     
     1. Respetar los horarios de apertura y cierre al público.
     2. No utilizar atuendos que oculten, dificulten o disimulen su identidad, salvo
que se utilicen con motivos religiosos, culturales o de salud.
     3. Someterse a todas las medidas de seguridad implementadas por las entidades,
de conformidad a lo establecido en el presente párrafo y en el estudio de seguridad.
     
     Las sucursales bancarias deberán instalar señalética y publicar en su sitio
web la información de las condiciones para el ingreso y permanencia.
     Sin perjuicio de lo anterior, las entidades deberán resguardar lo establecido
en la ley N° 20.609, que establece medidas contra la discriminación. 

     Párrafo VII


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 24 de 62

     Recursos tecnológicos y materiales de las entidades obligadas

     Artículo 46.- Los recursos tecnológicos y materiales. Los recursos
tecnológicos y materiales de las instituciones bancarias y financieras de cualquier
naturaleza y empresas de apoyo al giro bancario deberán cumplir con los siguientes
requisitos, características, condiciones y forma de implementación:
     
     1. De las alarmas de asalto. Estas deberán ser independientes de las alarmas de
incendio, robo u otras que estén instaladas en la oficina, agencia, sucursal o lugar
en que estas se emplacen. 
     Las alarmas de asalto estarán conectadas directamente a la central de
comunicaciones de Carabineros de Chile. Asimismo, deberán permitir su activación
desde distintos puntos dentro de la oficina, agencia o sucursal, sin perjuicio que
dicha activación pueda realizarse, además, a distancia desde las respectivas
unidades de vigilancia electrónica. Los costos de instalación, mantención y
desarrollo del sistema de conexión serán de cargo exclusivo de la entidad.
     En este caso, Carabineros de Chile podrá cobrar a las entidades los siguientes
valores por la conexión de sus sistemas de alarmas a sus centrales de
comunicaciones:
     
     a) Conexión inicial y reconexión: 2,0 UTM;
     b) Renta mensual: 0,5 UTM;
     c) Falsas alarmas: 1,5 UTM cada una.
     
     Se entenderá, para los efectos de este numeral, que constituye falsa alarma su
activación por un hecho que no constituye una emergencia, en cuyo caso será
responsable la entidad siempre que de ello se derive un procedimiento policial
inoficioso. Los cobros se formularán semestralmente y se calcularán al valor de la
UTM correspondiente al mes de enero y julio respectivamente. 
     Los valores recaudados serán ingresados en la Cuenta Subsidiaria de la Única
Fiscal - Carabineros de Chile, Seguridad Privada del Banco del Estado de Chile. 
     Cuando una oficina, agencia o sucursal origine por circunstancias o hechos suyos
o de sus dependientes más de cuatro falsas alarmas dentro de un mismo mes, deberá
ser notificada por la autoridad fiscalizadora para que proceda, en el plazo de un
mes, a subsanar las deficiencias o anomalías, sean humanas o técnicas, que hayan
dado origen a dichas falsas alarmas. Este plazo será prorrogable por una vez, cuando
existan circunstancias que lo justifiquen. La autoridad fiscalizadora deberá
informar, mensualmente, de las circunstancias señaladas en el presente inciso a la
Subsecretaría de Prevención del Delito. 
     La entidad que no subsane las deficiencias en el plazo señalado en el inciso
anterior o reincida en más de cuatro falsas alarmas en un mes, incurrirá en
infracción leve de conformidad con lo dispuesto en el artículo 88 en relación al
artículo 98, numeral 3, ambos de la ley N° 21.659. 
     
     2. De las bóvedas. Todas las oficinas, agencias o sucursales deberán equipar
sus bóvedas con mecanismos de relojería para su apertura y cierre. Las alarmas
conectadas a las bóvedas deberán ser distintas e independientes de aquellas que se
activen en caso de asalto.
     3. De las cajas. Las cajas receptoras y pagadoras de dinero y valores ubicadas
en oficinas, agencias o sucursales en las que se atienda al público, deberán
instalarse todas juntas, dentro de un mismo recinto, en un lugar que pueda ser
observado desde el acceso al piso correspondiente y lo más distante posible de él.
Deberán estar compartimentadas y aisladas del resto de los recintos por una puerta
con cerradura de seguridad.
     En aquellas oficinas, agencias o sucursales que cuenten con un gran número de
cajas receptoras y pagadoras de dineros, que haga imposible el reunirlas todas en una
misma dependencia, se deberán adoptar las medidas necesarias para agruparlas en
distintos recintos que reúnan las condiciones señaladas en el inciso anterior. 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 25 de 62

     El recinto donde se encuentran los mesones de los cajeros deberá estar
igualmente compartimentados con cerraduras de apertura interna e independiente del
resto de la oficina. 
     Las oficinas, agencias o sucursales deberán contar con cajas blindadas. Se
exceptúan las oficinas, agencias o sucursales que cuenten en todos y cada uno de sus
accesos exteriores con una o más puertas blindadas de funcionamiento electrónico y
detectores de metales de modo que impidan el ingreso de armas. Estas puertas deben
contar, además, con dos o más hojas sucesivas de apertura independiente y
alternativa o bien ser giratorias. En ambos casos, el espacio interior entre hoja y
hoja debe impedir la permanencia de dos o más personas en el cubículo al mismo
tiempo, permitiendo el ingreso y salida de personas de una en una.
     En situaciones de emergencia, las puertas deben disponer de una fuente de
alimentación de energía independiente y deben poder accionarse mecánicamente de
modo de garantizar la posibilidad de evacuación del recinto en caso de sismo o
incendio.
     4. De los sistemas de filmación. Los sistemas de filmación deberán generar
registros de alta resolución que permitan la grabación de imágenes nítidas con
indicación de la hora, día, mes y año de la captura. Dichos sistemas deberán
permanecer en funcionamiento continuo. 
     Las cámaras y demás equipos de filmación deben ubicarse de modo que queden
ocultas o debidamente resguardadas de posible intrusión. Además, deberán permitir
la grabación de imágenes de las personas que ingresen y salgan de la oficina,
agencia o sucursal, y de todas aquellas que se dirijan hasta las cajas. 
     Los archivos serán almacenados por fecha y deberán permanecer inalterables por
un período de, al menos, ciento veinte días corridos, salvo que la grabación sea
susceptible de formar parte de una causa o investigación judicial o proceso
administrativo, en cuyo caso se deberá almacenar hasta finalizar la tramitación
legal correspondiente.
     Con todo, los registros que se obtengan, que no fueren requeridos por el
Ministerio Público, un tribunal de la República o un funcionario a cargo de un
procedimiento administrativo, deberán ser destruidos luego de transcurridos dos
años desde su captura. 
     En virtud de lo anterior, aquellos registros que fueren destruidos deberán
constar en un acta en la que se indique, a lo menos, el nombre de la persona a cargo
de la gestión referida junto con su firma y la causal para su procedencia. 
     El sistema de grabación de imágenes estará conectado en línea a una central
de monitoreo de la misma entidad obligada o de una empresa externa que se contrate,
previa autorización de la Subsecretaría de Prevención del Delito. 
     Estas entidades deberán disponer de un canal oportuno y tecnológico que
permita disponer de las imágenes en caso de ser requerido por Carabineros de Chile,
Policía de Investigaciones de Chile y Ministerio Público, garantizando el resguardo
de su contenido. 
     5. De los sistemas de comunicaciones de seguridad. Los sistemas de
comunicaciones entre estas entidades y las empresas de transporte de valores desde o
hacia sus clientes registrarán toda comunicación que se realice entre un banco o
una financiera y una empresa de transporte de valores en lo que respecta al envío,
retiro o manipulación de dineros o especies valoradas. 
     La comunicación indicada deberá hacerse a través de mensajería electrónica
encriptada que cumpla con los estándares de seguridad y confiabilidad que la banca
dispone en su sistema de comunicaciones bancarias. Cuando existan situaciones de
excepción o contingencia, dicha comunicación podrá hacerse en forma escrita,
firmada por el tesorero de la entidad financiera y entregada personalmente a la
empresa de transporte de valores por un trabajador del banco acreditado ante esta.
     6. Vidrios. Todos los vidrios exteriores de las oficinas, agencias o sucursales
deberán ser inastillables o adquirir tal carácter mediante la aplicación de
productos destinados a ese objeto. Además, deberán tener la transparencia necesaria
para permitir la visión desde el exterior hacia el interior.
     
     La Subsecretaría de Prevención del Delito, previo informe de la autoridad


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 26 de 62

fiscalizadora o habiendo requerido la opinión técnica de otras instituciones
públicas o privadas vinculadas a la innovación tecnológica y la provisión de
seguridad, podrá dictar una resolución a través de la cual disponga otras
características tecnológicas y materiales que deban ser implementadas por las
entidades obligadas. Asimismo, podrá disponer que las medidas señaladas en este
artículo sean extensivas para otras entidades obligadas, en función de la
naturaleza de sus funciones y el riesgo al que se enfrentan, las que deberán
incorporarse a los respectivos estudios de seguridad.

     TÍTULO III
     Empresas y Personas Naturales en Seguridad Privada

     Párrafo I
     Empresas de seguridad privada

     Artículo 47.- Empresas de seguridad privada. Las empresas de seguridad privada
son aquellas que tienen por objeto suministrar bienes o prestar servicios destinados
a la protección de personas, bienes y procesos productivos de las actividades
descritas en el artículo 2° de este reglamento, y dotadas de los medios materiales,
técnicos y humanos para ello, debidamente autorizadas. 

     Artículo 48.- Obligaciones de las empresas de seguridad privada. Las empresas
de seguridad privada deberán cumplir las siguientes obligaciones:
     
     1. Mantener bajo reserva toda información de que dispongan o que les sea
proporcionada en razón de los servicios que prestan y velar porque su personal
cumpla con la misma obligación. Esta se mantendrá hasta por un período de cuatro
años contado desde que haya cesado la prestación de los servicios y su infracción
se considerará un incumplimiento grave para los efectos de este reglamento. 
     La infracción de este deber será sancionada de acuerdo con lo previsto en el
artículo 35 numeral 1 de la ley N° 21.659.
     Se exceptúa de lo dispuesto en este numeral la entrega de información que se
lleve a cabo en cumplimiento de lo establecido en los números 3 y 4 del artículo 4
y en el artículo 6, ambos de la ley N° 21.659. Del mismo modo, no quedarán sujetos
a este deber de reserva aquellos requerimientos de información realizados por los
Tribunales de Justicia o por el Ministerio Público.
     Asimismo, podrá requerir esta información el Ministerio encargado de la
Seguridad Pública y la autoridad fiscalizadora, cuando sea necesario para el
adecuado cumplimiento de la ley N° 21.659.
     2. Cumplir con las normas e instrucciones generales que imparta la
Subsecretaría de Prevención del Delito. Ella podrá aplicar e interpretar
administrativamente las disposiciones de la ley y sus reglamentos e impartir
instrucciones de general aplicación, en las materias de su competencia, sin
perjuicio de las atribuciones propias del Ministerio encargado de la Seguridad
Pública.
     3. Elaborar y enviar cada dos años, en la forma y oportunidad que determine el
reglamento, un informe a la Subsecretaría de Prevención del Delito, conforme se
dispone en el artículo 52 del presente reglamento. 
     4. Remitir cualquier antecedente o información solicitada por la Subsecretaría
de Prevención del Delito o la autoridad fiscalizadora respectiva, dentro del plazo
que dichas instituciones determinen.
     5. Las establecidas en el numeral 3 del artículo 49, sobre el deber de
contratar los seguros que la ley y el presente reglamento establecen; los artículos
33 y 90 que dispone el deber de estas empresas de proveerles gratuitamente el
respectivo uniforme a los vigilantes privados y a los guardias de seguridad,
respectivamente; y las demás que establezca el presente reglamento. 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 27 de 62

     Artículo 49.- Requisitos para ser autorizadas como empresas de seguridad
privada. Solo podrán actuar como empresas de seguridad privada las que se encuentran
autorizadas por la Subsecretaría de Prevención del Delito y cumplan, al menos, con
los siguientes requisitos:
     
     1. Estar legalmente constituidas como personas jurídicas de derecho privado y
tener por objeto social alguna o algunas de las actividades de seguridad privada
establecidas en el artículo 2° de este reglamento. No obstante, cuando estas
instituciones hayan sido formalizadas como organismos técnicos de capacitación,
quedarán exceptuadas del requisito de objeto social único de los artículos 12 y
21, número 1, de la ley N° 19.518, que fija el Nuevo Estatuto de Capacitación y
Empleo, y podrá ejercer ambos objetos sociales.
     2. Contar con los medios humanos, de formación, financieros, materiales y
técnicos en función de la naturaleza de las actividades para las que soliciten
autorización y las características de los servicios que se prestan en relación con
tales actividades.
     3. Suscribir los contratos de seguro en favor del personal que corresponda, de
acuerdo a lo establecido en la ley N° 21.659 y el presente reglamento.
     4. Que los socios, administradores y representantes legales de este tipo de
personas jurídicas de derecho privado no hayan sido condenados por crimen o simple
delito.
     5. Que los socios, administradores y representantes legales, en el caso de
personas jurídicas, no se encuentren acusados por alguna de las conductas punibles
establecidas en la Ley N° 17.798, sobre Control de Armas; en la Ley N° 20.000, que
sanciona el Tráfico Ilícito de Estupefacientes y Sustancias Sicotrópicas; en la
Ley N° 18.314, que determina Conductas Terroristas y fija su Penalidad; en la ley
N° 19.913, que crea la Unidad de Análisis Financiero y modifica diversas
disposiciones en materia de lavado y blanqueo de activos; en la ley N° 12.927, sobre
Seguridad del Estado; en la Ley N° 20.066, de Violencia Intrafamiliar, en los
artículos 141, 142, 150 A, 150 B, 361, 362, 363, 365 bis, 366, 366 bis, 372 bis,
390, 390 bis, 390 ter, 391 y 411 quáter del Código Penal, u otras asociadas al
crimen organizado que se encuentren tipificadas en el Párrafo 10 del Título VI del
Libro II del mismo Código o en otras leyes.
     6. Que los socios, administradores y representantes legales, en el caso de
personas jurídicas, no hubiesen dejado de pertenecer a las Fuerzas Armadas, de Orden
y Seguridad Pública o a Gendarmería de Chile, como consecuencia de la aplicación
de una medida disciplinaria en los últimos cinco años, salvo en caso de que los
hechos que dieron origen a esta medida sean posteriormente desestimados mediante
sentencia judicial firme o ejecutoriada.
     7. No haber sido condenada la persona jurídica por delitos contemplados en la
ley N° 20.393, que establece la responsabilidad penal de las mismas. 
     
     La Subsecretaría de Prevención del Delito podrá, por sí o por medio de la
autoridad fiscalizadora competente, solicitar cualquier otro antecedente que permita
acreditar que la empresa, sus socios o el o los representantes legales cumplen con
los requisitos establecidos en la ley N° 21.659 y en este reglamento. 
     Sin perjuicio de los requisitos señalados anteriormente, se prohíbe a las
empresas de seguridad privada utilizar un nombre o razón social igual o similar al
de los órganos públicos, especialmente el del Ministerio encargado de la Seguridad
Pública, el de las Fuerzas Armadas y Fuerzas de Orden y Seguridad Pública, el del
Ministerio Público o cualquier otro que induzca a error respecto de su naturaleza
privada. 
     En caso de incumplir cualquiera de los requisitos anteriores no podrá
entregarse autorización para realizar labores como empresa de seguridad privada.

     Artículo 50.- Medios humanos, de formación, financieros, materiales y


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 28 de 62

técnicos. Las empresas de seguridad privada deberán contar con los medios humanos,
de formación, financieros, materiales y técnicos, señalados en el numeral dos del
artículo anterior, en función de la naturaleza de las actividades para las cuales
soliciten la debida autorización a la Subsecretaría de Prevención del Delito. Para
ello deberán cumplir las siguientes características y requisitos: 
     
     1. Las empresas especializadas en recursos humanos de servicios de seguridad
privada deberán contar con personal autorizado y capacitado para desempeñar los
servicios que ofrece. Para ello, deberán adjuntar una nómina actualizada de los
guardias de seguridad y demás personas que desempeñen labores de seguridad privada
bajo su dependencia. Asimismo, cada vez que el personal sea destinado a prestar
servicios en una entidad determinada, la empresa deberá adjuntar el listado
actualizado de los lugares donde estas personas se desempeñan. 
     2. Las instituciones de capacitación de seguridad privada deberán contar con
instalaciones idóneas, así como con personal autorizado para desempeñar los
servicios de formación y perfeccionamiento que ofrece. Para ello, deberán adjuntar
un listado de los capacitadores en materias de seguridad privada que se desempeñen
bajo su dependencia. Asimismo, corresponderá que cada vez que se tramite un curso de
formación, de perfeccionamiento o especialización, se señale, en la nómina
correspondiente, la relación de capacitadores por asignatura, adjuntando los
antecedentes que se hayan requerido para acreditar el cumplimiento de los requisitos
del artículo 46 de la ley N° 21.659, de conformidad a lo dispuesto en el inciso
final del artículo 60 del mismo cuerpo legal, así como de los artículos 104 y 105
de este reglamento. 
     3. Las empresas de seguridad electrónica deberán contar con personal idóneo
para desempeñar los servicios que ofrecen. Para ello, deberán acompañar un listado
de los técnicos en materias de seguridad privada que presten labores bajo su
dependencia, así como los respectivos certificados de estudios y/o de las
capacitaciones que el empleador le haya provisto. Asimismo, deberán contar con los
medios materiales y técnicos adecuados, para lo cual deberán acompañar una
descripción de los elementos que ofrecen al mercado. En el caso específico de las
empresas que administran servicios de circuito cerrado de televisión (CCTV) y de
alarmas acompañarán, además, los protocolos pertinentes de monitoreo del referido
sistema, de su verificación en terreno y del sistema de comunicaciones, ante
activaciones de las mismas.
     4. Las empresas que otorguen el servicio de asesoría en materias de seguridad
privada deberán contar con asesores autorizados para desempeñar sus funciones. Para
ello, acompañarán un listado de los asesores que presten labores en la respectiva
entidad.
     
     Sin perjuicio de lo anterior, la Subsecretaría de Prevención del Delito podrá
requerir cualquier otro antecedente a las empresas para verificar que cuentan con los
medios humanos, de formación, financieros, materiales y técnicos adecuados.

     Artículo 51.- Procedimiento de autorización. Solo podrán actuar como empresas
de seguridad privada las que se encuentren autorizadas por la Subsecretaría de
Prevención del Delito. Dicha autorización tendrá una vigencia de cuatro años
contados desde que se notifique la resolución que lo autorice. 
     La solicitud de autorización deberá ser suscrita por el representante legal y
deberá contener, a lo menos, lo siguiente:
     
     1. Indicar la razón social, rol único tributario, actividad de seguridad
privada a la que se dedica y que está acreditada en el giro, el domicilio de la
entidad, el nombre completo de su representante legal y su cédula de identidad; así
como su correo electrónico y teléfono de contacto. 
     2. Señalar el número de trabajadores con que cuenta, sus perfiles, formación
y plan de capacitación continua.
     3. Indicar la ubicación exacta de los recintos, plantas, instalaciones, equipos


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 29 de 62

y, en general, de los bienes que dispone para el servicio que presta.
     4. Todos los antecedentes que permitan acreditar el cumplimiento de los
requisitos para funcionar como empresas de seguridad privada.
     
     Durante la revisión de los antecedentes presentados por la empresa, la
Subsecretaría de Prevención del Delito podrá solicitar que estos se complementen,
se subsanen errores, omisiones formales, así como requerir aclaraciones. La empresa
tendrá un plazo máximo de cinco días, contado desde la notificación, para cumplir
con lo solicitado. En caso de que estos fueren insuficientes o no fueren presentados
dentro del plazo correspondiente, la Subsecretaría tendrá por desistida la
solicitud, mediante resolución, lo que pondrá fin al procedimiento. 
     Una vez recibida la solicitud o los antecedentes complementarios, según el
caso, la Subsecretaría de Prevención del Delito podrá requerir a la autoridad
fiscalizadora competente un informe donde esta se pronuncie sobre la solicitud, en
función de la naturaleza y características de las actividades, para las que
solicita autorización. La autoridad fiscalizadora deberá remitir el informe en el
plazo de quince días contado desde la recepción del requerimiento.
     La Subsecretaría de Prevención del Delito deberá resolver fundadamente, en el
plazo de veinte días, contado desde la recepción de la solicitud, desde que se
complementen los antecedentes o desde que se reciba el informe de la autoridad
fiscalizadora, según sea el caso.
     Cada vez que se modifiquen los antecedentes acompañados para obtener la
autorización de funcionamiento, las empresas de seguridad privada deberán
actualizar esta información en la plataforma informática del artículo 115 de este
reglamento.
     Con, a lo menos treinta días de anticipación a la fecha de vencimiento de la
autorización, las empresas de seguridad privada podrán solicitar su renovación,
para lo cual deberán acreditar nuevamente el cumplimiento de los requisitos
señalados en los numerales 2 a 7 del artículo 49 del presente reglamento, así como
los requisitos especiales que correspondan, según el tipo de actividad que
desarrollen. Vencido el plazo señalado, deberán presentar la totalidad de la
documentación demostrando los requisitos para proceder a su autorización como si
fuera la primera vez.

     Artículo 52.- Informe bianual. Las empresas de seguridad reguladas en este
título deberán elaborar y remitir un informe a la Subsecretaría de Prevención del
Delito, de forma bianual. El informe deberá dar cuenta de lo siguiente:
 
     1. El cumplimiento de todos los requisitos de la ley N° 21.659 para actuar como
empresa de seguridad privada. Si la Subsecretaría de Prevención del Delito verifica
la pérdida de alguno de los requisitos, podrá revocar la autorización concedida,
identificando fundadamente el vicio o falta en que incurrieren, de conformidad al
procedimiento establecido en el párrafo 4 del Título VI de la ley N° 21.659. Si se
trata de requisitos subsanables, antes de revocar la autorización, la Subsecretaría
de Prevención del Delito deberá fijar un plazo no inferior a treinta días para que
la empresa acredite su cumplimiento.
     2. La nómina de todo el personal vigente durante el período y el cumplimiento
de los requisitos establecidos para que desempeñen actividades de seguridad privada.
     3. La celebración de los contratos de prestación de los distintos servicios de
seguridad privada, los que deberán, en todo caso, formalizarse por escrito.
     4. Cumplimiento de requisitos y obligaciones especiales, de acuerdo a la
naturaleza de sus funciones. 
     5. Análisis y propuestas de mejoras, así como de los verificadores que den
cuenta del cumplimiento. 
     6. Remitir cualquier otro antecedente o información solicitada por la
Subsecretaría de Prevención del Delito o la autoridad fiscalizadora respectiva,
dentro del plazo que dichas instituciones determinen. 
     Sin perjuicio de lo anterior, la empresa deberá informar a la Subsecretaría de


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 30 de 62

Prevención del Delito la pérdida de cualquiera de los requisitos establecidos en la
ley N° 21.659 o en el presente reglamento. 
     El informe deberá estar disponible en la plataforma informática establecida en
el artículo 115 de este reglamento para que las autoridades fiscalizadoras puedan
acceder a este, en el ejercicio de sus funciones. 

     Artículo 53.- Documentos necesarios para acreditar el cumplimiento de los
requisitos. Para acreditar el cumplimiento de los requisitos legales y
reglamentarios, las empresas de seguridad privada deberán adjuntar en el informe
establecido en el artículo anterior, los siguientes documentos:
     
     1. Copia de la cédula de identidad por ambos lados, de los socios,
administradores y representantes legales, según corresponda.
     2. Certificado de antecedentes para fines especiales de los socios,
administradores y representantes legales con una vigencia no superior a treinta
días.
     3. Declaración jurada simple de no encontrarse acusado por algunos de los
delitos establecidos en el numeral 5 del artículo 34 de la ley N° 21.659. 
     4. Certificado de no haber dejado de pertenecer a las Fuerzas Armadas, de Orden
y Seguridad Pública y Gendarmería de Chile, producto de la aplicación de una
medida disciplinaria.
     5. Declaración jurada simple del representante legal de la empresa, de no haber
sido condenada la persona jurídica mediante sentencia firme por delitos contemplados
en la ley N° 20.393.
     6. Póliza de seguros contratados en favor del personal que corresponda, de
acuerdo con lo establecido en la ley N° 21.659 y el presente reglamento.

     Párrafo II
     Disposiciones comunes al transporte de valores

     Artículo 54.- Transporte de valores. Se entenderá por transporte de valores el
conjunto de actividades asociadas a la custodia y traslado de valores desde un lugar
a otro, dentro y fuera del territorio nacional, por vía terrestre, aérea, fluvial,
lacustre o marítima.
     El transporte de valores solo se podrá realizar a través de empresas de
seguridad privada autorizadas por la Subsecretaría de Prevención del Delito, previo
informe técnico de la autoridad fiscalizadora.
     Las personas jurídicas que presten servicios de transporte de valores deberán
contar con un sistema de vigilancia privado, de conformidad con lo dispuesto en la
ley N° 21.659 y este reglamento. 
     La operación del transporte de valores se llevará únicamente a cabo por
vigilantes privados. Las empresas de transporte de valores deberán considerar,
especialmente, al momento de contratarlos, la trayectoria y experiencia que tengan en
materia de seguridad.

     Artículo 55.- Requisitos del estudio de seguridad de las empresas de transporte
de valores. Las empresas de transporte de valores deberán presentar un estudio de
seguridad, firmado por el jefe de seguridad que, además de los requisitos generales
establecidos en el artículo 15 del presente reglamento, contenga los siguientes
requisitos adicionales: 
     
     1. El modo en que se garantizará la protección de la vida e integridad física
de los vigilantes privados, empleados y del público en general.
     2. El procedimiento que permita la prevención y neutralización de delitos.
     3. La constatación de la existencia de un blindaje apropiado y de tecnología
suficiente para repeler atentados. 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 31 de 62

     4. Las políticas de selección del personal.
     5. La capacitación del personal involucrado en esta actividad.
     6. Las características de sus bóvedas y centros de acopio de dinero, con la
implementación de medidas de seguridad atingentes según su nivel de riesgo.
     7. Los niveles de riesgo, debidamente fundados con antecedentes técnicos o
científicos, que comprendan sus actividades.
     
     Los aspectos referidos a los numerales 3), 4), 5) y 6) del presente artículo
deberán estar debidamente fundados, encontrándose obligada la empresa a adjuntar
todos los antecedentes que sean necesarios para acreditarlo conforme a las
instrucciones que para tales efectos determine la Subsecretaría de Prevención del
Delito.
     Los estudios de seguridad a que se refiere este artículo tendrán una vigencia
de un año, susceptible de renovación de conformidad a lo dispuesto en el artículo
17 del presente reglamento. 

     Artículo 56.- Operaciones de alto riesgo. Serán consideradas como operaciones
de alto riesgo, aquellas que declaren la propia entidad en su estudio de seguridad y
aquellas que determine la Subsecretaría de Prevención del Delito, a propuesta de la
autoridad fiscalizadora. 
     Sin perjuicio de lo señalado en el inciso anterior, siempre serán consideradas
de alto riesgo las siguientes operaciones:
     
     1. Aquellas que se realicen fuera de la franja horaria comprendida entre las
07:00 y las 23:00 horas, en los términos señalados en el inciso final del artículo
58. Las operaciones deberán ser autorizadas por la Subsecretaría de Prevención del
Delito, previo informe de la autoridad fiscalizadora.
     2. Aquellas operaciones realizadas en zonas urbanas, establecidas por la
Subsecretaría de Prevención del Delito, previo informe de la autoridad
fiscalizadora.
     
     Las operaciones señaladas en el presente artículo deberán efectuarse siempre
con una tripulación de, a lo menos, cuatro vigilantes privados o una escolta de
vigilantes privados de apoyo, de conformidad a lo dispuesto en el artículo
siguiente.

     Artículo 57.- Vigilantes privados de apoyo. En casos calificados, la
Subsecretaría de Prevención del Delito, previo informe de la autoridad
fiscalizadora, podrá exigir o autorizar el uso de vigilantes privados de apoyo a la
actividad principal del transporte, con uniforme, con armamento y chaleco antibalas,
en vehículo no blindado con distintivos de la empresa. Este personal de apoyo no
podrá, en caso alguno, transportar valores.

     Párrafo III
     Transporte de valores por vía terrestre

     Artículo 58.- Obligaciones especiales de transporte de valores por vía
terrestre. El transporte de valores por vía terrestre deberá realizarse en
vehículos blindados, con una tripulación de, a lo menos, tres vigilantes privados,
incluyendo al conductor. Este último no podrá descender del vehículo mientras se
encuentre en servicio. Todos ellos deberán estar uniformados, armados y usar un
chaleco antibalas en el cual deberán llevar el respectivo distintivo de la empresa
de transporte de valores.
     El transporte de valores de infantería deberá realizarse con, a lo menos, dos
vigilantes privados en las mismas condiciones referidas en el inciso anterior. 
     Sin perjuicio ello, la Subsecretaría de Prevención del Delito podrá autorizar


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 32 de 62

el uso de medidas de seguridad diferentes cuando estas consistan en la utilización
de tecnología apropiada para la seguridad de la operación. Tales medidas serán
dispuestas a través del estudio de seguridad correspondiente.
     Se presumirá que existe tecnología apropiada en los términos del inciso
anterior, cuando los valores transportados se encuentren equipados con un sistema
disuasivo de entintado de billetes u otro de similares características.
     El desplazamiento del vehículo blindado para la realización de las operaciones
sólo deberá realizarse dentro de una franja horaria, comprendida entre las 07:00 y
las 23:00 horas, salvo aquellas operaciones interregionales y las que la
Subsecretaría de Prevención del Delito autorice expresamente a realizarlo fuera del
horario referido, mediante resolución fundada. 

     Artículo 59.- Autorización de funcionamiento especial de transporte de
valores. La Subsecretaría de Prevención del Delito, previo informe de la autoridad
fiscalizadora, considerando los montos transportados, el riesgo que conlleva, y los
elementos tecnológicos adicionales que pueden utilizarse para la seguridad de la
actividad, podrá autorizar, en casos calificados y fundados, que el transporte se
efectúe por vigilantes privados sin armamento, que puedan vestir tenida formal, con
distintivo de la empresa y en vehículos que se encuentren mecánica y
tecnológicamente acondicionados a la función. 

     Artículo 60.- Procesos de carga y descarga de valores. Los procesos de carga y
descarga de valores hacia y desde un vehículo blindado de una empresa de transporte
de valores, deberán realizarse en estancos debidamente resguardados, que para tales
efectos habilitarán las entidades emisoras o receptoras o cualquier establecimiento
que las contenga. 
     En caso de que las entidades señaladas en el inciso anterior no cuenten con
estancos, los vehículos blindados deberán realizar los procesos de carga y descarga
en el lugar más próximo a la entidad emisora o receptora de los mismos. Para la
seguridad de dichos procesos, estas entidades o los establecimientos que las
contengan deberán instalar, a lo menos, una cámara de vigilancia, monitoreada por
las mismas, que permita la captación de imágenes nítidas de dichas operaciones,
incluyendo el traslado de los valores desde el vehículo blindado al establecimiento
respectivo o viceversa. 
     En los procesos a que hacen referencia los incisos anteriores, deberá además
aislarse transitoriamente por parte de las entidades emisoras o receptoras o
cualquier establecimiento que las contenga, el lugar de carga y descarga en términos
tales que impidan a terceras personas acceder al lugar de la faena mientras esta se
realiza. Para estos efectos, se entenderá por aislamiento idóneo el que se realice
con barreras u otro elemento similar acorde al lugar en que se deba practicar. 
     Las entidades emisoras y receptoras, los establecimientos que las contengan y
los organismos públicos que tengan injerencia en la materia, deberán disponer todos
los medios que sean necesarios para el cumplimiento de lo establecido en el inciso
anterior, quedando prohibido todo tipo de acto que lo perturbe o impida. 
     Durante el procedimiento de carga y descarga de valores, deberá, al menos un
vigilante privado, realizar la función de cobertura correspondiente sin participar
del trasbordo de valores, a fin de supervigilar el contexto en que se ejecutan las
labores. 
     Tratándose de establecimientos que cuenten con servicios de guardias de
seguridad, las entidades emisoras o receptoras o cualquier establecimiento que las
contenga, deberán coordinar la participación de estos en los procedimientos de
aislamiento referidos en el inciso tercero.

     Artículo 61.- Planificación del transporte terrestre de valores. Las empresas
de transporte de valores deberán realizar una efectiva y eficiente planificación de
los horarios y rutas de viaje, estableciendo para ello un método de distribución de
las operaciones dentro del horario establecido en el artículo 58 inciso final de


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 33 de 62

este reglamento. Esta planificación deberá modificarse al menos una vez al mes, con
el fin de no otorgar predictibilidad a las operaciones. 

     Artículo 62.- Acopio temporal de valores. Las empresas de transporte de valores
podrán acopiar temporalmente los valores transportados. En tales casos, los centros
de acopio y sus bóvedas respectivas deberán cumplir con las medidas señaladas en
los artículos siguientes.

     Artículo 63.- Protección de los centros de acopio de dinero o valores. La
estructura física de las bóvedas de los centros de acopio de dinero o valores,
tales como muros, cielos, pisos y puertas, deberán contar con protección contra
elementos cortantes, fundentes, mecánicos o de cualquier otro tipo, además de
poseer sistemas de cerraduras de seguridad y contar con dispositivos electrónicos
específicos, que permitan detectar, repeler o retardar cualquier ataque.

     Artículo 64.- Seguridad electrónica de las bóvedas. Las bóvedas deben contar
con sistemas de monitoreo y control electrónico, tales como sensores de alarma;
controles de acceso; cerraduras electrónicas con retardo y bloqueo horario;
pulsadores de asalto conectados al sistema que Carabineros de Chile disponga para tal
efecto; detectores de incendio; un detector de humo y calor conectado al panel de
alarma del centro de acopio respectivo; un detector de vibración estructural y
extintores de fuego del tipo y en cantidad suficientes para el tamaño de la bóveda
y materiales almacenados. 
     Los pulsadores de alarma con los que deberán contar las bóvedas estarán
distribuidos estratégicamente en ellas.

     Artículo 65.- Régimen de protección y comunicación en los centros de acopio
temporal. Las oficinas, agencias o sucursales de las empresas de transporte de
valores en que se acopie el dinero o valores temporalmente deberán contar con una
zona de doble puerta para el ingreso de los vehículos blindados y contarán con un
sistema de vigilantes privados todos los días de la semana durante las veinticuatro
horas del día. 
     En las agencias o sucursales referidas, la bóveda, la tesorería y la central
de monitoreo deberán estar debidamente compartimentadas y aisladas entre sí y
respecto de las demás dependencias administrativas. 
     Asimismo, deberán tener sistemas de grabación de alta resolución que permitan
la captación de imágenes nítidas de las personas que ingresen y salgan de la
oficina, agencia o sucursal; y de todas aquellas que lleguen hasta las bóvedas de
acopio. 
     Dichos sistemas deberán estar conectados en línea a una central de monitoreo
de la propia entidad. Las cámaras y demás equipos de filmación deberán estar
instalados de forma tal que queden debidamente resguardados de una posible
intrusión. 
     Las capacidades de los sistemas de registro deberán permitir que las
grabaciones almacenadas puedan mantenerse por un período de, al menos, ciento veinte
días, salvo que la grabación sea susceptible de formar parte de una causa o
investigación judicial o proceso administrativo, en cuyo caso se deberá almacenar
hasta finalizar la tramitación legal correspondiente.
     Con todo, los registros que se obtengan, que no fueren requeridos por el
Ministerio Público, tribunales de justicia o un funcionario a cargo de un
procedimiento administrativo, deberán ser destruidos luego de transcurridos dos
años desde su captura. En virtud de lo anterior, aquellos registros que fueren
destruidos deberán constar en un acta en la que se indique, a lo menos, el nombre de
la persona a cargo de la gestión referida junto con su firma y la causal para su
procedencia.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 34 de 62

     Artículo 66.- Alarmas de los centros de acopio temporal. Las agencias o
sucursales referidas deberán contar con un sistema de alarmas instalado por una
empresa de seguridad electrónica que deberá estar conectada directamente al sistema
dispuesto por Carabineros de Chile para tal efecto.

     Artículo 67.- Vehículos blindados. Los vehículos blindados deberán tener en
el techo exterior un círculo de color naranja reflectante de la luz, de a lo menos,
un metro de diámetro donde deberá ir escrita en color negro la identificación de
la placa patente única del vehículo. La estructura básica del vehículo constará
de tres partes principales debidamente aisladas denominadas cabina del conductor,
habitáculo de la tripulación y bóveda de custodia de valores. Esta última deberá
contar con cerradura randómica. Las puertas del habitáculo de la tripulación, de
la bóveda y de la cabina del conductor deberán contar con cerraduras que no
permitan la apertura de estas simultáneamente. 
     Todos los vehículos utilizados para el transporte de valores deberán tener, a
lo menos, equipos de transmisión radial o de transmisión continua para mantenerse
permanentemente en contacto con la central de comunicaciones de la empresa y contar,
además, con un sistema de localización ya sea satelital o de efectos similares,
monitoreados en línea. 
     Estos vehículos tendrán un blindaje de resistencia mínima a la penetración
de un proyectil calibre 7.62 x 39 mm y sus neumáticos serán resistentes al
pinchazo. Sin perjuicio de lo anterior, la Subsecretaría de Prevención del Delito,
en casos fundados, y especialmente considerando las operaciones de alto riesgo a que
se refiere el artículo 56 del presente reglamento, podrá, mediante resolución
fundada, previo informe de la autoridad fiscalizadora, exigir que los vehículos
tengan un blindaje de 7.62 x 51 mm o superior.
     Asimismo, los vehículos referidos deberán contar con, a lo menos, cuatro
cámaras de televigilancia de alta resolución que permitan la captación de
imágenes nítidas, tres al interior y una al exterior de los vehículos. Una de las
cámaras que se instalarán al interior deberá estar en la cabina del conductor,
otra en el interior de la bóveda y la última en el habitáculo de la tripulación.
Las cámaras deberán estar debidamente resguardadas y conectadas directamente con
una central de monitoreo de la respectiva empresa de transporte de valores. 
     Las capacidades de los sistemas de registro deberán permitir que las
grabaciones almacenadas puedan mantenerse por un período de, al menos, ciento veinte
días, salvo que la grabación sea susceptible de formar parte de una causa o
investigación judicial o proceso administrativo, en cuyo caso se deberá almacenar
hasta finalizar la tramitación legal correspondiente.
     Con todo, los registros que se obtengan, que no fueren requeridos por el
Ministerio Público, tribunal de justicia o un funcionario a cargo de un
procedimiento administrativo, deberán ser destruidos luego de transcurridos dos
años desde su captura. En virtud de lo anterior, aquellos registros que fueren
destruidos deberán constar en un acta en la que se indique, a lo menos, el nombre de
la persona a cargo de la gestión referida junto con su firma y la causal para su
procedencia.
     Las centrales referidas en el inciso cuarto deberán ser monitoreadas por, a lo
menos, un funcionario de la empresa de transporte de valores por cada diez camiones
blindados. Además, deberán tener un sistema de comunicación directo con
Carabineros de Chile.
     Sin perjuicio de lo dispuesto en los incisos anteriores, en casos debidamente
calificados, en consideración a la geografía del lugar o de factores climáticos,
la Subsecretaría de Prevención del Delito podrá autorizar la utilización de un
vehículo motorizado diferente del que normalmente se utiliza para este tipo de
actividades, previo informe de la autoridad fiscalizadora.

     Artículo 68.- Medidas de seguridad de los envíos de valores. El transporte de


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 35 de 62

dinero en efectivo y de documentos mercantiles, se deberá hacer en bolsas o
contenedores confeccionados en material resistente al roce y probable intrusión.
Estos elementos deberán llevar la insignia corporativa, número que lo identifique y
sellos o precintos de cierre igualmente identificados con el nombre de la empresa de
transporte de valores. 

     Artículo 69.- Sistemas o dispositivos disuasivos de seguridad de entintado de
billetes. La Subsecretaría de Prevención del Delito mantendrá, en el subregistro
de empresas de seguridad privada, una nómina en que las empresas de transporte de
valores deberán solicitar la inscripción de los sistemas o dispositivos disuasivos
de seguridad de entintado de billetes que decidan utilizar en las bolsas o
contenedores.
     Para este efecto, la empresa solicitante presentará los informes o certificados
emitidos por el o los fabricantes o proveedores de dichos dispositivos y de las
tintas especiales que estos utilicen, en que se detallen sus elementos distintivos y
especificaciones técnicas, además de precisar las pruebas o certificaciones y la
respectiva tecnología disuasiva de seguridad a que dichos componentes hayan sido
sometidos, en orden a establecer su buen funcionamiento y eficacia. 
     En todo caso, de acompañarse documentos otorgados en el extranjero, dichos
antecedentes deberán presentarse debidamente legalizados.
     Los sistemas de entintado de billetes y sus respectivos informes o
certificaciones deberán asegurar que, en caso de accionamiento, los billetes que
contengan los respectivos dispositivos resulten entintados, al menos, en el veinte
por ciento de su superficie total, por anverso y reverso, lo cual deberá constar en
la documentación antes referida.
     Asimismo, los solicitantes deberán entregar muestras de las tintas que se
emplearán en los dispositivos disuasivos de seguridad, a las que deberán referirse
los mencionados informes o certificados que se acompañen.
     La Subsecretaría de Prevención del Delito entregará un certificado que dé
cuenta de su incorporación en la nómina, en los términos mencionados, de los
dispositivos, tecnologías y tintas, con lo que se entenderá autorizada su
utilización, para los efectos del presente reglamento.
     Una vez otorgado dicho certificado, la Subsecretaría de Prevención del Delito
remitirá al Banco Central de Chile copia de este y de la documentación presentada
por el solicitante para la inscripción de los dispositivos, tecnologías y tintas
cuyo empleo se autoriza. La autorización se mantendrá vigente por el plazo de dos
años, contado desde la fecha de la solicitud de inscripción respectiva, lo cual se
hará constar en el certificado emitido al efecto, pudiendo solicitar su renovación
dentro del plazo de sesenta días corridos previo a la fecha de expiración de la
vigencia. 
     Corresponderá al solicitante de la incorporación en la nómina, informar y
acreditar ante la Subsecretaría de Prevención del Delito las modificaciones que
experimenten los referidos dispositivos o la formulación de las tintas especiales
que utilicen, precisando sus nuevas características en la forma y con la
documentación antes referida, lo que dará lugar a la emisión del certificado
correspondiente por parte de dicha Subsecretaría, el que será expedido con
sujeción a lo previsto en este artículo.

     Artículo 70.- Transporte de valores por vía aérea. Este tipo de transporte se
regirá por las normas señaladas para el transporte terrestre, en lo que sea
aplicable, de acuerdo con su naturaleza y características propias.
     En estos casos, la Dirección General de Aeronáutica Civil ejercerá las
funciones de autoridad fiscalizadora, conforme a lo establecido en los artículos 1 y
86 de la ley N° 21.659. Las empresas de transporte de valores deberán coordinar sus
operaciones con esta autoridad.
     La Subsecretaría de Prevención del Delito, previa propuesta de la Dirección
General de Aeronáutica Civil, dictará, mediante resolución, instrucciones


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 36 de 62

generales que complementen las normas aplicables a este tipo de transporte de
valores, en virtud de lo dispuesto en el numeral 1 del artículo 83 de la ley N°
21.659. 

     Artículo 71.- Transporte de valores por vía fluvial, lacustre o marítima.
Este tipo de transporte se regirá por las normas señaladas para el transporte
terrestre, en lo que sea aplicable, de acuerdo a su naturaleza y características
propias.
     En estos casos, la Dirección General del Territorio Marítimo y Marina Mercante
ejercerá las funciones de autoridad fiscalizadora, conforme a lo establecido en los
artículos 1 y 86 de la ley N° 21.659. Las empresas de transporte de valores
deberán coordinar sus operaciones con esta autoridad.
     La Subsecretaría de Prevención del Delito, previa propuesta de la Dirección
General del Territorio Marítimo y Marina Mercante, dictará, mediante resolución,
instrucciones generales que complementen las normas aplicables a este tipo de
transporte de valores, en virtud de lo dispuesto en el numeral 1 del artículo 83 de
la ley N° 21.659.

     Artículo 72.- Servicio de pago de remuneraciones. Las empresas de transporte de
valores podrán realizar, con recursos humanos y materiales propios o subcontratados
y por cuenta de los respectivos mandantes, servicios de pagos de pensiones y
remuneraciones a funcionarios o trabajadores de entidades públicas y privadas que lo
contraten en lugares, días y horas, previamente comunicadas a la autoridad
fiscalizadora respectiva.
     Las condiciones generales de seguridad de los lugares o recintos de pago serán
propuestas por la empresa de transporte de valores a la Subsecretaría de Prevención
del Delito, las que serán resueltas previo informe de la autoridad fiscalizad ora.
     No obstante lo anterior, será requisito indispensable para conceder la
autorización de estos servicios, que se efectúe aislando el recinto de pago, con
vigilancia armada, control de accesos a cargo de guardias de seguridad, teléfono y
sistema de alarma interconectado a una central de vigilancia de Carabineros de Chile.

     Tratándose de pagos que se realicen en zonas rurales de difícil acceso, la
Subsecretaría de Prevención del Delito, previo informe de la autoridad
fiscalizadora correspondiente, podrá eximir del cumplimiento de una o más medidas
de seguridad mínimas señaladas en el inciso precedente.

     Artículo 73.- Centros de recaudación y de pagos. Las empresas de transporte de
valores podrán administrar, por cuenta de terceros, centros de recaudación y de
pagos.
     Para que proceda lo dispuesto en el inciso precedente, deberá cumplirse con las
condiciones de seguridad a continuación indicadas: con vigilantes privados,
controles de acceso, circuitos cerrados de televisión con respaldo de grabación,
cajas blindadas y compartimentadas, sistema de alarma, cajas de seguridad tipo buzón
y recinto aislado para la entrega y retiro de valores, sin perjuicio de lo previsto
en el artículo 39 de la ley N° 21.659.

     Artículo 74.- Cajeros automáticos. Las empresas de transporte de valores
estarán autorizadas para mantener los dispensadores de dineros, cajeros automáticos
u otros sistemas de similares características, de propiedad de entidades bancarias y
financieras de cualquier naturaleza o de empresas de apoyo al giro bancario que
reciban o mantengan dineros en sus operaciones; o que estas entidades administren a
cualquier título.
     Las operaciones que involucren aper tura de la bóveda deberán realizarse con
la presencia de, a lo menos, una tripulación de tres vigilantes privados y tendrá
lugar con ocasión de las recargas o de la reposición de dinero o de asistencia


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 37 de 62

técnica.
     Para la solución de fallas o de asistencia técnica que involucren apertura de
bóveda, las empresas de transporte de valores podrán realizar esta actividad usando
vehículos no blindados con el distintivo de la empresa, con una tripulación de, a
lo menos, dos vigilantes privados.
     Cualquier recarga o reposición de dinero a los contenedores de los cajeros
automáticos, deberá hacerse en una zona aislada del público, en términos tales
que impida a terceras personas acceder al lugar de la faena mientras esta se realiza.
Se entenderá por aislamiento idóneo para estos efectos el que se realice con
barreras u otro elemento similar acorde al lugar en que se deba practicar. Lo
dispuesto en el presente inciso será de cargo de la entidad en que se encuentra
emplazado el respectivo cajero automático.
     El recuento de los valores de los cajeros automáticos solo podrá realizarse en
lugares aislados especialmente habilitados al efecto o al interior de los camiones
blindados. En caso alguno, esta operación se hará a la vista o ante la presencia de
público.
     Las operaciones que no involucren apertura de bóvedas podrán efectuarse por
técnicos u operadores de la empresa, debidamente acreditados ante la Subsecretaría
de Prevención del Delito, de conformidad a los artículos 110 y 113 del presente
reglamento, respectivamente. 

     Artículo 75.- Comunicación entre instituciones. Toda comunicación que se
realice entre un banco o una entidad financiera y una empresa de transporte de
valores que se refiera al envío, retiro o manipulación de dineros o especies
valoradas desde o hacia sus clientes, otras entidades obligadas, dependencias o
equipos en que se dispense dinero, deberá hacerse a través de mensajería
electrónica encriptada que cumpla los estándares de seguridad y confiabilidad que
la banca dispone en su sistema de comunicaciones bancarias. 
     En caso de que existan situaciones de excepción o contingencia, dicha
comunicación podrá hacerse en forma escrita, firmada por el tesorero de la entidad
financiera y entregada personalmente a la empresa de transporte de valores por un
trabajador acreditado ante esta.

     Párrafo IV
     Empresas de seguridad electrónica

     Artículo 76.- Empresas de seguridad electrónica. Son aquellas que tienen por
objeto:
     
     1. La instalación y mantenimiento de aparatos, equipos, dispositivos,
componentes tecnológicos y sistemas de seguridad con fines privados, conectados a
centrales receptoras de alarmas, centros de control o de videovigilancia privados;
     2. La operación de dichas centrales y centros; y
     3. La disposición de medios materiales, técnicos y humanos para los fines
anteriormente señalados.

     Artículo 77.- Autorización de funcionamiento. La autorización para el
funcionamiento de las empresas de seguridad electrónica será otorgada por la
Subsecretaría de Prevención del Delito, a solicitud de la empresa y previo informe
de la autoridad fiscalizadora. 
     La empresa deberá realizar su solicitud de autorización conforme al
procedimiento dispuesto en el artículo 51 del presente reglamento. No obstante lo
anterior, se deberá ceñir a las siguientes reglas especiales:
     
     Su solicitud deberá:
     1. Declarar la o las actividades de seguridad electrónica específicas que


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 38 de 62

pretenden desempeñar. 
     2. Describir en forma pormenorizada todos los equipos, materiales y elementos
que pretenda proporcionar, instalar, mantener o reparar.
     3. Adjuntar, en el caso de las empresas que administran servicios de cámaras de
televigilancia y alarma, los protocolos de monitoreo, de medios de comunicación y
verificación en caso de activación de las alarmas, suscritos por el representante
legal de la empresa y por un asesor de seguridad privada.
     4. Acompañar los certificados emitidos por el o los organismos sectoriales
pertinentes, de conformidad a lo establecido en el artículo 81 del presente
reglamento.
     
     Las empresas de seguridad electrónica que sean autorizadas deberán inscribirse
en el subregistro de empresas de seguridad privada señalado en el artículo 122 de
este reglamento. 

     Artículo 78.- Obligaciones de información a los usuarios de las empresas de
seguridad electrónicas. Sin perjuicio de las obligaciones establecidas en la ley N°
19.496 sobre protección de los derechos de los consumidores, las empresas estarán
obligadas a informar adicionalmente a sus usuarios sobre el funcionamiento del
servicio que prestan, las características técnicas y funcionales del sistema de
seguridad electrónico instalado y las responsabilidades que lleva consigo su uso.
Asimismo, deberán entregar la documentación sobre configuración de los sistemas,
guías y recomendaciones de uso. Dicha información se entregará a los usuarios por
vías idóneas, las que deberán asegurar un acceso oportuno. 

     Artículo 79.- Gestión del monitoreo de alarmas y medios de verificación de
emergencias. Las empresas de seguridad electrónica deberán monitorear la
activación de aparatos, dispositivos, sistemas de seguridad o de alarmas que se
encuentren conectados a una central de Carabineros de Chile, cada vez que se produzca
una activación, para verificar si constituyen efectivamente una emergencia. 
     La referida verificación deberá efectuarse por, al menos, dos canales
independientes que permitan la constatación en tiempo real del incidente con el
objeto de comunicar a las policías y suministrar, en su caso, los antecedentes del
hecho. Sin perjuicio de esto, una alarma se considerará verificada sin necesidad de
la constatación por otros medios adicionales, cuando un solo canal permita dar
cuenta, razonablemente, de la existencia de un acto delictivo.
     Para la correcta verificación, las empresas de seguridad electrónica podrán
utilizar sistemas tecnológicos, humanos y/o materiales idóneos, tales como botón
de pánico, contacto telefónico con el usuario, fotografías o imágenes captadas en
el domicilio del usuario, concurrencia del personal de la empresa al domicilio, entre
otras.

     Artículo 80.- Calificación del personal de las empresas de seguridad
electrónica. Las empresas de seguridad electrónica deberán garantizar que el
personal de su dependencia cuente con los conocimientos necesarios para desempeñar
las funciones para las que ha sido contratado. Lo anterior, se acreditará a través
de los respectivos certificados de estudios y/o de las capacitaciones que el
empleador le provea en el área, sin perjuicio de las reglas generales y especiales
que correspondan, dispuestas para las personas naturales que ejercen actividades de
seguridad privada, de conformidad a los párrafos V y X del presente título,
respectivamente. 
     Las empresas de seguridad electrónica deberán acompañar los antecedentes que
acrediten la calificación de su personal al momento de presentar la solicitud de
autorización de funcionamiento ante la Subsecretaría de Prevención del Delito. 

     Artículo 81.- Certificación de dispositivos tecnológicos. Los dispositivos


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 39 de 62

tecnológicos que ofrezcan las empresas de seguridad electrónica deberán contar con
los certificados emitidos por el o los organismos sectoriales pertinentes, tales como
la Superintendencia de Electricidad y Combustibles, la Dirección General de
Aeronáutica Civil u otras, las que acreditarán el cumplimiento de la normativa
vigente, en el ámbito de sus competencias. 
     Para estos efectos, las empresas de seguridad electrónica deberán acompañar
el o los certificados emitidos por las instituciones referidas en el inciso
precedente en la solicitud de autorización de funcionamiento, lo que será evaluado
por la Subsecretaría de Prevención del Delito para su otorgamiento.

     Párrafo V
     Las personas naturales que ejercen labores de seguridad privada

     Artículo 82.- Requisitos de las personas naturales que prestan servicios de
seguridad privada. Para ser autorizados por la Subsecretaría de Prevención del
Delito, las personas naturales que presten servicios en materias de seguridad privada
deberán cumplir con los requisitos generales establecidos en el artículo 46 de la
ley N° 21.659, sin perjuicio de los requisitos especiales que se requieran para el
ejercicio de determinados cargos, de conformidad a la ley N° 21.659 y del presente
reglamento.

     Artículo 83.- Periodicidad de la acreditación de las aptitudes físicas y
psíquicas. Todo empleador, a su cargo y costo, deberá presentar ante la
Subsecretaría de Prevención del Delito los antecedentes que permitan acreditar que
las personas naturales que presten servicios en materia de seguridad privada cuenten
con las condiciones físicas y síquicas compatibles con las labores que desempeñen,
considerando criterios de inclusión y no discriminación. 
     Los vigilantes privados deberán acreditar estos requisitos cada año, los
guardias de seguridad cada dos años y las demás personas naturales que ejercen
funciones de seguridad privada, cada cuatro años, contados desde que se le notifique
la autorización o su renovación. 

     Artículo 84.- Modo de acreditar los requisitos generales de las personas
naturales que presten servicios en materia de seguridad privada. La acreditación de
los requisitos generales establecidos en el artículo 46 de la ley N° 21.659, para
las personas naturales que ejercen funciones de seguridad privada, se realizará de
la siguiente manera:
     
     1. La mayoría de edad se acreditará por medio de una copia de la cédula de
identidad por ambos lados.
     2. Las condiciones físicas se acreditarán mediante un certificado emitido por
un médico cirujano, que se encuentre en el Registro Nacional de Prestadores
Individuales de Salud, consignando, claramente, el nombre completo y el número de
cédula de identidad del facultativo.
     Las condiciones psíquicas se acreditarán mediante un certificado emitido por
un médico psiquiatra o un psicólogo, que se encuentre en el Registro Nacional de
Prestadores Individuales de Salud, consignando, claramente, el nombre completo y el
número de cédula de identidad del profesional.
     3. La educación media o su equivalente se acreditará mediante certificado de
estudios emitido por el Ministerio de Educación.
     Los certificados de estudios de personas extranjeras deberán presentarse
debidamente legalizados o apostillados, según corresponda.
     4. Los requisitos relativos a la ausencia de condenas de los numerales 4 y 5 del
artículo 46 de la ley N° 21.659, se acreditarán mediante la presentación de un
certificado de antecedentes, expedido en los términos dispuestos en el inciso final
del artículo 38 de la ley N° 18.216 que establece penas que indica como


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 40 de 62

sustitutivas a las penas privativas o restrictivas de libertad. 
     5. Los requisitos establecidos en los numerales 6 y 9 del artículo 46 de la ley
N° 21.659 se acreditarán mediante una declaración jurada simple. 
     6. El requisito establecido en el numeral 7 del artículo 46 de la ley N°
21.659, se acreditará mediante un certificado de no haber dejado de pertenecer a las
Fuerzas Armadas, de Orden y Seguridad Pública y Gendarmería de Chile, producto de
la aplicación de una medida disciplinaria, según corresponda, emitido por la
institución respectiva. 
     7. El requisito establecido en el numeral 8 del artículo 46 de la ley N°
21.659 se acreditará por medio del certificado emitido por la Subsecretaría de
Prevención del Delito respecto del subregistro de sanciones que afecten a todas las
personas naturales y jurídicas que ejercen actividades de seguridad privada.
     8. El requisito establecido en el numeral 10 del artículo 46 de la ley N°
21.659 se acreditará mediante un certificado otorgado por la institución a la que
perteneció. 
     9. El requisito establecido en el numeral 11 del artículo 46 de la ley N°
21.659 se acreditará mediante un certificado de aprobación de los exámenes de los
cursos de capacitación requeridos en la ley N° 21.659, emitido por la
Subsecretaría de Prevención del Delito. 
     10. El requisito establecido en el numeral 13 del artículo 46 de la ley N°
21.659 se acreditará mediante el certificado respectivo emanado de la Dirección
General de Movilización Nacional.
     11. El requisito establecido en el numeral 14 del artículo 46 de la ley N°
21.659 se acreditará de conformidad a lo dispuesto en la ley N° 21.325, de
Migración y Extranjería. 

     Artículo 85.- Procedimiento de autorización de personas naturales. El
interesado remitirá una solicitud a la Subsecretaría de Prevención del Delito,
suscrita por este, la cual deberá contener, a lo menos, lo siguiente:
     
     1. Indicar nombre completo, domicilio, cédula de identidad, correo electrónico
y teléfono de contacto.
     2. Señalar actividad de seguridad privada que pretende ejercer.
     3. Acompañar los antecedentes que permitan acreditar el cumplimiento de los
requisitos generales o especiales, según el tipo de actividad de seguridad privada
que pretenda realizar.
     
     Durante la revisión de los antecedentes presentados por el interesado, la
Subsecretaría de Prevención del Delito podrá solicitar que estos se complementen,
se subsanen errores, omisiones formales, así como requerir aclaraciones. El
interesado tendrá un plazo máximo de cinco días, contado desde la notificación,
para cumplir con lo solicitado. En caso de que estos fueren insuficientes o no fueren
presentados dentro del plazo correspondiente, la Subsecretaría tendrá por desistida
la solicitud, mediante resolución, lo que pondrá fin al procedimiento.
     Una vez recibida la solicitud o los antecedentes complementarios, según el
caso, la Subsecretaría de Prevención del Delito podrá requerir a la autoridad
fiscalizadora competente un informe donde esta se pronuncie sobre la solicitud, en
función de la naturaleza y características de la actividad para las que el
interesado solicita autorización. La autoridad fiscalizadora deberá remitir el
informe en el plazo de quince días contado desde la recepción del requerimiento.
     La Subsecretaría de Prevención del Delito deberá resolver fundadamente, en el
plazo de veinte días contado desde la recepción de la solicitud, desde que se
complementen los antecedentes o desde que se reciba el informe de la autoridad
fiscalizadora, según sea el caso.
     Cada vez que se modifiquen los antecedentes señalados en el numeral 1), las
personas naturales deberán actualizar esta información en la plataforma
informática del artículo 115 de este reglamento.
     La vigencia de la autorización para las personas naturales que ejerzan


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 41 de 62

actividades de seguridad privada tendrá una vigencia de cuatro años, con excepción
de aquella que se otorgue a los vigilantes privados, la cual tendrá una vigencia de
dos años. La vigencia se computará desde que se notifique al interesado la
resolución que lo autorice.
     Las personas naturales que ejerzan actividades de seguridad privada con, a lo
menos treinta días de anticipación a la fecha de vencimiento de la autorización,
podrán solicitar su renovación por el período correspondiente, según el cargo que
desempeñen, para lo cual deberán acreditar nuevamente el cumplimiento de los
requisitos señalados en los numerales 2, 4, 5, 6, 7, 8, 9 y 10 del artículo 46 de
la ley N° 21.659, además de los requisitos especiales que correspondan. 
     Asimismo, deberán acreditar el cumplimiento de lo dispuesto en el numeral 11 de
la misma disposición, en el caso que deban aprobar cursos de capacitación. Vencido
el plazo señalado, deberán presentar la totalidad de la documentación demostrando
los requisitos para proceder a su autorización como si fuera la primera vez.

     Párrafo VI
     Prohibiciones de las personas naturales y jurídicas

     Artículo 86.- Prohibiciones sobre las actividades de seguridad privada. Las
personas naturales y jurídicas que desempeñen actividades de seguridad privada
quedarán sujetas a las siguientes prohibiciones:
     
     1. Prestar o hacer publicidad de servicios de seguridad privada sin contar con
la autorización para actuar como empresa de seguridad privada.
     2. Desarrollar cualquier tipo de investigación sobre hechos que revistan
caracteres de delito, incluyendo interceptación de comunicaciones, realizar
interrogatorios o registrar vestimentas. Asimismo, no podrán grabar ni almacenar
imágenes, audios o datos del recinto o establecimiento donde prestan servicios, para
fines distintos de seguridad.
     3. Intervenir, en el ejercicio de sus funciones de seguridad privada, en
conflictos políticos, laborales, celebración de reuniones o manifestaciones.
     4. Suministrar información a terceros, salvo las excepciones legales, acerca de
personas, bienes y procesos productivos obtenidos con motivo u ocasión de la
prestación del servicio.
     5. Poseer o almacenar armas sin la autorización respectiva, la que, en todo
caso, deberá estar siempre en concordancia con la legislación vigente.
     6. Proporcionar u ofrecer, bajo cualquier forma o denominación, servicios de
personas que porten o utilicen armas de fuego, con excepción de las empresas de
transporte de valores autorizadas en conformidad con la ley N° 21.659 y este
reglamento. 
     7. Desempeñar u ofrecer servicios de vigilantes privados, guardia de seguridad
y demás personal que ejerce actividad de seguridad privada sin la autorización de
la Subsecretaría de Prevención del Delito. 

     Párrafo VII
     Guardias de seguridad

     Artículo 87.- Guardia de seguridad. Es aquel que, sin ser vigilante privado,
otorga personalmente protección a personas y bienes, dentro de un recinto o área
determinada y previamente delimitada.

     Artículo 88.- Seguro de vida a favor de los guardias de seguridad. Los
empleadores deberán contratar un seguro de vida a favor de cada guardia de
seguridad, cuyo monto no podrá ser inferior al equivalente a ciento treinta y dos
unidades de fomento, salvo que este se desempeñe en una entidad obligada a tener un


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 42 de 62

sistema de vigilancia privada, en cuyo caso el monto no podrá ser inferior a
doscientas cincuenta unidades de fomento. 
     Este seguro de vida cubrirá los riesgos a los que se encuentre expuesto el
guardia de seguridad, siempre que se cumplan las siguientes condiciones:
     
     1. Que el siniestro ocurra con motivo u ocasión del desempeño de sus labores.
     2. Que el asegurado cumpla los requisitos generales y específicos consagrados
en la ley N° 21.659 y en el presente reglamento al momento en que ocurra el
siniestro. 
     3. Que la relación laboral entre el trabajador y la respectiva entidad
empleadora se encuentre vigente al momento en que ocurra el siniestro.

     Artículo 89.- Capacitaciones y especializaciones. La formación de los guardias
de seguridad estará compuesta por tres cursos: formación, perfeccionamiento y
especialización:
     
     1. Formación: es aquel que habilita a una persona natural para desempeñarse
como guardia de seguridad, cualquiera sea el nivel de riesgo de la entidad para la
que se desempeñe. Este curso se rendirá una sola vez, con excepción de lo
dispuesto en el inciso final del presente artículo. Su duración será de, a lo
menos, noventa horas pedagógicas y su contenido mínimo se regirá por lo dispuesto
en el artículo 107 N° 1 de este reglamento. 
     2. Perfeccionamiento: es aquel que permite a los guardias de seguridad
actualizar los conocimientos del curso de formación y acreditar sus competencias
para desempeñarse en entidades que no se encuentren obligadas a tener medidas de
seguridad privada, de conformidad a lo dispuesto en la ley N° 21.659 y al presente
reglamento. Este curso deberá aprobarse cada cuatro años y deberá tener una
duración de, a lo menos, treinta y seis horas pedagógicas.
     3. Especialización: es aquel que permite a un guardia de seguridad adquirir las
competencias necesarias para desempeñarse en entidades o actividades de nivel de
riesgo medio o alto, según el artículo 9° de este reglamento. Este curso
reemplazará al de perfeccionamiento, deberá aprobarse cada cuatro años y tendrá
una duración de, a lo menos, treinta y seis horas pedagógicas. 
     
     Si la persona no rinde el curso de perfeccionamiento o de especialización en
los plazos correspondientes, deberá rendir nuevamente el curso de formación.

     Artículo 90.- Uniforme de los guardias. El uniforme de los guardias de
seguridad deberá cumplir con los siguientes detalles y características:
 
     1. Gorra de color negro, modelo militar, visera negra y barboquejo del mismo
color o bien, gorra tipo jockey/quepis, de color negro.
     2. Camisa color negra, confeccionada con tela gruesa o delgada, manga corta o
larga abotonada, según la época del año.
     3. Pantalón color negro, confeccionado con tela gruesa o delgada, según la
época del año.
     4. Calzado y calcetines negros.
     5. Cinturón negro con cartuchera del mismo color, para portar bastón
retráctil, en caso de que sea procedente.
     6. Chaleco de alta visibilidad, con las siguientes características:
     
     a) Material fluorescente, entendiéndose como tal aquel que emite radiación
óptica de longitud de onda mayor que la absorbida.
     b) Color rojo, dispuesto dentro del área definida por las siguientes
coordenadas cromáticas:


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 43 de 62

     c) Bandas de material retrorreflectante plateada de un ancho no inferior a 50
mm, dispuestas según se ejemplifica a continuación:

     d) El chaleco de alta visibilidad deberá indicar en la parte superior trasera
las palabras "Seguridad Privada", letras que serán de color blanco, dispuesto dentro
del área definida por las siguientes coordenadas cromáticas:

     e) Apostar en la parte superior derecha insignias de un ancho máximo de 5
centímetros por un largo máximo de 5 centímetros cada una, que identifiquen tanto
a la empresa de seguridad privada que proporciona el personal de seguridad privada
como a la empresa en donde se están prestando los servicios. Estas insignias podrán
ser desprendibles del uniforme. 
     
     7. Chaquetón impermeable, con cierre eclair o abotonado, para uso en la época
del año que corresponda, con las siguientes características:
     
     a) Color rojo, dispuesto dentro del área definida por las siguientes
coordenadas cromáticas:


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 44 de 62

     b) Indicar en la parte superior delantera del lado derecho y en la parte
superior trasera las palabras "Seguridad Privada", en letras de color blanco.
     
     El uniforme a que se refiere este artículo es de uso exclusivo de los guardias
de seguridad, el cual deberá ser proporcionado gratuitamente por el empleador para
el que prestan sus servicios, en cantidad y calidad suficientes, de conformidad a lo
dispuesto en la directiva de funcionamiento.
     La Subsecretaría de Prevención del Delito podrá dictar instrucciones
generales, de conformidad a lo dispuesto en el artículo 83 N° 1 de la ley N°
21.659, que establezcan reglas especiales referidas al uniforme, exclusivamente en
atención a circunstancias de seguridad, climáticas u otras relativas a la
naturaleza de la entidad en la que se desempeñan los guardias de seguridad, sin
perjuicio de las obligaciones laborales que sean aplicables al empleador. Asimismo,
podrá autorizar, mediante resolución fundada, modificaciones en el uso de
uniformes, en atención a estas mismas circunstancias. 

     Artículo 91.- Credencial de los guardias de seguridad. Para desempeñarse como
guardia de seguridad se deberá contar con una autorización, emitida por la
Subsecretaría de Prevención del Delito, a través de una resolución que se
notificará al interesado.
     Dicha autorización se concederá a quienes cumplan con los requisitos
establecidos en el artículo 46 de la ley N° 21.659 y acompañe el certificado de
aprobación del curso de capacitación correspondiente, de conformidad a lo
establecido en el artículo 89 de este reglamento. 
     En virtud de esta autorización, se entregará una licencia, personal e
intransferible, que constará en una credencial, emitida por la Subsecretaría de
Prevención del Delito.
     La credencial consistirá en una tarjeta de plástico de 5,5 centímetros de
ancho por 8,5 centímetros de largo. En el anverso, en la parte superior izquierda
llevará el membrete de la Subsecretaría de Prevención del Delito y, a
continuación, el número clasificado que la autoridad le asigne; al costado derecho
con letra destacada la leyenda "Credencial de Guardia de Seguridad"; al costado
izquierdo desde el medio hacia abajo y en orden descendente se indicará el nombre
del guardia, su cédula de identidad y la fecha de vencimiento de la credencial; en
el lado inferior derecho llevará una fotografía en colores con el fondo de color
blanco, de 3,5 centímetros de alto por 2,8 centímetros de ancho sin ninguna
anotación. Entre la individualización y la fotografía se estampará el timbre de
la Subsecretaría de Prevención del Delito.
     En el reverso, en letras mayúsculas y destacadas, contendrá la siguiente
leyenda: "esta Credencial identifica al guardia de seguridad habilitado para ejercer
sus funciones solo dentro del recinto o área determinada en que la entidad tiene
autorización. Prohibido cualquier otro uso. En caso de extravío devuélvase a la
autoridad fiscalizadora correspondiente". 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 45 de 62

     Todos los gastos que se originen en el otorgamiento de la credencial serán de
cargo del solicitante. La Subsecretaría de Prevención del Delito, mediante
resolución, establecerá los costos de la emisión de estas credenciales, las que
regirán desde la publicación del acto administrativo en el Diario Oficial. 
     Si a la fecha del inicio de la prestación de servicios de un guardia de
seguridad aún no se ha expedido la correspondiente credencial, la resolución que lo
autorizó para desempeñarse como guardia bastará, provisoriamente, para ejercer sus
labores y acreditar su calidad, debiendo el guardia portar dicha resolución de forma
física o digital durante su jornada de trabajo. 
     En caso de pérdida o extravío de la credencial, el guardia deberá dar aviso
para su bloqueo, dentro de un plazo máximo de veinticuatro horas, a la
Subsecretaría de Prevención del Delito, quien deberá otorgarle una nueva, a costa
del solicitante, sin perjuicio de las infracciones que procedan cuando dicha
situación sea imputable al guardia o a la entidad para la que se desempeña. En el
tiempo intermedio, el guardia podrá ejercer sus funciones y acreditar su calidad en
la forma establecida en el inciso anterior.
     La omisión del deber de dar aviso de la pérdida o extravío de la credencial,
en la forma establecida en el inciso precedente, constituirá infracción leve de
conformidad lo dispone el artículo 98 N° 3 de la ley N° 21.659. 

     Artículo 92.- Directiva de funcionamiento de los guardias de seguridad. Es un
instrumento en el que deben constar los servicios que desarrollen los guardias de
seguridad, el cual deberá contener, a lo menos, lo siguiente:
     
     1. El lugar donde se realizarán los servicios.
     2. La individualización de las personas que prestan el servicio, con
indicación de los elementos defensivos y de protección con los que contarán. 
     3. Contendrá un análisis del entorno de la instalación en la que los guardias
de seguridad desarrollan sus funciones. Lo anterior, con el objeto de describir sus
debilidades y amenazas. 
     4. Las medidas de seguridad que se implementarán para neutralizar el accionar
delictual, individualizando a la persona a cargo de la supervisión y describiendo su
responsabilidad.
     5. La forma en que se desarrollarán las comunicaciones con la Subsecretaría de
Prevención del Delito y la autoridad fiscalizadora. 
     La persona natural o jurídica para la cual los guardias de seguridad prestan
sus funciones deberá presentar una directiva de funcionamiento ante la
Subsecretaría de Prevención del Delito con, al menos, quince días de anticipación
a la fecha del inicio de prestación de los servicios. Una vez recibida la solicitud,
la Subsecretaría la remitirá a la autoridad fiscalizadora para que emita un informe
en donde entregue su opinión técnica respecto de la directiva de funcionamiento.
Dicho informe deberá emitirse en el plazo de quince días contado desde la
recepción de la solicitud. 
     Una vez recibido el informe por la Subsecretaría, esta tendrá un plazo de
veinte días para pronunciarse sobre la directiva, la que podrá ser aprobada o
modificada, en cuyo caso el o los interesados tendrán un plazo de diez días contado
desde que se notifique el acto administrativo correspondiente, para efectuar las
modificaciones o en el plazo prudencial que determine la Subsecretaría. Una vez
incorporadas las modificaciones, la Subsecretaría de Prevención del Delito deberá
aprobarlas, mediante resolución. 
     La vigencia de la directiva de funcionamiento será de tres años, a contar de
la notificación de la resolución aprobatoria. Transcurrido ese plazo, deberá
presentar una nueva directiva de funcionamiento actualizando las medidas de seguridad
en ella contenidas. No regirá la vigencia de tres años para la autorización de
servicios temporales, por ejemplo, eventos masivos, construcción de condominios,
entre otros. En estos casos, la vigencia se otorgará por el plazo que dure la
actividad.
     Una copia de la directiva de funcionamiento deberá permanecer siempre en las


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 46 de 62

dependencias de la instalación, la que debe ser exhibida al momento de su
fiscalización.

     Artículo 93.- Elementos defensivos y de protección de los guardias de
seguridad. Los guardias de seguridad deberán contar con elementos defensivos y de
protección proporcionales a la función y nivel de riesgo de la entidad donde se
desempeñan. Estos elementos deberán constar en la directiva de funcionamiento
autorizada por la Subsecretaría de Prevención del Delito. 
     Los guardias de seguridad deberán contar como elemento mínimo con un chaleco
anticortes. Sin perjuicio de lo anterior, de oficio o a petición del guardia de
seguridad o de su empleador, la Subsecretaría de Prevención del Delito, mediante
resolución fundada, previo informe de la autoridad fiscalizadora, podrá disponer la
utilización de uno o más elementos adicionales, tales como chaleco antibalas,
bastón retráctil o esposas considerando el nivel de riesgo al que se enfrenta,
según lo establecido en el artículo 9 del presente reglamento y la directiva de
funcionamiento aprobada. 
     Al término de la jornada de trabajo, el guardia de seguridad deberá restituir
los elementos defensivos a la persona designada por el empleador para su custodia.
Para estos efectos, el sujeto obligado deberá disponer en un lugar cerrado que
ofrezca garantías suficientes de seguridad y que se encuentre dentro del mismo
recinto informado en el estudio de seguridad y sus respectivos planes, en su caso.
     Los empleadores deberán incorporar, en los respectivos contratos de trabajo de
los guardias de seguridad, estipulaciones tendientes a asegurar la entrega y
restitución de los elementos defensivos y de protección, de conformidad a lo
dispuesto en los incisos precedentes, teniendo para ello en consideración las
directivas que, en esta materia, ha impartido la Dirección del Trabajo y los
derechos laborales establecidos en los distintos cuerpos normativos que regulan la
materia.
     El empleador no podrá exigir al guardia de seguridad que proporcione estos
elementos ni tampoco deducir, retener o compensar, por este concepto, suma alguna de
la remuneración del trabajador, siendo de su exclusivo cargo y costo.
     Para el correcto uso de los elementos defensivos y de protección, la
Subsecretaría de Prevención del Delito, mediante resolución, podrá contemplar el
cumplimiento de normas técnicas, para lo cual podrá requerir la información que
considere necesaria a los estamentos correspondientes. 
     Sin perjuicio de lo anterior, en relación con el chaleco antibalas, se estará
a lo dispuesto en el artículo 31 del presente reglamento. Asimismo, en lo que se
refiere al chaleco anticortes, deberá cumplirse lo siguiente:
     
     1. Entidad certificadora: los chalecos anticortes que utilicen los guardias de
seguridad, deberán estar certificados de acuerdo con la normativa técnica
norteamericana NIJ 0115.00. La entidad certificadora correspondiente, además,
llevará un registro de los elementos a ensayar y cantidad, tipo y resultado de los
ensayos realizados. Este registro deberá ser comunicado cada noventa días corridos
a la Subsecretaría de Prevención del Delito, quien lo pondrá en conocimiento de
las autoridades fiscalizadoras.
     2. Seguro de vida por 30 UF o su equivalente en dólares americanos: el
fabricante deberá contar con un seguro de vida en caso de que un chaleco anticorte
no cumpla su función. Los proveedores deberán acreditar y declarar la póliza al
comprador, además de adjuntar este documento a la entidad certificadora de que trata
el numeral anterior.
     3. Al momento de presentar el producto para su certificación, el proveedor o
fabricante deberá declarar el lote y la cantidad de unidades que lo componen
(número de serie), así como su material, cantidad y área de protección, lo que
permitirá mantener una trazabilidad del producto.
     
     Con todo, los empleadores no podrán proporcionar ningún tipo de máquina,
instrumento, utensilio u objeto cortante o punzante, armas de fuego y demás


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 47 de 62

elementos regulados en la ley N° 17.798, sobre Control de Armas y su reglamento
complementario. El uso y porte de estos elementos está prohibido para todo guardia
de seguridad sin distinción.

     Artículo 94.- Los sistemas de registro audiovisual de guardias de seguridad que
se enfrenten a un riesgo alto. La regulación de los sistemas de registro audiovisual
de guardias de seguridad que se enfrenten a un riesgo alto se regirá por lo
dispuesto en los artículos 36 y siguientes del presente reglamento. 

     Párrafo VIII
     Porteros, nocheros, rondines u otros de similar carácter

     Artículo 95.- Concepto y funciones. Prestan labores de porteros, nocheros,
rondines y otros de similar carácter para los efectos de este reglamento, quienes,
sin tener la calidad de vigilantes privados o guardias de seguridad, otorgan,
personalmente, protección a personas y/o bienes, dentro de un recinto o área
determinada, previamente delimitada. En caso alguno, estas personas se encontrarán
autorizadas para tener o portar armas de fuego en el ejercicio de sus funciones. Sin
perjuicio de lo anterior, de oficio o a petición de este personal o de su empleador,
la Subsecretaría de Prevención del Delito, mediante resolución fundada, previo
informe de la autoridad fiscalizadora, podrá disponer la utilización de alguno de
los elementos defensivos y de protección con los que pueden contar los guardias de
seguridad, proporcionales a la función y nivel de riesgo de la entidad donde se
desempeñan. Estos elementos deberán constar en la directiva de funcionamiento
autorizada por la Subsecretaría de Prevención del Delito.
     Las personas que realicen labores de conserjes podrán someterse voluntariamente
a este régimen en caso de que desempeñen funciones de seguridad. 
     Las personas naturales o jurídicas podrán contratar los servicios de nocheros,
porteros, rondines u otros de similar carácter en forma directa o mediante empresas
debidamente acreditadas, que provean recursos humanos para estos fines. 

     Artículo 96.- Requisitos. Los porteros, nocheros, rondines u otros de similar
carácter deberán cumplir los requisitos generales de las personas naturales
establecido en el artículo 46 de la ley N° 21.659, además de aprobar el curso de
capacitación del artículo 98 de este reglamento.

     Artículo 97.- Autorización. Para ejercer funciones de portero, nochero,
rondín u otros de similar carácter, el interesado deberá solicitar una
autorización a la Subsecretaría de Prevención del Delito, de conformidad al
procedimiento establecido en el artículo 85 del presente reglamento. 
     En virtud de esta autorización, se entregará una licencia, personal e
intransferible, que constará en una credencial, emitida por la Subsecretaría de
Prevención del Delito. Las características de la credencial serán las mismas que
para los guardias de seguridad, con la salvedad de que deberá señalar, en lugar de
"Credencial de Guardia de Seguridad", el servicio de seguridad que se presta, según
corresponda. 
     Todos los gastos que se originen en el otorgamiento de la credencial serán de
cargo del solicitante y será entregada a este. La Subsecretaría de Prevención del
Delito, mediante resolución, establecerá los costos de la emisión de estas
credenciales, las que regirán desde la publicación del acto administrativo en el
Diario Oficial. 
     Los servicios de portero, nochero, rondín u otros de similar carácter
constarán en una directiva de funcionamiento que se regirá por lo dispuesto en el
artículo 92 del presente reglamento.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 48 de 62

     Artículo 98.- Capacitación. Los porteros, nocheros, rondines u otros de
similar carácter deberán tener una capacitación especializada y diferenciada de
aquella que se le entrega a los guardias de seguridad, en función de las labores que
cumplen. 
     Los cursos para desempeñarse como porteros, nocheros, rondines u otros de
similar carácter serán los siguientes:
     
     1. Curso de formación: es aquel que habilita a una persona natural para
desempeñarse como portero, nochero, rondín u otros de similar carácter. Este curso
se rendirá una sola vez, con excepción de lo dispuesto en el inciso final del
presente artículo. Su duración será de, a lo menos, sesenta horas pedagógicas.
     2. Curso de perfeccionamiento: este curso deberá rendirse cada cuatro años y
tendrá una duración de, a lo menos, treinta horas pedagógicas. 
     
     Si la persona no rinde el curso de perfeccionamiento dentro del plazo
establecido en el numeral anterior, deberá rendir nuevamente el curso de formación.

     Artículo 99.- Seguro de vida. El empleador deberá proceder a la contratación
de un seguro de vida en favor de los porteros, nocheros, rondines u otros de similar
carácter, cuya cifra asegurada no podrá ser inferior a ciento treinta y dos
unidades de fomento.
     Este seguro de vida cubrirá los riesgos a los que se encuentre expuesto el
personal referido en el inciso precedente, siempre que se cumplan las siguientes
condiciones:
     
     1. Que el siniestro ocurra con motivo u ocasión del desempeño de sus labores.
     2. Que el asegurado cumpla los requisitos generales y específicos consagrados
en la ley N° 21.659 y en el presente reglamento al momento en que ocurra el
siniestro. 
     3. Que la relación laboral entre el trabajador y la respectiva entidad
empleadora se encuentre vigente al momento en que ocurra el siniestro.

     Párrafo IX
     Capacitación del personal de seguridad privada

     Artículo 100.- Instituciones de capacitación. Son instituciones de
capacitación los organismos técnicos de capacitación y las instituciones de
educación superior acreditadas, tales como universidades, institutos profesionales y
centros de formación técnica, que obtengan la respectiva autorización de la
Subsecretaría de Prevención del Delito, que estén encargadas de la formación,
capacitación y perfeccionamiento del personal de seguridad que desarrolla labores de
vigilancia privada, guardias de seguridad, porteros, nocheros, rondines y demás
personas que ejerzan las actividades de seguridad privada señaladas en el artículo
2 de la ley N° 21.659. 

     Artículo 101.- Requisitos de las instituciones de capacitación. Para efectos
de obtener la autorización requerida en el artículo anterior por parte de la
Subsecretaría de Prevención del Delito, las instituciones de capacitación deberán
cumplir los requisitos señalados en el artículo 49 de este reglamento, en lo que
correspondiere, además de los siguientes: 
     
     1. Adjuntar un listado de las instalaciones donde se desarrollarán las
capacitaciones. 
     2. Adjuntar un listado de los capacitadores en materias de seguridad privada que


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 49 de 62

se desempeñen bajo su dependencia, acompañando, cada vez que se solicite renovar la
autorización, los antecedentes que se hayan requerido para acreditar el cumplimiento
de los requisitos del artículo 46 de la ley N° 21.659, de conformidad a lo
dispuesto en el inciso final del artículo 60 del mismo cuerpo legal, así como de
los artículos 104 y 105 de este reglamento.
     3. Señalar, cada vez que se tramite un curso de formación, perfeccionamiento o
especialización, en la nómina correspondiente, la relación de capacitadores por
asignatura, de conformidad a lo dispuesto en el numeral 2 del artículo 50 del
presente reglamento, así como su modalidad (presencial o virtual).
     4. Acreditarse, en caso de que proceda, la correspondiente calidad de Organismo
Técnico de Capacitación ante el Servicio Nacional de Capacitación y Empleo.

     Artículo 102.- Procedimiento de autorización. Para desempeñarse como
institución de capacitación, el interesado deberá presentar una solicitud de
autorización ante la Subsecretaría de Prevención del Delito, acompañando los
documentos que acrediten el cumplimiento de los requisitos establecidos en el
artículo anterior y someterse al procedimiento establecido en el artículo 51 del
presente reglamento, siendo aplicable, en lo que correspondiere, lo requerido
respecto de las empresas de seguridad privada.

     Artículo 103.- Capacitadores. Se entenderá por capacitadores a los
profesionales y técnicos autorizados por la Subsecretaría de Prevención del
Delito, previo informe de la autoridad fiscalizadora, dedicados a la instrucción,
formación, capacitación y perfeccionamiento de vigilantes privados, guardias de
seguridad, porteros, nocheros, rondines, conserjes, en su caso, u otros de similar
carácter.

     Artículo 104.- Requisitos generales para ejercer como capacitadores. Para
ejercer como capacitador se necesitará cumplir con los siguientes requisitos:
     
     1. Aquellos señalados en el artículo 46 de la ley N° 21.659.
     2. Deberán contar con título profesional, técnico de nivel superior o
licenciatura, de conformidad a lo dispuesto en el artículo siguiente. 
     3.  Deberán contar con un diplomado en materias inherentes a seguridad privada
o gestión de seguridad empresarial, otorgado por una institución de educación
superior, reconocida oficialmente por el Estado. Se exceptuará de lo anterior a
quienes acrediten estar en posesión del título profesional de ingeniero en
seguridad privada o del grado académico de magíster en seguridad privada. 

     Artículo 105.- Requisitos especiales para ejercer como capacitadores. Los
capacitadores deberán acreditar el cumplimiento de los siguientes requisitos
especiales, de acuerdo a la asignatura que impartan:
     
     1. Legislación aplicada a la seguridad privada. Deberán ser licenciados en
ciencias jurídicas y sociales o contar con el título de abogado. Podrá eximirse de
la obligación de contar con diplomado en materias inherentes a seguridad privada o
gestión de seguridad empresarial señalado en el artículo precedente, si se
acreditan dos o más años de experiencia profesional en la materia. 
     2. Respeto y promoción de los derechos humanos. Deberán ser licenciados en
ciencias jurídicas y sociales o contar con el título de abogado. 
     3. Privacidad y uso de datos personales. Deberán ser licenciados en ciencias
jurídicas y sociales o contar con el título de abogado. Asimismo, podrán impartir
esta asignatura todos los profesionales del área informática que posean título
profesional de educación superior de una carrera de, a lo menos, ocho semestres de
duración. 
     4. Correcto uso de elementos defensivos. Todos aquellos Oficiales y Suboficiales


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 50 de 62

de las Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o de
Gendarmería de Chile que hayan obtenido una certificación oficial equivalente a un
título profesional o técnico de nivel superior de conformidad a la normativa
correspondiente. Asimismo, deberán acreditar el cumplimiento de los cursos
respectivos de defensa personal a través de la presentación de la malla curricular
vigente a la época en que los aprobaron.
     5. Primeros auxilios. Haber obtenido un título profesional o técnico de nivel
superior en alguna carrera del área de la salud, de conformidad a la normativa
vigente. Estos profesionales y técnicos estarán exceptuados de cumplir con el
diplomado en materias inherentes a seguridad privada o gestión de seguridad
empresarial, que señala el artículo anterior.
     6. Prevención de riesgos. Para este tipo de cursos se deberá contar con el
título profesional o técnico de nivel superior en prevención de riesgos con la
correspondiente resolución de la Secretaría Regional Ministerial de Salud.
     7. Probidad, no discriminación y perspectiva de género. Todos aquellos
profesionales universitarios que cuenten con las respectivas aprobaciones de cursos
de postgrado en los grados de magister o diplomados en cursos especiales sobre las
materias indicadas.
     8. Seguridad de instalaciones. Para este tipo de cursos se deberá contar con el
título profesional o técnico de nivel superior en prevención de riesgos con la
correspondiente resolución de la Secretaría Regional Ministerial de Salud.
     9. Seguridad electrónica. Será necesario contar con el título profesional o
técnico de nivel superior en electrónica.
     10. Sistema de telecomunicaciones. Poseer el título profesional de ingeniero o
técnico nivel superior en telecomunicaciones. 
     11. Técnicas de reducción. Todos aquellos Oficiales y Suboficiales de las
Fuerzas Armadas, de las Fuerzas de Orden y Seguridad Pública o Gendarmería de Chile
que hayan obtenido una certificación oficial equivalente a un título profesional o
técnico de nivel superior, de conformidad a la normativa correspondiente. Asimismo,
deben acreditar los cursos respectivos de defensa personal a través de la
presentación de la malla curricular vigente a la época en que los aprobaron.
Excepcionalmente, podrá impartir dicho curso el deportista experto en artes
defensivas, debidamente acreditadas.
     12. Instrucción física. Para este tipo de cursos, se deberá contar con una
licenciatura en educación física o título técnico en materias afines otorgado por
entidades reconocidas por el Ministerio de Educación. Estos profesionales estarán
exceptuados de cumplir con el diplomado en materias inherentes a seguridad privada o
gestión de seguridad empresarial, que señala el artículo anterior. 
     13. Conocimiento de arma y tiro. Instructor o experto en manejo y uso de armas y
tiro, con un mínimo de cinco años de experiencia; así como oficiales y
suboficiales de las Fuerzas Armadas y de Orden y Seguridad Pública o Gendarmería de
Chile egresados de sus respectivas escuelas. En cada proceso de acreditación, todos
y sin exclusión, deberán rendir un examen práctico ante la autoridad fiscalizadora
competente.

     Artículo 106.- Certificaciones. La Subsecretaría de Prevención del Delito
otorgará las certificaciones de aprobación de los cursos respectivos a través de
la plataforma informática establecida en el artículo 115 de este reglamento.

     Artículo 107.- Capacitaciones. La Subsecretaría de Prevención del Delito,
mediante resolución, previa propuesta de la autoridad fiscalizadora determinará el
contenido, la forma, modalidades, duración y especializaciones de los distintos
programas de capacitación debiendo actualizarse la malla específica en función de
la evolución de los riesgos y de las capacidades formativas de las entidades
capacitadoras. 
     Sin perjuicio de lo anterior, los contenidos de los cursos de formación serán,
a lo menos, los siguientes: 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 51 de 62

     1. Para guardias de seguridad:
     
     a) Legislación aplicada a seguridad privada. Esta asignatura se orientará a
desarrollar conocimientos sobre las normas vigentes en materia de seguridad privada
que permitan un adecuado entendimiento del rol coadyuvante que esta tiene para con la
seguridad pública, además del estudio específico de los fundamentos
constitucionales, de la ley N° 21.659 y sus reglamentos complementarios. Del mismo
modo, deberá incorporar materias vinculadas con seguridad privada, como las normas
laborales aplicables al personal de seguridad privada.
     b) Respeto y promoción de los derechos humanos. Esta asignatura se orientará a
desarrollar conocimientos relativos a conceptos y normas nacionales e internacionales
relacionadas con los derechos humanos, con especial énfasis en grupos de especial
protección, tales como mujeres, niños, niñas o adolescentes, diversidades y
disidencias sexo-genéricas, personas en situación de discapacidad o adultos
mayores.
     c) Privacidad y uso de datos personales. Esta asignatura tendrá por objeto
entregar conocimientos sobre principios, conceptos y normas sobre datos personales y
sensibles, con énfasis en su adecuada protección.
     d) Instrucción física. Esta asignatura tiene por objeto que el alumno mantenga
una condición física que le permita un eficiente desempeño de sus funciones. 
     e) Correcto uso de elementos defensivos y de protección. Esta asignatura
tendrá por objeto que el alumno adquiera y desarrolle técnicas para el adecuado uso
de elementos defensivos y de protección, especialmente en casos de legítima defensa
propia o de terceros.
     f) Primeros auxilios. Esta asignatura tendrá por objeto entregar al alumno
conocimientos básicos para la atención y respuesta de una persona víctima de un
accidente, una agresión o una afección natural.
     g) Prevención de riesgos. Esta asignatura tendrá por objeto orientar al alumno
en lo que se refiere a los riesgos, accidentes y enfermedades profesionales, así
como las formas de prevenirlos.
     h) Seguridad de las instalaciones. Esta asignatura tendrá como propósito
desarrollar conocimientos relacionados con la aplicación de medidas de seguridad
tendientes a evitar o minimizar los riesgos que puedan afectar a un recinto o área
determinada, incluyendo el análisis de riesgos potenciales, el manejo de situaciones
de emergencia, entre otras.
     i) Probidad, no discriminación y perspectiva de género. Esta asignatura
abordará principios, conceptos y normas tendientes a promover un actuar íntegro de
los alumnos, así como a la prevención de actos de discriminación arbitraria y la
adopción de una perspectiva de género en el desempeño de sus funciones.
     j) Seguridad electrónica. Esta asignatura tendrá por objeto proporcionar
conocimientos conceptuales, prácticos y normas operativas relacionadas con los
diferentes sistemas y equipos electrónicos utilizados en el ámbito de la seguridad
privada, tales como cámaras de televigilancia, alarmas, entre otros. 
     k) Sistema de telecomunicaciones. Esta asignatura tendrá por objeto desarrollar
en los alumnos conocimientos relacionados con la aplicación, en el ámbito de la
seguridad privada, de equipos de comunicación y sus características técnicas.
     l) Técnicas de reducción. Esta asignatura tendrá por objeto que el alumno
desarrolle técnicas de reducción adecuadas y proporcionadas al peligro actual o
inminente al que se enfrentan en casos de legítima defensa propia o de terceros.
     
     Lo dispuesto en este numeral será sin perjuicio de aquellas asignaturas
contenidas en el curso de especialización, en atención al nivel de riesgo que
enfrentan los guardias de seguridad, de conformidad a lo dispuesto en el artículo 89
N° 3 del presente reglamento. 
     2. Para porteros, nocheros, rondines u otros de similar carácter:
     
     a) Legislación aplicada a seguridad privada. Esta asignatura se orientará a
desarrollar conocimientos sobre las normas vigentes en materia de seguridad privada
que permitan un adecuado entendimiento del rol coadyuvante que esta tiene para con la


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 52 de 62

seguridad pública, además del estudio específico de los fundamentos
constitucionales, de la ley N° 21.659 y sus reglamentos complementarios. Del mismo
modo, deberá incorporar materias vinculadas con seguridad privada, como las normas
laborales aplicables al personal de seguridad privada.
     b) Respeto y promoción de los derechos humanos. Esta asignatura se orientará a
desarrollar conocimientos relativos a conceptos y normas nacionales e internacionales
relacionadas con los derechos humanos, con especial énfasis en grupos de especial
protección, tales como mujeres, niños, niñas o adolescentes, diversidades y
disidencias sexo-genéricas, personas en situación de discapacidad o adultos
mayores.
     c) Privacidad y uso de datos personales. Esta asignatura tendrá por objeto
entregar conocimientos sobre principios, conceptos y normas sobre datos personales y
sensibles, con énfasis en su adecuada protección.
     d) Correcto uso de elementos defensivos y de protección. Esta asignatura
tendrá por objeto que el alumno adquiera y desarrolle técnicas para el adecuado uso
de elementos defensivos y de protección, especialmente en casos de legítima defensa
propia o de terceros.
     e) Primeros auxilios. Esta asignatura tendrá por objeto entregar al alumno
conocimientos básicos para la atención y respuesta de una persona víctima de un
accidente, una agresión o una afección natural.
     f) Prevención de riesgos: Esta asignatura tendrá por objeto orientar al alumno
en lo que se refiere a los riesgos, accidentes y enfermedades profesionales, así
como las formas de prevenirlos.
     g) Seguridad de las instalaciones. Esta asignatura tendrá como propósito
desarrollar conocimientos relacionados con la aplicación de medidas de seguridad
tendientes a evitar o minimizar los riesgos que puedan afectar a un recinto o área
determinada, incluyendo el análisis de riesgos potenciales, el manejo de situaciones
de emergencia, entre otras.
     h) Probidad, no discriminación y perspectiva de género. Esta asignatura
abordará principios, conceptos y normas tendientes a promover un actuar íntegro de
los alumnos, así como a la prevención de actos de discriminación arbitraria y la
adopción de una perspectiva de género en el desempeño de sus funciones.
     
     Los programas y planes de estudio impartidos por las instituciones de
capacitación, así como sus perfiles de ingreso y egreso deberán ser aprobados por
la Subsecretaría de Prevención del Delito, a través del procedimiento establecido
en el artículo 102 de este reglamento. Asimismo, las instituciones deberán
presentar ante esta autoridad un manual, protocolo o procedimiento en el cual consten
los criterios para la convalidación en los casos de los artículos 23 y 26 del
presente reglamento. La Subsecretaría de Prevención del Delito podrá dictar
instrucciones generales sobre esta materia, con el objeto de asegurar una adecuada
homologación.
     Estos programas y planes de estudio podrán ser impartidos de forma telemática
o presencial, salvo los correspondientes a las asignaturas de arma y tiro, técnicas
de reducción y primeros auxilios, los que serán siempre presenciales.
     Las capacitaciones podrán efectuarse en lugares autorizados por la
Subsecretaría de Prevención del Delito y en las sedes propias de los Organismos
Técnicos de Capacitación acreditadas ante el Servicio Nacional de Capacitación y
Empleo, pudiendo complementar la enseñanza con procesos y diseños de formación
práctica en sus puestos de trabajo.
     Tratándose del personal de seguridad privada que se desempeñe en entidades
ubicadas en recintos portuarios, aeropuertos u otros espacios sometidos al control de
la autoridad militar, marítima o aeronáutica, la Subsecretaría de Prevención del
Delito, mediante resolución, establecerá los cursos de capacitación especializada,
previa propuesta de la autoridad institucional que corresponda.
     Con todo, en lo que se refiere a la asignatura de arma y tiro, las horas
consideradas en los programas de formación o perfeccionamiento de vigilantes
privados deberán realizarse en el polígono que la respectiva autoridad
fiscalizadora, en materia de armas de fuego, autorice para tales efectos, previa


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 53 de 62

solicitud de la institución capacitadora. 
     La Subsecretaría de Prevención del Delito deberá dictar, mediante
resolución, las normas relativas a la aplicación de exámenes y sus procedimientos
asociados. 

     Párrafo X
     Reglas especiales para otras personas naturales que ejercen actividades de
seguridad privada

     Artículo 108.- Supervisor de seguridad privada. Es la persona que efectúa
labores de supervigilancia y control de los recursos humanos, materiales,
tecnológicos o los procedimientos destinados a la protección de personas, bienes y
procesos productivos, desarrolladas en un recinto o área determinada.
     Si el supervisor se desempeña en una entidad obligada que deba incorporar,
dentro de sus medidas de seguridad, un sistema de vigilancia privada, deberá cumplir
los mismos requisitos que un vigilante privado y encontrarse acreditado como tal.
Además, será parte del organismo interno de seguridad, debiendo coordinar sus
actividades con los encargados y jefes de seguridad respectivos. Por el contrario, si
el supervisor se desempeña en otro tipo de entidad no requerirá encontrarse
autorizado para ser vigilante privado y deberá cumplir solo con los requisitos
generales del artículo 46 de la ley N° 21.659. En este último caso no podrá en
caso alguno portar armas de fuego. 
     El supervisor deberá ser autorizado por la Subsecretaría de Prevención del
Delito, de conformidad al artículo 85 del presente reglamento, para lo cual, además
de cumplir con los requisitos del artículo 46 de la ley N° 21.659 y, en su caso,
con los requisitos para ser vigilante privado, deberá acreditar la aprobación de un
curso para desarrollar labores de supervisión y control de una duración mínima de
ciento veinte horas.
     Sin perjuicio de lo anterior, si la persona cuenta con un curso de formación
para guardias de seguridad, se le exigirá un curso de treinta horas propias de la
labor de supervisión y control. Asimismo, si cuenta con curso de formación para
vigilantes priva dos, se le exigirá un curso de, al menos, veinte horas propias de
la labor de supervisión y control. Estos cursos deberán haberse aprobado dentro de
los cuatro años anteriores a la postulación para el cargo de supervisor. 
     Con todo, si la persona posee un título técnico de nivel superior de mínimo
cuatro semestres o un título profesional de mínimo ocho semestres, se le exigirá
un curso de, al menos, veinte horas propias de la labor de supervisión y control.

     Artículo 109.- Asesor de seguridad. Es la persona natural que, en razón de su
oficio, debe aconsejar o ilustrar a una persona o entidad, con el propósito de
ejecutar el buen funcionamiento de una instalación, tanto en sus bienes como en los
individuos que en ella se encuentren, evitando que esta falle, se frustre o sea
violentada, precaviendo proponer medidas de seguridad que tiendan a neutralizar o
disminuir las vulnerabilidades que pueda observar. 
     En virtud de sus funciones, las entidades obligadas podrán encomendarle la
elaboración de los estudios de seguridad y planes de seguridad. Asimismo, cualquier
persona natural o jurídica podrá solicitar su asesoría para la confección de una
directiva de funcionamiento. 
     Para poder desempeñarse en este cargo, la persona deberá ser autorizada por la
Subsecretaría de Prevención del Delito, de conformidad al artículo 85 del presente
reglamento. Para ello, la persona deberá cumplir los requisitos generales del
artículo 46 de la ley N° 21.659, poseer un título profesional relacionado con el
área de seguridad o materias afines y contar con un diplomado en materias inherentes
a seguridad privada o gestión de seguridad empresarial de una duración no menor a
cuatrocientas horas académicas, otorgada por una entidad de estudios superiores
reconocidos por el Ministerio de Educación. Se entenderá como una carrera afín
aquella cuya malla curricular esté relacionada con las actividades de la seguridad


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 54 de 62

privada, como también aquellas materias que digan relación con la prevención de la
seguridad física de las personas y de las instalaciones.
     Se exceptuará del diplomado en materias inherentes a seguridad privada, quienes
acrediten estar en posesión del título profesional de Ingeniero en Seguridad
Privada o de un Magíster en Seguridad Privada.

     Artículo 110.- Técnico en seguridad privada. Es aquella persona que
proporciona, instala, mantiene, repara y/o controla aparatos, equipos, dispositivos,
componentes tecnológicos y sistemas de seguridad electrónica conectados a centrales
receptoras de alarmas, centros de control o de videovigilancia, destinados a la
protección de personas, bienes y procesos productivos, desarrolladas en un recinto o
área determinada.
     El técnico en seguridad privada deberá cumplir los requisitos del artículo 46
de la ley N° 21.659 y acreditar su idoneidad profesional ante la Subsecretaría de
Prevención del Delito mediante la presentación de un certificado de título
profesional o técnico en la materia. Asimismo, deberá ser autorizado por la
Subsecretaría de Prevención del Delito, de conformidad al artículo 85 del presente
reglamento.

     Artículo 111.- Operador de cámaras de televigilancia y alarmas. Es aquella
persona que se desempeña en los centros de control o de videovigilancia, a través
de un sistema de circuito cerrado de televisión o alarma, la seguridad de un recinto
o área determinada, con el objeto de detectar en forma oportuna los riesgos y
amenazas para efectuar las comunicaciones y/o coordinaciones necesarias a nivel
interno, así como con la autoridad policial y procurar neutralizar la amenaza.
     Para ejercer sus labores, la persona que se desempeñe en este cargo deberá
cumplir los requisitos del artículo 46 de la ley N° 21.659 y acreditar ante la
Subsecretaría de Prevención del Delito su idoneidad profesional mediante la
presentación de un certificado de capacitación en el área respectiva en que se
desempeña.
     El operador de cámaras de televigilancia y alarmas deberá ser autorizado por
la Subsecretaría de Prevención del Delito, de conformidad al artículo 85 de este
reglamento.

     Artículo 112.- Instalador técnico. Es aquella persona que, por intermedio de
la prestación de sus servicios en materias de seguridad, instala los sistemas de
circuito cerrado de televisión y/o alarmas, para precaver el buen funcionamiento de
una instalación, evitando que esta falle, se frustre o sea violentada.
     Para desempeñar sus funciones, la persona deberá cumplir los requisitos del
artículo 46 de la ley N° 21.659 y acreditar ante la Subsecretaría de Prevención
del Delito que cuenta con un certificado de capacitación en el área. 
     El instalador técnico deberá ser autorizado por la Subsecretaría de
Prevención del Delito, de conformidad al artículo 85 del presente reglamento.

     Artículo 113.- Operador de cajero automático. Es aquella persona que se ocupa
de instalar, mantener o reparar cajeros automáticos, dispensadores o contenedores de
dinero de cualquier especie, a fin de precaver su buen funcionamiento, evitando que
estos fallen, se frustren o sean violentados.
     Para poder desempeñarse en estas funciones, la persona deberá cumplir los
requisitos del artículo 46 de la ley N° 21.659 y acreditar ante la Subsecretaría
de Prevención del Delito que cuenta con las competencias necesarias a través de un
certificado de capacitación en el área y un certificado de competencias laborales
emitido por el empleador actual o, en su defecto, por uno anterior. 
     El operador de cajero automático deberá ser autorizado por la Subsecretaría
de Prevención del Delito, de conformidad al artículo 85 de este reglamento.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 55 de 62

     Artículo 114.- Facultad de dictar instrucciones generales sobre nuevos cargos
de seguridad privada. Sin perjuicio de lo dispuesto en los artículos precedentes, la
Subsecretaría de Prevención del Delito, en virtud de lo dispuesto en el numeral 1°
del artículo 83 de la ley N° 21.659, podrá, mediante resolución, dictar
instrucciones generales sobre los nuevos cargos que surjan a partir de la
implementación y operatividad del sistema de seguridad privada.

     Párrafo XI
     Plataforma informática en materia de seguridad privada

     Artículo 115.- Plataforma informática en materia de seguridad privada. La
Subsecretaría de Prevención del Delito administrará una plataforma informática
interconectada con las autoridades fiscalizadoras, la cual servirá de apoyo en las
diversas etapas de los procedimientos administrativos en materia de seguridad privada
y de eventos masivos, así como de colaboración para una eficaz y eficiente toma de
decisiones por parte de la autoridad correspondiente.
     Esta plataforma albergará el Registro de Seguridad Privada y un sistema de
tramitación electrónica con los usuarios y cumplirá, al menos, las siguientes
funciones:
     
     1. Otorgar las autorizaciones, certificaciones, revocaciones, suspensiones,
clausuras y demás decisiones emitidas por la Subsecretaría de Prevención del
Delito en materia de seguridad privada. 
     2. Facilitar el procedimiento de declaración de una entidad como obligada, así
como la aprobación y renovación de los estudios de seguridad.
     3. Canalizar los requerimientos a la Subsecretaría de Prevención del Delito
relacionados con materias de seguridad privada. 
     4. Facilitar el procedimiento administrativo de autorización de eventos
masivos.
     5. Las demás materias de seguridad privada que disponga la Subsecretaría de
Prevención del Delito.
     
     La Subsecretaría de Prevención del Delito, a través de resolución, deberá
aprobar los procedimientos que sean necesarios para autorizar o habilitar a las
personas que hubieren sido designadas para acceder a la plataforma. Dichos
procedimientos establecerán niveles de acceso restringido y adaptados a las
competencias de las instituciones y los perfiles de las personas y entidades.

     TÍTULO IV
     Autoridades encargadas de la supervisión, control y fiscalización

     Párrafo I
     Subsecretaría de Prevención del Delito

     Artículo 116.- Órgano rector en materia de seguridad privada. Al Ministerio
encargado de la Seguridad Pública, a través de la Subsecretaría de Prevención del
Delito, le corresponderá autorizar, regular, supervigilar, controlar y ejercer las
demás atribuciones legales en materia de seguridad privada. Para ello, actuará como
órgano rector, y velará por que las personas naturales y jurídicas reguladas por
la ley N° 21.659 y este reglamento, cumplan su rol preventivo, coadyuvante y
complementario de la seguridad pública.
     En cumplimiento de lo anterior, las autoridades fiscalizadoras reguladas en la
ley N° 21.659 colaborarán con la Subsecretaría de Prevención del Delito y


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 56 de 62

llevarán a cabo sus labores de conformidad a las instrucciones que esta les imparta.

     Artículo 117.- Funciones y atribuciones de la Subsecretaría de Prevención del
Delito. A la Subsecretaría de Prevención del Delito, en el ámbito de la ley N°
21.659 y del presente reglamento, le corresponderá la asesoría y colaboración con
el Ministro o Ministra encargada de la Seguridad Pública, en todas las funciones y
atribuciones propias de seguridad privada y podrá ejercerlas directamente, sin
perjuicio de aquellas que le corresponden al Ministro o la Ministra en forma directa,
de conformidad a lo establecido en la ley N° 21.659. 
     La Subsecretaría de Prevención del Delito tendrá, especialmente, las
siguientes atribuciones o facultades:
     
     1. Aplicar e interpretar administrativamente las disposiciones de la ley N°
21.659 y sus reglamentos e impartir instrucciones de general aplicación en las
materias de su competencia, sin perjuicio de las atribuciones propias del Ministerio
encargado de la Seguridad Pública.
     2. Proponer al Ministerio encargado de la Seguridad Pública políticas sobre
seguridad privada, así como las modificaciones legales y reglamentarias en esa
materia.
     3. Actuar como órgano de consulta, análisis, comunicación y coordinación en
materias relacionadas con la seguridad privada.
     4. Requerir a los demás órganos del Estado los informes que estime necesarios
para el cumplimiento de sus funciones.
     5. Determinar entidades obligadas, de acuerdo a lo dispuesto en el Título II de
la ley N° 21.659 y de este reglamento.
     6. Aprobar o solicitar modificaciones al estudio de seguridad de las entidades
obligadas establecidas en el Título II de la ley N° 21.659 y aprobar sus
actualizaciones.
     7. Otorgar, denegar, suspender y revocar autorizaciones a personas naturales o
jurídicas que presten servicios de seguridad privada en conformidad con la ley N°
21.659 y demás normas sobre la materia.
     En el ejercicio de esta atribución, la Subsecretaría de Prevención del Delito
podrá suspender temporalmente o revocar la autorización para ejercer actividades de
seguridad privada, así como ordenar la clausura temporal o definitiva de los
recintos donde estas funcionen, de conformidad a lo dispuesto en el párrafo 4 del
Título VI de la ley N° 21.659.
     8. Fijar y aprobar los contenidos de la capacitación a que debe someterse el
personal de seguridad privada, previa propuesta de la autoridad fiscalizadora y de
conformidad a lo establecido en el presente reglamento.
     9. Mantener un registro actualizado de las entidades obligadas, de las personas
naturales y jurídicas autorizadas a prestar servicios de seguridad privada, de las
empresas de alarmas y proveedoras de servicios, de organizadores y productores de
eventos masivos y de las sanciones que afecten a cualquiera de estas.
     10. Supervigilar y controlar las labores desarrolladas por las autoridades
fiscalizadoras de la ley N° 21.659.
     11. Elaborar un plan de fiscalización en materia de seguridad privada, en el
que se establezcan criterios uniformes que permitan a las autoridades fiscalizadoras
desarrollar adecuadamente sus labores.
     12. Requerir el auxilio de la fuerza pública cuando ello sea necesario para el
cumplimiento de sus funciones.
     13. Ejercer las demás atribuciones o facultades que le encomienden la ley N°
21.659 y la demás normativa aplicable.

     Artículo 118.- El Registro de Seguridad Privada. La Subsecretaría de
Prevención del Delito creará un Registro de Seguridad Privada, el que estará
compuesto por seis subregistros que deberán ser parte de la plataforma establecida
en el artículo 115 del presente reglamento.


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 57 de 62

     Artículo 119.- Subregistro de entidades obligadas. Dentro del Registro de
Seguridad Privada de la Subsecretaría de Prevención del Delito, existirá un
subregistro de entidades obligadas, el cual deberá contener lo siguiente: 
     
     1. Razón social, nombre de fantasía, rol único tributario, giro, domicilio
legal, correo electrónico y teléfono de contacto.
     2. En cuanto a su representante legal deberá consignar su nombre completo,
cédula de identidad, domicilio, personería, correo electrónico y teléfono de
contacto.
     3. Las sucursales obligadas, si corresponde, con identificación de sus
domicilios respectivos y su nivel de riesgo.
     4. La indicación de si la entidad debe implementar, dentro de sus medidas de
seguridad, un sistema de vigilancia privada. 
     5. La resolución exenta que la determinó como entidad obligada y a cada una de
sus sucursales, si correspondiera. 
     6. La resolución que aprobó el estudio de seguridad y la de todas sus
renovaciones, así como las de cada una de sus sucursales, si correspondiera. 
     7. La fecha de vencimiento del último estudio de seguridad por cada sucursal.
     8. La indicación de los teléfonos móviles del encargado de seguridad o del
contacto que disponga la entidad si no estuviese obligada a mantener un sistema de
vigilancia privada, por cada sucursal, si correspondiere.
     9. La identificación de los integrantes que componen el organismo de seguridad
interno, cuando corresponda.
     10. La indicación de si la entidad tiene un protocolo conjunto con otra u otras
entidades obligadas, en cuyo caso deben estar identificadas por cada sucursal. 
     11. La cantidad de vigilantes privados que fueron autorizados, en su caso, por
cada sucursal. 
     12. La cantidad de armas y municiones aprobadas, en su caso, por cada sucursal.
     13. La cantidad de guardias de seguridad que fueron autorizados, en su caso, por
cada sucursal. 
     14. La indicación de si se ha impuesto la sanción de clausura, por cada
sucursal.
     15.  La especificación de la autoridad fiscalizadora por cada sucursal.

     Artículo 120.- Subregistro de entidades voluntarias. Dentro del Registro de
Seguridad Privada de la Subsecretaría de Prevención del Delito, existirá un
subregistro de aquellas entidades que voluntariamente se hayan sometido a tener
medidas de seguridad en virtud de lo dispuesto en el artículo 10 de la ley N°
21.659, el que deberá tener todas las especificaciones señaladas en el artículo
anterior. 

     Artículo 121.- Subregistro de personas naturales. Dentro del Registro de
Seguridad Privada de la Subsecretaría de Prevención del Delito, existirá un
subregistro de personas naturales que ejercen funciones en materia de seguridad
privada, el que contendrá lo siguiente: 
     
     1. Nombre completo, cédula de identidad, domicilio, correo electrónico y
teléfono de contacto.
     2. El tipo de autorización que identifique su función sea como jefe de
seguridad; encargado de seguridad; encargado de armas; vigilante privado; guardia de
seguridad; portero; nochero; rondín, capacitador u otro.
     3. La resolución que lo autorizó a ejercer labores de seguridad privada.
     4. El número de la tarjeta de identificación. 
     5. La fecha de vencimiento de la respectiva autorización.
     6. La indicación de si se le ha impuesto o no la sanción de suspensión o
revocación de la autorización. 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 58 de 62

     7. La autoridad fiscalizadora correspondiente. 

     Artículo 122.- Subregistro de empresas de seguridad privada. Dentro del
Registro de Seguridad Privada de la Subsecretaría de Prevención del Delito,
existirá un subregistro de empresas de seguridad privada, el cual contendrá lo
siguiente: 
     
     1. Razón social, nombre de fantasía, rol único tributario, giro, domicilio
legal, correo electrónico y teléfono de contacto.
     2. En cuanto a su representante legal deberá consignar su nombre completo,
cédula de identidad, domicilio, personería, correo electrónico y teléfono de
contacto.
     3. La actividad de seguridad privada que ejerce y para la cual está autorizada.
     4. El número de la resolución que autorizó su funcionamiento.
     5. La indicación de si se le ha impuesto o no la sanción de suspensión,
revocación o clausura. 
     6. La fecha de vencimiento de la autorización de funcionamiento de la empresa.
     7. La nómina de los sistemas o dispositivos disuasivos de seguridad de
entintado de billetes, en caso de las empresas de transporte de valores, de
conformidad a lo dispuesto en el artículo 69 de este reglamento. 

     Artículo 123.- Subregistro de sanciones. Dentro del Registro de Seguridad
Privada de la Subsecretaría de Prevención del Delito, existirá un subregistro de
las sanciones que afecten a las entidades obligadas y a todas las personas naturales
o jurídicas que ejercen actividades de seguridad privada, así como a los
organizadores y productores de eventos masivos. 
     Este subregistro contendrá lo siguiente:
     
     1. El nombre completo de la persona natural o la razón social de la persona
jurídica sancionada. 
     2. El rol único tributario de la persona jurídica o cédula de identidad de la
persona natural que haya sido sancionada por los juzgados de policía local.
     3. La función o actividad que ejerce el sujeto o entidad sancionada. 
     4. Tipo de infracción cursada, el juzgado de policía local que impuso la
sanción y rol de la causa.
     5. La existencia de reincidencia. 
     6. Historial de sanciones de cada uno de los inscritos en el Registro de
Seguridad Privada.
     7. La autoridad fiscalizadora correspondiente a cada uno de los sancionados.

     Artículo 124.- Subregistro de eventos masivos. Dentro del Registro de Seguridad
Privada de la Subsecretaría de Prevención del Delito, existirá un subregistro de
eventos masivos, el que contendrá los siguientes apartados:
     
     1. Recintos habituales: 
     
     a) Nombre completo, dirección y aforo del recinto.
     b) Nombre completo, cédula de identidad, correo electrónico y teléfono móvil
del propietario y/o administrador. En caso de que se trate de una persona jurídica,
deberá indicar, además, razón social, nombre de fantasía, rol único tributario,
giro, domicilio legal, correo electrónico y teléfono de contacto, así como la
individualización del representante leg al.
     c) El acto administrativo de la Delegación Presidencial Regional que lo
declaró como recinto habitual.
     d) La autoridad fiscalizadora correspondiente.
     
     2. Organizadores habituales:


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 59 de 62

     a) Nombre completo, cédula de identidad, correo electrónico y teléfono móvil
del organizador. En caso de que se trate de una persona jurídica, deberá indicar,
además, razón social, nombre de fantasía, rol único tributario, giro, domicilio
legal, correo electrónico y teléfono de contacto, así como la individualización
del representante legal.
     b) El acto administrativo que lo declaró como organizador habitual. 
     
     3. Responsables de seguridad de eventos masivos: nombre de la persona natural,
cédula de identidad, domicilio, correo electrónico y teléfono móvil.
     Sin perjuicio de lo anterior, el responsable de seguridad de eventos masivos que
ejerza funciones en materia de seguridad privada deberá inscribirse, además, en el
subregistro de personas naturales que ejercen actividades de seguridad privada.

     Artículo 125.- Los medios de resguardo de la información del Registro de
Seguridad Privada. La Subsecretaría de Prevención del Delito adoptará las medidas
establecidas en su política general de seguridad de la información para garantizar
el debido funcionamiento del registro. 

     Artículo 126.- Forma en que las autoridades fiscalizadoras tendrán acceso al
Registro de Seguridad Privada. La Subsecretaría de Prevención del Delito deberá
implementar los protocolos que sean necesarios para autorizar o habilitar a las
personas que hubieren sido designadas por cada autoridad fiscalizadora quienes
tendrán acceso al registro. Dichos procedimientos establecerán los niveles de
acceso conforme a las competencias orgánicas de las citadas instituciones.
     De conformidad con lo dispuesto en el presente reglamento, la Subsecretaría
adoptará todas las medidas oportunas para preservar la seguridad de los datos
tratados en el registro, medidas que serán comunicadas a las autoridades
fiscalizadoras, a fin de velar por el debido acceso a los registros por parte de cada
una de ellas. En este sentido, y para dar cumplimiento a lo anterior, las autoridades
fiscalizadoras deberán prestar apoyo técnico a la Subsecretaría en caso de que
así lo requiera.

     Artículo 127.- Forma de acceso excepcional al subregistro de sanciones y de
eventos masivos. La Subsecretaría de Prevención del Delito deberá implementar los
procedimientos que sean necesarios para autorizar o habilitar a las personas, en el
ámbito de sus competencias, que hubieren sido designadas por las delegaciones
presidenciales regionales, los juzgados de policía local, las entidades obligadas y
las personas naturales y jurídicas que ejercen actividades de seguridad privada y
que tendrán acceso al subregistro de sanciones y subregistro de eventos masivos.
Dichos procedimientos establecerán los niveles de acceso restringido y adaptados a
las competencias de las instituciones y los perfiles de las personas y entidades.
     De conformidad con lo dispuesto en el presente reglamento, la Subsecretaría
adoptará todas las medidas oportunas para preservar la seguridad de los datos
tratados en los subregistros de sanciones y de eventos masivos, medidas que serán
comunicadas a las instituciones, personas y entidades señaladas en el párrafo
anterior, a fin de velar por el debido acceso a estos por parte de cada una de ellas.
En este sentido, y para dar cumplimiento a lo anterior, est as instituciones,
personas y entidades, según corresponda, deberán prestar apoyo técnico a la
Subsecretaría en caso de que así lo requiera. 

     Párrafo II
     Autoridades fiscalizadoras de seguridad privada

     Artículo 128.- Autoridades fiscalizadoras. Carabineros de Chile será la
autoridad fiscalizadora en materia de seguridad privada y estará encargada de


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 60 de 62

supervisar el cumplimiento de las normas legales y reglamentarias en esta materia,
bajo la dirección de la Subsecretaría de Prevención del Delito, y de acuerdo a las
instrucciones generales y específicas que ésta imparta.
     Tratándose de entidades ubicadas en recintos portuarios, aeropuertos u otros
espacios sometidos al control de la autoridad militar, marítima o aeronáutica, las
atribuciones que se otorgan en esta ley a Carabineros de Chile serán ejercidas por
la autoridad institucional que corresponda.
     Las actividades fiscalizadoras en materia de seguridad privada no obstarán en
caso alguno las labores de fiscalización que le corresponda ejercer a otros órganos
respecto de las entidades obligadas del Título II de la ley N° 21.659 o de las
personas naturales o jurídicas que ejercen actividades de seguridad privada, en sus
respectivos ámbitos de competencia y de conformidad a las leyes que las regulen.

     Artículo 129.- Deber de informar. La autoridad fiscalizadora deberá emitir
todos los informes que al efecto requiera la Subsecretaría de Prevención del
Delito, respecto al incumplimiento de las normas de esta ley por parte de una
determinada entidad o sobre cualquier materia de seguridad privada que se le
solicite, los que deberán ser evacuados dentro de un plazo máximo de quince días,
salvo que la ley o el presente reglamento establezca un plazo diferente, en cuyo caso
se estará a lo allí dispuesto.

     Artículo 130.- Deber de denuncia. Cuando la autoridad fiscalizadora respectiva
verifique el incumplimiento de la ley o este reglamento deberá presentar una
denuncia ante el juzgado de policía local que corresponda, con el objeto de que se
inicie un procedimiento contravencional y se aplique, en su caso, alguna de las
sanciones previstas en el Título VI de la ley N° 21.659 y deberá informar de este
hecho a la Subsecretaría de Prevención del Delito.
     Si la Subsecretaría de Prevención del Delito toma conocimiento de una
infracción a lo dispuesto en la ley N° 21.659 o en ese reglamento, deberá
presentar directamente una denuncia ante el juzgado de policía local respectivo, con
el objeto de que se inicie el procedimiento contravencional referido en el inciso
anterior, previa coordinación con la autoridad fiscalizadora, a la que podrá
requerir un informe técnico, si lo estima pertinente, para verificar el
incumplimiento.

     Artículo 131.- Fiscalización del cumplimiento de la normativa laboral y de
seguridad social. Para efectos de la fiscalización del cumplimiento de la normativa
laboral y de seguridad social, las entidades obligadas deberán poner a disposición
de la autoridad fiscalizadora laboral el respectivo estudio de seguridad.
     Asimismo, la Subsecretaría de Prevención del Delito deberá poner a
disposición de la Dirección del Trabajo, previo requerimiento, todo antecedente
relevante para la fiscalización del cumplimiento de la normativa laboral y de
seguridad social.

     Párrafo III
     Canal de denuncia anónimo

     Artículo 132.- Canal de denuncia anónimo. La Subsecretaría de Prevención del
Delito habilitará un canal informático, en adelante el Canal, con el objeto de que
cualquier persona pueda denunciar anónimamente las infracciones a la ley N° 21.659
y al presente reglamento. 
     El Canal deberá garantizar el resguardo de la identidad de la persona y
permitir que esta pueda adjuntar todos los antecedentes que funden la o las
infracciones denunciadas y que ayuden a la detección, constatación o acreditación
de las vulneraciones a lo dispuesto por la ley N° 21.659 y sus reglamentos. 


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 61 de 62

     Por su parte, el Canal deberá cumplir con los principios de neutralidad
tecnológica, de actualización, de equivalencia funcional, de fidelidad, de
interoperabilidad y de cooperación, descritos en el artículo 16 bis de la ley N°
19.880. Asimismo, observará el principio de coordinación, propendiendo a la unidad
de acción, evitando la duplicidad o interferencia de funciones, conforme se
establece en el inciso segundo del artículo 5° de la ley N° 18.575.

     Artículo 133.- Aspectos operacionales y técnicos. El Canal será de libre
acceso, sin requerir algún factor de autenticación y deberá considerar, a lo
menos, los siguientes aspectos:
     
     1. El establecimiento de usuarios diferenciados y asociarlos a distintos
perfiles de acceso, con funcionalidades diversas que garanticen el anonimato de quien
realice la denuncia. 
     2. La habilitación de un formulario de denuncia electrónico. 
     3. La protección de los antecedentes que se adjunten por quien realice la
denuncia. 

     Artículo 134.- Contenido de la denuncia. La denuncia que se efectúe a través
del Canal deberá tener, al menos, el siguiente contenido:
     
     1. La narración circunstanciada de los hechos.
     2. La individualización de quienes los hubieren cometido y de las personas que
los hubieren presenciado o que tuvieren noticia de ellos, en cuanto le constare al
denunciante.
     
     Asimismo, se podrá acompañar otros antecedentes que le sirvan de fundamento,
si los hubiere.

     Artículo 135.- Admisibilidad y archivo. Cuando no se cumplan los requisitos
indicados en el artículo anterior, o bien los hechos denunciados carezcan de
fundamento plausible, la Subsecretaría de Prevención del Delito podrá proceder al
archivo de la misma. Los fundamentos de esta decisión deberán quedar reflejados en
el Canal, para efectos de que el usuario pueda consultarlo, de conformidad a lo
establecido en el artículo siguiente.

     Artículo 136.- Seguimiento y gestión de la denuncia. Al ingresar la denuncia
al Canal se le asignará un código único de identificación a través del cual se
podrá acceder a su estado de tramitación e incorporar nuevos antecedentes.

     DISPOSICIONES TRANSITORIAS

     Artículo primero.- El presente reglamento comenzará a regir desde la entrada
en vigencia la ley N° 21.659, con excepción de lo dispuesto en las disposiciones
transitorias siguientes. 

     Artículo segundo.- La plataforma establecida en el artículo 115 de este
reglamento deberá estar operativa en el plazo máximo de un año desde que entre en
vigencia la ley N° 21.659.
     Durante el tiempo intermedio entre el inicio de la vigencia del presente
reglamento y la implementación de la referida plataforma, la tramitación
establecida en el artículo 6° de este reglamento, respecto de solicitudes,
autorizaciones y demás procedimientos administrativos que recaigan sobre materias


Decreto 209, SEGURIDAD (2024)

Biblioteca del Congreso Nacional de Chile - www.leychile.cl - documento generado el 18-Jul-2025 página 62 de 62

que ya hubiesen iniciado su vigencia de conformidad a lo dispuesto en los artículos
transitorios de la ley N° 21.659, se llevará a cabo de forma presencial ante la
autoridad fiscalizadora respectiva, la que deberá remitir la documentación
pertinente a la Oficina de Partes de la Subsecretaría de Prevención del Delito
dentro del plazo de quince días hábiles contado desde su ingreso.

     Artículo tercero.- Las resoluciones a que se refieren los artículos 70 y 71 de
este reglamento, deberán dictarse en un plazo no superior a seis meses contado desde
la entrada en vigencia de la ley N° 21.659. Para el cumplimiento de este plazo la
autoridad fiscalizadora correspondiente deberá remitir a la Subsecretaría de
Prevención del Delito una propuesta que regule estas materias en un plazo máximo de
tres meses contado desde su entrada en vigencia.
     En el tiempo intermedio entre el inicio de la vigencia del presente reglamento y
la publicación de las resoluciones exentas señaladas en el inciso precedente, las
normativas internas de las autoridades fiscalizadoras que regulan estas materias se
mantendrán vigentes.

     Anótese, tómese de razón y publíquese.- GABRIEL BORIC FONT, Presidente de la
República.- Carolina Tohá Morales, Ministra del Interior y Seguridad Pública.-
Maya Fernández Allende, Ministra de Defensa Nacional.- Mario Marcel Cullell,
Ministro de Hacienda.- Juan Carlos Muñoz Abogabir, Ministro de Transportes y
Telecomunicaciones.
     Lo que transcribe a Ud. para su conocimiento.- Saluda Atte., Iván Alejandro
Heredia Riquelme, Encargado Unidad Oficina de Partes y Archivos.

     CONTRALORÍA GENERAL DE LA REPÚBLICA
     División Jurídica
     
     Cursa con alcance el decreto N° 209, de 2024, del Ministerio del Interior y
Seguridad Pública; Subsecretaría de Prevención del Delito
     
     N° E80077/2025.- Santiago, 15 de mayo de 2025.
     
     Esta Contraloría General ha dado curso al documento del epígrafe, que aprueba
el Reglamento de Seguridad Privada de la ley N° 21.659, sobre Seguridad Privada,
pero, en relación con las resoluciones exentas mencionadas en el artículo tercero
transitorio de ese decreto, cumple con hacer presente que no es materia propia de la
potestad reglamentaria, sino que es materia de ley, y facultad privativa de esta
Entidad de Control disponer que determinados actos administrativos se encuentren
exentos del trámite de toma de razón, conforme a lo dispuesto en el artículo 10,
incisos quinto y sexto, de la ley N° 10.336.
     Con el alcance que antecede, se ha cursado el decreto de la suma.
     
     Saluda atentamente a Ud., Dorothy Pérez Gutiérrez, Contralora General de la
República.
     
     Al señor
     Ministro del Interior y Seguridad Pública`;

// --- OPTIMIZATION: Pre-build a map for faster predefined response lookups ---
let responseMap = new Map();
let partialMatchRules = [];

function buildResponseMap() {
    const newResponseMap = new Map();
    const newPartialMatchRules = [];

    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];
        for (const keyword of item.keywords) {
            const normalizedKeyword = keyword.toLowerCase().trim();
            
            if (normalizedKeyword.startsWith('*') && normalizedKeyword.endsWith('*')) {
                const cleanKeyword = normalizedKeyword.substring(1, normalizedKeyword.length - 1);
                if(cleanKeyword) {
                    newPartialMatchRules.push({ keyword: cleanKeyword, response: item.response });
                }
            } else {
                newResponseMap.set(normalizedKeyword, item.response);
            }
        }
    }
    responseMap = newResponseMap;
    partialMatchRules = newPartialMatchRules;
}


// --- UI Functions ---
function toggleChat() {
    const isHidden = chatPopup.classList.contains('hidden');
    if (isHidden) {
        chatPopup.classList.remove('hidden');
        chatBackdrop.classList.remove('hidden');
        chatToggleButton.classList.add('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('chat-open-mobile');
        }
    } else {
        chatPopup.classList.add('hidden');
        chatBackdrop.classList.add('hidden');
        chatToggleButton.classList.remove('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.remove('chat-open-mobile');
            if (window.mobileChatManager) window.mobileChatManager.exitKeyboardMode();
        }
    }
}

function markdownToHtml(text) {
    if (!text) return '';
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-700 dark:text-blue-500 hover:underline">$1</a>');
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
    return formattedText.replace(/\n/g, '<br>');
}

function addMessage(sender, text, buttons = []) {
    const messageElement = document.createElement('div');
    const isUser = sender === 'user';
    
    messageElement.className = `message-fade-in flex items-start max-w-full`;
    messageElement.classList.toggle('ml-auto', isUser);
    messageElement.classList.toggle('flex-row-reverse', isUser);

    const bubble = document.createElement('div');
    bubble.className = isUser 
        ? 'bg-green-500 rounded-xl rounded-br-none p-3 ml-2 max-w-xs md:max-w-sm' 
        : 'bot-bubble rounded-xl rounded-bl-none p-3 ml-2 max-w-[95%] md:max-w-sm';

    const p = document.createElement('p');
    p.className = isUser ? 'text-white chatbot-message-text' : 'text-gray-700 dark:text-gray-200 chatbot-message-text';
    
    if (isUser) {
        p.textContent = text;
    } else {
        p.innerHTML = markdownToHtml(text);
    }
    
    bubble.appendChild(p);
    
    if (!isUser && buttons.length > 0) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-2 flex flex-col space-y-2';
        buttons.forEach(buttonText => {
            const button = document.createElement('button');
            button.textContent = buttonText;
            button.className = 'bg-green-100 dark:bg-gray-700 border border-green-500/50 text-green-800 dark:text-green-300 text-sm py-1.5 px-3 rounded-lg hover:bg-green-200 dark:hover:bg-gray-600 transition-colors w-full text-left font-medium';
            button.onclick = () => {
                userInput.value = buttonText;
                handleSendMessage();
            };
            buttonContainer.appendChild(button);
        });
        bubble.appendChild(buttonContainer);
    }

    const avatar = document.createElement('div');
    if (isUser) {
        avatar.className = 'w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-gray-600 dark:text-gray-300';
        avatar.textContent = 'U';
    } else {
        avatar.className = 'w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1';
        avatar.innerHTML = `<img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">`;
    }

    messageElement.appendChild(avatar);
    messageElement.appendChild(bubble);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator(show) {
    let indicator = document.getElementById('typing-indicator');
    if (show && !indicator) {
        indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'message-fade-in flex items-start';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-white border-2 border-yellow-400 flex items-center justify-center flex-shrink-0 p-1">
                 <img src="assets/images/poli.png" alt="Bot Icon" class="h-full w-full object-contain">
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } else if (!show && indicator) {
        indicator.remove();
    }
}

function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase().trim();
    
    if (responseMap.has(lowerCaseText)) {
        return responseMap.get(lowerCaseText);
    }

    for (const rule of partialMatchRules) {
        if (lowerCaseText.includes(rule.keyword)) {
            return rule.response;
        }
    }

    return null;
}

function getPageContext() {
    let context = "";
    const sections = document.querySelectorAll('#nosotros, #servicios, #politicas, #contacto');
    
    sections.forEach(section => {
        if (section) {
            const title = section.querySelector('h2, h3');
            context += `--- SECCIÓN: ${title ? title.innerText.toUpperCase() : section.id.toUpperCase()} ---\n`;
            context += section.innerText + "\n\n";
        }
    });

    if (context.trim() === "") {
        return "No se encontró contexto en la página.";
    }
    
    return context;
}


// --- API Communication ---
async function handleSendMessage() {
    const userText = userInput.value.trim();
    if (!userText) return;

    addMessage('user', userText);
    userInput.value = '';
    
    const predefinedResponse = getPredefinedResponse(userText);
    if (predefinedResponse) {
        setTimeout(() => {
            addMessage('bot', predefinedResponse);
            chatHistory.push({ role: "user", parts: [{ text: userText }] });
            chatHistory.push({ role: "model", parts: [{ text: predefinedResponse }] });
        }, 500);
        return;
    }
    
    showTypingIndicator(true);
    chatHistory.push({ role: "user", parts: [{ text: userText }] });

    try {
        const pageContext = getPageContext();

        const payload = {
            contents: chatHistory,
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            context: pageContext 
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No obtuve una respuesta.";
        
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        addMessage('bot', botText);

    } catch (error) {
        console.error('Error al contactar el proxy de la API:', error);
        addMessage('bot', `Lo siento, ocurrió un error al contactar al asistente. (${error.message})`);
    } finally {
        showTypingIndicator(false);
    }
}

// --- Initialization ---
function init() {
    if (!chatToggleButton) {
        console.error("Chatbot UI elements not found. Initialization failed.");
        return;
    }
    
    buildResponseMap();

    // --- Event Listeners ---
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // --- Mobile-Specific Keyboard Logic ---
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // ... (Tu lógica para móviles)
    } else {
        // Desktop-only listeners
        chatToggleButton.addEventListener('click', toggleChat);
        internalCloseBtn.addEventListener('click', toggleChat);
        chatBackdrop.addEventListener('click', toggleChat);
    }

    // --- Initial State ---
    chatHistory = [];
    
    const welcomeMessageText = "¡Hola! Soy tu asistente virtual de la oficina OS10 Coquimbo. ¿En qué puedo ayudarte hoy?";
    const welcomeButtons = ["Menú", "Menú O.S.10", "Valores"];
    addMessage('bot', welcomeMessageText, welcomeButtons);
    
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessageText }] });

    console.log("Chatbot initialized successfully.");
}

document.addEventListener('DOMContentLoaded', init);


