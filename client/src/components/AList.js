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
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.transparent
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));


const AList = ({caughtToken}) => {

    const isMounted = useRef(true);

    const token = caughtToken;

    const [animes, setAnimes] = useState([]);

    const classes = useStyles();

    const handleClick = (anime) => {

        let url = "http://localhost:5000/user/animes/delAnime";

        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                animeObj: anime
            }),
            user: {},
            token: ''
        })
            .then(result => result.json())
            .then(info => {   
                    console.log(info.success);
                    window.location.reload();
            })
            .catch( err => {
                console.log(err);
                window.location.reload();
            })
        }

    const listItems = animes.map(animeItem => (
        <ListItem className= 'list-item'  key={animeItem.anime.mal_id} >
            <ListItemAvatar>
                <Avatar variant="square" src={animeItem.anime.image_url} />
            </ListItemAvatar>
            <ListItemText
                /* button component='a' href={`/u/reaper/a/${animeItem.anime.mal_id}`} */
                primary={animeItem.anime.title}
                secondary={`${animeItem.anime.status}${animeItem.anime.airing ? ' | ' + animeItem.anime.broadcast : ''}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick = { () => {handleClick(animeItem.anime)}}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    ))

    const listItemsWithDividers = [];

    listItems.forEach((item, index) => {
        listItemsWithDividers.push(item)
        if (listItems[index + 1] !== undefined) {
        listItemsWithDividers.push(<Divider />)
        }
    })

    useEffect(() => {

        if (isMounted.current === true) {

            if (token !== '') {

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
                    .then((info) => setAnimes(info.animes))
                    .catch((err) => {
                        console.log(err);
                        window.location.reload();
                    });

            }
        }

        console.log(animes);

        return () => {
            isMounted.current = false;
        }
    },
        [token, animes]
    )

    
    
    
    return animes.length ? (
        <div className='lcontainer'>
            <div className={classes.root}>
                <Grid>
                    <h1>Anime List</h1>
                    <div className={`${classes.demo} a-list`}>
                        <List>
                        {listItemsWithDividers}
                        </List>
                    </div>
                </Grid>
            </div>
        </div>
    ) : (<p>List is empty :')</p>)
}

export default AList