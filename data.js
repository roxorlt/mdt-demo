// 固定演示数据（确定性伪随机，种子固定）
(function(){
/* ============================================================
 * STORE_METRICS — 单店示意数据（杭州星驰西湖店）
 * 全部标注「示意」，可整对象替换为真实 benchmark。
 * 口径示意：月线索~450、日新增~12–18、线索成交~3%、到店成交~35%、
 * 日直播1–3场（~40/月）、场观600–2500、日播放约数千。
 * ============================================================ */
const STORE_METRICS={
  label:"示意",
  storeId:13,
  storeName:"杭州星驰西湖店",
  region:"华东",
  // —— 驾驶舱 KPI（本月）——
  accounts:7,
  monthPlays:168000,       // 示意：约 16.8 万，日均 ~5.6k
  monthPlaysDisplay:"16.8", // 展示值（单位：万）
  monthInter:5200,         // 示意：互动次数
  monthLeads:450,          // 示意：本月线索
  leadRate:"3.1",          // 示意：留资率 %
  leadToDeal:3.0,          // 示意：线索→成交 %
  visitToDeal:35,          // 示意：到店→成交 %
  visitConversion:12.8,    // 示意：线索→到店 %（线索页「本月到店转化」）
  // —— 线索页 KPI ——
  todayNewLeads:15,        // 示意：今日新增（12–18）
  yesterdayNewLeads:13,    // 示意
  aiReplies:428,           // 示意：AI 自动回复次数
  pendingFollow:8,         // 示意：待跟进
  overdueFollow:2,         // 示意：超 2 小时未跟进
  leadsListTotal:450,      // 示意：共 X 条
  leadsListShow:24,        // 列表展示最近 N 条
  // —— 近 14 天趋势（确定性，日播放 3.5k–7.2k，日线索 12–18）——
  trend14:[
    {d:"10-01",play:4200,leads:12},{d:"10-02",play:3800,leads:14},{d:"10-03",play:5100,leads:13},
    {d:"10-04",play:6200,leads:16},{d:"10-05",play:4800,leads:15},{d:"10-06",play:3500,leads:12},
    {d:"10-07",play:7200,leads:18},{d:"10-08",play:5600,leads:14},{d:"10-09",play:4900,leads:13},
    {d:"10-10",play:6100,leads:17},{d:"10-11",play:6800,leads:16},{d:"10-12",play:4500,leads:12},
    {d:"10-13",play:5200,leads:13},{d:"10-14",play:5900,leads:15}
  ],
  // —— 直播（示意）——
  monthLives:24,           // 示意：10-01 至 10-14 共 24 场（日 1–3，月约 40 场）
  liveOnline:1680,         // 示意：当前场在线（600–2500）
  livePeak:2420,           // 示意：峰值在线
  // —— PK（示意）：华东大区 10 家参赛门店，本店居中（第 4）——
  pkRegionRank:4,          // 由 pkBoard 计算后校验
  pkRegionTotal:10,
  pkJoinRank:9,            // 示意：加入门店通时排名
  // pkBoard / pkRegionRank 由门店矩阵数据计算（见文件末尾），不再单独写死
  pkBoard:[],
  pkWeekRank:[{w:"9月第1周",r:9},{w:"9月第3周",r:7},{w:"10月第1周",r:5},{w:"10月第2周",r:4}],
  // —— 任务（示意）：结果仅绝对数量，无百分比 ——
  dailyTasks:[
    {title:"发一条新车视频",detail:"星驰 X5 · 30 秒空间实测",done:true,result:"播放 6,240 次 · 带来 4 条线索"},
    {title:"开一场晚上的直播",detail:"19:30–21:00 · 置换补贴专场",done:true,result:"场观 1,860 人 · 带来 7 条线索"},
    {title:"回完昨天的私信",detail:"昨日私信 23 条",done:true,result:"回复 23 条 · 约到店 3 组"},
    {title:"跟进 2 条超时线索",detail:"超 2 小时未跟进",done:false,result:null}
  ],
  monthSummary:{days:14,videos:31,lives:42,viewers:58400,leads:450,visits:58,deals:14,rankFrom:9,rankTo:4},
  monthTaskLeadsBonus:48,  // 示意：本月任务带来 +48 条线索
  // —— 加入门店通之前（示意，口播 v4 前后对比用；非真实结果、非承诺）——
  before:{label:"示意",dailyLeads:7,monthLeads:210,weekVideos:2,weekLives:2,liveMinutes:40,replyHours:6,pkRank:9}
};
window.STORE_METRICS=STORE_METRICS;

let s=20261014;const R=()=>(s=(s*1103515245+12345)%2147483648)/2147483648;
const ri=(a,b)=>a+Math.floor(R()*(b-a+1));
const regions={华北:[["北京","亦庄"],["北京","望京"],["天津","滨海"],["石家庄","裕华"],["济南","历下"],["青岛","崂山"],["太原","长风"],["呼和浩特","赛罕"],["唐山","路北"],["烟台","芝罘"]],
华东:[["上海","浦东"],["上海","闵行"],["杭州","西湖"],["杭州","滨江"],["宁波","鄞州"],["南京","河西"],["苏州","园区"],["无锡","太湖"],["合肥","政务区"],["福州","仓山"],["温州","瓯海"],["常州","武进"]],
华南:[["广州","天河"],["广州","番禺"],["深圳","南山"],["深圳","龙岗"],["东莞","松山湖"],["佛山","顺德"],["厦门","思明"],["南宁","青秀"],["海口","美兰"],["珠海","香洲"]],
西南:[["成都","高新"],["成都","武侯"],["重庆","渝北"],["重庆","九龙坡"],["昆明","呈贡"],["贵阳","观山湖"],["绵阳","涪城"],["拉萨","城关"]],
华中:[["武汉","光谷"],["武汉","汉阳"],["长沙","岳麓"],["长沙","星沙"],["郑州","郑东"],["南昌","红谷滩"],["宜昌","西陵"],["洛阳","洛龙"]]};
const stores=[];let id=1,acc=0;const plats=[];for(let i=0;i<312;i++)plats.push(i<187?"抖音":i<265?"快手":"小红书");for(let i=311;i>0;i--){const j=Math.floor(R()*(i+1));[plats[i],plats[j]]=[plats[j],plats[i]]}
const lag=new Set([7,18,30,37,44,24]);
for(const [rg,list] of Object.entries(regions))for(const [c,n] of list){
 const na=id%2?7:6;const accounts=[];
 for(let k=0;k<na;k++){const p=plats[acc++];accounts.push({name:`${c.slice(0,2)}星驰${n}${["官方","销售顾问A","销售顾问B","展厅直播","新车速递","售后小助手","车主俱乐部"][k]}`,plat:p,fans:ri(3,180)*1000+ri(0,999),posts:ri(2,12)})}
 const bad=lag.has(id);
 stores.push({id,region:rg,city:c,name:`${c}星驰${n}店`,accounts,fans:accounts.reduce((a,b)=>a+b.fans,0),
  week:bad?ri(0,3):ri(8,32),leads:bad?ri(18,45):ri(90,260),plays:bad?ri(40,160)*1e4:ri(120,520)*1e4,health:bad?ri(38,58):ri(72,97)});id++}
// 固定前三
const f=n=>stores.find(x=>x.name===n);
const pk=[["杭州星驰西湖店",98620],["深圳星驰南山店",71240],["成都星驰高新店",68910],["上海星驰浦东店",61350],["武汉星驰光谷店",58770],["广州星驰天河店",55120],["北京星驰望京店",52480],["南京星驰河西店",49960],["重庆星驰渝北店",47310],["长沙星驰岳麓店",44090]];
const leadSrc=["抖音评论","抖音私信","抖音直播弹幕","快手私信","快手直播弹幕","小红书评论","小红书私信"];
const cars=["星驰 S7","星驰 X5","星驰 E3"],sur="张李王刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧";
const budgets=["12-15万","15-18万","18-22万","22-26万","10-13万"],lv=["A 高意向","B 中意向","C 待培育"],st=["待跟进","跟进中","已到店","已成交","战败"];
const tags=[["询底价","想试驾"],["置换需求","关注续航"],["分期咨询","对比竞品"],["关注保值率","家庭用车"],["想试驾","周末到店"],["询优惠","首购"],["关注智驾","询配置"]];
const qs=["{c}落地多少钱？本地有现车吗","{c}最近有啥优惠，能分期吗","想周末去店里试驾{c}，需要预约吗","我旧车想置换{c}，补贴多少","{c}冬天续航掉多少，有充电桩送吗","{c}和同级合资比，保值怎么样","直播间说的{c}限时价还有吗"];
const leads=[];const base=new Date("2026-10-14T13:58:00+08:00").getTime();
for(let i=0;i<32;i++){const store=(i%5==0||i%6==0)?stores[12]:stores[(i*7+3)%48];const car=cars[i%3==0?1:i%3==1?0:2];const t=new Date(base-i*i*1100000-i*900000);
 const g=i%5===1?"女士":"先生";const L=i%4===0?0:i%4===3?2:1;const S=i<6?0:st[(i*3)%5]?((i*3)%5):1;
 leads.push({id:"XS"+(26101400+i*37),name:sur[i%sur.length]+g,phone:"1"+[38,39,57,86,77,88,35][i%7]+"****"+String(1000+((i*7919)%9000)).slice(0,4),
 src:leadSrc[i%7],car,budget:budgets[i%5],level:lv[L],tags:tags[i%7],owner:"销售顾问"+"ABCDEF"[i%6],status:st[S],store:store.name,region:store.region,
 time:`${t.getMonth()+1}-${String(t.getDate()).padStart(2,"0")} ${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`,q:qs[i%7].replace("{c}",car)})}

/* 西湖店列表：最近 N 条，状态与 STORE_METRICS 今日/待跟进等对齐（示意） */
const xihu=stores.find(x=>x.id===STORE_METRICS.storeId);
const storeLeads=[];
const N=STORE_METRICS.leadsListShow;
/* status plan: 8 待跟进（前 2 条标为超 2h，时间压到上午）, 其余分布 */
const statusPlan=[];
for(let i=0;i<8;i++)statusPlan.push("待跟进");
for(let i=0;i<6;i++)statusPlan.push("跟进中");
for(let i=0;i<5;i++)statusPlan.push("已到店");
for(let i=0;i<3;i++)statusPlan.push("已成交");
for(let i=0;i<2;i++)statusPlan.push("战败");
while(statusPlan.length<N)statusPlan.push("跟进中");
for(let i=0;i<N;i++){
  const car=cars[i%3];const g=i%5===1?"女士":"先生";
  const L=i%4===0?0:i%4===3?2:1;
  let t;
  if(i<STORE_METRICS.todayNewLeads){
    /* 今日：前 overdueFollow 条放在 10:00 前（超 2h，相对演示时刻 14:00） */
    const hour=i<STORE_METRICS.overdueFollow?9+i:12+((i*3)%4);
    const min=(i*17)%60;
    t=`10-14 ${String(hour).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }else if(i<STORE_METRICS.todayNewLeads+4){
    const hour=10+((i*5)%8),min=(i*13)%60;
    t=`10-13 ${String(hour).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }else{
    const day=12-((i-STORE_METRICS.todayNewLeads-4)%8);
    const hour=10+((i*3)%9),min=(i*19)%60;
    t=`10-${String(Math.max(1,day)).padStart(2,"0")} ${String(hour).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }
  storeLeads.push({id:"XS"+(26102000+i*41),name:sur[i%sur.length]+g,phone:"1"+[38,39,57,86,77,88,35][i%7]+"****"+String(1000+((i*7919)%9000)).slice(0,4),
   src:leadSrc[i%7],car,budget:budgets[i%5],level:lv[L],tags:tags[i%7],owner:"销售顾问"+"ABCDEF"[i%6],status:statusPlan[i],
   store:xihu.name,region:xihu.region,time:t,q:qs[i%7].replace("{c}",car)});
}
/* 覆盖门店自身 leads/plays 示意，与 STORE_METRICS 一致（不影响其它门店） */
xihu.leads=STORE_METRICS.monthLeads;
xihu.plays=STORE_METRICS.monthPlays;

/* 华东大区直播 PK（店长视角）——榜单直接从门店矩阵数据计算，按「本月线索」排序。
 * 为保持「西湖店第 4、距第 3 名差 12 条线索」，调高前三名对手店的本月线索（门店矩阵同步生效）：
 * 浦东 169→512、河西 233→487、园区 139→462。 */
const PK_EAST_LEADS={"上海星驰浦东店":512,"南京星驰河西店":487,"苏州星驰园区店":462};
const PK_EAST=["上海星驰浦东店","南京星驰河西店","苏州星驰园区店","杭州星驰西湖店","宁波星驰鄞州店","杭州星驰滨江店","合肥星驰政务区店","无锡星驰太湖店","上海星驰闵行店","福州星驰仓山店"];
const PK_LIVES=[27,26,25,24,21,20,18,16,14,6]; // 按名次分配的本月直播场次（示意）；西湖店 24 场与 monthLives 一致
for(const [n,v] of Object.entries(PK_EAST_LEADS))f(n).leads=v;
STORE_METRICS.pkBoard=PK_EAST.map(f).sort((a,b)=>b.leads-a.leads).map((x,i)=>({n:x.name,leads:x.leads,lives:PK_LIVES[i],id:x.id}));
STORE_METRICS.pkRegionTotal=STORE_METRICS.pkBoard.length;
STORE_METRICS.pkRegionRank=STORE_METRICS.pkBoard.findIndex(x=>x.n==xihu.name)+1;

const trend=[];for(let d=1;d<=14;d++)trend.push({d:`10-${String(d).padStart(2,"0")}`,play:Math.round(6.2e6+d*2.6e5+Math.sin(d/1.6)*9e5+(d==4?1.8e6:0)+(d==11?1.5e6:0)),leads:Math.round(360+d*11+Math.sin(d/1.4)*60+(d==4?120:0)+(d==11?95:0))});
window.DB={stores,pk,leads,trend,storeLeads,kpi:{stores:48,accounts:312,plays:"1.2",inter:"380",leads:stores.reduce((a,x)=>a+x.leads,0),rate:"3.1"},STORE_METRICS};
})();
