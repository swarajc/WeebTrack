import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../styles/AList.css'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.transparent
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function AList({ history, caughtToken }) {



    const isMounted = useRef(true);

    const token = caughtToken;

    const [animes, setAnimes] = useState([]);

    const classes = useStyles();

    useEffect(() => {

        if (isMounted.current === true) {

            if (token !== '') {

                // let url = "http://localhost:5000/users/u";
                let url = "http://localhost:5000/user/u";
                fetch(url, {

                    method: 'get',

                    headers: {

                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`

                    },

                    user: {},
                    token: ''

                })
                    .then((result) => result.json())
                    .then((info) => {
                        if (info) {
                            setAnimes(info.animes)
                        }
                        else
                            if (info.error) {
                                console.log(info.error);
                            }

                    });
            }
        }

        console.log(animes);

        return () => {
            isMounted.current = false;
        }
    },
        [history, token, animes]
    )

    return animes ? (
        <div className='lcontainer'>
            <div className={classes.root}>
                <Grid>
                    <h1>Anime List</h1>
                    <div className={`${classes.demo} a-list`}>
                        <List>
                            {
                                animes.map(anime => (
                                    <ListItem key={anime.anime}>
                                        <ListItemAvatar>

                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={anime.anime}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </div>
                </Grid>
            </div>


        </div>
    ) : (<p>Loading...</p>)
}