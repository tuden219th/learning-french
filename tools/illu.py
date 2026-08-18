from pathlib import Path
import html
import re
import sys
import json


# =========================================================
# CONFIG
# =========================================================

OUTPUT_DIR = Path("public/images/generated")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

WIDTH = 800
HEIGHT = 560

SCENES_FILE = Path("tools/illu_scenes.json")


def load_scene_data():
    if not SCENES_FILE.exists():
        return {}

    with SCENES_FILE.open("r", encoding="utf-8") as f:
        return json.load(f)


def find_scene(text):
    data = load_scene_data()
    normalized = normalize(text)

    # Ưu tiên cụm từ dài trước
    matches = sorted(
        data.items(),
        key=lambda item: len(item[0]),
        reverse=True
    )

    for phrase, config in matches:
        if phrase in normalized:
            return config

    return {
        "scene": "generic"
    }

# =========================================================
# TEXT HELPERS
# =========================================================

def esc(text: str) -> str:
    return html.escape(text, quote=True)


def normalize(text: str) -> str:
    return (
        text.lower()
        .replace("à", "a")
        .replace("â", "a")
        .replace("ä", "a")
        .replace("é", "e")
        .replace("è", "e")
        .replace("ê", "e")
        .replace("ë", "e")
        .replace("î", "i")
        .replace("ï", "i")
        .replace("ô", "o")
        .replace("ö", "o")
        .replace("ù", "u")
        .replace("û", "u")
        .replace("ü", "u")
        .replace("ÿ", "y")
        .replace("ç", "c")
    )


def slugify(text: str) -> str:
    value = normalize(text)
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-") or "illustration"


# =========================================================
# SVG BASICS
# =========================================================

def background():
    return f"""
    <rect
        width="{WIDTH}"
        height="{HEIGHT}"
        rx="38"
        fill="#FFF8EF"
    />

    <circle
        cx="690"
        cy="78"
        r="34"
        fill="#FFD166"
    />

    <path
        d="M0 470 Q200 430 400 470 T800 470 V560 H0 Z"
        fill="#F3E3D0"
    />
    """


def ground_shadow(x, y, width=110):
    return f"""
    <ellipse
        cx="{x}"
        cy="{y}"
        rx="{width}"
        ry="14"
        fill="#E8D5BF"
    />
    """


# =========================================================
# SPEECH BUBBLE
# =========================================================

def bubble(text, x, y, width=250, direction="down"):
    height = 78

    if direction == "down":
        tail = f"""
        <path
            d="
                M {x-20} {y + height / 2}
                L {x} {y + height / 2 + 28}
                L {x+20} {y + height / 2}
            "
            fill="white"
            stroke="#E4D3C0"
            stroke-width="3"
        />
        """
    else:
        tail = f"""
        <path
            d="
                M {x-20} {y + height / 2}
                L {x} {y + height / 2 + 28}
                L {x+20} {y + height / 2}
            "
            fill="white"
            stroke="#E4D3C0"
            stroke-width="3"
        />
        """

    return f"""
    <rect
        x="{x - width / 2}"
        y="{y}"
        width="{width}"
        height="{height}"
        rx="28"
        fill="white"
        stroke="#E4D3C0"
        stroke-width="3"
    />

    {tail}

    <text
        x="{x}"
        y="{y + 49}"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="28"
        font-weight="700"
        fill="#3B2416"
    >
        {esc(text)}
    </text>
    """


# =========================================================
# CHARACTER
# =========================================================

def character(
    x,
    y,
    *,
    skin="#F3C7A5",
    hair="#5A3825",
    shirt="#F59E0B",
    pants="#4B5563",
    pose="neutral",
    mood="happy",
):
    head_y = y
    body_top = y + 62

    svg = []

    # -----------------------------------------------------
    # Shadow
    # -----------------------------------------------------

    svg.append(ground_shadow(x, y + 225, 72))

    # -----------------------------------------------------
    # Hair back
    # -----------------------------------------------------

    svg.append(f"""
    <path
        d="
            M {x-45} {head_y-3}
            Q {x} {head_y-67} {x+45} {head_y-3}
            L {x+38} {head_y+30}
            Q {x} {head_y+10} {x-38} {head_y+30}
            Z
        "
        fill="{hair}"
    />
    """)

    # -----------------------------------------------------
    # Face
    # -----------------------------------------------------

    svg.append(f"""
    <circle
        cx="{x}"
        cy="{head_y}"
        r="43"
        fill="{skin}"
    />
    """)

    # Hair front
    svg.append(f"""
    <path
        d="
            M {x-43} {head_y-5}
            Q {x-20} {head_y-55} {x+42} {head_y-8}
            Q {x+15} {head_y-27} {x-12} {head_y-20}
            Q {x-30} {head_y-14} {x-43} {head_y-5}
            Z
        "
        fill="{hair}"
    />
    """)

    # -----------------------------------------------------
    # Eyes
    # -----------------------------------------------------

    if mood == "happy":
        eyes = f"""
        <path
            d="M {x-20} {head_y+2} Q {x-13} {head_y-5} {x-6} {head_y+2}"
            fill="none"
            stroke="#3B2416"
            stroke-width="5"
            stroke-linecap="round"
        />

        <path
            d="M {x+6} {head_y+2} Q {x+13} {head_y-5} {x+20} {head_y+2}"
            fill="none"
            stroke="#3B2416"
            stroke-width="5"
            stroke-linecap="round"
        />
        """

    elif mood == "surprised":
        eyes = f"""
        <circle cx="{x-14}" cy="{head_y+1}" r="6" fill="#3B2416"/>
        <circle cx="{x+14}" cy="{head_y+1}" r="6" fill="#3B2416"/>
        """

    else:
        eyes = f"""
        <circle cx="{x-14}" cy="{head_y+1}" r="5" fill="#3B2416"/>
        <circle cx="{x+14}" cy="{head_y+1}" r="5" fill="#3B2416"/>
        """

    svg.append(eyes)

    # -----------------------------------------------------
    # Mouth
    # -----------------------------------------------------

    if mood == "happy":
        svg.append(f"""
        <path
            d="
                M {x-14} {head_y+20}
                Q {x} {head_y+35} {x+14} {head_y+20}
            "
            fill="none"
            stroke="#3B2416"
            stroke-width="5"
            stroke-linecap="round"
        />
        """)

    elif mood == "surprised":
        svg.append(f"""
        <ellipse
            cx="{x}"
            cy="{head_y+24}"
            rx="8"
            ry="11"
            fill="#3B2416"
        />
        """)

    else:
        svg.append(f"""
        <path
            d="M {x-9} {head_y+24} L {x+9} {head_y+24}"
            stroke="#3B2416"
            stroke-width="4"
            stroke-linecap="round"
        />
        """)

    # -----------------------------------------------------
    # Body
    # -----------------------------------------------------

    svg.append(f"""
    <path
        d="
            M {x-45} {body_top}
            Q {x} {body_top-30} {x+45} {body_top}
            L {x+54} {body_top+120}
            L {x-54} {body_top+120}
            Z
        "
        fill="{shirt}"
    />
    """)

        # -----------------------------------------------------
    # ARMS
    # -----------------------------------------------------

    if pose == "wave":

        # Left arm down
        svg.append(f"""
        <path
            d="
                M {x-42} {body_top+20}
                Q {x-75} {body_top+65} {x-65} {body_top+105}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x-65}"
            cy="{body_top+108}"
            r="10"
            fill="{skin}"
        />
        """)

        # Right arm raised
        svg.append(f"""
        <path
            d="
                M {x+42} {body_top+20}
                Q {x+80} {body_top-10} {x+72} {body_top-55}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x+72}"
            cy="{body_top-58}"
            r="11"
            fill="{skin}"
        />
        """)

    elif pose == "ask":

        svg.append(f"""
        <path
            d="
                M {x+42} {body_top+22}
                Q {x+78} {body_top+45} {x+112} {body_top+32}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x+116}"
            cy="{body_top+30}"
            r="10"
            fill="{skin}"
        />

        <path
            d="
                M {x-42} {body_top+22}
                Q {x-68} {body_top+65} {x-60} {body_top+102}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x-60}"
            cy="{body_top+105}"
            r="10"
            fill="{skin}"
        />
        """)

    elif pose == "happy":

        svg.append(f"""
        <path
            d="
                M {x-42} {body_top+20}
                Q {x-80} {body_top-5} {x-105} {body_top-35}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x-108}"
            cy="{body_top-38}"
            r="10"
            fill="{skin}"
        />

        <path
            d="
                M {x+42} {body_top+20}
                Q {x+80} {body_top-5} {x+105} {body_top-35}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />
        <circle
            cx="{x+108}"
            cy="{body_top-38}"
            r="10"
            fill="{skin}"
        />
        """)

    elif pose == "tired":

        # Hai tay buông xuống, vai thấp → cảm giác mệt
        svg.append(f"""
        <path
            d="
                M {x-42} {body_top+25}
                Q {x-62} {body_top+70} {x-52} {body_top+112}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <path
            d="
                M {x+42} {body_top+25}
                Q {x+62} {body_top+70} {x+52} {body_top+112}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x-52}"
            cy="{body_top+115}"
            r="10"
            fill="{skin}"
        />

        <circle
            cx="{x+52}"
            cy="{body_top+115}"
            r="10"
            fill="{skin}"
        />
        """)

    elif pose == "drink":

        # Tay phải đưa cốc lên miệng
        svg.append(f"""
        <path
            d="
                M {x+42} {body_top+25}
                Q {x+70} {body_top+45} {x+55} {body_top+5}
                Q {x+48} {body_top-8} {x+30} {body_top-18}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x+28}"
            cy="{body_top-20}"
            r="10"
            fill="{skin}"
        />

        <!-- Tay trái giữ thấp -->
        <path
            d="
                M {x-42} {body_top+25}
                Q {x-65} {body_top+65} {x-55} {body_top+105}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x-55}"
            cy="{body_top+108}"
            r="10"
            fill="{skin}"
        />

        <!-- Cốc gần miệng -->
        <rect
            x="{x+18}"
            y="{body_top-48}"
            width="22"
            height="34"
            rx="5"
            fill="#BFE8FF"
            stroke="#3B2416"
            stroke-width="3"
            transform="rotate(-18 {x+29} {body_top-31})"
        />
        """)

    elif pose == "read":

        # Hai tay đưa quyển sách lên trước người
        svg.append(f"""
        <path
            d="
                M {x-42} {body_top+25}
                Q {x-62} {body_top+55} {x-35} {body_top+72}
                Q {x-20} {body_top+82} {x-8} {body_top+75}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <path
            d="
                M {x+42} {body_top+25}
                Q {x+62} {body_top+55} {x+35} {body_top+72}
                Q {x+20} {body_top+82} {x+8} {body_top+75}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x-8}"
            cy="{body_top+76}"
            r="10"
            fill="{skin}"
        />

        <circle
            cx="{x+8}"
            cy="{body_top+76}"
            r="10"
            fill="{skin}"
        />
        """)

    else:

        # Neutral arms
        svg.append(f"""
        <path
            d="
                M {x-42} {body_top+20}
                Q {x-65} {body_top+65} {x-58} {body_top+105}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x-58}"
            cy="{body_top+108}"
            r="10"
            fill="{skin}"
        />

        <path
            d="
                M {x+42} {body_top+20}
                Q {x+65} {body_top+65} {x+58} {body_top+105}
            "
            fill="none"
            stroke="{skin}"
            stroke-width="18"
            stroke-linecap="round"
        />

        <circle
            cx="{x+58}"
            cy="{body_top+108}"
            r="10"
            fill="{skin}"
        />
        """)

    # -----------------------------------------------------
    # LEGS
    # -----------------------------------------------------

    svg.append(f"""
    <path
        d="
            M {x-20} {body_top+115}
            L {x-28} {body_top+178}
        "
        stroke="{pants}"
        stroke-width="17"
        stroke-linecap="round"
    />

    <path
        d="
            M {x+20} {body_top+115}
            L {x+28} {body_top+178}
        "
        stroke="{pants}"
        stroke-width="17"
        stroke-linecap="round"
    />

    <ellipse
        cx="{x-38}"
        cy="{body_top+183}"
        rx="22"
        ry="10"
        fill="#3B2416"
    />

    <ellipse
        cx="{x+38}"
        cy="{body_top+183}"
        rx="22"
        ry="10"
        fill="#3B2416"
    />
    """)

    return "\n".join(svg)


# =========================================================
# OBJECTS
# =========================================================

def cat(x, y):
    return f"""
    <g>
        <ellipse
            cx="{x}"
            cy="{y+55}"
            rx="65"
            ry="18"
            fill="#E8D5BF"
        />

        <ellipse
            cx="{x}"
            cy="{y}"
            rx="48"
            ry="43"
            fill="#A78B7A"
        />

        <path
            d="
                M {x-38} {y-25}
                L {x-52} {y-65}
                L {x-18} {y-42}
                Z
            "
            fill="#A78B7A"
        />

        <path
            d="
                M {x+38} {y-25}
                L {x+52} {y-65}
                L {x+18} {y-42}
                Z
            "
            fill="#A78B7A"
        />

        <circle cx="{x-16}" cy="{y-5}" r="5" fill="#3B2416"/>
        <circle cx="{x+16}" cy="{y-5}" r="5" fill="#3B2416"/>

        <path
            d="
                M {x-8} {y+15}
                Q {x} {y+23} {x+8} {y+15}
            "
            fill="none"
            stroke="#3B2416"
            stroke-width="4"
            stroke-linecap="round"
        />

        <path
            d="
                M {x-42} {y+15} L {x-68} {y+10}
                M {x-42} {y+22} L {x-68} {y+25}
                M {x+42} {y+15} L {x+68} {y+10}
                M {x+42} {y+22} L {x+68} {y+25}
            "
            stroke="#6B4F3B"
            stroke-width="3"
        />
    </g>
    """


def dog(x, y):
    return f"""
    <g>
        <ellipse
            cx="{x}"
            cy="{y+58}"
            rx="70"
            ry="18"
            fill="#E8D5BF"
        />

        <ellipse
            cx="{x}"
            cy="{y}"
            rx="50"
            ry="45"
            fill="#C58B5C"
        />

        <ellipse
            cx="{x-48}"
            cy="{y-2}"
            rx="18"
            ry="35"
            fill="#8B5E3C"
            transform="rotate(-15 {x-48} {y-2})"
        />

        <ellipse
            cx="{x+48}"
            cy="{y-2}"
            rx="18"
            ry="35"
            fill="#8B5E3C"
            transform="rotate(15 {x+48} {y-2})"
        />

        <circle cx="{x-16}" cy="{y-5}" r="5" fill="#3B2416"/>
        <circle cx="{x+16}" cy="{y-5}" r="5" fill="#3B2416"/>

        <ellipse
            cx="{x}"
            cy="{y+17}"
            rx="12"
            ry="9"
            fill="#3B2416"
        />
    </g>
    """


def apple(x, y):
    return f"""
    <g>
        <ellipse
            cx="{x}"
            cy="{y+70}"
            rx="72"
            ry="17"
            fill="#E8D5BF"
        />

        <path
            d="
                M {x} {y-8}
                C {x-55} {y-42} {x-72} {y+35} {x} {y+72}
                C {x+72} {y+35} {x+55} {y-42} {x} {y-8}
                Z
            "
            fill="#EF5350"
        />

        <path
            d="
                M {x} {y-10}
                Q {x+5} {y-45} {x+30} {y-55}
            "
            fill="none"
            stroke="#6B4226"
            stroke-width="9"
            stroke-linecap="round"
        />

        <ellipse
            cx="{x+38}"
            cy="{y-50}"
            rx="22"
            ry="10"
            fill="#6FBF73"
            transform="rotate(-20 {x+38} {y-50})"
        />
    </g>
    """


# =========================================================
# SCENE DETECTION
# =========================================================




# =========================================================
# SCENES
# =========================================================

def scene_greeting(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {bubble(text, 400, 55, 250)}

        {character(
            245,
            235,
            skin="#F3C7A5",
            hair="#5A3825",
            shirt="#62A5F5",
            pants="#4B5563",
            pose="wave",
            mood="happy",
        )}

        {character(
            555,
            235,
            skin="#D8A276",
            hair="#3D2A20",
            shirt="#39C99A",
            pants="#4B5563",
            pose="wave",
            mood="happy",
        )}
    </svg>
    """


def scene_ask(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            245,
            250,
            skin="#F3C7A5",
            hair="#5A3825",
            shirt="#62A5F5",
            pants="#4B5563",
            pose="ask",
            mood="happy",
        )}

        {character(
            555,
            250,
            skin="#D8A276",
            hair="#3D2A20",
            shirt="#39C99A",
            pants="#4B5563",
            pose="neutral",
            mood="happy",
        )}

        {bubble(text, 245, 55, 190)}

        <text
            x="555"
            y="130"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="62"
            font-weight="700"
            fill="#F59E0B"
        >
            ?
        </text>
    </svg>
    """


def scene_answer_happy(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            245,
            250,
            skin="#F3C7A5",
            hair="#5A3825",
            shirt="#62A5F5",
            pants="#4B5563",
            pose="neutral",
            mood="happy",
        )}

        {character(
            555,
            250,
            skin="#D8A276",
            hair="#3D2A20",
            shirt="#39C99A",
            pants="#4B5563",
            pose="happy",
            mood="happy",
        )}

        {bubble(text, 555, 55, 255)}

        <text
            x="555"
            y="155"
            text-anchor="middle"
            font-size="30"
        >
            ✨
        </text>

        <text
            x="600"
            y="185"
            text-anchor="middle"
            font-size="24"
        >
            ⭐
        </text>

        <text
            x="510"
            y="185"
            text-anchor="middle"
            font-size="24"
        >
            ⭐
        </text>
    </svg>
    """


def scene_cat(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {cat(400, 245)}

        <text
            x="400"
            y="390"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="32"
            font-weight="700"
            fill="#3B2416"
        >
            {esc(text)}
        </text>
    </svg>
    """


def scene_dog(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {dog(400, 245)}

        <text
            x="400"
            y="390"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="32"
            font-weight="700"
            fill="#3B2416"
        >
            {esc(text)}
        </text>
    </svg>
    """


def scene_apple(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {apple(400, 240)}

        <text
            x="400"
            y="395"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="32"
            font-weight="700"
            fill="#3B2416"
        >
            {esc(text)}
        </text>
    </svg>
    """


def scene_generic(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        <circle
            cx="400"
            cy="245"
            r="90"
            fill="#FDE68A"
        />

        <text
            x="400"
            y="278"
            text-anchor="middle"
            font-size="85"
        >
            🇫🇷
        </text>

        <text
            x="400"
            y="405"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="30"
            font-weight="700"
            fill="#3B2416"
        >
            {esc(text)}
        </text>
    </svg>
    """

def scene_tired(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            400,
            265,
            skin="#F3C7A5",
            hair="#5A3825",
            shirt="#62A5F5",
            pants="#4B5563",
            pose="tired",
            mood="tired",
        )}

        <text
            x="400"
            y="145"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="38"
            font-weight="700"
            fill="#6B7280"
        >
            Zzz...
        </text>

        {bubble(text, 400, 55, 300)}
    </svg>
    """


def scene_drink(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            400,
            265,
            skin="#F3C7A5",
            hair="#5A3825",
            shirt="#62A5F5",
            pants="#4B5563",
            pose="drink",
            mood="happy",
        )}

        <rect
            x="445"
            y="340"
            width="42"
            height="58"
            rx="8"
            fill="#BFE8FF"
            stroke="#3B2416"
            stroke-width="4"
        />

        <path
            d="M 450 350 L 482 350"
            stroke="white"
            stroke-width="4"
            stroke-linecap="round"
        />

        {bubble(text, 400, 55, 300)}
    </svg>
    """

def scene_tired(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            400,
            265,
            pose="tired",
            mood="tired",
        )}

        <text
            x="400"
            y="145"
            text-anchor="middle"
            font-family="Arial, sans-serif"
            font-size="38"
            font-weight="700"
            fill="#6B7280"
        >
            Zzz...
        </text>

        {bubble(text, 400, 55, 300)}
    </svg>
    """


def scene_drink(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            400,
            265,
            pose="drink",
            mood="happy",
        )}

        {bubble(text, 400, 55, 300)}
    </svg>
    """


def scene_read(text):
    return f"""
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {WIDTH} {HEIGHT}"
    >
        {background()}

        {character(
            400,
            265,
            pose="read",
            mood="happy",
        )}

        {bubble(text, 400, 55, 300)}
    </svg>
    """

# =========================================================
# GENERATE
# =========================================================

def generate(text):
    config = find_scene(text)
    scene = config.get("scene", "generic")

    if scene == "greeting":
        svg = scene_greeting(text)

    elif scene == "ask":
        svg = scene_ask(text)

    elif scene == "answer_happy":
        svg = scene_answer_happy(text)

    elif scene == "cat":
        svg = scene_cat(text)

    elif scene == "dog":
        svg = scene_dog(text)

    elif scene == "apple":
        svg = scene_apple(text)

    elif scene == "tired":
        svg = scene_tired(text)

    elif scene == "drink":
        svg = scene_drink(text)

    elif scene == "read":
        svg = scene_read(text)

    else:
        svg = scene_generic(text)

    filename = slugify(text) + ".svg"
    output = OUTPUT_DIR / filename

    output.write_text(svg.strip(), encoding="utf-8")

    print(f"Created: {output}")


# =========================================================
# CLI
# =========================================================

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print('Usage: python tools\\illu.py "Bonjour !"')
        sys.exit(1)

    text = " ".join(sys.argv[1:])
    generate(text)