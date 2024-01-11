/*gráfico para 'bar' e adicionamos a opção indexAxis: 'y' para orientar 
as barras horizontalmente.*/

import Chart from 'chart.js/auto';

fetch('../routes/atoresMaisPremiados')
  .then(response => response.json())
  .then(data => {
    // Extraia os dados do objeto retornado pela rota
    const labels = data.data.map(ator => ator.label);
    const values = data.data.map(ator => ator.value);

    // Crie um contexto para o canvas
    const ctx = document.getElementById('histogramaAtoresMaisPremiados').getContext('2d');

    // Crie o gráfico usando o Chart.js
    const histogramaAtoresMaisPremiados = new Chart(ctx, {
      type: 'bar', // Mudamos para 'bar' para criar um histograma
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de Prêmios',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        // Adicione uma opção para orientação horizontal do eixo X (para melhor visualização)
        indexAxis: 'y'
      }
    });
  })
  .catch(error => {
    console.error('Erro ao buscar dados do backend:', error);
  });
