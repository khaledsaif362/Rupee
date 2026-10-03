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
        "Position_NCDEX_CO_0_TM_6538_2026"
    ],

    NSECOM: [
        "Position_NCL_COM_0_TM_6538_2026"
    ]

};


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentMode = "sample";

let uploadedClients = [];

let manualRows = [];

let bulkClients = [];

let bulkBhavcopyData = [];

let generatedFiles = [];

let selectedSegment = "";

let selectedExpiry = "";

let selectedAdditionalStrikes = [];

let currentFileData = null;


/* =========================================================
   MODE SWITCHING
========================================================= */

function setMode(mode) {

    currentMode = mode;

    document
        .querySelectorAll("#modeToggle .mode-card")
        .forEach(card => {

            const radio =
                card.querySelector("input[type=radio]");

            card.classList.toggle(
                "active",
                !!radio &&
                radio.dataset.mode === mode
            );

        });


    document
        .querySelectorAll("#modeToggle input[type=radio]")
        .forEach(radio => {

            radio.checked =
                radio.dataset.mode === mode;

        });


    document
        .querySelectorAll(".mode-panel")
        .forEach(panel => {

            panel.classList.remove("active");

        });


    const panel =
        document.getElementById(mode + "Panel");

    if (panel) {

        panel.classList.add("active");

    }


    if (mode === "manual") {

        setBulkUiState(false);

        openManualPanel();

    }

    else if (mode === "bulk") {

        setBulkUiState(true);

        closeManualDrawer();

    }

    else {

        setBulkUiState(false);

        closeManualDrawer();

        closeBulkDrawer();

    }


    refreshManualReopenLink();


    const typeEl =
        document.getElementById("positionType");

    if (typeEl) {

        setSegmentVisibility(typeEl.value);

    }

}


/* =========================================================
   INITIAL MODE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setMode("sample");

});


/* =========================================================
   BULK UI STATE
========================================================= */

function setBulkUiState(active) {

    /*
       The three modes are now separate panels.
       Do not disable the active Bulk panel or
       the top mode selector.
    */

    const sample =
        document.getElementById("samplePanel");

    const manual =
        document.getElementById("manualPanel");


    [sample, manual].forEach(panel => {

        if (!panel) return;

        panel.classList.toggle(
            "mode-disabled",
            active
        );

    });

}


/* =========================================================
   MANUAL PANEL
========================================================= */

function openManualPanel() {

    const panel =
        document.getElementById("manualPanel");

    if (!panel) return;

    panel.classList.add("active");


    const container =
        document.getElementById("manualContainer");

    if (
        container &&
        container.querySelectorAll(".manual-row").length === 0
    ) {

        addManualRow();

    }

}


function openManualDrawer() {

    const panel =
        document.getElementById("manualPanel");

    if (panel) {

        panel.classList.add("active");

    }

}


function closeManualDrawer() {

    const panel =
        document.getElementById("manualPanel");

    if (
        panel &&
        currentMode !== "manual"
    ) {

        panel.classList.remove("active");

    }

}


function refreshManualReopenLink() {

    const link =
        document.getElementById("manualReopen");

    if (!link) return;

    link.style.display =
        currentMode === "manual"
            ? "none"
            : "inline-block";

}


/* =========================================================
   BULK PANEL
========================================================= */

function closeBulkDrawer() {

    const panel =
        document.getElementById("bulkPanel");

    if (
        panel &&
        currentMode !== "bulk"
    ) {

        panel.classList.remove("active");

    }

}


/* =========================================================
   SEGMENT VISIBILITY
========================================================= */

function setSegmentVisibility(type) {

    const commonExpiry =
        document.getElementById("expiry");

    const bseExpiry =
        document.getElementById("sensexBankexExpiry");

    const additionalStrike =
        document.getElementById("additionalStrikes");

    const symbolExpiryContainer =
        document.getElementById(
            "symbolExpiryContainer"
        );


    if (commonExpiry) {

        commonExpiry.classList.toggle(
            "hidden",
            type !== "FO"
        );

    }


    if (bseExpiry) {

        bseExpiry.classList.toggle(
            "hidden",
            type !== "FO"
        );

    }


    if (additionalStrike) {

        additionalStrike.classList.toggle(
            "hidden",
            !(
                type === "FO" ||
                type === "MCX"
            )
        );

    }


    if (symbolExpiryContainer) {

        symbolExpiryContainer.classList.toggle(
            "hidden",
            type !== "FO"
        );

    }

}


/* =========================================================
   CLIENT FILE UPLOAD
========================================================= */

function handleClientFileUpload(input) {

    const file =
        input.files &&
        input.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = function (e) {

        const text =
            String(
                e.target.result || ""
            );


        uploadedClients =
            text
                .split(/\r?\n/)
                .map(line =>
                    line
                        .split(",")[0]
                        .trim()
                        .replace(/^"|"$/g, "")
                )
                .filter(Boolean);


        const status =
            document.getElementById(
                "clientFileStatus"
            );

        if (status) {

            status.textContent =
                uploadedClients.length +
                " client(s) loaded from file";

        }


        const clear =
            document.getElementById(
                "clientFileClearBtn"
            );

        if (clear) {

            clear.style.display =
                "inline-block";

        }


        const c1 =
            document.getElementById("client1");

        const c2 =
            document.getElementById("client2");


        if (c1) {

            c1.disabled =
                uploadedClients.length > 0;

        }

        if (c2) {

            c2.disabled =
                uploadedClients.length > 0;

        }

    };


    reader.onerror = function () {

        alert(
            "Could not read that file. Please try again."
        );

    };


    reader.readAsText(file);

}


/* =========================================================
   CLEAR CLIENT FILE
========================================================= */

function clearClientFile() {

    const input =
        document.getElementById(
            "clientFile"
        );

    if (input) {

        input.value = "";

    }


    const status =
        document.getElementById(
            "clientFileStatus"
        );

    if (status) {

        status.textContent = "";

    }


    const clear =
        document.getElementById(
            "clientFileClearBtn"
        );

    if (clear) {

        clear.style.display =
            "none";

    }


    uploadedClients = [];


    const c1 =
        document.getElementById("client1");

    const c2 =
        document.getElementById("client2");


    if (c1) {

        c1.disabled = false;

    }

    if (c2) {

        c2.disabled = false;

    }

}


/* =========================================================
   MANUAL CLIENT FILE UPLOAD
========================================================= */

function handleManualClientFileUpload(input) {

    const file =
        input.files &&
        input.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = function (e) {

        uploadedClients =
            String(
                e.target.result || ""
            )
                .split(/\r?\n/)
                .map(line =>
                    line
                        .split(",")[0]
                        .trim()
                        .replace(/^"|"$/g, "")
                )
                .filter(Boolean);


        const status =
            document.getElementById(
                "manualClientFileStatus"
            );

        if (status) {

            status.textContent =
                uploadedClients.length +
                " client(s) loaded from file";

        }


        const clear =
            document.getElementById(
                "manualClientFileClearBtn"
            );

        if (clear) {

            clear.style.display =
                "inline-block";

        }

    };


    reader.onerror = function () {

        alert(
            "Could not read that file. Please try again."
        );

    };


    reader.readAsText(file);

}


/* =========================================================
   CLEAR MANUAL CLIENT FILE
========================================================= */

function clearManualClientFile() {

    const input =
        document.getElementById(
            "manualClientFile"
        );

    if (input) {

        input.value = "";

    }


    const status =
        document.getElementById(
            "manualClientFileStatus"
        );

    if (status) {

        status.textContent = "";

    }


    const clear =
        document.getElementById(
            "manualClientFileClearBtn"
        );

    if (clear) {

        clear.style.display =
            "none";

    }


    uploadedClients = [];

}


/* =========================================================
   BULK CLIENT FILE
========================================================= */

function handleBulkClientFileUpload(input) {

    const file =
        input.files &&
        input.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = function (e) {

        bulkClients =
            String(
                e.target.result || ""
            )
                .split(/\r?\n/)
                .map(line =>
                    line
                        .split(",")[0]
                        .trim()
                        .replace(/^"|"$/g, "")
                )
                .filter(Boolean);


        const status =
            document.getElementById(
                "bulkClientStatus"
            );

        if (status) {

            status.textContent =
                bulkClients.length +
                " client(s) loaded";

        }

    };


    reader.onerror = function () {

        alert(
            "Could not read client file."
        );

    };


    reader.readAsText(file);

}


/* =========================================================
   CLEAR BULK CLIENT FILE
========================================================= */

function clearBulkClientFile() {

    const input =
        document.getElementById(
            "bulkClientFile"
        );

    if (input) {

        input.value = "";

    }


    bulkClients = [];


    const status =
        document.getElementById(
            "bulkClientStatus"
        );

    if (status) {

        status.textContent =
            "Optional — uses Main Client List if not selected";

    }

}


/* =========================================================
   BULK BHAVCOPY UPLOAD
========================================================= */

function handleBulkBhavcopyUpload(input) {

    const file =
        input.files &&
        input.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = function (e) {

        try {

            bulkBhavcopyData =
                parseCSV(
                    String(
                        e.target.result || ""
                    )
                );


            const status =
                document.getElementById(
                    "bulkBhavcopyStatus"
                );


            if (status) {

                status.textContent =
                    bulkBhavcopyData.length +
                    " records loaded";

            }

        }

        catch (err) {

            bulkBhavcopyData = [];

            alert(
                "Bhavcopy parse failed: " +
                err.message
            );

        }

    };


    reader.onerror = function () {

        alert(
            "Could not read Bhavcopy."
        );

    };


    reader.readAsText(file);

}


/* =========================================================
   CSV PARSER
========================================================= */

function parseCSV(text) {

    const rows = [];

    let row = [];

    let value = "";

    let insideQuotes = false;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const ch = text[i];

        const next =
            text[i + 1];


        if (ch === '"' && insideQuotes && next === '"') {

            value += '"';

            i++;

            continue;

        }


        if (ch === '"') {

            insideQuotes =
                !insideQuotes;

            continue;

        }


        if (ch === "," && !insideQuotes) {

            row.push(value);

            value = "";

            continue;

        }


        if (
            (ch === "\n" || ch === "\r") &&
            !insideQuotes
        ) {

            if (
                ch === "\r" &&
                next === "\n"
            ) {

                i++;

            }


            row.push(value);

            value = "";


            if (
                row.some(
                    v =>
                        String(v).trim() !== ""
                )
            ) {

                rows.push(row);

            }


            row = [];

            continue;

        }


        value += ch;

    }


    if (
        value !== "" ||
        row.length
    ) {

        row.push(value);

        if (
            row.some(
                v =>
                    String(v).trim() !== ""
            )
        ) {

            rows.push(row);

        }

    }


    if (!rows.length) {

        return [];

    }


    const headers =
        rows[0].map(
            h =>
                String(h)
                    .trim()
                    .replace(/^"|"$/g, "")
        );


    return rows
        .slice(1)
        .map(row => {

            const obj = {};

            headers.forEach(
                (header, index) => {

                    obj[header] =
                        row[index] ?? "";

                }
            );

            return obj;

        });

}


/* =========================================================
   GENERIC HELPERS
========================================================= */

function randomItem(arr) {

    if (!arr || !arr.length) {

        return "";

    }

    return arr[
        Math.floor(
            Math.random() *
            arr.length
        )
    ];

}


function randomInt(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


function cleanValue(value) {

    return String(
        value ?? ""
    ).trim();

}


function numberValue(value) {

    const n =
        parseFloat(
            String(value ?? "")
                .replace(/,/g, "")
        );

    return Number.isFinite(n)
        ? n
        : 0;

}


/* =========================================================
   MANUAL ROW
========================================================= */

function addManualRow(data = {}) {

    const container =
        document.getElementById(
            "manualContainer"
        );

    if (!container) return;


    const row =
        document.createElement("div");

    row.className =
        "manual-row";


    row.innerHTML = `
        <div class="manual-grid">

            <div class="field">
                <label>Symbol</label>
                <input
                    type="text"
                    class="manual-symbol"
                    value="${escapeHtml(data.symbol || "")}"
                    placeholder="Symbol"
                >
            </div>

            <div class="field">
                <label>Instrument</label>
                <select class="manual-instrument">
                    <option value="FUTIDX">FUTIDX</option>
                    <option value="OPTIDX">OPTIDX</option>
                    <option value="FUTSTK">FUTSTK</option>
                    <option value="OPTSTK">OPTSTK</option>
                    <option value="FUTCOM">FUTCOM</option>
                </select>
            </div>

            <div class="field">
                <label>Expiry</label>
                <input
                    type="date"
                    class="manual-expiry"
                    value="${escapeHtml(data.expiry || "")}"
                >
            </div>

            <div class="field">
                <label>Option</label>
                <select class="manual-option">
                    <option value="">--</option>
                    <option value="CE">CE</option>
                    <option value="PE">PE</option>
                </select>
            </div>

            <div class="field">
                <label>Strike</label>
                <input
                    type="number"
                    class="manual-strike"
                    value="${escapeHtml(data.strike || "")}"
                    placeholder="Strike"
                >
            </div>

            <div class="field">
                <label>Qty / Lot</label>
                <input
                    type="number"
                    class="manual-qty"
                    value="${escapeHtml(data.qty || "")}"
                    placeholder="Qty"
                >
            </div>

            <div class="field">
                <label>Price</label>
                <input
                    type="number"
                    step="any"
                    class="manual-price"
                    value="${escapeHtml(data.price || "")}"
                    placeholder="Price"
                >
            </div>

            <div class="manual-actions">
                <button
                    type="button"
                    class="btn-small"
                    onclick="addManualRow()"
                >
                    +
                </button>

                <button
                    type="button"
                    class="btn-small danger"
                    onclick="removeManualRow(this)"
                >
                    ×
                </button>
            </div>

        </div>
    `;


    container.appendChild(row);


    if (data.instrument) {

        const instrument =
            row.querySelector(
                ".manual-instrument"
            );

        instrument.value =
            data.instrument;

    }


    if (data.option) {

        const option =
            row.querySelector(
                ".manual-option"
            );

        option.value =
            data.option;

    }

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   REMOVE MANUAL ROW
========================================================= */

function removeManualRow(button) {

    const row =
        button.closest(".manual-row");

    if (row) {

        row.remove();

    }


    const container =
        document.getElementById(
            "manualContainer"
        );


    if (
        container &&
        !container.querySelector(
            ".manual-row"
        )
    ) {

        addManualRow();

    }

}


/* =========================================================
   GET MANUAL ENTRIES
========================================================= */

function getManualEntries() {

    const container =
        document.getElementById(
            "manualContainer"
        );

    if (!container) {

        return [];

    }


    const rows =
        container.querySelectorAll(
            ".manual-row"
        );


    const entries = [];


    rows.forEach(row => {

        const symbol =
            cleanValue(
                row.querySelector(
                    ".manual-symbol"
                )?.value
            );


        const instrument =
            cleanValue(
                row.querySelector(
                    ".manual-instrument"
                )?.value
            );


        const expiry =
            cleanValue(
                row.querySelector(
                    ".manual-expiry"
                )?.value
            );


        const option =
            cleanValue(
                row.querySelector(
                    ".manual-option"
                )?.value
            );


        const strike =
            numberValue(
                row.querySelector(
                    ".manual-strike"
                )?.value
            );


        const qty =
            numberValue(
                row.querySelector(
                    ".manual-qty"
                )?.value
            );


        const price =
            numberValue(
                row.querySelector(
                    ".manual-price"
                )?.value
            );


        if (!symbol) {

            return;

        }


        entries.push({

            symbol,
            instrument,
            expiry,
            option,
            strike,
            qty,
            price

        });

    });


    return entries;

}


/* =========================================================
   MANUAL NOTICE
========================================================= */

function refreshManualNotice() {

    const notice =
        document.getElementById(
            "manualNotice"
        );

    if (!notice) return;


    const entries =
        getManualEntries();


    notice.textContent =
        entries.length
            ? entries.length +
              " manual position(s) ready"
            : "";

}


/* =========================================================
   GENERATE MAIN POSITION FILE
========================================================= */

function generate() {

    const typeEl =
        document.getElementById(
            "positionType"
        );


    const type =
        typeEl
            ? typeEl.value
            : "";


    if (!type) {

        alert(
            "Please select Position Type."
        );

        return;

    }


    let client1El =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientBuy"
                : "client1"
        );


    let client2El =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientSell"
                : "client2"
        );


    const client1 =
        client1El
            ? client1El.value.trim()
            : "";


    const client2 =
        client2El
            ? client2El.value.trim()
            : "";


    /*
       Single Client Buy,
       Single Client Sell,
       Both,
       OR Client List
       are all allowed.
    */

    if (
        uploadedClients.length === 0 &&
        !client1 &&
        !client2
    ) {

        alert(
            "Please provide Client Buy, Client Sell, or upload a client list."
        );

        return;

    }


    if (currentMode === "manual") {

        const manualEntries =
            getManualEntries();


        if (!manualEntries.length) {

            alert(
                "Please add at least one manual position."
            );

            return;

        }


        generateManualPositions(
            type,
            client1,
            client2,
            manualEntries
        );

        return;

    }


    const expiryEl =
        document.getElementById(
            "expiry"
        );


    const nseExpiry =
        expiryEl
            ? expiryEl.value
            : "";


    generateSegment(
        type,
        client1,
        client2,
        nseExpiry
    );

}


/* =========================================================
   CLIENT LIST
========================================================= */

function getClientList() {

    if (
        uploadedClients &&
        uploadedClients.length
    ) {

        return uploadedClients.slice();

    }


    const clients = [];


    const c1 =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientBuy"
                : "client1"
        );


    const c2 =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientSell"
                : "client2"
        );


    if (c1 && c1.value.trim()) {

        clients.push(
            c1.value.trim()
        );

    }


    if (c2 && c2.value.trim()) {

        clients.push(
            c2.value.trim()
        );

    }


    return clients;

}


/* =========================================================
   CLIENT BUY / SELL SIDE
========================================================= */

function resolveClientSide(
    client1,
    client2
) {

    const result = [];


    if (client1) {

        result.push({

            client: client1,
            side: "BUY"

        });

    }


    if (client2) {

        result.push({

            client: client2,
            side: "SELL"

        });

    }


    return result;

}


/* =========================================================
   MANUAL POSITION GENERATION
========================================================= */

function generateManualPositions(
    type,
    client1,
    client2,
    entries
) {

    const sides =
        resolveClientSide(
            client1,
            client2
        );


    if (!sides.length) {

        alert(
            "Please provide Client Buy, Client Sell, or upload a client list."
        );

        return;

    }


    const files = [];


    sides.forEach(side => {

        const rows = [];


        entries.forEach(entry => {

            rows.push(
                createPositionRow(
                    entry,
                    side.client,
                    side.side,
                    type
                )
            );

        });


        files.push({

            name:
                buildPositionFileName(
                    type,
                    side.side
                ),

            content:
                rowsToCSV(rows)

        });

    });


    generatedFiles =
        files;


    downloadGeneratedFiles(
        files
    );

}


/* =========================================================
   CREATE POSITION ROW
========================================================= */

function createPositionRow(
    entry,
    client,
    side,
    type
) {

    return {

        CLIENT_CODE: client,

        SYMBOL:
            entry.symbol,

        INSTRUMENT:
            entry.instrument,

        EXPIRY:
            entry.expiry,

        OPTION_TYPE:
            entry.option,

        STRIKE_PRICE:
            entry.strike,

        QUANTITY:
            entry.qty,

        PRICE:
            entry.price,

        BUY_SELL:
            side,

        SEGMENT:
            type

    };

}


/* =========================================================
   POSITION FILE NAME
========================================================= */

function buildPositionFileName(
    type,
    side
) {

    const names =
        fileNames[type] ||
        [];


    const base =
        names.length
            ? names[0]
            : "Position";


    return (
        base +
        "_" +
        side +
        ".csv"
    );

}


/* =========================================================
   OBJECTS TO CSV
========================================================= */

function rowsToCSV(rows) {

    if (!rows || !rows.length) {

        return "";

    }


    const headers =
        Object.keys(
            rows[0]
        );


    const output = [];


    output.push(
        headers.join(",")
    );


    rows.forEach(row => {

        output.push(
            headers
                .map(header =>
                    csvEscape(
                        row[header]
                    )
                )
                .join(",")
        );

    });


    return output.join("\r\n");

}


/* =========================================================
   CSV ESCAPE
========================================================= */

function csvEscape(value) {

    const text =
        String(value ?? "");


    if (
        text.includes(",") ||
        text.includes('"') ||
        text.includes("\n") ||
        text.includes("\r")
    ) {

        return (
            '"' +
            text.replace(
                /"/g,
                '""'
            ) +
            '"'
        );

    }


    return text;

}


/* =========================================================
   DOWNLOAD FILE
========================================================= */

function downloadFile(
    fileName,
    content
) {

    const blob =
        new Blob(
            [content],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const a =
        document.createElement("a");


    a.href = url;

    a.download =
        fileName;


    document.body.appendChild(a);

    a.click();

    a.remove();


    setTimeout(
        () =>
            URL.revokeObjectURL(url),
        1000
    );

}


/* =========================================================
   DOWNLOAD GENERATED FILES
========================================================= */

function downloadGeneratedFiles(
    files
) {

    if (!files || !files.length) {

        alert(
            "No files generated."
        );

        return;

    }


    files.forEach(
        (file, index) => {

            setTimeout(
                () => {

                    downloadFile(
                        file.name,
                        file.content
                    );

                },
                index * 250
            );

        }
    );

}


/* =========================================================
   CLEAR MANUAL INPUTS
========================================================= */

function clearManualInputs() {

    const container =
        document.getElementById(
            "manualContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    addManualRow();


    const buy =
        document.getElementById(
            "manualClientBuy"
        );

    const sell =
        document.getElementById(
            "manualClientSell"
        );


    if (buy) {

        buy.value = "";

    }


    if (sell) {

        sell.value = "";

    }


    refreshManualNotice();

}


/* =========================================================
   BULK GENERATOR
========================================================= */

function generateBulk() {

    const recordsEl =
        document.getElementById(
            "bulkRecords"
        );


    const recordCount =
        parseInt(
            recordsEl?.value || "0",
            10
        );


    if (
        !Number.isFinite(
            recordCount
        ) ||
        recordCount <= 0
    ) {

        alert(
            "Please enter valid number of records."
        );

        return;

    }


    const clients =
        bulkClients.length > 0
            ? bulkClients
            : uploadedClients;


    if (!clients.length) {

        alert(
            "Please upload a client list on the main page or select a Client File here."
        );

        return;

    }


    if (
        !bulkBhavcopyData ||
        !bulkBhavcopyData.length
    ) {

        alert(
            "Please upload Bhavcopy."
        );

        return;

    }


    const groups =
        getBulkFOGroups(
            bulkBhavcopyData
        );


    if (!groups.length) {

        alert(
            "Bhavcopy must contain valid Futures and Options records."
        );

        return;

    }


    const rows = [];


    for (
        let i = 0;
        i < recordCount;
        i++
    ) {

        const group =
            randomItem(groups);


        const client =
            randomItem(clients);


        if (!group || !client) {

            continue;

        }


        const isFuture =
            Math.random() < 0.80;


        const contract =
            isFuture
                ? randomItem(
                    group.futures
                  )
                : randomItem(
                    group.options
                  );


        if (!contract) {

            continue;

        }


        rows.push(
            createBulkPositionRow(
                contract,
                client,
                isFuture
                    ? "FUTURE"
                    : "OPTION"
            )
        );

    }


    if (!rows.length) {

        alert(
            "No bulk positions could be generated."
        );

        return;

    }


    const content =
        rowsToCSV(rows);


    downloadFile(
        "Bulk_Position_File.csv",
        content
    );

}


/* =========================================================
   BULK FO GROUPS
========================================================= */

function getBulkFOGroups(
    records
) {

    const map =
        new Map();


    records.forEach(record => {

        const instrument =
            cleanValue(
                record.INSTRUMENT ||
                record.Instrument ||
                record.instrument
            ).toUpperCase();


        const symbol =
            cleanValue(
                record.SYMBOL ||
                record.Symbol ||
                record.symbol
            );


        if (!symbol) {

            return;

        }


        let type = "";


        if (
            instrument === "IDF" ||
            instrument === "STF" ||
            instrument === "FUTIDX" ||
            instrument === "FUTSTK"
        ) {

            type = "FUT";

        }


        if (
            instrument === "IDO" ||
            instrument === "STO" ||
            instrument === "OPTIDX" ||
            instrument === "OPTSTK"
        ) {

            type = "OPT";

        }


        if (!type) {

            return;

        }


        const expiry =
            cleanValue(
                record.EXPIRY ||
                record.Expiry ||
                record.expiry ||
                record.EXPIRY_DATE
            );


        const key =
            symbol +
            "|" +
            expiry;


        if (!map.has(key)) {

            map.set(
                key,
                {
                    symbol,
                    expiry,
                    futures: [],
                    options: []
                }
            );

        }


        if (type === "FUT") {

            map
                .get(key)
                .futures
                .push(record);

        }

        else {

            map
                .get(key)
                .options
                .push(record);

        }

    });


    return Array.from(
        map.values()
    ).filter(
        group =>
            group.futures.length &&
            group.options.length
    );

}


/* =========================================================
   CREATE BULK POSITION ROW
========================================================= */

function createBulkPositionRow(
    contract,
    client,
    kind
) {

    const instrument =
        cleanValue(
            contract.INSTRUMENT ||
            contract.Instrument ||
            contract.instrument
        );


    const symbol =
        cleanValue(
            contract.SYMBOL ||
            contract.Symbol ||
            contract.symbol
        );


    const expiry =
        cleanValue(
            contract.EXPIRY ||
            contract.Expiry ||
            contract.expiry
        );


    const strike =
        numberValue(
            contract.STRIKE_PRICE ||
            contract.STRIKE ||
            contract.Strike
        );


    const optionType =
        cleanValue(
            contract.OPTION_TYPE ||
            contract.OPTION ||
            contract.Option_Type
        );


    const price =
        numberValue(
            contract.PRICE ||
            contract.LTP ||
            contract.CLOSE ||
            contract.CLOSE_PRICE
        );


    const qty =
        numberValue(
            contract.LOT_SIZE ||
            contract.LOT ||
            contract.QTY ||
            contract.QUANTITY
        );


    return {

        CLIENT_CODE:
            client,

        SYMBOL:
            symbol,

        INSTRUMENT:
            instrument,

        EXPIRY:
            expiry,

        OPTION_TYPE:
            optionType,

        STRIKE_PRICE:
            strike,

        QUANTITY:
            qty,

        PRICE:
            price,

        BUY_SELL:
            Math.random() < 0.5
                ? "BUY"
                : "SELL",

        POSITION_TYPE:
            kind

    };

}


/* =========================================================
   CLEAR BULK INPUTS
========================================================= */

function clearBulkInputs() {

    const records =
        document.getElementById(
            "bulkRecords"
        );

    if (records) {

        records.value = "";

    }


    const bhavcopy =
        document.getElementById(
            "bulkBhavcopy"
        );

    if (bhavcopy) {

        bhavcopy.value = "";

    }


    bulkBhavcopyData = [];


    const status =
        document.getElementById(
            "bulkBhavcopyStatus"
        );

    if (status) {

        status.textContent = "";

    }


    const clientFile =
        document.getElementById(
            "bulkClientFile"
        );

    if (clientFile) {

        clientFile.value = "";

    }


    bulkClients = [];


    const clientStatus =
        document.getElementById(
            "bulkClientStatus"
        );

    if (clientStatus) {

        clientStatus.textContent =
            "Optional — uses Main Client List if not selected";

    }

}


/* =========================================================
   SEGMENT GENERATOR
========================================================= */

function generateSegment(
    type,
    client1,
    client2,
    nseExpiry
) {

    const sides =
        resolveClientSide(
            client1,
            client2
        );


    if (!sides.length) {

        alert(
            "Please provide Client Buy, Client Sell, or upload a client list."
        );

        return;

    }


    const generated = [];


    sides.forEach(side => {

        const rows =
            buildSegmentRows(
                type,
                side.client,
                side.side,
                nseExpiry
            );


        if (rows.length) {

            generated.push({

                name:
                    buildPositionFileName(
                        type,
                        side.side
                    ),

                content:
                    rowsToCSV(rows)

            });

        }

    });


    if (!generated.length) {

        alert(
            "No position data generated."
        );

        return;

    }


    generatedFiles =
        generated;


    downloadGeneratedFiles(
        generated
    );

}


/* =========================================================
   BUILD SEGMENT ROWS
========================================================= */

function buildSegmentRows(
    type,
    client,
    side,
    nseExpiry
) {

    /*
       This function keeps the existing
       segment-specific generation logic
       below.
    */

    const rows = [];


    if (type === "FO") {

        const symbols =
            getSelectedSymbols();


        symbols.forEach(symbol => {

            rows.push({

                CLIENT_CODE:
                    client,

                SYMBOL:
                    symbol,

                BUY_SELL:
                    side,

                EXPIRY:
                    nseExpiry || "",

                SEGMENT:
                    "FO"

            });

        });

    }

    else {

        rows.push({

            CLIENT_CODE:
                client,

            BUY_SELL:
                side,

            SEGMENT:
                type

        });

    }


    return rows;

}


/* =========================================================
   SELECTED SYMBOLS
========================================================= */

function getSelectedSymbols() {

    const result = [];


    document
        .querySelectorAll(
            "#checkboxContainer input[type=checkbox]:checked"
        )
        .forEach(input => {

            const value =
                input.value.trim();

            if (value) {

                result.push(value);

            }

        });


    return result;

}


/* =========================================================
   CHECKBOX GENERATOR
========================================================= */

function createCheckbox(
    value,
    label
) {

    const wrapper =
        document.createElement(
            "label"
        );


    wrapper.className =
        "symbol-check";


    wrapper.innerHTML = `
        <input
            type="checkbox"
            value="${escapeHtml(value)}"
        >
        <span>${escapeHtml(label || value)}</span>
    `;


    return wrapper;

}


/* =========================================================
   RENDER CHECKBOXES
========================================================= */

function renderSymbolCheckboxes(
    symbols
) {

    const container =
        document.getElementById(
            "checkboxContainer"
        );


    if (!container) return;


    container.innerHTML = "";


    symbols.forEach(symbol => {

        container.appendChild(
            createCheckbox(
                symbol,
                symbol
            )
        );

    });

}


/* =========================================================
   ADDITIONAL STRIKES
========================================================= */

function readAdditionalStrikes() {

    const input =
        document.getElementById(
            "additionalStrikes"
        );


    if (!input) {

        return [];

    }


    const value =
        input.value || "";


    return value
        .split(",")
        .map(v =>
            numberValue(v)
        )
        .filter(
            v =>
                Number.isFinite(v) &&
                v > 0
        );

}


/* =========================================================
   EXPIRY
========================================================= */

function getExpiryValue() {

    const input =
        document.getElementById(
            "expiry"
        );


    return input
        ? input.value
        : "";

}


/* =========================================================
   BSE EXPIRY
========================================================= */

function getBSEExpiryValue() {

    const input =
        document.getElementById(
            "sensexBankexExpiry"
        );


    return input
        ? input.value
        : "";

}


/* =========================================================
   COMMON INPUT INITIALIZATION
========================================================= */

function initializePositionPage() {

    const typeEl =
        document.getElementById(
            "positionType"
        );


    if (typeEl) {

        typeEl.addEventListener(
            "change",
            function () {

                setSegmentVisibility(
                    this.value
                );

            }
        );


        setSegmentVisibility(
            typeEl.value
        );

    }


    refreshManualReopenLink();


    const manualContainer =
        document.getElementById(
            "manualContainer"
        );


    if (
        manualContainer &&
        !manualContainer.querySelector(
            ".manual-row"
        )
    ) {

        addManualRow();

    }

}


/* =========================================================
   PAGE READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePositionPage
    );

}

else {

    initializePositionPage();

}


/* =========================================================
   MANUAL INPUT EVENTS
========================================================= */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.closest(
                "#manualPanel"
            )
        ) {

            refreshManualNotice();

        }

    }
);


/* =========================================================
   BULK RECORD VALIDATION
========================================================= */

function validateBulkRecords() {

    const input =
        document.getElementById(
            "bulkRecords"
        );


    if (!input) {

        return false;

    }


    const value =
        parseInt(
            input.value,
            10
        );


    return (
        Number.isFinite(value) &&
        value > 0
    );

}


/* =========================================================
   BULK FILE VALIDATION
========================================================= */

function validateBulkBhavcopy() {

    return (
        Array.isArray(
            bulkBhavcopyData
        ) &&
        bulkBhavcopyData.length > 0
    );

}


/* =========================================================
   DOWNLOAD ALL GENERATED
========================================================= */

function downloadAllGenerated() {

    if (
        !generatedFiles ||
        !generatedFiles.length
    ) {

        alert(
            "No generated files available."
        );

        return;

    }


    downloadGeneratedFiles(
        generatedFiles
    );

}


/* =========================================================
   CLEAR GENERATED
========================================================= */

function clearGeneratedFiles() {

    generatedFiles = [];

}


/* =========================================================
   EXPORT GLOBALS
========================================================= */

window.setMode =
    setMode;

window.generate =
    generate;

window.generateBulk =
    generateBulk;

window.addManualRow =
    addManualRow;

window.removeManualRow =
    removeManualRow;

window.clearManualInputs =
    clearManualInputs;

window.handleClientFileUpload =
    handleClientFileUpload;

window.clearClientFile =
    clearClientFile;

window.handleManualClientFileUpload =
    handleManualClientFileUpload;

window.clearManualClientFile =
    clearManualClientFile;

window.handleBulkClientFileUpload =
    handleBulkClientFileUpload;

window.clearBulkClientFile =
    clearBulkClientFile;

window.handleBulkBhavcopyUpload =
    handleBulkBhavcopyUpload;

window.clearBulkInputs =
    clearBulkInputs;

window.downloadAllGenerated =
    downloadAllGenerated;

window.clearGeneratedFiles =
    clearGeneratedFiles;


/* =========================================================
   END OF PART 1
   PART 2 CONTINUES DIRECTLY AFTER THIS
========================================================= *//* =========================================================
   PART 2
   POSITION FILE GENERATION LOGIC
========================================================= */


/* =========================================================
   SAMPLE POSITION DATA
========================================================= */

function getSamplePositionData(type) {

    const data = [];


    if (type === "FO") {

        data.push({

            symbol: "NIFTY",

            instrument: "FUTIDX",

            optionType: "",

            strike: "",

            qty: 50,

            price: 0,

            expiry: getExpiryValue()

        });


        data.push({

            symbol: "BANKNIFTY",

            instrument: "FUTIDX",

            optionType: "",

            strike: "",

            qty: 15,

            price: 0,

            expiry: getExpiryValue()

        });

    }


    else if (type === "MCX") {

        data.push({

            symbol: "CRUDEOIL",

            instrument: "FUTCOM",

            optionType: "",

            strike: "",

            qty: 1,

            price: 0,

            expiry: "",

        });

    }


    else if (type === "CD") {

        data.push({

            symbol: "USDINR",

            instrument: "FUTCUR",

            optionType: "",

            strike: "",

            qty: 1,

            price: 0,

            expiry: ""

        });

    }


    else if (type === "NCDEX") {

        data.push({

            symbol: "GUARSEED",

            instrument: "FUTCOM",

            optionType: "",

            strike: "",

            qty: 1,

            price: 0,

            expiry: ""

        });

    }


    else if (type === "NSECOM") {

        data.push({

            symbol: "GOLD",

            instrument: "FUTCOM",

            optionType: "",

            strike: "",

            qty: 1,

            price: 0,

            expiry: ""

        });

    }


    return data;

}


/* =========================================================
   NORMALIZE POSITION DATA
========================================================= */

function normalizePositionData(
    entry,
    client,
    side,
    segment
) {

    return {

        CLIENT_CODE:
            client,

        SYMBOL:
            cleanValue(
                entry.symbol
            ),

        INSTRUMENT:
            cleanValue(
                entry.instrument
            ),

        EXPIRY:
            cleanValue(
                entry.expiry
            ),

        OPTION_TYPE:
            cleanValue(
                entry.optionType ||
                entry.option
            ),

        STRIKE_PRICE:
            numberValue(
                entry.strike
            ),

        QUANTITY:
            numberValue(
                entry.qty ||
                entry.quantity
            ),

        PRICE:
            numberValue(
                entry.price
            ),

        BUY_SELL:
            side,

        SEGMENT:
            segment

    };

}


/* =========================================================
   BUILD SAMPLE ROWS
========================================================= */

function buildSampleRows(
    type,
    client,
    side
) {

    const sample =
        getSamplePositionData(
            type
        );


    return sample.map(
        entry =>
            normalizePositionData(
                entry,
                client,
                side,
                type
            )
    );

}


/* =========================================================
   GENERATE SAMPLE FILE
========================================================= */

function generateSampleFile(
    type,
    client,
    side
) {

    const rows =
        buildSampleRows(
            type,
            client,
            side
        );


    if (!rows.length) {

        return null;

    }


    return {

        name:
            buildPositionFileName(
                type,
                side
            ),

        content:
            rowsToCSV(rows)

    };

}


/* =========================================================
   GENERATE SAMPLE FOR CLIENTS
========================================================= */

function generateSampleForClients(
    type,
    clients
) {

    const files = [];


    clients.forEach(client => {

        if (!client) {

            return;

        }


        const buy =
            generateSampleFile(
                type,
                client,
                "BUY"
            );


        if (buy) {

            files.push(buy);

        }


        const sell =
            generateSampleFile(
                type,
                client,
                "SELL"
            );


        if (sell) {

            files.push(sell);

        }

    });


    return files;

}


/* =========================================================
   SAMPLE MODE GENERATION
========================================================= */

function generateSampleMode(
    type,
    client1,
    client2
) {

    const clients = [];


    if (uploadedClients.length) {

        uploadedClients.forEach(
            client => {

                if (client) {

                    clients.push(
                        client
                    );

                }

            }
        );

    }

    else {

        if (client1) {

            clients.push(
                client1
            );

        }


        if (client2) {

            clients.push(
                client2
            );

        }

    }


    if (!clients.length) {

        alert(
            "Please provide Client Buy, Client Sell, or upload a client list."
        );

        return;

    }


    const files =
        generateSampleForClients(
            type,
            clients
        );


    if (!files.length) {

        alert(
            "No sample position files generated."
        );

        return;

    }


    generatedFiles =
        files;


    downloadGeneratedFiles(
        files
    );

}


/* =========================================================
   OPTION TYPE NORMALIZATION
========================================================= */

function normalizeOptionType(
    value
) {

    const text =
        cleanValue(
            value
        ).toUpperCase();


    if (
        text === "CALL" ||
        text === "C"
    ) {

        return "CE";

    }


    if (
        text === "PUT" ||
        text === "P"
    ) {

        return "PE";

    }


    if (
        text === "CE" ||
        text === "PE"
    ) {

        return text;

    }


    return "";

}


/* =========================================================
   INSTRUMENT NORMALIZATION
========================================================= */

function normalizeInstrument(
    value
) {

    const text =
        cleanValue(
            value
        ).toUpperCase();


    const aliases = {

        FUTURE: "FUTIDX",

        FUT: "FUTIDX",

        FUTURES: "FUTIDX",

        OPTION: "OPTIDX",

        OPTIONS: "OPTIDX",

        FUTURE_INDEX: "FUTIDX",

        OPTION_INDEX: "OPTIDX",

        FUTURE_STOCK: "FUTSTK",

        OPTION_STOCK: "OPTSTK"

    };


    return (
        aliases[text] ||
        text
    );

}


/* =========================================================
   EXPIRY FORMAT
========================================================= */

function formatExpiry(
    value
) {

    if (!value) {

        return "";

    }


    const text =
        String(value)
            .trim();


    if (
        /^\d{2}\/\d{2}\/\d{4}$/.test(
            text
        )
    ) {

        return text;

    }


    if (
        /^\d{4}-\d{2}-\d{2}$/.test(
            text
        )
    ) {

        const parts =
            text.split("-");


        return (
            parts[2] +
            "/" +
            parts[1] +
            "/" +
            parts[0]
        );

    }


    const date =
        new Date(text);


    if (
        !Number.isNaN(
            date.getTime()
        )
    ) {

        const dd =
            String(
                date.getDate()
            ).padStart(2, "0");


        const mm =
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const yyyy =
            date.getFullYear();


        return (
            dd +
            "/" +
            mm +
            "/" +
            yyyy
        );

    }


    return text;

}


/* =========================================================
   DATE TO YYYYMMDD
========================================================= */

function expiryYYYYMMDD(
    value
) {

    if (!value) {

        return "";

    }


    const text =
        String(value)
            .trim();


    if (
        /^\d{8}$/.test(
            text
        )
    ) {

        return text;

    }


    if (
        /^\d{4}-\d{2}-\d{2}$/.test(
            text
        )
    ) {

        return text.replace(
            /-/g,
            ""
        );

    }


    const date =
        new Date(text);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return (
        String(
            date.getFullYear()
        ) +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}


/* =========================================================
   STRIKE STEP
========================================================= */

function getStrikeStep(
    symbol,
    segment
) {

    const s =
        cleanValue(
            symbol
        ).toUpperCase();


    if (
        segment === "FO"
    ) {

        if (
            s === "NIFTY"
        ) {

            return 50;

        }


        if (
            s === "BANKNIFTY"
        ) {

            return 100;

        }


        if (
            s === "FINNIFTY"
        ) {

            return 50;

        }


        if (
            s === "MIDCPNIFTY"
        ) {

            return 25;

        }

    }


    if (
        segment === "MCX"
    ) {

        if (
            s.includes("CRUDE")
        ) {

            return 50;

        }


        if (
            s.includes("GOLD")
        ) {

            return 100;

        }


        if (
            s.includes("SILVER")
        ) {

            return 100;

        }

    }


    return 50;

}


/* =========================================================
   GENERATE STRIKE VALUES
========================================================= */

function generateStrikeValues(
    center,
    step,
    count
) {

    const result = [];


    center =
        numberValue(
            center
        );


    step =
        numberValue(
            step
        );


    count =
        parseInt(
            count,
            10
        );


    if (
        !center ||
        !step ||
        !count
    ) {

        return result;

    }


    for (
        let i = -count;
        i <= count;
        i++
    ) {

        result.push(
            center +
            i * step
        );

    }


    return result;

}


/* =========================================================
   GET ADDITIONAL STRIKES
========================================================= */

function getAllAdditionalStrikes(
    symbol,
    segment
) {

    const values =
        readAdditionalStrikes();


    if (values.length) {

        return values;

    }


    const step =
        getStrikeStep(
            symbol,
            segment
        );


    const center =
        numberValue(
            document.getElementById(
                "strike"
            )?.value
        );


    if (!center) {

        return [];

    }


    return generateStrikeValues(
        center,
        step,
        2
    );

}


/* =========================================================
   BUILD OPTION POSITION
========================================================= */

function buildOptionPosition(
    symbol,
    expiry,
    strike,
    optionType,
    qty,
    price,
    client,
    side,
    instrument
) {

    return {

        CLIENT_CODE:
            client,

        SYMBOL:
            symbol,

        INSTRUMENT:
            normalizeInstrument(
                instrument
            ),

        EXPIRY:
            formatExpiry(
                expiry
            ),

        OPTION_TYPE:
            normalizeOptionType(
                optionType
            ),

        STRIKE_PRICE:
            strike,

        QUANTITY:
            qty,

        PRICE:
            price,

        BUY_SELL:
            side

    };

}


/* =========================================================
   BUILD FUTURE POSITION
========================================================= */

function buildFuturePosition(
    symbol,
    expiry,
    qty,
    price,
    client,
    side,
    instrument
) {

    return {

        CLIENT_CODE:
            client,

        SYMBOL:
            symbol,

        INSTRUMENT:
            normalizeInstrument(
                instrument
            ),

        EXPIRY:
            formatExpiry(
                expiry
            ),

        OPTION_TYPE:
            "",

        STRIKE_PRICE:
            "",

        QUANTITY:
            qty,

        PRICE:
            price,

        BUY_SELL:
            side

    };

}


/* =========================================================
   POSITION TYPE CHECK
========================================================= */

function isOptionInstrument(
    instrument
) {

    const value =
        normalizeInstrument(
            instrument
        );


    return (
        value === "OPTIDX" ||
        value === "OPTSTK" ||
        value === "IDO" ||
        value === "STO"
    );

}


/* =========================================================
   POSITION TYPE FUTURE CHECK
========================================================= */

function isFutureInstrument(
    instrument
) {

    const value =
        normalizeInstrument(
            instrument
        );


    return (
        value === "FUTIDX" ||
        value === "FUTSTK" ||
        value === "FUTCOM" ||
        value === "FUTCUR" ||
        value === "IDF" ||
        value === "STF"
    );

}


/* =========================================================
   SAMPLE FO POSITIONS
========================================================= */

function buildFOPositions(
    client,
    side,
    expiry
) {

    const rows = [];


    const symbols = [
        {
            symbol: "NIFTY",
            instrument: "FUTIDX",
            qty: 50
        },
        {
            symbol: "BANKNIFTY",
            instrument: "FUTIDX",
            qty: 15
        }
    ];


    symbols.forEach(
        item => {

            rows.push(
                buildFuturePosition(
                    item.symbol,
                    expiry,
                    item.qty,
                    0,
                    client,
                    side,
                    item.instrument
                )
            );

        }
    );


    return rows;

}


/* =========================================================
   SAMPLE MCX POSITIONS
========================================================= */

function buildMCXPositions(
    client,
    side
) {

    const rows = [];


    rows.push(
        buildFuturePosition(
            "CRUDEOIL",
            "",
            1,
            0,
            client,
            side,
            "FUTCOM"
        )
    );


    return rows;

}


/* =========================================================
   SAMPLE CD POSITIONS
========================================================= */

function buildCDPositions(
    client,
    side
) {

    return [

        buildFuturePosition(
            "USDINR",
            "",
            1,
            0,
            client,
            side,
            "FUTCUR"
        )

    ];

}


/* =========================================================
   SAMPLE NCDEX POSITIONS
========================================================= */

function buildNCDEXPositions(
    client,
    side
) {

    return [

        buildFuturePosition(
            "GUARSEED",
            "",
            1,
            0,
            client,
            side,
            "FUTCOM"
        )

    ];

}


/* =========================================================
   SAMPLE NSE COM POSITIONS
========================================================= */

function buildNSECOMPositions(
    client,
    side
) {

    return [

        buildFuturePosition(
            "GOLD",
            "",
            1,
            0,
            client,
            side,
            "FUTCOM"
        )

    ];

}


/* =========================================================
   SEGMENT SAMPLE DATA
========================================================= */

function getSegmentSampleRows(
    type,
    client,
    side,
    expiry
) {

    switch (type) {

        case "FO":

            return buildFOPositions(
                client,
                side,
                expiry
            );


        case "MCX":

            return buildMCXPositions(
                client,
                side
            );


        case "CD":

            return buildCDPositions(
                client,
                side
            );


        case "NCDEX":

            return buildNCDEXPositions(
                client,
                side
            );


        case "NSECOM":

            return buildNSECOMPositions(
                client,
                side
            );


        default:

            return [];

    }

}


/* =========================================================
   GENERATE SEGMENT SAMPLE
========================================================= */

function generateSegmentSample(
    type,
    client,
    side,
    expiry
) {

    const rows =
        getSegmentSampleRows(
            type,
            client,
            side,
            expiry
        );


    if (!rows.length) {

        return null;

    }


    return {

        name:
            buildPositionFileName(
                type,
                side
            ),

        content:
            rowsToCSV(rows)

    };

}


/* =========================================================
   GENERATE SEGMENT FILES
========================================================= */

function generateSegmentFiles(
    type,
    client1,
    client2,
    expiry
) {

    const files = [];


    if (client1) {

        const buy =
            generateSegmentSample(
                type,
                client1,
                "BUY",
                expiry
            );


        if (buy) {

            files.push(buy);

        }

    }


    if (client2) {

        const sell =
            generateSegmentSample(
                type,
                client2,
                "SELL",
                expiry
            );


        if (sell) {

            files.push(sell);

        }

    }


    return files;

}


/* =========================================================
   EXISTING SEGMENT GENERATOR OVERRIDE
========================================================= */

function generateSegment(
    type,
    client1,
    client2,
    nseExpiry
) {

    /*
       Client Buy only:
       generates BUY.

       Client Sell only:
       generates SELL.

       Both:
       generates both.

       Client file:
       generates according to
       uploaded client list.
    */


    let files = [];


    if (uploadedClients.length) {

        uploadedClients.forEach(
            client => {

                if (!client) return;


                const buy =
                    generateSegmentSample(
                        type,
                        client,
                        "BUY",
                        nseExpiry
                    );


                if (buy) {

                    files.push(buy);

                }


                const sell =
                    generateSegmentSample(
                        type,
                        client,
                        "SELL",
                        nseExpiry
                    );


                if (sell) {

                    files.push(sell);

                }

            }
        );

    }

    else {

        files =
            generateSegmentFiles(
                type,
                client1,
                client2,
                nseExpiry
            );

    }


    if (!files.length) {

        alert(
            "No position files generated."
        );

        return;

    }


    generatedFiles =
        files;


    downloadGeneratedFiles(
        files
    );

}


/* =========================================================
   END OF PART 2
========================================================= *//* =========================================================
   PART 3
   RAW CSV / FILE GENERATION / UI HELPERS
========================================================= */


/* =========================================================
   NCDEX / NSECOM RAW CSV TEMPLATES
========================================================= */

const rawCSVExtra = {

    NCDEX: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4`,

    NSECOM: `Sgmt,Src,RptgDt,BizDt,TradRegnOrgn,ClrMmbId,BrkrOrCtdnPtcptId,ClntTp,ClntId,FinInstrmTp,ISIN,TckrSymb,XpryDt,FininstrmActlXpryDt,StrkPric,OptnTp,NewBrdLotQty,OpngLngQty,OpngLngVal,OpngShrtQty,OpngShrtVal,OpnBuyTradgQty,OpnBuyTradgVal,OpnSellTradgQty,OpnSellTradgVal,PreExrcAssgndLngQty,PreExrcAssgndLngVal,PreExrcAssgndShrtQty,PreExrcAssgndShrtVal,ExrcdQty,AssgndQty,PstExrcAssgndLngQty,PstExrcAssgndLngVal,PstExrcAssgndShrtQty,PstExrcAssgndShrtVal,SttlmPric,RefRate,PrmAmt,DalyMrkToMktSettlmVal,FutrsFnlSttlmVal,ExrcAssgndVal,Rmks,Rsvd1,Rsvd2,Rsvd3,Rsvd4`

};


/* =========================================================
   SHORT FILE LABEL
========================================================= */

function shortFileLabel(name) {

    if (!name) return "";

    let value =
        String(name)
            .replace(/^Position_/i, "")
            .replace(/_6538_2026$/i, "");

    return value;

}


/* =========================================================
   BUILD EXPIRY INPUTS
========================================================= */

function buildExpiryInputs(type) {

    const container =
        document.getElementById(
            "symbolExpiryContainer"
        );

    if (!container) return;


    container.innerHTML = "";


    const symbols = {

        MCX: [
            "CRUDEOIL",
            "SILVERM",
            "COPPER",
            "NATURALGAS"
        ],

        CD: [
            "USDINR",
            "GBPINR",
            "EURINR",
            "JPYINR"
        ],

        NCDEX: [
            "GUARSEED"
        ],

        NSECOM: [
            "GOLD"
        ]

    };


    const list =
        symbols[type] || [];


    if (!list.length) {

        container.style.display =
            "none";

        return;

    }


    container.style.display =
        "block";


    list.forEach(symbol => {

        const row =
            document.createElement(
                "div"
            );


        row.className =
            "symbol-expiry-row";


        row.innerHTML = `

            <label>
                ${escapeHtml(symbol)}
            </label>

            <input
                type="date"
                class="symbol-expiry"
                data-symbol="${escapeHtml(symbol)}"
            >

        `;


        container.appendChild(row);

    });

}


/* =========================================================
   READ SYMBOL EXPIRIES
========================================================= */

function getSymbolExpiries() {

    const result = {};


    document
        .querySelectorAll(
            ".symbol-expiry"
        )
        .forEach(input => {

            const symbol =
                input.dataset.symbol;

            const value =
                input.value;


            if (symbol && value) {

                result[symbol] =
                    value;

            }

        });


    return result;

}


/* =========================================================
   CLEAR MANUAL ROWS
========================================================= */

function clearManualRows() {

    const container =
        document.getElementById(
            "manualContainer"
        );


    if (!container) return;


    container.innerHTML = "";

}


/* =========================================================
   MANUAL DRAWER REOPEN
========================================================= */

function reopenManualEntry() {

    setMode("manual");

}


/* =========================================================
   SAMPLE MODE
========================================================= */

function openSamplePanel() {

    setMode("sample");

}


/* =========================================================
   BULK MODE
========================================================= */

function openBulkPanel() {

    setMode("bulk");

}


/* =========================================================
   MODE RADIO CHANGE
========================================================= */

document.addEventListener(
    "change",
    function (event) {

        const radio =
            event.target.closest(
                "#modeToggle input[type=radio]"
            );


        if (!radio) return;


        if (radio.dataset.mode) {

            setMode(
                radio.dataset.mode
            );

        }

    }
);


/* =========================================================
   CLIENT INPUT CHANGE
========================================================= */

function updateClientStatus() {

    const buy =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientBuy"
                : "client1"
        );


    const sell =
        document.getElementById(
            currentMode === "manual"
                ? "manualClientSell"
                : "client2"
        );


    const values = [];


    if (
        buy &&
        buy.value.trim()
    ) {

        values.push(
            "Buy: " +
            buy.value.trim()
        );

    }


    if (
        sell &&
        sell.value.trim()
    ) {

        values.push(
            "Sell: " +
            sell.value.trim()
        );

    }


    const status =
        document.getElementById(
            "clientStatus"
        );


    if (status) {

        status.textContent =
            values.join(" | ");

    }

}


/* =========================================================
   CLIENT INPUT EVENT
========================================================= */

document.addEventListener(
    "input",
    function (event) {

        if (
            event.target.id === "client1" ||
            event.target.id === "client2" ||
            event.target.id === "manualClientBuy" ||
            event.target.id === "manualClientSell"
        ) {

            updateClientStatus();

        }

    }
);


/* =========================================================
   POSITION TYPE CHANGE
========================================================= */

document.addEventListener(
    "change",
    function (event) {

        if (
            event.target.id ===
            "positionType"
        ) {

            loadFiles();

        }

    }
);


/* =========================================================
   LOAD FILES AFTER DOM READY
========================================================= */

function safeLoadFiles() {

    const type =
        document.getElementById(
            "positionType"
        );


    if (!type) return;


    loadFiles();

}


/* =========================================================
   FILE CHECKBOX SELECTION
========================================================= */

function getSelectedFiles() {

    return Array
        .from(
            document.querySelectorAll(
                ".f:checked"
            )
        )
        .map(
            cb =>
                cb.value
        );

}


/* =========================================================
   VALIDATE FILE SELECTION
========================================================= */

function validateSelectedFiles() {

    const type =
        document.getElementById(
            "positionType"
        )?.value;


    if (type !== "FO") {

        return true;

    }


    const selected =
        getSelectedFiles();


    if (!selected.length) {

        return false;

    }


    return true;

}


/* =========================================================
   CREATE STANDARD POSITION HEADER
========================================================= */

function getStandardHeaders() {

    return [

        "Sgmt",
        "Src",
        "RptgDt",
        "BizDt",
        "TradRegnOrgn",
        "ClrMmbId",
        "BrkrOrCtdnPtcptId",
        "ClntTp",
        "ClntId",
        "FinInstrmTp",
        "ISIN",
        "TckrSymb",
        "XpryDt",
        "FininstrmActlXpryDt",
        "StrkPric",
        "OptnTp",
        "NewBrdLotQty",
        "OpngLngQty",
        "OpngLngVal",
        "OpngShrtQty",
        "OpngShrtVal",
        "OpnBuyTradgQty",
        "OpnBuyTradgVal",
        "OpnSellTradgQty",
        "OpnSellTradgVal",
        "PreExrcAssgndLngQty",
        "PreExrcAssgndLngVal",
        "PreExrcAssgndShrtQty",
        "PreExrcAssgndShrtVal",
        "ExrcdQty",
        "AssgndQty",
        "PstExrcAssgndLngQty",
        "PstExrcAssgndLngVal",
        "PstExrcAssgndShrtQty",
        "PstExrcAssgndShrtVal",
        "SttlmPric",
        "RefRate",
        "PrmAmt",
        "DalyMrkToMktSettlmVal",
        "FutrsFnlSttlmVal",
        "ExrcAssgndVal",
        "Rmks",
        "Rsvd1",
        "Rsvd2",
        "Rsvd3",
        "Rsvd4"

    ];

}


/* =========================================================
   CREATE STANDARD COLUMN OBJECT
========================================================= */

function createColumnObject() {

    const obj = {};


    getStandardHeaders()
        .forEach(
            header => {

                obj[header] = "";

            }
        );


    return obj;

}


/* =========================================================
   SET COLUMN
========================================================= */

function setColumn(
    obj,
    key,
    value
) {

    if (!obj) return;


    obj[key] =
        value === undefined ||
        value === null
            ? ""
            : String(value);

}


/* =========================================================
   DATE FOR REPORTING
========================================================= */

function getCurrentDateYYYYMMDD() {

    const date =
        new Date();


    const yyyy =
        date.getFullYear();


    const mm =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dd =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        yyyy +
        mm +
        dd
    );

}


/* =========================================================
   FORMAT POSITION DATE
========================================================= */

function normalizeReportDate(
    value
) {

    if (!value) {

        return getCurrentDateYYYYMMDD();

    }


    const text =
        String(value)
            .trim();


    if (
        /^\d{8}$/.test(
            text
        )
    ) {

        return text;

    }


    return expiryYYYYMMDD(
        text
    ) ||
    getCurrentDateYYYYMMDD();

}


/* =========================================================
   CLIENT TYPE
========================================================= */

function getClientType() {

    return "C";

}


/* =========================================================
   COMMON STATIC VALUES
========================================================= */

function getStaticPositionValues(
    segment
) {

    const values = {

        Sgmt:
            segment === "FO"
                ? "FO"
                : segment,

        Src:
            segment === "MCX"
                ? "MCXCCL"
                : "NCL",

        TradRegnOrgn:
            "1",

        ClrMmbId:
            "6538",

        BrkrOrCtdnPtcptId:
            "6538",

        ClntTp:
            getClientType()

    };


    return values;

}


/* =========================================================
   POSITION CSV ROW
========================================================= */

function makeStandardPositionRow(
    entry,
    client,
    side,
    segment
) {

    const cols =
        createColumnObject();


    const staticValues =
        getStaticPositionValues(
            segment
        );


    Object.keys(
        staticValues
    ).forEach(
        key => {

            setColumn(
                cols,
                key,
                staticValues[key]
            );

        }
    );


    setColumn(
        cols,
        "ClntId",
        client
    );


    const instrument =
        normalizeInstrument(
            entry.instrument
        );


    const isOption =
        isOptionInstrument(
            instrument
        );


    const isBuy =
        String(side)
            .toUpperCase() ===
        "BUY";


    const qty =
        Math.abs(
            numberValue(
                entry.qty ||
                entry.quantity
            )
        );


    const price =
        numberValue(
            entry.price
        );


    const value =
        qty *
        price;


    const expiry =
        normalizeReportDate(
            entry.expiry
        );


    setColumn(
        cols,
        "RptgDt",
        getCurrentDateYYYYMMDD()
    );


    setColumn(
        cols,
        "BizDt",
        getCurrentDateYYYYMMDD()
    );


    setColumn(
        cols,
        "FinInstrmTp",
        instrument
    );


    setColumn(
        cols,
        "TckrSymb",
        entry.symbol
    );


    setColumn(
        cols,
        "XpryDt",
        expiry
    );


    setColumn(
        cols,
        "FininstrmActlXpryDt",
        expiry
    );


    setColumn(
        cols,
        "NewBrdLotQty",
        qty
    );


    if (
        isOption
    ) {

        setColumn(
            cols,
            "StrkPric",
            numberValue(
                entry.strike
            )
        );


        setColumn(
            cols,
            "OptnTp",
            normalizeOptionType(
                entry.option ||
                entry.optionType
            )
        );

    }

    else {

        setColumn(
            cols,
            "StrkPric",
            ""
        );


        setColumn(
            cols,
            "OptnTp",
            ""
        );

    }


    setColumn(
        cols,
        "OpngLngQty",
        "0"
    );


    setColumn(
        cols,
        "OpngLngVal",
        "0"
    );


    setColumn(
        cols,
        "OpngShrtQty",
        "0"
    );


    setColumn(
        cols,
        "OpngShrtVal",
        "0"
    );


    setColumn(
        cols,
        "OpnBuyTradgQty",
        isBuy
            ? qty
            : 0
    );


    setColumn(
        cols,
        "OpnBuyTradgVal",
        isBuy
            ? value
            : 0
    );


    setColumn(
        cols,
        "OpnSellTradgQty",
        isBuy
            ? 0
            : qty
    );


    setColumn(
        cols,
        "OpnSellTradgVal",
        isBuy
            ? 0
            : value
    );


    setColumn(
        cols,
        "PreExrcAssgndLngQty",
        "0"
    );


    setColumn(
        cols,
        "PreExrcAssgndLngVal",
        "0"
    );


    setColumn(
        cols,
        "PreExrcAssgndShrtQty",
        "0"
    );


    setColumn(
        cols,
        "PreExrcAssgndShrtVal",
        "0"
    );


    setColumn(
        cols,
        "ExrcdQty",
        "0"
    );


    setColumn(
        cols,
        "AssgndQty",
        "0"
    );


    setColumn(
        cols,
        "PstExrcAssgndLngQty",
        isBuy
            ? qty
            : 0
    );


    setColumn(
        cols,
        "PstExrcAssgndLngVal",
        isBuy
            ? value
            : 0
    );


    setColumn(
        cols,
        "PstExrcAssgndShrtQty",
        isBuy
            ? 0
            : qty
    );


    setColumn(
        cols,
        "PstExrcAssgndShrtVal",
        isBuy
            ? 0
            : value
    );


    setColumn(
        cols,
        "SttlmPric",
        price
    );


    setColumn(
        cols,
        "RefRate",
        ""
    );


    setColumn(
        cols,
        "PrmAmt",
        "0"
    );


    setColumn(
        cols,
        "DalyMrkToMktSettlmVal",
        "0"
    );


    setColumn(
        cols,
        "FutrsFnlSttlmVal",
        "0"
    );


    setColumn(
        cols,
        "ExrcAssgndVal",
        "0"
    );


    return cols;

}


/* =========================================================
   BUILD STANDARD ROWS
========================================================= */

function buildStandardRows(
    entries,
    client,
    side,
    segment
) {

    const rows = [];


    entries.forEach(
        entry => {

            rows.push(
                makeStandardPositionRow(
                    entry,
                    client,
                    side,
                    segment
                )
            );

        }
    );


    return rows;

}


/* =========================================================
   STANDARD FILE FROM ENTRIES
========================================================= */

function makeStandardFile(
    entries,
    client,
    side,
    segment,
    fileName
) {

    const rows =
        buildStandardRows(
            entries,
            client,
            side,
            segment
        );


    if (!rows.length) {

        return null;

    }


    const headers =
        getStandardHeaders();


    const lines = [];


    lines.push(
        headers.join(",")
    );


    rows.forEach(
        row => {

            lines.push(
                headers
                    .map(
                        header =>
                            csvEscape(
                                row[header]
                            )
                    )
                    .join(",")
            );

        }
    );


    return {

        name:
            fileName,

        content:
            lines.join("\r\n")

    };

}


/* =========================================================
   BUILD POSITION ENTRY FROM MANUAL
========================================================= */

function manualEntryToPosition(
    entry
) {

    return {

        symbol:
            cleanValue(
                entry.symbol
            ),

        instrument:
            normalizeInstrument(
                entry.instrument
            ),

        expiry:
            cleanValue(
                entry.expiry
            ),

        option:
            normalizeOptionType(
                entry.option
            ),

        strike:
            numberValue(
                entry.strike
            ),

        qty:
            numberValue(
                entry.qty
            ),

        price:
            numberValue(
                entry.price
            )

    };

}


/* =========================================================
   MANUAL STANDARD FILE
========================================================= */

function generateManualStandardFile(
    type,
    client,
    side,
    entries
) {

    const normalized =
        entries.map(
            manualEntryToPosition
        );


    const fileName =
        buildPositionFileName(
            type,
            side
        );


    return makeStandardFile(
        normalized,
        client,
        side,
        type,
        fileName
    );

}


/* =========================================================
   SAMPLE STANDARD FILE
========================================================= */

function generateSampleStandardFile(
    type,
    client,
    side
) {

    const entries =
        getSamplePositionData(
            type
        );


    return makeStandardFile(
        entries,
        client,
        side,
        type,
        buildPositionFileName(
            type,
            side
        )
    );

}


/* =========================================================
   DOWNLOAD STANDARD FILE
========================================================= */

function downloadStandardFile(
    file
) {

    if (!file) return;


    downloadFile(
        file.name,
        file.content
    );

}


/* =========================================================
   MULTIPLE DOWNLOAD
========================================================= */

function downloadMultipleFiles(
    files
) {

    if (
        !Array.isArray(files) ||
        !files.length
    ) {

        return;

    }


    files.forEach(
        (file, index) => {

            setTimeout(
                function () {

                    downloadStandardFile(
                        file
                    );

                },
                index * 300
            );

        }
    );

}


/* =========================================================
   CREATE ZIP-LIKE FILE LIST
========================================================= */

function getGeneratedFileNames() {

    return generatedFiles.map(
        file =>
            file.name
    );

}


/* =========================================================
   SHOW GENERATED STATUS
========================================================= */

function showGeneratedStatus(
    message
) {

    const status =
        document.getElementById(
            "generatedStatus"
        );


    if (!status) return;


    status.textContent =
        message || "";

}


/* =========================================================
   BULK CLIENT SOURCE
========================================================= */

function resolveBulkClients() {

    if (
        bulkClients &&
        bulkClients.length
    ) {

        return bulkClients.slice();

    }


    if (
        uploadedClients &&
        uploadedClients.length
    ) {

        return uploadedClients.slice();

    }


    const clientFile =
        document.getElementById(
            "bulkClientFile"
        );


    if (
        clientFile &&
        clientFile.files &&
        clientFile.files.length
    ) {

        return [];

    }


    return [];

}


/* =========================================================
   BULK SYMBOL
========================================================= */

function getRecordSymbol(
    record
) {

    return cleanValue(
        record.SYMBOL ??
        record.Symbol ??
        record.TckrSymb ??
        record.TckrSymb ??
        record.symbol
    );

}


/* =========================================================
   BULK INSTRUMENT
========================================================= */

function getRecordInstrument(
    record
) {

    return cleanValue(
        record.INSTRUMENT ??
        record.Instrument ??
        record.FinInstrmTp ??
        record.instrument
    ).toUpperCase();

}


/* =========================================================
   BULK EXPIRY
========================================================= */

function getRecordExpiry(
    record
) {

    return cleanValue(
        record.EXPIRY ??
        record.Expiry ??
        record.XpryDt ??
        record.expiry
    );

}


/* =========================================================
   BULK STRIKE
========================================================= */

function getRecordStrike(
    record
) {

    return numberValue(
        record.STRIKE_PRICE ??
        record.StrikePrice ??
        record.StrkPric ??
        record.STRIKE ??
        record.strike
    );

}


/* =========================================================
   BULK OPTION TYPE
========================================================= */

function getRecordOptionType(
    record
) {

    return normalizeOptionType(
        record.OPTION_TYPE ??
        record.OptionType ??
        record.OptnTp ??
        record.OPTION ??
        record.option
    );

}


/* =========================================================
   BULK PRICE
========================================================= */

function getRecordPrice(
    record
) {

    return numberValue(
        record.PRICE ??
        record.Price ??
        record.SttlmPric ??
        record.CLOSE_PRICE ??
        record.CLOSE ??
        record.LTP
    );

}


/* =========================================================
   BULK LOT
========================================================= */

function getRecordLot(
    record
) {

    return numberValue(
        record.LOT_SIZE ??
        record.LotSize ??
        record.NewBrdLotQty ??
        record.LOT ??
        record.QTY
    );

}


/* =========================================================
   FILTER FUTURES
========================================================= */

function filterFutureRecords(
    records
) {

    return records.filter(
        record => {

            const instrument =
                getRecordInstrument(
                    record
                );


            return (
                instrument === "IDF" ||
                instrument === "STF" ||
                instrument === "FUTIDX" ||
                instrument === "FUTSTK" ||
                instrument === "FUTCOM" ||
                instrument === "FUTCUR"
            );

        }
    );

}


/* =========================================================
   FILTER OPTIONS
========================================================= */

function filterOptionRecords(
    records
) {

    return records.filter(
        record => {

            const instrument =
                getRecordInstrument(
                    record
                );


            return (
                instrument === "IDO" ||
                instrument === "STO" ||
                instrument === "OPTIDX" ||
                instrument === "OPTSTK" ||
                instrument === "FUO" ||
                instrument === "CDO"
            );

        }
    );

}


/* =========================================================
   GROUP CONTRACTS
========================================================= */

function groupContracts(
    records
) {

    const map =
        new Map();


    records.forEach(
        record => {

            const symbol =
                getRecordSymbol(
                    record
                );


            const expiry =
                getRecordExpiry(
                    record
                );


            if (!symbol) return;


            const key =
                symbol +
                "|" +
                expiry;


            if (!map.has(key)) {

                map.set(
                    key,
                    {
                        symbol,
                        expiry,
                        futures: [],
                        options: []
                    }
                );

            }


            const instrument =
                getRecordInstrument(
                    record
                );


            if (
                isFutureInstrument(
                    instrument
                )
            ) {

                map
                    .get(key)
                    .futures
                    .push(record);

            }


            else if (
                isOptionInstrument(
                    instrument
                )
            ) {

                map
                    .get(key)
                    .options
                    .push(record);

            }

        }
    );


    return Array.from(
        map.values()
    );

}


/* =========================================================
   PICK CONTRACT
========================================================= */

function pickContract(
    group,
    wantOption
) {

    if (!group) {

        return null;

    }


    const list =
        wantOption
            ? group.options
            : group.futures;


    if (!list.length) {

        return null;

    }


    return randomItem(
        list
    );

}


/* =========================================================
   CREATE BULK STANDARD ROW
========================================================= */

function createBulkStandardRow(
    record,
    client,
    side
) {

    const entry = {

        symbol:
            getRecordSymbol(
                record
            ),

        instrument:
            getRecordInstrument(
                record
            ),

        expiry:
            getRecordExpiry(
                record
            ),

        option:
            getRecordOptionType(
                record
            ),

        strike:
            getRecordStrike(
                record
            ),

        qty:
            getRecordLot(
                record
            ),

        price:
            getRecordPrice(
                record
            )

    };


    return makeStandardPositionRow(
        entry,
        client,
        side,
        "FO"
    );

}


/* =========================================================
   BUILD BULK STANDARD FILE
========================================================= */

function buildBulkStandardFile(
    records,
    clients
) {

    const groups =
        groupContracts(
            records
        );


    if (!groups.length) {

        return null;

    }


    const rows = [];


    for (
        let i = 0;
        i < records.length;
        i++
    ) {

        const group =
            randomItem(
                groups
            );


        if (!group) continue;


        const wantOption =
            Math.random() < 0.20;


        let contract =
            pickContract(
                group,
                wantOption
            );


        if (!contract) {

            contract =
                pickContract(
                    group,
                    !wantOption
                );

        }


        if (!contract) continue;


        const client =
            randomItem(
                clients
            );


        if (!client) continue;


        const side =
            Math.random() < 0.5
                ? "BUY"
                : "SELL";


        rows.push(
            createBulkStandardRow(
                contract,
                client,
                side
            )
        );

    }


    if (!rows.length) {

        return null;

    }


    const headers =
        getStandardHeaders();


    const lines = [];


    lines.push(
        headers.join(",")
    );


    rows.forEach(
        row => {

            lines.push(
                headers
                    .map(
                        header =>
                            csvEscape(
                                row[header]
                            )
                    )
                    .join(",")
            );

        }
    );


    return {

        name:
            "Bulk_Position_File.csv",

        content:
            lines.join("\r\n")

    };

}


/* =========================================================
   END OF PART 3
========================================================= */
/* =========================================================
   PART 4
   BULK GENERATION / LOAD FILES / FINAL HELPERS
========================================================= */


/* =========================================================
   GENERATE BULK STANDARD
========================================================= */

function generateBulkStandard() {

    const records =
        bulkBhavcopyData || [];


    if (!records.length) {

        alert(
            "Please upload Bhavcopy."
        );

        return;

    }


    const clients =
        resolveBulkClients();


    if (!clients.length) {

        alert(
            "Please upload a client list."
        );

        return;

    }


    const recordsInput =
        document.getElementById(
            "bulkRecords"
        );


    const requested =
        parseInt(
            recordsInput?.value || "0",
            10
        );


    if (
        !Number.isFinite(
            requested
        ) ||
        requested <= 0
    ) {

        alert(
            "Please enter valid number of records."
        );

        return;

    }


    const groups =
        groupContracts(
            records
        );


    if (!groups.length) {

        alert(
            "No valid Futures / Options contracts found in Bhavcopy."
        );

        return;

    }


    const rows = [];


    /*
       Requested distribution:
       80% Futures
       20% Options
    */

    for (
        let i = 0;
        i < requested;
        i++
    ) {

        const wantOption =
            Math.random() < 0.20;


        const group =
            randomItem(
                groups
            );


        if (!group) {

            continue;

        }


        let contract =
            pickContract(
                group,
                wantOption
            );


        /*
           If the selected group does not have
           the required instrument, use the
           opposite available contract.
        */

        if (!contract) {

            contract =
                pickContract(
                    group,
                    !wantOption
                );

        }


        if (!contract) {

            continue;

        }


        const client =
            randomItem(
                clients
            );


        if (!client) {

            continue;

        }


        const side =
            Math.random() < 0.5
                ? "BUY"
                : "SELL";


        rows.push(
            createBulkStandardRow(
                contract,
                client,
                side
            )
        );

    }


    if (!rows.length) {

        alert(
            "Unable to generate bulk positions."
        );

        return;

    }


    const headers =
        getStandardHeaders();


    const output = [];


    output.push(
        headers.join(",")
    );


    rows.forEach(
        row => {

            output.push(
                headers
                    .map(
                        header =>
                            csvEscape(
                                row[header]
                            )
                    )
                    .join(",")
            );

        }
    );


    const file = {

        name:
            "Bulk_Position_File.csv",

        content:
            output.join("\r\n")

    };


    generatedFiles = [
        file
    ];


    downloadFile(
        file.name,
        file.content
    );


    showGeneratedStatus(
        rows.length +
        " position(s) generated"
    );

}


/* =========================================================
   BULK GENERATOR BUTTON COMPATIBILITY
========================================================= */

function runBulkGenerator() {

    generateBulkStandard();

}


/* =========================================================
   LOAD FILES
========================================================= */

function loadFiles() {

    const typeEl =
        document.getElementById(
            "positionType"
        );


    if (!typeEl) return;


    const type =
        typeEl.value;


    setSegmentVisibility(
        type
    );


    buildExpiryInputs(
        type
    );


    /*
       Keep existing checkbox
       container behaviour.
    */

    const container =
        document.getElementById(
            "checkboxContainer"
        );


    if (!container) {

        return;

    }


    if (type !== "FO") {

        container.innerHTML = "";

        return;

    }


    const symbols = [

        "NIFTY",

        "BANKNIFTY",

        "FINNIFTY",

        "MIDCPNIFTY"

    ];


    renderSymbolCheckboxes(
        symbols
    );

}


/* =========================================================
   SELECT ALL SYMBOLS
========================================================= */

function selectAllSymbols() {

    document
        .querySelectorAll(
            "#checkboxContainer input[type=checkbox]"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    true;

            }
        );

}


/* =========================================================
   CLEAR SYMBOL SELECTION
========================================================= */

function clearSymbolSelection() {

    document
        .querySelectorAll(
            "#checkboxContainer input[type=checkbox]"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    false;

            }
        );

}


/* =========================================================
   SELECT / CLEAR ALL COMPATIBILITY
========================================================= */

function toggleAllSymbols(
    checked
) {

    document
        .querySelectorAll(
            "#checkboxContainer input[type=checkbox]"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    !!checked;

            }
        );

}


/* =========================================================
   BUILD FO CONTRACTS
========================================================= */

function buildFOContracts(
    records
) {

    const futures =
        filterFutureRecords(
            records
        );


    const options =
        filterOptionRecords(
            records
        );


    return {

        futures,
        options

    };

}


/* =========================================================
   VALIDATE FO BHAVCOPY
========================================================= */

function validateFOBhavcopy(
    records
) {

    if (
        !Array.isArray(records) ||
        !records.length
    ) {

        return {

            valid: false,

            message:
                "Bhavcopy is empty."

        };

    }


    const contracts =
        buildFOContracts(
            records
        );


    if (!contracts.futures.length) {

        return {

            valid: false,

            message:
                "Bhavcopy does not contain Futures."

        };

    }


    if (!contracts.options.length) {

        return {

            valid: false,

            message:
                "Bhavcopy does not contain Options."

        };

    }


    return {

        valid: true,

        message:
            "Valid Futures and Options Bhavcopy.",

        futures:
            contracts.futures.length,

        options:
            contracts.options.length

    };

}


/* =========================================================
   BULK VALIDATION DISPLAY
========================================================= */

function updateBulkBhavcopyStatus() {

    const status =
        document.getElementById(
            "bulkBhavcopyStatus"
        );


    if (!status) return;


    const result =
        validateFOBhavcopy(
            bulkBhavcopyData
        );


    if (!result.valid) {

        status.textContent =
            result.message;

        return;

    }


    status.textContent =
        result.futures +
        " Futures | " +
        result.options +
        " Options";

}


/* =========================================================
   UPDATE AFTER BULK BHAVCOPY LOAD
========================================================= */

const originalBulkBhavcopyHandler =
    handleBulkBhavcopyUpload;


/*
   Keep the public function behaviour while
   updating validation status.
*/

function handleBulkBhavcopyUpload(input) {

    const file =
        input.files &&
        input.files[0];


    if (!file) return;


    const reader =
        new FileReader();


    reader.onload =
        function (event) {

            try {

                bulkBhavcopyData =
                    parseCSV(
                        String(
                            event.target.result ||
                            ""
                        )
                    );


                updateBulkBhavcopyStatus();

            }

            catch (error) {

                bulkBhavcopyData = [];


                const status =
                    document.getElementById(
                        "bulkBhavcopyStatus"
                    );


                if (status) {

                    status.textContent =
                        "Bhavcopy parse failed";

                }


                alert(
                    "Bhavcopy parse failed: " +
                    error.message
                );

            }

        };


    reader.onerror =
        function () {

            alert(
                "Could not read Bhavcopy."
            );

        };


    reader.readAsText(file);

}


/* =========================================================
   CLIENT FILE STATUS
========================================================= */

function refreshClientFileStatus() {

    const status =
        document.getElementById(
            "clientFileStatus"
        );


    if (!status) return;


    if (
        uploadedClients.length
    ) {

        status.textContent =
            uploadedClients.length +
            " client(s) loaded";

    }

    else {

        status.textContent =
            "";

    }

}


/* =========================================================
   REFRESH MANUAL CLIENT STATUS
========================================================= */

function refreshManualClientStatus() {

    const status =
        document.getElementById(
            "manualClientFileStatus"
        );


    if (!status) return;


    if (
        uploadedClients.length
    ) {

        status.textContent =
            uploadedClients.length +
            " client(s) loaded from file";

    }

    else {

        status.textContent =
            "";

    }

}


/* =========================================================
   DOWNLOAD CURRENT GENERATED FILES
========================================================= */

function downloadCurrentFiles() {

    if (
        !generatedFiles ||
        !generatedFiles.length
    ) {

        alert(
            "No generated files."
        );

        return;

    }


    generatedFiles.forEach(
        (file, index) => {

            setTimeout(
                function () {

                    downloadFile(
                        file.name,
                        file.content
                    );

                },
                index * 250
            );

        }
    );

}


/* =========================================================
   CLEAR ALL DATA
========================================================= */

function clearAllData() {

    uploadedClients = [];

    bulkClients = [];

    bulkBhavcopyData = [];

    generatedFiles = [];


    const inputs = [

        "clientFile",

        "manualClientFile",

        "bulkClientFile",

        "bulkBhavcopy"

    ];


    inputs.forEach(
        id => {

            const input =
                document.getElementById(
                    id
                );


            if (input) {

                input.value = "";

            }

        }
    );


    const statuses = [

        "clientFileStatus",

        "manualClientFileStatus",

        "bulkClientStatus",

        "bulkBhavcopyStatus",

        "generatedStatus",

        "clientStatus"

    ];


    statuses.forEach(
        id => {

            const status =
                document.getElementById(
                    id
                );


            if (status) {

                status.textContent =
                    id === "bulkClientStatus"
                        ? "Optional — uses Main Client List if not selected"
                        : "";

            }

        }
    );


    clearManualInputs();

}


/* =========================================================
   RESET PAGE
========================================================= */

function resetPositionPage() {

    clearAllData();


    const positionType =
        document.getElementById(
            "positionType"
        );


    if (positionType) {

        positionType.selectedIndex =
            0;

    }


    const buyInputs = [

        "client1",

        "manualClientBuy"

    ];


    buyInputs.forEach(
        id => {

            const input =
                document.getElementById(
                    id
                );


            if (input) {

                input.value = "";

                input.disabled =
                    false;

            }

        }
    );


    const sellInputs = [

        "client2",

        "manualClientSell"

    ];


    sellInputs.forEach(
        id => {

            const input =
                document.getElementById(
                    id
                );


            if (input) {

                input.value = "";

                input.disabled =
                    false;

            }

        }
    );


    setMode("sample");


    loadFiles();

}


/* =========================================================
   GENERATE BUTTON HANDLER
========================================================= */

function handleGenerateClick() {

    if (
        currentMode === "bulk"
    ) {

        generateBulkStandard();

        return;

    }


    generate();

}


/* =========================================================
   ATTACH BUTTONS
========================================================= */

function attachPositionButtons() {

    const generateButton =
        document.getElementById(
            "generateBtn"
        );


    if (
        generateButton &&
        !generateButton.dataset.bound
    ) {

        generateButton.dataset.bound =
            "1";


        generateButton.addEventListener(
            "click",
            handleGenerateClick
        );

    }


    const bulkButton =
        document.getElementById(
            "bulkGenerateBtn"
        );


    if (
        bulkButton &&
        !bulkButton.dataset.bound
    ) {

        bulkButton.dataset.bound =
            "1";


        bulkButton.addEventListener(
            "click",
            generateBulkStandard
        );

    }

}


/* =========================================================
   DOM READY FINALIZATION
========================================================= */

function finalizePositionPage() {

    attachPositionButtons();

    safeLoadFiles();

    refreshClientFileStatus();

    refreshManualClientStatus();

    updateClientStatus();

    refreshManualReopenLink();

}


/* =========================================================
   FINAL DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        finalizePositionPage
    );

}

else {

    finalizePositionPage();

}


/* =========================================================
   GLOBAL FUNCTION EXPORTS
========================================================= */

window.openManualPanel =
    openManualPanel;


window.openManualDrawer =
    openManualDrawer;


window.closeManualDrawer =
    closeManualDrawer;


window.reopenManualEntry =
    reopenManualEntry;


window.openSamplePanel =
    openSamplePanel;


window.openBulkPanel =
    openBulkPanel;


window.generateBulkStandard =
    generateBulkStandard;


window.runBulkGenerator =
    runBulkGenerator;


window.loadFiles =
    loadFiles;


window.selectAllSymbols =
    selectAllSymbols;


window.clearSymbolSelection =
    clearSymbolSelection;


window.toggleAllSymbols =
    toggleAllSymbols;


window.downloadCurrentFiles =
    downloadCurrentFiles;


window.resetPositionPage =
    resetPositionPage;


window.clearAllData =
    clearAllData;


/* =========================================================
   FINAL SAFETY INITIALIZATION
========================================================= */

(function () {

    /*
       Make sure the three panels start in
       the correct state even if the HTML
       is loaded after this script.
    */

    function initializeModes() {

        const cards =
            document.querySelectorAll(
                "#modeToggle .mode-card"
            );


        if (!cards.length) {

            return;

        }


        setMode(
            currentMode || "sample"
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeModes
        );

    }

    else {

        initializeModes();

    }

})();


/* =========================================================
   FINAL VALIDATION
========================================================= */

function validatePositionPage() {

    const result = {

        mode:
            currentMode,

        clients:
            uploadedClients.length,

        bulkClients:
            bulkClients.length,

        bulkBhavcopy:
            bulkBhavcopyData.length,

        generated:
            generatedFiles.length

    };


    return result;

}


window.validatePositionPage =
    validatePositionPage;


/* =========================================================
   FINAL EXPORT
========================================================= */

window.POSITION_FILES_READY =
    true;


/* =========================================================
   END OF POS.JS
========================================================= */
