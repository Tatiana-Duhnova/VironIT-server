import React from 'react';
import {DivHeader, DivContent, DivFooter, DivText, Content, Div, DivInfo} from '../components/index';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

interface IUser {
    name: string,
    email: string,
    number: number,
    gender: string,
    password: string,
    _id: string,
    img?: string,
}

function UserInfo(props: any) {
    const getUser: any = localStorage.getItem('user');
    const user: IUser = JSON.parse(getUser);
    const [file, setImg] = React.useState({
        file: '',
        imagePreviewUrl: `http://localhost:4000/images/?name=${user.img || ''}`,
        isFileUpload: false,
    });

    const handleImageChange = (e: any) => {
        e.preventDefault();
            
        let reader = new FileReader();
        let file = e.target.files[0];
            
        reader.onloadend = () => setImg({...file, file: file, imagePreviewUrl: reader.result, isFileUpload: true,});
            
        reader.readAsDataURL(file);
    }

    const logout = () => {
        props.history.push('/');
        localStorage.clear();
    }

    const redaction = () => {
        props.history.push('/redactionInfo');
    }
        
    const saveImage = async () => {
        if (file.isFileUpload) {
            try {
                const { data } = await axios.post('http://localhost:4000/saveImage', { img: file.imagePreviewUrl, id: user._id });
    
                localStorage.setItem('user', JSON.stringify(data));
                setImg({ ...file, isFileUpload: false });
            } catch(err) {
                console.log(err);
            }
        }
    }

    return (
        <React.Fragment>
            <Content>
                <DivHeader>
                    <Button variant="contained" color="secondary" id='btnAllUsers' onClick={() => props.history.push('/allUsers')}>
                        Show all users
                    </Button>
        
                    <Button variant="contained" color="secondary" id='btnExit' onClick={logout}>
                        Exit
                    </Button>
                </DivHeader>
        
                <DivContent>
                    <DivText>
                        <h1 id='margin'>Welcome!</h1>
                        <h4>Here you can check your information</h4>
                    </DivText>
    
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
                            onChange={handleImageChange}
                        />

                        <label htmlFor="outlined-button-file" id='upload'>
                            <Button variant="outlined" component="span" id='btnUpload' style={{display: `${file.isFileUpload ? 'none' : 'block'}`}}>
                                Upload
                            </Button>
                        </label>
        
                        <Button
                            variant="outlined"
                            onClick={saveImage}
                            component="span"
                            style={{
                                display: `${file.isFileUpload ? 'block' : 'none'}`
                            }}
                            id='saveImg'
                        >
                            Save
                        </Button>
        
                        <DivInfo>
                            <div>
                                <p className='info'>Name:</p>
                                <p className='info'>Email:</p>
                                <p className='info'>Phone:</p>
                                <p className='info'>Gender:</p>
                            </div>
        
                            <div>
                                <p className='infoUser'>{user.name}</p>
                                <p className='infoUser'>{user.email}</p>
                                <p className='infoUser'>{user.number}</p>
                                <p className='infoUser' id='last'>{user.gender}</p>
                            </div>
                        </DivInfo>
        
                        <Button id='redaction' variant="contained" color="secondary" onClick={redaction}>
                            Redaction
                        </Button>
                    </Div>
                </DivContent>
        
                <DivFooter></DivFooter>
            </Content>
        </React.Fragment>
    );
}

export default UserInfo;