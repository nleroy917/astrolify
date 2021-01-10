import { loadGetInitialProps } from 'next/dist/next-server/lib/utils';
import { Radar } from 'react-chartjs-2';

const PlaylistRadar = () => {
    const options = { 
                scale:{
                  pointLabels:{
                     fontColor: "white",
                     fontSize: 18
                  },
                  gridLines: {
                    color: 'white',
                    fontColor: 'white'
                  },
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
                      backgroundColor: '#FFD263',
                      data: [0.6, 0.7,0.2]
                    }
                ]
            }}
          />
        </>
    )
}

export default PlaylistRadar;