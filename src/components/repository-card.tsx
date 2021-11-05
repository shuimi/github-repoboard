import React, { FC } from 'react';
import { Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


const RepositoryCard = (props: { loading: boolean }) => {
    return (
        <Card
            style={ { width: 300, marginTop: 16 } }
            actions={ [
                <SettingOutlined key="setting"/>,
                <EditOutlined key="edit"/>,
                <EllipsisOutlined key="ellipsis"/>,
            ] }
        >
            <Skeleton loading={ props.loading } avatar active>
                <Meta
                    avatar={ <Avatar src="https://joeschmoe.io/api/v1/random"/> }
                    title="Card title"
                    description="This is the description"
                />
            </Skeleton>
        </Card>
    );
}

export default RepositoryCard;


const { Meta } = Card;