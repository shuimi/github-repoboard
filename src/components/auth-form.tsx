import GithubLogo from "../images/github-logo.svg";
import { Button, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const AuthForm = (props: {signInCallback: any, continueAsGuestCallback: any}) => {
    return (
        <div style={ {
            display: 'flex',
            flexDirection: 'column',
            margin: '1rem',
            minHeight: 'min(50vw, 30vh)',
            alignItems: 'center',
            paddingBottom: '2rem',
            maxHeight: '70vh'
        } }>
            <div style={ {
                fontSize: 'max(2vw, 20px)',
                textAlign: 'center',
                paddingTop: '2rem',
            } }>
                <img src={ GithubLogo } alt="Github Logo"
                     style={ {
                         width: 'max(14vw, 140px)',
                     } }
                />
                <span style={ {
                    display: 'block',
                    paddingBottom: '1em'
                } }>
                            RepoBoard
                        </span>
            </div>
            <span style={ {
                fontSize: '1.15em',
                textAlign: 'center',
            } }>
                        Log into github account to interact your repositories:
                    </span>
            <Button style={ {
                marginTop: '1em',
                marginBottom: '3em',
                width: '14rem',
            } } type="primary" onClick={ props.signInCallback }>Sign in via Github</Button>
            <span style={ {
                fontSize: '1.15em',
                textAlign: 'center',
            } }>
                        Or try browsing public repositories without authorization:
                    </span>
            <Button style={ {
                marginTop: '1em',
                marginBottom: '1em',
                width: '14rem',
            } } type="default" onClick={ props.continueAsGuestCallback }>Continue without auth</Button>
            <Link to="/about">
                Also you can read more about this app
            </Link>
        </div>
    );
}

export default AuthForm;