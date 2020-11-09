import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button,TextField} from '@material-ui/core';



const useStyles = theme => ({
    root: {
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
 

    }
});

class Index extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div  className={classes.root}>
              
                 <TextField id="lblEmail" label="Email" variant="outlined" style={{margin:10}} />
                 <TextField id="lblPassword" label="Password" variant="outlined" />
                 <Button>Login</Button>
           
            </div>
        );
    }
}

export default withStyles(useStyles)(Index);