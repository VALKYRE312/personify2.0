from personality_engine.traits_data import TYPE_DESCRIPTIONS

QUESTION_TRAITS = {
    0: ("I", True),
    1: ("I", False),
    2: ("E", False),
    3: ("E", False),
    4: ("I", False),
    5: ("I", False),

    6: ("N", False),
    7: ("N", False),
    8: ("S", False),
    9: ("N", False),
    10: ("S", False),
    11: ("N", False),

    12: ("T", False),
    13: ("F", False),
    14: ("T", False),
    15: ("F", False),
    16: ("F", False),
    17: ("T", False),

    18: ("J", False),
    19: ("P", False),
    20: ("J", False),
    21: ("J", False),
    22: ("P", False),
    23: ("P", False),

    24: ("A", True),
    25: ("T_id", False),
    26: ("A", False),
    27: ("T_id", False),
    28: ("A", False),
    29: ("T_id", False),
}

def calculate_personality(answers):
    scores = {
        "E": 0, "I": 0,
        "S": 0, "N": 0,
        "T": 0, "F": 0,
        "J": 0, "P": 0,
        "A": 0, "T_id": 0,
    }

    for q_index, val in answers.items():
        val = int(val)
        trait, reverse = QUESTION_TRAITS[int(q_index)]

        score = 6 - val if reverse else val
        scores[trait] += score

    mbti = ""
    mbti += "E" if scores["E"] > scores["I"] else "I"
    mbti += "S" if scores["S"] > scores["N"] else "N"
    mbti += "T" if scores["T"] > scores["F"] else "F"
    mbti += "J" if scores["J"] > scores["P"] else "P"

    identity = "A" if scores["A"] > scores["T_id"] else "T"
    final_type = f"{mbti}-{identity}"

    return {
        "type": final_type,
        "scores": scores,
        "description": TYPE_DESCRIPTIONS.get(mbti),  # personality data
    }
