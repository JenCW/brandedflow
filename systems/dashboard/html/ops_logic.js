// OPS LOGIC FOR DASHBOARD UI

async function fetchOpsData() {
    try {
        const res = await fetch("/ops");
        return await res.json();
    } catch (e) {
        console.error("Failed to load ops data:", e);
        return { error: "Could not load ops data." };
    }
}

async function applyApproved() {
    try {
        const res = await fetch("/ops/apply", {
            method: "POST"
        });
        const data = await res.json();
        alert("Updates applied:\n" + JSON.stringify(data, null, 2));
        location.reload();
    } catch (e) {
        alert("Apply failed: " + e);
    }
}

async function loadDashboardOps() {
    const data = await fetchOpsData();

    if (data.error) {
        document.getElementById("ops-decisions").innerText = data.error;
        document.getElementById("ops-tasks").innerText = data.error;
        document.getElementById("ops-notes").innerText = data.error;
        document.getElementById("ops-updates").innerText = data.error;
        document.getElementById("ops-commit-preview").innerText = data.error;
        return;
    }

    document.getElementById("ops-decisions").innerText = data.proposed_decisions || "(none)";
    document.getElementById("ops-tasks").innerText = data.proposed_tasks || "(none)";
    document.getElementById("ops-notes").innerText = data.proposed_notes || "(none)";
    document.getElementById("ops-updates").innerText = data.proposed_updates || "(none)";

    document.getElementById("ops-commit-preview").innerText =
        JSON.stringify(data.commit_preview, null, 2) || "(none)";

    document.getElementById("ops-apply-button").onclick = applyApproved;
}

// Run on page load
window.addEventListener("load", loadDashboardOps);
