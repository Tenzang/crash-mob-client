import React, { Component } from "react";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

class Race extends Component {
    constructor(props){
        super(props);
        this.state = {
            races: []
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
        axios.get(`https://www.dnd5eapi.co/api/races`)
        .then(res => {
            const races = res.data.results;
            this.setState({ races });
        });
    }

    render(){
        const { values, handleChange } = this.props;
        return(
            <Dialog
                open
                fullWidth
                maxWidth='sm'
            >
                <AppBar title="Character Race" />
                <h2 class="headings">Character Race</h2>
                <Select
                    placeholder="Choose your Character's Race"
                    label= "Character Race"
                    onChange={handleChange('race')}
                    defaultValue={values.race}
                    margin="normal"
                    fullWidth
                >
                        {this.state.races.map( ( {name}, index ) => {
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
        );
    }
};

export default Race;