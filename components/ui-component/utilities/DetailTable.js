import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//ui-material
import {
  Grid,
  Box,
  Typography,
  useTheme,
  MenuItem,
  Divider,
  Select,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow

 
} from "@mui/material";

const DetailTable=({data})=>
{
return(<>
  <TableContainer >
      <Table sx={{ minWidth: "100%",fontFamily:'orginalfont!important',
     "& .MuiTableCell-root":
     {
       fontFamily: `${'orginalfont!important'}`
     } }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          
       
            <TableCell align="center">{"ستارگان"}</TableCell>
            <TableCell align="center">{"پرسپولیس"}</TableCell>
               <TableCell align="center">{" "}</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
       
            <TableRow
              key={"ٌWin"}
              
            >
            
              <TableCell align="center">{"2"}</TableCell>
              <TableCell align="center">{"3"}</TableCell>
              <TableCell align="center"  >
                {'برد'}
              </TableCell>
            </TableRow>
            <TableRow
              key={"lose"}
              
            >
             
              <TableCell align="center">{"2"}</TableCell>
              <TableCell align="center">{"3"}</TableCell>
              <TableCell align="center"  >
                {'باخت'}
              </TableCell>
            </TableRow>
            <TableRow
              key={"draw"}
              
            >
             
              <TableCell align="center">{"2"}</TableCell>
              <TableCell align="center">{"3"}</TableCell>
              <TableCell align="center"  >
                {'تساوی'}
              </TableCell>
            </TableRow>
            <TableRow
              key={"ٌmatch"}
              
            >
            
              <TableCell align="center">{"80"}</TableCell>
              <TableCell align="center">{"90"}</TableCell>
              <TableCell align="center"  >
                {'تعداد بازی'}
              </TableCell>
            </TableRow>
            <TableRow
              key={"score"}
              
            >
             
              <TableCell align="center">{"2"}</TableCell>
              <TableCell align="center">{"3"}</TableCell>
              <TableCell align="center"  >
                {'امتیاز'}
              </TableCell>
            </TableRow>
            <TableRow
              key={"ٌWin"}
              
            >
              
              <TableCell align="center">{"2"}</TableCell>
              <TableCell align="center">{"3"}</TableCell>
              <TableCell align="center"  >
                {'رتبه'}
              </TableCell>
            </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer>
</>)
}
export default DetailTable