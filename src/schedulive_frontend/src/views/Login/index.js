import React, { Component, useState } from 'react';
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import Copyright from '../../components/Copyright';
import api from '../../services/api';
import { parseJWT } from "../../services/auth";

// import logo from '../../assets/img/logo.png'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.ekitravels.com/wp-content/uploads/2018/05/travel-tour-agency-in-miami-1080x628.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const Login = props => {

    const { register, handleSubmit, errors } = useForm();

    const [erroMensagem, setErroMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const efetuaLogin = (data, e) => {
        e.preventDefault();
        setIsLoading(true);

        api.post("/account/login", {
            "email": data.email,
            "password": data.senha
        }).then(resp => {
            if (resp.status === 200) {
                localStorage.setItem("usuario-schedulive", resp.data.token)
                //Todo: Verificar se o usuário é do tipo Admin
                props.history.push("/lives")

            } else {
                setErroMensagem("Email ou senha inválidos")
            }
        }).catch(erro => {
            setErroMensagem("Email ou senha inválidos")
        }).finally(() => {
            setIsLoading(false);
        })
    };

    const classes = useStyles();

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <img src="https://cdn2.iconfinder.com/data/icons/productivity-at-work/256/Working_Schedule-512.png" alt="Schedulive" width="15%" />
                    <Typography component="h1" variant="h5">
                        Entrar
                    </Typography>
                    {erroMensagem !== '' && <Alert severity="error">{erroMensagem}</Alert>}
                    <form className={classes.form} onSubmit={handleSubmit(efetuaLogin)} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            error={!!errors.email}
                            inputRef={register({
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                minLength: 6,
                                maxLength: 100
                            })}
                        />
                        {errors.email && <Alert severity="error">E-mail inválido</Alert>}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="senha"
                            label="Senha"
                            name="senha"
                            autoComplete="current-password"
                            type="password"
                            error={!!errors.senha}
                            inputRef={register({
                                required: true,
                                minLength: 8,
                                maxLength: 20
                            })}
                        />

                        {(errors.senha && errors.senha.type === 'required') && <Alert severity="error">Informe a senha</Alert>}
                        {(errors.senha && errors.senha.type === 'minLength') && (
                            <Alert severity="error">A senha deve ter no minimo 8 caracteres</Alert>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );

}

export default Login;