/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Typography from '@mui/material/Typography';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Button, CircularProgress, Paper } from '@mui/material';
import { useChart } from '../../hooks/Admin/useChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
// ChartJS.register(ArcElement, Tooltip, Legend);
// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 1,
//     },
//   ],
// };


const style = {
  cont: css`
  `,
  sect: css`
  padding: 10px;
  `,
  btn: css`
  margin: 2px 0px;
  `,
  sectTitle: css`
  text-align: center;
  margin: 10px;
  `
}

function HomeScreen() {
  const [openedChart, setOpenedChart] = React.useState("")
  const { data: chartData, loading } = useChart()
  if (loading) return <CircularProgress />
  return (
    <div css={style.cont}>
      <Typography
        variant='h4'
        css={css`
        text-align: center;
        margin: 50px 0px 10px 0px;
      `}
      >
        Welcome to Admin Panel
      </Typography>

      <Paper css={style.sect}>
        <Typography
          variant='h6'                      // borderColor: c.background_colors,

          css={style.sectTitle}
        >
          Yearly Progress
        </Typography>
        {chartData.bar.map(({ title, key }, idx) => (
          <Button key={idx} onClick={() => {
            if (openedChart === key) {
              setOpenedChart("")
            }
            else {
              setOpenedChart(key)
            }
          }}
            fullWidth css={style.btn}
            variant={openedChart === key ? "contained" : "outlined"}
          >{title}</Button>
        ))}
        {chartData.bar.map(((c, idx) => (
          <React.Fragment key={idx} >
            {openedChart === c.key && (
              <Bar options={{
                responsive: true,
                legend: {
                  display: false
                },
                plugins: {
                  title: {
                    display: true,
                    text: c.title,
                  },
                },
              }}
                data={{
                  labels: chartData.month_label,
                  datasets: [{
                    label: c.title,
                    data: c.data,
                    backgroundColor: c.background_color,
                  }]
                }} />
            )}
          </React.Fragment>
        )))}
      </Paper>
      <Paper css={style.sect}>
        <Typography
          variant='h6'
          css={style.sectTitle}
        >
          Monthly Progress
        </Typography>
        {chartData.pie.map(({ title, key }, idx) => (
          <Button key={idx} onClick={() => {
            if (openedChart === key) {
              setOpenedChart("")
            }
            else {
              setOpenedChart(key)
            }
          }}
            fullWidth css={style.btn}
            variant={openedChart === key ? "contained" : "outlined"}
          >{title}</Button>
        ))}
        {chartData.pie.map(((c, idx) => (
          <React.Fragment key={idx} >
            {openedChart === c.key && (
              <Pie
                data={{
                  labels: c.labels,
                  datasets: [
                    {
                      label: c.title,
                      data: c.data,
                      backgroundColor: c.background_colors,
                      borderWidth: 1,
                    },
                  ]
                }} />)}
          </React.Fragment>
        )))}
      </Paper>
    </div>)

}

export default HomeScreen;
