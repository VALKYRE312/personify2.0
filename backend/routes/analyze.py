# backend/routes/analyze.py
from __future__ import annotations
from flask import Blueprint, request, jsonify
from typing import Dict, List, Tuple, TypedDict

from personality_engine.traits_data import TYPE_DESCRIPTIONS

# ---------- Types ----------
from typing import TypedDict, Dict, List, Tuple

# AxisResult: holds two poles for whichever axis + the chosen letter.
# total=False lets keys be optional so the same type works for EI, SN, TF, JP.
class AxisResult(TypedDict):
    letter: str
    E: float | None
    I: float | None
    S: float | None
    N: float | None
    T: float | None
    F: float | None
    J: float | None
    P: float | None

ResultsDict = Dict[str, AxisResult]


analyze_bp = Blueprint("analyze", __name__)


# ---------- Types ----------


# ---------- Helpers ----------
def likert_to_signed(v: int) -> int:
    """
    Map 1..5 Likert to centered -2..+2 (3 -> 0).
    """
    v = max(1, min(5, int(v)))
    return v - 3


# Each question index maps to one axis and which side a positive score favours.
# axis: "EI", "SN", "TF", "JP"
# positive: which pole a positive score pushes toward (e.g., "E" or "I")
# reverse: if the wording pushes the opposite direction and must be inverted
QUESTION_MAP: Dict[int, Dict] = {
    # ---- First 16 (matches your original quiz content) ----
    0:  {"axis": "EI", "positive": "I", "reverse": False},  # alone -> Introversion
    1:  {"axis": "TF", "positive": "T", "reverse": False},  # logic > feelings -> Thinking
    2:  {"axis": "JP", "positive": "J", "reverse": False},  # planning -> Judging
    3:  {"axis": "SN", "positive": "N", "reverse": False},  # creativity/ideas -> iNtuition
    4:  {"axis": "EI", "positive": "E", "reverse": False},  # introduce self -> Extraversion
    5:  {"axis": "JP", "positive": "J", "reverse": False},  # schedule -> Judging
    6:  {"axis": "TF", "positive": "F", "reverse": False},  # care about feelings -> Feeling
    7:  {"axis": "TF", "positive": "T", "reverse": False},  # debates -> Thinking
    8:  {"axis": "SN", "positive": "S", "reverse": False},  # notice details -> Sensing
    9:  {"axis": "SN", "positive": "N", "reverse": False},  # daydream/possibilities -> N
    10: {"axis": "SN", "positive": "S", "reverse": False},  # hands-on/practical -> S
    11: {"axis": "EI", "positive": "E", "reverse": False},  # energized by groups -> E
    12: {"axis": "JP", "positive": "J", "reverse": False},  # disorganized irritates -> J
    13: {"axis": "SN", "positive": "N", "reverse": False},  # trust gut -> N
    14: {"axis": "TF", "positive": "T", "reverse": False},  # calm under pressure -> T
    15: {"axis": "EI", "positive": "I", "reverse": False},  # few close friends -> I

    # ---- Extra 14 to make 30 ----
    16: {"axis": "JP", "positive": "P", "reverse": False},
    17: {"axis": "EI", "positive": "E", "reverse": False},
    18: {"axis": "EI", "positive": "I", "reverse": False},
    19: {"axis": "SN", "positive": "S", "reverse": False},
    20: {"axis": "SN", "positive": "N", "reverse": False},
    21: {"axis": "TF", "positive": "F", "reverse": False},
    22: {"axis": "TF", "positive": "T", "reverse": False},
    23: {"axis": "JP", "positive": "J", "reverse": False},
    24: {"axis": "JP", "positive": "P", "reverse": False},
    25: {"axis": "EI", "positive": "E", "reverse": False},
    26: {"axis": "EI", "positive": "I", "reverse": False},
    27: {"axis": "SN", "positive": "S", "reverse": False},
    28: {"axis": "TF", "positive": "F", "reverse": False},
    29: {"axis": "JP", "positive": "P", "reverse": False},
}

AXES: List[str] = ["EI", "SN", "TF", "JP"]
POLES: Dict[str, Tuple[str, str]] = {
    "EI": ("E", "I"),
    "SN": ("S", "N"),
    "TF": ("T", "F"),
    "JP": ("J", "P"),
}


def compute_scores(answers: Dict[str, int]) -> Dict[str, AxisResult]:
    """
    Compute per-axis normalized percentages and chosen letter.

    Returns:
    {
      "EI": {"E": 26.0, "I": 74.0, "letter": "I"},
      "SN": {"S": 40.0, "N": 60.0, "letter": "N"},
      ...
    }
    """
    # raw sums toward each pole
    sums: Dict[str, Dict[str, float]] = {
        axis: {POLES[axis][0]: 0.0, POLES[axis][1]: 0.0} for axis in AXES
    }

    for k, v in answers.items():
        try:
            q_idx = int(k)
        except Exception:
            continue

        meta = QUESTION_MAP.get(q_idx)
        if not meta:
            continue

        axis = meta["axis"]
        pos_pole = meta["positive"]
        neg_pole = POLES[axis][0] if POLES[axis][1] == pos_pole else POLES[axis][1]

        signed = likert_to_signed(v)
        if meta.get("reverse"):
            signed = -signed

        if signed > 0:
            sums[axis][pos_pole] += signed
        elif signed < 0:
            sums[axis][neg_pole] += (-signed)
        # signed == 0 -> no contribution

    # normalize to percentages
    results: Dict[str, AxisResult] = {}
    for axis in AXES:
        a, b = POLES[axis]
        pos = sums[axis][a]
        neg = sums[axis][b]
        total = pos + neg

        if total == 0:
            pct_a = pct_b = 50.0
        else:
            pct_a = round((pos / total) * 100.0, 1)
            pct_b = round((neg / total) * 100.0, 1)

        letter = a if pct_a >= pct_b else b
        results[axis] = AxisResult(**{a: pct_a, b: pct_b, "letter": letter})  # type: ignore[arg-type]

    return results


def build_type(results: Dict[str, AxisResult]) -> str:
    # Pylance-friendly: "letter" is guaranteed str via AxisResult
    return "".join(results[axis]["letter"] for axis in AXES)


@analyze_bp.route("/analyze", methods=["POST", "OPTIONS"])
def analyze():
    """
    POST /api/analyze
    payload: { "answers": { "0": 4, "1": 2, ... } }  (1..5 scale)
    """
    if request.method == "OPTIONS":
        return "", 200
    
    data = request.get_json(silent=True) or {}
    answers = data.get("answers", {})

    if not isinstance(answers, dict) or not answers:
        return jsonify({"error": "Invalid payload: 'answers' dict required."}), 400

    results = compute_scores(answers)
    mbti_type = build_type(results)

    breakdown = {
        "Energy":  {"letter": results["EI"]["letter"], "E": results["EI"]["E"], "I": results["EI"]["I"]},
        "Mind":    {"letter": results["SN"]["letter"], "S": results["SN"]["S"], "N": results["SN"]["N"]},
        "Nature":  {"letter": results["TF"]["letter"], "T": results["TF"]["T"], "F": results["TF"]["F"]},
        "Tactics": {"letter": results["JP"]["letter"], "J": results["JP"]["J"], "P": results["JP"]["P"]},
    }

    description = TYPE_DESCRIPTIONS.get(mbti_type, {
        "title": mbti_type,
        "summary": "A balanced, adaptable personality profile.",
        "strengths": [],
        "weaknesses": [],
    })

    return jsonify({
        "type": mbti_type,
        "percentages": results,
        "breakdown": breakdown,
        "profile": description,
    })
