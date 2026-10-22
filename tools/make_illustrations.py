from pathlib import Path
import math


OUT = Path(__file__).resolve().parents[1] / "assets" / "illustrations"
OUT.mkdir(parents=True, exist_ok=True)

PALETTES = [
    {"paper": "#efe4ca", "sky": "#d4ddc6", "hill": "#78916f", "deep": "#355b4a", "roof": "#7d4a3a", "wall": "#f5ecd7", "ink": "#34473c", "accent": "#c47a4f", "water": "#7caaa2"},
    {"paper": "#f0dfc2", "sky": "#e6cba8", "hill": "#b17c53", "deep": "#586d50", "roof": "#89453e", "wall": "#f6ebd5", "ink": "#493f32", "accent": "#d4a455", "water": "#749b9a"},
    {"paper": "#ece5cf", "sky": "#c7d8d0", "hill": "#91a18a", "deep": "#456b62", "roof": "#a14f3c", "wall": "#f7f0df", "ink": "#3b4d48", "accent": "#d59a5b", "water": "#7da8aa"},
    {"paper": "#eadcc5", "sky": "#e7c79b", "hill": "#9f8055", "deep": "#536849", "roof": "#8c4835", "wall": "#f7ead2", "ink": "#493d31", "accent": "#c76a4b", "water": "#73989a"},
    {"paper": "#e7e1c9", "sky": "#d0d9c6", "hill": "#a6a776", "deep": "#526b48", "roof": "#754e3f", "wall": "#f7eed9", "ink": "#3b4937", "accent": "#ce8750", "water": "#79aaa1"},
]

NAMES = [
    ["榆树下的约定", "溪口石桥", "一盏煤油灯", "老邮局的木窗", "晒谷场边的戏台", "挑水的清晨", "巷口的青石阶", "屋檐下的燕窝", "村口那棵香樟", "远行前的一碗面"],
    ["第一场春雨", "插秧时节", "田埂上的稻香", "秋收的金色午后", "灌溉渠里的月光", "竹篱笆边的菜畦", "谷仓里的回声", "山坡茶园", "冬藏萝卜", "秧苗长高了"],
    ["竹篾里的春天", "奶奶的蓝布染缸", "一把老木刨", "新窑开火", "草编蚱蜢", "补锅人的担子", "窗花上的花鸟", "村里的木匠房", "陶罐上的指纹", "一台老织机"],
    ["正月里的舞龙队", "端午香囊", "秋社开席", "庙会上的糖画", "中秋望月", "灯笼亮起来", "社戏开锣", "山歌对唱", "晒秋的院落", "新米节"],
    ["灶膛里的年味", "一碗手擀面", "竹蒸笼的白气", "灶台边的腌菜坛", "赶集买来的糖糕", "石磨豆浆", "田头的茶水", "灶房里的柴火", "桂花米酒", "一桌团圆饭"],
]


def house(x, y, s, p, door=True, seed=0):
    w, h = 96 * s, 66 * s
    roof_y = y - 18 * s
    roof = f"M{x-7*s:.1f},{roof_y:.1f} Q{x+w*.48:.1f},{y-55*s:.1f} {x+w+9*s:.1f},{roof_y:.1f} L{x+w+3*s:.1f},{y-9*s:.1f} Q{x+w*.51:.1f},{y-28*s:.1f} {x-4*s:.1f},{y-8*s:.1f} Z"
    door_x = x + (w * (.66 if seed % 2 else .23))
    return f'''<g stroke="{p['ink']}" stroke-width="1.7" stroke-linejoin="round">
      <rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="2" fill="{p['wall']}"/>
      <path d="{roof}" fill="{p['roof']}"/>
      <path d="M{x+5*s:.1f},{y-8*s:.1f} Q{x+w*.5:.1f},{y-26*s:.1f} {x+w-5*s:.1f},{y-8*s:.1f}" fill="none" opacity=".72"/>
      <rect x="{x+15*s:.1f}" y="{y+9*s:.1f}" width="18*s" height="18*s" fill="{p['sky']}"/>
      <path d="M{x+24*s:.1f},{y+9*s:.1f} V{y+27*s:.1f} M{x+15*s:.1f},{y+18*s:.1f} H{x+33*s:.1f}" fill="none"/>
      <rect x="{door_x:.1f}" y="{y+29*s:.1f}" width="20*s" height="{(h-29*s):.1f}" fill="{p['accent'] if door else p['wall']}"/>
      <circle cx="{door_x+15*s:.1f}" cy="{y+48*s:.1f}" r="1.4" fill="{p['ink']}" stroke="none"/>
      <path d="M{x-8*s:.1f},{y+h:.1f} H{x+w+13*s:.1f}" stroke-width="3"/>
    </g>'''


def tree(x, y, s, p, seed=0):
    leaf = [p["deep"], p["hill"], p["water"], "#809164"][seed % 4]
    return f'''<g stroke="{p['ink']}" stroke-width="1.5" stroke-linejoin="round">
      <path d="M{x:.1f},{y:.1f} Q{x-6*s:.1f},{y-42*s:.1f} {x+2*s:.1f},{y-73*s:.1f} M{x:.1f},{y-33*s:.1f} Q{x-20*s:.1f},{y-48*s:.1f} {x-24*s:.1f},{y-61*s:.1f} M{x:.1f},{y-38*s:.1f} Q{x+24*s:.1f},{y-51*s:.1f} {x+30*s:.1f},{y-66*s:.1f}" fill="none" stroke-width="4"/>
      <circle cx="{x-18*s:.1f}" cy="{y-65*s:.1f}" r="19*s" fill="{leaf}"/><circle cx="{x+4*s:.1f}" cy="{y-79*s:.1f}" r="22*s" fill="{leaf}"/><circle cx="{x+29*s:.1f}" cy="{y-62*s:.1f}" r="18*s" fill="{leaf}"/>
      <circle cx="{x-12*s:.1f}" cy="{y-68*s:.1f}" r="3" fill="{p['accent']}" stroke="none"/><circle cx="{x+19*s:.1f}" cy="{y-77*s:.1f}" r="2.5" fill="{p['paper']}" stroke="none"/>
    </g>'''


def person(x, y, s, p, seed=0):
    coat = p["accent"] if seed % 2 else p["roof"]
    return f'''<g stroke="{p['ink']}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="{x:.1f}" cy="{y-34*s:.1f}" r="7*s" fill="#dbb98e"/>
      <path d="M{x-9*s:.1f},{y-25*s:.1f} Q{x:.1f},{y-31*s:.1f} {x+9*s:.1f},{y-25*s:.1f} L{x+13*s:.1f},{y+1*s:.1f} L{x-11*s:.1f},{y+1*s:.1f} Z" fill="{coat}"/>
      <path d="M{x-6*s:.1f},{y+1*s:.1f} L{x-10*s:.1f},{y+18*s:.1f} M{x+7*s:.1f},{y+1*s:.1f} L{x+12*s:.1f},{y+18*s:.1f} M{x-8*s:.1f},{y-17*s:.1f} L{x-19*s:.1f},{y-4*s:.1f} M{x+7*s:.1f},{y-17*s:.1f} L{x+18*s:.1f},{y-8*s:.1f}" fill="none" stroke-width="3"/>
      <path d="M{x-10*s:.1f},{y-27*s:.1f} Q{x:.1f},{y-43*s:.1f} {x+13*s:.1f},{y-27*s:.1f} Z" fill="{p['accent']}"/>
    </g>'''


def scene(index):
    group = (index - 1) // 10
    v = (index - 1) % 10
    p = PALETTES[(group + v // 3) % len(PALETTES)]
    shift = (v * 29) % 86
    sun_x = 58 + (v * 37) % 275
    sun_y = 47 + (v * 9) % 38
    elems = [f'<rect width="400" height="260" fill="{p["paper"]}"/>',
             f'<path d="M0 0H400V124 Q329 100 272 128 Q201 84 132 119 Q65 88 0 126Z" fill="{p["sky"]}"/>',
             f'<circle cx="{sun_x}" cy="{sun_y}" r="{22 + v % 4 * 3}" fill="{p["accent"]}" opacity=".9"/>',
             f'<path d="M0 150 Q54 {97+v%3*8} 112 140 T242 128 T400 137V260H0Z" fill="{p["hill"]}"/>',
             f'<path d="M0 179 Q78 132 154 165 T294 160 T400 150V260H0Z" fill="{p["deep"]}" opacity=".83"/>',
             f'<path d="M0 224 Q98 199 171 222 T315 215 T400 218" fill="none" stroke="{p["paper"]}" stroke-width="2" opacity=".55"/>']
    if group == 0:
        elems += [house(144-shift*.2, 141, .92, p, seed=v), house(242-shift*.12, 159, .72, p, seed=v+1), tree(101+shift*.18, 198, .85, p, seed=v)]
        elems += [f'<path d="M0 218 Q92 {193+v%4*5} 177 222 T400 212" fill="none" stroke="{p["water"]}" stroke-width="8" opacity=".9"/>',
                  f'<path d="M{70+shift%90} 242 Q120 199 165 212 Q200 225 221 260" fill="none" stroke="{p["paper"]}" stroke-width="5"/>']
        for x in range(18 + v % 3 * 8, 390, 44):
            elems.append(tree(x, 219 + (x // 44 % 2) * 8, .34 + (x // 44 % 3) * .04, p, seed=x+v))
    elif group == 1:
        for row in range(5):
            y = 143 + row * 22
            elems.append(f'<path d="M{-30+shift%38} {y} Q100 {y-34+v%5*3} 220 {y+3} T440 {y-4}" fill="none" stroke="{p["paper"]}" stroke-width="{3+row%2}" opacity=".8"/>')
            for x in range(36 + (row % 2) * 26, 390, 57):
                elems.append(f'<path d="M{x} {y+8} q-8 -13 -12 -19 m13 20 q3 -16 10 -22 m-10 22 q-3 -11 -1 -17" fill="none" stroke="{p["accent"] if row%2 else p["paper"]}" stroke-width="2" stroke-linecap="round"/>')
        elems += [person(202 + shift*.45, 204, .9, p, seed=v),
                  f'<path d="M0 241 Q78 216 149 239 T300 235 T400 240" fill="none" stroke="{p["water"]}" stroke-width="10"/>']
    elif group == 2:
        elems += [house(35, 168, .55, p, seed=v),
                  f'<path d="M68 217 H360 V229 H68Z" fill="{p["roof"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                  f'<path d="M80 220 V237 M345 220 V237" stroke="{p["ink"]}" stroke-width="4"/>',
                  f'<path d="M{159+shift*.25} 176 q-14 20 0 31 q18 8 30 -6 q8 -15 -4 -27 l-3 -12 h-20Z" fill="{p["accent"]}" stroke="{p["ink"]}" stroke-width="2"/>',
                  f'<ellipse cx="{174+shift*.25}" cy="177" rx="12" ry="4" fill="{p["paper"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                  f'<path d="M248 164 V216 M264 164 V216 M280 164 V216 M296 164 V216 M246 170 H299 M246 183 H299 M246 197 H299 M246 210 H299" stroke="{p["paper"]}" stroke-width="2" opacity=".8"/>',
                  f'<path d="M236 158 H308 L300 165 H242Z" fill="{p["roof"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                  f'<circle cx="{105+shift*.22}" cy="193" r="13" fill="{p["water"]}" stroke="{p["ink"]}" stroke-width="1.5"/><path d="M99 194 Q105 184 112 194 Q106 204 99 194Z" fill="{p["paper"]}"/>',
                  person(330, 211, .64, p, seed=v+1)]
    elif group == 3:
        elems += [f'<path d="M25 115 Q190 {91+v%3*4} 376 113" fill="none" stroke="{p["ink"]}" stroke-width="2"/>']
        for j in range(5):
            x = 48 + j*72 + (v % 3)*6
            y = 114 + (j%2)*8
            elems += [f'<path d="M{x} {y} v29 q14 16 28 0 v-29" fill="{p["accent"] if j%2==0 else p["roof"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                      f'<path d="M{x+14} {y+30} v12" stroke="{p["ink"]}" stroke-width="2"/>']
        elems += [house(136, 160, .95, p, seed=v),
                  f'<path d="M0 222 Q76 205 140 224 T278 220 T400 223" fill="none" stroke="{p["water"]}" stroke-width="9"/>',
                  f'<circle cx="87" cy="187" r="16" fill="{p["deep"]}" stroke="{p["ink"]}"/><circle cx="87" cy="187" r="6" fill="{p["accent"]}"/>',
                  f'<circle cx="344" cy="180" r="16" fill="{p["deep"]}" stroke="{p["ink"]}"/><path d="M344 164 V196 M328 180 H360 M333 169 L355 191 M355 169 L333 191" stroke="{p["paper"]}" stroke-width="2"/>']
    else:
        elems += [f'<path d="M54 159 Q202 {133+v%4*4} 350 160 L331 223 Q206 246 73 222Z" fill="{p["roof"]}" stroke="{p["ink"]}" stroke-width="2"/>',
                  f'<path d="M{80+shift*.18} 177 Q210 156 324 177 L313 216 Q203 232 91 216Z" fill="{p["paper"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                  f'<ellipse cx="{128+shift*.22}" cy="192" rx="32" ry="17" fill="{p["water"]}" stroke="{p["ink"]}" stroke-width="2"/>',
                  f'<ellipse cx="{128+shift*.22}" cy="190" rx="24" ry="10" fill="{p["paper"]}" stroke="{p["ink"]}" stroke-width="1.2"/>',
                  f'<path d="M{117+shift*.22} 191 q8 -12 16 0 q-8 12 -16 0 M{124+shift*.22} 185 v13" fill="{p["accent"]}" stroke="{p["ink"]}" stroke-width="1"/>',
                  f'<ellipse cx="{216+shift*.2}" cy="190" rx="27" ry="17" fill="{p["accent"]}" stroke="{p["ink"]}" stroke-width="2"/><ellipse cx="{216+shift*.2}" cy="188" rx="19" ry="10" fill="{p["paper"]}"/>',
                  f'<path d="M{210+shift*.2} 185 q6 -8 12 0 m-12 7 q6 -8 12 0" fill="none" stroke="{p["deep"]}" stroke-width="2"/>',
                  f'<path d="M{275+shift*.12} 196 q-10 -16 0 -29 q12 14 5 30 q16 -6 19 -20 q12 19 -7 31" fill="{p["deep"]}" stroke="{p["ink"]}" stroke-width="1.5"/>',
                  f'<path d="M{142+shift*.18} 123 q-7 -12 0 -18 q8 8 1 16 M{154+shift*.18} 126 q-7 -12 0 -18 q8 8 1 16" fill="none" stroke="{p["paper"]}" stroke-width="3" stroke-linecap="round"/>']
    # Small print-like ornaments make each illustration feel composed rather than icon-like.
    for j in range(4):
        x = 22 + ((v * 31 + j * 83) % 350)
        y = 32 + ((v * 17 + j * 47) % 63)
        elems.append(f'<path d="M{x-5} {y} q5 -5 10 0 q-5 5 -10 0 M{x} {y-5} v10" fill="none" stroke="{p["ink"]}" stroke-width="1" opacity=".42"/>')
    return "\n".join(elems)


for number in range(1, 51):
    group = (number - 1) // 10
    title = NAMES[group][(number - 1) % 10]
    art = scene(number)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 260" role="img" aria-label="{title}">
<rect x="5" y="5" width="390" height="250" rx="4" fill="none" stroke="#3f5145" stroke-width="1.3" opacity=".35"/>
{art}
<path d="M10 244 Q74 239 126 244 T242 244 T390 241" fill="none" stroke="#3f5145" stroke-width="1" opacity=".32"/>
</svg>'''
    (OUT / f"scene-{number:02}.svg").write_text(svg, encoding="utf-8")

print(f"Generated 50 original village-scene illustrations in {OUT}")
