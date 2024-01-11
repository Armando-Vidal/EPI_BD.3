// Histograma
import Chart from 'chart.js/auto';

fetch('../routes/filmesMaisPremiados')
  .then(response => response.json())
  .then(data => {
    const labels = data.data.map(filme => filme.label);
    const values = data.data.map(filme => filme.value);

    const ctx = document.getElementById('histogramaFilmesPremiados').getContext('2d');

    const histogramaFilmesPremiados = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Número de Prêmios',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Erro ao buscar dados do backend:', error);
  });
