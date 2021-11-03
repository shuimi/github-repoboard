import React, { FC, useState } from 'react';
import { Pagination, Empty } from 'antd';
import "antd/dist/antd.css";


const App: FC = () => {

    const [ page, setPage ] = useState<Number>(1);

    const onPageChange = (page: Number, pageSize?: Number) => {
        setPage(page);
    }

    return (
        <div>
            { page }
            <Pagination total={ 7 } showSizeChanger={ true } pageSizeOptions={ [ '5', '10' ] }
                        onChange={ onPageChange }/>
            <Empty description={ false }/>
        </div>
    );
}

export default App;
