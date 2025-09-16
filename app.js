// Risk chart initialization
const ctx = document.getElementById('riskChart').getContext('2d');
const riskChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Sept 1', 'Sept 5', 'Sept 10', 'Sept 15'],
    datasets: [{
      label: 'Risk Probability (%)',
      data: [40, 55, 70, 85],
      borderColor: '#e74c3c',
      backgroundColor: 'rgba(231,76,60,0.2)',
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: { color: '#2c3e50' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#2c3e50' }
      },
      x: {
        ticks: { color: '#2c3e50' }
      }
    }
  }
});

// Simulated live update every 5 seconds
async function updateDashboard() {
  const rainfall = Math.floor(Math.random() * 200);
  const temp = 20 + Math.floor(Math.random() * 10);
  const slope = 20 + Math.floor(Math.random() * 20);
  const risk = Math.floor(Math.random() * 100);

  document.getElementById('rainfall').textContent = `Rainfall: ${rainfall} mm`;
  document.getElementById('temperature').textContent = `Temp: ${temp}°C`;
  document.getElementById('slope').textContent = `Angle: ${slope}°`;

  // Vibration status
  document.getElementById('vibration').textContent =
    (Math.random() > 0.7) ? "Vibration: High" : "Vibration: Normal";

  // Prediction status
  const predictionStatus = document.getElementById('prediction-status');
  if (risk > 70) {
    predictionStatus.textContent = "⚠️ High Risk";
    predictionStatus.style.color = "#e74c3c";

    // 🚨 Trigger SMS alert (simulated via Beeceptor)
    try {
      await fetch("https://datayoddhas.free.beeceptor.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "High Rockfall Risk Alert!" })
      });
      alert("🚨 SMS Alert Triggered (Simulated)!");
    } catch (err) {
      console.error("SMS API error:", err);
    }

  } else if (risk > 40) {
    predictionStatus.textContent = "⚠️ Moderate Risk";
    predictionStatus.style.color = "#f39c12";
  } else {
    predictionStatus.textContent = "✅ Low Risk";
    predictionStatus.style.color = "#27ae60";
  }

  // Update last update timestamp
  document.getElementById('last-update').textContent =
    new Date().toLocaleString();

  // Update chart with new data
  const now = new Date().toLocaleTimeString();
  riskChart.data.labels.push(now);
  riskChart.data.datasets[0].data.push(risk);

  // Keep only last 7 points
  if (riskChart.data.labels.length > 7) {
    riskChart.data.labels.shift();
    riskChart.data.datasets[0].data.shift();
  }

  riskChart.update();
}

// Update every 5 seconds
setInterval(updateDashboard, 5000);