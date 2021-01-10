import { HorizontalBar, Bar } from 'react-chartjs-2';
import {
    isMobile
} from 'react-device-detect';

const SentimentChart = (props) => {
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.2,
        scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Sentiment',
                fontColor:'#FFF',
                fontSize: 18
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
                labelString: '%',
                fontColor: '#FFF',
                fontSize: 12
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
          height={null}
          width={null}
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