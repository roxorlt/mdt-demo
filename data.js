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
  // —— 西湖店每日线索见下方 XIHU_DAILY（8-01 至 10-14，近 30 天合计 450）——
  // —— 直播（示意）——
  lives30:40,              // 示意：近 30 天直播 40 场（日 1–3 场）——全站西湖店直播场次唯一来源
  viewers30:58400,         // 示意：近 30 天直播观看人次（场均 1,460，在 600–2,500 内）
  posts30:64,posts14:31,   // 示意：近 30 天发布 64 条；近两周 31 条（案例口径）
  week:7,                  // 示意：本周（10-12 至 10-14）发布
  // —— PK（示意）：华东大区 10 家参赛门店，本店居中（第 4）——
  pkRegionRank:4,          // 由 pkBoard 计算后校验
  pkRegionTotal:10,
  pkJoinRank:9,            // 示意：加入门店通时排名
  // pkBoard / pkRegionRank 由门店矩阵数据计算（见文件末尾），不再单独写死
  pkBoard:[],
  pkWeekRank:[{w:"9月第1周",r:9},{w:"9月第3周",r:7},{w:"10月第1周",r:5},{w:"10月第2周",r:4}],
  // —— 任务（示意）：结果仅绝对数量，无百分比 ——
  // 全店今日任务表（唯一来源）：任务页 / 驾驶舱 / 手机工作台都从这里取。status: done 已完成 · todo 待完成 · later 未开始（演示时刻 14:00）
  dailyTasks:[
    {title:"发一条新车视频",detail:"星驰 X5 · 30 秒空间实测",owner:"新媒体专员",status:"done",result:"播放 6,240 次 · 带来 4 条线索"},
    {title:"开一场晚上的直播",detail:"19:30–21:00 · 置换补贴专场",owner:"新媒体专员",status:"later",start:"19:30",result:null},
    {title:"回完昨天的私信",detail:"昨日私信 23 条",owner:"新媒体专员",status:"done",result:"回复 23 条 · 约到店 3 组"},
    {title:"跟进超时线索",detail:"超 2 小时未跟进",owner:"销售顾问",status:"todo",result:null}
  ],
  monthSummary:{visits:58,deals:14,rankFrom:9}, // 近 30 天到店 / 成交（案例口径）；线索、直播、观看、发布从门店字段取
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
    const hour=i<STORE_METRICS.overdueFollow?9+i:12+((i*3)%2); // 演示时刻 14:00 之前
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
for(const [n,v] of Object.entries(PK_EAST_LEADS))f(n).leads=v;

/* ============================================================
 * 第四轮：全站口径「近 30 天」= 9-15 至 10-14（演示时刻 10-14 14:00）。
 * 每店每日线索 daily 覆盖 8-01 至 10-14（75 天），近 30 天相加 = 门店矩阵线索数；
 * 页面上所有汇总、排名、比率都由下列门店字段计算，不写死。
 * ============================================================ */
const DEMO_NOW={md:"10-14",hm:"14:00",label:"2026-10-14 14:00",weekday:"周三"};
const DAYS=[];for(let i=0;i<75;i++){const d=new Date(Date.UTC(2026,7,1)+i*864e5);DAYS.push(String(d.getUTCMonth()+1).padStart(2,"0")+"-"+String(d.getUTCDate()).padStart(2,"0"))}
const di=md=>DAYS.indexOf(md),W0=di("09-15"),WN=DAYS.length; // 近 30 天 = DAYS[W0..74]
const WIN=DAYS.slice(W0);
const hsh=(a,b)=>(((a*2654435761)^(b*40503+b*b*977))>>>0)%1000/1000;
const jt=(id,i)=>0.85+0.3*hsh(id,i);
/* 按比例缩放 raw，使 [from,to) 区间的整数和恰好等于 total（同一系数作用于全部天） */
function fitSum(raw,total,from=0,to=raw.length){const S=raw.slice(from,to).reduce((a,b)=>a+b,0)||1,k=total/S;const o=raw.map(v=>Math.max(0,Math.round(v*k)));
  let d=total-o.slice(from,to).reduce((a,b)=>a+b,0),i=to-1;while(d!==0){if(d>0||o[i]>0){o[i]+=Math.sign(d);d-=Math.sign(d)}i=i-1<from?to-1:i-1}return o}
const GW_FROM=di("10-01"),GW_TO=di("10-07"),GW_BOOST=1.4;
/* ============================================================
 * 第五轮：西湖店按周爆发（案例口径：每天 7 条 → 15 条左右、近 30 天 450、华东名次 9→7→5→4）
 * 周 = 自接入日 9-01 起每 7 天一段；第 7 周（10-13 至 10-14）为进行中。
 * 华东名次 = 该周 10 家参赛门店「每日线索之和」排序后西湖店的名次（页面显示也由此计算）。
 * ============================================================ */
const WEEKS=[["09-01","09-07"],["09-08","09-14"],["09-15","09-21"],["09-22","09-28"],["09-29","10-05"],["10-06","10-12"],["10-13","10-14"]];
/* 西湖店：8 月（接入前）每天约 7 条、合计 210；9-01 接入后逐周上涨 */
const XIHU_WEEKS=[[7,6,8,7,7,6,8],[8,8,9,9,9,10,10],[10,11,11,11,12,12,13],[15,15,16,15,16,16,17],[15,16,17,16,17,17,16],[17,16,18,17,16,17,17],[13,15]];
const XIHU_DAILY=[...fitSum(Array.from({length:31},(_,i)=>7*jt(13,i)),210),...XIHU_WEEKS.flat()];
/* 华东其余 9 家参赛门店每周线索（周 1–7）。周 3–7 之和 = 该店近 30 天线索（与第四轮相同，未改总数）；
 * 周 1–2（9-01 至 9-14，近 30 天之前的历史周）按「9 月上旬新车上市补贴档期」调高，使西湖店接入首周排第 9、次周第 7；
 * 滨江店 9-15 至 9-21 有一周集中交付活动（81 条），使西湖店该周排第 5；其后西湖店稳定第 4。 */
const EAST_WEEKS={"上海星驰浦东店":[58,80,98,118,128,130,38],"南京星驰河西店":[62,84,95,114,122,124,32],"苏州星驰园区店":[55,72,82,112,116,121,31],
  "杭州星驰滨江店":[57,70,81,22,22,23,8],"福州星驰仓山店":[54,68,30,30,33,40,13],"宁波星驰鄞州店":[53,66,24,25,30,27,10],
  "合肥星驰政务区店":[52,58,23,23,30,26,8],"上海星驰闵行店":[51,55,21,21,28,24,5],"无锡星驰太湖店":[7,7,7,7,8,10,4]};
/* 华东前三 8 月按原水平（浦东 169、河西 233、园区 139 / 30 天），9 月起按上表 */
const ORIG={"上海星驰浦东店":169,"南京星驰河西店":233,"苏州星驰园区店":139};
/* 西湖店每日发布（9-15 至 10-14）：9-15 至 9-30 共 33 条，近 14 天（10-01 至 10-14）31 条，其中本周 10-12 至 10-14 共 7 条；近 30 天 64 条 */
const XIHU_POSTS=[2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2, 2,3,2,2,2,2,2,2,2,2,3, 2,3,2];
const sumR=(x,a,b)=>x.daily.slice(di(a),di(b)+1).reduce((p,q)=>p+q,0);
const SINCE={47:"09-26",48:"10-09"};
for(const x of stores){
  x.since=SINCE[x.id]||"05-01";
  if(x.id===STORE_METRICS.storeId){x.daily=XIHU_DAILY.slice();x.week=STORE_METRICS.week}
  else{const r0=ORIG[x.name]?ORIG[x.name]/x.leads:1,a=di("09-07"),b=di("09-21"),s0=di(x.since);
    const raw=DAYS.map((_,i)=>i<s0?0:(i<=a?r0:i>=b?1:r0+(1-r0)*(i-a)/(b-a))*jt(x.id,i)*(i>=GW_FROM&&i<=GW_TO?GW_BOOST:1));
    x.daily=fitSum(raw,x.leads,W0,WN)}
  if(EAST_WEEKS[x.name]){const T=EAST_WEEKS[x.name];if(T.slice(2).reduce((p,q)=>p+q,0)!==x.leads)console.error("周合计≠近 30 天线索",x.name);
    WEEKS.forEach(([a,b],k)=>{const i0=di(a),i1=di(b)+1;const seg=fitSum(DAYS.slice(i0,i1).map((_,j)=>jt(x.id,i0+j)*(i0+j>=GW_FROM&&i0+j<=GW_TO?GW_BOOST:1)),T[k]);seg.forEach((v,j)=>x.daily[i0+j]=v)})}
  const w=x.daily.slice(W0);x.leads=w.reduce((a,b)=>a+b,0);
  x.prevLeads=x.daily.slice(W0-30,W0).reduce((a,b)=>a+b,0);  // 前 30 天（8-16 至 9-14）
  x.today=x.daily[WN-1];x.yday=x.daily[WN-2];
  // 播放 / 互动（近 30 天）及前 30 天
  if(x.id===STORE_METRICS.storeId){x.plays=STORE_METRICS.monthPlays;x.inter=STORE_METRICS.monthInter}
  else x.inter=Math.round(x.plays*0.031*jt(x.id,101));
  x.playsDaily=fitSum(WIN.map((_,i)=>0.65+0.7*hsh(x.id,200+i)),x.plays);
  x.prevPlays=Math.round(x.plays*(0.80+0.14*hsh(x.id,301)));x.prevInter=Math.round(x.inter*(0.80+0.14*hsh(x.id,302)));
  // 直播场次 / 观看人次 / 发布量（近 30 天）
  const bad=lag.has(x.id),big={"上海星驰浦东店":46,"南京星驰河西店":44,"苏州星驰园区店":43};
  if(x.id===STORE_METRICS.storeId){x.lives30=STORE_METRICS.lives30;x.viewers30=STORE_METRICS.viewers30;x.posts30=STORE_METRICS.posts30}
  else{x.lives30=big[x.name]||(bad?1+x.id%3:12+Math.floor(28*hsh(x.id,7)));x.viewers30=x.lives30*(700+Math.round(1600*hsh(x.id,9)));x.posts30=Math.round(x.week*10*jt(x.id,11))}
  /* 每日发布（近 30 天）：最后 3 天（10-12 至 10-14，本周）之和 = 本周发布；近 14 天 / 近 30 天 均由此相加 */
  if(x.id===STORE_METRICS.storeId)x.postsDaily=XIHU_POSTS.slice();
  else x.postsDaily=[...fitSum(WIN.slice(0,27).map((_,i)=>0.4+hsh(x.id,800+i)),x.posts30-x.week),...fitSum([1,1.1,0.9],x.week)];
  x.posts30=x.postsDaily.reduce((p,q)=>p+q,0);x.posts14=x.postsDaily.slice(-14).reduce((p,q)=>p+q,0);
  /* 门店人员：店长 1 人；销售顾问人数（西湖店 6 人：销售顾问A–F，与线索负责人一致） */
  x.sales=x.id===STORE_METRICS.storeId?6:bad?3:big[x.name]?7:4+Math.floor(3*hsh(x.id,700));
  x.aiWeek=Math.round(x.week*1.8);
  // 线索跟进 / 到店 / 成交（比例与西湖店一致）
  if(x.id===STORE_METRICS.storeId)Object.assign(x,{pending:STORE_METRICS.pendingFollow,overdue:STORE_METRICS.overdueFollow,visits:STORE_METRICS.monthSummary.visits,deals:STORE_METRICS.monthSummary.deals,aiReplies:STORE_METRICS.aiReplies});
  else{x.pending=Math.round(x.today*STORE_METRICS.pendingFollow/STORE_METRICS.todayNewLeads);x.overdue=Math.round(x.pending/4);
    x.visits=Math.round(x.leads*58/450);x.deals=Math.round(x.leads*14/450);x.aiReplies=Math.round(x.leads*STORE_METRICS.aiReplies/450)}
  x.topicDone=x.health>=70&&hsh(x.id,401)<0.93; // 「E3 冬季续航话题挑战」是否完成
  // 账号本周发布之和 = 门店本周发布
  const ap=fitSum(x.accounts.map((_,k)=>0.5+hsh(x.id,500+k)),x.week);x.accounts.forEach((a,k)=>a.posts=ap[k]);
}
/* 华东 PK 榜（近 30 天线索） */
STORE_METRICS.pkBoard=PK_EAST.map(f).sort((a,b)=>b.leads-a.leads).map(x=>({n:x.name,leads:x.leads,lives:x.lives30,id:x.id}));
STORE_METRICS.pkRegionTotal=STORE_METRICS.pkBoard.length;
STORE_METRICS.pkRegionRank=STORE_METRICS.pkBoard.findIndex(x=>x.n==xihu.name)+1;
/* 西湖店每周华东名次（10 家参赛门店按该周每日线索之和排序，并列按同分同名次）与每周日均 */
const weekRank=WEEKS.map(([a,b],k)=>{const days=di(b)-di(a)+1,me=sumR(xihu,a,b),all=PK_EAST.map(n=>sumR(f(n),a,b));
  return {no:k+1,from:a,to:b,days,leads:me,avg:Math.round(me/days*10)/10,rank:1+all.filter(v=>v>me).length,tie:all.filter(v=>v===me).length>1,partial:days<7}});
STORE_METRICS.pkWeekRank=weekRank;
STORE_METRICS.pkJoinRank=weekRank[0].rank;STORE_METRICS.monthSummary.rankFrom=weekRank[0].rank;STORE_METRICS.before.pkRank=weekRank[0].rank;
/* 全国综合分：线索 50% + 直播观看 30% + 发布量 20%；每项除以 48 店中该项最大值归一化，满分 100 */
const SCORE_W={leads:0.5,viewers30:0.3,posts30:0.2};
const MX=Object.fromEntries(Object.keys(SCORE_W).map(k=>[k,Math.max(...stores.map(x=>x[k]))]));
stores.forEach(x=>{x.score=Math.round(1000*Object.entries(SCORE_W).reduce((a,[k,w])=>a+w*x[k]/MX[k],0)*100)/1000});
const national=[...stores].sort((a,b)=>b.score-a.score||a.id-b.id).map((x,i)=>({rank:i+1,n:x.name,id:x.id,score:x.score,leads:x.leads,viewers:x.viewers30,posts:x.posts30}));
/* 历史战报：按活动期间留资（= 期间每日线索之和）排名，取前三；当月线索 = 该店当月每日线索之和 */
const PKH=[{name:"国庆黄金周 PK",from:"10-01",to:"10-07",mFrom:"10-01",mTo:"10-14",mLabel:"10 月 1–14 日"},
  {name:"9 月新车上市 PK",from:"09-10",to:"09-23",mFrom:"09-01",mTo:"09-30",mLabel:"9 月"},
  {name:"8 月夏日试驾 PK",from:"08-12",to:"08-25",mFrom:"08-01",mTo:"08-31",mLabel:"8 月"}];
const pkHistory=PKH.map(h=>{const all=stores.map(x=>({store:x.name,region:x.region,leads:sumR(x,h.from,h.to),monthLeads:sumR(x,h.mFrom,h.mTo)})).sort((a,b)=>b.leads-a.leads||a.store.localeCompare(b.store));
  all.forEach(r=>r.rank=1+all.filter(o=>o.leads>r.leads).length);
  return {...h,period:h.from.replace(/^0/,"")+" 至 "+h.to.replace(/^0/,""),top:all.filter(r=>r.rank<=3),xihuRank:all.find(r=>r.store==xihu.name).rank}});
const checks=pkHistory.map(h=>({name:h.name,xihuRank:h.xihuRank,ok:h.top.length===3&&new Set(h.top.map(t=>t.rank)).size===3&&!h.top.some(t=>t.store==xihu.name)&&h.top.every(t=>t.leads<=t.monthLeads)}));
if(weekRank.some(w=>w.tie))console.error("周名次并列",weekRank);
if(checks.some(c=>!c.ok))console.error("pkHistory 校验失败",checks);
/* 直播间：单场观看人次 600–2,500；峰值在线 = 观看人次 × 1/5–1/3；留资 = 观看人次 × 本店留资率（线索 ÷ 直播观看人次） */
const toMin=t=>{const[h,m]=t.split(":").map(Number);return h*60+m},hm=m=>String(Math.floor(m/60)).padStart(2,"0")+":"+String(m%60).padStart(2,"0");
const ROOMS=[[13,"星驰 X5 金秋到店直播 · 置换补贴专场",1,"01:12:40",910,0.27],[28,"星驰 E3 冬季续航实测直播",1,"00:48:15",1340,0.25],
  [33,"星驰 S7 夜间灯语首发看车",0,"00:58:00",1120,0.30,"10-13 20:00"],[11,"浦东店周三晚团购夜",0,"01:10:00",760,0.32,"10-07 19:30"],
  [41,"光谷店星驰 X5 试驾直播",0,"01:30:00",1980,0.22,"10-13 19:30"],[14,"滨江店 E3 车主交付仪式",0,"01:05:00",1460,0.24,"10-12 15:00"],
  [23,"天河店国庆回顾专场",0,"01:20:00",2380,0.21,"10-08 19:30"],[2,"望京店新车到店开箱",0,"00:55:00",1210,0.29,"10-11 10:00"]];
const rooms=ROOMS.map(([sid,title,on,dur,viewers,ratio,start],i)=>{const st=stores.find(x=>x.id===sid),mins=Math.round(toMin(dur.slice(0,5))+(+dur.slice(6))/60);
  const peak=Math.round(viewers*ratio),online=on?Math.round(peak*0.82):0,s0=on?toMin(DEMO_NOW.hm)-mins:toMin(start.slice(6));
  const raw=Array.from({length:mins},(_,k)=>Math.min(1,0.25+0.75*k/Math.max(1,mins*0.3))*(1+0.12*Math.sin(k/7+i))+0.06*hsh(sid,600+k));
  const mx=Math.max(...(on?raw.slice(0,-1):raw));const curve=raw.map((v,k)=>({t:hm(s0+k),v:Math.min(peak,Math.round(v/mx*peak))}));if(on)curve[curve.length-1].v=online;
  const lead=Math.max(1,Math.round(viewers*st.leads/st.viewers30)),inter=Math.round(viewers*0.21);
  return {id:i+1,sid,title,on,dur,viewers,peak,online,start:on?DEMO_NOW.md+" "+hm(s0):start,curve,lead,inter,exposure:viewers*(5+i%3),visit:Math.round(lead*st.visits/st.leads)}});
/* 角色人数（角色与权限页）：总部管理员名单 3 人；大区经理每大区 1 人；店长每店 1 人；销售顾问 = 各店销售顾问之和 */
const HQ_ADMINS=[{name:"品牌数字营销部 · 总部管理员",acc:"hq_admin"},{name:"品牌数字营销部 · 内容运营",acc:"hq_content"},{name:"品牌数字营销部 · 数据分析",acc:"hq_data"}];
const REGION_MGRS=Object.keys(regions).map(r=>({region:r,name:r+"大区经理"}));
const roleCount={hq:HQ_ADMINS.length,region:REGION_MGRS.length,store:stores.length,sales:stores.reduce((a,x)=>a+x.sales,0)};
const PK_SEASON={name:"金秋直播 PK 赛",from:"09-15",to:"10-31"}; // 赛期；排名按赛期累计至今（9-15 至 10-14 = 近 30 天）
window.DB={PK_SEASON,HQ_ADMINS,REGION_MGRS,roleCount,weekRank,WEEKS,stores,leads,storeLeads,pkHistory,checks,national,rooms,SCORE_W,MX,DAYS,WIN,W0,DEMO_NOW,STORE_METRICS};
})();
