const fileNames = {

FO:[
"Position_ICCL_FO_0_CM_6538_2026",
"Position_ICCL_FO_0_TM_6538_2026",
"Position_NCL_FO_0_CM_6538_2026",
"Position_NCL_FO_0_TM_6538_2026"
],

MCX:[
"Position_MCXCCL_CO_0_CM_56415_2026"
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
	
	
	
	const commonExpiry = document.getElementById("commonExpiryRow");
const symbolExpiry = document.getElementById("symbolExpiryContainer");

if (["MCX","NCDEX","CD","NSECOM"].includes(type)) {

    commonExpiry.style.display = "none";

    symbolExpiry.style.display = "block";

    buildExpiryInputs(type);

} else {

    commonExpiry.style.display = "";

    symbolExpiry.style.display = "none";

}
	
	

    container.innerHTML = "";

    // Only FO should display checkboxes
   if (type !== "FO") {
    container.style.display = "none";
    container.innerHTML = "";
    return;
}

    container.style.display = "block";

    container.innerHTML = `
    <div class="checkbox-item">
        <input type="checkbox" id="all" onclick="toggleAll()">
        <label for="all">Select All</label>
    </div>
    `;

    fileNames[type].forEach(name => {
        container.innerHTML += `
        <div class="checkbox-item">
            <input type="checkbox" class="f" id="${name}" value="${name}">
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
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,COF,,CRUDEOIL,30-06-2026,30-06-2026,,,1,0,0,0,0,1,654000,0,0,0,0,0,0,0,0,1,654000,0,0,6500,,0,0,,0,,,,,
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,COF,,SILVERM,25-06-2026,25-06-2026,,,1,0,0,0,0,1,1180525,0,0,0,0,0,0,0,0,1,1180525,0,0,230000,,0,0,,0,,,,,
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,FUO,,COPPER,23-06-2026,23-06-2026,1200,PE,1,0,0,0,0,1,15000,0,0,0,0,0,0,0,0,1,15000,0,0,6,,0,0,,0,,,,,
CO,MCXCCL,26-06-2025,26-06-2025,1,56645,56645,C,KS52,FUO,,NATURALGAS,30-06-2026,30-06-2026,300,CE,1,0,0,0,0,1,20000,0,0,0,0,0,0,0,0,1,20000,1,0,10,,0,0,,0,,,,,
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,COF,,CRUDEOIL,30-06-2026,30-06-2026,,,1,0,0,0,0,0,0,1,654000,0,0,0,0,0,0,0,0,1,654000,6500,,0,0,,0,,,,,
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,COF,,SILVERM,25-06-2026,25-06-2026,,,1,0,0,0,0,0,0,1,1180525,0,0,0,0,0,0,0,0,1,1180525,230000,,0,0,,0,,,,,
CO,MCXCCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,FUO,,COPPER,23-06-2026,23-06-2026,1200,PE,1,0,0,0,0,0,0,1,15000,0,0,0,0,0,0,0,0,1,15000,6,,0,0,,0,,,,,
CO,MCXCCL,26-06-2025,26-06-2025,1,56645,56645,C,KS53,FUO,,NATURALGAS,30-06-2026,30-06-2026,300,CE,1,0,0,0,0,0,0,1,20000,0,0,0,0,0,0,0,0,1,20000,10,,0,0,,0,,,,,
`,

    CD: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS53,CDO,,USDINR,12-06-2026,12-06-2026,94,CE,1000,0,0,0,0,1,1200,0,0,0,0,0,0,0,0,1,1200,0,0,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS53,CDF,,GBPINR,12-06-2026,12-06-2026,,,1000,0,0,0,0,1,10000,0,0,0,0,0,0,0,0,1,10000,0,0,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS54,CDO,,USDINR,12-06-2026,12-06-2026,94,CE,1000,0,0,0,0,0,0,1,1200,0,0,0,0,0,0,0,0,1,1200,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS54,CDF,,GBPINR,12-06-2026,12-06-2026,,,1000,0,0,0,0,0,0,1,10000,0,0,0,0,0,0,0,0,1,10000,96,100.13,0,0,0,0,,,,,

`,
	
	
	
    NCDEX: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,COCUDAKL,2026-06-19,2026-06-19,0,,10,60,2149200,0,0,0,0,0,0,60,-2149200,0,0,0,0,60,2173200,0,0,3622,,0,24000,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,DHANIYA,2026-06-19,2026-06-19,0,,5,5,642000,0,0,0,0,0,0,5,-642000,0,0,0,0,5,641500,0,0,12830,,0,-500,0,0,,,,,
`,
    
	
	
	NSECOM: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,COF,,CRUDEOIL,30-06-2026,30-06-2026,,,1,0,0,0,0,1,654000,0,0,0,0,0,0,0,0,1,654000,0,0,6500,,0,0,,0,,,,,
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,COF,,SILVERM,25-06-2026,25-06-2026,,,1,0,0,0,0,1,1180525,0,0,0,0,0,0,0,0,1,1180525,0,0,230000,,0,0,,0,,,,,
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS52,FUO,,COPPER,23-06-2026,23-06-2026,1200,PE,1,0,0,0,0,1,15000,0,0,0,0,0,0,0,0,1,15000,0,0,6,,0,0,,0,,,,,
CO,NCL,26-06-2025,26-06-2025,1,56645,56645,C,KS52,FUO,,NATURALGAS,30-06-2026,30-06-2026,300,CE,1,0,0,0,0,1,20000,0,0,0,0,0,0,0,0,1,20000,1,0,10,,0,0,,0,,,,,
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,COF,,CRUDEOIL,30-06-2026,30-06-2026,,,1,0,0,0,0,0,0,1,654000,0,0,0,0,0,0,0,0,1,654000,6500,,0,0,,0,,,,,
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,COF,,SILVERM,25-06-2026,25-06-2026,,,1,0,0,0,0,0,0,1,1180525,0,0,0,0,0,0,0,0,1,1180525,230000,,0,0,,0,,,,,
CO,NCL,22-01-2026,22-01-2026,1,56645,56645,C,KS53,FUO,,COPPER,23-06-2026,23-06-2026,1200,PE,1,0,0,0,0,0,0,1,15000,0,0,0,0,0,0,0,0,1,15000,6,,0,0,,0,,,,,
CO,NCL,26-06-2025,26-06-2025,1,56645,56645,C,KS53,FUO,,NATURALGAS,30-06-2026,30-06-2026,300,CE,1,0,0,0,0,0,0,1,20000,0,0,0,0,0,0,0,0,1,20000,10,,0,0,,0,,,,,

`
};
	
	
	
	
	
	function changeTab(type,btn){

document.getElementById("positionType").value=type;

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

btn.classList.add("active");

loadFiles();

}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	function generateSegment(type, client1, client2, expiryInput) {

    const expiry = expiryInput.replaceAll("-", "");

    const rawCSV = rawCSVs[type];

    if (!rawCSV) {
        alert(type + " CSV template not found.");
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
	const symbolIdx = headerFields.indexOf("TckrSymb");

    const now = new Date();
    const currentDate =
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0");

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

       if (["MCX","NCDEX","CD","NSECOM"].includes(type)) {

    const symbol = cols[symbolIdx];

    const input = document.getElementById(`exp_${type}_${symbol}`);

    if (input) {

    // If no expiry entered for this symbol, skip this row
    if (!input.value) {
        continue;
    }

    const exp = input.value.replaceAll("-", "");

    cols[xpryIdx] = exp;
    cols[fxpryIdx] = exp;

} else {

    cols[xpryIdx] = expiry;
    cols[fxpryIdx] = expiry;

}

} else {

    cols[xpryIdx] = expiry;
    cols[fxpryIdx] = expiry;

}
        cols[rptgIdx] = currentDate;
        cols[bizIdx] = currentDate;

        processedRows.push(cols.join(","));
    }

    // FO - only selected files
    if (type === "FO") {

       let selected;

if (document.getElementById("positionType").value === "ALL") {

    // Download all FO files
    selected = fileNames.FO.map(name => ({ value: name }));

} else {

    selected = [...document.querySelectorAll(".f:checked")];

    if (!selected.length) {
        alert("Select at least one FO file.");
        return;
    }

}

        selected.forEach(cb => {

            const blob = new Blob([processedRows.join("\n")], {
                type: "text/csv"
            });

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = cb.value + ".csv";
            a.click();
            URL.revokeObjectURL(a.href);

        });

    } else {

        // Other exchanges - download all files
        fileNames[type].forEach(name => {

            const blob = new Blob([processedRows.join("\n")], {
                type: "text/csv"
            });

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = name + ".csv";
            a.click();
            URL.revokeObjectURL(a.href);

        });

    }
}
	
	
	
	
	
	
	
	function buildExpiryInputs(type) {

    const div = document.getElementById("symbolExpiryContainer");
    div.innerHTML = "";

    const rawCSV = rawCSVs[type];

    if (!rawCSV) return;

    const lines = rawCSV.trim().split("\n");
    const header = lines[0].split(",");

    const symbolIdx = header.indexOf("TckrSymb");

    const symbols = [...new Set(
        lines.slice(1).map(r => r.split(",")[symbolIdx])
    )];

   

    symbols.forEach(symbol => {

        div.innerHTML += `
        <div class="form-row">
            <label>${
    symbol === "COPPER" || symbol === "NATURALGAS" || symbol === "USDINR"
        ? `${symbol} (OPT):`
        : `${symbol}:`
}</label>
            <input type="date" id="exp_${type}_${symbol}">
        </div>
        `;

    });

}
	
	
	
	
	
	
	

function generate() {

    const client1 = document.getElementById("client1").value.trim();
    const client2 = document.getElementById("client2").value.trim();
    const expiryInput = document.getElementById("expiry").value;

    const type = document.getElementById("positionType").value;

if (!client1) {
    alert("Please provide Client 1.");
    return;
}

if ((type === "FO" || type === "ALL") && !expiryInput) {
    alert("Please select Expiry Date.");
    return;
}

    

    if (type === "ALL") {

        generateSegment("FO", client1, client2, expiryInput);
        generateSegment("MCX", client1, client2, expiryInput);
        generateSegment("CD", client1, client2, expiryInput);
        generateSegment("NCDEX", client1, client2, expiryInput);
        generateSegment("NSECOM", client1, client2, expiryInput);

    } else {

        generateSegment(type, client1, client2, expiryInput);

    }

}


window.onload=function(){

loadFiles();

};





