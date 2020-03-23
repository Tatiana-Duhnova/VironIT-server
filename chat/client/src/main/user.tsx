import React from 'react';
import {Div, DivInfo, UserInfo} from '../components/index';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = ((theme: Theme) => makeStyles({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

function User(props: any) {
    const {name, email, number, gender, img} = props.person;
    const classes: any = useStyles;
    const [file] = React.useState({
        file: '',
        imagePreviewUrl: `http://localhost:4000/images/?name=${img}`,
    });

    return(
        <UserInfo>
            <Div>
                <Avatar 
                    alt='' 
                    src={file.imagePreviewUrl}
                    className='avatar' 
                />

                <input
                    accept="image/*"
                    id="outlined-button-file"
                    multiple
                    type="file"
                />

                <IconButton 
                    aria-label="delete" 
                    className={classes.margin}
                    id='MuiIconButton-root'
                >
                    <DeleteIcon fontSize="inherit" />
                </IconButton>

                 <DivInfo>
                    <div>
                        <p className='info'>Name:</p>
                        <p className='info'>Email:</p>
                        <p className='info'>Phone:</p>
                        <p className='info'>Gender:</p>
                    </div>

                    <div>
                        <p className='infoUser'>{name}</p>
                        <p className='infoUser'>{email}</p>
                        <p className='infoUser'>{number}</p>
                        <p className='infoUser' id='last'>{gender}</p>
                    </div>
                </DivInfo>
            </Div>
        </UserInfo>
    );
}

export default User;
