import React from 'react';
import './App.css';
import { Row, Col, Container, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desk: 0,
      mathrix_id: 'MAT20',
      mid: '',
      student_name: '',
      college_name: '',
      college_id: '',
      department: 'Select Department',
      year: 'empty',
      mobile: '',
      e1: 'empty',
      e2: 'empty',
      e3: 'empty',
      e4: 'empty',
      edit:false,
      details: {
        list: []
      },
      selectedOption: {
        value: '',
        label: ''
      }
    }
    this.getDetails();
  }

  handleCol = selectedOption => {
    if (selectedOption.value === 'Other') {
      let col = prompt("Enter College Name");
      let nu = { value: col, label: col }
      this.setState({ selectedOption: nu });
      console.log(`Option selected:`, selectedOption);
    } else {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    }
  };

  getDetails = async () => {
    const response = await axios.get(
      "http://api.mathrix.in/list/" + this.state.desk,
      {},
      {}
    );

    this.setState({
      details: response.data
    })



    console.log(response.data);
  }

  Register = async () => {


    const response = await axios.post(
      "http://api.mathrix.in/register",
      {
        desk: this.state.desk,
        mathrix_id: this.state.mathrix_id,
        student_name: this.state.student_name,
        college_name: this.state.selectedOption.value,
        college_id: this.state.college_id,
        department: this.state.department,
        year: this.state.year,
        mobile: this.state.mobile,
        events: [
          this.state.e1,
          this.state.e2,
          this.state.e3,
          this.state.e4,
        ]
      },
      {}
    );
    console.log(response.data);

    if (response.data.status === 201) {
      alert("Registration Successful");
      this.setState({
        mathrix_id: '',
        student_name: '',
        college_name: '',
        college_id: '',
        department: 'empty',
        year: 'empty',
        mobile: '',
        e1: 'empty',
        e2: 'empty',
        e3: 'empty',
        e4: 'empty'
      })
    }
    else {
      alert(response.data.message);
    }
    this.getDetails();

  }

  setDesk = () => {
    if (this.state.desk === 0) {
      let d = prompt("Enter the registration desk Number");
      if (isNaN(parseInt(d))) {
        alert("Please enter valid desk number");
        this.setDesk();
      }
      else {
        this.setState({
          desk: parseInt(d)
        },
          () => {
            this.getDetails();
          })
      }
    }
  }

  componentDidMount() {
    this.setDesk();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let dat = this.state;
    const depts = [
      'CSE', 'IT', 'ECE', 'EEE', 'EIE', 'ICE', 'MECH', 'PRODUCTION', 'AUTO', 'CIVIL', 'PRINTING', 'ARCHITECTURE', 'AEROSPACE', 'MATHEMATICS', 'ENGLISH', 'PHYSICS', 'CHEMISTRY', 'MEDIA SCIENCE', 'OTHERS'
    ];

    let col = dat.details.list.length * 150;

    let cui = [];

    const colleges = [
      'Stella Marrys', 'DG Vaishnav', 'MOP VAishnav', 'Loyola', 'Ethiraj', 'SRM Easwari', 'Other'
    ]

    colleges.forEach((a, e) => {
      let dd = {
        value: a,
        label: a
      }
      cui.push(dd);
    })



    let op = '';


    if (depts.length > 0) {
      op = depts.map((b, k) => {

        return (
          <option value={b} key={k}>{b}</option>
        )
      })
    }

    return (
      <Container>
        <Row>
          <Col md={{ size: 8, offset: 2 }} className="text-center">
            <h2>OnSpot Registrations  -   RegDesk {dat.desk}</h2><br />
            <h1>Collection - Rs. {col} - {dat.details.list.length} Participants</h1><br />
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Mathrix ID</Label>
                  <Input type="text" name="mathrix_id" placeholder="Enter Mathrix ID" value={dat.mathrix_id} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Student Name</Label>
                  <Input type="text" name="student_name" placeholder="Student Name" value={dat.student_name} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>College Name</Label>
                  <Select
                    value={this.state.selectedOption}
                    onChange={this.handleCol}
                    options={cui}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Student ID Card</Label>
                  <Input type="text" name="college_id" placeholder="College ID" value={dat.college_id} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Department (*)</Label>
                  <select onChange={(e) => {
                    this.setState({
                      department: e.target.value
                    })
                  }} className="custom-select">
                    <option value="empty">Select Department</option>
                    {op}
                  </select>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Mobile</Label>
                  <Input type="text" name="mobile" placeholder="Enter Mobile NUmber" value={dat.mobile} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Event 1</Label>
                  <select onChange={(e) => {
                    this.setState({
                      e1: e.target.value
                    })
                  }} className="custom-select">
                    <option value="empty">Event 1</option>
                    <option value="TH" >Treasure Hunt</option>
                    <option value="CR" >Code Relay</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Event 2</Label>
                  <select onChange={(e) => {
                    this.setState({
                      e2: e.target.value
                    })
                  }} className="custom-select">
                    <option value="empty">Event 2</option>
                    <option value="CM" >Creative Math</option>
                    <option value="SH" >Sherlock</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Event 3</Label>
                  <select onChange={(e) => {
                    this.setState({
                      e3: e.target.value
                    })
                  }} className="custom-select">
                    <option value="empty">Event 3</option>
                    <option value="MQ" >Math Quiz</option>
                    <option value="BC" >Beat the Clock</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Event 4</Label>
                  <select onChange={(e) => {
                    this.setState({
                      e4: e.target.value
                    })
                  }} className="custom-select">
                    <option value="empty">Event 4</option>
                    <option value="BS" >Brain Storm</option>
                    <option value="SU" >Sudoku</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={{ size: 4, offset: 4 }}>
                <button onClick={this.Register} className="btn btn-block btn-primary">Paid 150 </button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
