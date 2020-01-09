import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
  }));

export default function RenderRadioButton(props) {
    const { label, radioData, name } = props;
    const classes = useStyles();

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = event => {
      setSelectedValue(event.target.value);
    };

    
    return (
        <>
                   {radioData.map((ed,index)=>(
                             <Radio
                                checked={selectedValue === ed.id}
                                onChange={handleChange}
                                value={ed.id}
                                name={name}
                                inputProps={{ 'aria-label': ed.text }}
                           />
                   ))}   
                
        </>        
        
    )
}