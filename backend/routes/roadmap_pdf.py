from flask import Blueprint, request, send_file
from flask_cors import cross_origin
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from io import BytesIO

from personality_engine.roadmap_generator import generate_roadmap

roadmap_pdf_bp = Blueprint("roadmap_pdf", __name__)

def build_pdf(roadmap):
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4)
    styles = getSampleStyleSheet()
    story = []

    story.append(Paragraph(f"<b>{roadmap.get('career','Career')} Roadmap</b>", styles["Title"]))
    story.append(Spacer(1, 10))
    story.append(Paragraph(f"MBTI: <b>{roadmap.get('mbti','N/A')}</b>", styles["Normal"]))
    story.append(Spacer(1, 12))

    for phase in roadmap.get("phases", []):
        story.append(Paragraph(f"<b>{phase.get('phase','Phase')}</b>", styles["Heading2"]))

        if phase.get("duration"):
            story.append(Paragraph(phase["duration"], styles["Italic"]))

        story.append(Spacer(1, 6))

        if phase.get("focus"):
            story.append(
             ListFlowable(
    [Paragraph(item, styles["BodyText"]) for item in phase["focus"]],
    bulletType="bullet",
)

            )

        if phase.get("narrative"):
            story.append(Spacer(1, 6))
            story.append(Paragraph(phase["narrative"], styles["BodyText"]))

        story.append(Spacer(1, 12))

    doc.build(story)
    buffer.seek(0)
    return buffer


@roadmap_pdf_bp.route("/roadmap/pdf", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://localhost:5173")
def roadmap_pdf():
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json(silent=True) or {}

    roadmap = data.get("roadmap")
    if not roadmap:
        roadmap = generate_roadmap(data)

    pdf_buffer = build_pdf(roadmap)

    filename = f"{roadmap.get('mbti','MBTI')}_{roadmap.get('career','Career')}.pdf"

    return send_file(
        pdf_buffer,
        as_attachment=True,
        download_name=filename.replace(" ", "_"),
        mimetype="application/pdf",
    )
