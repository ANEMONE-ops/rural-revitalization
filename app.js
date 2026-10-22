"use strict";

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const root = $("#app");
const categories = ["村落与建筑", "乡土技艺", "岁时节庆", "田野生计", "乡音与滋味"];
const sheetNames = ["village", "craft", "festival", "field", "food"];
const categorySheets = ["village", "craft", "festival", "field", "food"];
const cities = [
  {name:"太原", lon:112.549, lat:37.871, tag:"晋阳文脉", intro:"从晋祠水脉、古村院落到城郊田野，串起省会周边的乡土记忆。"},
  {name:"大同", lon:113.300, lat:40.076, tag:"塞上古都", intro:"以长城边塞、黄土村落与北方院落为线索，采录晋北生活史。"},
  {name:"阳泉", lon:113.580, lat:37.857, tag:"太行山居", intro:"沿太行山的村道与沟谷，记录山地生计、古堡聚落与邻里互助。"},
  {name:"长治", lon:113.117, lat:36.195, tag:"上党古韵", intro:"从上党古村、手艺与节俗切入，呈现太行山南段的乡土生活。"},
  {name:"晋城", lon:112.851, lat:35.491, tag:"古堡人家", intro:"把古堡、院落、窑洞与村庄日常放在同一张记忆地图里。"},
  {name:"朔州", lon:112.433, lat:39.331, tag:"雁门北望", intro:"从边塞村落和农牧交错地带出发，发现晋北家庭与土地的故事。"},
  {name:"晋中", lon:112.739, lat:37.688, tag:"晋商故里", intro:"院落、商路、票号与寻常人家，共同组成晋中村镇的文化纹理。"},
  {name:"运城", lon:111.008, lat:35.023, tag:"河东沃土", intro:"在黄河与盐池之间，寻找农事节律、古建聚落和河东家常味。"},
  {name:"忻州", lon:112.734, lat:38.417, tag:"长城云中", intro:"串联古村、边墙、山地与台地，记录晋北乡村的迁徙与守望。"},
  {name:"临汾", lon:111.519, lat:36.088, tag:"汾水乡音", intro:"沿汾河谷地和吕梁山麓，采集古村记忆、乡音与农家故事。"},
  {name:"吕梁", lon:111.142, lat:37.519, tag:"黄河吕梁", intro:"走进黄土沟壑间的村庄，记录窑洞营造、山地劳作和手艺传承。"},
];

const storySeeds = [
  [
    ["黄土坡上的窑洞","窑洞顺着坡势安放，厚厚的土墙把冬日的暖意留在屋里。","吕梁","空间记忆"],
    ["院门上的旧门环","一枚门环经过许多双手，开合之间连接着家与街巷。","晋中","家屋记忆"],
    ["石墙转角的巷子","石墙顺着山形转弯，巷子把邻居的门前串成一条熟路。","阳泉","村落记忆"],
    ["一方四合院","院落里的天光、影壁与正房，组成北方人熟悉的生活尺度。","晋中","家屋记忆"],
    ["古堡墙上的风","高墙曾守望村庄，如今也记录着人们如何顺着山势建家。","晋城","聚落记忆"],
    ["村口的老槐树","树荫下的石凳，是赶路人停脚、乡邻碰面的地方。","临汾","公共空间"],
    ["屋檐下的木梁","木梁撑起屋顶，也留下匠人量木、搭架和修缮的手艺。","运城","营造记忆"],
    ["村路尽头的戏台","台口朝向空场，村里的节日与寻常夜晚都可能在这里相遇。","长治","公共空间"],
    ["山腰上的石碾","石碾旁的空地曾是劳作间隙的歇脚处，留着谷物的气息。","大同","生产空间"],
    ["一座老院的新生","旧院修缮后，新的生活继续发生在熟悉的梁柱与院墙之间。","太原","当代乡村"],
  ],
  [
    ["推光漆器的光","层层髹涂与细细打磨，让器物在光线里显出温润的色泽。","晋中","漆艺"],
    ["剪纸窗上的花鸟","剪刀沿着纸面行走，花鸟和吉祥纹样在窗前迎来四季。","大同","剪纸"],
    ["澄泥砚的一方泥","从取泥、炼泥到成砚，材料与火候共同决定手感和纹理。","运城","制砚"],
    ["一张晋绣的针脚","不同针法把花草、衣饰与祝愿缝进一方布面。","太原","刺绣"],
    ["木版年画的套色","刻版、上色、覆纸，一张年画在重复的手势中渐渐显形。","临汾","年画"],
    ["上党堆锦的层次","布片被剪裁、拼合、堆叠，平面图样因此有了起伏。","长治","堆锦"],
    ["绛州木版上的年味","一块块木版留下图案，也留下当地印制年画的工序线索。","运城","木版印刷"],
    ["老木匠的墨线","墨斗弹出的直线，把尺寸、结构和一双熟练的手连在一起。","晋城","木作"],
    ["竹篾编成的提篮","篾条一挑一压，篮子的骨架就在手指间慢慢站稳。","忻州","编织"],
    ["一只窑火烧出的陶罐","揉泥、拉坯、晾坯与烧制，日用器里藏着材料的脾气。","朔州","陶作"],
  ],
  [
    ["社火锣鼓响起来","锣鼓、队伍和街巷构成节日的动线，参与者也记得各自的位置。","长治","社火"],
    ["正月里的一盏灯","灯笼从院门挂到街口，夜色里多了一条回家的路。","晋中","年节"],
    ["村戏开场以前","开锣之前，后台的准备、台下的等待同样值得记下来。","临汾","戏曲"],
    ["赶会日的长街","集市随着节令聚拢，买卖声里也有村庄之间的往来。","运城","庙会"],
    ["一场婚礼的老礼数","迎亲、待客和家族分工记录着礼俗，也折射出时代的变化。","吕梁","人生礼俗"],
    ["端午门前的艾草","门边的草叶带着清香，节日习惯由家人一代代讲给孩子听。","晋城","节令"],
    ["秋收后的庆丰年","忙完收成后，人们用一顿饭、一场戏或一句祝福记下这一季。","大同","农事节庆"],
    ["庙会摊上的糖画","热糖浆在小勺间成形，摊位也成为孩子们记忆里的坐标。","太原","集市"],
    ["社戏台前的板凳","一排长凳从午后坐到夜里，观众的掌声补全了戏台的故事。","忻州","戏曲"],
    ["一张全村的合影","节庆合影把分散的人重新聚到一起，也为以后留下辨认线索。","阳泉","共同记忆"],
  ],
  [
    ["汾河岸边的麦收","从看天色到收麦打场，农事经验与河谷气候一起写进日历。","临汾","麦作"],
    ["山地梯田的水路","坡地上的田块依势排列，引水、蓄水和轮作需要彼此配合。","吕梁","山地农业"],
    ["一季小米的生长","从播种到收获，谷物的颜色变化标记着一家人的农忙时序。","忻州","杂粮"],
    ["杏花开时的果园","花期、坐果与采收连接着果农的观察，也吸引着返乡的脚步。","大同","果业"],
    ["老渠里的分水记忆","渠口、闸门和田界串起灌溉故事，分水次序需要实地走访核对。","运城","水利"],
    ["院里的粮囤","收成归仓之后，储粮器具和保管办法成为家庭生活的一部分。","朔州","储粮"],
    ["从土豆地到餐桌","种植、储藏和加工组成一条日常链条，土地与市场彼此牵连。","晋中","产业"],
    ["坡地上的核桃树","树下的除草、修枝和采打，让一年四季都有了具体的劳作节奏。","阳泉","林果"],
    ["冬闲时的农具修补","农闲时修整农具，为下一季做准备，手艺也在邻里间流动。","晋城","农具"],
    ["返乡青年和新田地","新的经营方式把网络、订单和老经验带回村庄，改变也需要慢慢记录。","太原","返乡创业"],
  ],
  [
    ["一碗刀削面的手势","刀、面团与灶火组成一组动作，师傅的手腕有自己的节奏。","太原","面食"],
    ["老陈醋的晒缸","缸、曲、日晒与时间共同参与酿造，风味来自长期的照看。","晋中","酿造"],
    ["灶火边的过油肉","备料、滑炒和调味让一道家常菜成为餐桌记忆，也有不同家庭做法。","临汾","家常菜"],
    ["黄米蒸糕的香气","谷物磨粉、和面、上笼，节令点心连着家庭的饮食习惯。","大同","节令食品"],
    ["赶集带回一包麻花","集日、摊位和纸包里的小吃，把乡村消费与邻里往来连起来。","长治","集市味道"],
    ["一桌晋南家常菜","蔬菜、面食与时令食材摆上桌，菜单也是理解地方生活的入口。","运城","饮食记忆"],
    ["荞面碗托的凉意","杂粮磨浆、蒸制、切配，夏日小吃有着清楚的制作步骤。","吕梁","地方小吃"],
    ["冬日里的羊汤锅","热汤端上桌，寒冷时节的饮食经验从一口热气讲起。","朔州","冬日饮食"],
    ["年夜饭桌上的面食","每家都有熟悉的主食和做法，团圆饭把不同年代的人聚到一起。","忻州","年俗饮食"],
    ["山楂树下的酸甜","果子从枝头到晾晒、熬煮，家里的保存办法让季节延长。","阳泉","果品加工"],
  ],
];

const stories = storySeeds.flatMap((group, ci) => group.map((row, ix) => {
  const id = ci * 10 + ix + 1;
  return {id, title:row[0], summary:row[1], city:row[2], category:categories[ci], tag:row[3], year:1956 + ((id * 11 + ci * 5) % 68), sheet:categorySheets[ci], tile:ix, location:""+row[2]+"市 · 采录点待核实", read:4 + (id % 6)};
}));

const narrativeByCategory = [
  [
    "把脚步放慢，先看屋子的朝向、院门开合和地面高低，再听空间如何安排起居、劳作与往来。窑洞、院落、石巷或戏台都不是孤立的景观，它们依着地势和人的需要形成。细节越具体，地图上的地点就越容易被辨认。",
    "一座房子经历修补、添建和用途变化。梁柱留下的痕迹、墙面的颜色、院里新旧并置的物件，都提示着居住方式怎样改变。讲述时不急着给建筑下结论，可以先标出谁使用、何时使用、哪些变化还能由照片或档案互相印证。",
    "公共空间的意义不止在外形。树荫、井台、戏台和巷口会因为相遇而有了故事。谁常在这里停留，哪些日子最热闹，哪条路径连接邻家与田地——这些简单的问题能把空间重新放回村庄的生活网络。",
    "当下的修缮与新用法也是村史的一部分。若旧屋被改作展室、民宿或活动空间，应把居民的使用感受一并记下；如果没有继续使用，也要尊重当事人对空间的解释，不让外部想象取代真实经验。"
  ],
  [
    "一件手艺从材料开始。木、泥、纸、布和漆各有脾性，采录可以先拍材料与工具，再请制作者按自己的节奏示范。镜头留出手部动作和工序之间的等待，往往比只拍成品更能说明技艺如何发生。",
    "手艺人的判断常藏在很小的动作里：什么时候停手，怎样辨别软硬、干湿或火候。把步骤拆开记录，再请讲述者校对名称和方言说法，能让后来学习的人看懂，也避免把复杂经验压缩成一句宣传语。",
    "技艺在家庭、作坊和市场之间流动。师徒关系、工具来历、订单变化和材料来源都是值得追问的线索。记录者需要分清哪些内容可以公开，哪些属于个人经验或商业信息，并由讲述者决定是否展示。",
    "今天的传承可能有新的学习者、新的材料和新的用途。展示时既可以讲传统工序，也可以呈现当代尝试；核心是让制作者参与决定故事的表达方式，并为图样、作品和影像标清作者与使用范围。"
  ],
  [
    "节日从准备时就开始了。采购、排练、张灯、借桌椅和分工协作，构成一条有时间次序的路线。把日历、现场声音和参与者的讲述放在一起，可以呈现节庆如何把分散的日常重新聚拢。",
    "同一个习俗在不同家庭里可能并不相同。有人记得队伍路线，有人熟悉一段唱腔，也有人负责做饭或照看孩子。多留几个视角，允许讲述之间存在差异，故事才不会被整理成只有一种答案的说明书。",
    "节庆空间既包括台上，也包括台下。场地怎样布置，观众从哪里进入，年轻人负责什么，老人如何判断仪式是否完整，都是理解变化的重要线索。拍摄前应取得参与者同意，尤其注意儿童、肖像和宗教活动的边界。",
    "当一项活动暂停、转移或换了形式，变化本身也值得保存。记录旧照片的来源、活动的具体年份和讲述者的记忆范围，必要时把传闻与可核对事实分开标注，为后续补充留下位置。"
  ],
  [
    "田野故事可以从一段具体的劳作开始：什么时候出门、工具放在哪里、谁和谁搭伴、天气怎样影响计划。用一张田块图和一段口述相互对照，能够帮助读者理解生产经验怎样依赖地形与季节。",
    "水、土壤、种子和农具构成生产的基础。记录者可以沿着田埂走访，标出水渠、坡地、果园或储粮地点，再请当地人校正地名和使用方式。未经确认的产量和年代不宜写成确定事实。",
    "农业并不只发生在田里。家庭分工、集市交易、储存加工和邻里互助也影响一季收成。通过不同年龄和角色的讲述，可以看见技术更新、劳动力变化与市场连接如何进入日常。",
    "乡村产业的新变化要与村民实际感受放在一起。网络销售、合作经营或返乡项目是否稳定，谁受益、谁承担成本，都需要多方核实。展示既要看见机会，也不应把复杂现实简化成单一的成功故事。"
  ],
  [
    "味道常常先于解释出现。先记下食材从哪里来、工具如何摆放、火候由谁看守，再听讲述者说出这道食物在什么日子端上桌。一个家庭的做法不必代表所有人，差异正是地方饮食记忆的一部分。",
    "制作过程可以拆成清楚的步骤：备料、加工、烹制、保存与分享。拍摄时把关键手势和器具一并留下，配上讲述者认可的名称。若配方涉及家庭秘方，应允许其不公开或只保存文字摘要。",
    "集市和饭桌连接着更大的地方网络。摊位从哪里进货，谁会在集日相遇，哪种食物适合带给亲友，这些细节能让读者从一口味道看到村庄间的往来。",
    "饮食也在变化。新食材、新灶具与外出生活带来的习惯都可能进入厨房。请讲述者指出哪些是个人记忆、哪些是自己亲历的变化，再把时间、地点和可公开范围一并记录，避免把推测写成传统。"
  ],
];
const storyScripts = {
  1:[
    "太阳从山脊升起来时，坡面先亮出一层薄薄的金色。窑洞门前的小路沿着地势轻轻转弯，墙脚放着一只旧箩筐。镜头不急着进入屋里，而是先从这条熟悉的路开始：谁每天从这里出门，去田里还是去邻家，季节变化时脚下又多了哪些声音？",
    "走进门洞以后，厚土墙、窗格和炕沿把空间分出不同用途。可以请熟悉这种居住方式的人指认灶、储物处与过冬的安排，再把房间的本地叫法标在平面图上。哪一处最能代表这个家庭的日常，应由讲述者自己选。",
    "窑洞并不是抽象的建筑符号，它和地形、材料、家庭结构以及修缮经验有关。若有人记得后来加建、搬迁或改作他用的经过，可以把每次变化写成时间节点；无法确认的年代先保留模糊说法，不替讲述者补全。"
  ],
  2:[
    "门环表面被摸得发亮，周围的木纹却已经褪成深色。敲门声在院墙间回响，院里的人凭声音辨认来客。作为一段记忆的开头，这件小物件让家门从一张照片变成真实的生活边界。",
    "采访时可以从使用动作问起：谁来开门，门环什么时候更换过，旧门板后来去了哪里？若家中还有旧物照片，可以先由家人标出大概年代，再请熟悉老院的人共同核对。门环的材料和形状也应以现场观察为准。",
    "故事不只属于房屋主人。邻居、送货人、远行归来的人，可能都记得同一扇门的不同一面。把这些视角并列呈现，能讲清楚巷子怎样把家庭与村庄公共生活连接起来。"
  ],
  3:[
    "石巷的宽窄随着墙体起伏变化，转弯处会突然看见一片天空。雨后，石缝颜色变深，脚步也自然慢下来。故事可以邀请讲述者带路，一边行走一边指出哪些门是旧址、哪里曾经通向水井或场院。",
    "村路常有自己的称呼，不一定出现在地图上。记录时可同时保留本地名字、普通话写法和讲述者解释；如果同一条巷子有几种叫法，分别注明使用的人群和场合，而不是删去差异。",
    "把巷道转角、坡度、石阶和排水口画进路线后，远方读者才能理解人们如何搬运粮食、照看孩子或在雨雪天往来。空间图只是辅助，真正的路线仍要由当地人领走并校正。"
  ],
  6:[
    "树冠把村口的光线切成一块块斑驳影子。有人经过时会在树下停一会儿，有人把它当作等候和辨路的参照。故事从树下的一个位置展开，记录谁常来、停留多久、周围的景物曾有哪些变化。",
    "树龄、栽种年代和树种都需要核实，不能只凭一段传说给出确定数字。可以请村民讲述他们亲历的树荫变化，也可以查找林木登记、老照片或地方志，明确每条信息的来源。",
    "当村口道路拓宽、房屋增建或树木接受养护时，树与人的关系可能随之改变。把今天的使用情况一并留下，故事就不是怀旧的静止画面，而是持续变化的公共空间档案。"
  ],
  8:[
    "一座戏台从正面看见梁架和台口，转到后台又会遇见放置道具的角落。台上与台下共同组成演出的空间。采录者可以沿着观众入场的方向走一遍，再请演出参与者指出自己熟悉的位置。",
    "某段唱词、某出戏或某次演出的具体时间，都需要由参与者确认。录音时注明剧目、演出场合、表演者同意范围和音频保存方式；若无法确认唱腔来源，只做描述，不擅自命名。",
    "如今戏台是否仍在使用、活动由谁组织、年轻人如何参与，这些问题能让档案连接现在与过去。即使演出已经暂停，舞台的维修记录、照片和当事人记忆也能构成可追溯的资料链。"
  ],
  11:[
    "黑红漆面映出窗格的轮廓，手掌拂过时能感到细密的光泽。情境镜头跟着一件器物走，从木胎、髹涂到打磨逐步展开；具体工序名称请以制作者自己的说法为准。",
    "请制作者挑选一件愿意讲述的作品，说明工具、材料、等待时间和最难掌握的动作。镜头保留手部细节与工作台环境，配上经过确认的文字说明，避免只展示成品却看不见技艺过程。",
    "传统技艺的当代生活也应被记录：学徒如何入门、材料如何取得、作品怎样进入日常或市场。涉及商业配方、未公开设计或个人隐私的内容，讲述者可以选择不拍摄、不存档或仅作内部资料。"
  ],
  12:[
    "一张红纸在桌面上铺开，剪刀从边缘开始转出弧线。创作样稿用近景记录纸屑、手势和窗格上的透光效果，邀请制作者解释图样名称以及哪些细节属于个人创新。",
    "同一种纹样可能有不同叫法，也可能因家庭和师承而变化。记录者应把讲述者提供的名称、读音和寓意分别记下，并说明这些解释来自谁，不把一个人的说法误写成全村统一习俗。",
    "作品是否可以公开展示、是否允许下载或改作，需要逐项约定。若图样属于个人原创，展示页应清楚标注作者与授权范围，让数字传播为手艺带来新的观看者，也尊重创作者的决定权。"
  ],
  21:[
    "锣鼓声把街道变成临时的表演路线。队伍从哪里集合、在哪些地方停留、观众通常站在哪里，可以用路线图和现场声音共同记录。画面中的场景仅用于说明采录方法，不对应某一次真实活动。",
    "不同队伍、不同年份的表演安排可能并不相同。请参与者分别说明自己负责的角色、路线记忆和道具来源，再将口述和活动通知、照片或节目单对照，标出仍待确认的细节。",
    "节庆现场需要提前取得拍摄许可，尤其要尊重儿童与观众肖像、表演者的音乐版权和宗教空间规定。公开页面可只展示经过确认的短片段，并保留撤回或更正的联系途径。"
  ],
  24:[
    "赶会日的摊位一早就铺开，街边的食物、农具和日用品各有一块位置。故事镜头从一段集市路线走起，记录人们如何相约、交易和带着物件回家，而不急于把热闹写成固定风俗。",
    "集市具体日期、举办地点与周期应向当地管理者和摊主核实。摊位的老照片、账本或商品包装都可能提供线索，但需要确认来源和拍摄许可后再放入数字档案。",
    "市场也在回应新的生活方式。过去常见的摊位是否变化，年轻人会不会线上联系，哪些本地产品被带到更远的地方，都可以用不同年代的照片与当事人讲述共同呈现。"
  ],
  31:[
    "麦穗从青绿转向金黄，打场的空地也随之忙起来。情境叙事从一季农事的顺序开始：看天气、准备工具、收割、晾晒、入仓。每个环节都由真正参与过的人校正以后，才适合成为地方记录。",
    "如果讲述者记得某一年特别早或特别晚，可以先记录这是个人印象，再寻找农历记事、照片、气象资料或村集体记录进行比对。文字同时保留不同人的记忆范围，不让一个时间点覆盖所有家庭。",
    "收割方式和劳动力安排会随工具与生活变化而调整。旧工具、场院遗址与如今的机械作业都可以并置展示，讲清楚变化发生的过程和人们的实际感受。"
  ],
  34:[
    "杏花开的时候，枝头还没有挂上果实，院墙边却已经能听见人讨论花期。故事沿着一年四季走：修枝、开花、坐果、采摘与保存，每一步都由果农指出真正的关键节点。",
    "若要展示品种、产量或采摘月份，需先问清楚对应的是哪块果园、哪一年和哪位经营者。不同海拔、地块与天气都可能带来差异，页面不把单次经验写成固定结论。",
    "果园还连接着家庭劳动、市场和返乡选择。谁负责照看、果子如何分级、订单如何到来，可以通过果农、合作社和收购方的多方讲述交叉理解。"
  ],
  40:[
    "返乡青年带回来的不只有设备，也有一套新的观察方式。手机里可能存着地块照片、订单信息和天气记录；长辈的经验则来自多年看土、看苗和看天。两种知识如何一起工作，是这段故事的重点。",
    "采访时不急于把创业描述成成功范例。可以具体问项目何时开始、投入由谁承担、哪些环节最难、家庭生活有哪些变化，也邀请合作伙伴或邻里补充不同角度。",
    "若需要呈现经营数据或客户信息，先确定哪些内容可以公开。把尚在试行的办法标为试验，把已经稳定的变化与个人期待分开表达，才能让案例既有启发也经得起核对。"
  ],
  41:[
    "案板上的面团被一手托起，另一只手握刀，面片落进滚水里。近景可以记录手腕节奏、面团状态和灶火变化，再让操作者决定哪些步骤需要慢速回放，哪些只用文字说明。",
    "同一道面食在不同家庭中可能有不同做法，工具和调味也会变化。展陈不设唯一标准答案，而是把讲述者、家庭习惯和拍摄时间写清楚，让多样性保留在档案里。",
    "味道的记忆常和人、时节、桌边座位联系在一起。可以请讲述者回想第一次学会制作的场景，也可以邀请下一代说说自己如何继续或改写这套做法。"
  ],
  42:[
    "陶缸排成一列，日光落在封口与缸肩上。镜头从器皿的排列开始，再进入发酵、照看与取用的工作节奏。画面说明的是采录视角，真实作坊的流程必须由从业者现场校正。",
    "一瓶醋背后可能有原料、工序、储存和销售的不同故事。正式记录前确认每一步的地方说法，并区分家庭酿造经验、作坊流程与公开技术信息，避免把一种做法推广成所有人的共同传统。",
    "醋缸的位置、窖房的温湿度和日常管理都值得用照片与文字留下。涉及品牌、配方和经营数据时，先与经营者约定内容边界，再决定数字展示的范围。"
  ],
  50:[
    "山楂从枝头摘下后，可以被晾晒、熬煮或带到集市。故事把一年里的几种保存办法放在一起，让讲述者指出各自的季节、工具和家庭做法。",
    "果品名称、成熟期和加工方法应向当地种植者核实。若一家人有特殊配方或习惯，页面会把它作为这户家庭的记忆，而不是替全村作概括。",
    "一口酸甜的味道也会随生活而变：以前怎么储存，现在是否有新的加工方式，年轻人还会不会做。把旧方法与当下选择并排展示，就能看见地方知识如何继续更新。"
  ]
};
const longStory = s => {
  const ci = categories.indexOf(s.category);
  const frames = narrativeByCategory[ci];
  const tailored=storyScripts[s.id]||[
    "围绕“"+s.title+"”，可以先把故事放回真实生活的顺序中：它在哪里出现、谁会使用或参与、当时的季节与周边环境怎样。采录者记录可观察的细节，让地方名称和生活动作成为读者进入故事的入口。",
    "这条线索位于“"+s.city+"”的区域采录构想中。正式走访时，请熟悉当地的人带路并校正地点称呼，再记录相关物件、声音和人物关系。城市标签只用于导航，不代表已找到了具体村庄或故事发生点。",
    "故事的变化可以由多位讲述者共同补充：有人记得以前的样子，有人熟悉当下的使用方式，也有人保存着照片和实物。整理时保留各自的出处和记忆范围，避免把不同人的说法合成未经确认的统一叙事。",
  ];
  return [s.summary+" 这是一篇用于展陈结构演示的情境叙事样稿，不对应某位真实村民的口述，也不预设具体村庄史实。",...tailored,frames[(s.tile+1)%4],"如果要把这段样稿变成真实档案，下一步可共同确认：地点的本地称呼、记忆发生的大致年代、讲述者署名意愿，以及哪些照片或录音可以公开。地图点位须经本人确认后再落点。"];
};

const safeRead = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };
const safeWrite = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
let saved = safeRead("jinjian-saved", []);
let drafts = safeRead("jinjian-drafts", []);
let currentCity = null;
let currentCategory = "全部";
let currentGalleryGroup = "全部插图";
let galleryPage = 1;
let searchTerm = "";
let archivePage = 1;
let timelineYear = 2025;
let activeStory = stories[0];
let speakingId = null;
let voiceRate = 1;
let currentRoute = 0;
let toastTimer = 0;
let activeRecorder = null;
let activeMediaStream = null;
let recordedAudioUrl = null;
let imagePreviewUrl = null;
const routes = [
  {title:"晋中院落与古堡",sub:"院落 · 古城 · 手艺",city:"晋中",distance:"约 2 日",pace:"步行 + 县际交通",cover:4,steps:[["平遥古城周边村落","旧院落与生活空间"],["祁县古村镇","晋商商路与家宅"],["榆次传统村落","水脉与村镇记忆"],["灵石古堡聚落","山地建筑与防御"],["介休手艺作坊","器物与手艺传承"]]},
  {title:"太行山地生活线",sub:"古村 · 山水 · 农事",city:"长治",distance:"约 3 日",pace:"山地慢行",cover:7,steps:[["平顺山村","坡地聚落与古道"],["壶关村落","太行水系与日常"],["黎城老街周边","戏台与集市"],["沁县田野","杂粮农事记录"],["长子传统村镇","节庆与邻里空间"]]},
  {title:"黄河与河东烟火",sub:"河谷 · 古村 · 灶间",city:"运城",distance:"约 2 日",pace:"自驾 + 田野走访",cover:31,steps:[["新绛古村镇","木版年画与街巷"],["万荣传统村落","院落和农耕生活"],["稷山乡村","河东节令食俗"],["临猗果园村","果业与返乡故事"],["盐湖周边村落","水土与生计变化"]]},
];

function routeTo(page) { location.hash = page; }
function escapeHTML(value) { return String(value).replace(/[&<>\"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }
function toast(message) { const box=$("#toast"); box.textContent=message; box.classList.add("is-visible"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>box.classList.remove("is-visible"),2300); }
function artTile(id, extraClass = "", label = "") {
  const s = typeof id === "object" ? id : stories.find(x=>x.id===Number(id)) || stories[0];
  const col=s.tile%4, row=Math.floor(s.tile/4);
  const bx=["0%","33.333%","66.666%","100%"][col], by=["0%","50%","100%"][row];
  return '<div class="art-tile '+extraClass+'" role="img" aria-label="山西乡村主题生成插图：'+escapeHTML(s.title)+'" data-sheet="'+s.sheet+'" style="--bx:'+bx+';--by:'+by+';--fallback:url(assets/illustrations/scene-'+String(s.id).padStart(2,"0")+'.svg)"><span class="art-label">'+escapeHTML(label||s.tag)+'</span></div>';
}
function heading(_eyebrow,title,desc) {
  return '<header class="page-heading"><div><h1>'+title+'</h1><p>'+desc+'</p></div></header>';
}
function footer() {
  return '<footer class="view-footer"><span>晋见山乡 · 乡村记忆数字地图与语音导览</span><span>原型内容均为采录提案或情境样稿 · 地图 © OpenStreetMap contributors</span></footer>';
}
function storyCard(s) {
  const isSaved=saved.includes(s.id);
  return '<article class="story-card" data-story="'+s.id+'" tabindex="0" aria-label="打开故事：'+escapeHTML(s.title)+'">'+
    artTile(s,"",s.city+" · "+s.tag)+
    '<div class="story-card-body"><div class="story-card-meta"><span>'+escapeHTML(s.category)+'</span><span>情境样稿</span></div><h3>'+escapeHTML(s.title)+'</h3><p>'+escapeHTML(s.summary)+'</p><div class="card-foot"><span>'+escapeHTML(s.city)+' · 阅读 '+s.read+' 分钟</span><button class="heart '+(isSaved?"is-saved":"")+'" data-save="'+s.id+'" aria-label="'+(isSaved?"取消收藏":"收藏")+'">'+(isSaved?"♥":"♡")+'</button></div></div></article>';
}
function miniCard(s) {
  return '<article class="mini-card" data-story="'+s.id+'" tabindex="0">'+artTile(s,"",s.tag)+'<div><span class="micro">'+escapeHTML(s.category)+' · '+escapeHTML(s.city)+'</span><h3>'+escapeHTML(s.title)+'</h3><p>'+escapeHTML(s.summary.slice(0,34))+'…</p></div></article>';
}
function homeView() {
  const lead=stories[0], picks=[stories[12],stories[26],stories[39]];
  return '<div class="view-page">'+
    '<section class="home-hero"><div class="hero-copy"><h1>让山乡记忆<br><em>有迹可循</em></h1><p>从村口的树、院墙的砖，到灶台边的一道家常味。沿着真实地图走进三晋大地，把平凡日子里的地方记忆，交给更多人看见。</p><div class="hero-stamps"><span class="stamp">一省 11 市</span><span class="stamp">声音 · 地图 · 故事</span><span class="stamp">共同采录</span></div><div class="hero-actions"><a href="#map" class="button button-primary">打开山西记忆地图 <span>↗</span></a><a href="#scene" class="button">走进 3D 村落 <span>◇</span></a></div><div class="hero-note">项目原型 · 所有村级故事点均待实地采录与授权</div></div><div class="hero-visual"><img src="assets/village-mural.png" alt="山西黄土村落、院落与远山的原创手绘全景插画"><span class="hero-caption">一座村庄 · 多种讲述 · 共同留下</span></div></section>'+ 
    '<div class="home-stats"><div class="stat"><strong>11</strong><span>地级市 · 全省地图入口</span></div><div class="stat"><strong>50</strong><span>故事线索 · 五类主题</span></div><div class="stat"><strong>60+</strong><span>原创场景插画</span></div><div class="stat"><strong>3D</strong><span>可旋转的乡村场景</span></div></div>'+
    '<div class="notice"><strong>先说明内容边界：</strong>这是一套可继续实地采录的交互原型。故事为展陈情境样稿；地图目前提供山西真实底图与城市级入口，村级点位需要当地走访后确认。</div>'+
    '<div class="section-row"><div><h2>从一段记忆开始</h2><p>沿着地方、时间与声音，找到你关心的乡村故事。</p></div><a class="text-link" href="#archive">浏览全部故事线索 ↗</a></div>'+
    '<div class="home-grid"><article class="featured-story" data-story="'+lead.id+'" tabindex="0" aria-label="打开故事：'+escapeHTML(lead.title)+'">'+artTile(lead,"",lead.city+" · 建筑记忆")+'<div class="featured-copy"><h3>'+lead.title+'</h3><p>'+lead.summary+'这里不急于给一座房子下定义，而是先寻找谁住过、怎样使用、后来又发生了什么。</p><span class="text-link">展开这段长故事 ↗</span></div></article><div class="home-side-stack">'+picks.map(miniCard).join("")+'</div></div>'+ 
    '<div class="section-row"><div><h2>十一个独立入口，各自成页</h2><p>地图、故事、图像、声音与空间模型，组成可以往返探索的地方档案。</p></div></div><div class="guide-grid">'+[
      ["真实地图","从山西省底图进入 11 个地级市，再按采录计划补上经核实的村庄点。","#map","⌖"],
      ["田野图鉴","浏览五组原创生成画面，按主题筛选并逐张放大查看。","#gallery","▧"],
      ["乡音档案","用浏览器朗读体验文本；正式版本可替换为授权口述录音。","#voices","♫"],
      ["3D村落","拖拽旋转概念场景，了解房屋、田地和公共空间之间的关系。","#scene","◇"]
    ].map(x=>'<a class="guide-card" href="'+x[2]+'"><div class="guide-icon">'+x[3]+'</div><h2>'+x[0]+'</h2><p>'+x[1]+'</p><span class="text-link">进入体验 ↗</span></a>').join("")+'</div>'+footer()+'</div>';
}

function cityMapUrl(city, zoomOut=false) {
  if (!city) return "https://www.openstreetmap.org/export/embed.html?bbox=110.2%2C34.5%2C114.6%2C40.8&layer=mapnik";
  const d=zoomOut?1.05:.45;
  const b=[city.lon-d,city.lat-d,city.lon+d,city.lat+d].map(n=>n.toFixed(3)).join("%2C");
  return "https://www.openstreetmap.org/export/embed.html?bbox="+b+"&layer=mapnik&marker="+city.lat+"%2C"+city.lon;
}
function mapView() {
  const selected=currentCity&&stories.find(s=>s.city===currentCity.name);
  const cityLabel=currentCity?currentCity.name:"山西全省";
  return '<div class="view-page">'+heading("REAL MAP · SHANXI","在山西，找到记忆发生的地方","真实开放地图底图 + 11 个地级市入口。当前点位是城市级定位；具体村庄、古建、人物与路线须经实地确认。","02")+
    '<div class="map-layout"><section class="map-frame-wrap"><iframe id="real-map" class="map-frame" title="OpenStreetMap 山西省真实地图" src="'+cityMapUrl(currentCity,true)+'" loading="lazy" referrerpolicy="no-referrer"></iframe><div class="map-credit">地图数据 © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a> · 可在地图内缩放、拖动 · <a id="open-osm" href="'+(currentCity?"https://www.openstreetmap.org/?mlat="+currentCity.lat+"&mlon="+currentCity.lon+"#map=9/"+currentCity.lat+"/"+currentCity.lon:"https://www.openstreetmap.org/#map=7/37.7/112.4")+'" target="_blank" rel="noreferrer">在 OSM 打开 ↗</a></div></section>'+
    '<aside class="map-side"><div class="eyebrow">11 PREFECTURE-LEVEL CITIES</div><h2>'+(currentCity?cityLabel+" · "+currentCity.tag:"山西全省 · 三晋大地")+'</h2><p>'+(currentCity?currentCity.intro:"全省真实地图概览。底图可缩放、拖动；11 个城市入口可逐一定位。")+'</p><div class="map-search"><input id="city-filter" type="search" placeholder="筛选城市，例如：晋中" aria-label="筛选城市"><button class="button button-small" data-city-overview>全省</button></div><div class="city-list">'+cities.map(c=>'<button class="city-button '+(c.name===cityLabel?"is-active":"")+'" data-city="'+c.name+'">'+c.name+'<small>'+c.tag+'</small></button>').join("")+'</div><div class="map-legend"><span>'+(currentCity?"当前城市中心":"山西全省范围")+'</span><span>村级点位待实地确认</span></div><div class="regional-story"><div class="eyebrow">区域记忆提案</div><h3>'+escapeHTML(selected?selected.title:"山河之间的村落记忆")+'</h3><p>'+(selected?escapeHTML(selected.summary):"在城市级入口下，继续补充经过授权的村史、乡音、手艺与田野记忆。")+'</p><button class="button button-small" data-story="'+(selected?selected.id:1)+'">打开主题档案 ↗</button></div></aside></div>'+
    '<div class="section-row"><div><h2>先看全省，再进入一座城</h2><p>点击城市名称会在真实底图上定位到该城市中心，作为后续实地采录的导航起点。</p></div></div><div class="guide-grid">'+cities.slice(0,6).map((c,i)=>'<button class="guide-card city-feature" data-city="'+c.name+'"><div class="guide-icon">'+String(i+1).padStart(2,"0")+'</div><h2>'+c.name+' · '+c.tag+'</h2><p>'+c.intro+'</p><span class="text-link">地图定位 ↗</span></button>').join("")+'</div>'+footer()+'</div>';
}
function archiveView() {
  const filtered=stories.filter(s=>(currentCategory==="全部"||s.category===currentCategory)&&(!searchTerm||[s.title,s.summary,s.city,s.tag].join(" ").toLowerCase().includes(searchTerm.toLowerCase())));
  const pages=Math.max(1,Math.ceil(filtered.length/12)); archivePage=Math.min(archivePage,pages);
  const shown=filtered.slice((archivePage-1)*12,archivePage*12);
  return '<div class="view-page">'+heading("STORY ARCHIVE · 50 THREADS","故事档案","五类主题、五十条可继续采录的线索。展开任一故事，可阅读长篇情境叙事、查看主题元数据并保存档案。","03")+
    '<div class="notice notice-red">档案说明：为便于评审体验交互，以下故事均为创作性情境样稿，并非山西村民真实口述。每一条都预留了人物授权、村级坐标和史实校对环节。</div>'+
    '<div class="filter-bar">'+["全部",...categories].map(cat=>'<button class="filter-chip '+(currentCategory===cat?"is-active":"")+'" data-category="'+cat+'">'+cat+'</button>').join("")+'<label class="search-box"><span>⌕</span><input id="story-search" value="'+escapeHTML(searchTerm)+'" placeholder="搜索标题、城市、主题"></label></div>'+
    '<div class="story-grid">'+(shown.length?shown.map(storyCard).join(""):'<p class="muted">没有找到匹配的故事，请试试其他关键词。</p>')+'</div>'+
    '<div class="pagination"><button data-page="-1">上一页</button><span>第 '+archivePage+' / '+pages+' 页 · '+filtered.length+' 条线索</span><button data-page="1">下一页</button></div>'+footer()+'</div>';
}
const galleryGroups = [
  {name:"村落建筑",sheet:"village",captions:["黄土坡上的院落群","木门与门环","窑洞与土崖","石巷转角","院墙与老槐树","村中戏台","井台与水渠","山地村寨远景","院落里的日常","窑洞室内光影","旧村寨门","入夜后的屋顶"]},
  {name:"田野生计",sheet:"field",captions:["春播整地","旱地麦田","谷穗成熟","麦收与打场","果园采摘","土豆收获","坡地梯田","田间引水","场院分粮","秋日果筐","冬闲农具","返乡青年看田"]},
  {name:"手艺传承",sheet:"craft",captions:["漆器打磨","剪纸窗花","澄泥砚制作","锦绣针脚","木版套色","屋架木作","陶器拉坯","堆锦拼制","铁器锻打","草编提篮","旧门修缮","师徒共作"]},
  {name:"岁时节庆",sheet:"festival",captions:["秧歌队伍","社火锣鼓","院门挂灯","乡村戏台","庙会长街","节日团圆饭","秋收聚席","院内皮影","冬夜灯火","搬凳看戏","院落喜事","老照片共读"]},
  {name:"乡音滋味",sheet:"food",captions:["刀削面出锅","一碗面食","醋缸与日晒","黄米糕点","集市小吃","灶火炒菜","谷物石磨","手擀杂粮面","冬日热汤","果品晾晒","饭桌团聚","厨房老物件"]},
];
function galleryView() {
  const groups=currentGalleryGroup==="全部插图"?galleryGroups:galleryGroups.filter(x=>x.name===currentGalleryGroup);
  const all=groups.flatMap(group=>group.captions.map((caption,index)=>({group:group.name,sheet:group.sheet,index,caption})));
  const pages=Math.max(1,Math.ceil(all.length/24));galleryPage=Math.min(galleryPage,pages);
  const visible=all.slice((galleryPage-1)*24,galleryPage*24);
  const tiles=visible.map(item=>{
    const col=item.index%4,row=Math.floor(item.index/4),bx=["0%","33.333%","66.666%","100%"][col],by=["0%","50%","100%"][row];
    const fallback=(item.sheet==="village"?1:item.sheet==="field"?31:item.sheet==="craft"?11:item.sheet==="festival"?21:41)+Math.min(item.index,9);
    return '<button class="gallery-item" data-gallery-item data-gallery-sheet="'+item.sheet+'" data-gallery-index="'+item.index+'" data-gallery-title="'+escapeHTML(item.caption)+'" data-gallery-group="'+escapeHTML(item.group)+'" aria-label="放大查看：'+escapeHTML(item.caption)+'">'+
      '<div class="art-tile" role="img" aria-label="生成式场景插图：'+escapeHTML(item.caption)+'" data-sheet="'+item.sheet+'" style="--bx:'+bx+';--by:'+by+';--fallback:url(assets/illustrations/scene-'+String(fallback).padStart(2,"0")+'.svg)"><span class="art-label">'+escapeHTML(item.group)+' · '+String(item.index+1).padStart(2,"0")+'</span></div>'+
      '<span class="gallery-caption"><strong>'+escapeHTML(item.caption)+'</strong><small>'+escapeHTML(item.group)+' · 原创生成场景</small></span></button>';
  }).join("");
  return '<div class="view-page">'+heading("GENERATED ART ATLAS · 60 SCENES","田野图像图鉴","五组原创生成图像，共 60 个场景。点击任一画面放大细看；每一张都是创作性视觉表达，不是实地照片。","04")+
    '<div class="notice">图像主题围绕山西的黄土村落、旱作田野、乡土手艺、节庆生活与厨房集市展开。AI 画面仅作文化体验插图，不对应特定村民或具体村庄；正式使用前仍需在地审看。</div>'+
    '<div class="filter-bar">'+["全部插图",...galleryGroups.map(g=>g.name)].map(name=>'<button class="filter-chip '+(currentGalleryGroup===name?"is-active":"")+'" data-gallery-filter="'+name+'">'+name+'</button>').join("")+'</div>'+
    '<div class="gallery-grid">'+tiles+'</div><div class="pagination"><button data-gallery-page="-1">上一页</button><span>第 '+galleryPage+' / '+pages+' 页 · 共 '+all.length+' 幅</span><button data-gallery-page="1">下一页</button></div>'+footer()+'</div>';
}
function storyView(id) {
  const s=stories.find(x=>x.id===Number(id))||stories[0]; activeStory=s;
  const paragraphs=longStory(s);
  const related=stories.filter(x=>x.category===s.category&&x.id!==s.id).slice(0,4);
  return '<div class="view-page">'+
    '<div class="detail-toolbar"><a class="text-link" href="#archive">← 返回故事档案</a><span class="micro">情境叙事样稿 · '+String(s.id).padStart(2,"0")+' / 50</span></div>'+
    '<div class="story-detail"><article class="detail-main"><div class="eyebrow">'+escapeHTML(s.category)+' · '+escapeHTML(s.city)+' · '+escapeHTML(s.tag)+'</div><h1 class="detail-title">'+escapeHTML(s.title)+'</h1><p class="detail-lead">'+escapeHTML(s.summary)+'</p>'+
    '<div class="detail-actions"><button class="button button-primary" data-play="'+s.id+'">♫ 朗读这段故事</button><button class="button" data-save="'+s.id+'">'+(saved.includes(s.id)?"♥ 已收藏":"♡ 收藏档案")+'</button><button class="button" data-share="'+s.id+'">↗ 分享线索</button></div>'+
    artTile(s,"detail-art",s.city+" · "+s.tag)+
    '<div class="notice notice-red"><strong>阅读提示：</strong>以下为展陈体验用的情境创作文本，不是真实村民采访或史实记录。请在正式展示前替换为经本人审阅、授权的讲述内容。</div>'+
    '<div class="detail-text">'+paragraphs.map((p,i)=>i===2?'<blockquote class="pullquote">“先把地方和物件讲清楚，记忆才有可以落脚的坐标。”<br><small style="font:10px var(--sans)">展陈文案示意句 · 非真实引语</small></blockquote><p>'+escapeHTML(p)+'</p>':'<p>'+escapeHTML(p)+'</p>').join("")+'</div>'+
    '<div class="section-row"><div><h2>继续读同一主题</h2><p>从相近的物件、节庆或生活空间继续展开。</p></div></div><div class="story-grid">'+related.map(storyCard).join("")+'</div></article>'+
    '<aside class="detail-aside"><div class="eyebrow">档案卡片</div><h3>'+escapeHTML(s.title)+'</h3><div class="detail-meta"><div><small>采录区域入口</small><strong>'+escapeHTML(s.city)+' · 城市级样例</strong></div><div><small>故事主题</small><strong>'+escapeHTML(s.category)+' / '+escapeHTML(s.tag)+'</strong></div><div><small>叙事时间</small><strong>情境时间线示意 · '+s.year+'</strong></div><div><small>地图点位</small><strong>待实地走访并由讲述者确认</strong></div><div><small>预计阅读</small><strong>'+s.read+' 分钟</strong></div><div><small>档案状态</small><strong>原型线索 · 尚未采录</strong></div></div><div class="rule"></div><h3>实地采录可追问</h3><div class="related-list"><div class="related-item">本地人如何称呼这里？</div><div class="related-item">故事发生在哪个季节或年代？</div><div class="related-item">哪些照片、声音可以公开？</div><div class="related-item">谁还需要参与校对？</div></div><div class="rule"></div><button class="button button-small" data-route="map" data-city-target="'+escapeHTML(s.city)+'">查看 '+escapeHTML(s.city)+' 地图入口 ↗</button></aside></div>'+footer()+'</div>';
}
function timelineView() {
  const points=stories.filter(s=>s.year<=timelineYear).sort((a,b)=>a.year-b.year).slice(0,12);
  return '<div class="view-page">'+heading("MEMORY TIMELINE · ERA","记忆时间轴","用时间线索串联建筑、手艺、节俗与田野。滑动年份改变档案窗口；年代仅为交互示意，不代表经核实的地方史实。","05")+
    '<div class="timeline-intro"><div><div class="eyebrow">TIME IS A STORY, TOO</div><h2>一段记忆，可以从什么时候开始？</h2><p>让讲述者自己标注记忆的大致年代。对于不确定的时间，保留“约”“童年时”或“上一代”等说法，不强迫填写精确年份。</p></div><div class="timeline-control"><span class="timeline-readout" id="year-label">'+timelineYear+'</span><input id="year-range" type="range" min="1950" max="2025" step="5" value="'+timelineYear+'" aria-label="筛选记忆时间"></div></div>'+
    '<div class="timeline-track"><div class="timeline-events">'+points.map(s=>'<article class="timeline-card" data-story="'+s.id+'" tabindex="0">'+artTile(s,"",s.category)+'<div class="timeline-card-body"><small>示意年代 · '+s.year+'</small><strong>'+escapeHTML(s.title)+'</strong><p>'+escapeHTML(s.city)+' · '+escapeHTML(s.tag)+'</p></div></article>').join("")+'</div></div>'+
    '<div class="notice">正式采录建议同时记录：讲述者如何判断年代、是否有可对照照片或文件、时间表述是否可以公开。无法确定的年月应作为不确定信息保留。</div>'+footer()+'</div>';
}
function voicesView() {
  const s=activeStory||stories[0];
  const queue=stories.filter(x=>[1,12,24,33,45,50].includes(x.id));
  return '<div class="view-page">'+heading("VOICE ARCHIVE · LISTEN","乡音档案","让声音和文字并排出现。当前使用浏览器语音合成朗读体验文本；正式版本可接入经本人同意录制的乡音音频。","06")+
    '<div class="notice">声音边界：页面不会伪造任何村民录音。朗读由设备浏览器生成，音色和方言支持取决于本机；真实音频需获得讲述者授权后才能上传展示。</div>'+
    '<div class="voice-layout"><section class="player-card">'+artTile(s,"player-art","正在聆听 · "+s.city)+'<div class="eyebrow">NOW READING · SYNTHESIZED VOICE</div><h2 class="player-now" id="voice-title">'+escapeHTML(s.title)+'</h2><div class="player-sub">浏览器中文朗读 · '+escapeHTML(s.category)+' · 情境样稿</div><div class="player-progress"><span id="voice-progress"></span></div><div class="player-times"><span id="voice-status">准备就绪</span><span>文本朗读</span></div><div class="player-controls"><button data-voice-prev aria-label="上一段">◀</button><button class="play-main" data-play="'+s.id+'" aria-label="播放">'+(speakingId===s.id?"Ⅱ":"▶")+'</button><button data-voice-next aria-label="下一段">▶</button></div><div class="voice-speed">'+[0.8,1,1.2,1.5].map(rate=>'<button data-rate="'+rate+'" class="'+(voiceRate===rate?"is-active":"")+'">'+rate+'×</button>').join("")+'</div><div class="transcript"><h3>同步文本 · '+escapeHTML(s.title)+'</h3><p>'+longStory(s).join("</p><p>")+'</p></div></section>'+
    '<aside class="voice-queue"><div class="eyebrow">LISTENING COLLECTION</div><h2>乡音采录清单</h2><p class="micro">精选主题 · 点击切换待听内容</p>'+queue.map((q,i)=>'<button class="queue-item" data-select-voice="'+q.id+'"><span class="queue-no">'+String(i+1).padStart(2,"0")+'</span><span><strong>'+escapeHTML(q.title)+'</strong><small>'+escapeHTML(q.city)+' · '+escapeHTML(q.tag)+'</small></span><span class="queue-play">▶</span></button>').join("")+
    '<div class="notice">正式采录小贴士：在安静环境中录制，保留讲述者原声；明确署名方式、传播平台、使用期限和撤回渠道。</div></aside></div>'+footer()+'</div>';
}
function routesView() {
  const r=routes[currentRoute]||routes[0];
  const city=cities.find(c=>c.name===r.city)||cities[0];
  return '<div class="view-page">'+heading("SLOW WALK · FIELD ROUTES","乡野漫游","把村落、田野、手艺与饮食编排成可以实地验证的采录路线。路线为策划提案，行程与开放情况须出发前确认。","07")+
    '<div class="route-grid">'+routes.map((route,i)=>'<article class="route-card '+(currentRoute===i?"is-active":"")+'" data-route-index="'+i+'">'+artTile(route.cover,"",route.city+" · 线路想象")+'<div class="route-body"><div class="eyebrow">FIELD ROUTE · 0'+(i+1)+'</div><h3>'+route.title+'</h3><p>'+route.sub+'<br>沿途建议观察：空间、物件、讲述者和地方名称。</p><div class="route-meta"><span>'+route.distance+'</span><span>'+route.pace+'</span></div></div></article>').join("")+'</div>'+
    '<section class="route-steps"><div class="eyebrow">PROPOSED STOPS · '+escapeHTML(r.city)+'</div><h2>'+r.title+' · 采录顺序建议</h2><div class="steps-row">'+r.steps.map((s,i)=>'<div class="route-stop"><small>STOP 0'+(i+1)+'</small><strong>'+escapeHTML(s[0])+'</strong><p>'+escapeHTML(s[1])+'</p></div>').join("")+'</div>'+
    '<div class="hero-actions"><button class="button button-primary" data-route-map="'+r.city+'">在真实地图中定位 '+r.city+' ↗</button><button class="button" data-route-print>打印这条路线</button></div></section>'+
    '<div class="notice">路线中出现的古村、作坊和田野为区域采录方向举例，不表示已确认可进入或已取得授权。正式路线需要逐点联系当地管理者、核对道路与开放时间。</div>'+footer()+'</div>';
}
function sceneView() {
  const items=[
    ["院落群","晋中合院空间意象",1,1,-2,0],["黄土窑洞","吕梁山地居住意象",2,-3,-1,3],["古戏台","公共文化空间",3,0,1,-2],["田埂与梯田","山地农作景观",4,4,-2,1],["古井与水渠","村庄公共设施",5,-1,-2,0],["村口古树","日常相遇节点",6,3,-1,-3],["石桥小溪","山水与通行",7,-3,-2,-2],
  ];
  return '<div class="view-page">'+heading("3D VILLAGE · SPATIAL MEMORY","把村庄，转起来看","自主建模的交互式三维村落意象：拖动旋转、滚轮缩放、点击场景标记查看相关记忆。院落、窑洞、田地与公共空间用于表达山西乡村的空间主题，不复刻具体村庄。","08")+
    '<div class="notice">模型说明：这是由代码构建的轻量 3D 概念场景，不是实测测绘成果。屋舍布局、地形和材质均为演示；如用于真实村史展示，应依据村民确认和现场测绘重新建模。</div>'+
    '<div class="scene-layout"><section class="scene-stage" id="scene-stage"><canvas id="village-canvas" aria-label="可拖动旋转的三维山西乡村概念模型"></canvas><div id="scene-pins"></div><div class="scene-overlay"><strong>三晋 · 村落空间模型</strong><small>CONCEPT MODEL · 交互建模</small></div><div class="scene-tools"><button data-zoom="in" aria-label="放大">＋</button><button data-zoom="out" aria-label="缩小">－</button><button data-scene-reset aria-label="重置视角">↺</button></div><div class="scene-hint">鼠标拖动旋转 · 滚轮缩放 · 点击编号标记查看故事</div></section>'+
    '<aside class="scene-side"><div class="eyebrow">MODEL LAYERS</div><h2>村落里的七个节点</h2><p>从空间关系进入故事线索。点击右侧条目或模型标记。</p>'+items.map((it,i)=>'<button class="scene-location" data-hotspot="'+i+'"><b>'+String(i+1).padStart(2,"0")+'</b><span>'+it[0]+'<small>'+it[1]+'</small></span></button>').join("")+'<div class="scene-legend">✦ 场景模型 · 地形与建筑为示意<br>✦ 故事链接 · 内容为情境样稿</div></aside></div>'+
    '<div class="section-row"><div><h2>模型如何服务村史</h2><p>把难以在二维页面中说明的空间关系，变成可以进入、旋转、点击的体验。</p></div></div><div class="guide-grid">'+[
      ["空间记忆","通过院落、巷道、井台和戏台的位置关系，组织口述故事的空间入口。"],
      ["田野观察","为真实采录预留地形、路径、田块、水系和公共设施图层。"],
      ["共建校对","让村民能纠正建筑称呼、用途和邻里关系，再更新模型标注。"]
    ].map(x=>'<article class="guide-card"><div class="guide-icon">◇</div><h2>'+x[0]+'</h2><p>'+x[1]+'</p></article>').join("")+'</div>'+footer()+'</div>';
}
function studioView() {
  return '<div class="view-page">'+heading("CO-CREATION STUDIO · CONTRIBUTE","把记忆交给村庄","提交一段文字、一张旧照片或一个地方线索，先作为本地草稿保存。这个原型不会把内容上传到服务器。","09")+
    '<div class="studio-grid"><section class="form-card"><div class="eyebrow">YOUR MEMORY NOTE</div><h2>写下你想留下的一段</h2><p>可以从一个人、一件物、一条路或一道味道开始。</p><form id="memory-form"><div class="field-row"><label class="field"><span>故事标题 *</span><input name="title" required maxlength="48" placeholder="例如：老槐树下的修鞋摊"></label><label class="field"><span>主题分类</span><select name="category">'+categories.map(c=>'<option>'+c+'</option>').join("")+'</select></label></div><div class="field-row"><label class="field"><span>城市 / 县区（选填）</span><input name="place" maxlength="60" placeholder="请填写熟悉的真实地点"></label><label class="field"><span>年代线索（选填）</span><input name="period" maxlength="40" placeholder="例如：大约上世纪八十年代"></label></div><label class="field"><span>记忆正文 *</span><textarea name="story" required maxlength="2000" placeholder="那时的村子是什么样？谁参与其中？哪些细节你还记得？"></textarea></label><label class="field"><span>选择照片（仅本机预览）</span><input name="image" type="file" id="memory-image" accept="image/*"><div id="upload-preview" class="upload-preview">支持 JPG / PNG；图片不会上传，草稿只存标题和文字。</div></label><section class="record-panel"><div><strong>乡音片段（可选）</strong><span>本机录音预览，不会上传或附加到草稿</span></div><button type="button" id="record-toggle" class="button button-small">● 开始录音</button><p id="record-status" class="micro">需允许浏览器使用麦克风</p><audio id="record-playback" controls hidden></audio></section><div class="consent-box">请只提交你本人有权分享的内容。涉及他人姓名、肖像、未成年人或私人住址时，请先取得同意；敏感信息建议匿名或不公开。</div><p id="form-message" class="micro"></p><button class="button button-primary" type="submit">保存本机草稿 ↗</button></form></section>'+
    '<aside class="drafts-card"><div class="eyebrow">LOCAL DRAFTS</div><h2>我留下的线索</h2><p>只保存在当前浏览器；换设备或清理浏览数据后可能无法找回。</p><div class="steps-guide"><div class="guide-step"><b>01</b><span>先写下你记得的细节，不必一开始就写成完整文章。</span></div><div class="guide-step"><b>02</b><span>标注地点、年代的大致范围，并区分亲历与转述。</span></div><div class="guide-step"><b>03</b><span>联系档案整理者，确认授权范围后再进入公开展馆。</span></div></div><div class="rule"></div><div id="draft-list" class="draft-list"></div><button type="button" class="button button-small" data-export-drafts>导出草稿 JSON</button></aside></div>'+footer()+'</div>';
}
function savedView() {
  const items=stories.filter(s=>saved.includes(s.id));
  return '<div class="view-page">'+heading("YOUR COLLECTION · SAVED","我的收藏","把感兴趣的故事线索收进个人清单，稍后阅读或作为实地走访准备。收藏只存在当前浏览器。","10")+
    (items.length?'<div class="story-grid">'+items.map(storyCard).join("")+'</div>':'<div class="saved-empty"><span class="brand-mark" style="margin:auto">记</span><strong>你的记忆书签还空着</strong><p>在故事档案中点击 ♡，把想继续了解的线索收藏起来。</p><a class="button button-primary" href="#archive">去发现故事</a></div>')+footer()+'</div>';
}
function guideView() {
  return '<div class="view-page">'+heading("FIELD GUIDE · ETHICAL ARCHIVE","让采录，先从倾听开始","一套面向乡村文化数字化展示的工作方法：先建立信任，再记录，再由讲述者共同审阅。","11")+
    '<div class="guide-grid">'+[
      ["先确认讲述者意愿","说明项目用途、展示渠道、署名方式、保存期限和撤回方式。未经许可，不录制、不发布，也不默认沉默代表同意。","01"],
      ["把地点写到可核对","先记录村名、自然村、地名别称和定位来源。村级坐标应由熟悉当地的人确认，必要时只展示到乡镇或片区。","02"],
      ["保留原话和方言","在不改变本意的前提下整理口述。方言词保留原读音、词义和讲述者认可的汉字写法。","03"],
      ["说明信息从哪里来","区分亲历、家人转述、公开档案与策展文字。不同来源分别标注，避免把传闻包装成已证实历史。","04"],
      ["尊重图片与声音权利","确认照片拍摄者、画面人物和音频中的每个人都清楚后续用途；对儿童、家庭隐私和敏感地点谨慎处理。","05"],
      ["让村民参与校对","公开前请讲述者或熟悉当地的人核实地名、年代、器物名称与表达方式，并提供更正和下架渠道。","06"],
    ].map(x=>'<article class="guide-card"><div class="guide-icon">'+x[2]+'</div><h2>'+x[0]+'</h2><p>'+x[1]+'</p></article>').join("")+'</div>'+
    '<section class="source-list"><h2>这套原型的内容边界</h2><ul><li>山西省内 11 个地级市名称用于地图入口；地图城市中心定位为真实底图上的城市级浏览点。</li><li>村级故事、年代、节庆细节、采录线路与 3D 场景均属设计提案或情境样稿，不代表已实地走访和历史核验。</li><li>地图采用 OpenStreetMap 网页底图，打开页面时需要网络连接；其地名与道路信息由 OpenStreetMap 社区维护。</li><li>正式上线前，应补充村委会或社区协作、讲述者授权、实测坐标、图片来源、资料版本和内容更正机制。</li><li>体验文本中的引号文案是展陈示意句，非任何真实村民原话。</li></ul></section>'+
    '<div class="hero-actions" style="margin-top:24px"><a href="#studio" class="button button-primary">提交一条记忆线索</a><a href="#map" class="button">从全省地图开始</a></div>'+footer()+'</div>';
}

let scene3d = null;
function vec3(a,b,c){return [a,b,c];}
function vsub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]];}
function vdot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
function vcross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
function vnorm(a){const l=Math.sqrt(vdot(a,a))||1;return [a[0]/l,a[1]/l,a[2]/l];}
function matPerspective(fovy,aspect,near,far){
  const f=1/Math.tan(fovy/2), nf=1/(near-far);
  return new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,2*far*near*nf,0]);
}
function matLookAt(eye,center,up){
  const z=vnorm(vsub(eye,center)), x=vnorm(vcross(up,z)), y=vcross(z,x);
  return new Float32Array([x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0, -vdot(x,eye),-vdot(y,eye),-vdot(z,eye),1]);
}
function matMultiply(a,b){
  const out=new Float32Array(16);
  for(let c=0;c<4;c++)for(let r=0;r<4;r++)out[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];
  return out;
}
function transform4(m,p){
  return [m[0]*p[0]+m[4]*p[1]+m[8]*p[2]+m[12],m[1]*p[0]+m[5]*p[1]+m[9]*p[2]+m[13],m[2]*p[0]+m[6]*p[1]+m[10]*p[2]+m[14],m[3]*p[0]+m[7]*p[1]+m[11]*p[2]+m[15]];
}
function shade(hex,amount){
  const raw=hex.replace("#",""); let c=[parseInt(raw.slice(0,2),16),parseInt(raw.slice(2,4),16),parseInt(raw.slice(4,6),16)];
  c=c.map(x=>Math.max(0,Math.min(255,x+amount))); return c.map(x=>x/255);
}
function createVillageGeometry(){
  const vertices=[],colors=[];
  const tri=(a,b,c,color)=>{vertices.push(...a,...b,...c);for(let i=0;i<3;i++)colors.push(...color);};
  const quad=(a,b,c,d,color)=>{tri(a,b,c,color);tri(a,c,d,color);};
  const terrainY=(x,z)=>0.13*Math.sin(x*0.72+z*.22)+0.11*Math.cos(z*.75-x*.19)+0.025*(Math.abs(x)+Math.abs(z));
  const box=(x,y,z,w,h,d,col)=>{
    const x0=x-w/2,x1=x+w/2,y0=y,y1=y+h,z0=z-d/2,z1=z+d/2;
    const c=shade(col,0), a=shade(col,-14), b=shade(col,10);
    quad([x0,y0,z0],[x1,y0,z0],[x1,y1,z0],[x0,y1,z0],a);
    quad([x1,y0,z1],[x0,y0,z1],[x0,y1,z1],[x1,y1,z1],b);
    quad([x0,y0,z1],[x0,y0,z0],[x0,y1,z0],[x0,y1,z1],a);
    quad([x1,y0,z0],[x1,y0,z1],[x1,y1,z1],[x1,y1,z0],c);
    quad([x0,y1,z0],[x1,y1,z0],[x1,y1,z1],[x0,y1,z1],b);
    quad([x0,y0,z1],[x1,y0,z1],[x1,y0,z0],[x0,y0,z0],a);
  };
  const house=(x,z,w,d,h,wall,roof)=>{
    const ground=terrainY(x,z); box(x,ground,z,w,h,d,wall);
    const e=ground+h, ridge=e+h*.48, x0=x-w*.58,x1=x+w*.58,z0=z-d*.58,z1=z+d*.58;
    const front=shade(roof,-8), back=shade(roof,-14), top=shade(roof,5);
    quad([x,ridge,z0],[x0,e,z0],[x0,e,z1],[x,ridge,z1],top);
    quad([x,ridge,z0],[x,ridge,z1],[x1,e,z1],[x1,e,z0],front);
    tri([x,ridge,z0],[x0,e,z0],[x1,e,z0],back);
    tri([x,ridge,z1],[x1,e,z1],[x0,e,z1],back);
    const doorH=h*.65, doorW=w*.18;
    box(x,ground,z+d*.501,doorW,doorH,.025,"#634533");
    box(x-w*.27,ground+h*.44,z+d*.502,w*.18,h*.18,.028,"#b4c3b0");
    box(x+w*.27,ground+h*.44,z+d*.502,w*.18,h*.18,.028,"#b4c3b0");
  };
  const cylinder=(x,z,y,r,h,col,sides=9)=>{
    const c=shade(col,0), d=shade(col,-14);
    for(let i=0;i<sides;i++){
      const a=i*Math.PI*2/sides,b=(i+1)*Math.PI*2/sides;
      const p=[x+Math.cos(a)*r,y,z+Math.sin(a)*r],q=[x+Math.cos(b)*r,y,z+Math.sin(b)*r];
      const u=[p[0],y+h,p[2]],v=[q[0],y+h,q[2]];
      quad(p,q,v,u,(i%2?c:d));tri([x,y+h,z],u,v,shade(col,8));
    }
  };
  const cone=(x,z,y,r,h,col,sides=9)=>{
    const tip=[x,y+h,z];
    for(let i=0;i<sides;i++){
      const a=i*Math.PI*2/sides,b=(i+1)*Math.PI*2/sides;
      const p=[x+Math.cos(a)*r,y,z+Math.sin(a)*r],q=[x+Math.cos(b)*r,y,z+Math.sin(b)*r];
      tri(p,q,tip,shade(col,i%2?7:-6));
    }
  };
  // Rolling loess terrain surface: the grid is genuine 3D geometry, not a flat illustration.
  const n=30,size=12;
  for(let iz=0;iz<n;iz++)for(let ix=0;ix<n;ix++){
    const x=-size/2+ix*size/n,z=-size/2+iz*size/n,dx=size/n;
    const p=[x,terrainY(x,z),z],q=[x+dx,terrainY(x+dx,z),z],r=[x+dx,terrainY(x+dx,z+dx),z+dx],s=[x,terrainY(x,z+dx),z+dx];
    const h=(Math.sin(ix*.44)+Math.cos(iz*.4))*5;
    const c=shade(Math.abs(x)>4||Math.abs(z)>4?"#849070":"#a8ad80",h);
    quad(p,q,r,s,c);
  }
  // Far terraces and field parcels.
  for(let k=0;k<8;k++){
    const z=-5.1+k*.45,x=-5.1+k*.14,y=terrainY(x,z)+.025;
    quad([x,y,z],[x+3.0,y+.06,z-.28],[x+3.4,y+.06,z+.05],[x+.15,y,z+.32],shade(k%2?"#9aaa70":"#b7b77a",k%3*3));
  }
  // A blue-green stream and pale village path.
  const stream=[[-5,terrainY(-5,1.6),1.6],[-3.5,terrainY(-3.5,1.1),1.1],[-2,terrainY(-2,.7),.7],[0,terrainY(0,1.2),1.2],[2,terrainY(2,.65),.65],[4,terrainY(4,1.05),1.05],[6,terrainY(6,.55),.55]];
  for(let i=0;i<stream.length-1;i++){
    const a=stream[i],b=stream[i+1],dx=b[0]-a[0],dz=b[2]-a[2],len=Math.hypot(dx,dz),px=-dz/len*.27,pz=dx/len*.27;
    quad([a[0]+px,a[1]+.07,a[2]+pz],[b[0]+px,b[1]+.07,b[2]+pz],[b[0]-px,b[1]+.07,b[2]-pz],[a[0]-px,a[1]+.07,a[2]-pz],shade("#759b98",i%2?8:-5));
  }
  const path=[[-5,terrainY(-5,-.7),-.7],[-3,terrainY(-3,-.6),-.6],[-1,terrainY(-1,-.25),-.25],[1,terrainY(1,-.7),-.7],[3,terrainY(3,-.2),-.2],[5,terrainY(5,.1),.1]];
  for(let i=0;i<path.length-1;i++){
    const a=path[i],b=path[i+1],dx=b[0]-a[0],dz=b[2]-a[2],len=Math.hypot(dx,dz),px=-dz/len*.13,pz=dx/len*.13;
    quad([a[0]+px,a[1]+.1,a[2]+pz],[b[0]+px,b[1]+.1,b[2]+pz],[b[0]-px,b[1]+.1,b[2]-pz],[a[0]-px,a[1]+.1,a[2]-pz],shade("#c8ba98",2));
  }
  // Courtyard homes inspired by Shanxi brick and timber vernacular.
  house(-2.4,-1.6,1.35,.9,.67,"#b2a796","#843b2f");
  house(-.9,-2.0,1.3,.92,.67,"#b9aa96","#934234");
  house(-2.0,-3.05,1.45,.9,.72,"#9e9685","#73382e");
  house(.55,-1.8,1.2,.82,.64,"#baa990","#984937");
  house(2.05,-2.1,1.35,.9,.68,"#b5aa98","#804333");
  house(.7,-3.15,1.55,.86,.68,"#a99f8c","#9c503b");
  house(3.35,-2.0,1.15,.8,.6,"#c0b39c","#8b4031");
  // A small cluster of cave dwellings carved into the slope.
  for(let i=0;i<3;i++){
    const x=-4.3+i*1.05,z=2.8+(i%2)*.68,y=terrainY(x,z);
    box(x,y,z,.9,.88,.78,"#be9b6b");
    cylinder(x,y?z:z,y+.01,.25,.62,"#714c34",12);
    quad([x-.53,y+.88,z-.5],[x,y+1.2,z-.5],[x+.53,y+.88,z-.5],[x+.53,y+.88,z+.5],shade("#aa8055",2));
  }
  // Shrine / public stage, bridge and well.
  house(-.15,.5,1.8,1.15,.82,"#b7aa97","#72392e");
  box(1.6,.04,-.2,.85,.16,.72,"#b5a585");
  box(1.6,.20,-.2,.5,.45,.12,"#866044");
  // Trees across the village edge and meeting ground.
  [[-5,-3.2],[4.6,-3.3],[-4.8,.2],[4.6,2.8],[2.8,3.5],[-1.7,4.7],[.3,4.9]].forEach((p,i)=>{
    const y=terrainY(p[0],p[1]);cylinder(p[0],p[1],y,.12,.65,"#765b3b",7);cone(p[0],p[1],y+.35,.55,.95,i%2?"#596c43":"#68774d",8);
    cone(p[0],p[1],y+.82,.38,.68,"#798757",8);
  });
  // Low boundary walls around courtyards.
  [[-2.4,-1.6],[.7,-3.15],[2.05,-2.1]].forEach((p,i)=>{
    const x=p[0],z=p[1]+.8,y=terrainY(x,z);box(x,y,z,1.7,.22,.08,"#9f9382");
    box(x-0.81,y,z-.25,.08,.22,.58,"#9f9382");box(x+.81,y,z-.25,.08,.22,.58,"#9f9382");
  });
  // Wind-carved ridge silhouettes at the edge of the model.
  for(let i=0;i<8;i++){
    const x=-5.7+i*1.65,z=5.4,y=terrainY(x,z),h=.8+(i%3)*.42;
    tri([x-.8,y,z],[x,y+h,z+.3],[x+.7,y,z],shade(i%2?"#879171":"#91977b",i%3*4));
  }
  return {vertices:new Float32Array(vertices),colors:new Float32Array(colors),terrainY};
}
function initVillage3D(){
  const canvas=$("#village-canvas"), pins=$("#scene-pins"); if(!canvas||!pins)return;
  let gl;
  try{gl=canvas.getContext("webgl",{alpha:false,antialias:true})||canvas.getContext("experimental-webgl");}catch{}
  if(!gl){canvas.insertAdjacentHTML("afterend",'<p class="notice">此浏览器无法启动 WebGL；可使用 3D 村落右侧的节点列表继续浏览。</p>');return;}
  const geometry=createVillageGeometry();
  const vertexShaderSource="attribute vec3 aPosition;attribute vec3 aColor;uniform mat4 uMvp;varying vec3 vColor;void main(){gl_Position=uMvp*vec4(aPosition,1.0);vColor=aColor;}";
  const fragmentShaderSource="precision mediump float;varying vec3 vColor;void main(){gl_FragColor=vec4(vColor,1.0);}";
  const compile=(type,source)=>{const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);return sh;};
  const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertexShaderSource));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragmentShaderSource));gl.linkProgram(program);gl.useProgram(program);
  const vertexBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);gl.bufferData(gl.ARRAY_BUFFER,geometry.vertices,gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(program,"aPosition");gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
  const colorBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);gl.bufferData(gl.ARRAY_BUFFER,geometry.colors,gl.STATIC_DRAW);
  const color=gl.getAttribLocation(program,"aColor");gl.enableVertexAttribArray(color);gl.vertexAttribPointer(color,3,gl.FLOAT,false,0,0);
  const mvpLoc=gl.getUniformLocation(program,"uMvp");
  const nodes=[
    {name:"院落群",story:2,x:-1.2,z:-1.8,label:"01"}, {name:"黄土窑洞",story:1,x:-3.2,z:3.1,label:"02"},
    {name:"古戏台",story:8,x:-.15,z:.7,label:"03"}, {name:"田埂与梯田",story:34,x:4.3,z:-2.1,label:"04"},
    {name:"古井与水渠",story:35,x:1.6,z:-.2,label:"05"}, {name:"村口古树",story:6,x:-4.8,z:.2,label:"06"},
    {name:"石桥小溪",story:3,x:2.2,z:1.05,label:"07"}
  ];
  const view={yaw:-.73,pitch:.56,distance:18,drag:false,lastX:0,lastY:0,moved:false};
  const draw=()=>{
    if(!canvas.isConnected)return;
    const w=canvas.clientWidth,h=canvas.clientHeight,ratio=Math.min(window.devicePixelRatio||1,2),pw=Math.max(1,Math.floor(w*ratio)),ph=Math.max(1,Math.floor(h*ratio));
    if(canvas.width!==pw||canvas.height!==ph){canvas.width=pw;canvas.height=ph;}
    gl.viewport(0,0,pw,ph);gl.clearColor(.839,.871,.812,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);
    const eye=[Math.sin(view.yaw)*view.distance,view.pitch*view.distance*.78+3,Math.cos(view.yaw)*view.distance];
    const projection=matPerspective(Math.PI/4,w/h,.1,80), look=matLookAt(eye,[0,0,0],[0,1,0]),mvp=matMultiply(projection,look);
    gl.uniformMatrix4fv(mvpLoc,false,mvp);gl.drawArrays(gl.TRIANGLES,0,geometry.vertices.length/3);
    pins.innerHTML=nodes.map(n=>{
      const y=geometry.terrainY(n.x,n.z)+.75, c=transform4(mvp,[n.x,y,n.z,1]);
      if(c[3]<=0)return "";
      const x=(c[0]/c[3]*.5+.5)*w, py=(1-(c[1]/c[3]*.5+.5))*h;
      if(x<15||x>w-15||py<15||py>h-15)return "";
      return '<button class="scene-pin" data-hotspot="'+(Number(n.label)-1)+'" style="left:'+x+'px;top:'+py+'px" title="'+n.name+' · 打开相关故事">'+n.label+'</button>';
    }).join("");
  };
  canvas.addEventListener("pointerdown",e=>{view.drag=true;view.moved=false;view.lastX=e.clientX;view.lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener("pointermove",e=>{if(!view.drag)return;const dx=e.clientX-view.lastX,dy=e.clientY-view.lastY;if(Math.abs(dx)+Math.abs(dy)>2)view.moved=true;view.yaw-=dx*.008;view.pitch=Math.max(.18,Math.min(1.05,view.pitch+dy*.004));view.lastX=e.clientX;view.lastY=e.clientY;draw();});
  canvas.addEventListener("pointerup",()=>{view.drag=false;setTimeout(()=>view.moved=false,80);});
  canvas.addEventListener("wheel",e=>{e.preventDefault();view.distance=Math.max(11,Math.min(28,view.distance+Math.sign(e.deltaY)*.8));draw();},{passive:false});
  canvas.addEventListener("click",e=>{if(view.moved)return;const rect=canvas.getBoundingClientRect(),mx=e.clientX-rect.left,my=e.clientY-rect.top;let nearest=null,dist=28;for(const n of nodes){const c=transform4(matMultiply(matPerspective(Math.PI/4,canvas.clientWidth/canvas.clientHeight,.1,80),matLookAt([Math.sin(view.yaw)*view.distance,view.pitch*view.distance*.78+3,Math.cos(view.yaw)*view.distance],[0,0,0],[0,1,0])),[n.x,geometry.terrainY(n.x,n.z)+.75,n.z,1]);if(c[3]<=0)continue;const x=(c[0]/c[3]*.5+.5)*canvas.clientWidth,y=(1-(c[1]/c[3]*.5+.5))*canvas.clientHeight,d=Math.hypot(x-mx,y-my);if(d<dist){dist=d;nearest=n;}}if(nearest)routeTo("story/"+nearest.story);});
  scene3d={view,draw};
  draw();
}

function render(resetScroll = true) {
  const parts=location.hash.replace(/^#/,"").split("/");
  const page=parts[0]||"home";
  if(page!=="studio"){
    if(imagePreviewUrl){URL.revokeObjectURL(imagePreviewUrl);imagePreviewUrl=null;}
    if(recordedAudioUrl){URL.revokeObjectURL(recordedAudioUrl);recordedAudioUrl=null;}
    const player=$("#record-playback");if(player){player.pause();player.removeAttribute("src");player.load();player.hidden=true;}
  }
  if(page!=="studio"&&activeRecorder&&activeRecorder.state==="recording"){
    activeRecorder.onstop=null;activeRecorder.stop();activeMediaStream?.getTracks().forEach(track=>track.stop());activeRecorder=null;activeMediaStream=null;
  }
  const pages={home:homeView,map:mapView,archive:archiveView,gallery:galleryView,timeline:timelineView,voices:voicesView,routes:routesView,scene:sceneView,studio:studioView,saved:savedView,fieldguide:guideView};
  $$(".side-nav [data-nav]").forEach(a=>a.classList.toggle("is-active",a.dataset.nav===page||(page==="story"&&a.dataset.nav==="archive")));
  root.innerHTML=page==="story"?storyView(parts[1]):(pages[page]||homeView)();
  if(resetScroll)window.scrollTo(0,0);
  root.focus({preventScroll:true});
  if(page==="scene") initVillage3D();
  else scene3d=null;
  if(page==="studio") { renderDrafts(); attachImagePreview(); attachRecorder(); }
  if(page==="map") attachCityFilter();
  if(page==="voices") updateVoiceProgress();
}

function toggleSave(id) {
  const n=Number(id);
  saved=saved.includes(n)?saved.filter(x=>x!==n):[n,...saved];
  safeWrite("jinjian-saved",saved);
  $$('[data-save="'+n+'"]').forEach(button=>{
    button.classList.toggle("is-saved",saved.includes(n));
    if(button.classList.contains("heart")){button.textContent=saved.includes(n)?"♥":"♡";button.setAttribute("aria-label",saved.includes(n)?"取消收藏":"收藏");}
    else button.textContent=saved.includes(n)?"♥ 已收藏":"♡ 收藏档案";
  });
  toast(saved.includes(n)?"已加入我的收藏":"已从收藏中移除");
  if(location.hash==="#saved") render(false);
}
function playStory(id) {
  const s=stories.find(x=>x.id===Number(id)); if(!s) return;
  if(!("speechSynthesis" in window)){toast("当前浏览器不支持语音朗读");return;}
  if(speakingId===s.id&&speechSynthesis.speaking){speechSynthesis.cancel();speakingId=null;toast("已停止朗读");if(location.hash==="#voices")render(false);return;}
  speechSynthesis.cancel(); activeStory=s; speakingId=s.id;
  const text=longStory(s).join("。");
  const utterance=new SpeechSynthesisUtterance(text); utterance.lang="zh-CN"; utterance.rate=voiceRate;
  utterance.onend=()=>{speakingId=null;if(location.hash==="#voices")render(false);};
  utterance.onerror=()=>{speakingId=null;toast("语音播放已结束");};
  speechSynthesis.speak(utterance); toast("开始朗读："+s.title);
  if(location.hash==="#voices") render(false);
}
function updateVoiceProgress() {
  const bar=$("#voice-progress"); if(!bar)return;
  bar.style.width=window.speechSynthesis?.speaking?"68%":"0%";
  $("#voice-status").textContent=window.speechSynthesis?.speaking?"正在合成朗读":"准备就绪";
}
function renderDrafts() {
  const box=$("#draft-list"); if(!box)return;
  if(!drafts.length){box.innerHTML='<p class="micro">还没有保存的记忆线索。</p>';return;}
  box.innerHTML=drafts.map(d=>'<article class="draft-item"><strong>'+escapeHTML(d.title)+'</strong><p>'+escapeHTML(d.story.slice(0,100))+(d.story.length>100?"…":"")+'</p><small>'+escapeHTML(d.category)+' · '+escapeHTML(d.place||"地点待补充")+(d.period?" · "+escapeHTML(d.period):"")+' · '+escapeHTML(d.date)+'</small></article>').join("");
}
function attachImagePreview() {
  const input=$("#memory-image"), preview=$("#upload-preview"); if(!input||!preview)return;
  input.addEventListener("change",()=>{
    if(imagePreviewUrl){URL.revokeObjectURL(imagePreviewUrl);imagePreviewUrl=null;}
    preview.replaceChildren();
    const file=input.files&&input.files[0];
    if(!file){preview.textContent="支持 JPG / PNG；图片不会上传，草稿只存标题和文字。";return;}
    if(!file.type.startsWith("image/")){preview.textContent="这个文件无法作为图片预览，请选择 JPG 或 PNG 图片。";return;}
    preview.append(document.createTextNode("已选择："+file.name+" · 仅本机临时预览"));
    const image=document.createElement("img");imagePreviewUrl=URL.createObjectURL(file);image.src=imagePreviewUrl;image.alt="所选记忆照片预览";preview.append(image);
  });
}
function attachRecorder() {
  const button=$("#record-toggle"); if(!button)return;
  button.addEventListener("click",async()=>{
    const status=$("#record-status");
    if(activeRecorder&&activeRecorder.state==="recording"){
      activeRecorder.stop();button.textContent="● 开始录音";button.setAttribute("aria-pressed","false");
      if(status)status.textContent="录音已停止，正在准备本机预览…";
      return;
    }
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){if(status)status.textContent="当前浏览器不支持本地录音；可继续提交文字线索。";return;}
    try{
      const stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(!button.isConnected){stream.getTracks().forEach(track=>track.stop());return;}
      activeMediaStream=stream;const recorder=new MediaRecorder(stream),chunks=[];activeRecorder=recorder;
      recorder.addEventListener("dataavailable",event=>{if(event.data&&event.data.size)chunks.push(event.data);});
      recorder.addEventListener("stop",()=>{
        stream.getTracks().forEach(track=>track.stop());activeMediaStream=null;activeRecorder=null;
        if(!button.isConnected||!location.hash.startsWith("#studio"))return;
        if(recordedAudioUrl)URL.revokeObjectURL(recordedAudioUrl);
        const blob=new Blob(chunks,{type:recorder.mimeType||"audio/webm"});recordedAudioUrl=URL.createObjectURL(blob);
        const player=$("#record-playback"),message=$("#record-status");
        if(player&&player.isConnected){player.src=recordedAudioUrl;player.hidden=false;}
        if(message&&message.isConnected)message.textContent="仅本机试听；离开此页后录音不会自动保存或上传。";
      });
      recorder.start();button.textContent="■ 停止录音";button.setAttribute("aria-pressed","true");
      if(status)status.textContent="正在本机录音，请在讲述者同意后开始。";
    }catch{
      activeRecorder=null;activeMediaStream?.getTracks().forEach(track=>track.stop());activeMediaStream=null;
      if(status)status.textContent="没有取得麦克风权限或当前页面不支持录音；文字草稿仍可使用。";
    }
  });
}
function openSearch() {
  const overlay=document.createElement("div"); overlay.className="search-overlay"; overlay.id="search-overlay";
  overlay.innerHTML='<div class="search-panel"><div class="eyebrow">SEARCH THE ARCHIVE</div><p class="muted">搜索故事、城市、手艺和生活主题。按 Esc 或点击外侧关闭。</p><input id="global-search-input" type="search" placeholder="试试：晋中、剪纸、田野…" autofocus><div id="global-search-results" class="search-results"></div></div>';
  document.body.append(overlay); const input=$("#global-search-input"); input.focus();
  const update=()=>{const term=input.value.trim().toLowerCase();$("#global-search-results").innerHTML=term?stories.filter(s=>[s.title,s.city,s.summary,s.tag,s.category].join(" ").toLowerCase().includes(term)).slice(0,9).map(s=>'<div class="search-result" data-search-story="'+s.id+'"><strong>'+escapeHTML(s.title)+'</strong><span class="micro"> · '+escapeHTML(s.city)+' · '+escapeHTML(s.category)+'</span></div>').join("")||'<p class="micro">没有找到相关线索。</p>':"";};
  input.addEventListener("input",update); overlay.addEventListener("click",e=>{if(e.target===overlay)overlay.remove();});
}
function attachCityFilter() {
  const input=$("#city-filter"); if(!input)return;
  input.addEventListener("input",()=>$$(".city-button").forEach(b=>b.hidden=!b.dataset.city.includes(input.value.trim())));
}
function setCity(name) {
  const city=cities.find(c=>c.name===name); if(!city)return;
  currentCity=city;
  const iframe=$("#real-map"); if(iframe)iframe.src=cityMapUrl(city);
  const link=$("#open-osm"); if(link)link.href="https://www.openstreetmap.org/?mlat="+city.lat+"&mlon="+city.lon+"#map=10/"+city.lat+"/"+city.lon;
  $$(".city-button").forEach(b=>b.classList.toggle("is-active",b.dataset.city===name));
  const side=$(".map-side"); if(side){side.querySelector("h2").textContent=city.name+" · "+city.tag; side.querySelector(":scope > p").textContent=city.intro;}
  const selected=stories.find(s=>s.city===city.name)||stories[0];
  const regional=$(".regional-story");
  if(regional){regional.querySelector("h3").textContent=selected.title;regional.querySelector("p").textContent=selected.summary;regional.querySelector("button").dataset.story=selected.id;}
  const legend=$$(".map-legend span");if(legend[0])legend[0].textContent="当前城市中心";
}

document.addEventListener("click",event=>{
  const nav=event.target.closest("[data-route]"); if(nav){event.preventDefault();if(nav.dataset.cityTarget)currentCity=cities.find(c=>c.name===nav.dataset.cityTarget)||null;routeTo(nav.dataset.route);return;}
  const card=event.target.closest("[data-story]"); const save=event.target.closest("[data-save]");
  if(save){event.stopPropagation();toggleSave(save.dataset.save);return;}
  if(card){if(event.target.closest("button"))return;routeTo("story/"+card.dataset.story);return;}
  const searchStory=event.target.closest("[data-search-story]"); if(searchStory){const id=searchStory.dataset.searchStory;$("#search-overlay")?.remove();routeTo("story/"+id);return;}
  const galleryImage=event.target.closest("[data-gallery-item]");
  if(galleryImage){
    const tile=Number(galleryImage.dataset.galleryIndex),col=tile%4,row=Math.floor(tile/4),bx=["0%","33.333%","66.666%","100%"][col],by=["0%","50%","100%"][row];
    const image=new Map([["village","01"],["field","02"],["craft","03"],["festival","04"],["food","05"]]).get(galleryImage.dataset.gallerySheet);
    const overlay=document.createElement("div");overlay.className="search-overlay";overlay.id="gallery-overlay";
    overlay.innerHTML='<div class="gallery-lightbox" role="dialog" aria-modal="true" aria-label="'+escapeHTML(galleryImage.dataset.galleryTitle)+'"><div class="gallery-lightbox-head"><div><div class="eyebrow">'+escapeHTML(galleryImage.dataset.galleryGroup)+' · GENERATED SCENE</div><h2>'+escapeHTML(galleryImage.dataset.galleryTitle)+'</h2></div><button class="button button-small" data-close-gallery aria-label="关闭图像">关闭 ×</button></div><div class="gallery-lightbox-image" role="img" aria-label="'+escapeHTML(galleryImage.dataset.galleryTitle)+'" style="--bx:'+bx+';--by:'+by+';background-image:url(assets/illustration-sheets/sheet-'+image+'.png)"></div><p>原创生成图像 · 文化场景想象 · 非实地照片</p></div>';
    document.body.append(overlay);overlay.addEventListener("click",e=>{if(e.target===overlay||e.target.closest("[data-close-gallery]"))overlay.remove();});return;
  }
  const galleryFilter=event.target.closest("[data-gallery-filter]");
  if(galleryFilter){currentGalleryGroup=galleryFilter.dataset.galleryFilter;galleryPage=1;render(false);return;}
  const galleryMove=event.target.closest("[data-gallery-page]");
  if(galleryMove){const count=currentGalleryGroup==="全部插图"?60:12;galleryPage=Math.max(1,Math.min(Math.ceil(count/24),galleryPage+Number(galleryMove.dataset.galleryPage)));render(false);return;}
  const city=event.target.closest("[data-city]"); if(city){setCity(city.dataset.city);return;}
  if(event.target.closest("[data-city-overview]")){currentCity=null;const frame=$("#real-map");if(frame)frame.src=cityMapUrl(null);const h=$(".map-side h2");if(h)h.textContent="山西全省 · 三晋大地";const p=$(".map-side > p");if(p)p.textContent="全省真实地图概览。底图可缩放、拖动；11 个城市入口可逐一定位。";$$(".city-button").forEach(b=>b.classList.remove("is-active"));const legend=$$(".map-legend span");if(legend[0])legend[0].textContent="山西全省范围";const link=$("#open-osm");if(link)link.href="https://www.openstreetmap.org/#map=7/37.7/112.4";const story=$(".regional-story");if(story){story.querySelector("h3").textContent="山河之间的村落记忆";story.querySelector("p").textContent="在城市级入口下，继续补充经过授权的村史、乡音、手艺与田野记忆。";story.querySelector("button").dataset.story="1";}return;}
  const cat=event.target.closest("[data-category]"); if(cat){currentCategory=cat.dataset.category;archivePage=1;render(false);return;}
  const page=event.target.closest("[data-page]");if(page){archivePage+=Number(page.dataset.page);render(false);return;}
  const play=event.target.closest("[data-play]");if(play){playStory(play.dataset.play);return;}
  const selectVoice=event.target.closest("[data-select-voice]");if(selectVoice){activeStory=stories.find(s=>s.id===Number(selectVoice.dataset.selectVoice));routeTo("voices");return;}
  const rate=event.target.closest("[data-rate]");if(rate){voiceRate=Number(rate.dataset.rate);render(false);return;}
  if(event.target.closest("[data-voice-next]")||event.target.closest("[data-voice-prev]")){const i=stories.indexOf(activeStory||stories[0]);activeStory=stories[(i+(event.target.closest("[data-voice-next]")?1:-1)+stories.length)%stories.length];routeTo("voices");return;}
  const routeCard=event.target.closest("[data-route-index]");if(routeCard){currentRoute=Number(routeCard.dataset.routeIndex);render(false);return;}
  const routeMap=event.target.closest("[data-route-map]");if(routeMap){currentCity=cities.find(c=>c.name===routeMap.dataset.routeMap)||cities[0];routeTo("map");return;}
  if(event.target.closest("[data-route-print]")){window.print();return;}
  if(event.target.closest("[data-export-drafts]")){
    if(!drafts.length){toast("还没有可导出的本机草稿");return;}
    const blob=new Blob([JSON.stringify(drafts,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="jinjian-memory-notes.json";link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);toast("草稿 JSON 已导出");return;
  }
  const zoom=event.target.closest("[data-zoom]");if(zoom){window.dispatchEvent(new CustomEvent("scenezoom",{detail:zoom.dataset.zoom}));return;}
  if(event.target.closest("[data-scene-reset]")){window.dispatchEvent(new Event("scenereset"));return;}
  const hotspot=event.target.closest("[data-hotspot]");if(hotspot){const ids=[2,1,8,34,35,6,3];routeTo("story/"+ids[Number(hotspot.dataset.hotspot)]);return;}
  const share=event.target.closest("[data-share]");if(share){const s=stories.find(x=>x.id===Number(share.dataset.share));navigator.clipboard?.writeText("晋见山乡 · "+s.title+"："+s.summary).then(()=>toast("故事线索已复制")).catch(()=>toast("记下标题即可继续分享"));return;}
  if(event.target.closest("#global-search")){openSearch();return;}
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){$("#search-overlay")?.remove();$("#gallery-overlay")?.remove();}
  const storyCard=event.target.closest(".story-card,.mini-card,.featured-story,.timeline-card");
  if(storyCard&&(event.key==="Enter"||event.key===" ")){event.preventDefault();routeTo("story/"+storyCard.dataset.story);}
});
document.addEventListener("input",event=>{
  if(event.target.id==="story-search"){
    searchTerm=event.target.value;archivePage=1;
    const filtered=stories.filter(s=>(currentCategory==="全部"||s.category===currentCategory)&&(!searchTerm||[s.title,s.summary,s.city,s.tag].join(" ").toLowerCase().includes(searchTerm.toLowerCase())));
    const grid=$(".story-grid"),pages=Math.max(1,Math.ceil(filtered.length/12));
    if(grid)grid.innerHTML=filtered.slice(0,12).map(storyCard).join("")||'<p class="muted">没有找到匹配的故事，请试试其他关键词。</p>';
    const pagination=$(".pagination");if(pagination)pagination.innerHTML='<button data-page="-1">上一页</button><span>第 1 / '+pages+' 页 · '+filtered.length+' 条线索</span><button data-page="1">下一页</button>';
  }
  if(event.target.id==="year-range"){
    timelineYear=Number(event.target.value);const label=$("#year-label");if(label)label.textContent=timelineYear;
    const filtered=stories.filter(s=>s.year<=timelineYear).sort((a,b)=>a.year-b.year).slice(0,12),grid=$(".timeline-events");
    if(grid)grid.innerHTML=filtered.map(s=>'<article class="timeline-card" data-story="'+s.id+'" tabindex="0">'+artTile(s,"",s.category)+'<div class="timeline-card-body"><small>示意年代 · '+s.year+'</small><strong>'+escapeHTML(s.title)+'</strong><p>'+escapeHTML(s.city)+' · '+escapeHTML(s.tag)+'</p></div></article>').join("");
  }
});
document.addEventListener("submit",event=>{
  if(event.target.id!=="memory-form")return;
  event.preventDefault();const fd=new FormData(event.target);
  const title=String(fd.get("title")||"").trim(), story=String(fd.get("story")||"").trim();
  if(!title||!story){$("#form-message").textContent="请先填写标题和记忆正文。";return;}
  drafts.unshift({title,story:story.slice(0,2000),category:String(fd.get("category")),place:String(fd.get("place")||""),period:String(fd.get("period")||""),date:new Date().toLocaleDateString("zh-CN")});
  drafts=drafts.slice(0,30);safeWrite("jinjian-drafts",drafts);event.target.reset();
  if(imagePreviewUrl){URL.revokeObjectURL(imagePreviewUrl);imagePreviewUrl=null;}
  const preview=$("#upload-preview");if(preview)preview.textContent="支持 JPG / PNG；图片不会上传，草稿只存标题和文字。";
  if(recordedAudioUrl){URL.revokeObjectURL(recordedAudioUrl);recordedAudioUrl=null;}
  const player=$("#record-playback");if(player){player.pause();player.removeAttribute("src");player.load();player.hidden=true;}
  renderDrafts();$("#form-message").textContent="文字已保存到本机；照片和录音仅供临时预览，没有上传。";toast("这条记忆已保存为本地草稿");
});
window.addEventListener("hashchange",render);
window.addEventListener("sceneresize",()=>scene3d?.draw());
window.addEventListener("scenezoom",event=>{if(!scene3d)return;scene3d.view.distance=Math.max(11,Math.min(28,scene3d.view.distance+(event.detail==="in"?-1.5:1.5)));scene3d.draw();});
window.addEventListener("scenereset",()=>{if(!scene3d)return;scene3d.view.yaw=-.73;scene3d.view.pitch=.56;scene3d.view.distance=18;scene3d.draw();});
window.addEventListener("resize",()=>{if(location.hash.startsWith("#scene"))window.dispatchEvent(new Event("sceneresize"));});
render();
