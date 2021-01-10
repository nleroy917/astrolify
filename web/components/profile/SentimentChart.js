import { HorizontalBar, Bar } from 'react-chartjs-2';
import {
    isMobile
} from 'react-device-detect';

const SentimentChart = (props) => {
    const options = {
        scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Amount (%)',
                fontColor:'#FFF',
                fontSize: 24
            },
            gridLines: {
                zeroLineColor: '#FFF'
            },
            ticks: {
               fontColor: "white",
               fontSize: 16
              }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: '',
                fontColor: '#FFF',
                fontSize: 24
            },
            gridLines: {
                display: false,
                zeroLineColor: '#FFF'
            },
            ticks: {
                  fontColor: "white",
                  fontSize: 16
            }
        }]
     },
    legend: {
        display: false,
        labels: {
        fontColor: "white"
        }
  }
}
    return (
        isMobile ? 
        <>
        <Bar
          options={options}
          data={{
              labels: ['Score', 'Magnitude'],
              datasets: [
                  {
                      label: "Sentiment",
                      barPercentage: 0.5,
                      barThickness: 75,
                      minBarLength: 5,
                      backgroundColor: '#FFD263',
                      borderWidth: 2,
                      borderColor: '#FFF',
                      data: [props.score, props.magnitude]
                  }
              ]
          }}
        />
      </>
      :
        <>
          <HorizontalBar
            options={options}
            data={{
                labels: ['Score', 'Magnitude'],
                datasets: [
                    {
                        label: "Sentiment",
                        barPercentage: 0.5,
                        barThickness: 75,
                        minBarLength: 5,
                        backgroundColor: '#FFD263',
                        borderWidth: 2,
                        borderColor: '#FFF',
                        data: [props.score, props.magnitude]
                    }
                ]
            }}
          />
        </>
    )
}
export default SentimentChart;