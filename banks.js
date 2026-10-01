'use strict';
// Official-site snapshot, checked 2026-10-01. Future rates are not published rates.
const BANKS={
 saikyo:{name:'西京銀行',date:'2026-10-01',maxYears:35,minYears:1,maxAmount:20000,minAmount:500,notes:'優遇は「単独年収700万円以上または合算1,000万円以上」かつ給与・年金振込指定が条件。金利幅・保証料は審査で決定。保証料率は0.05〜1.5%。定率型の事務手数料は融資額の2.2%、電子契約は11,000円。標準団信の金利です。',sources:[['金利・手数料','https://www.saikyobank.co.jp/rate/index.html'],['商品概要','https://www.saikyobank.co.jp/personal/service/loan/home/index.html']],plans:[
 {name:'変動 Aプラン定率型（通常）',rates:[1.5,1.8],percent:.022,fixed:11000,type:'variable'},
 {name:'変動 Aプラン定率型（優遇条件あり）',rates:[1.1,1.4],percent:.022,fixed:11000,type:'variable'},
 {name:'変動 Bプラン定額型',rates:[1.73,2.03],percent:0,fixed:55000,type:'variable'},
 {name:'全期間固定（通常）',rates:[3.4],percent:.022,fixed:11000,type:'fixed'},
 {name:'全期間固定（優遇条件あり）',rates:[2.4],percent:.022,fixed:11000,type:'fixed'},
 {name:'当初5年固定',rates:[2.5,2.8],percent:0,fixed:55000,type:'initial',years:5},
 {name:'当初10年固定',rates:[3.15,3.45],percent:0,fixed:55000,type:'initial',years:10}
 ]},
 rokin:{name:'中国ろうきん（会員）',date:'2026-10-01',maxYears:50,minYears:1,maxAmount:10000,minAmount:1,notes:'1号・3号・4号特例会員の構成員（当該事業体の管理職を含む）を対象とした手数料33,000円です。4号会員は同じ条件ではありません。固定期間の下限金利は所定の優遇条件を満たす場合。変動型・当初5年固定は新規受付終了。標準団信の金利です。',sources:[['融資金利','https://www.chugoku.rokin.or.jp/kariru/kinri.php'],['固定期間・手数料・優遇条件','https://www.chugoku.rokin.or.jp/kariru/juutaku_loan/kotei.php'],['全期間固定・保証料','https://www.chugoku.rokin.or.jp/kariru/juutaku_loan/zenkikankotei.php']],plans:[
 {name:'当初3年固定（住宅資金）',rates:[1.55,3.4],percent:0,fixed:33000,type:'initial',years:3},
 {name:'当初10年固定（住宅資金）',rates:[2.1,4.2],percent:0,fixed:33000,type:'initial',years:10},
 {name:'全期間固定',rates:[4.6],percent:0,fixed:33000,type:'fixed',guaranteeZero:true}
 ]},
 ja:{name:'JA山口県',date:'2026-10-01',maxYears:40,minYears:3,maxAmount:20000,minAmount:10,remainingLimit:true,notes:'山口県農業信用基金協会保証型。キャンペーン期間は2026/10/1〜11/30。優遇1.60%はJAネットバンク＋カードローン・JAカード・NISA・児童手当口座のいずれか、特別優遇1.55%はJAネットバンク＋給与全額・年金振込が条件。保証料別（キャンペーン資料では年0.08〜0.30%）。一律保証料30,000円＋事務手数料55,000円＋電子契約手数料。借換応援型の概要は最長40年かつ現在の残存期間内。キャンペーン資料と商品概要で限度額・保証料の記載が異なるため、適用商品を窓口で確認してください。',sources:[['金利一覧','https://www.ja-ymg.or.jp/loan/interest/'],['キャンペーン（金利・保証料）','https://www.ja-ymg.or.jp/wp-content/uploads/2026/09/2026-10-01_jyutaku.pdf'],['手数料','https://www.ja-ymg.or.jp/commission/'],['借換応援型 商品概要（2026/4）','https://jabank-yamaguchi.or.jp/assets/files/pdf/2026/04/03_202604jyutakuouen.pdf']],plans:[
 {name:'当初変動（キャンペーン優遇条件あり）',rates:[1.6],percent:0,fixed:85000,type:'variable',electronicTier:true},
 {name:'当初変動（キャンペーン特別優遇条件あり）',rates:[1.55],percent:0,fixed:85000,type:'variable',electronicTier:true},
 {name:'変動（店頭金利）',rates:[3.37],percent:0,fixed:85000,type:'variable',electronicTier:true},
 {name:'当初3年固定',rates:[2.25,3.7],percent:0,fixed:85000,type:'initial',years:3},
 {name:'当初5年固定',rates:[2.55,4],percent:0,fixed:85000,type:'initial',years:5},
 {name:'当初10年固定',rates:[3.25,4.7],percent:0,fixed:85000,type:'initial',years:10}
 ]}
};
// JA fixed-period plans also use electronic contracting, per its fee schedule.
BANKS.ja.plans.forEach(p=>p.electronicTier=true);
function electronicFee(p){return p<=5000000?1100:p<=10000000?5500:p<=50000000?11000:33000;}
function bankCosts(balance,plan,extra,financed){const feesFor=p=>plan.fixed+plan.percent*p+(plan.electronicTier?electronicFee(p):0)+extra;if(!financed)return feesFor(balance);let fees=feesFor(balance);for(let i=0;i<50;i++){const next=feesFor(balance+fees);if(Math.abs(next-fees)<.000001)return next;fees=next;}return fees;}
if(typeof module!=='undefined')module.exports={BANKS,bankCosts,electronicFee};
