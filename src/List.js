import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.fetchData();
    }

    fetchData = async () => {
        const response = await axios.get(
            "https://onspotbackend.herokuapp.com/list",
            {},
            {}
        );
        let data = response.data.list;
        let dataTable = [];
        data.map((student, key) => {
            let eve = '';
            student.events.forEach(ev => {
                if (ev === 'BS') {
                    eve += ' Brain Storm';
                }
                if (ev === 'CR') {
                    eve += 'Code Relay';
                }
                if (ev === 'BC') {
                    eve += 'Beat the Clock';
                }
                if (ev === 'SH') {
                    eve += 'Sherlock';
                }
                if (ev === 'CM') {
                    eve += 'Creative Math';
                }
                if (ev === 'MQ') {
                    eve += 'Math Quiz';
                }
                if (ev === 'TH') {
                    eve += 'Treasure Hunt';
                }
                if (ev === 'SU') {
                    eve += 'Sudoku';
                }
            });
            let stud = [student.mathrix_id, student.student_name, student.college_name, student.mobile, student.desk];
            dataTable.push(stud);
            this.setState({
                list: dataTable
            })
        });




    }

    render() {
        let dat = this.state.list;
        let tui = dat.map((stud, key) => {
            return (
                <tr key={key}>
                    <td>
                    <Link to={"/view/"+stud[0]}>{stud[0]}</Link>
                    </td>
                    <td>
                        {stud[1]}
                    </td>
                    <td>
                        {stud[2]}
                    </td>
                    <td>
                        {stud[3]}
                    </td>
                    <td>
                        <Link to={"/edit/"+stud[0]}>Edit</Link>
                    </td>
                </tr>
            )
        })
        return (
            <Container>
                <h1 className="text-center">Participants List - {dat.length}</h1>
                <Row>
                    <Col md={12}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Mathrix ID</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">College Name</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tui}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        )
    }
}