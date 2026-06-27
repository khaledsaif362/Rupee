const fileNames = {

FO:[
"Position_ICCL_FO_0_CM_6538_2026",
"Position_ICCL_FO_0_TM_6538_2026",
"Position_NCL_FO_0_CM_6538_2026",
"Position_NCL_FO_0_TM_6538_2026"
],

MCX:[
"Position_MCX_CM_6538_2026"
],

CD:[
"Position_CURRENCY_TM_6538_2026"
],

NCDEX:[
"Position_NCDEX_TM_6538_2026"
],

NSECOM:[

"Position_NSECOM_TM_6538_2026"
]

};

  function loadFiles() {

    const type = document.getElementById("positionType").value;
    const container = document.getElementById("checkboxContainer");

    container.innerHTML = "";

    // Only FO should display checkboxes
    if (type !== "FO") {
        container.style.display = "none";
        return;
    }

    container.style.display = "block";

    container.innerHTML = `
    <div class="checkbox-item">
        <input type="checkbox" id="all" onclick="toggleAll()" checked>
        <label for="all">Select All</label>
    </div>
    `;

    fileNames[type].forEach(name => {
        container.innerHTML += `
        <div class="checkbox-item">
            <input type="checkbox" class="f" id="${name}" value="${name}" checked>
            <label for="${name}">${name}</label>
        </div>
        `;
    });

}


    function toggleAll() {
      const isChecked = document.getElementById("all").checked;
      document.querySelectorAll(".f").forEach(cb => cb.checked = isChecked);
    }
	
	
	
	const rawCSVs = {
    FO: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,0,0,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,0,0,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,0,0,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STO,,TCS,20250625,20250625,3000,CE,175,0,0,0,0,175,63000,0,0,0,0,0,0,0,0,175,63000,0,0,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,0,0,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,0,0,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,0,0,716,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STO,,TCS,20250625,20250625,3000,CE,175,0,0,0,0,0,0,175,63000,0,0,0,0,0,0,0,0,175,63000,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,716,,0,0,0,0,,,,,
`,

    MCX: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,MCXCCL,2026-01-22,2026-01-22,1,56645,56645,C,KS52,COF,,GOLDPETAL,2026-06-30,2026-06-30,,,1,10,318100,0,0,10,316400,0,319000,0,0,0,0,0,0,10,319000,0,0,14300,,0,3500,,0,,,,,
CO,MCXCCL,2026-01-22,2026-01-22,1,56645,56645,C,KS52,COF,,NATGASMINI,2026-06-25,2026-06-25,,,1,0,0,0,0,2,162875,0,0,0,0,0,0,0,0,6,0,0,0,321.2,,0,1500,,0,,,,,
CO,MCXCCL,2026-01-22,2026-01-22,1,56645,56645,C,KS52,FUO,,COPPER,2026-06-23,2026-06-23,1100,PE,1,0,0,0,0,1,9825,0,0,1,0,0,0,0,0,1,0,0,0,4.73,,-9825,0,,0,,,,,
CO,MCXCCL,2025-06-26,2025-06-26,1,7055,56415,C,KS52,FUO,,GOLD,2026-06-30,2026-06-30,100000,PE,1,1,0,0,0,1,0,1,2600,0,0,0,0,0,0,0,0,1,0,1000,,100,0,,0,,,,,
CO,MCXCCL,2026-01-22,2026-01-22,1,56645,56645,C,KS53,COF,,GOLDPETAL,2026-06-30,2026-06-30,,,1,0,0,10,318100,0,0,4,319000,0,0,0,0,0,0,0,0,14,40000,14300,,0,3500,,0,,,,,
`,

    CD: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CD,NCL,2024-05-09,2024-05-09,1,M52040,90144,C,KS53,CDF,,USDINR,2026-06-12,2026-06-12,,,1000,15,0,0,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,82.13,100.13,0,0,0,0,,,,,
CD,NCL,2024-05-09,2024-05-09,1,M52040,90144,C,KS53,CDO,,USDINR,2026-06-12,2026-06-12,100,CE,1000,0,0,95,0,0,0,0,0,0,0,0,0,0,0,0,0,95,0,83.255,100.13,0,0,0,0,,,,,
`,
	
	
	
    NCDEX: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,COCUDAKL,2026-06-19,2026-06-19,0,,10,60,2149200,0,0,0,0,0,0,60,-2149200,0,0,0,0,60,2173200,0,0,3622,,0,24000,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,DHANIYA,2026-06-19,2026-06-19,0,,5,5,642000,0,0,0,0,0,0,5,-642000,0,0,0,0,5,641500,0,0,12830,,0,-500,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,JEERAUNJHA,2026-06-19,2026-06-19,0,,3,0,0,3,578250,0,0,0,0,0,0,3,578250,0,0,0,0,3,575850,19195,,0,2400,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,RAINMUMBAI,2026-07-30,2026-07-31,0,,1,0,0,0,0,1,107750,0,0,1,-107750,0,0,0,0,1,105700,0,0,2114,,0,-2050,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,TMCFGRNZM,2026-06-19,2026-06-19,0,,5,0,0,5,810800,0,0,0,0,0,0,5,810800,0,0,0,0,5,809400,16188,,0,1400,0,0,,,,,
`,
    
	
	
	NSECOM: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,NCL,2024-05-09,2024-05-09,1,M52040,90144,C,KS20,COF,,ALUMINI,2026-06-30,2026-06-30,0,0,1,5,1286250,4,1029000,5,1286250,0,0,6,1543500,0,0,0,0,6,1543500,0,0,257.25,,0,0,0,0,,,,,
`
};
	
	
	
	
	




    function generate() {
      const client1 = document.getElementById("client1").value.trim();
      const client2 = document.getElementById("client2").value.trim();
      const expiryInput = document.getElementById("expiry").value;

      if (!client1 || !expiryInput) {
        alert("Please provide Client 1 and Expiry Date.");
        return;
      }

      const expiry = expiryInput.replaceAll("-", "");
     const type = document.getElementById("positionType").value;

const rawCSV = rawCSVs[type];

if (!rawCSV) {
    alert("CSV template not found.");
    return;
}

const lines = rawCSV.trim().split("\n");
const header = lines[0];
const data = lines.slice(1);
const headerFields = header.split(",");

const clntIdIdx = headerFields.indexOf("ClntId");
const xpryIdx = headerFields.indexOf("XpryDt");
const fxpryIdx = headerFields.indexOf("FininstrmActlXpryDt");
const rptgIdx = headerFields.indexOf("RptgDt");
const bizIdx = headerFields.indexOf("BizDt");
const qtyIdx = headerFields.indexOf("OpnBuyTradgQty");

const getCurrentDateFormatted = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
};

const currentDate = getCurrentDateFormatted();


      const processedRows = [header];

      for (const row of data) {
        const cols = row.split(",");
        const qty = parseFloat(cols[qtyIdx]);
        if (qty > 0) {
          cols[clntIdIdx] = client1;
        } else if (client2) {
          cols[clntIdIdx] = client2;
        } else {
          continue;
        }

       cols[xpryIdx] = expiry;
cols[fxpryIdx] = expiry;
cols[rptgIdx] = currentDate;
cols[bizIdx] = currentDate;

        processedRows.push(cols.join(","));
      }

    

// FO -> download only selected files
if (type === "FO") {

    const selected = [...document.querySelectorAll(".f:checked")];

    if (!selected.length) {
        alert("Select at least one file.");
        return;
    }

    selected.forEach(cb => {
        const blob = new Blob([processedRows.join("\n")], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = cb.value + ".csv";
        a.click();
        URL.revokeObjectURL(a.href);
    });

} else {

    // Other exchanges -> download all files directly
    fileNames[type].forEach(name => {
        const blob = new Blob([processedRows.join("\n")], { type: "text/csv" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name + ".csv";
        a.click();
        URL.revokeObjectURL(a.href);
    });

}
    }
	
	window.onload = loadFiles;
