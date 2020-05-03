import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Menu from '../../components/Menu'
import api from '../../services/api';
import Container from '@material-ui/core/Container';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const initialState = {
    id: 0,
    title: '',
    thumbnail: '',
    description: '',
    place: '',
    date: '',
    time: '',
    categoryId: ''
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    fixedHeight: {
        height: 240,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const Lives = props => {
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();
    const [expanded, setExpanded] = React.useState('');

    const [lives, setLives] = useState([]);
    const [live, setLive] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState({});

    const [abreModalPacoteSalvo, setAbreModalPacoteSalvo] = useState(false);
    const [erroMensagem, setErroMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        getAllLives();
        getAllCategories();
    }, [])

    const handleChangeExpanded = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getAllLives = () => {
        api.get("/lives", {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("usuario-schedulive")
            }
        }).then((resp) => {
            console.log("resposta", resp);
            setLives(resp.data);
        }).catch((erro) => {
            console.log("erro", erro);
        })
    }

    const getAllCategories = () => {
        api.get("/categories")
            .then((resp) => {
                console.log("resposta", resp);
                setCategories(resp.data.map(category => ({
                    label: category.name,
                    value: category.id
                })));
            }).catch((erro) => {
                console.log("erro", erro);
            })
    }

    const saveLive = (data, e) => {
        e.preventDefault();
        setIsLoading(true);

        var formLive = {
            "title": data.title,
            "thumbnail": data.thumbnail,
            "description": data.description,
            "place": data.place,
            "dateTime": data.date + "T" + data.time,
            "categoryId": data.categoryId
        }

        api.post("/lives/create", formLive, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("usuario-schedulive")
            }
        }).then((resp) => {
            setAbreModalPacoteSalvo(true);
            getAllLives();
            setExpanded('');
            reset({
                title: '',
                thumbnail: '',
                description: '',
                place: '',
                dateTime: '',
                categoryId: ''
            })
        }).catch((erro) => {
            console.log('erro', erro);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Menu titulo="Lives" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Cadastrar Live
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <form onSubmit={handleSubmit(saveLive)} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="title"
                                            label="Titulo"
                                            name="title"
                                            type="text"
                                            error={!!errors.title}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.title && <Alert severity="error">Informe o titulo</Alert>}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="date"
                                            label="Data"
                                            name="date"
                                            type="date"
                                            error={!!errors.date}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.date && <Alert severity="error">Informe a Data</Alert>}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="time"
                                            label="Hora"
                                            name="time"
                                            type="time"
                                            error={!!errors.time}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.time && <Alert severity="error">Informe a  Hora</Alert>}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <InputLabel htmlFor="categoryId">Categoria</InputLabel>
                                        <Select
                                            variant="outlined"
                                            native
                                            required
                                            fullWidth
                                            value={categoryId}
                                            id="categoryId"
                                            name="categoryId"
                                            onChange={e => setCategoryId(e.currentTarget.value)}
                                            label="Categoria"
                                            error={!!errors.category}
                                            inputRef={register({
                                                required: true,
                                            })}
                                            inputProps={{
                                                id: "categoryId",
                                                name: "categoryId"
                                            }}
                                        >
                                            <option aria-label="None" value="" />{categories.map(({ label, value }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </Select>
                                        {errors.category && <Alert severity="error">Informe a categoria</Alert>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="place"
                                            label="Url local"
                                            name="place"
                                            type="text"
                                            error={!!errors.place}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.place && <Alert severity="error">Informe a url do local da live</Alert>}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="thumbnail"
                                            label="Imagem"
                                            name="thumbnail"
                                            type="text"
                                            error={!!errors.thumbnail}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.thumbnail && <Alert severity="error">Informe a url do banner</Alert>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            multiline
                                            fullWidth
                                            rows="10"
                                            id="description"
                                            label="Descrição"
                                            name="description"
                                            autoComplete="current-password"
                                            type="Multiline"
                                            error={!!errors.description}
                                            inputRef={register({
                                                required: true,
                                            })}
                                        />
                                        {errors.description && <Alert severity="error">Informe a descrição</Alert>}
                                    </Grid>
                                    <Grid item xs={6}></Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Salvando..." : "Salvar"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <Paper style={{ padding: 16, marginTop: 20 }}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            Lista de Lives
                      </Typography>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Thumbnail
                                  </TableCell>
                                        <TableCell>
                                            Titulo
                                  </TableCell>
                                        <TableCell>
                                            Data e Hora
                                  </TableCell>
                                        <TableCell>
                                            Local
                                  </TableCell>
                                        <TableCell>
                                            Categoria
                                  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {lives.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(live => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={live.id}>
                                                <TableCell>
                                                    <img src={live.thumbnail} alt={live.title} style={{ width: 120, height: 100 }} />
                                                </TableCell>
                                                <TableCell>
                                                    <p>{live.title}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>{live.dateTime}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>{live.place}</p>
                                                </TableCell>
                                                <TableCell>
                                                    <p>{live.category.name}</p>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={lives.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Container>
                <Dialog
                    open={abreModalPacoteSalvo}
                    onClose={() => setAbreModalPacoteSalvo(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Live Salva"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Live salva e o mesmo já esta disponível para visualização no aplicativo.
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setAbreModalPacoteSalvo(false)} color="primary" autoFocus>
                            Fechar
          </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </div>
    )
}

export default Lives;

