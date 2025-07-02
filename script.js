function analyzeComplaint() {
  const complaint = document.getElementById('complaint-input').value;

  if (!complaint.trim()) {
    alert("Please enter a complaint.");
    return;
  }

  // Placeholder: This will call backend later
  document.getElementById('json-output').innerText = "Analyzing...";
  document.getElementById('email-output').innerText = "";

  // Simulate response (temporary demo only)
  setTimeout(() => {
    document.getElementById('json-output').innerText = JSON.stringify({
      issue_category: "Billing",
      sentiment: "Very Negative",
      summary: "Customer was charged twice for a phone bill"
    }, null, 2);

    document.getElementById('email-output').innerText =
      `Dear Customer,\n\nWe're very sorry for the double charge on your account. We understand how frustrating this must be and have initiated a full refund. Please allow 3–5 business days for processing.\n\nSincerely,\nAlex (Support Team)`;
  }, 1000);
}
