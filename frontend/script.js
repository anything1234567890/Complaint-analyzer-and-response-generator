async function analyzeComplaint() {
  const complaint = document.getElementById('complaint-input').value;

  if (!complaint.trim()) {
    alert("Please enter a complaint.");
    return;
  }

  // Show loading message
  document.getElementById('json-output').innerText = "Analyzing...";
  document.getElementById('email-output').innerText = "";

  try {
    const response = await fetch('https://complaint-analyzer-and-response.onrender.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ complaint: complaint })
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById('json-output').innerText = "❌ Error: " + data.error;
      document.getElementById('email-output').innerText = "";
    } else {
      // Convert the raw JSON string from Gemini into a JS object
      const result = JSON.parse(data.result);

      // Display analysis result as formatted JSON
      document.getElementById('json-output').innerText = JSON.stringify({
        issue_category: result.issue_category,
        sentiment: result.sentiment,
        summary: result.summary
      }, null, 2);

      // Show draft email response
      document.getElementById('email-output').innerText = result.response;
    }

  } catch (err) {
    document.getElementById('json-output').innerText = "❌ Network or server error: " + err.message;
    document.getElementById('email-output').innerText = "";
  }
}
