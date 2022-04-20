import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { css } from "@emotion/react";
import { useRequestedLeaves } from "../../hooks/Admin/useRequestedLeaves";
import NotFound from '../../components/NotFount';
import format from "date-fns/format";
const style = {
  cont: css`
    margin: 0px auto;
    justify-content: center;
  `,
};

function RequestedLeaves() {
  const { data, loading, actions } = useRequestedLeaves();

  const accceptRequest = (id) => {
    let rd = {
      approved: "True",
    };
    actions.update(rd, id);
  };

  const rejectRequest = (id) => {
    actions.reject(id);
  };

  if (loading) return <CircularProgress />;
  if (data.length === 0) return <NotFound dataName="Leave Requests" />

  return (
    <TableContainer css={style.cont} component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S. No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Message</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((request, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {request.employee_detail.first_name}{" "}
                {request.employee_detail.last_name}
              </TableCell>
              <TableCell>{format(Date.parse(request.date), 'do MMM yyyy')}</TableCell>
              <TableCell>{request.reason}</TableCell>
              <TableCell>{request.msg}</TableCell>
              <TableCell>
                <Button onClick={() => accceptRequest(request.id)}>
                  Accept
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  style={{ color: "red" }}
                  onClick={() => rejectRequest(request.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RequestedLeaves;
