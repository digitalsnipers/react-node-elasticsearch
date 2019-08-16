import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

class App extends Component {
  state = {
    searchString: "",
    gender: "",
    year: "",
    cntry: "",
    color: "",

    result: [],

    iname: "",
    igender: "",
    iyear: "",
    icntry: "",
    icolor: ""
  };
  constructor() {
    super();
    this.httpIndex();
  }

  httpSearch = () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/search",
      data: {
        name: this.state.searchString,
        gender: this.state.gender,
        year: this.state.year,
        cntry: this.state.cntry,
        color: this.state.color
      }
    }).then(response => {
      this.setState({ result: response.data }); 
    });
  };
  httpInput = () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/submit",
      data: {
        name: this.state.iname,
        gender: this.state.igender,
        year: this.state.iyear,
        cntry: this.state.icntry,
        color: this.state.icolor
      }
    }).then(response => {
      alert(response.data);
      this.httpSearch();
    });
  };

  httpIndex = () => {
    axios({
      method: "post",
      url: "http://127.0.0.1:5000/index"
    }).then(response => {
      if (response.data == "done") {
        alert("New index Employe created");
      } else {
        this.httpSearch();
      }
    });
  };

  onSearchInputChange = input => event => {
    //FOR SEARCH DATA

    console.log("Search changed ..." + event.target.value);
    if (event.target.value)
      this.setState({ [input]: event.target.value }, () => {
        this.httpSearch();
      });
    else
      this.setState({ [input]: "" }, () => {
        this.httpSearch();
      });
  };

  onInputChange = input => event => {
    //for input data

    this.setState({ [input]: event.target.value });
  };
  submit = () => {
    this.httpInput();
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Elasticsearch</h1>
        <header className="App-header">
          <TextField
            id="standard-with-placeholder"
            label="Search by Name"
            placeholder="Enter the Name"
            onChange={this.onSearchInputChange("searchString")}
          />

          <FormControl style={{ paddingLeft: 20, paddingRight: 10 }}>
            <InputLabel
              style={{ paddingLeft: 20, paddingRight: 10 }}
              htmlFor="gender"
            >
              Gender
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.gender}
              onChange={this.onSearchInputChange("gender")}
              input={<Input name="gender" id="gender" />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ paddingRight: 10 }}>
            <InputLabel style={{ paddingRight: 10 }} htmlFor="year">
              Year
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.year}
              onChange={this.onSearchInputChange("year")}
              input={<Input name="year" id="year" />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={2010}>2010</MenuItem>
              <MenuItem value={2011}>2011</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ paddingRight: 10 }}>
            <InputLabel style={{ paddingRight: 10 }} htmlFor="cntry">
              Cntry
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.cntry}
              onChange={this.onSearchInputChange("cntry")}
              input={<Input name="cntry" id="cntry" />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ paddingRight: 10 }}>
            <InputLabel style={{ paddingRight: 10 }} htmlFor="color">
              Color
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.color}
              onChange={this.onSearchInputChange("color")}
              input={<Input name="color" id="color" />}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="#ef5350">Red</MenuItem>
              <MenuItem value="#5c6bc0">Blue</MenuItem>
              <MenuItem value="#66bb6a">Green</MenuItem>
              <MenuItem value="#ffee58">Yellow</MenuItem>
            </Select>
          </FormControl>
        </header>
        <div className="inputForm">
          <br />
          <br />
          <p>Add new entry :</p>
          <TextField
            id="standard-with-placeholder"
            label="Enter Name"
            placeholder="Name"
            onChange={this.onInputChange("iname")}
          />
          <br />

          <FormControl style={{ paddingTop: 20, paddingBottom: 10 }}>
            <InputLabel
              style={{ paddingTop: 20, paddingBottom: 10 }}
              htmlFor="gender"
            >
              Gender
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.igender}
              onChange={this.onInputChange("igender")}
              input={<Input name="gender" id="gender" />}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ paddingLeft: 10, paddingTop: 20 }}>
            <InputLabel
              style={{ paddingLeft: 10, paddingTop: 20 }}
              htmlFor="year"
            >
              Year
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.iyear}
              onChange={this.onInputChange("iyear")}
              input={<Input name="year" id="year" />}
            >
              <MenuItem value={2010}>2010</MenuItem>
              <MenuItem value={2011}>2011</MenuItem>
              <MenuItem value={2012}>2012</MenuItem>
            </Select>
          </FormControl>
          <br />

          <FormControl style={{ paddingBottom: 10 }}>
            <InputLabel style={{ paddingBottom: 10 }} htmlFor="cntry">
              Country
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.icntry}
              onChange={this.onInputChange("icntry")}
              input={<Input name="cntry" id="cntry" />}
            >
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="China">China</MenuItem>
              <MenuItem value="Spain">Spain</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ paddingLeft: 10 }}>
            <InputLabel style={{ paddingLeft: 10 }} htmlFor="cntry">
              Color
            </InputLabel>
            <Select
              style={{ width: 80 }}
              value={this.state.icolor}
              onChange={this.onInputChange("icolor")}
              input={<Input name="cntry" id="cntry" />}
            >
              <MenuItem value="#ef5350">Red</MenuItem>
              <MenuItem value="#5c6bc0">Blue</MenuItem>
              <MenuItem value="#66bb6a">Green</MenuItem>
              <MenuItem value="#ffee58">Yellow</MenuItem>
            </Select>
          </FormControl>
          <br />

          <br />
          <br />
          <Button variant="contained" onClick={this.submit}>
            Submit
          </Button>
        </div>

        <div className="resultPanel">
          {this.state.result.map(item => (
            <div key={item} className="rcard">
              <p className="name">{item._source.name}</p>
              <p className="det">{item._source.gender}</p>
              <p className="det">{item._source.year}</p>
              <p className="det">{item._source.cntry}</p>
              <div
                className="color"
                style={{ backgroundColor: item._source.color }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
