/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useChart } from "../../hooks/Admin/useChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const style = {
  cont: css`
    width: 100%;
  `,
  sect: css`
    padding: 10px 10px 30px 10px;
    margin: 20px 0px;
    width: 50%;
  `,
  btn: css`
    margin: 2px;
  `,
  sectTitle: css`
    text-align: center;
    margin: 10px;
  `,
  btnCont: css`
    margin: 0px auto;
    width: fit-content;
  `,
};

function HomeScreen() {
  const [openedbarChart, setOpenedBarChart] = React.useState("bhw");
  const [openedpieChart, setOpenedPieChart] = React.useState("phw");
  const [calendarDate, setCalendarDate] = React.useState(new Date());

  const { data: chartData, loading } = useChart();

  if (loading) return <CircularProgress />;
  return (
    <div css={style.cont}>
      <Typography
        variant="h4"
        css={css`
          text-align: center;
          margin: 10px 0px;
        `}
      >
        Welcome to Admin Panel
      </Typography>

      <Box sx={{ display: "flex" }}>
        <Paper css={style.sect}>
          <Typography variant="h6" css={style.sectTitle}>
            Yearly Progress
          </Typography>
          <Box css={style.btnCont}>
            {chartData.bar.map(({ title, key }, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  if (openedbarChart === key) {
                    setOpenedBarChart("");
                  } else {
                    setOpenedBarChart(key);
                  }
                }}
                css={style.btn}
                variant={openedbarChart === key ? "contained" : "outlined"}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Box sx={{ maxWidth: "900px", margin: "0px auto" }}>
            {chartData.bar.map((c, idx) => (
              <React.Fragment key={idx}>
                {openedbarChart === c.key && (
                  <Bar
                    options={{
                      responsive: true,
                      legend: {
                        display: false,
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
                      datasets: [
                        {
                          label: c.title,
                          data: c.data,
                          backgroundColor: c.background_color,
                        },
                      ],
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Paper>
        <Paper css={style.sect}>
          <Typography variant="h6" css={style.sectTitle}>
            Monthly Progress
          </Typography>
          <Box css={style.btnCont}>
            {chartData.pie.map(({ title, key }, idx) => (
              <Button
                key={idx}
                onClick={() => {
                  if (openedpieChart === key) {
                    setOpenedPieChart("");
                  } else {
                    setOpenedPieChart(key);
                  }
                }}
                css={style.btn}
                variant={openedpieChart === key ? "contained" : "outlined"}
              >
                {title}
              </Button>
            ))}
          </Box>
          <Box sx={{ maxWidth: "300px", margin: "0px auto" }}>
            {chartData.pie.map((c, idx) => (
              <React.Fragment key={idx}>
                {openedpieChart === c.key && (
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
                      ],
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>

        </Paper>
      </Box>
      <Calendar css={css`
        width:100%;
      `}
        onChange={setCalendarDate}
        value={calendarDate} />
    </div>
  );
}

export default HomeScreen;
