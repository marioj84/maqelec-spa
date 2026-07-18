#!/usr/bin/env python3
"""Genera la guía preliminar MAQELEC para el torno C0636B."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "guia-preliminar-c0636b-maqelec.pdf"
LOGO = ROOT / "logo.png"
PHOTO_GENERAL = ROOT / "assets" / "trabajos-reales" / "torno-convencional-vista-general.webp"
PHOTO_PROCESS = ROOT / "assets" / "trabajos-reales" / "torneado-cilindrado-operacion.webp"
PHOTO_PANEL = ROOT / "assets" / "trabajos-reales" / "torno-c0636b-panel-control.webp"

NAVY = colors.HexColor("#102D38")
BLUE = colors.HexColor("#097EBC")
GREEN = colors.HexColor("#3D983F")
INK = colors.HexColor("#0B2030")
MUTED = colors.HexColor("#526776")
LINE = colors.HexColor("#D9E5EA")
SOFT = colors.HexColor("#F4F8F9")
PALE_GREEN = colors.HexColor("#EEF7EE")
WHITE = colors.white


def register_fonts():
    regular = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
    bold = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("MAQELEC", str(regular)))
        pdfmetrics.registerFont(TTFont("MAQELEC-Bold", str(bold)))
        return "MAQELEC", "MAQELEC-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()


class ManualDoc(BaseDocTemplate):
    pass


def header_footer(canvas, doc):
    if doc.page == 1:
        return
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 17 * mm, width, 17 * mm, stroke=0, fill=1)
    canvas.setFillColor(WHITE)
    canvas.roundRect(12 * mm, height - 14.2 * mm, 49 * mm, 10.2 * mm, 2 * mm, stroke=0, fill=1)
    canvas.drawImage(
        str(LOGO),
        15 * mm,
        height - 13.2 * mm,
        width=42 * mm,
        height=8.3 * mm,
        preserveAspectRatio=True,
        mask="auto",
    )
    canvas.setFillColor(WHITE)
    canvas.setFont(FONT_BOLD, 7.5)
    canvas.drawRightString(width - 15 * mm, height - 10.5 * mm, "GUÍA PRELIMINAR C0636B")
    canvas.setStrokeColor(LINE)
    canvas.line(15 * mm, 14 * mm, width - 15 * mm, 14 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 7)
    canvas.drawString(15 * mm, 9.5 * mm, "Documento MAQELEC v0.1 - Julio 2026")
    canvas.drawRightString(width - 15 * mm, 9.5 * mm, f"Página {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        name="ManualTitle",
        fontName=FONT_BOLD,
        fontSize=28,
        leading=31,
        textColor=WHITE,
        spaceAfter=8 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="ManualSubtitle",
        fontName=FONT,
        fontSize=12,
        leading=17,
        textColor=colors.HexColor("#D8E8ED"),
    )
)
styles.add(
    ParagraphStyle(
        name="SectionLabel",
        fontName=FONT_BOLD,
        fontSize=8,
        leading=10,
        textColor=BLUE,
        uppercase=True,
        spaceAfter=3 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SectionTitle",
        fontName=FONT_BOLD,
        fontSize=20,
        leading=24,
        textColor=NAVY,
        spaceAfter=5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SubTitle",
        fontName=FONT_BOLD,
        fontSize=12,
        leading=15,
        textColor=INK,
        spaceBefore=3 * mm,
        spaceAfter=2 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="BodyMQ",
        fontName=FONT,
        fontSize=9.2,
        leading=14,
        textColor=INK,
        spaceAfter=3 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="SmallMQ",
        fontName=FONT,
        fontSize=7.6,
        leading=11,
        textColor=MUTED,
    )
)
styles.add(
    ParagraphStyle(
        name="BulletMQ",
        fontName=FONT,
        fontSize=8.8,
        leading=13,
        leftIndent=6 * mm,
        firstLineIndent=-4 * mm,
        bulletIndent=0,
        textColor=INK,
        spaceAfter=1.5 * mm,
    )
)
styles.add(
    ParagraphStyle(
        name="Callout",
        fontName=FONT_BOLD,
        fontSize=9,
        leading=13,
        textColor=NAVY,
    )
)


def para(text, style="BodyMQ"):
    return Paragraph(text, styles[style])


def bullet(text):
    return Paragraph(f"• {text}", styles["BulletMQ"])


def section(label, title):
    return [para(label.upper(), "SectionLabel"), para(title, "SectionTitle")]


def callout(title, text, color=SOFT):
    content = [
        para(title, "Callout"),
        Spacer(1, 1.5 * mm),
        para(text, "SmallMQ"),
    ]
    table = Table([[content]], colWidths=[170 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), color),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
            ]
        )
    )
    return table


def photo(path, width, height):
    image = Image(str(path), width=width, height=height)
    image._restrictSize(width, height)
    return image


def logo_plate(width=78 * mm):
    logo = Image(str(LOGO), width=70 * mm, height=14 * mm, mask="auto")
    plate = Table([[logo]], colWidths=[width], rowHeights=[19 * mm])
    plate.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("BOX", (0, 0), (-1, -1), 0.4, colors.HexColor("#D4E0E5")),
                ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 2 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2 * mm),
            ]
        )
    )
    return plate


def spec_table(rows):
    data = [[para("Parámetro", "Callout"), para("Referencia", "Callout")]]
    data += [[para(a, "SmallMQ"), para(b, "SmallMQ")] for a, b in rows]
    table = Table(data, colWidths=[83 * mm, 87 * mm], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3.5 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3.5 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.6 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.6 * mm),
    ]
    for row in range(1, len(data)):
        if row % 2 == 0:
            style.append(("BACKGROUND", (0, row), (-1, row), SOFT))
    table.setStyle(TableStyle(style))
    return table


def checklist(items):
    rows = [[para("☐", "Callout"), para(item, "SmallMQ")] for item in items]
    table = Table(rows, colWidths=[8 * mm, 162 * mm])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.35, LINE),
                ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
            ]
        )
    )
    return table


def build_story():
    story = []

    # Portada
    cover_photo = photo(PHOTO_GENERAL, 74 * mm, 132 * mm)
    cover_copy = [
        Spacer(1, 11 * mm),
        logo_plate(),
        Spacer(1, 20 * mm),
        para("GUÍA PRELIMINAR DE OPERACIÓN Y MANTENIMIENTO", "ManualSubtitle"),
        Spacer(1, 5 * mm),
        para("Torno convencional<br/>C0636B", "ManualTitle"),
        para(
            "Documento inicial para instalación, inspección, operación básica y mantenimiento preventivo.",
            "ManualSubtitle",
        ),
        Spacer(1, 28 * mm),
        para("Versión 0.1 - Julio 2026", "ManualSubtitle"),
        Spacer(1, 4 * mm),
        para("MAQELEC SpA - Santiago, Chile", "ManualSubtitle"),
    ]
    cover = Table(
        [[cover_copy, cover_photo]],
        colWidths=[108 * mm, 74 * mm],
        rowHeights=[252 * mm],
    )
    cover.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 12 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 10 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story += [cover, PageBreak()]

    # Alcance
    story += section("01 / Alcance", "Antes de usar esta guía")
    story += [
        callout(
            "DOCUMENTO PRELIMINAR - NO REEMPLAZA EL MANUAL DEL FABRICANTE",
            "Esta guía fue elaborada por MAQELEC a partir de la ficha técnica pública del C0636B, observación del equipo y prácticas generales de seguridad. Antes de instalar u operar, confirme la placa de identificación, la configuración eléctrica, los accesorios y el manual original correspondiente al número de serie.",
            PALE_GREEN,
        ),
        Spacer(1, 6 * mm),
        para("Uso previsto", "SubTitle"),
        para(
            "El torno convencional C0636B está destinado al mecanizado de piezas sujetas correctamente, mediante operaciones como cilindrado, refrentado, roscado, perforado, mandrinado, ranurado y corte. Solo debe ser utilizado por personal capacitado y autorizado.",
        ),
        para("Identificación que debe registrar el propietario", "SubTitle"),
        checklist(
            [
                "Modelo y número de serie indicados en la placa del equipo.",
                "Tensión, frecuencia, fases y potencia eléctrica instalada.",
                "Diámetro interior real del husillo: versión estándar u opción configurada.",
                "Accesorios, plato, herramientas y protecciones entregadas.",
                "Fecha de instalación, responsable de puesta en marcha y ubicación.",
            ]
        ),
        Spacer(1, 6 * mm),
        callout(
            "Responsabilidades",
            "El propietario debe asegurar capacitación, evaluación de riesgos, protecciones operativas, mantenimiento registrado y cumplimiento de la normativa chilena aplicable. Ante cualquier diferencia entre esta guía y el fabricante, prevalece la documentación original del equipo.",
        ),
        PageBreak(),
    ]

    # Especificaciones
    story += section("02 / Identificación técnica", "Especificaciones de referencia")
    specs = [
        ("Distancia entre centros", "1000 mm"),
        ("Volteo máximo sobre bancada", "360 mm"),
        ("Volteo sobre carro transversal", "212 mm"),
        ("Volteo en escote", "491 mm"),
        ("Ancho de bancada", "187 mm"),
        ("Velocidades del husillo", "8 pasos, 70-2000 rpm"),
        ("Diámetro interior del husillo", "38 mm; opción de 51 mm según configuración"),
        ("Nariz del husillo", "D4; D5 con opción de 51 mm"),
        ("Cono del husillo", "MT5; MT6 con opción de 51 mm"),
        ("Roscas métricas", "0,4-7 mm / 26 pasos"),
        ("Roscas imperiales", "4-56 TPI / 34 pasos"),
        ("Recorrido carro compuesto", "90 mm"),
        ("Recorrido carro transversal", "170 mm"),
        ("Avance longitudinal", "0,052-1,392 mm/vuelta"),
        ("Contrapunto", "Caña 32 mm, recorrido 100 mm, cono MT3"),
        ("Motor principal", "1,5 kW"),
        ("Bomba de refrigerante", "40 W"),
        ("Sección de herramienta", "16 x 16 mm"),
        ("Peso neto / bruto", "600 / 700 kg"),
    ]
    story += [
        spec_table(specs),
        Spacer(1, 5 * mm),
        para(
            "Fuente técnica: WMT CNC Industrial Co., Ltd., ficha pública C0636B. Los valores son referenciales y deben verificarse contra la placa, configuración y documentación entregada con cada unidad.",
            "SmallMQ",
        ),
        PageBreak(),
    ]

    # Instalación
    story += section("03 / Instalación", "Recepción y puesta en marcha")
    story += [
        para("Recepción del equipo", "SubTitle"),
        checklist(
            [
                "Inspeccionar daños de transporte antes de retirar embalajes y tomar registro fotográfico.",
                "Comparar equipo, accesorios y documentación con la orden de compra.",
                "Verificar que la placa eléctrica coincida con la alimentación del lugar.",
                "Confirmar capacidad del piso, espacio de trabajo, iluminación y acceso para mantenimiento.",
                "Comprobar que el equipo pueda anclarse y nivelarse sin tensiones en la bancada.",
            ]
        ),
        Spacer(1, 5 * mm),
        para("Instalación segura", "SubTitle"),
        bullet("El izaje, posicionamiento, anclaje y nivelación deben realizarse con medios certificados y personal competente."),
        bullet("La conexión eléctrica, puesta a tierra y protecciones deben ser ejecutadas por un técnico calificado conforme a la normativa local."),
        bullet("Retire protección de transporte, limpie superficies mecanizadas y lubrique únicamente con productos compatibles."),
        bullet("Antes de producir, pruebe sentido de giro, parada de emergencia, resguardos, lubricación y refrigeración sin carga."),
        Spacer(1, 5 * mm),
        callout(
            "No energizar por presunción",
            "El aspecto exterior del C0636B no confirma su tensión ni su configuración interna. Nunca conecte el equipo sin revisar placa, esquema eléctrico y protecciones instaladas.",
        ),
        PageBreak(),
    ]

    # Seguridad y operación
    story += section("04 / Operación", "Secuencia básica de trabajo seguro")
    steps = [
        ("1", "Planificar", "Defina material, geometría, tolerancia, herramienta, sujeción, velocidad y avance antes de encender."),
        ("2", "Inspeccionar", "Compruebe plato, herramienta, resguardos, lubricación, refrigerante y parada de emergencia."),
        ("3", "Sujetar", "Fije la pieza con apoyo suficiente. Retire inmediatamente la llave del plato."),
        ("4", "Configurar", "Cambie velocidades y engranajes solo con el husillo completamente detenido."),
        ("5", "Probar", "Gire manualmente cuando corresponda y realice una prueba a baja velocidad sin interferencias."),
        ("6", "Mecanizar", "Manténgase fuera de la trayectoria de proyección y controle sonido, vibración, viruta y temperatura."),
        ("7", "Detener", "Espere la detención total antes de medir, ajustar, retirar virutas o tocar la pieza."),
        ("8", "Cerrar", "Aísle energía para limpieza profunda o mantenimiento y registre anomalías."),
    ]
    rows = []
    for number, title, text in steps:
        rows.append(
            [
                para(number, "SectionTitle"),
                [para(title, "Callout"), Spacer(1, 1 * mm), para(text, "SmallMQ")],
            ]
        )
    table = Table(rows, colWidths=[14 * mm, 156 * mm])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -1), 0.45, LINE),
                ("TEXTCOLOR", (0, 0), (0, -1), BLUE),
                ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        )
    )
    story += [table, PageBreak()]

    # Seguridad crítica
    story += section("05 / Seguridad", "Reglas que no se negocian")
    left = [
        para("Durante el giro", "SubTitle"),
        bullet("No usar guantes, ropa suelta, joyas ni cabello sin recoger cerca de elementos rotativos."),
        bullet("No medir, pulir manualmente, ajustar ni retirar virutas con el husillo girando."),
        bullet("Nunca frenar el plato o la pieza con la mano u otro objeto."),
        bullet("No dejar la máquina operando sin supervisión."),
        para("Viruta y limpieza", "SubTitle"),
        bullet("Retirar virutas solo con la máquina detenida, utilizando gancho, cepillo o herramienta adecuada."),
        bullet("Proteger ojos y rostro frente a virutas, refrigerante y proyecciones."),
    ]
    right = [
        para("Intervenciones", "SubTitle"),
        bullet("Aplicar bloqueo y etiquetado antes de mantenimiento, limpieza interna o intervención eléctrica."),
        bullet("No anular resguardos, enclavamientos ni parada de emergencia."),
        bullet("No modificar circuitos, herramientas o soportes sin evaluación técnica."),
        para("Detención inmediata", "SubTitle"),
        bullet("Detener ante vibración anormal, aflojamiento, ruido, humo, pérdida de lubricación o daño de herramienta."),
        bullet("Aislar el equipo y reportar la condición antes de reiniciar."),
    ]
    safe_table = Table([[left, right]], colWidths=[83 * mm, 83 * mm])
    safe_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BACKGROUND", (0, 0), (0, 0), SOFT),
                ("BACKGROUND", (1, 0), (1, 0), PALE_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("INNERGRID", (0, 0), (-1, -1), 0.5, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
            ]
        )
    )
    story += [safe_table, PageBreak()]

    # Proceso real
    story += section("06 / Aplicación real", "Del perfil inicial al cilindrado")
    image_table = Table(
        [
            [photo(PHOTO_PROCESS, 79 * mm, 104 * mm), photo(PHOTO_PANEL, 79 * mm, 104 * mm)],
            [
                para("Cilindrado exterior con herramienta de corte y lubricación.", "SmallMQ"),
                para("Panel del torno C0636B registrado en el taller.", "SmallMQ"),
            ],
        ],
        colWidths=[83 * mm, 83 * mm],
    )
    image_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
            ]
        )
    )
    story += [
        image_table,
        para(
            "En el proceso documentado, una pieza con caras planas se sujetó en el plato y se mecanizó mediante giro controlado, avance progresivo de la herramienta y lubricación hasta obtener una superficie cilíndrica. La secuencia concreta debe definirse para cada material, geometría y tolerancia.",
        ),
        PageBreak(),
    ]

    # Mantenimiento
    story += section("07 / Mantenimiento", "Programa preventivo inicial")
    maintenance = [
        ("Antes de cada turno", "Revisar niveles y fugas; plato y sujeción; herramienta; resguardos; parada de emergencia; refrigerante; área libre de obstáculos."),
        ("Después de cada turno", "Detener y aislar; retirar viruta con herramienta adecuada; limpiar guías; proteger superficies y registrar anomalías."),
        ("Semanal", "Inspeccionar correas, holguras visibles, fijaciones, mangueras, bomba y condición del refrigerante. Lubricar solo en puntos confirmados."),
        ("Mensual", "Revisar puesta a tierra, cableado visible, desgaste del plato, alineación básica del contrapunto y nivelación si existen señales de desviación."),
        ("Según fabricante", "Cambio de aceites, ajustes de caja, lubricación interna, rodamientos y cualquier intervención que requiera valores o procedimientos específicos."),
    ]
    data = [[para("Frecuencia", "Callout"), para("Actividad", "Callout")]] + [
        [para(freq, "SmallMQ"), para(activity, "SmallMQ")] for freq, activity in maintenance
    ]
    maint_table = Table(data, colWidths=[40 * mm, 130 * mm], repeatRows=1)
    maint_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), NAVY),
                ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.45, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
                ("BACKGROUND", (0, 2), (-1, 2), SOFT),
                ("BACKGROUND", (0, 4), (-1, 4), SOFT),
            ]
        )
    )
    story += [
        maint_table,
        Spacer(1, 6 * mm),
        callout(
            "Registro obligatorio",
            "Anote fecha, horómetro si está disponible, actividad, repuesto o lubricante utilizado, condición encontrada, responsable y autorización de retorno a servicio.",
        ),
        PageBreak(),
    ]

    # Diagnóstico y contacto
    story += section("08 / Soporte", "Diagnóstico inicial y escalamiento")
    issues = [
        ("Vibración o ruido", "Detener. Revisar sujeción, herramienta, interferencias, velocidad y condición visible del plato. No reiniciar si persiste."),
        ("Mal acabado", "Verificar filo, rigidez, sujeción, avance, velocidad, refrigeración y condición de la pieza."),
        ("Pieza cónica", "Comprobar montaje, flexión, apoyo del contrapunto, alineación y desgaste antes de corregir."),
        ("Sobrecalentamiento", "Detener. Revisar lubricación, carga, herramienta, refrigeración, rodamientos y transmisión con personal técnico."),
        ("No enciende", "Confirmar parada de emergencia, alimentación y protecciones visibles. La revisión interna corresponde a personal eléctrico autorizado."),
    ]
    story += [spec_table(issues), Spacer(1, 6 * mm)]
    contact = Table(
        [
            [
                [
                    para("SOPORTE MAQELEC", "SectionLabel"),
                    para("Antes de contactarnos", "SubTitle"),
                    para(
                        "Tenga a mano modelo, número de serie, fotografía de la placa, descripción de la operación, material, herramienta, alarma o síntoma y registro visual del problema.",
                        "SmallMQ",
                    ),
                ],
                [
                    para("+56 9 9151 4957", "Callout"),
                    Spacer(1, 2 * mm),
                    para("contacto@maqelec.cl", "Callout"),
                    Spacer(1, 2 * mm),
                    para("www.maqelec.cl", "Callout"),
                ],
            ]
        ],
        colWidths=[112 * mm, 58 * mm],
    )
    contact.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GREEN),
                ("BOX", (0, 0), (-1, -1), 0.6, GREEN),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 5 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5 * mm),
            ]
        )
    )
    story += [contact]
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    width, height = A4
    frame = Frame(
        20 * mm,
        18 * mm,
        width - 40 * mm,
        height - 40 * mm,
        leftPadding=0,
        rightPadding=0,
        topPadding=2 * mm,
        bottomPadding=2 * mm,
    )
    doc = ManualDoc(
        str(OUTPUT),
        pagesize=A4,
        title="Guía preliminar de operación y mantenimiento C0636B",
        author="MAQELEC SpA",
        subject="Torno convencional C0636B",
        creator="MAQELEC SpA",
    )
    doc.addPageTemplates([PageTemplate(id="manual", frames=[frame], onPage=header_footer)])
    doc.build(build_story())
    print(OUTPUT)


if __name__ == "__main__":
    main()
