import { Bar } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  // Legend
);

Chart.register(ArcElement);


export default function Graph (props){
  const index = props.index
    const videoSrc = props.videoSrc
  const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
          },
        },
      };
      const labels = [""];
      const data = {
        labels: labels,
        datasets: [
          {
            label: "quality 1",
            data: [videoSrc[index]?.quality?.[1] , 0],
            backgroundColor: "orange",
          },
          {
            label: "quality 2",
            data: [videoSrc[index]?.quality?.[2], 0],
            backgroundColor: "orange",
          },
          {
            label: "quality 3",
            data: [videoSrc[index]?.quality?.[3], 0],
            backgroundColor: "orange",
          },
          {
            label: "quality 4",
            data: [videoSrc[index]?.quality?.[4], 0],
            backgroundColor: "orange",
          },
          {
            label: "quality 5",
            data: [videoSrc[index]?.quality?.[5], 0],
            backgroundColor: "orange",
          },
        ]
      
      };
    
   return(
   <div> 
<div className="w-56 h-28"><Bar options={options} data={data} /></div>
   
</div>
   ) 
  }
 
