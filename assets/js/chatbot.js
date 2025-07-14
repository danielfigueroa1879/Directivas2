/**
 * chatbot.js
 * * This module handles all the functionality for the floating chatbot widget.
 * It manages the UI, state, and communication with the Gemini API.
 * It now includes a system for predefined responses and Markdown to HTML conversion.
 */

// --- DOM Element Selection ---
const chatPopup = document.getElementById('chat-popup');
const chatToggleButton = document.getElementById('chat-toggle-button');
const openIcon = document.getElementById('chat-open-icon');
const closeIcon = document.getElementById('chat-close-icon');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBackdrop = document.getElementById('chat-backdrop');
const chatWidgetContainer = document.getElementById('chat-widget-container');


// --- Predefined Responses ---
// Base de datos de respuestas predefinidas, actualizada con el nuevo documento.
const predefinedResponses = {
    'rule_3': { keywords: ["*horario*","*atención*","*horarios*","*como llego*","*como puedo llegar*", "*donde estan*", "*donde esta el os10 coquimbo*", "*donde esta el os10*","*donde*", "*direccion*" ], response: '🤖 👉🏼 OS10 Coquimbo De lunes a jueves de 09:00 horas a 13:00 horas. Cienfuegos 180, La Serena. Fono 512651024 https://maps.app.goo.gl/QUhujWbTF1FjDA7E6' },
    'rule_4': { keywords: ["guias","guia","componentes del sistema","componentes"], response: '*ESCRIBA EL NOMBRE DEL COMPONENTE DEL SISTEMA Y SE DESCARGARA UNA GUIA, PARA QUE PUEDA REALIZAR SU TRAMITE*👮🏻‍♂️ \n ⬇️\n*1.-* VIGILANTE PRIVADO\n*2.-* GUARDIA DE SEGURIDAD\n*3.-* JEFE DE SEGURIDAD \n*4.-* ENCARGADO DE SEGURIDAD\n*5.-* SUPERVISOR\n*6.-* ASESOR \n*7.-* CAPACITADOR\n*8.-* TÉCNICO \n*9.-* OPERADOR DE CAJEROS \n*10.-* INSTALADOR TÉC. DE SEGURIDAD\n*11.-* OPERADOR CCTV.\n*12.-* EMPRESAS' },
    'rule_5': { keywords: ["guardia de seguridad","guardia","guardia seguridad"], response: '🤖 🧙🏻‍♂️ Ok... en este link encontrará la guía de *GUARDIA DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_guardia_de_seguridad.pdf' },
    'rule_6': { keywords: ["jefe de seguridad"], response: '🤖 OK..en este link encontrará la guía de *JEFE DE SEGURIDAD* la puede descargar: https://www.zosepcar.cl/content/OS10/TRAM_jefe_de_seguridad.pdf' },
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
    'rule_20': { keywords: ["leyes"], response: '*ESCRIBE UN NUMERO LEY O DECRETO*.\n 🚦. ⬇️ \n \nDECTO. *261* DEL 31.0 un7.2020\nDECTO. *298* DEL 17.09.2019' },
    'rule_21': { keywords: ["261"], response: '*DECRETO NRO 261*. \n\n\nhttps://www.zosepcar.cl/content/OS10/Decreto-261.pdf' },
    'rule_22': { keywords: ["298"], response: '*DECRETO 298*. https://www.bcn.cl/leychile/navegar?idNorma=1136545' },
    'rule_23': { keywords: ["123"], response: '*DECRETO 123*. https://www.bcn.cl/leychile/navegar?idNorma=1130300' },
    'rule_24': { keywords: ["1045"], response: '*DECRETO 1045*. https://www.bcn.cl/leychile/navegar?idNorma=1122982' },
    'rule_25': { keywords: ["867"], response: '*DECRETO 867*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1116274' },
    'rule_26': { keywords: ["1814"], response: '*DECRETO 1814*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1068476' },
    'rule_27': { keywords: ["222"], response: '*DECRETO 222*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=1068231' },
    'rule_28': { keywords: ["1122"], response: '*DECRETO 1122*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=30765' },
    'rule_29': { keywords: ["41"], response: '*DECRETO 41*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=68127' },
    'rule_30': { keywords: ["1772"], response: '*DECRETO 1772*. \nhttps://www.bcn.cl/leychile/navegar?idNorma=68126' },
    'rule_31': { keywords: ["1773"], response: '*DECRETO 1773*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=30766' },
    'rule_32': { keywords: ["93"], response: '*DECRETO 93*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=12251' },
    'rule_33': { keywords: ["3607"], response: '*D. LEY 3607*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=6935' },
    'rule_34': { keywords: ["19303"], response: '*LEY 19303*. \n\nhttps://www.bcn.cl/leychile/navegar?idNorma=30648' },
    'rule_35': { keywords: ["253"], response: '*Resol. 253*. https://www.zosepcar.cl/content/OS10/Resol_253.pdf' },
    'rule_36': { keywords: ["59"], response: '*Resol. 59*. https://www.zosepcar.cl/content/OS10/Resol_59.pdf' },
    'rule_37': { keywords: ["32"], response: '*Resol. 32*. https://www.zosepcar.cl/content/OS10/Resol_32.pdf' },
    'rule_38': { keywords: ["80"], response: '*Resol. 80*. https://www.zosepcar.cl/content/OS10/Resol_80.pdf' },
    'rule_39': { keywords: ["21659"], response: '*LEY 21659*. https://www.bcn.cl/leychile/navegar?idNorma=1207089' },
    'rule_40': { keywords: ["que necesito"],response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*GD.-* ¿QUÉ NECESITO PARA SER GUARDIA?\n*JS.-* ¿QUÉ NECESITO PARA SER JEFE DE SEGURIDAD?\n*EN.-* ¿QUÉ NECESITO PARA SER ENCARGADO?\n*SU.-* ¿QUÉ NECESITO PARA SER SUPERVISOR?\n*AS.-* ¿QUÉ NECESITO PARA SER ASESOR?\n*CA.-* ¿QUÉ NECESITO PARA SER CAPACITADOR?\n*TE.-* ¿QUÉ NECESITO PARA SER TÉCNICO?\n*IN.-* ¿QUÉ NECESITO PARA SER INSTALADOR?\n*OC.-* ¿QUÉ NECESITO PARA SER OPERADOR CAJEROS?\n*CC.-* ¿QUÉ NECESITO PARA SER OPERADOR CCTV?\n*EM.-* ¿QUÉ NECESITO PARA SER EMPRESA?' },
    'rule_60': { keywords: ["cursos","curso"], response: '🤖 ⬇️ *ESCRIBE UNA OPCIÓN* 👮🏻‍♂️🚦\n*CF.-* CURSO FORMACIÓN GUARDIA\n*CJ.-* CURSO JEFE DE SEGURIDAD\n*CE.-* CURSO ENCARGADO\n*CS.-* CURSO SUPERVISOR\n*CT.-* CURSO TÉCNICO\n*CI.-* CURSO INSTALADOR\n*CC.-* CURSO OPERADOR CAJEROS\n*CV.-* CURSO OPERADOR CCTV\n*CP.-* CURSO PERFECCIONAMIENTO' },
    'rule_65': { keywords: ["numero fijo","ubicados","dirección os10","atención","horario","horarios","ubicación","direccion oficina","cual es la dirección del os10","horario atención publico"], response: '🤖 👉🏼 *OS10 Coquimbo*\nDe lunes a jueves de 09:00 horas a 13:00 horas.\nCienfuegos 180, La Serena.\nFono 51 2 651024 o Credenciales 51 2 651023\n*https://maps.app.goo.gl/QUhujWbTF1FjDA7E6*' },
    'rule_66': { keywords: ["menu","menú","menus"], response: '*menú* Escriba lo que está con negrillas.\nconsultar patente: *ppu*\nConsultar nombre o rut: *rut*\nConsultar guardia *registro*\nmenú OS10: *Os10*\nComisaria cuadrantes: *comisaria*\nCiberseguridad: *ciberseguridad*\nDGAC Seg. Priv. *Dgac*\nModifica 261: *Decreto 32*\nResol.3632: *no hay sistema*\nDirectiva: *directiva*\ninfracción tto: *infraccion*\nInfracción os10: *infraccion os10*\nInfracción alcoholes: *infracción alcoholes*\nEstadio: estadio\nBots: Seguridad privada, Ciberseguridad, tránsito, Ley Karyn' },
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
    'rule_82': { keywords: ["rut","ver un rut"], response: '🤖 🧙🏻‍♂️ *Consultar R.U.T.* 👇🏽\nhttps://www.elrutificador.com/\nhttps://www.nombrerutyfirma.com\nhttps://www.rutynombre.com/\nhttps://www.rutificador.co/rut/' },
    'rule_83': { keywords: ["aaff"], response: '*AA.FF. A NIVEL NACIONAL* 🤖Busque la comuna que necesita en el mapa. \nhttps://www.zosepcar.cl/OS10.php#autoridad' },
    'rule_84': { keywords: ["actas"], response: '🤖 *DESCARGAR ACTAS* \nhttps://dal5.short.gy/Acta' },
    'rule_85': { keywords: ["reclamo","fiscalizacion","fiscalizar"], response: '*REQUERIMIENTO* \n https://dal5.short.gy/R3' },
    'rule_86': { keywords: ["*cuál es la pagina del os10*","*zosepcar*"], response: '*🤖 Está es la página del os10*\nhttps://www.zosepcar.cl/OS10.php' },
    'rule_87': { keywords: ["reglamento"], response: '*Reglamento 11*\nhttps://drive.google.com/file/d/0By_MScWZi3fRLVlIN2dJby1hekU/view?usp=drivesdk&resourcekey=0-3OB6XmcfWnIf9KZU1J65Yw' },
    'rule_88': { keywords: ["ciberseguridad"], response: '🤖 🧙🏻‍♂️ *\"CIBERSEGURIDAD\"*\n➢ *1.-¿Que Hacer?*:\nhttps://www.dal5.short.gy/SIyeI3\n➢ *2.,-¿Cómo notificar?*:\nhttps://www.dal5.short.gy/GFxMgX' },
    'rule_89': { keywords: ["menu os10"], response: '*De acuerdo OS10*🧙🏻‍♂️👮🏻‍♂️☝️*Escriba lo que está con negrillas:* \n \n ⬇️ ESCRIBA El QUE NECESITE:\n➢ Bots: recibirá un listado de bots con Inteligencia Avanzada.\n➢ Componentes : Obtendrá las guías\n➢ Manuales: Se desplega menu\n➢ Leyes: Se desplega menu\n➢ Editable: Documentos en Word.\n➢ Directiva: Requisitos presentar\n➢ Valores: Cursos y planes.\n➢ Independiente: Requisitos Cred.\n➢ Menu credencial Menú credenciales\n➢ Nueva Ley: Nueva ley seguridad privada y reglamento.' },
    'rule_90': { keywords: ["directiva","directiva de funcionamiento","directivas","directiva de funcionamiento instalacion","funcionamiento","formulario directiva"], response: '🧙🏻‍♂️🤖 *PRESENTAR DIRECTIVA DE FUNCIONAMIENTO*\n(Instalación - Evento - Partidos de Fútbol Profesional)' },
    'rule_91': { keywords: ["mantra"], response: '*Mantra*\n\nOm: Om es la sílaba semilla que sintoniza cualquier mantra que se recita en su vibración' },
    'rule_92': { keywords: ["usuario diploma"], response: '*PAGINA DIPLOMADO* https://centropyc.carabineros.cl/acipol/login/index.php Usuario: 982083a Contraseña: Flor9820&' },
    'rule_93': { keywords: ["auditorias empresa de capacitacion","auditorias empresas de capacitacion","auditoria empresa de capacitacion","auditoria empresas de capacitacion"], response: ',👮🏼*AUDITORIAS EMPRESA CAPACITACIÓN 2024*\n\nhttps://dal5.short.gy/AuCap' },
    'rule_94': { keywords: ["*"], response: 'La siguiente es una conversación con un asistente de IA que usa AutoResponder.ai. El asistente es útil, creativo, inteligente y muy amigable.' },
    'rule_95': { keywords: ["independiente","credencial independiente","credencial independientes"], response: '🤖 *INDEPENDIENTE 1ER. SEM. 2025* \n*Descargar Guía:* \nhttps://bit.ly/3NNoMC5' },
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
    'rule_110': { keywords: ["editable","documentos word"], response: '🤖 *DOCUMENTOS EDITABLES EN WORD*\n- Solicitud Simple: dal5.short.gy/Solic\n- Directiva Funcionamiento: dal5.short.gy/D\n- Análisis Vulnerabilidades: dal5.short.gy/6ydn' },
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
    'rule_161': { keywords: ["como presentar una ddff","presentar directiva","presentar una directiva de funcionamiento","presentar ddff","presentar dd.ff."], response: '🤖👉🏼 *COMO SE DEBE PRESENTAR UNA DIRECTIVA DE FUNCIONAMIENTO EN PDF*\nNota- Hipervínculos en el pdf\nhttps://dal5.short.gy/PdDdff' },
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
    'rule_196': { keywords: ["bots","tienes un bot","hay un bot","tiene algún bot de seguridad privada","algun bot","tiene un bot","dame el bot","bot de seguridad privada","bot"], response: '🤖 *Bots con IA avanzada:*\n\n➢ *Bot Seguridad Privada*\ndal5.short.gy/SePriv' },
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
    'rule_240': { keywords: ["credencial empresa","credencial empleador","cred empresa","credencial empresas","credenciales empresas","credencial","credencial independiente","independiente","credencial independientes","tramitar credencial"], response: '🤖 *Página Credencial Empresa / Independiente*\n*https://dal5.short.gy/C√*' },
    'rule_243': { keywords: ["realizaron examen","los que realizaron el examen","enviar el resultado examen","enviar resultado","enviar resultados"], response: '🤖 👮🏼‍♂️\n1.- Los que están con rojo sacaron bajo el 60% y están reprobados' },
    'rule_244': { keywords: ["usuario portal","portal usuario","portal de usuario","usuario"], response: '🧙🏼‍♂️\nhttps://dal5.short.gy/U53' },
    'rule_245': { keywords: ["presentación con ia","presentaciónes"], response: '🤖🧙🏼‍♂️ \n\n1.- https://gamma.app/' },
    'rule_246': { keywords: ["plano oficina"], response: '🤖 Plano Oficina \nhttps://os10.short.gy/Pl40' },
    'rule_247': { keywords: ["requerimiento de desarrollo web","requerimiento página","página","requisitos página","crear página web","desarrollo web"], response: '🤖🧙🏼‍♂️ 💡🥇 *Para saber que es lo que necesita, responder lo siguiente*\n\n*1.- Requerimiento de desarrollo*\nhttps://dal5.short.gy/D3sa' },
    'rule_248': { keywords: ["servidor","servidores","alojar página","alojar"], response: '🧙🏼‍♂️*Alojar páginas web*\n1.- https://app.netlify.com/\n2.- https://github.com/' },
    'rule_252': { keywords: ["requisitos","requisito","requisitos plan","requisitos medidas","requisitos directiva"], response: '🤖🧙🏼‍♂️ *Requisitos Plan, Medidas y Directiva*\nhttps://os10coquimbo.netlify.app' },
    'rule_253': { keywords: ["valores infracciones ciberseguridad","infracciones de ciberseguridad","infracciones ciberseguridad"], response: '🤖🧙🏼‍♂️*VALORES INFRACCIONES DE CIBERSEGURIDAD*\nhttps://dal5.short.gy/Vc' },
    'rule_254': { keywords: ["examen os10","examen"], response: '🧙🏼‍♂️🤖👮🏼‍♂️ *Practicar examen*\nhttps://dal5.short.gy/SeSec' },
    'rule_255': { keywords: ["examen moto","examen para moto","moto"], response: '🤖🧙🏼‍♂️ *Examen moto*\nhttps://dal5.short.gy/ExMoto' },
    'rule_256': { keywords: ["honorarios"], response: '*HONORARIOS*\nhttps://rentab.netlify.app/' },
    'rule_257': { keywords: ["gestudio","estudiar","gestor académico","gestor"], response: '🤖🧙🏼‍♂️✅\n\nhttps://gestudios.netlify.app/' }
};

// --- API Configuration ---
const API_KEY = 'AIzaSyAgOFzsnwwLt4TSb1lO3XZ8Ot9QJUX7Y6A';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// --- State Management ---
let chatHistory = [];
const systemPrompt = `Eres un asistente virtual y funcionario de la oficina de Seguridad Privada OS10 de Carabineros en Coquimbo, Chile. Tu principal objetivo es ayudar a los usuarios con sus trámites y consultas.
Tus reglas principales son:
1.  **Asume tu Rol:** Responde siempre como si fueras un miembro del equipo de la oficina OS10 Coquimbo. Usa un tono servicial y profesional.
2.  **Prioridad a los documentos:** Tu máxima prioridad es buscar y entregar primero cualquier documento, guía o PDF que tengas en tu base de datos cuando se te pregunte por un trámite (ej. "cómo tramitar credencial"). Una vez entregado el documento, puedes responder preguntas adicionales.
3.  **Respuestas cortas y reales:** Sé conciso y factual. No inventes respuestas. Si no sabes algo, indícalo amablemente.
4.  **Formato claro:** Usa Markdown para dar formato. Para listas, asegúrate de que cada ítem esté en una nueva línea (ej. "1. Guardia\\n2. Vigilante").

Genera respuestas usando Markdown para formato, como **negrita** para énfasis y listas con * o números.`;

// --- UI Functions ---

/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    chatPopup.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    chatBackdrop.classList.toggle('hidden'); // <-- Controls the backdrop
}

/**
 * Converts basic Markdown syntax (and URLs) to HTML for rendering in the chat.
 * @param {string} text - The raw text from the API or predefined responses.
 * @returns {string} - The text formatted with HTML tags.
 */
function markdownToHtml(text) {
    // 1. Convert URLs to clickable links.
    const urlRegex = /(https?:\/\/[^\s"'<>`]+)/g;
    let formattedText = text.replace(urlRegex, '<a href="$1" target="_blank" class="text-blue-400 dark:text-blue-300 hover:underline">$1</a>');

    // 2. Convert bold (double asterisk): **text** -> <b>text</b>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // 3. Convert bold (single asterisk): *text* -> <b>text</b>
    // This is common in the predefined responses.
    formattedText = formattedText.replace(/\*(.*?)\*/g, '<b>$1</b>');

    // 4. Convert bullet points: * item -> 🔹 item
    // This regex only matches '*' at the beginning of a line to avoid conflict with bold.
    formattedText = formattedText.replace(/^\s*\*\s/gm, '🔹 ');

    // 5. Ensure newlines in the original text become <br> tags in HTML for line breaks.
    formattedText = formattedText.replace(/\n/g, '<br>');

    return formattedText;
}


/**
 * Creates and appends a message to the chat UI.
 * @param {string} sender - The sender of the message ('user' or 'bot').
 * @param {string} text - The content of the message (can be raw text for user, HTML for bot).
 */
function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-fade-in', 'flex', 'items-start', 'max-w-xs', 'md:max-w-sm');
    
    let messageContent;
    if (sender === 'user') {
        messageElement.classList.add('ml-auto', 'flex-row-reverse');
        messageContent = `
            <div class="bg-green-500 rounded-xl rounded-br-none p-3 ml-2">
                <p class="text-white text-sm"></p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-gray-600 dark:text-gray-300">U</div>
        `;
        messageElement.innerHTML = messageContent;
        // Use textContent for user input to prevent XSS vulnerabilities
        messageElement.querySelector('p').textContent = text;
    } else { // sender is 'bot'
        messageElement.classList.add('mr-auto');
        messageContent = `
            <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
            </div>
            <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2">
                <p class="text-gray-700 dark:text-gray-200 text-sm"></p>
            </div>
        `;
        messageElement.innerHTML = messageContent;
        // Use innerHTML for bot responses because we want to render the formatted HTML
        messageElement.querySelector('p').innerHTML = text;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

/**
 * Shows or hides the typing indicator in the chat.
 * @param {boolean} show - Whether to show or hide the indicator.
 */
function showTypingIndicator(show) {
    let indicator = document.getElementById('typing-indicator');
    if (show) {
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'typing-indicator';
            indicator.classList.add('message-fade-in', 'flex', 'items-start');
            indicator.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 8a1 1 0 112 0 1 1 0 01-2 0zm5 0a1 1 0 112 0 1 1 0 01-2 0zM7 12a1 1 0 100 2h6a1 1 0 100-2H7z" /></svg>
                </div>
                <div class="bot-bubble rounded-xl rounded-bl-none p-3 ml-2 typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            `;
            chatMessages.appendChild(indicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } else {
        if (indicator) indicator.remove();
    }
}

/**
 * Checks if the user input matches any predefined questions.
 * @param {string} text - The user's input text.
 * @returns {string|null} The predefined response or null if no match.
 */
function getPredefinedResponse(text) {
    const lowerCaseText = text.toLowerCase().trim();

    // Iterate over each response rule
    for (const key in predefinedResponses) {
        const item = predefinedResponses[key];

        // Iterate over each keyword in the rule
        for (const keyword of item.keywords) {
            const lowerKeyword = keyword.toLowerCase().trim();

            // Rule for inclusion match (contains asterisks)
            if (lowerKeyword.startsWith('*') && lowerKeyword.endsWith('*')) {
                const cleanKeyword = lowerKeyword.substring(1, lowerKeyword.length - 1);
                if (cleanKeyword && lowerCaseText.includes(cleanKeyword)) {
                    return item.response; 
                }
            } 
            // Rule for exact match (no asterisks)
            else {
                if (lowerCaseText === lowerKeyword) {
                    return item.response; 
                }
            }
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
    if (userText === '') return;

    addMessage('user', userText);
    userInput.value = '';
    
    // Check for a predefined response first
    const predefinedResponse = getPredefinedResponse(userText);
    if (predefinedResponse) {
        // Wait a little to simulate "thinking"
        setTimeout(() => {
            // Format the predefined response before adding it to the chat
            const formattedResponse = markdownToHtml(predefinedResponse);
            addMessage('bot', formattedResponse);
            
            // Add original (unformatted) response to history for context
            chatHistory.push({ role: "user", parts: [{ text: userText }] });
            chatHistory.push({ role: "model", parts: [{ text: predefinedResponse }] });
        }, 500);
        return;
    }
    
    // If no predefined response, call the API
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
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        // Get the raw text from the bot
        const botText = data.candidates[0].content.parts[0].text;
        
        // Convert Markdown to HTML before displaying
        const formattedBotText = markdownToHtml(botText);
        
        // Add original bot text to history, but display the formatted version
        chatHistory.push({ role: "model", parts: [{ text: botText }] });
        
        showTypingIndicator(false);
        addMessage('bot', formattedBotText);

    } catch (error) {
        console.error('Error fetching from Gemini API:', error);
        showTypingIndicator(false);
        addMessage('bot', `Lo siento, ocurrió un error al contactar al asistente. (${error.message})`);
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
    
    // Event Listeners
    chatToggleButton.addEventListener('click', toggleChat);
    sendButton.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    // Improved logic for mobile keyboard
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && window.visualViewport) {
        const originalWidgetBottom = chatWidgetContainer.style.bottom || '5rem';

        window.visualViewport.addEventListener('resize', () => {
            const keyboardHeight = window.innerHeight - window.visualViewport.height;

            if (keyboardHeight > 100) { 
                chatWidgetContainer.style.bottom = `${keyboardHeight + 10}px`;
            } else {
                chatWidgetContainer.style.bottom = originalWidgetBottom;
            }
        });
    }

    // Display welcome message
    const welcomeMessage = "¡Hola! Soy tu asistente virtual de la oficina OS10 Coquimbo. ¿En qué puedo ayudarte hoy?";
    addMessage('bot', welcomeMessage);
    
    // Add welcome message to history for context
    chatHistory.push({ role: "model", parts: [{ text: welcomeMessage }] });

    console.log("Chatbot initialized successfully.");
}

// Run the chatbot initialization
init();
