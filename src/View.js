import React from 'react';
import './App.css';
import { Row, Col, Container, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [],
            id: this.props.match.params.id
        }
        this.getDetails();
    }



    getDetails = async () => {
        const response = await axios.get(
            "http://api.mathrix.in/list/",
            {},
            {}
        );

        this.setState({
            details: response.data.list
        })



    }


    render() {
        let dat = this.state;
        if(dat.details.length)

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

export default View;
