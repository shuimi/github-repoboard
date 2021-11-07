import React, { memo } from 'react';
import { Skeleton, Card, Avatar } from 'antd';
import styled from "styled-components";


const CardStyle = { width: '22em', margin: '1em' };

const { Meta } = Card;

const PropertyWrapper = styled.div({ margin: '1rem 0 0 3rem' });


const RepositoryCard = memo((props: {
    name: string,
    description: string,
    language: string,
    license: string,
    licenseURL: string,
    imageURL: string
}) => {

    return (
        <Card style={ CardStyle }>
            <Skeleton loading={ false } avatar active>
                <Meta
                    avatar={ <Avatar src={ props.imageURL }/> }
                    title={ props.name }
                    description={ props.description ?? 'Empty description' }
                />
                {
                    props.language &&
                    <PropertyWrapper>
                        Language:&#8195;
                        { props.language }
                    </PropertyWrapper>
                }
                {
                    props.license &&
                    <PropertyWrapper>
                        License:&#8195;
                        <a href={ props.licenseURL }>
                            { props.license }
                        </a>
                    </PropertyWrapper>
                }
            </Skeleton>
        </Card>
    );
});

export default RepositoryCard;