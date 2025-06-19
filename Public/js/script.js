function parseCampaigns() {
  const rawInput = document.getElementById("input").value;
  const lines = rawInput.trim().split(/\n(?=\d{5})/);
  let html = "<table><thead><tr><th>#</th><th>Customer</th><th>Copy</th><th>Product Link</th><th>Template</th><th>Date to Send</th><th>Actions</th></tr></thead><tbody>";

  lines.forEach(block => {
    const parts = block.split(/\n/).filter(Boolean);
    const id = parts[0].trim();
    const customer = parts[1].trim();
    const action = "Edit";

    let copy = "";
    let productLink = "";
    let template = "";
    let dateToSend = "";

    const dates = parts.filter(p => /\d{2}\/\d{2}\/\d{4}/.test(p));
    if (dates.length > 0) {
      dateToSend = dates[0];
    }

    const urls = parts.join("\n").match(/https?:\/\/[^\s)]+/g) || [];
    if (urls.length > 0) {
      productLink = urls[urls.length - 1];
    }

    const templateIndex = parts.findIndex(p => p.trim().match(/classic|sandwitch|engage/i));
    if (templateIndex !== -1) {
      template = parts[templateIndex].trim();
    }

    const firstURLIndex = parts.findIndex(p => p.includes("http"));
    const copyStart = 2;
    const copyEnd = templateIndex !== -1 ? templateIndex : (firstURLIndex !== -1 ? firstURLIndex : parts.length);
    copy = parts.slice(copyStart, copyEnd).join(" ").trim();

    html += `<tr><td>${id}</td><td>${customer}</td><td>${copy}</td><td><a href="${productLink}" target="_blank">${productLink}</a></td><td>${template}</td><td>${dateToSend}</td><td>${action}</td></tr>`;
  });

  html += "</tbody></table>";
  document.getElementById("output").innerHTML = html;
}