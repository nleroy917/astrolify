import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { Radar } from 'react-chartjs-2';

const PlaylistRadar = () => {
    const options = {
                responsive: true,
                scale:{
                  pointLabels:{
                     fontColor: "white",
                     fontSize: 16
                  },
                  gridLines: {
                    color: 'white',
                    fontColor: 'white'
                  },
                  ticks: {
                    suggestedMin: 0,
                    suggestedMax: 1,
                    backdropColor: 'rgba(0,0,0,0)',
                    fontColor: '#FFF'
                }
              } ,
              legend: {
                  labels: {
                      fontColor: "white",
                      fontSize: 24
                  },
                  display: false
          },
            plugins: {
               datalabels: {
                  display: true
               }
            },
          labels: { fontColor: "#fff" }
        }
    return(
        <>
          <Radar
            options={options}
            data={{
                labels: ['Valence', 'Energy', 'Danceability'],
                datasets: [
                    {
                      label: 'Playlist Analysis',
                      backgroundColor: 'rgba(255, 210, 97, 0.8)',
                      borderColor: '#FFF',
                      borderWidth: 1,
                      data: [0.6, 0.7, 0.2]
                    }
                ]
            }}
          />
        </>
    )
}

export default PlaylistRadar;