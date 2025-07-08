async function analyzeComplaint() {
  const complaint = document.getElementById('complaint-input').value;

  if (!complaint.trim()) {
    alert("Please enter a complaint.");
    return;
  }

  // Show loading text while waiting for backend
  document.getElementById('json-output').innerText = "Analyzing...";
  document.getElementById('email-output').innerText = "";

  try {
    const response = await fetch('http://127.0.0.1:5000/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ complaint })
    });

    const data = await response.json();

    if (data.error) {
      document.getElementById('json-output').innerText = "Error: " + data.error;
      return;
    }

    // Parse Gemini's stringified JSON response
    const result = JSON.parse(data.result);

    // Display structured analysis
    document.getElementById('json-output').innerText = JSON.stringify({
      issue_category: result.issue_category,
      sentiment: result.sentiment,
      summary: result.summary
    }, null, 2);

    // Display email response
    document.getElementById('email-output').innerText = result.response;

  } catch (error) {
    document.getElementById('json-output').innerText = "Error: " + error.message;
  }
}
