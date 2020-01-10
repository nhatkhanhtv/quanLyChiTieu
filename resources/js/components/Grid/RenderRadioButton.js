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
    const { label, radioData, name, handleRadioChange, value } = props;
    const classes = useStyles();

    // const radioData = [
    //   {
    //       id:1,
    //       text:"Khoản chi"
    //   },
    //   {
    //       id:1,
    //       text:"Khoản thu"
    //   },      
    
    // ];
    //const [selectedValue, setSelectedValue] = React.useState('1');

    // const handleChange = event => {
    //   setSelectedValue(event.target.value);
    // };

    // const handleOnChange=(event)=>{
    //   const { value, checked } = event.target;      
    //   var val = parseInt(value);
    //   if(checked)
    //   {
    //     setSelectedValue(val);
    //   }     
    // }


    
    return (
      <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend">{label}</FormLabel>
        {/* <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" /> */}
        {radioData.map((rd)=>{
          return (
            <FormControlLabel key={"rd"+rd.id} control={<Radio 
                  value={rd.id}
		            	onChange={(e)=>handleRadioChange(e)}
		            	checked={value == rd.id}
            />} label={rd.text} />
          )
        })}        
    </FormControl>
    
        
    )
}