/**
 * chatbot.js
 * Se comunica con la API de Gemini a través de un proxy seguro en /api/gemini.
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
    'rule_256': { keywords: ["honorarios"], response: '*HONORARIOS*\nhttps://rentab.netlify.app/' },
    'rule_257': { keywords: ["gestudio","estudiar","gestor académico","gestor"], response: '🤖🧙🏼‍♂️✅\n\nhttps://gestudios.netlify.app/' },
    'rule_258': { keywords: ["modelos de solicitud","modelo","punto 6","punto 7"], response: '🤖🧙🏼‍♂️✅\n\nhttps://www.zosepcar.cl/OS10.php#Modelo' },
    'rule_259': { keywords: ["*donde puedo hacer el curso*","*empresa capacitadora*","*empresa de capacitacion*","punto 7"], response: '🤖🧙🏼‍♂️✅ 🧙🏻‍♂️ Estas son algunas empresas de aqui de la region:\n*EMPRESAS DE CAPACITACIÓN 2025* https://d6.short.gy/Cap'},
    'rule_260': { keywords: ["*quien es tu creador*","*quien te creo*"], response: '🤖🧙🏼‍♂️✅ Mi creador es todo el equipo de Profesionales que se encuentra trabajando en la oficina de seguridad Privada OS10 Coquimbo y el\n*Ingeniero en Informática y Ciberseguridad Daniel Figueroa Chacama*' }
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
contribuyendo positivamente a la seguridad integral del país`;

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
    console.log("Response map built successfully.", {exactMatches: responseMap.size, partialMatches: partialMatchRules.length});
}


// --- UI Functions ---
/**
 * Toggles the visibility of the chat popup and the open/close icons.
 */
function toggleChat() {
    const isHidden = chatPopup.classList.contains('hidden');
    if (isHidden) {
        // Opening the chat
        chatPopup.classList.remove('hidden');
        chatBackdrop.classList.remove('hidden');
        chatToggleButton.classList.add('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.add('chat-open-mobile');
        }
    } else {
        // Closing the chat
        chatPopup.classList.add('hidden');
        chatBackdrop.classList.add('hidden');
        chatToggleButton.classList.remove('hidden');
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            document.body.classList.remove('chat-open-mobile');
            // Explicitly exit keyboard mode when chat is closed
            if (window.mobileChatManager) window.mobileChatManager.exitKeyboardMode();
        }
    }
}

/**
 * Converts basic Markdown syntax (and URLs) to HTML for rendering in the chat.
 * @param {string} text - The raw text from the API or predefined responses.
 * @returns {string} - The text formatted with HTML tags.
 */
function markdownToHtml(text) {
    if (!text) return '';
    let formattedText = text.replace(/(https?:\/\/[^\s"'<>`]+)/g, '<a href="$1" target="_blank" class="text-blue-700 dark:text-blue-500 hover:underline">$1</a>');
    formattedText = formattedText.replace(/\*(\*?)(.*?)\1\*/g, '<b>$2</b>');
    formattedText = formattedText.replace(/^\s*-\s/gm, '🔹 ');
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
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: { 
                temperature: 0.7, 
                maxOutputTokens: 1024 
            },
        };

        // La petición ahora va a nuestro proxy seguro
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

/**
 * Initializes the chatbot, sets up event listeners, and displays a welcome message.
 */
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
        let isKeyboardMode = false;

        const enterKeyboardMode = () => {
            if (isKeyboardMode) return;
            isKeyboardMode = true;
            document.body.classList.add('chat-open-mobile');
            chatWidgetContainer.classList.add('fullscreen');
            adjustSizeForKeyboard();
        };

        const exitKeyboardMode = () => {
            if (!isKeyboardMode) return;
            isKeyboardMode = false;
            document.body.classList.remove('chat-open-mobile');
            chatWidgetContainer.classList.remove('fullscreen');
            chatWidgetContainer.style.height = '';
            chatWidgetContainer.style.bottom = '';
        };

        const adjustSizeForKeyboard = () => {
            if (!isKeyboardMode) return;
            setTimeout(() => {
                if (window.visualViewport) {
                    const viewportHeight = window.visualViewport.height;
                    chatWidgetContainer.style.height = `${viewportHeight}px`;
                    chatWidgetContainer.style.bottom = '0';
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }, 100);
        };

        const openChat = () => {
            chatPopup.classList.remove('hidden');
            chatBackdrop.classList.remove('hidden');
            chatToggleButton.classList.add('hidden');
        };

        const closeChat = () => {
            chatPopup.classList.add('hidden');
            chatBackdrop.classList.add('hidden');
            chatToggleButton.classList.remove('hidden');
            exitKeyboardMode();
        };

        chatToggleButton.addEventListener('click', openChat);
        internalCloseBtn.addEventListener('click', closeChat);
        chatBackdrop.addEventListener('click', closeChat);
        userInput.addEventListener('focus', enterKeyboardMode);

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', adjustSizeForKeyboard);
        }
        window.mobileChatManager = { exitKeyboardMode };
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
