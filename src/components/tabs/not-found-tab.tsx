import Section from './helpers/section';
import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';


export const NotFound = memo(() => {
    let location = useLocation();
    return (
        <Section>
            <h3>
                The page with the address <code>{ location.pathname }</code> was not found
            </h3>
        </Section>
    );
});