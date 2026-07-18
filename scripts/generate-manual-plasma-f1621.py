#!/usr/bin/env python3
"""Genera la guía preliminar MAQELEC para mesa plasma CNC con THC F1621."""

from pathlib import Path
import shutil
import subprocess

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "guia-preliminar-plasma-cnc-f1621-maqelec.pdf"
RAW_OUTPUT = OUTPUT.with_name("guia-preliminar-plasma-cnc-f1621-source.pdf")
LOGO = ROOT / "logo.png"
PHOTO_GENERAL = ROOT / "assets" / "trabajos-reales" / "plasma-cnc-vista-general.webp"
PHOTO_CUT = ROOT / "assets" / "trabajos-reales" / "plasma-cnc-antorcha-corte.webp"
PHOTO_PANEL = ROOT / "assets" / "trabajos-reales" / "plasma-f1621-controlador-altura.webp"
PHOTO_CONTROL = ROOT / "assets" / "trabajos-reales" / "plasma-cnc-panel-control.webp"

NAVY = colors.HexColor("#102D38")
BLUE = colors.HexColor("#097EBC")
GREEN = colors.HexColor("#3D983F")
INK = colors.HexColor("#0B2030")
MUTED = colors.HexColor("#526776")
LINE = colors.HexColor("#D9E5EA")
SOFT = colors.HexColor("#F4F8F9")
PALE_GREEN = colors.HexColor("#EEF7EE")
PALE_ORANGE = colors.HexColor("#FFF3E2")
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


STYLES = {
    "title": ParagraphStyle("title", fontName=FONT_BOLD, fontSize=25, leading=25, textColor=WHITE),
    "cover_text": ParagraphStyle("cover_text", fontName=FONT, fontSize=9, leading=13, textColor=colors.HexColor("#D8E8ED")),
    "h1": ParagraphStyle("h1", fontName=FONT_BOLD, fontSize=19, leading=22, textColor=INK, spaceAfter=5 * mm),
    "h2": ParagraphStyle("h2", fontName=FONT_BOLD, fontSize=11, leading=14, textColor=INK, spaceBefore=3 * mm, spaceAfter=2 * mm),
    "body": ParagraphStyle("body", fontName=FONT, fontSize=8.2, leading=12, textColor=INK, spaceAfter=2.5 * mm),
    "small": ParagraphStyle("small", fontName=FONT, fontSize=6.4, leading=8.5, textColor=MUTED),
    "label": ParagraphStyle("label", fontName=FONT_BOLD, fontSize=6.2, leading=8, textColor=BLUE, spaceAfter=2 * mm),
    "callout": ParagraphStyle("callout", fontName=FONT_BOLD, fontSize=7.4, leading=10, textColor=INK),
}


def p(text, style="body"):
    return Paragraph(text, STYLES[style])


def image(path, width, height):
    item = Image(str(path), width=width, height=height)
    item.hAlign = "CENTER"
    return item


def logo_plate():
    plate = Table([[image(LOGO, 34 * mm, 9 * mm)]], colWidths=[42 * mm], rowHeights=[14 * mm])
    plate.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("BOX", (0, 0), (-1, -1), 0, WHITE),
            ]
        )
    )
    return plate


def bullets(items):
    return [p(f"• {item}") for item in items]


def section(label, title):
    return [p(label.upper(), "label"), p(title, "h1")]


def box(content, background=SOFT, border=LINE, widths=(170 * mm,)):
    table = Table([[content]], colWidths=list(widths))
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), background),
                ("BOX", (0, 0), (-1, -1), 0.5, border),
                ("LEFTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5 * mm),
                ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
            ]
        )
    )
    return table


def data_table(rows, widths=(72 * mm, 98 * mm)):
    data = [[p("Parámetro", "callout"), p("Referencia", "callout")]]
    data.extend([[p(left, "small"), p(right, "small")] for left, right in rows])
    table = Table(data, colWidths=list(widths), repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]
    for row in range(1, len(data)):
        style.append(("BACKGROUND", (0, row), (-1, row), WHITE if row % 2 else SOFT))
    table.setStyle(TableStyle(style))
    return table


def page_header_footer(canvas, doc):
    if doc.page == 1:
        return
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, height - 16 * mm, width, 16 * mm, fill=1, stroke=0)
    canvas.setFillColor(WHITE)
    canvas.roundRect(12 * mm, height - 13 * mm, 29 * mm, 9 * mm, 2 * mm, fill=1, stroke=0)
    canvas.drawImage(str(LOGO), 14 * mm, height - 11.6 * mm, width=25 * mm, height=6 * mm, preserveAspectRatio=True, mask="auto")
    canvas.setFont(FONT_BOLD, 5.5)
    canvas.drawRightString(width - 14 * mm, height - 10 * mm, "GUÍA PRELIMINAR · PLASMA CNC / F1621")
    canvas.setStrokeColor(LINE)
    canvas.line(14 * mm, 12 * mm, width - 14 * mm, 12 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 5)
    canvas.drawString(14 * mm, 8 * mm, "Documento MAQELEC v0.1 · Julio 2026")
    canvas.drawRightString(width - 14 * mm, 8 * mm, f"Página {doc.page}")
    canvas.restoreState()


def cover():
    left = [
        logo_plate(),
        Spacer(1, 16 * mm),
        p("GUÍA PRELIMINAR DE OPERACIÓN Y MANTENIMIENTO", "cover_text"),
        Spacer(1, 5 * mm),
        p("Mesa de corte<br/>plasma CNC", "title"),
        Spacer(1, 4 * mm),
        p("Con controlador automático de altura de antorcha F1621", "cover_text"),
        Spacer(1, 38 * mm),
        p("Versión 0.1 · Julio 2026<br/>MAQELEC SpA · Santiago, Chile", "cover_text"),
    ]
    table = Table([[left, image(PHOTO_GENERAL, 92 * mm, 88 * mm)]], colWidths=[78 * mm, 92 * mm], rowHeights=[252 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, 0), NAVY),
                ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#E8EFF1")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (0, 0), 10 * mm),
                ("RIGHTPADDING", (0, 0), (0, 0), 8 * mm),
                ("TOPPADDING", (0, 0), (0, 0), 12 * mm),
                ("LEFTPADDING", (1, 0), (1, 0), 0),
                ("RIGHTPADDING", (1, 0), (1, 0), 0),
                ("TOPPADDING", (1, 0), (1, 0), 0),
            ]
        )
    )
    return [table, PageBreak()]


def story():
    s = cover()

    s += section("01 / Alcance", "Qué equipo cubre esta guía")
    s += [
        box([p("DOCUMENTO PRELIMINAR · NO REEMPLAZA LOS MANUALES DEL FABRICANTE", "callout"), p("Esta guía describe el sistema observado por MAQELEC y resume información pública del controlador F1621. Antes de instalar, configurar u operar, deben verificarse la placa, la fuente plasma, el control CNC, la mesa, el cableado y los manuales correspondientes a cada componente.", "small")], PALE_GREEN),
        p("El nombre <b>F1621</b> identifica al controlador automático de altura de antorcha (THC), no a toda la máquina. La mesa completa integra estructura, pórtico, ejes, control CNC, fuente plasma, antorcha, extracción o mesa de agua y elementos de seguridad."),
        p("Uso previsto", "h2"),
        *bullets([
            "Corte automatizado de materiales metálicos conductores sobre trayectorias programadas.",
            "Fabricación de contornos, ranuras y piezas repetibles para procesos metalmecánicos.",
            "Operación exclusiva por personal capacitado, con evaluación de riesgos y supervisión.",
        ]),
        box([p("Datos que debe registrar el propietario", "callout"), p("Modelo y serie de mesa, control CNC, THC y fuente plasma; tensión instalada; área útil; amperaje; antorcha y consumibles; capacidad de extracción; parámetros aprobados por material y espesor.", "small")]),
        PageBreak(),
    ]

    s += section("02 / Identificación técnica", "Datos confirmados del controlador F1621")
    s += [
        data_table([
            ("Componente", "Controlador automático de altura de antorcha / THC"),
            ("Modelo", "F1621"),
            ("Principio", "Seguimiento por variación de tensión de arco"),
            ("Tensión nominal", "24 VDC"),
            ("Rango nominal", "21,6–26,4 VDC"),
            ("Motor de elevación", "24 VDC"),
            ("Accionamiento", "PWM"),
            ("Corriente de salida", "0–3 A"),
            ("Capacidad de carga", "100 W"),
            ("Altura inicial", "Detección por proximidad o contacto del capuchón, según instalación"),
            ("Interfaz", "Señales CNC aisladas por optoacoplador"),
            ("Temperatura de trabajo", "0–50 °C"),
            ("Humedad relativa", "5–95 %"),
        ]),
        Spacer(1, 3 * mm),
        p("Fuente técnica: manual del operador ARCBRO/Fangling F1621, revisión 2, agosto de 2018. Las capacidades de la mesa y la fuente plasma no se deducen del modelo del THC." , "small"),
        PageBreak(),
    ]

    s += section("03 / Seguridad", "Riesgos que requieren control específico")
    safety = [
        ("Energía eléctrica", "La fuente plasma y el arco implican tensiones peligrosas. Bloquear, verificar ausencia de energía y usar personal eléctrico competente."),
        ("Radiación y arco", "Usar protección ocular y facial apropiada para plasma; proteger también a terceros mediante pantallas y delimitación."),
        ("Humos y gases", "Disponer extracción localizada o mesa de agua diseñada para el proceso. No cortar materiales desconocidos o con recubrimientos peligrosos sin evaluación."),
        ("Incendio", "Retirar combustibles, controlar la proyección inferior, disponer medios de extinción y mantener vigilancia posterior al corte."),
        ("Movimiento CNC", "No ingresar al recorrido del pórtico ni intervenir la antorcha con ejes habilitados. Verificar límites, parada y zona despejada."),
        ("Ruido y partículas", "Utilizar protección auditiva, ropa resistente, calzado y guantes solo para manipulación con el equipo detenido."),
    ]
    s += [data_table(safety), Spacer(1, 4 * mm), box([p("No iniciar si falta una protección", "callout"), p("Parada de emergencia, puesta a tierra, extracción, consumibles correctos, sujeción de plancha, protección personal y control del área deben verificarse antes de habilitar el arco.", "small")], PALE_ORANGE, colors.HexColor("#E5B96A")), PageBreak()]

    s += section("04 / Puesta en marcha", "Comprobación inicial del sistema")
    s += bullets([
        "Confirmar tensión, fases, protecciones, tierra y documentación de cada componente.",
        "Inspeccionar mesa, guías, transmisión, cable portador, pórtico y movimientos libres.",
        "Verificar instalación del THC F1621 dentro de un gabinete protegido del polvo y de interferencia electromagnética excesiva.",
        "Comprobar antorcha, consumibles, aire, presión, fuente plasma y retorno de trabajo.",
        "Probar parada de emergencia, límites, colisión, altura inicial y elevación sin encender arco.",
        "Ejecutar una trayectoria en vacío antes de la primera prueba de corte.",
        "Validar parámetros con una probeta del mismo material y espesor; registrar el resultado aprobado.",
    ])
    s += [Spacer(1, 3 * mm), box([p("Integración eléctrica", "callout"), p("La conexión entre fuente plasma, CNC, F1621, divisor de tensión, motor y sensores no debe improvisarse desde fotografías. Debe seguir los diagramas del fabricante y ser ejecutada por personal competente.", "small")]), PageBreak()]

    s += section("05 / Operación", "Secuencia básica de trabajo seguro")
    steps = [
        ("1 · Preparar", "Revisar plano, material, espesor, tolerancia, cantidad y terminación requerida."),
        ("2 · Programar", "Generar la trayectoria, compensación, entradas, orden de corte y anidado de piezas."),
        ("3 · Inspeccionar", "Confirmar consumibles, aire, retorno, extracción, límites, antorcha y área despejada."),
        ("4 · Posicionar", "Cargar la plancha, definir origen y comprobar recorrido sin arco."),
        ("5 · Ajustar", "Seleccionar parámetros validados para fuente, velocidad, perforación y altura; no copiar valores de otra instalación."),
        ("6 · Cortar", "Iniciar desde zona segura y supervisar arco, altura, trayectoria, humo y proyección inferior."),
        ("7 · Cerrar", "Finalizar programa, deshabilitar energía, esperar enfriamiento y retirar piezas con medios adecuados."),
        ("8 · Registrar", "Anotar material, espesor, parámetros, consumibles, calidad y cualquier alarma o desviación."),
    ]
    s += [data_table(steps, widths=(38 * mm, 132 * mm)), PageBreak()]

    s += section("06 / Aplicación real", "Control CNC, altura y corte en taller")
    photos = Table(
        [[image(PHOTO_CUT, 54 * mm, 95 * mm), image(PHOTO_PANEL, 54 * mm, 95 * mm), image(PHOTO_CONTROL, 54 * mm, 95 * mm)]],
        colWidths=[56 * mm, 56 * mm, 56 * mm],
    )
    photos.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 1 * mm), ("RIGHTPADDING", (0, 0), (-1, -1), 1 * mm)]))
    s += [photos, Spacer(1, 3 * mm), p("Las fotografías muestran la antorcha ejecutando una trayectoria, el panel F1621 y el control CNC instalados en el equipo real. El valor de tensión observado en pantalla documenta esa operación específica y no constituye un parámetro universal."), PageBreak()]

    s += section("07 / Calidad de corte", "Qué revisar antes de corregir parámetros")
    s += [
        data_table([
            ("Corte incompleto", "Revisar corriente, velocidad, aire, consumible, retorno, espesor y capacidad efectiva de la fuente."),
            ("Exceso de escoria", "Verificar velocidad, altura, consumible, presión/calidad de aire y correspondencia con el material."),
            ("Bisel o conicidad", "Inspeccionar antorcha perpendicular, consumible, altura, dirección de corte y estado mecánico del pórtico."),
            ("Arco se interrumpe", "Detener; revisar retorno, aire, consumible, fuente, señales y registro de alarma sin puentear protecciones."),
            ("Antorcha oscila", "Detener si hay riesgo; revisar rigidez, holgura, sensibilidad THC, material deformado e interferencias."),
            ("Trayectoria desplazada", "Comprobar origen, archivo, pasos, acoples, guías y pérdida de movimiento antes de repetir."),
        ]),
        Spacer(1, 4 * mm),
        p("Modificar una variable por vez y registrar el efecto. Si existe contacto, colisión, arco inestable o movimiento inesperado, detener y escalar la revisión."),
        PageBreak(),
    ]

    s += section("08 / Mantenimiento", "Programa preventivo inicial")
    s += [
        data_table([
            ("Antes de cada turno", "Inspeccionar antorcha, consumibles, retorno, cables, mangueras, guías, mesa, extracción, parada y zona inferior."),
            ("Después del turno", "Desenergizar; retirar escoria y residuos con método seguro; limpiar ópticamente paneles y registrar anomalías."),
            ("Semanal", "Revisar transmisión, lubricación permitida, ruedas/guías, fijaciones, sensores, finales de carrera y cable portador."),
            ("Mensual", "Inspeccionar gabinete, ventilación, conexiones visibles, puesta a tierra y condición de la mesa con personal competente."),
            ("Según fuente/antorcha", "Cumplir intervalos y consumibles definidos por sus fabricantes; no sustituir por equivalentes no validados."),
        ]),
        Spacer(1, 4 * mm),
        box([p("Registro obligatorio", "callout"), p("Anotar fecha, horómetro si existe, actividad, consumible o repuesto, parámetro modificado, condición encontrada y responsable.", "small")]),
        PageBreak(),
    ]

    s += section("09 / Alarmas y soporte", "Detener, documentar y escalar")
    s += [
        p("El F1621 puede registrar alarmas relacionadas con comunicación, parámetros, arco, colisión y límites. La corrección debe partir por identificar el código exacto y consultar la tabla del manual OEM correspondiente a la revisión instalada."),
        data_table([
            ("Antes de reiniciar", "Registrar código, estado de indicadores, etapa del programa, material, espesor y fotografías."),
            ("No hacer", "No puentear límites, colisión, tierra, extracción ni señales de arco para forzar continuidad."),
            ("Escalar de inmediato", "Movimiento inesperado, cable recalentado, olor, humo eléctrico, choque, arco errático o pérdida reiterada de comunicación."),
        ]),
        Spacer(1, 5 * mm),
        box([
            p("SOPORTE MAQELEC", "label"),
            p("Antes de contactarnos", "h2"),
            p("Tenga a mano placas y series de mesa, CNC, F1621 y fuente plasma; material y espesor; programa; consumibles; código de alarma; fotografías y video corto del síntoma."),
            p("+56 9 9151 4957 · contacto@maqelec.cl · www.maqelec.cl", "callout"),
        ], PALE_GREEN, GREEN),
    ]
    return s


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    frame = Frame(20 * mm, 18 * mm, A4[0] - 40 * mm, A4[1] - 40 * mm, leftPadding=0, rightPadding=0, topPadding=2 * mm, bottomPadding=2 * mm)
    doc = BaseDocTemplate(
        str(RAW_OUTPUT),
        pagesize=A4,
        title="Guía preliminar de operación y mantenimiento · Plasma CNC con THC F1621",
        author="MAQELEC SpA",
        subject="Mesa de corte plasma CNC y controlador F1621",
        creator="MAQELEC SpA",
    )
    doc.addPageTemplates([PageTemplate(id="manual", frames=[frame], onPage=page_header_footer)])
    doc.build(story())
    ghostscript = shutil.which("gs")
    if ghostscript:
        subprocess.run([
            ghostscript,
            "-sDEVICE=pdfwrite",
            "-dCompatibilityLevel=1.4",
            "-dPDFSETTINGS=/ebook",
            "-dNOPAUSE",
            "-dQUIET",
            "-dBATCH",
            f"-sOutputFile={OUTPUT}",
            str(RAW_OUTPUT),
        ], check=True)
        RAW_OUTPUT.unlink()
    else:
        RAW_OUTPUT.replace(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    main()
