import React, { memo } from 'react';
import Section from './helpers/section';


const AboutTab = memo(() => {
    return (
        <Section>
            <h2>About this application:</h2>
            <p>
                RepoBoard is a demo React application made as a test task for the WinSolutions company.
            </p>

            <h3>Libraries used:</h3>
            This is a main part of libraries used in this project:
            <code style={ {
                display: 'block',
                fontSize: '0.8em',
                lineHeight: '1.6em',
                marginBottom: '1em',
                padding: '2em',
                borderRadius: '0.4em',
                maxWidth: '20rem',
                background: '#eaeaea'
            } }>
                "@supabase/supabase-js": "^1.25.2",<br/>
                "antd": "^4.16.13",<br/>
                "octokit": "^1.7.0",<br/>
                "react-router-dom": "^6.0.0",<br/>
                "redux": "^4.1.2",<br/>
                "redux-devtools-extension": "^2.13.9",<br/>
                "redux-logger": "^3.0.6",<br/>
                "redux-thunk": "^2.4.0",<br/>
                "styled-components": "^5.3.3",<br/>
                "typescript": "^4.4.4",
            </code>
            <p>
                <strong>Supabase</strong> used for oauth because storing a token on the frontend is not secure.<br/>
                <strong>Ant Design</strong> was chosen as the core component library for UI. <br/>
                To extend and customize it <strong>styled components</strong> were chosen.<br/>
                <strong>Redux / thunk</strong> used as state manager, but there are lot of things implemented
                using <strong>react hooks</strong>.<br/>
            </p>
        </Section>
    );
});

export default AboutTab;