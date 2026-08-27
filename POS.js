/* =========================================================
   POSITION FILE NAMES
========================================================= */

const fileNames = {

    FO: [
        "Position_ICCL_FO_0_CM_6538_2026",
        "Position_ICCL_FO_0_TM_6538_2026",
        "Position_NCL_FO_0_CM_6538_2026",
        "Position_NCL_FO_0_TM_6538_2026"
    ],

    MCX: [
        "Position_MCXCCL_CO_0_TM_6538_2026"
    ],

    CD: [
        "Position_NCL_CD_0_TM_6538_2026"
    ],

    NCDEX: [
        "Position_NCCL_CO_0_TM_6538_2026"
    ],

    NSECOM: [
        "Position_NCL_CO_0_TM_6538_2026"
    ]

};


/* =========================================================
   STRIKE STEPS
========================================================= */

const strikeSteps = {

    /* =========================
       NSE / BSE
    ========================== */

    NIFTY: 50,

    SENSEX: 100,

    BANKEX: 100,

    TCS: 20,


    /* =========================
       MCX
    ========================== */

    CRUDEOIL: 100,

    NATURALGAS: 5,

    COPPER: 10,

    SILVERM: 500,

    GOLD: 1000,

    GOLDM: 100,

    SILVER: 500

};


/* =========================================================
   LOAD FILES
========================================================= */

function loadFiles() {

    const type =
        document.getElementById("positionType").value;


    const container =
        document.getElementById("checkboxContainer");


    const commonExpiry =
        document.getElementById("commonExpiryRow");


    const bseExpiry =
        document.getElementById("sensexBankexExpiryRow");


    const additionalStrike =
        document.getElementById("additionalStrikeRow");


    const symbolExpiry =
        document.getElementById("symbolExpiryContainer");


    /* =========================
       RESET
    ========================== */

    commonExpiry.style.display = "none";

    bseExpiry.style.display = "none";

    additionalStrike.style.display = "none";

    symbolExpiry.style.display = "none";

    container.innerHTML = "";


    /* =====================================================
       FO
    ===================================================== */

    if (type === "FO") {

        commonExpiry.style.display = "flex";

        bseExpiry.style.display = "flex";

        additionalStrike.style.display = "flex";

        container.style.display = "block";


        container.innerHTML = `

            <div class="checkbox-item">

                <input
                    type="checkbox"
                    id="all"
                    onclick="toggleAll()">

                <label for="all">
                    Select All
                </label>

            </div>

        `;


        fileNames.FO.forEach(name => {

            container.innerHTML += `

                <div class="checkbox-item">

                    <input
                        type="checkbox"
                        class="f"
                        id="${name}"
                        value="${name}">

                    <label for="${name}">
                        ${name}
                    </label>

                </div>

            `;

        });

    }


    /* =====================================================
       MCX / CD / NCDEX / NSECOM
    ===================================================== */

    else if (
        ["CD", "MCX", "NCDEX", "NSECOM"]
            .includes(type)
    ) {

        container.style.display = "none";

        symbolExpiry.style.display = "block";


        /*
         * Additional strikes are required
         * for FO + MCX
         */

        if (type === "MCX") {

            additionalStrike.style.display = "flex";

        }


        buildExpiryInputs(type);

    }

}


/* =========================================================
   SELECT / UNSELECT ALL FO FILES
========================================================= */

function toggleAll() {

    const isChecked =
        document.getElementById("all").checked;


    document
        .querySelectorAll(".f")
        .forEach(cb => {

            cb.checked = isChecked;

        });

}


/* =========================================================
   RAW CSV TEMPLATES
========================================================= */

const rawCSVs = {


    /* =====================================================
       FO
    ===================================================== */

    FO: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,0,0,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,0,0,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,0,0,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,STO,,TCS,20250625,20250625,3000,CE,225,0,0,0,0,225,63000,0,0,0,0,0,0,0,0,225,63000,0,0,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,0,0,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,0,0,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A101,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,0,0,716,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STF,,SBIN,20250625,20250625,,,750,0,0,0,0,0,0,750,75000,0,0,0,0,0,0,0,0,750,75000,1000,,0,-3420,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,BANKNIFTY,20250625,20250625,,,30,0,0,0,0,0,0,30,7500,0,0,0,0,0,0,0,0,30,7500,60000,,0,41880,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,NIFTY,20250625,20250625,25000,CE,65,0,0,0,0,0,0,65,7500,0,0,0,0,0,0,0,0,65,7500,25000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,STO,,TCS,20250625,20250625,3000,CE,225,0,0,0,0,0,0,225,63000,0,0,0,0,0,0,0,0,225,63000,3000,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDF,,SENSEX,20250625,20250625,,,20,0,0,0,0,0,0,100,7430000,0,0,0,0,0,0,0,0,100,7430000,77500,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,SENSEX,20250625,20250625,78000,CE,20,0,0,0,0,0,0,100,1060447,0,0,0,0,0,0,0,0,100,1060447,1450,,0,0,0,0,,,,,
FO,NCL,20260627,20260627,1,6538,6538,C,A11,IDO,,BANKEX,20250625,20250625,60000,PE,30,0,0,0,0,0,0,150,107400,0,0,0,0,0,0,0,0,150,107400,716,,0,0,0,0,,,,,
`,



    /* =====================================================
       MCX
    ===================================================== */

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


    /* =====================================================
       CD
    ===================================================== */

    CD: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS53,CDO,,USDINR,12-06-2026,12-06-2026,94,CE,1000,0,0,0,0,1,1200,0,0,0,0,0,0,0,0,1,1200,0,0,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS53,CDF,,GBPINR,12-06-2026,12-06-2026,,,1000,0,0,0,0,1,10000,0,0,0,0,0,0,0,0,1,10000,0,0,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS54,CDO,,USDINR,12-06-2026,12-06-2026,94,CE,1000,0,0,0,0,0,0,1,1200,0,0,0,0,0,0,0,0,1,1200,96,100.13,0,0,0,0,,,,,
CD,NCL,09-05-2024,09-05-2024,1,M52040,90144,C,KS54,CDF,,GBPINR,12-06-2026,12-06-2026,,,1000,0,0,0,0,0,0,1,10000,0,0,0,0,0,0,0,0,1,10000,96,100.13,0,0,0,0,,,,,
`,



    /* =====================================================
       NCDEX
    ===================================================== */

    NCDEX: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,COCUDAKL,2026-06-19,2026-06-19,0,,10,60,2149200,0,0,0,0,0,0,60,2149200,0,0,0,0,60,2173200,0,0,3622,,0,24000,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1001,COF,,DHANIYA,2026-06-19,2026-06-19,0,,5,5,642000,0,0,0,0,0,0,5,642000,0,0,0,0,5,641500,0,0,12830,,0,500,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1011,COF,,COCUDAKL,2026-06-19,2026-06-19,0,,10,60,2149200,0,0,0,0,0,0,60,2149200,0,0,0,0,60,2173200,0,0,3622,,0,24000,0,0,,,,,
CO,NCCL,2026-05-29,2026-05-29,1,M51095,01293,C,A1011,COF,,DHANIYA,2026-06-19,2026-06-19,0,,5,5,642000,0,0,0,0,0,0,5,642000,0,0,0,0,5,641500,0,0,12830,,0,500,0,0,,,,,
`,


    /* =====================================================
       NSE COM
    ===================================================== */

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


/* =========================================================
   CHANGE TAB
========================================================= */

function changeTab(type, btn) {

    document.getElementById("positionType").value = type;


    document
        .querySelectorAll(".tab")
        .forEach(t => {

            t.classList.remove("active");

        });


    btn.classList.add("active");


    loadFiles();

}


/* =========================================================
   GENERATE SEGMENT
========================================================= */

function generateSegment(
    type,
    client1,
    client2,
    expiryInput
) {

    const expiry =
        expiryInput
            ? expiryInput.replaceAll("-", "")
            : "";


    const rawCSV =
        rawCSVs[type];


    if (!rawCSV) {

        alert(
            type +
            " CSV template not found."
        );

        return;

    }


    const lines =
        rawCSV
            .trim()
            .split("\n");


    const header =
        lines[0];


    const data =
        lines.slice(1);


    const headerFields =
        header.split(",");


    const clntIdIdx =
        headerFields.indexOf("ClntId");


    const xpryIdx =
        headerFields.indexOf("XpryDt");


    const fxpryIdx =
        headerFields.indexOf(
            "FininstrmActlXpryDt"
        );


    const rptgIdx =
        headerFields.indexOf("RptgDt");


    const bizIdx =
        headerFields.indexOf("BizDt");


    const qtyIdx =
        headerFields.indexOf(
            "OpnBuyTradgQty"
        );


    const symbolIdx =
        headerFields.indexOf(
            "TckrSymb"
        );


    const strikeIdx =
        headerFields.indexOf(
            "StrkPric"
        );


    const optionTypeIdx =
        headerFields.indexOf(
            "OptnTp"
        );


    const now =
        new Date();


    const currentDate =
        now.getFullYear() +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        String(
            now.getDate()
        ).padStart(2, "0");


    const processedRows = [
        header
    ];


    /* =====================================================
       BSE EXPIRY
       SENSEX + BANKEX
    ===================================================== */

    const bseExpiryInput =
        document.getElementById(
            "sensexBankexExpiry"
        );


    const bseExpiry =
        bseExpiryInput &&
        bseExpiryInput.value
            ? bseExpiryInput.value
                .replaceAll("-", "")
            : "";


    /* =====================================================
       ADDITIONAL STRIKES
    ===================================================== */

    const additionalStrikes =
        parseInt(
            document.getElementById(
                "additionalStrikes"
            )?.value || "0",
            10
        );


    /* =====================================================
       PROCESS EACH ROW
    ===================================================== */

    for (const row of data) {

        const cols =
            row.split(",");


        const qty =
            parseFloat(
                cols[qtyIdx]
            );


        /* =================================================
           CLIENT
        ================================================= */

        if (qty > 0) {

            cols[clntIdIdx] =
                client1;

        }

        else if (client2) {

            cols[clntIdIdx] =
                client2;

        }

        else {

            continue;

        }


        /* =================================================
           FO
        ================================================= */

        if (type === "FO") {

            const symbol =
                cols[symbolIdx];


            /* =============================================
               SENSEX + BANKEX
               BSE EXPIRY
            ============================================= */

            if (
                symbol === "SENSEX" ||
                symbol === "BANKEX"
            ) {

                if (!bseExpiry) {

                    continue;

                }


                cols[xpryIdx] =
                    bseExpiry;


                cols[fxpryIdx] =
                    bseExpiry;

            }


            /* =============================================
               OTHER FO
               NSE EXPIRY
            ============================================= */

            else {

                if (!expiry) {

                    continue;

                }


                cols[xpryIdx] =
                    expiry;


                cols[fxpryIdx] =
                    expiry;

            }


            /* =============================================
               FO OPTION STRIKE GENERATION
            ============================================= */

            const optionType =
                cols[optionTypeIdx];


            const originalStrike =
                parseFloat(
                    cols[strikeIdx]
                );


            const step =
                strikeSteps[symbol];


            const rowsToAdd = [
                cols
            ];


            if (
                ["CE", "PE"]
                    .includes(optionType) &&

                !isNaN(originalStrike) &&

                step &&

                additionalStrikes > 0
            ) {

                for (
                    let i = 1;
                    i <= additionalStrikes;
                    i++
                ) {

                    const newCols =
                        [...cols];


                    newCols[strikeIdx] =
                        String(
                            originalStrike +
                            (step * i)
                        );


                    rowsToAdd.push(
                        newCols
                    );

                }

            }


            /* =============================================
               ADD FO ROWS
            ============================================= */

            rowsToAdd.forEach(
                newCols => {

                    newCols[rptgIdx] =
                        currentDate;


                    newCols[bizIdx] =
                        currentDate;


                    processedRows.push(
                        newCols.join(",")
                    );

                }
            );

        }


        /* =================================================
           MCX / CD / NCDEX / NSECOM
        ================================================= */

        else {

            const symbol =
                cols[symbolIdx];


            /* =============================================
               SYMBOL-SPECIFIC EXPIRY
            ============================================= */

            const input =
                document.getElementById(
                    `exp_${type}_${symbol}`
                );


            if (!input) {

                continue;

            }


            if (!input.value) {

                continue;

            }


            const exp =
                input.value
                    .replaceAll("-", "");


            cols[xpryIdx] =
                exp;


            cols[fxpryIdx] =
                exp;


            cols[rptgIdx] =
                currentDate;


            cols[bizIdx] =
                currentDate;


            /* =============================================
               MCX ADDITIONAL STRIKES

               Only:
                 CE
                 PE

               Not:
                 COF
            ============================================= */

            if (type === "MCX") {

                const optionType =
                    cols[optionTypeIdx];


                const originalStrike =
                    parseFloat(
                        cols[strikeIdx]
                    );


                const step =
                    strikeSteps[symbol];


                const rowsToAdd = [
                    cols
                ];


                if (
                    ["CE", "PE"]
                        .includes(optionType) &&

                    !isNaN(originalStrike) &&

                    step &&

                    additionalStrikes > 0
                ) {

                    for (
                        let i = 1;
                        i <= additionalStrikes;
                        i++
                    ) {

                        const newCols =
                            [...cols];


                        newCols[strikeIdx] =
                            String(
                                originalStrike +
                                (step * i)
                            );


                        rowsToAdd.push(
                            newCols
                        );

                    }

                }


                /* =========================================
                   ADD MCX ROWS
                ========================================= */

                rowsToAdd.forEach(
                    newCols => {

                        processedRows.push(
                            newCols.join(",")
                        );

                    }
                );

            }


            /* =============================================
               OTHER SEGMENTS
               CD / NCDEX / NSECOM
            ============================================= */

            else {

                processedRows.push(
                    cols.join(",")
                );

            }

        }

    }


    /* =====================================================
       FO FILE DOWNLOAD
    ===================================================== */

    if (type === "FO") {

        let selected;


        if (
            document
                .getElementById(
                    "positionType"
                )
                .value === "ALL"
        ) {

            selected =
                fileNames.FO.map(
                    name => ({
                        value: name
                    })
                );

        }

        else {

            selected =
                [
                    ...document
                        .querySelectorAll(
                            ".f:checked"
                        )
                ];


            if (!selected.length) {

                alert(
                    "Select at least one FO file."
                );

                return;

            }

        }


        selected.forEach(cb => {

            const blob =
                new Blob(
                    [
                        processedRows.join(
                            "\n"
                        )
                    ],
                    {
                        type:
                            "text/csv"
                    }
                );


            const a =
                document.createElement(
                    "a"
                );


            a.href =
                URL.createObjectURL(
                    blob
                );


            a.download =
                cb.value +
                ".csv";


            a.click();


            URL.revokeObjectURL(
                a.href
            );

        });

    }


    /* =====================================================
       OTHER SEGMENTS
       MCX / CD / NCDEX / NSECOM
    ===================================================== */

    else {

        fileNames[type]
            .forEach(name => {

                const blob =
                    new Blob(
                        [
                            processedRows.join(
                                "\n"
                            )
                        ],
                        {
                            type:
                                "text/csv"
                        }
                    );


                const a =
                    document.createElement(
                        "a"
                    );


                a.href =
                    URL.createObjectURL(
                        blob
                    );


                a.download =
                    name +
                    ".csv";


                a.click();


                URL.revokeObjectURL(
                    a.href
                );

            });

    }

}


/* =========================================================
   BUILD SYMBOL EXPIRY INPUTS
========================================================= */

function buildExpiryInputs(type) {

    const div =
        document.getElementById(
            "symbolExpiryContainer"
        );


    div.innerHTML = "";


    const rawCSV =
        rawCSVs[type];


    if (!rawCSV) {

        return;

    }


    const lines =
        rawCSV
            .trim()
            .split("\n");


    const header =
        lines[0].split(",");


    const symbolIdx =
        header.indexOf(
            "TckrSymb"
        );


    const symbols =
        [
            ...new Set(
                lines
                    .slice(1)
                    .map(
                        r =>
                            r.split(",")[
                                symbolIdx
                            ]
                    )
            )
        ];


    symbols.forEach(
        symbol => {

            div.innerHTML += `

                <div class="form-row">

                    <label>

                        ${
                            symbol === "COPPER" ||
                            symbol === "NATURALGAS" ||
                            symbol === "USDINR"

                                ? `${symbol} (OPT):`

                                : `${symbol}:`
                        }

                    </label>

                    <input
                        type="date"
                        id="exp_${type}_${symbol}">

                </div>

            `;

        }
    );

}


/* =========================================================
   GENERATE
========================================================= */

function generate() {

    const client1 =
        document
            .getElementById(
                "client1"
            )
            .value
            .trim();


    const client2 =
        document
            .getElementById(
                "client2"
            )
            .value
            .trim();


    const nseExpiry =
        document
            .getElementById(
                "expiry"
            )
            .value;


    const bseExpiry =
        document
            .getElementById(
                "sensexBankexExpiry"
            )
            .value;


    const type =
        document
            .getElementById(
                "positionType"
            )
            .value;


    /* =====================================================
       CLIENT VALIDATION
    ===================================================== */

    if (!client1) {

        alert(
            "Please provide Client 1."
        );

        return;

    }


    /* =====================================================
       FO VALIDATION
    ===================================================== */

    if (type === "FO") {

        if (!nseExpiry) {

            alert(
                "Please select NSE Expiry Date."
            );

            return;

        }


        if (!bseExpiry) {

            alert(
                "Please select BSE Expiry Date."
            );

            return;

        }

    }


    /* =====================================================
       GENERATE
    ===================================================== */

    generateSegment(
        type,
        client1,
        client2,
        nseExpiry
    );

}


/* =========================================================
   PAGE LOAD
========================================================= */

window.onload = function () {

    loadFiles();

};
