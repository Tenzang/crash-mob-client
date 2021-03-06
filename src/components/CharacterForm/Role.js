import React, { Component } from "react";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

class Role extends Component {
    constructor(props){
        super(props);
        this.state = {
            roles: []
        }
    }

    continue = event => {
        event.preventDefault();
        this.props.nextStep();
    };

    back = event => {
        event.preventDefault();
        this.props.prevStep();
    };

    componentDidMount() {
        axios.get(`https://www.dnd5eapi.co/api/classes`)
        .then(res => {
            const roles = res.data.results;
            this.setState({ roles });
        })
    }

    render(){
        const { values, handleChange } = this.props;
        return(
            <Dialog
                open
                fullWidth
                maxWidth='sm'
            >
                <AppBar title="Character Class" />
                <h2 class="headings">Character Class</h2>
                <Select
                    placeholder="Choose your Character's Class"
                    label= "Character Class"
                    onChange={handleChange('role')}
                    defaultValue={values.role}
                    margin="normal"
                    fullWidth
                >
                        {this.state.roles.map( ( {name}, index ) => {
                        return <MenuItem key={index} value={name}>{name}</MenuItem>})}
                </Select>
                <br/>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.continue}
                >Continue</Button>
                <br/>
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={this.back}
                >Back</Button>
                <br/>
                <Button onClick={ () =>  window.location.href='/characters' }>Exit</Button>
            </Dialog>
        )
    }
};

export default Role;