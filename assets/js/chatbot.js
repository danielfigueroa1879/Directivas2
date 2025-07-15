/**
 * chatbot.js
 * * This module handles all the functionality for the floating chatbot widget.
 * It manages the UI, state, and communication with the Gemini API.
 * It now includes a system for predefined responses and Markdown to HTML conversion.
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');
const internalCloseBtn = document.getElementById('chat-close-btn-internal');


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
    'rule_39': { keywords: ["*21659*", "*nueva ley de seguridad*"], response: '*LEY 21659*. https://dal5.short.gy/LeySeg' },
    'rule_60': { keywords: ["cursos","curso"], response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*CF.-* CURSO FORMACIÓN GUARDIA\n*CJ.-* CURSO JEFE DE SEGURIDAD\n*CE.-* CURSO ENCARGADO\n*CS.-* CURSO SUPERVISOR\n*CT.-* CURSO TÉCNICO\n*CI.-* CURSO INSTALADOR\n*CC.-* CURSO OPERADOR CAJEROS\n*CV.-* CURSO OPERADOR CCTV\n*CP.-* CURSO PERFECCIONAMIENTO' },
    'rule_65': { keywords: ["*fono*", "*telefono*","*numero*","*ubicados*","*dirección*","*atención*","*horario*","*horarios*","*ubicación*","*direccion oficina*","*cual es la dirección del os10*","*horario atención publico*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*"], response: '🤖 👉🏼 *OS10 COQUIMBO*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFonos: 512651024-512651022-\nCredenciales:512651023\nhttps://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*ESCRIBA LO QUE ESTA CON NEGRILLAS*\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\ninfracción tto: *infraccion*\nInfracción os10: *infraccion os10*\nInfracción alcoholes: *infracción alcoholes*\nEstadio: *estadio*\nBots: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
    'rule_68': { keywords: ["imc"], response: '*CALCULAR IMC*\nhttps://nutricionistavirtual.cl/calculadora/' },
    'rule_69': { keywords: ["curso os10","vigencia curso","tiene curso","si tiene curso"], response: '🤖 *GUARDIA / EMPRESA* 👮🏻‍♂️ 👇🏽 VIGENCIA GG.SS./ VV.PP. /EMP. \nhttps://zosepcar.cl/OS10.php#buscador\n\n🏭 *RAZON SOC. / RUT EMP.*👇🏽\nboletaofactura.com\ngenealog.cl\nmercantil.com\n \n⚖️ *JUZGADO DE TURNO LA SERENA*\nhttps://bit.ly/3GIrWE1' },
    'rule_70': { keywords: ["4651"], response: '*RESOLUCIÓN 4651 INASISTENCIA*\n\nhttps://zosepcar.cl/content/OS10/resol_4651.pdf' },
    'rule_71': { keywords: ["empresa capacitacion arica"], response: '*EMPRESA DE CAPACITACIÓN ARICA*\n\n*SETCH* FONO: 582251978\n*GSC* FONO: 950144679\n*EDGARDO ABARZUA* FONO: 977777716\n*FUNCAL* FONO: 951490729' },
    'rule_72': { keywords: ["empresa en un dia"], response: '*\"CREA TU EMPRESA EN UN DIA\"* \n https://www.registrodeempresasysociedades.cl/' },
    'rule_73': { keywords: ["insignia digital"], response: '*INSIGNIA DIPLOMADO CIBERSEGURIDAD*\n\nhttps://bit.ly/3DSuD46' },
    'rule_74': { keywords: ["capacitadores"], response: '🤖 *CAPACITADORES*\n https://drive.google.com/file/d/1hpZrzhXCnGyLkFLRhj0FOY_zDwTEUIaN/view?usp=drivesdk' },
    'rule_75': { keywords: ["excel reclamos"], response: '*EXCEL RECLAMO* \n\nhttp://bit.ly/3K7ezir' },
    'rule_76': { keywords: ["domicilio figueroa"], response: '*DOMICILIO*\nhttps://maps.app.goo.gl/rnqLdPG5sEFzN32C9' },
    'rule_77': { keywords: ["canales","tv","ver canales","ver tv","ver los canales","retro","retro plus"], response: '*VER CANALES CHILENOS AL MISMO TIEMPO*\nhttps://www.pslabs.cl/tele.html\nhttps://danielfigueroa1879.github.io/prueba/\n\n*CANALES IPTV CHILE*\n1.- 🤖🧙🏼‍♂️ *Abrir👇🏼 con VLC *\nhttps://dal5.short.gy/M' },
    'rule_78': { keywords: ["*votaciones*","*votar*","*excusarme*","*lugar de votación*"], response: '*LUGAR DE VOTACIÓN - VOCAL DE MESA*☝🏼👍🏽\nhttps://consulta.servel.cl/\n*PUEDE LLAMAR AL* 600 600 0166 desde su teléfono\n🤖 *CONSULTAS Y RECLAMOS SERVEL LINK- EXCUSA*: \nhttps://www.servel.cl/contacto/' },
    'rule_79': { keywords: ["cajero"], response: '*INGRESAR CAJERO*\nhttps://forms.gle/68s4SkMqTooU5EdRA' },
    'rule_80': { keywords: ["comisaria","cuadrante","cuadrantes","comisarías"], response: '🤖👮🏻‍♂️ TEL. CUADRANTES\n- https://www.comisariavirtual.cl\n- https://www.stop.carabineros.cl/\n- BUSCA TU CUADRANTE:\nhttps://www.bit.ly/3Yna7AP\n- CUAD. LA SERENA\nhttps://www.dal5.short.gy/C\n- CUAD. LAS COMPAÑIAS\nhttps://www.dal5.short.gy/C1\n- CUAD. COQUIMBO\nhttps://www.dal5.short.gy/Co\n- MAPA CUAD LA SERENA\nhttps://www.d6.short.gy/LS\n- MAPA CUAD COQUIMBO\nhttps://www.d6.short.gy/CQ\n- CEROFILAS\nhttps://www.dal5.short.gy/CFil' },
    'rule_81': { keywords: ["placa patente","ppu"], response: '🤖 🚗 *BUSCAR PATENTES* 🏎️ \npatentechile.com\nvolanteomaleta.com\nwww.autoseguro.gob.cl/\n*RUT*\nhttps://www.rutificador.co/rut/\nhttps://www.elrutificador.com/' },
    'rule_82': { keywords: ["rut","ver un rut"], response: '🤖 🧙🏻‍♂️ *Consultar R.U.T.* 👇?\nhttps://www.elrutificador.com/\nhttps://www.nombrerutyfirma.com\nhttps://www.rutynombre.com/\nhttps://www.rutificador.co/rut/' },
    'rule_83': { keywords: ["aaff"], response: '*AA.FF. A NIVEL NACIONAL* 🤖Busque la comuna que necesita en el mapa. \nhttps://www.zosepcar.cl/OS10.php#autoridad' },
    'rule_84': { keywords: ["actas"], response: '🤖 *DESCARGAR ACTAS* \nhttps://dal5.short.gy/Acta' },
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
    'rule_95': { keywords: ["*independiente*","*credencial independiente*","*credencial independientes*"], response: '🤖 *INDEPENDIENTE 1ER. SEM. 2025* \n*Descargar Guía:* \nhttps://bit.ly/3NNoMC5' },
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
    'rule_111': { keywords: ["nueva ley"], response: '🤖 *NUEVA LEY SEGURIDAD PRIVADA*\nLey 21.659 del 21 de marzo de 2024\nhttps://www.bcn.cl/leychile/navegar?idNorma=1207089' },
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
    'rule_171': { keywords: ["*ley de seguridad privada*","*reglamento ley de seguridad privada*","*reglamento*","*reglamentos ley*","*nueva ley*","*21659*"], response: '🤖 *NUEVA LEY DE SEGURIDAD PRIVADA*\n➢ Reglamento de La Ley\n➢ Reglamento de Evento Masivos' },
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
    'rule_183': { keywords: ["registro pampilla","ingreso pampilla"], response: '🤖👮🏼👉🏼 *REGISTRO DE INGRESO* 🏟️\n\nhttps://dal5.short.gy/Estadio' },
    'rule_185': { keywords: ["foto ia","ia foto","agrandar foto","ampliar foto","herramientas de inteligencia artificial","inteligencia","cambiar fondo"], response: '🤖☝🏼 *HERREMIENTAS DE INTELIGENCIA ARTIFICIAL*\n\n1.- *Laboratorio de Google IA*\nlabs.google/fx/es' },
    'rule_186': { keywords: ["diplomados"], response: '*DANIEL FIGUEROA* \n*INGENIERO EN INFORMÁTICA*\nhttps://drive.google.com/file/d/1k2oiHE9VkBsU8MdFsRo6uFYYnDh-tEs1/view?usp=drivesdk' },
    'rule_187': { keywords: ["registro estadio","estadio"], response: '🤖 *DEJAR REGISTRO ESTADIO*\n1.- *ESTE ES EL EXCEL:*\nhttps://dal5.short.gy/Estad' },
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
    'rule_209': { keywords: ["7 puntos","7 puntos accidente de transito"], response: '*1. TIPIFICACIÓN:* ROBO VEHÍCULO AFECTA CONSEJAL COMUNA VITACURA.' },
    'rule_213': { keywords: ["fotografía","fotito"], response: '*1.- FOTOSTORE:* Calle Prat 629, La Serena.\nUbicación: *https://dal5.short.gy/629*' },
    'rule_215': { keywords: ["sacar hora dental","dentista","sacar hora"], response: '🤖 *SACAR HORA DENTISTA CARABINEROS LA SERENA O SANTIAGO.*\n*https://www.hoscar.cl/v2.0/horasdentales/login.php*' },
    'rule_216': { keywords: ["valor infracciones","valores infracciones","cuanto cuesta una infracción de seguridad privada"], response: ',🤖☝🏼 Dado que las multas establecidas en la Ley 21.659 se expresan en UTM' },
    'rule_220': { keywords: ["pagina"], response: '🧙🏼‍♂️ *PAGINA CIBERSEGURIDAD*\n*https://dal5.short.gy/C25*' },
    'rule_221': { keywords: ["estadio 2"], response: '🤖🧙🏼‍♂️ *DEJAR REGISTRO ESTADIO 2*\n\n1.-*Link de ingreso en página web PC*' },
    'rule_222': { keywords: ["bot telegram"], response: '*Bots telegram*\n1.- Borra fondo: AI_Background_Remover_Bot' },
    'rule_223': { keywords: ["cédula","cédula de identidad"], response: '*CÉDULA DE IDENTIDAD 2025*\nhttps://dal5.short.gy/Ce' },
    'rule_224': { keywords: ["ia","ai","avanzada","ias","ias avanzada","ia avanzada","ai avanzada"], response: ',🧙🏼‍♂️ *IA AVANZADA 2025*\n1.- https://chat.qwenlm.ai/' },
    'rule_225': { keywords: ["estadio coquimbo","informe estadio coquimbo"], response: 'Buenas tardes, *OS10 Coquimbo* remite el siguiente Informe:\n\n🏟️ *INFORME ESTADIO*' },
    'rule_226': { keywords: ["estadio la serena"], response: 'Buenas tardes, *OS10 Coquimbo* remite el siguiente Informe: \n\n🏟️ *INFORME ESTADIO*' },
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
    'rule_256': { keywords: ["honorarios"], response: '*HONORARIOS*\nhttps://rentab.netlify.app/' },
    'rule_257': { keywords: ["gestudio","estudiar","gestor académico","gestor"], response: '🤖🧙🏼‍♂️✅\n\nhttps://gestudios.netlify.app/' },
    'rule_258': { keywords: ["*quien es tu creador*","*quien te creo*"], response: '🤖🧙🏼‍♂️✅ Mi creador es todo el equipo de Profesionales que se encuentra trabajando en la oficina de seguridad Privada OS10 Coquimbo y el\n*Ingeniero en Informática y Ciberseguridad Daniel Figueroa Chacama*' }
};

// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual y funcionario de la oficina de Seguridad Privada OS10 de Carabineros en Coquimbo, Chile. Tu principal objetivo es ayudar a los usuarios con sus trámites y consultas, responde como si fueras un experto en Seguridad Privada, profesional
Tus reglas principales son:
1.  **Asume tu Rol:** Responde siempre como si fueras un miembro del equipo de la oficina OS10 Coquimbo. Usa un tono servicial y profesional.
2.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
3.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
4.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").
5.- **OS10 COQUIMBO, OFICINA DE SEGURIDAD PRIVADA OS10 COQUIMBO, OFICINA, OS10:** Es una oficina que se ecuentra en en el centro de La Serena, su direccion es Calle Cienfuegos N°180, La Serena, su fono o telefono es el siguiente: 51 2 651024 o el 51 2 651023, su correo es *os10.couimbo@carabineros.cl* - *os10coquimbo@gmail.com*
6.  **infracciones del os10:** las principales infracciones de guardia de seguridad son las siguiente: sin curso os10 art. 13 del decreto 93, sin directiva de funcionamiento art. 15 del decreto 93, sin credencial de guardia (gg.ss) art 18 del decreto 93, guardia de seguridad no puede usar armamento art. 14 decreto 93, sin uniforme reglamentario art. 8vo del decrero 867 y decreto 23/2024. 

Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con * o números.`;

// --- OPTIMIZATION: Pre-build a map for faster predefined response lookups ---
let responseMap = new Map();
let partialMatchRules = [];

/**
 * Processes the predefinedResponses object into faster lookup structures.
 * This function runs only once on initialization.
 */
function buildResponseMap() {
    const newResponseMap = new Map();
    const newPartialMatchRules = [];

    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];
        for (const keyword of item.keywords) {
            const normalizedKeyword = keyword.toLowerCase().trim();
            
            if (normalizedKeyword.startsWith('*') && normalizedKeyword.endsWith('*')) {
                // This is a partial match rule (e.g., *word*)
                const cleanKeyword = normalizedKeyword.substring(1, normalizedKeyword.length - 1);
                if(cleanKeyword) {
                    newPartialMatchRules.push({ keyword: cleanKeyword, response: item.response });
                }
            } else {
                // This is an exact match rule
                newResponseMap.set(normalizedKeyword, item.response);
            }
        }
    }
    responseMap = newResponseMap;
    partialMatchRules = newPartialMatchRules;
    console.log("Response map built successfully.", {exactMatches: responseMap.size, partialMatches: partialMatchRules.length});
}


// --- UI Functions ---

/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    chatPopup.classList.toggle('hidden');
    chatBackdrop.classList.toggle('hidden');
    chatToggleButton.classList.toggle('hidden');

    // Ensure fullscreen mode is exited when chat is closed
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        chatWidgetContainer.classList.remove('fullscreen');
        // Reset inline styles to allow CSS classes to take over
        chatWidgetContainer.style.height = '';
        chatWidgetContainer.style.bottom = '';
    }
}

/**
 * Converts basic Markdown syntax (and URLs) to HTML for rendering in the chat.
 * @param {string} text - The raw text from the API or predefined responses.
 * @returns {string} - The text formatted with HTML tags.
 */
function markdownToHtml(text) {
    if (!text) return '';
    // 1. Convert URLs to clickable links.
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-400 dark:text-blue-300 hover:underline">$1</a>');
    // 2. Convert bold (asterisks): *text* or **text** -> <b>text</b>
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    // 3. Convert bullet points: * item -> 🔹 item
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
    // 4. Convert newlines to <br>
    return formattedText.replace(/\n/g, '<br>');
}


/**
 * Creates and appends a message to the chat UI.
 * @param {string} sender - The sender of the message ('user' or 'bot').
 * @param {string} text - The content of the message (raw text for user, HTML for bot).
 * @param {string[]} [buttons=[]] - An optional array of strings to create as buttons.
 */
function addMessage(sender, text, buttons = []) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message-fade-in flex items-start max-w-xs md:max-w-sm';

    const isUser = sender === 'user';
    messageElement.classList.toggle('ml-auto', isUser);
    messageElement.classList.toggle('flex-row-reverse', isUser);

    const bubble = document.createElement('div');
    bubble.className = isUser 
        ? 'bg-green-500 rounded-xl rounded-br-none p-3 ml-2' 
        : 'bot-bubble rounded-xl rounded-bl-none p-3 ml-2';

    const p = document.createElement('p');
    p.className = isUser ? 'text-white text-base' : 'text-gray-700 dark:text-gray-200 text-sm';
    
    // Sanitize user input, allow HTML for bot responses
    if (isUser) {
        p.textContent = text;
    } else {
        p.innerHTML = markdownToHtml(text);
    }
    
    bubble.appendChild(p);
    
    // Handle buttons for bot messages
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

    // Avatar
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

/**
 * Shows or hides the typing indicator in the chat.
 * @param {boolean} show - Whether to show or hide the indicator.
 */
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

/**
 * Finds a predefined response using the optimized maps.
 * @param {string} text - The user's input text.
 * @returns {string|null} The predefined response or null if no match.
 */
function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase().trim();
    
    // 1. Check for an exact match (fastest)
    if (responseMap.has(lowerCaseText)) {
        return responseMap.get(lowerCaseText);
    }

    // 2. Check for partial matches (slower, but necessary)
    for (const rule of partialMatchRules) {
        if (lowerCaseText.includes(rule.keyword)) {
            return rule.response;
        }
    }

    return null; // No match found
}


// --- API Communication ---

/**
 * Sends the user's message, checking for predefined responses first.
 */
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
        const payload = {
            contents: chatHistory,
            systemInstruction: { role: "system", parts: [{ text: systemPrompt }] },
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No obtuve una respuesta.";
        
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        addMessage('bot', botText);

    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        addMessage('bot', `Lo siento, ocurrió un error al contactar al asistente. (${error.message})`);
    } finally {
        showTypingIndicator(false);
    }
}

// --- Initialization ---

/**
 * Initializes the chatbot, sets up event listeners, and displays a welcome message.
 */
function init() {
    if (!chatToggleButton) {
        console.error("Chatbot UI elements not found. Initialization failed.");
        return;
    }
    
    buildResponseMap();

    // Event Listeners
    chatToggleButton.addEventListener('click', toggleChat);
    internalCloseBtn.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // Mobile keyboard handling
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        let isFirstFocus = true;

        const setFullscreen = () => {
            if (isFirstFocus) {
                chatWidgetContainer.classList.add('fullscreen');
                isFirstFocus = false;
            }
            if (window.visualViewport) {
                // Set the container height to the visible area and scroll to the bottom
                const viewportHeight = window.visualViewport.height;
                chatWidgetContainer.style.height = `${viewportHeight}px`;
                chatWidgetContainer.style.bottom = '0';
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        };

        userInput.addEventListener('focus', setFullscreen);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                // Only adjust if we are in fullscreen mode
                if (chatWidgetContainer.classList.contains('fullscreen')) {
                    setFullscreen();
                }
            });
        }
        
        // Reset the fullscreen state when the chat is closed
        const resetMobileState = () => {
            isFirstFocus = true;
            chatWidgetContainer.classList.remove('fullscreen');
            chatWidgetContainer.style.height = '';
            chatWidgetContainer.style.bottom = '';
        };

        internalCloseBtn.addEventListener('click', resetMobileState);
        chatBackdrop.addEventListener('click', resetMobileState);
    }

    // Display welcome message
    const welcomeMessageText = "¡Hola! Soy tu asistente virtual de la oficina OS10 Coquimbo. ¿En qué puedo ayudarte hoy?";
    const welcomeButtons = ["Menú", "Menú O.S.10", "Valores"];
    addMessage('bot', welcomeMessageText, welcomeButtons);
    
    // Add welcome message to history for context
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessageText }] });

    console.log("Chatbot initialized successfully.");
}

document.addEventListener('DOMContentLoaded', init);
