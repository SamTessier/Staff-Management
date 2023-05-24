import React, { useState, useEffect } from "react";
import {
  IconButton,
  Grid,
  Tooltip,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import StudentDetails from "./StudentDetails";
import { getStudents, getStaff } from "../localStorageDB";

const MainScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);


  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [searchTerms, setSearchTerms] = useState(['name', 'school']);

  // let data = searchTerm !== "" ? [...getStudents(), ...getStaff()] : [];
  // data = data.filter((item) =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // let data = searchTerm !== "" ? [...getStudents(), ...getStaff()] : [];
  // data = data.filter(item =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  useEffect(() => {
    const loadData = async () => {
      const students = await getStudents();
      const staff = await getStaff();
      console.log({students, staff})
      setData([...students, ...staff]);
      setFilteredData([...students, ...staff]);
    }
    console.log('load data')
    loadData();
  }, [])

  useEffect(() => {
    console.log(searchTerm)
    const filtered = data.filter(item => {
      return searchTerms.some(key => {
        return item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
    })

    console.log({filtered})

    setFilteredData(filtered);
  }, [searchTerm])




  const handleDetailsOpen = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => setDetailsOpen(false);

  return (
    <Box
      border={1}
      borderColor="grey.500"
      borderRadius={2}
      p={3}
      m={2}
      bgcolor="grey.100"
    >
      <Grid
        container
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Grid container direction="row" spacing={2} justifyContent="center">
            <Grid item>
              <IconButton color="primary" component={Link} to="/schools">
                <HomeIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Schools
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" component={Link} to="/staff">
                <WorkIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Staff
              </Typography>
            </Grid>
            <Grid item>
              <IconButton color="primary" component={Link} to="/students">
                <PeopleIcon fontSize="large" />
              </IconButton>
              <Typography variant="caption" display="block" textAlign="center">
                Students
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center">
            {showSearch ? (
              <TextField
                variant="outlined"
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "80%" }}
                onBlur={() => setShowSearch(false)}
              />
            ) : (
              <IconButton onClick={() => setShowSearch(true)}>
                <SearchIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2} alignItems="center">
          {filteredData.map((item, index) => (
            <Grid key={index} container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="body1">{item.name}</Typography>
              </Grid>
              <Grid item>
                <IconButton color="primary" onClick={() => handleDetailsOpen(item)}>
                  <InfoIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>
        {selectedStudent && (
          <StudentDetails
            student={selectedStudent}
            open={detailsOpen}
            handleClose={handleDetailsClose}
            handleDelete={() => {}}
            handleEdit={() => {}}
          />
        )}
      </Grid>
    </Box>
  );
};

export default MainScreen;
